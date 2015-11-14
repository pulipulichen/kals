<?php
/**
 * Annotation_scope_collection
 *
 * Scope的集合
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/5 下午 03:16:30
 * @example
 * 資料表建立：<code>

-- Table: annotation2scope

-- DROP TABLE annotation2scope;

CREATE TABLE annotation2scope
(
  annotation2scope_id serial NOT NULL,
  annotation_id integer NOT NULL,
  scope_id integer NOT NULL,
  CONSTRAINT annotation2scope_pkey PRIMARY KEY (annotation2scope_id),
  CONSTRAINT annotation2scope_annotation_id_fkey FOREIGN KEY (annotation_id)
      REFERENCES annotation (annotation_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT annotation2scope_scope_id_fkey FOREIGN KEY (scope_id)
      REFERENCES scope (scope_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (OIDS=FALSE);
ALTER TABLE annotation2scope OWNER TO postgres;

 * </code>
 */
class Annotation_scope_collection extends Generic_association_collection {

    # Memver Varibles
    private $sorted = TRUE;

    protected $table_name = 'annotation2scope';
    protected $index_field = 'annotation_id';
    protected $foreign_field = 'scope_id';

    protected $class_table_name = 'scope';
    protected $class_foreign_field = 'scope_id';
    protected $class_name = 'Annotation_scope';
    protected $class_dir = 'scope/';

    # Methods

    public function get_annotation_id()
    {
        return $this->get_id();
    }

    protected function  _post_load() {
        $this->force_sorted();
    }

    protected function  _pre_update($members) {
        $this->_sort();
        return $members;
    }

    public function force_sorted()
    {
        $this->sorted = TRUE;
        return $this;
    }

    public function get_appended_webpages()
    {
        if (is_null($this->id))
            return NULL;

        $db = $this->db;
        $db->from('annotation2scope');
        $db->join('scope', 'annotation2scope.scope_id = scope.scope_id');
        $db->join('webpage', 'webpage.webpage_id = scope.webpage_id');
        //$db->group_by('webpage.webpage_id, webpage.uri, webpage.title, webpage.domain_id');
        $db->distinct();
        $db->where('annotation_id', $this->id);
        $db->select('webpage.*');

        $query = $db->get();
        $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');

        $webpages = array();
        foreach ($query->result_array() AS $row)
        {
            $webpage = new Webpage($row);
            array_push($webpages, $webpage);
        }
        return $webpages;
    }

    //-------------------------------------------------
    //以下是基本操作

    public function create_scope($from, $to, $anchor_text_id = NULL, $webpage = NULL)
    {
        $this->_CI_load('library', 'scope/Annotation_scope', 'annotation_scope');
        $scope = new Annotation_scope();
        $scope->set_index($from, $to);
        if (NULL != $anchor_text_id)
            $scope->set_anchor_text($anchor_text_id);
        if (isset($webpage))
        	$scope->set_webpage($webpage);

        $coll = new Annotation_scope_collection();
        $coll->set_scopes(array($scope));
        return $coll;
    }

    public function set_scopes($scopes)
    {
        //$scopes = self::sort_scopes($scopes);
        if (is_class($scopes, 'Annotation_scope'))
        {
            $scopes = array($scopes);
        }

        $this->members = $scopes;
        $this->modified = TRUE;
        $this->sorted = FALSE;
        return $this;
    }

    public function get_scopes()
    {
        $this->_check_callback();
        $this->_sort();
        return $this->getIterator();
    }

    public function  add_item(Generic_object $obj, $key = NULL) {
        parent::add_item($obj, $key);
        $this->sorted = FALSE;
    }

    public function add_scope(Annotation_scope $scope)
    {
        return $this->add_item($scope);
    }

    public function add_scope_collection(Annotation_scope_collection $scope_collection)
    {
        //return $this->add_collection($scope_collection);
        foreach ($scope_collection AS $scope) {
            $this->add_scope($scope);
        }
        return $this;
    }

    public function exclude_scope(Annotation_scope $scope)
    {
        $this->_check_callback();
        $this->members = self::exclude_scopes($this->members, array($scope));

        $this->modified = TRUE;
        $this->sorted = FALSE;
        return $this;
    }

    public function exclude_scope_collection(Annotation_scope_collection $scope_collection)
    {
        $this->_check_callback();
        $this->members = self::exclude_scopes($this->members, $scope_collection);

        $this->modified = TRUE;
        $this->sorted = FALSE;
        return $this;
    }

    public function get_scope_length()
    {
        $this->_check_callback();

        $this->_sort();
        $len = 0;
        foreach ($this->members AS $scope)
        {
            $len = $len + $scope->get_length();
        }
        return $len;
    }

    /**
     * 取得第一個範圍的起始編號
     * @author Pulipuli Chen <pulipuli.chen@gmail.com> 20140103
     * @return Int
     */
    public function get_first_index()
    {
        $this->_check_callback();

        $this->_sort();
        $from = 0;
        foreach ($this->members AS $scope)
        {
            $from = $scope->get_from_index();
            break;
        }
        return $from;
    }
    
    /**
     * 取得最後一個範圍的結尾編號
     * @author Pulipuli Chen <pulipuli.chen@gmail.com> 20140103
     * @return Int
     */
    public function get_last_index() {
        $this->_check_callback();

        $this->_sort();
        $index = 0;
        foreach ($this->members AS $scope) {
            $index = $scope->get_to_index();
        }
        return $index;
    }
    
    public function set_annotation($annotation_id)
    {
        $this->_CI_load('library', 'kals_resource/Annotation', 'annotation');
        $annotation_id = $this->CI->annotation->filter_id($annotation_id);

        $this->id = $annotation_id;
    }

    private function _sort()
    {
        $this->_check_callback();
        if ($this->sorted === FALSE)
        {
            $this->members = self::sort_scopes($this->members);
            $this->sorted = TRUE;
        }
        return $this;
    }

    static public function sort_scopes($scopes)
    {
        if (count($scopes) < 2)
            return $scopes;
        
        //先依照from來sort $scopes吧
        $from_array = array();

        $webpage_scopes = array();
        foreach ($scopes AS $key => $scope)
        {
            $from_array[$key] = $scope->get_from_index();
        }

        asort($from_array);

        $sort_scopes = array();
        foreach ($from_array AS $key => $from)
        {
            $scope = $scopes[$key];
            $webpage_id = $scope->get_webpage_id();
            if (is_null($webpage_id))
                $webpage_id = 'null';

            if (!isset($webpage_scopes[$webpage_id]))
                $webpage_scopes[$webpage_id] = array();
            $webpage_scopes[$webpage_id][] = $scope;
            //$sort_scopes[] = $scopes[$key];
        }

        //return array_pop($webpage_scopes);

        //再來做比較
        $output_scopes = array();
        $hold = FALSE;

        foreach ($webpage_scopes AS $webpage_id => $sort_scopes)
        {
            for ($i = 0; $i < count($sort_scopes); $i++)
            {
                if ($i == count($sort_scopes) - 1)
                {
                    if ($hold === FALSE)
                        $output_scopes[] = $sort_scopes[$i];
                    break;
                }   //if ($i == count($sort_scopes) - 1)

                $from = $sort_scopes[$i]->get_from_index();
                $to = $sort_scopes[$i]->get_to_index();
                $next_from = $sort_scopes[($i+1)]->get_from_index();
                $next_to = $sort_scopes[($i+1)]->get_to_index();
                if ($to + 1 < $next_from)
                {
                    // NOW    ##########
                    // NEXT                  ##############

                    // NOW    ##########
                    // NEXT              ##############

                    //避免跟之前的scope相同
                    if (count($output_scopes) > 0)
                    {
                        $last_scope = $output_scopes[count($output_scopes)-1];
                        $last_from = $last_scope->get_from_index();
                        $last_to = $last_scope->get_to_index();

                        if ($from != $last_from && $to != $last_to)
                            $output_scopes[] = $sort_scopes[$i];
                    }
                    else
                    {
                        $output_scopes[] = $sort_scopes[$i];   
                    }
                    
                    $hold = FALSE;
                    continue;
                }   //if ($to + 1 < $next_from)
                else if ($to == $next_to && $from == $next_from)
                {
                    //都一樣的話就不用處理啦
                    $hold = FALSE;
                    continue;
                }
                else
                {
                    // NOW    ##########
                    // NEXT             ##############

                    // NOW    ##########
                    // NEXT            ##############

                    // NOW    ##########
                    // NEXT   ##############

                    // NOW    ##########
                    // NEXT   #######

                    $scope = new Annotation_scope();

                    $new_from = $from;
                    $new_to = max(array($to, $next_to));

                    $scope->set_index($new_from, $new_to);
                    $scope->set_webpage($webpage_id);

                    //考慮文字的部份
                    $text = $sort_scopes[$i]->get_text();
                    if (NULL !== $text)
                    {
                        $anchor_text = $sort_scopes[($i+1)]->get_anchor_text();
                        $next_text = $anchor_text->get_text();

                        $cover = $to - $next_from;
                        if ($cover > 0 && $cover < mb_strlen($next_text, 'UTF-8'))
                        {
                            $text = $text . mb_substr($next_text, $cover, strlen($cover), 'UTF-8');
                        }
                        $scope->set_anchor_text($text);
                    }

                    if ($hold === FALSE)
                    {
                        $output_scopes[] = $scope;
                    }
                    else
                    {
                        $output_scopes[count($output_scopes)-1] = $scope;
                    }

                    $sort_scopes[($i+1)] = $scope;

                    $hold = TRUE;
                    continue;
                }   //if ($to + 1 < $next_from) else
            }
        }   //foreach ($webpage_scopes AS $webpage_id => $sort_scopes)
        return $output_scopes;
    }

    static public function exclude_scopes($scopes, $exclude_scopes)
    {
        if (count($scopes) === 0 || count($exclude_scopes) === 0)
            return $scopes;

        foreach ($exclude_scopes AS $ex_key => $ex)
        {
            $ex_from = $ex->get_from_index();
            $ex_to = $ex->get_to_index();
            $ex_webpage_id = $ex->get_webpage_id();

            //test_msg('Annotation_scope_collection->exclude_scopes() $exclude_scopes', array($ex_key, $ex_from, $ex_to, $ex_webpage_id));

            foreach ($scopes AS $key => $s)
            {
                $from = $s->get_from_index();
                $to = $s->get_to_index();
                $webpage_id = $s->get_webpage_id();


                //只能減去相同網頁的範圍
                if ($ex_webpage_id != $webpage_id)
                    continue;

                if ($to < $ex_from
                    OR $from > $ex_to)
                {
                    //SCOPE     ##########
                    //EXCLUDE               ######
                    //NEW       ##########

                    //SCOPE            ##########
                    //EXCLUDE   ######
                    //NEW              ##########

                    continue;
                }
                else if (($from == $ex_from && $to == $ex_to)
                    OR ($from >= $ex_from && $to <= $ex_to))
                {
                    //SCOPE     ######
                    //EXCLUDE   ######

                    //SCOPE      ######
                    //EXCLUDE   ########

                    //SCOPE       ######
                    //EXCLUDE   ########

                    //SCOPE     ######
                    //EXCLUDE   ########

                    unset($scopes[$key]);
                    continue;
                }
                else if ($from <= $ex_from && $to <= $ex_to)
                {
                    //SCOPE     ##########
                    //EXCLUDE         ######
                    //NEW       ######
                    //          0123456

                    //test_msg('Annotation_scope_collection->exclude_scopes() $scopes', array($key, $from, $to, $webpage_id));

                    $new_from = $from;
                    $new_to = $ex_from - 1;

                    $scope = new Annotation_scope();
                    $scope->set_index($new_from, $new_to);
                    $scope->set_webpage($webpage_id);

                    $text = $s->get_text();
                    if (NULL !== $text)
                    {
                        $len = $ex_from - $from - 1;
                        $text = mb_substr($text, 0, $len, 'UTF-8');

                        //test_msg(array($text, $len));

                        $scope->set_anchor_text($text);

                    }

                    $scopes[$key] = $scope;
                }
                else if ($from >= $ex_from && $to >= $ex_to)
                {
                    //SCOPE         ##########
                    //EXCLUDE   ######
                    //NEW             ########
                    //          12345678901234

                    $new_from = $ex_to + 1;
                    $new_to = $to;

                    $scope = new Annotation_scope();
                    $scope->set_index($new_from, $new_to);
                    $scope->set_webpage($webpage_id);

                    $text = $s->get_text();
                    if (NULL !== $text)
                    {
                        $len = $ex_to - $from + 1;
                        $text = mb_substr($text, $len, strlen($text), 'UTF-8');

                        $scope->set_anchor_text($text);
                    }

                    $scopes[$key] = $scope;
                }
                else if ($from < $ex_from
                    && $to > $ex_to)
                {
                    //SCOPE     ##########
                    //EXCLUDE     ######
                    //NEW       ##      ##
                    //          0123456789

                    $text = $s->get_text();

                    $new_from1 = $from;
                    $new_to1 = $ex_from - 1;

                    $scope1 = new Annotation_scope();
                    $scope1->set_index($new_from1, $new_to1);
                    $scope1->set_webpage($webpage_id);

                    if (NULL !== $text)
                    {
                        $len = $ex_from - $from;
                        $text1 = mb_substr($text, 0, $len, 'UTF-8');
                        $scope1->set_anchor_text($text1);
                    }

                    $scopes[$key] = $scope1;

                    //第二部分

                    $new_from2 = $ex_to + 1;
                    $new_to2 = $to;

                    $scope2 = new Annotation_scope();
                    $scope2->set_index($new_from2, $new_to2);
                    $scope2->set_webpage($webpage_id);

                    if (NULL !== $text)
                    {
                        $len = $ex_to - $from;
                        $text2 = mb_substr($text, $len, strlen($text), 'UTF-8');
                        $scope2->set_anchor_text($text2);
                    }

                    $scopes[] = $scope2;
                }
            }
        }

        //$scopes = self::sort_scopes($scopes);
        return $scopes;
    }

    /**
     * @return string
     */
    public function get_anchor_text()
    {
        $scopes = $this->get_scopes();

        $text = '';

        foreach ($scopes AS $scope)
        {
            if ($text != '')
                $text .= ' ';

            $text .= $scope->get_text();
        }

        return $text;
    }

    /**
     *
     * @return array|string
     */
    public function get_anchor_speech()
    {
        $scopes = $this->get_scopes();

        $coll_speechs = array();
        foreach ($scopes AS $scope)
        {
            $speechs = $scope->get_speechs();
            foreach ($speechs AS $sp)
            {
                if (FALSE === in_array($sp, $coll_speechs))
                {
                    $coll_speechs[] = $sp;
                }
            }
        }

        return $coll_speechs;
    }

    /**
     * 序列化，讓範圍可以保存成一段字串。儲存格式是以JSON為主
     */
    public function export_json($export_anchor = FALSE)
    {
        $webpage_scopes = $this->export_data($export_anchor);

        $json = json_encode($webpage_scopes);
        return $json;
    }

    /**
     * 輸出單一網頁的JSON範圍資料
     * @param int|String $webpage_id 可接受網址
     * @param boolean $export_anchor
     * @return string JSON
     */
    public function export_webpage_json($webpage_id, $export_anchor = FALSE)
    {
        $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
        $webpage_id = $this->CI->webpage->filter_webpage_id($webpage_id);
        $webpage_scope = $this->export_webpage_data($webpage_id, $export_anchor);

        $json = json_encode($webpage_scope);
        return $json;
    }
    
    /**
     * 範圍位置輸出成為陣列
     * @param boolean $export_anchor
     * @return Array
     */
    public function export_to_array($export_anchor = FALSE) {
        return $this->export_data($export_anchor);
    }

    public function export_data($export_anchor = FALSE)
    {
        $this->_sort();

        $webpage_scopes = array();
        foreach ($this AS $scope)
        {
            $webpage_id = $scope->get_webpage_id();
            $from_index = $scope->get_from_index();
            $to_index = $scope->get_to_index();
            
            $data = array($from_index, $to_index);
            if ($export_anchor === TRUE)
            {
                $anchor_text_id = $scope->get_field('anchor_text_id');
                if (isset($anchor_text_id))
                    $anchor_text_id = intval($anchor_text_id);
                $data[] = $anchor_text_id;
            }
            
            if (FALSE === isset($webpage_scopes[$webpage_id]))
                $webpage_scopes[$webpage_id] = array();
            
            $webpage_scopes[$webpage_id][] = $data;
        }

        return $webpage_scopes;
    }

    public function export_webpage_data($webpage_id, $export_anchor = FALSE)
    {
        $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
        $webpage_id = $this->CI->webpage->filter_webpage_id($webpage_id);

        $webpage_scopes = $this->export_data($export_anchor);

        if (isset($webpage_scopes[$webpage_id]))
            return $webpage_scopes[$webpage_id];
        else
            return array();
    }

    public function import_json($serialized_json)
    {
        $webpage_scopes = json_decode($serialized_json);
        return $this->import_data($webpage_scopes);
    }

    /**
     * 輸入單一網頁的範圍資料來建立Annotation_scope_collection
     * @param int|String $webpage_id 可接受網址
     * @param String $serialized_json JSON
     * @return Annotation_scope_collection
     */

    public function import_webpage_json($webpage_id, $serialized_json)
    {
        $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
        $webpage_id = $this->CI->webpage->filter_webpage_id($webpage_id);
        $webpage_scope = json_decode($serialized_json);
        return $this->import_webpage_data($webpage_id ,$webpage_scope);
    }

    public function import_data($webpage_scopes)
    {
        $members = array();
        $this->_CI_load('library', 'scope/Annotation_scope', 'annotation_scope');
        foreach ($webpage_scopes AS $webpage_id => $scope_indices)
        {
            $submembers = $this->import_webpage_search_data($webpage_id, $scope_indices);
            foreach ($submembers AS $scope)
            {
                $members[] = $scope;
            }
        }
        $scope_coll = new Annotation_scope_collection();
        $scope_coll->set_members($members);
        return $scope_coll;
    }

    public function import_webpage_data($webpage_id, $scope_indices)
    {
        if (is_string($webpage_id))
        {
            $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
            $webpage_id = $this->CI->webpage->filter_webpage_id($webpage_id);
        }
        
        $members = array();
        
        if (is_int($scope_indices) || is_string($scope_indices)) {
            $scope_indices = array(
                array(
                    intval($scope_indices),
                    intval($scope_indices)
                )
            );
        }

        foreach ($scope_indices AS $scope_index)
        {
            $from = $scope_index[0];
            $to = $scope_index[1];

            $cond = array(
                'from_index' => $from,
                'to_index' => $to,
                'webpage_id' => $webpage_id
            );

            $anchor_text_id = NULL;

            if (isset($scope_index[2]))
            {
                $anchor_text_id = $scope_index[2];
                if (is_int($anchor_text_id) === FALSE)
                {
                    $text = $anchor_text_id;

                    if (is_string(($text))) {
                        $text = urldecode($text);
                    }

                    $this->_CI_load('library', 'scope/Scope_anchor_text');
                    $anchor_text_id = $this->CI->scope_anchor_text->filter_anchor_text_id($text);
                }
                $cond['anchor_text_id'] = $anchor_text_id;
            }

            $scope = $this->CI->annotation_scope->find($cond);
            if (is_null($scope))
            {
                //if (isset($anchor_text_id))
                //    $scope = $this->CI->annotation_scope->create_scope($from, $to, $anchor_text_id, $webpage_id);
                //else
                //    $scope = $this->CI->annotation_scope->create_scope($from, $to, $webpage_id);

            //test_msg('Annotation_scope_collection->import_webpage_data() from to', array($from, $to));

                $scope = $this->CI->annotation_scope->create_scope($from, $to, $anchor_text_id, $webpage_id);

            //test_msg('Annotation_scope_collection->import_webpage_data() create_scope', $scope->get_id());

            }
            $members[] = $scope;
        }

        $scope_coll = new Annotation_scope_collection();
        $scope_coll->set_members($members);
        return $scope_coll;
    }

    public function import_webpage_search_data($webpage_id, $scope_indices)
    {
        if (is_string($webpage_id))
        {
            $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
            $webpage_id = $this->CI->webpage->filter_webpage_id($webpage_id);
        }

        $members = array();
        
        if (is_int($scope_indices) || is_string($scope_indices)) {
            $scope_indices = array(
                array(
                    intval($scope_indices),
                    intval($scope_indices)
                )
            );
        }

        foreach ($scope_indices AS $scope_index)
        {
            $from = $scope_index[0];
            $to = $scope_index[1];

            //test_msg('import webpage list data', $scope_index);

            $scope = new Annotation_scope();
            $scope->set_webpage($webpage_id);
            $scope->set_index($from, $to);

            $members[] = $scope;
        }

        $scope_coll = new Annotation_scope_collection();
        $scope_coll->set_members($members);
        return $scope_coll;
    }

    public function  __toString() {
        return $this->serialization();
    }
}


/* End of file Annotation_scope_collection.php */
/* Location: ./system/application/libraries/annotation/Annotation_scope_collection.php */