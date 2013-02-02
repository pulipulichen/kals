<?php
/**
 * Scope_anchor_text
 *
 * 被標註的文字。
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/1 下午 10:30:38
 * @example
 * 資料表建立SQL：<code>

-- Table: anchor_text

-- DROP TABLE anchor_text;

CREATE TABLE anchor_text
(
  anchor_text_id serial NOT NULL,
  "text" text NOT NULL,
  indexed tsvector NOT NULL,
  segmented text NOT NULL,
  CONSTRAINT anchor_text_pkey PRIMARY KEY (anchor_text_id),
  CONSTRAINT anchor_text_text_key UNIQUE (text)
)
WITH (OIDS=FALSE);
ALTER TABLE anchor_text OWNER TO postgres;

-- View: annotation2anchor_text

-- DROP VIEW annotation2anchor_text;

CREATE OR REPLACE VIEW annotation2anchor_text AS
 SELECT annotation.annotation_id, anchor_text.anchor_text_id, anchor_text.text, anchor_text.indexed, anchor_text.segmented
   FROM annotation
   JOIN annotation2scope USING (annotation_id)
   JOIN scope USING (scope_id)
   JOIN anchor_text USING (anchor_text_id);

ALTER TABLE annotation2anchor_text OWNER TO postgres;
GRANT ALL ON TABLE annotation2anchor_text TO postgres;
GRANT SELECT ON TABLE annotation2anchor_text TO public;

 * </code>
 */
class Scope_anchor_text extends Generic_object {

    # Member Variables
    private $segmentor;

    #Methods
    public function set_text($value)
    {
        $this->set_field('text', $value);
        $this->set_field('indexed', $value);
        $this->set_field('segmented', $value);

        return $this;
    }

    public function get_text()
    {
        return $this->get_field('text');
    }

    public function get_segment($with_speech = TRUE)
    {
        $segment = $this->get_field('segmented');

        if (FALSE === $with_speech)
        {
            $seg_array = explode(' ', $segment);
            $segment = '';
            foreach ($seg_array AS $seg)
            {
                $index = strrpos($seg, '/');
                if (FALSE !== $index)
                {
                    $seg = substr($seg, 0, $index);
                }
                $segment .= $seg.' ';
            }
            $segment = trim($segment);
        }

        return $segment;
    }

    public function get_speechs($count_sort = FALSE)
    {
        $speechs = array();

        $segment = $this->get_field('segmented');

        if (is_null($segment))
            return $speechs;

        $seg_array = explode(' ', $segment);

        if ($count_sort)
            $speech_count = array();
        foreach ($seg_array AS $seg)
        {
            $index = strrpos($seg, '/');
            if (FALSE !== $index)
            {
                $sp = substr($seg, $index + 1);

                if ($count_sort)
                {
                    if (isset($speech_count[$sp]))
                        $speech_count[$sp]++;
                    else
                        $speech_count[$sp] = 1;
                }
                else if (FALSE === in_array($sp, $speechs))
                    array_push($speechs, $sp);
            }
        }

        //然後按照順序排序
        if ($count_sort)
        {
            asort($speech_count);
            foreach($speech_count AS $sp => $count)
            {
                $speechs[] = $sp;
            }
        }

        return $speechs;
    }

    /**
     * 還沒想到這是幹嘛用的
     */
    public function get_result()
    {
    }

    public function get_segment_query()
    {
        $segment = $this->get_segment(FALSE);
        return Segmentor::segment_to_query($segment);
    }

    public function find_anchor_text($text)
    {
        $cond = $this->_create_cond($text);
        return $this->find($cond);
    }

    /**
     * @param String $text
     * @return Scope_anchor_text
     */
    public function create_anchor_text($text)
    {
        $key = 'text';
        $value = $text;
        $anchor_text = get_cache($this, $key, $value);
        if (is_null($anchor_text))
        {
            $cond = $this->_create_cond($text);
            $anchor_text = $this->create($cond);

            if (isset($anchor_text))
            {
                set_cache($anchor_text, $key, $value);
            }
        }
        return $anchor_text;
    }
    
    private function _create_cond($text)
    {
        return array(
            'text' => trim($text)
        );
    }

    public function filter_anchor_text_id($anchor_id)
    {
        if (is_string($anchor_id))
        {
            $text = $anchor_id;
            if (starts_with($text, '%'))
                $text = urldecode ($text);
            
            $anchor_text = $this->create_anchor_text($text);
            $anchor_id = $anchor_text->get_id();
        }
        return $anchor_id;
    }

    //------------------------------------------------
    //Generic Object

    protected $table_name = 'anchor_text';
    protected $table_fields = array('anchor_text_id', 'text', 'indexed', 'segmented');
    protected $primary_key = 'anchor_text_id';
    protected $not_null_field = array('text');
    protected $unique_restriction = array('text');
    protected $default_field = 'text';
    protected $except_bind_fields = array('indexed');

    protected function  _post_construct($table_name = NULL, $id = NULL) {
        $this->_CI_load('library', 'scope/Segmentor_factory', 'segmentor_factory');
        $this->segmentor = Segmentor_factory::create();
        $this->_CI_load('library', 'scope/Segmentor', 'segmentor');
    }

    protected function  _pre_update($data) {
        //parent::_pre_update($data);
        if (isset($data['text']))
        {
            $seg = $this->segmentor->text_to_segment($data['text']);

            if (is_null($seg['text']) === FALSE)
            {
                $data['indexed'] = "to_tsvector('english', '".$seg['text']."')";
                $this->set_field('indexed', $data['indexed']);
            }

            if (is_null($seg['speech']) === FALSE)
            {
                $data['segmented'] = $seg['speech'];
                $this->set_field('segmented', $seg['speech']);
            }
        }
        return $data;
    }

    protected function  _set_field_filter($cond) {
        if (isset($cond['text']))
            $cond['text'] = trim($cond['text']);
        return $cond;
    }

    /*
    public function update()
    {
        $pk = $this->primary_key;
    	$id = $this->get_id();
    	$table_name = $this->table_name;

    	if (FALSE === isset($this->id))
            $this->loaded = FALSE;

    	$data = self::_get_table_data($this->database_fields, $this->table_fields);
        $data = $this->_pre_update($data);

        if (count($data) > 0)
        {
            if (FALSE === $this->loaded)
            {

                #假設這是一個新項目
                if (FALSE === self::_check_unique($this)
                    OR FALSE === self::_check_not_null($this->database_fields, $this->not_null_field))
                {
                    test_msg(array('約束沒過', self::_check_unique($this)
                        , self::_check_not_null($this->database_fields, $this->not_null_field)));
                    return $this;
                }

                $binds = array();
                $fields = '';
                $values = '';
                foreach ($data AS $field => $value)
                {
                    if ($fields != '')
                        $fields .= ', ';
                    $fields .= $field;

                    if ($values != '')
                        $values .= ', ';

                    if ($field != 'indexed')
                    {
                        $values .= '?';
                        $binds[] = $value;
                    }
                    else
                    {
                        $values .= $value;
                    }
                }

                $sql = 'INSERT INTO '.$table_name.' ('.$fields.') VALUES ('.$values.') ';

                $this->db->query($sql, $binds);
                    //$this->db->set($data);
                    //$this->db->insert($table_name);

                //然後取得新增的ID
//                $query = $this->db->select_max($pk)
//                                ->where($data)
//                                ->get($table_name);
//
//                $result = $query->row_array(); //$query->first_row('array', 0);
//                test_msg($result);
//                $proposed_id = $result[$pk];
                $query = $this->db->select_max($pk)
                                ->where($data)
                                ->get($table_name);
                $result = $query->row_array(); //$query->first_row('array', 0);
                $proposed_id = $result[$pk];


                if ($proposed_id > 0)
                {
                        $this->loaded = TRUE;
                        $this->id = $proposed_id;
                }

                $this->_post_insert();
            }
            else
            {
                $binds = array();
                $set = '';
                foreach ($data AS $field => $value)
                {
                    if ($set != '')
                        $set .= ', ';
                    if ($field != 'indexed')
                    {
                        $set .= $field.' = ?';
                        $binds[] = $value;
                    }
                    else
                        $set .= $field.' = '.$value;
                }
                $this->db->query($sql, $binds);
            }
        }   //if (count($data) > 0)
    	return $this;
    }
    */

    

//   protected function  _do_insert($data, $table_name) {
//        $this->_do_insert_binds($data, array('indexed'), $table_name);
//    }
}

/* End of file Scope_anchor_text.php */
/* Location: ./system/application/libraries/annotation/Scope_anchor_text.php */