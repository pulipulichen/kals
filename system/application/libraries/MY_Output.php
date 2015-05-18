<?php
//include_once '';
/**
 * MY_Output
 *
 * MY_Output full description.
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/28 下午 02:08:09
 */
class MY_Output extends CI_Output {
        function get_header($header_attr)
	{
            $attr_len = strlen($header_attr);
            foreach ($this->headers AS $header_data)
            {
                $header = $header_data[0];
                if (strlen($header) >= $attr_len
                    && substr($header, 0, $attr_len) == $header_attr)
                {
                    $pos = strpos($header, ':');
                    $header_value = substr($header, $pos+1);
                    $header_value = trim($header_value);
                    return $header_value;
                }
            }
            return NULL;
	}

        function get_content_type_header()
        {
            return $this->get_header('Content-type');
        }
    
        /**
         * 加入了content-type的判斷
         * @param $output
         */
        function _write_cache($output)
	{
		$CI =& get_instance();
		$path = $CI->config->item('cache_path');

		$cache_path = ($path == '') ? BASEPATH.'cache/' : $path;

		if ( ! is_dir($cache_path) OR ! is_really_writable($cache_path))
		{
			return;
		}

		$uri =	$CI->config->item('base_url').
				$CI->config->item('index_page').
				$CI->uri->uri_string();

		$cache_path .= md5($uri);

		if ( ! $fp = @fopen($cache_path, FOPEN_WRITE_CREATE_DESTRUCTIVE))
		{
			log_message('error', "Unable to write cache file: ".$cache_path);
			return;
		}

                $content_type = $this->get_content_type_header();
                if (is_null($content_type))
                    $content_type = 'text/html';

		$expire = time() + ($this->cache_expiration * 60);

		if (flock($fp, LOCK_EX))
		{
                    fwrite($fp, $expire.'TS--->'.$content_type.'-->'.$output);
                    flock($fp, LOCK_UN);
		}
		else
		{
			log_message('error', "Unable to secure a file lock for file at: ".$cache_path);
			return;
		}
		fclose($fp);
		@chmod($cache_path, DIR_WRITE_MODE);

		log_message('debug', "Cache file written: ".$cache_path);
	}

        /**
         * 加入了content-type的判斷
         */
        function _display_cache(&$CFG, &$URI)
	{
		$cache_path = ($CFG->item('cache_path') == '') ? BASEPATH.'cache/' : $CFG->item('cache_path');

		if ( ! is_dir($cache_path) OR ! is_really_writable($cache_path))
		{
			return FALSE;
		}

		// Build the file path.  The file name is an MD5 hash of the full URI
		$uri =	$CFG->item('base_url').
				$CFG->item('index_page').
				$URI->uri_string;

		$filepath = $cache_path.md5($uri);

		if ( ! @file_exists($filepath))
		{
			return FALSE;
		}

		if ( ! $fp = @fopen($filepath, FOPEN_READ))
		{
			return FALSE;
		}

		flock($fp, LOCK_SH);

		$cache = '';
		if (filesize($filepath) > 0)
		{
			$cache = fread($fp, filesize($filepath));
		}

		flock($fp, LOCK_UN);
		fclose($fp);

		// Strip out the embedded timestamp
		if ( ! preg_match("/(\d+TS--->)/", $cache, $match))
		{
			return FALSE;
		}

		// Has the file expired? If so we'll delete it.
		if (time() >= trim(str_replace('TS--->', '', $match['1'])))
		{
			@unlink($filepath);
			log_message('debug', "Cache file has expired. File deleted");
			return FALSE;
		}

		// Display the cache
                $cache = str_replace($match['0'], '', $cache);

                //Check content-type header
                $pos = strpos($cache, '-->');
                if ($pos !== FALSE)
                {
                    $header = substr($cache, 0, $pos);
                    $header = 'Content-type: '.$header;
                    $this->set_header($header, TRUE);
                    //header($header);
                    $cache = substr($cache, $pos+3);
                    $cache = '/*'.$header.'*/'.$cache;
                }
		$this->_display($cache);
		log_message('debug', "Cache file is current. Sending it to browser.");
		return TRUE;
	}
}

/* End of file MY_Output.php */
/* Location: ./system/application/libraries/.../MY_Output.php */