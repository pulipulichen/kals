<?php
/**
 * MY_user_agent
 *
 * MY_user_agent full description.
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/23 下午 03:35:51
 */

class MY_User_agent extends CI_User_agent {

    function MY_User_agent()
    {
        parent::CI_User_agent();
    }

    function detect_language()
    {
        $lang = $_SERVER["HTTP_ACCEPT_LANGUAGE"];

        if ($lang != NULL)
        {
            if (strpos($lang, ',') !== FALSE)
            {
                $lang = substr($lang, 0, strpos($lang, ','));
            }
            $lang = trim($lang);

            $lang = str_replace('-', '_', $lang);
            $lang = strtolower($lang);
        }

        if ($this->in_acceptable_langage($lang) === FALSE)
            $lang = $this->get_default_language ();

        return $lang;
    }

    function in_acceptable_langage($lang)
    {
        //限制選單
        if (isset($this->accepatable) === FALSE)
        {
            $CI =& get_instance();
            $CI->config->load('config');
            $this->acceptable = $CI->config->item('acceptable_languages');
            
        }

        return in_array($lang, $this->acceptable);
    }

    function get_default_language()
    {
        if (isset($this->default_language) === FALSE)
        {
            $CI =& get_instance();
            $CI->config->load('config');
            $this->default_language = $CI->config->item('language');
        }
        return $this->default_language;
    }
}


/* End of file MY_user_agent.php */
/* Location: ./system/application/libraries/.../MY_user_agent.php */