<?php
include_once 'KALS_resource.php';
/**
 * Webpage
 *
 * 網頁
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/27 下午 09:14:42
 * @property Authorize_manager $auth
 * @property Language_variable_collection $langvar_coll
 * @example
 * 資料表建立：<code>

-- Table: webpage

-- DROP TABLE webpage;

CREATE TABLE webpage
(
  webpage_id serial NOT NULL,
  uri character varying(2083) NOT NULL,
  title text,
  domain_id integer NOT NULL,
  CONSTRAINT webpage_pkey PRIMARY KEY (webpage_id)
)
WITH (OIDS=FALSE);
ALTER TABLE webpage OWNER TO postgres;

-- View: webpage2annotation

-- DROP VIEW webpage2annotation;

CREATE OR REPLACE VIEW webpage2annotation AS
 SELECT DISTINCT scope.webpage_id, annotation.annotation_id
   FROM annotation
   JOIN annotation2scope ON annotation.annotation_id = annotation2scope.annotation_id
   JOIN scope ON annotation2scope.scope_id = scope.scope_id
  ORDER BY scope.webpage_id;

ALTER TABLE webpage2annotation OWNER TO postgres;


 * </code>
 */
class Webpage extends KALS_resource {

    public $resource_type_id = 2;

    protected $table_name = 'webpage';
    protected $table_fields = array('webpage_id', 'uri', 'title', 'domain_id');
    protected $primary_key = 'webpage_id';
    protected $not_null_field = array('uri', 'domain_id');
    protected $unique_restriction = array('uri', 'domain_id');
    protected $default_field = 'url';
//    protected $foreign_keys = array(
//         'webpage2annotation' => 'webpage_id',
//         'user' => 'domain_id',
//         'group' => 'domain'
//    );

    private $auth;
    private $langvar_coll;

    protected function  _post_construct($table_name = NULL, $id = NULL) {
    	$this->_CI_load('library', 'policy/Authorize_manager', 'authorize_manager');
        $this->auth = new Authorize_manager();
        $this->auth->set_resource($this);
        $this->auth->set_throw_exception(TRUE);

        $this->_CI_load('library', 'fuzzy/Language_variable_collection', 'language_variable_collection');
        $this->langvar_coll = new Language_variable_collection($this);
    }

    protected function _set_field_filter($cond)
    {
        if (is_array($cond) && array_key_exists('url', $cond))
        {
            $cond['uri'] = parse_uri($cond['url']);
            $this->_CI_load('library', 'kals_resource/Domain');
            //$domain = new Domain();
            //$cond['domain_id'] = $domain->filter_domain_id($cond['url']);
            $cond['domain_id'] = $this->CI->domain->filter_domain_id($cond['url']);
        }
        return $cond;
    }

    protected function _pre_update($data)
    {
        //插入權限檢查
        //$this->auth->allow(2);

        if (FALSE === isset($data['title'])
            OR is_null($data['title']))
        {
            $title = retrieve_title($this->get_url());
            if (NULL != $title)
            {
                $data['title'] = $title;
                $this->set_field('title', $title);
            }
        }
        return $data;
    }

    protected function  _post_update() {
        $this->langvar_coll->update();
    }

    protected function _pre_create($data)
    {
        //插入權限檢查
        //$this->auth->allow(2);

        if ((FALSE === isset($data['domain_id'])
            OR is_null($data['domain_id']))
            && isset($data['url']))
        {
            $domain = $this->CI->domain->create($data['url']);
            $data['domain_id'] = $domain->get_id();
        }
        return $data;
    }

    protected function _pre_delete()
    {
        //插入權限檢查
        $this->auth->allow(2);
    }
    
    public function get_domain()
    {
        $domain_id = $this->get_field('domain_id');
        if ($domain_id != NULL)
            return new Domain($domain_id);
        else
            return NULL;
    }

    public function get_url()
    {
        $uri = $this->get_field('uri');
        $domain = $this->get_domain();
        if (is_null($domain))
            return NULL;
        $host = $domain->get_field('host');
        $url = combine_url($host, $uri);
        return $url;
    }

    public function get_uri()
    {
        return $this->get_field('uri');
    }

    public function get_title()
    {
        return $this->get_field('title');
    }

    public function filter_webpage_id($webpage_id)
    {
        if (is_object($webpage_id))
            $webpage_id = $webpage_id->get_id();
        if (is_string($webpage_id) && url_is_link($webpage_id, FALSE))
        {
            $webpage = $this->create(array('url' => $webpage_id));
            $webpage_id = $webpage->get_id();
        }
        return $webpage_id;
    }

    /**
     * @param String|Webpage|int $webpage_id
     * @return Webpage 
     */
    public function filter_webpage_object($webpage)
    {
        if (is_object($webpage))
            return $webpage;
        if (is_string($webpage) && url_is_link($webpage, FALSE))
        {
            $webpage = $this->create(array('url' => $webpage));
            return $webpage;
        }
        else
            return new Webpage($webpage);
    }

    public function get_appended_annotation()
    {
        $this->_CI_load('library', 'search/Search_annotation_collection', 'search_annotation_collection');

        $search = new Search_annotation_collection();
        $search->set_target_webpage($this->get_id());
        $search->set_check_authorize(FALSE);
        $search->disable_limit();
        $search->disable_offset();
        
        return $search;
    }

    /**
     * @return Language_variable_collection
     */
    public function get_langvar_coll()
    {
        return $this->langvar_coll;
    }

    public function get_score_calculator()
    {
        $this->_CI_load('library', 'fuzzy/Annotation_score_calculator', 'annotation_score_calculator');

        $calculator = new Annotation_score_calculator($this);
        return $calculator;
    }

    /**
     * 取得標註建議指導者
     * @return Annotation_tutor 
     */
    public function get_tutor()
    {
        $this->_CI_load('library', 'recommend/Annotation_tutor', 'annotation_tutor');
        return new Annotation_tutor($this);
    }
}


/* End of file Webpage.php */
/* Location: ./system/application/libraries/kals_resource/Webpage.php */