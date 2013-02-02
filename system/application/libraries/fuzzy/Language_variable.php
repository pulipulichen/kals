<?php
include_once 'Output_language_variable_collection.php';
/**
 * Language_variable
 *
 * 語言變數
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/13 下午 01:38:31
 * @property Output_language_variable_collection $membership
 * @property Annotation $annotation
 * @example
 * 資料表建立：<code>

-- Table: langvar

-- DROP TABLE langvar;

CREATE TABLE langvar
(
  langvar_id serial NOT NULL,
  webpage_id integer NOT NULL,
  langvar_type_id integer NOT NULL,
  function_variables text,
  threshold numeric,
  record numeric,
  weight numeric,
  updated boolean NOT NULL DEFAULT false,
  CONSTRAINT langvar_pkey PRIMARY KEY (langvar_id),
  CONSTRAINT langvar_webpage_id_fkey FOREIGN KEY (webpage_id)
      REFERENCES webpage (webpage_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT langvar_webpage_id_key UNIQUE (webpage_id, langvar_type_id)
)
WITH (OIDS=FALSE);
ALTER TABLE langvar OWNER TO postgres;

 * </code>
 */
class Language_variable extends Generic_attribute_object {

    //------------------------------------
    # Generic Object

    protected $table_name = 'langvar';
    protected $primary_key = 'langvar_id';
    protected $table_fields = array('langvar_id', 'webpage_id', 'langvar_type_id', 'function_variables', 'record', 'threshold', 'weight', 'updated');
    protected $not_null_field = array('webpage_id', 'langvar_type_id');

    protected $unique_restriction = array('webpage_id', 'langvar_type_id');

    //------------------------------------
    # Generic_attribute_object
    # Member Varibles
    protected $type_id;
    protected $type_field = 'langvar_type_id';

    protected $name;

    # Methods

    //-------------------------------------
    # Language_variable

    // Member Variable
    protected $renewable = FALSE;
    protected $nominal_feature = TRUE;
    protected $membership;
    protected $annotation;

    protected function  _initialize($table_name, $tuple_id = NULL) {
        if ($this->renewable)
            parent::_initialize($table_name, $tuple_id);
        else
            return $this;
    }

    public function set_webpage($webpage_id)
    {
        $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
        $webpage_id = $this->CI->webpage->filter_webpage_id($webpage_id);
        return $this->set_field('webpage_id', $webpage_id);
    }

    public function set_annotation(Annotation $annotation)
    {
        $this->annotation = $annotation;
        if (isset($annotation))
        {
            $this->membership = $this->calculate_membership($annotation);
            $ary = $this->membership->get_membership_array();
            //test_msg('lang', array($annotation->get_id(), $this->type_id, $ary[0], $ary[1], $ary[2]));
        }
        return $this;
    }

    public function get_membership(Annotation $annotation = NULL)
    {
        if (isset($annotation))
            $this->set_annotation($annotation);
        return $this->membership;
    }
    public function get_membership_array(Annotation $annotation = NULL)
    {
        if (isset($annotation))
            $this->set_annotation($annotation);
        $ary = NULL;
        if (isset($this->membership))
            $ary = $this->membership->get_membership_array();
        return $ary;
    }

    public function get_membership_defuzzy(Annotation $annotation = NULL)
    {
        if (isset($annotation))
            $this->set_annotation($annotation);
        $output = NULL;
        if (isset($this->membership))
            $output = $this->membership->get_defuzzy_code();
        return $output;
    }
    
    public function  update() {
        if ($this->renewable)
            return parent::update();
        else
            return $this;
    }

    protected function _get_parameters()
    {
        return $this->get_field('function_variables');
    }
    protected function _set_parameters($parameters)
    {
        $function_variables = '';
        foreach ($parameters AS $p)
        {
            if ($function_variables != '')
                $function_variables .= ',';
            $function_variables .= $p;
        }

        $this->set_field('function_variables', $function_variables);
        return $this;
    }

    /**
     * @param Annotation $annotation
     * @return Output_language_variable_collection
     */
    public function calculate_membership(Annotation $annotation)
    {
        if (is_null($annotation))
            return NULL;

        
        $memebership = NULL;

        if ($this->renewable)
        {
            $parameters = $this->_get_parameters();
            if (is_null($parameters))
            {
                $memebership = $this->_get_membership_default($annotation);
            }
            else
            {
                $memebership = $this->_get_membership_renew($annotation, $parameters);
            }

            $this->set_record($annotation);
            if ($this->check_threshold())
            {
                $this->renew_threshold();
            }
            $this->update();
        }
        else
        {
            $memebership = $this->_get_membership_default($annotation);
        }

        return $memebership;
    }

    /**
     * 預設計算關係度的方法
     * @param Annotation $annotation
     * @return Output_language_variable_collection
     */
    protected function _get_membership_default(Annotation $annotation)
    {
        //請由子類別來覆寫此方法
        $feature = $this->get_feature($annotation);

        $this->_CI_load('library', 'fuzzy/Output_language_variable_collection', 'output_language_variable_collection');
        $membership = new Output_language_variable_collection();

        $this->CI->config->load('kals');
        $membership_function_variables = $this->CI->config->item($this->name.'.membership_function_variables');

        if ($this->nominal_feature)
        {
            $var = $membership_function_variables['default'];
            if (isset($membership_function_variables[$feature]))
                $var = $membership_function_variables[$feature];
            //if ($annotation->get_id() == 2363)
            //    test_msg(array(json_encode ($var), $feature, $this->name, 'default'));
            //if ($this->type_id == 6)
            //    test_msg('有找到membership function嗎？', array($annotation->get_id(), isset($membership_function_variables[$feature]), $feature));
            $membership->set_memberships($var);
        }
        else
        {
            //if ($annotation->get_id() == 2348 && $this->name == 'langvar.like')
            //    test_msg(json_encode($membership_function_variables));
            foreach ($membership_function_variables AS $key => $ms_var)
            {
                //if ($annotation->get_id() == 2348 && $this->name == 'langvar.like')
                //    test_msg(array($feature, $key, ($feature <= $key), ($key === 'default')));

                if ($feature <= $key)
                {
                    $var = $membership_function_variables[$key];
                    //if ($annotation->get_id() == 2348 && $this->name == 'langvar.like')
                    //    test_msg(array($feature, json_encode ($var), $key, $this->name));
                    $membership->set_memberships($var);
                    break;
                }
                
                if ($key === 'default')
                {
                    $var = $membership_function_variables[$key];
                    //if ($annotation->get_id() == 2348 && $this->name == 'langvar.like')
                    //    test_msg(array($feature, json_encode ($var), $key, $this->name, 'default'));
                    $membership->set_memberships($var);
                    break;
                }
            }
        }

        return $membership;
    }

    /**
     * 改良過後計算關係度的方法
     * @param Annotation $annotation
     * @return Output_language_variable_collection
     */
    protected function _get_membership_renew(Annotation $annotation, $parameters)
    {
        //請由子類別來覆寫此方法
        $variables = explode(',', $parameters);
        $feature = $this->get_feature($annotation);

        $this->_CI_load('library', 'fuzzy/Output_language_variable_collection', 'output_language_variable_collection');
        $membership = new Output_language_variable_collection();
        $membership->set_zero();

        if (count($variables) > 1)
        {
            if ($feature <= $variables[0])
            {
                $membership->set_membership(0, 1);
            }
            else if ($feature >= $variables[count($variables)-1])
            {
                $membership->set_membership(count($variables)-1, 1);
            }
            else
            {
                for ($i = 0; $i < count($variables)-1; $i++)
                {
                    $now = $variables[$i];
                    $next = $variables[($i+1)];
                    if ($feature > $now
                        && $feature <= $next)
                    {
                        $len = $next - $now;
                        $m1 = 1 - ($feature - $now) / $len;
                        $m2 = 1 - ($next - $feature) / $len;

                        $membership->set_membership(($i), $m1);
                        $membership->set_membership(($i+1), $m2);
                        break;
                    }
                }
            }
        }

        return $membership;
    }

    public function get_null_membership()
    {
        $membership = new Output_language_variable_collection();
        return $membership;
    }

    public function get_weight()
    {
        $weight = $this->get_field('weight');
        if (is_null($weight))
        {
            $name = $this->get_name();
            $weight = $this->CI->config->item($name.'.weight');
        }
        return $weight;
    }

        //------------------------------
    //特殊才需要使用
    public function get_record()
    {
        $record = $this->get_field('record');
        if (is_null($record))
            $record = 0;
        return $record;
    }

    protected function set_record(Annotation $annotation)
    {
        $feature = $this->get_feature($annotation);

        $record = $this->get_record();
        if ($feature > $record)
        {
            $this->set_field('record', $feature);
        }
        return $this;
    }
    
    protected function get_threshold()
    {
        $threshold = $this->get_field('threshold');
        if (is_null($threshold))
        {
            $this->CI->config->load('kals');
            $threshold = $this->CI->config->item($this->name.'.threshold');
            if ($threshold === FALSE)
                $threshold = 15;

            $this->set_field('threshold', $threshold);
        }
        return $threshold;
    }

    protected function check_threshold()
    {
        $record = $this->get_record();
        $threshold = $this->get_threshold();
        if (is_null($record) || is_null($threshold))
            return FALSE;
        else
            return ($record > $threshold);
    }

    protected function get_new_threshold()
    {
        $threshold = $this->get_threshold();

        $this->CI->config->load('kals');
        $threshold_factor = $this->CI->config->item($this->name.'.threshold_factor');
        if ($threshold_factor === FALSE)
            $threshold_factor = 2;

        $threshold = $threshold * $threshold_factor;
        return $threshold;
    }

    protected function renew_function_variables()
    {
        //這邊請用k-means來做
        $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
        $function_variables = NULL;

        $webpage_id = intval($this->get_field('webpage_id'));
        $webpage = new Webpage($webpage_id);

        $annotation_coll = $webpage->get_appended_annotation();

        //標註數量太少的話就沒有分群的價值，取消分群
        if ($annotation_coll->length() < 20)
            return $this;

        $data = array();
        foreach ($annotation_coll AS $annotation)
        {
            $data[] = $this->get_feature($annotation);
        }

        $this->_CI_load('library', 'fuzzy/Output_language_variable_collection', 'output_language_variable_collection');
        $membership = new Output_language_variable_collection();
        $number = $membership->get_number();

        $this->_CI_load('library', 'fuzzy/Clustering', 'clustering');
        $clustering = Clustering::get_clustering();

        $clustering->set_data($data);
        $clustering->set_clusters_number($number);

        $positions = $clustering->get_result_positions();

        $function_variables = '';
        foreach ($positions AS $p)
        {
            if ($function_variables != '')
                $function_variables .= ',';
            $function_variables .= $p;
        }

        $this->set_field('function_variables', $function_variables);
        return $this;
    }

    protected function renew_threshold()
    {
        if (FALSE === $this->check_threshold())
            return $this;

        $this->renew_function_variables();
        $new_threshold = $this->get_new_threshold();
        $this->set_field('updated', 'TRUE');
        $this->set_field('threshold', $new_threshold);
        return $this;
    }

    protected function get_feature(Annotation $annotation)
    {
        //請子類別覆寫此方法
        return NULL;
    }

    public function find_langvar($webpage_id)
    {
        $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
        $webpage_id = $this->CI->webpage->filter_webpage_id($webpage_id);

        $langvar = $this->find(array(
            'webpage_id' => $webpage_id,
            'langvar_type_id' => $this->type_id
        ));
        if (is_null($langvar))
        {
            $class_name = get_class($this);
            $langvar = new $class_name();
            $langvar->set_webpage($webpage_id);
        }
        return $langvar;
    }

    public function has_updated()
    {
        $updated = $this->get_field('updated');
        if ($updated == 'TRUE'
            OR $updated === TRUE)
            return TRUE;
        else
            return FALSE;
    }
}


/* End of file Language_variable.php */
/* Location: ./system/application/libraries/fuzzy/Language_variable.php */