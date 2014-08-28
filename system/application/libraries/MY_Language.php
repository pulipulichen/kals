<?php
/**
 * MY_Language
 *
 * 擴增CI_Language
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/29 上午 09:45:31
 */
class MY_Language extends CI_Language {

	function line($line = '', $parameters = NULL)
	{
		$line = ($line == '' OR ! isset($this->language[$line])) ? FALSE : $this->language[$line];
                if (isset($parameters) && FALSE === is_array($parameters))
                    $parameters = array($parameters);

                if (is_array($parameters))
                {
                    foreach ($parameters AS $key => $replace)
                    {
                        $search = '{'.$key.'}';
                        $line = str_replace($search, $replace, $line);
                    }
                }
		return $line;
	}

        function package($prefix)
	{
            $package = array();
            foreach ($this->language AS $key => $line)
            {
                if (strlen($key) >= strlen($prefix)
                    && substr($key, 0, strlen($prefix)) == $prefix)
                {
                    $key = substr($key, strlen($prefix) + 1);
                    $package[$key] = $line;
                }
            }
            return $package;
	}

}

/* End of file MY_Language.php */
/* Location: ./system/application/libraries/MY_Language.php */