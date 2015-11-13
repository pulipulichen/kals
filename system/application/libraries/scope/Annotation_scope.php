<?php
/**
 * Annotation_scope
 *
 * 標註的範圍
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/1 下午 10:59:59
 * @property Scope_anchor_text $anchor_text
 * @example
 * 資料表建立：<code>

-- Table: scope

-- DROP TABLE scope;

CREATE TABLE scope
(
  scope_id serial NOT NULL,
  webpage_id integer NOT NULL,
  from_index integer NOT NULL,
  to_index integer NOT NULL,
  anchor_text_id integer NOT NULL,
  CONSTRAINT scope_pkey PRIMARY KEY (scope_id),
  CONSTRAINT scope_anchor_text_id_fkey FOREIGN KEY (anchor_text_id)
      REFERENCES anchor_text (anchor_text_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT scope_webpage_id_fkey FOREIGN KEY (webpage_id)
      REFERENCES webpage (webpage_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (OIDS=FALSE);
ALTER TABLE scope OWNER TO postgres;

 * </code>
 */
class Annotation_scope extends Generic_object {

    # Memver Varibles
    private $anchor_text;
    protected $use_cache = FALSE;
    
    # Methods
    public function create_scope($from, $to, $anchor_text_id = NULL, $webpage_id = NULL)
    {
        if (is_int($anchor_text_id) === FALSE)
        {
            $text = $anchor_text_id;
            $this->_CI_load('library', 'scope/Scope_anchor_text');
            $anchor_text_id = $this->CI->scope_anchor_text->filter_anchor_text_id($text);
        }

        if (NULL !== $webpage_id)
        {
            $key = $from.'-'.$to;
            if (is_object($webpage_id)) {
                $webpage_id = $webpage_id->get_id();
            }
            $value = $webpage_id;
            $scope = get_cache($this, $key, $value);
            
            if (is_null($scope))
            {
                $data = $this->_create_cond($webpage_id, $from, $to, $anchor_text_id);
                $scope = $this->find($data);
                if (is_null($scope)) {
                    //test_msg('Annotation_scope->create_scope() not find, before create', $data);
                    $scope = $this->create($data);
                }
                set_cache($scope, $key, $value);
            }

            return $scope;
        }
        else
        {
            $key = $from;
            $value = $to;
            $scope = get_cache($this, $key, $value);

            if (is_null($scope))
            {
                $scope = new Annotation_scope();
                $scope->set_index($from, $to);
                if (NULL != $anchor_text_id)
                {
                    $scope->set_anchor_text($anchor_text_id);
                }
                set_cache($scope, $key, $value);
            }

            return $scope;
        }
    }

    public function set_index($from = NULL, $to = NULL)
    {
        $this->set_field('from_index', $from);
        $this->set_field('to_index', $to);
        return $this;
    }

    public function get_index($from = NULL, $to = NULL)
    {
        if (is_int($from) === FALSE 
            && is_int($to) === FALSE)
        {
            $from = intval($this->get_field('from_index'));
            $to = intval($this->get_field('to_index'));
        }

        if (is_null($from) AND is_null($to)) {
            return NULL;
        }
        if (is_null($from)) {
            $from = $to;
        }
        else if (is_null($to)) {
            $to = $from;
        }

        $from = intval($from);
        $to = intval($to);
        if ($from > $to)
        {
            $temp = $from;
            $from = $to;
            $to = $temp;

            $this->database_fields['from_index'] = $from;
            $this->database_fields['to_index'] = $to;
        }

        $index = array(
            'from' => $from,
            'to' => $to
        );

        return $index;
    }

    /**
     * 取得開頭的索引
     * @return int
     */
    public function get_from_index()
    {
        return intval($this->get_field('from_index'));
    }

    /**
     * 取得結尾的索引
     * @return int
     */
    public function get_to_index()
    {
        return intval($this->get_field('to_index'));
    }

    public function get_length()
    {
        $index = $this->get_index();

        return $index['to'] - $index['from'] + 1;
    }

    // -----------------------------
    
    public function set_anchor_text($text)
    {
        if (is_null($text)) {
            return $this;
        }

        if (is_null($this->anchor_text))
        {
            $this->_CI_load('library', 'scope/Scope_anchor_text', 'scope_anchor_text');
            $this->anchor_text = $this->CI->scope_anchor_text->create_anchor_text($text);
            $this->set_field('anchor_text_id', $this->anchor_text->get_id());
        }
        else
        {
            $this->anchor_text->set_text($text);
        }

        return $this;
    }

    /**
     * @return Scope_anchor_text
     */
    public function get_anchor_text()
    {
        if (is_null($this->anchor_text))
        {
            $anchor_text_id = $this->get_field('anchor_text_id');
            if (NULL != $anchor_text_id)
            {
                $this->_CI_load('library', 'scope/Scope_anchor_text', 'scope_anchor_text');
                $this->anchor_text = new Scope_anchor_text($anchor_text_id);
            }
            else
            {
                test_msg('沒有$anchor_text_id到底是？', $this->database_fields);
            }
        }
        return $this->anchor_text;
    }
    
    // -----------------------------
    
    /**
     * 取得範圍類型
     * @author Pulipuli Chen <pulipuli.chen@gmail.com> 20151113
     * @return String
     */
    public function get_type() {
        return $this->get_field('type');
    }
    
    /**
     * 設定範圍類型
     * @author Pulipuli Chen <pulipuli.chen@gmail.com> 20151113
     * @param String $type
     * @return \Annotation_scope
     */
    public function set_type($type) {
        return $this->set_field('type', $type);
    }

    // -----------------------------

    public function get_speechs($count_sort = FALSE)
    {
        $anchor_text = $this->get_anchor_text();
        if (is_null($anchor_text)) {
            return array();
        }
        else {
            return $anchor_text->get_speechs($count_sort);
        }
    }

    public function get_text()
    {
        $anchor_text= $this->get_anchor_text();
        if (is_null($anchor_text))
            return NULL;
        else
            return $anchor_text->get_text();
    }

    private function _create_cond($webpage_id, $from, $to, $anchor_text_id)
    {
        $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
        $webpage_id = $this->CI->webpage->filter_webpage_id($webpage_id);
        $this->_CI_load('library', 'scope/Scope_anchor_text', 'scope_anchor_text');
        $anchor_text_id = $this->CI->scope_anchor_text->filter_anchor_text_id($anchor_text_id);

//        if ($from > $to)
//        {
//            $temp = $from;
//            $from = $to;
//            $to = $temp;
//        }

        $cond = array(
            'webpage_id' => $webpage_id,
            'from_index' => $from,
            'to_index' => $to,
            'anchor_text_id' => $anchor_text_id
        );
        return $cond;
    }

    public function set_webpage($webpage_id) {
        $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
        $webpage_id = $this->CI->webpage->filter_webpage_id($webpage_id);

        return $this->set_field('webpage_id', $webpage_id);
    }

    public function get_webpage_id()
    {
        $webpage_id = $this->get_field('webpage_id');
        if (isset($webpage_id))
            $webpage_id = intval($webpage_id);
        return $webpage_id;
    }

    //------------------------------------
    # Generic Object

    protected $table_name = 'scope';
    protected $table_fields = array('scope_id', 'webpage_id', 'from_index', 'to_index', 'anchor_text_id');
    protected $primary_key = 'scope_id';
    protected $not_null_field = array('webpage_id', 'from_index', 'to_index', 'anchor_text_id');
    protected $unique_restriction = array('webpage_id', 'from_index', 'to_index', 'anchor_text_id');


    protected function _set_field_filter($cond) {
        if (isset($cond['from_index']) && isset($cond['to_index'])
            && $cond['from_index'] > $cond['to_index'])
        {
            $temp = $cond['from_index'];
            $cond['from_index'] = $cond['to_index'];
            $cond['to_index'] = $temp;
        }
        return $cond;
    }

    protected function  _pre_update($data) {
        if (is_null($this->get_field('anchor_text_id'))
            && NULL !== $this->get_field('anchor_text_id')
            && isset($this->anchor_text))
        {
            $anchor_text_id = $this->anchor_text->get_id();
            $this->set_field('anchor_text_id', $anchor_text_id);
            $data['anchor_text_id'] = $anchor_text_id;
        }
        if (isset($data['from_index']) && isset ($data['to_index'])
            && $data['from_index'] > $data['to_index'])
        {
            $temp = $data['from_index'];
            $data['from_index'] = $data['to_index'];
            $data['to_index'] = $temp;

            $this->database_fields['from_index'] = $data['from_index'];
            $this->database_fields['to_index'] = $data['to_index'];
        }
        return $data;
    }

    protected function _post_construct($table_name = NULL, $id = NULL)
    {
        if (is_array($table_name))
        {
            $this->_CI_load('library', 'scope/Scope_anchor_text', 'scope_anchor_text');

            //if (isset($table_name['anchor_text_id']))
            //    $this->anchor_text = new Scope_anchor_text($table_name['anchor_text_id']);
            $this->anchor_text = new Scope_anchor_text($table_name);
        }
    }
}


/* End of file Annotation_scope.php */
/* Location: ./system/application/libraries/.../Annotation_scope.php */