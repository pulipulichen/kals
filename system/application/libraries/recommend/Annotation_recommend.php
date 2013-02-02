<?php
/**
 * Annotation_recommend
 *
 * 標註推薦
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/18 上午 11:41:49
 * @property Tip_collection $tip_coll
 * @example
 * 資料表建立：<code>

-- Table: recommend

-- DROP TABLE recommend;

CREATE TABLE recommend
(
  recommend_id integer NOT NULL DEFAULT nextval('annotation2recommend_recommend_id_seq'::regclass),
  recommended_annotation_id integer NOT NULL,
  recommended_webpage_id integer,
  create_timestamp time with time zone NOT NULL DEFAULT now(),
  checked_timestamp time with time zone,
  accept boolean,
  recommend_by_annotation_id integer,
  deleted boolean NOT NULL DEFAULT false,
  CONSTRAINT annotation2recommend_pkey PRIMARY KEY (recommend_id),
  CONSTRAINT annotation2recommend_recommend_by_annotation_id_fkey FOREIGN KEY (recommend_by_annotation_id)
      REFERENCES annotation (annotation_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT annotation2recommend_recommended_annotation_id_fkey FOREIGN KEY (recommended_annotation_id)
      REFERENCES annotation (annotation_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT annotation2recommend_recommended_webpage_id_fkey FOREIGN KEY (recommended_webpage_id)
      REFERENCES webpage (webpage_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (OIDS=FALSE);
ALTER TABLE recommend OWNER TO postgres;

 * </code>
 */
class Annotation_recommend extends Generic_object {

    // Generic Object

    protected $table_name = 'recommend';
    protected $primary_key = 'recommend_id';
    protected $table_fields = array('recommend_id', 'recommended_annotation_id', 'recommended_webpage_id'
        , 'recommend_by_annotation_id'
        , 'create_timestamp', 'checked_timestamp', 'accept', 'deleted');

    protected $unique_restriction = array('recommended_annotation_id', 'recommended_webpage_id');

    protected $fake_delete = 'deleted';

    //------------------------------------

    // Member Varibles

    private $tip_coll;

    // Methods

    public function create_recommend(Annotation $recommended, Annotation $recommend_by, $webpage)
    {
        $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
        $webpage_id = $this->CI->webpage->filter_webpage_id($webpage);

        $cond = array(
            'recommended_annotation_id' => $recommended->get_id(),
            'recommended_webpage_id' => $webpage_id
        );

        $recommend = $this->find($cond);
        if (is_null($recommend))
        {
            $cond['recommend_by_annotation_id'] = $recommend_by->get_id();
            $recommend = $this->create($cond);
        }
        return $recommend;
    }

    public function set_webpage($webpage_id)
    {
        $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
        $webpage_id = $this->CI->webpage->filter_webpage_id($webpage_id);
        return $this->set_field('recommended_webpage_id', $webpage_id);
    }

    /**
     * 取得推薦所在的網頁
     * @return Webpage
     */
    public function get_webpage()
    {
        $this->_CI_load('library', 'kals_resource/Webpage', 'webpage');
        $webpage_id = $this->get_field('recommended_webpage_id');
        if (isset($webpage_id))
        {
            $webpage_id = intval ($webpage_id);
            return new Webpage($webpage_id);
        }
        else
            return NULL;
    }

    private $recommend_by;
    public function set_recommend_by(Annotation $annotation)
    {
        $this->recommend_by = $annotation;
        $annotation_id = $annotation->get_id();
        if (isset($annotation_id))
            $this->set_field('recommend_by_annotation_id', $annotation_id);
    }

    /**
     * 取得要推薦給標註的標註
     * @return Annotation
     */
    public function get_recommend_by()
    {
        if (is_null($this->recommend_by))
        {
            $annotation_id = $this->get_field('recommend_by_annotation_id');
            if (isset($annotation_id))
            {
                $annotation_id = intval($annotation_id);
                $this->recommend_by = new Annotation($annotation_id);
            }
        }
        return $this->recommend_by;
    }

    public function has_recommend_by() {
        $recommend_by = $this->get_recommend_by();
        $has = FALSE;
        if (isset($recommend_by))
        {
            $id = $recommend_by->get_id();
            if (isset($id))
                $has = TRUE;
        }

        return $has;
    }

    private $recommended;
    public function set_recommended(Annotation $annotation)
    {
        $this->recommended = $annotation;
        $annotation_id = $annotation->get_id();
        if (isset($annotation_id))
            $this->set_field('recommended_annotation_id', $annotation_id);
    }

    /**
     * 取得需要推薦的標註
     * @return Annotation
     */
    public function get_recommended()
    {
        if (is_null($this->recommended))
        {
            $annotation_id = $this->get_field('recommended_annotation_id');
            if (isset($annotation_id))
            {
                $annotation_id = intval($annotation_id);
                $this->recommended = new Annotation($annotation_id);
            }
        }
        return $this->recommended;
    }
    
    /**
     * 取得提示
     * @return Tip_collection
     */
    public function get_tips()
    {
        if (is_null($this->tip_coll))
        {
            $webpage_id = $this->get_field('recommended_webpage_id');
            $recommended_id = $this->get_field('recommended_annotation_id');

            if (isset($webpage_id) && isset($recommended_id))
            {
                $this->_CI_load('library', 'recommend/Tip_collection', 'tip_collection');
                $this->tip_coll = new Tip_collection();
                $this->tip_coll->set_webpage($webpage_id);
                $this->tip_coll->set_annotation(new Annotation($recommended_id));
            }
        }
        return $this->tip_coll;
    }

    public function get_tips_text_array()
    {
        $tip_coll = $this->get_tips();
        return $tip_coll->get_tip_text_array();
    }

    public function get_tips_index_array()
    {
        $tip_coll = $this->get_tips();
        return $tip_coll->get_tip_index_array();
    }

    public function is_checked()
    {
        $checked = $this->get_field('checked_timestamp');
        if (is_null($checked) OR $checked == '')
            return FALSE;
        else
            return TRUE;
    }

    public function get_checked_timestamp()
    {
        return $this->get_field('checked_timestamp');
    }

    public function is_accepted()
    {
        $accept = $this->get_field('accept');
        if ($accept === TRUE
            OR $accept == 'TRUE')
            return TRUE;
        else
            return FALSE;
    }

    /**
     * 接受建議。接受後回傳變更過後的標註資料
     * @param boolean $accept
     * @return Annotation
     */
    public function set_accept($accept = TRUE)
    {
        if ($accept == 'TRUE'
            OR $accept == 'T')
            $accept = TRUE;

        $annotation = NULL;
        if ($accept === TRUE)
        {
            $this->set_field ('accept', 'TRUE');

            //刪除原有標註，並且新增標註
            $recommend_by = $this->get_recommend_by();
            $recommended = $this->get_recommended();
            if (isset($recommend_by))
            {
                $recommend_scope = $recommend_by->get_scopes();

                $user = $recommended->get_user();

                $this->_CI_load('library', 'kals_resource/Annotation', 'annotation');
                $annotation = $this->CI->annotation->create_annotation($user, $recommend_scope);

                //把其他特徵都加進去吧
                $annotation->import($recommended);

                //重新分數計算
                $webpage = $this->get_webpage();
                $calculator = $webpage->get_score_calculator();
                $calculator->setup_annotation_scores($annotation);
            }
            else
            {
                
                //$annotation = $this->get_recommended();
                $annotation = NULL;
            }

            $recommended = $this->get_recommended();
            $recommended->delete();
            $recommended->update();
        }
        else
        {
            $this->set_field('accept', 'FALSE');
            $annotation = $this->get_recommended();
        }

        $this->set_field('checked_timestamp', get_timestamp());
        $this->update();
        $this->delete();
        return $annotation;
    }

    public function export_webpage_data($url)
    {
        $recommend_data = array();

        $tips = $this->get_tips_text_array();
        if (count($tips) > 0)
        {
            $recommend_data['tips'] = $tips;
        }

        $recommend_annotation = $this->get_recommend_by();
        if (isset($recommend_annotation))
            $recommend_data['recommend_by'] = $recommend_annotation->export_webpage_recommend_data ($url);

        if (count($recommend_data) > 0)
            return $recommend_data;
        else
            return NULL;
    }
}


/* End of file Annotation_recommend.php */
/* Location: ./system/application/libraries/recommend/Annotation_recommend.php */