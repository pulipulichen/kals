<?php
/**
 * Segmentor_factory
 *
 * 建立Segmentor的工廠
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/1 下午 03:17:21
 */
class Segmentor_factory extends KALS_object {

    /**
     * 建立斷詞器
     * @param String $name
     * @return Segmentor 
     */
    static public function create($name = NULL)
    {
        $CI =& get_instance();
        if (is_null($name))
        {
            $CI->config->load('kals');
            $name = $CI->config->item('segmentor.default');
        }

        $segmentor = NULL;

        if ($name == 'segmentor.scws')
        {
            $CI->load->library('scope/Segmentor_SCWS');
            if (isset($CI->segmentor_scws))
            {
                $segmentor = $CI->segmentor_scws;
            }
            else
            {
                require_once 'Segmentor_SCWS.php';
                $segmentor = new Segmentor_SCWS();
            }
        }
        else if ($name == 'segmentor.ckip')
        {
            $CI->load->library('scope/Segmentor_CKIP');
            if (isset($CI->segmentor_ckip))
            {
                $segmentor = $CI->segmentor_ckip;
            }
            else
            {
                require_once 'Segmentor_CKIP.php';
                $segmentor = new Segmentor_CKIP();
            }
        }
        else if ($name == 'segmentor.yahoo')
        {
            $CI->load->library('scope/Segmentor_YAHOO');
            if (isset($CI->segmentor_yahoo))
            {
                $segmentor = $CI->segmentor_yahoo;
            }
            else
            {
                require_once 'Segmentor_YAHOO.php';
                $segmentor = new Segmentor_YAHOO();
            }
        }
        else //if ($name == 'segmentor.disable')
        {
            $CI->load->library('scope/Segmentor_disable');
            if (isset($CI->segmentor_disable))
            {
                $segmentor = $CI->segmentor_disable;
            }
            else
            {
                require_once 'Segmentor_disable.php';
                $segmentor = new Segmentor_disable();
            }
        }
//        else if ($name == 'segmentor.yahoo_cas')
//        {
//            $CI->load->library('annotation/Segmentor_Yahoo_CAS');
//            $segmentor = $CI->segmentor_yahoo_cas;
//        }
        
        return $segmentor;
    }

    static public function create_search_segmentor()
    {
        $CI =& get_instance();
        $CI->config->load('kals');
        $name = $CI->config->item('segmentor.default_for_search');
        if (FALSE === $name)
            $name = NULL;
        return self::create($name);
    }
}


/* End of file Segmentor_factory.php */
/* Location: ./system/application/libraries/annotation/Segmentor_factory.php */