<?php
/**
 * Clustering
 *
 * 分群方法
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/17 上午 12:21:12
 */
class Clustering {

    protected $data;
    protected $clusters_number = 3;

    protected $result;
    protected $result_positions;


    public function set_data($data)
    {
        $this->data = $data;
        $this->_reset_result();
        return $this;
    }

    public function set_clusters_number($number)
    {
        $this->clusters_number = $number;
        $this->_reset_result();
        return $this;
    }

    protected function _reset_result()
    {
        if (isset($this->result))
            $this->result = NULL;
        if (isset($this->result_positions))
            $this->result_positions = NULL;
        return $this;
    }

    public function setup($data, $number)
    {
        $this->set_data($data);
        $this->set_clusters_number($number);
        return $this;
    }

    public function get_result()
    {
        if (is_null($this->result))
        {
            $this->process();
        }
        return $this->result;
    }

    public function get_result_positions()
    {

        if (is_null($this->result_positions))
        {
            $this->process();
        }
        asort($this->result_positions);
        return $this->result_positions;
    }

    protected function process()
    {
        //請由子類別來覆寫此方法
    }

    /**
     * 取得預設的分群器
     * @return Clustering
     */
    static public function get_clustering()
    {
        $CI =& get_instance();
        $CI->config->load('kals');

        $clustering_path = $CI->config->item('fuzzy.default_clustering_path');
        if ($clustering_path === FALSE)
            $clustering_path = 'fuzzy/Clustering_k_means';

        $CI->load->library($clustering_path, NULL, 'clustering_object');
        return $CI->clustering_object;
    }
}


/* End of file Clustering.php */
/* Location: ./system/application/libraries/fuzzy/Clustering.php */