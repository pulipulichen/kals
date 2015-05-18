<?php
//include_once '';
/**
 * MY_URI
 *
 * MY_URI full description.
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 下午 10:17:42
 */
class MY_URI extends CI_URI {
    
	function _filter_uri($str)
	{
		if ($str != '' && $this->config->item('permitted_uri_chars') != '' && $this->config->item('enable_query_strings') == FALSE)
		{
                    //if (!(substr($str, 0, 5) == '%257B' && substr($str, -5, 5) == '%257D'))
                    if (!(substr($str, 0, 1) == '{' && substr($str, -1, 1) == '}')
                        && !(substr($str, 0, 1) == '[' && substr($str, -1, 1) == ']')
                        && !(substr($str, 0, 1) == '"' && substr($str, -1, 1) == '"')
                        && !(substr($str, 0, 1) == "'" && substr($str, -1, 1) == "'"))
                    {
			// preg_quote() in PHP 5.3 escapes -, so the str_replace() and addition of - to preg_quote() is to maintain backwards
			// compatibility as many are unaware of how characters in the permitted_uri_chars will be parsed as a regex pattern
			if ( ! preg_match("|^[".str_replace(array('\\-', '\-'), '-', preg_quote($this->config->item('permitted_uri_chars'), '-'))."]+$|i", $str))
			{
				show_error('The URI you submitted has disallowed characters.'.$str, 400);
			}
                    }
		}
                

		// Convert programatic characters to entities
		$bad	= array('$', 		'(', 		')',	 	'%28', 		'%29');
		$good	= array('&#36;',	'&#40;',	'&#41;',	'&#40;',	'&#41;');

		return str_replace($bad, $good, $str);
	}

}

/* End of file MY_URI.php */
/* Location: ./system/application/libraries/MY_URI.php */