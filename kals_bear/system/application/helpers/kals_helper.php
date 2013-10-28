<?php
/**
 * kals_helper
 *
 * 集合KALS所有的小工具！
 *
 * @package		KALS
 * @category		Helpers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/18 下午 09:53:53
 */
if ( ! function_exists('get_referer_url'))
{
	function get_referer_url($show_exception = FALSE)
	{
            $url = getenv("HTTP_REFERER");
            if ($url !== FALSE)
            {
                if (substr($url, -1, 1) == "/")
                    $url = substr($url, 0, -1);
                return $url;
            }
            else
            {
                if ($show_exception)
                {
                    handle_error ('Cannot get referer url.');
                }

                return FALSE;
            }
	}
}

if ( ! function_exists('get_referer_host'))
{
	function get_referer_host($show_exception = FALSE)
	{
            $url = get_referer_url($show_exception);
            if ($url === FALSE)
                return FALSE;
            else
                return parse_host($url);
	}
}

if ( ! function_exists('parse_host'))
{
	function parse_host($url = NULL)
	{
            if ($url == NULL || is_string($url) === FALSE || strpos($url, '//') === FALSE)
                return NULL;
            $parameters = get_url_parameters($url);
            if ($parameters === FALSE)
                return NULL;
            else
            {
                $host = $parameters['scheme'].'://'.$parameters['host'];
                if (isset($parameters['port']))
                    $host = $host.':'.$parameters['port'];
                return $host.'/';
            }
	}
}

if ( ! function_exists('parse_uri'))
{
	function parse_uri($url = NULL)
	{
            if ($url == NULL || is_string($url) === FALSE || strpos($url, '//') === FALSE)
                return NULL;
            $parameters = get_url_parameters($url);
            if ($parameters === FALSE)
                return NULL;
            else
            {
                $uri = $parameters['path'];
                //if (isset ($parameters['fragment']))
                //    $uri = $uri.'#'.$parameters['fragment'];
                if (isset ($parameters['query']))
                    $uri = $uri.'?'.$parameters['query'];
                return $uri;
            }
	}
}

if ( ! function_exists('get_url_parameters'))
{
	function get_url_parameters($url = NULL)
	{
            if ($url == NULL)
                $url = get_referer_url();
            if ($url === FALSE)
                return FALSE;
            
            $url = @trim($url);
            $parameters = @parse_url($url);
            if ($parameters === FALSE)
                return FALSE;
            else
                return $parameters;
	}
}

if ( ! function_exists('url_is_link'))
{
	function url_is_link($url = NULL, $ping = TRUE)
	{
            $url = @trim($url);
            $url = @parse_url($url);

            if ( ! $url ) {
                    return false;
            }
            else if ($ping == FALSE && isset($url['scheme']))
            {
                return TRUE;
            }

            $url = array_map('trim', $url);
            $url['port'] = (!isset($url['port'])) ? 80 : (int)$url['port'];
            $path = (isset($url['path'])) ? $url['path'] : '';

            if ($path == '')
            {
                    $path = '/';
            }

            $path .= ( isset ( $url['query'] ) ) ? "?$url[query]" : '';

            if ( isset ( $url['host'] ) AND $url['host'] != gethostbyname ( $url['host'] ) )
            {
                    if ( PHP_VERSION >= 5 )
                    {
                            $headers = @get_headers("$url[scheme]://$url[host]:$url[port]$path");
                    }
                    else
                    {
                            $fp = @fsockopen($url['host'], $url['port'], $errno, $errstr, 30);

                            if ( ! $fp )
                            {
                                    return false;
                            }
                            fputs($fp, "HEAD $path HTTP/1.1\r\nHost: $url[host]\r\n\r\n");
                            $headers = fread ( $fp, 128 );
                            fclose ( $fp );
                    }
                    $headers = ( is_array ( $headers ) ) ? implode ( "\n", $headers ) : $headers;
                    return ( bool ) preg_match ( '#^HTTP/.*\s+[(200|301|302)]+\s#i', $headers );
            }
            return false;
	}
}

if ( ! function_exists('url_is_image'))
{
	function url_is_image($url = NULL)
	{
            $url = @trim($url);
            $url = @parse_url($url);

            if ( ! $url) {
                    return false;
            }

            $url = array_map('trim', $url);
            $url['port'] = (!isset($url['port'])) ? 80 : (int)$url['port'];
            $path = (isset($url['path'])) ? $url['path'] : '';

            if ($path == '')
            {
                    $path = '/';
            }

            $path .= ( isset ( $url['query'] ) ) ? "?$url[query]" : '';

            if ( isset ( $url['host'] ) AND $url['host'] != gethostbyname ( $url['host'] ) )
            {
                    if ( PHP_VERSION >= 5 )
                    {
                        $headers = @get_headers("$url[scheme]://$url[host]:$url[port]$path", 1);
                        if (isset($headers['Content-Type']) && strpos($headers['Content-Type'], 'image') === FALSE)
                            return FALSE;
                        else
                            return TRUE;
                    }
            }
            return false;
	}
}

if ( ! function_exists('parse_email_name'))
{
	function parse_email_name($email = NULL)
	{
            if ($email == NULL)
                return FALSE;
            $email = trim($email);
            $pos = strpos($email, '@');
            if ($pos === FALSE)
                return FALSE;
            $name = substr($email, 0, $pos);
            $name = trim($name);
            if ($name != "")
                return $name;
            else
                return FALSE;
	}
}

if ( ! function_exists('retrieve_title'))
{
    function retrieve_title($url = NULL)
    {
        if ($url == NULL)
            return NULL;

        $url = trim($url);

        // we can't treat it as an XML document because some sites aren't valid XHTML
        // so, we have to use the classic file reading functions and parse the page manually
        $fh = @fopen($url, "r");
        $str = @fread($fh, 7500);  // read the first 7500 characters, it's gonna be near the top
        fclose($fh);
        //echo $str;

        $start = strpos($str, "<title>");
        if ($start === FALSE)
            $start = strpos($str, "<TITLE>");
        if ($start === FALSE)
            return NULL;
        $start = $start + 7;
        $end = strpos($str, "</title>");
        if ($end === FALSE)
            $end = strpos($str, "</TITLE>");
        if ($end === FALSE)
            return NULL;

        $len = $end - $start;
        $title = mb_substr($str, $start, $len);
        $title = trim($title);
        return $title;
    }
}

if ( ! function_exists('is_class'))
{
    function is_class($object, $class_name)
    {
        if ($object == NULL)
            return FALSE;
        if (is_object($class_name))
            $class_name = get_class($class_name);

        return (is_object($object) && get_class($object) == $class_name);
    }
}

if ( ! function_exists('combine_url'))
{
    function combine_url($host = NULL, $uri = NULL)
    {
        if ($host == NULL)
            return NULL;
        
        if (is_class($host, 'Domain'))
                $host = $host->get_host();

        if (substr($host, -1, 1) != "/")
                $host = $host.'/';

        $url = $host;
        if ($uri != NULL)
        {
            if (is_class($uri, 'Webpage'))
                $uri = $uri->get_uri();

            if (substr($uri, 0, 1) == '/')
                $uri = substr($uri, 1);

            $url = $url.$uri;
        }
        return $url;
    }
}

if ( ! function_exists('get_array_index'))
{
    function get_array_index($array, $index = NULL)
    {
        if ($index == NULL)
            return NULL;
        if (isset($array[$index]))
            return $array[$index];
        else
            return NULL;
    }
}

if ( ! function_exists('get_cond_key'))
{
    function get_cond_key($cond)
    {
        $key = NULL;

        if (is_array($cond))
        {
            $keys = array_keys($cond);
            if (count($keys) > 0)
                $key = $keys[0];
        }
        return $key;
    }
}

if ( ! function_exists('has_cond_key'))
{
    function has_cond_key($cond, $key)
    {
        if (is_array($cond) === FALSE
            || !(is_string($key) || is_int($key))
            || array_key_exists($key, $cond) === FALSE
            || $cond[$key] == NULL)
            return FALSE;
        else
            return TRUE;
    }
}

if ( ! function_exists('get_cond_value'))
{
    function get_cond_value($cond)
    {
        $value = NULL;

        foreach ($cond AS $cond_value)
        {
            $value = $cond_value;
            break;
        }
        return $value;
    }
}

if ( ! function_exists('convert_cond'))
{
    function convert_cond($cond, $value)
    {
        if (is_string($cond) && NULL !== $value)
        {
            $cond = array(
                $cond => $value
            );
        }
        return $cond;
    }
}

if ( ! function_exists('get_email_name'))
{
    function get_email_name($email)
    {
        $name = NULL;
        $index = strpos($email, '@');
        if ($index !== FALSE)
        {
            $name = substr($email, 0, $index);
        }
        return $name;
    }
}

if ( ! function_exists('test_header'))
{
    function test_header($msg = NULL)
    {
        echo '[[[<pre>';
        if ($msg != NULL)
        {
            if (is_array($msg))
                print_r($msg);
            else
                echo $msg.'||\n';
        }
    }
}
if ( ! function_exists('test_footer'))
{
    function test_footer()
    {
        echo '</pre>]]]<br />';
    }
}
if ( ! function_exists('test_msg'))
{
    function test_msg($title, $msg = NULL)
    {
        if ($title == '----' && is_null($msg))
        {
            echo '<br /><hr /><br />';
            return;
        }

        if (NULL != $title && is_null($msg))
        {
            $msg = $title;
            $title = NULL;
        }

        echo '[[[<pre>';
        if ($title != NULL OR $msg != NULL)
        {
            if ($title !== NULL)
                echo $title.': ';

            if (is_array($msg))
            {
                //print_r($msg);
                echo test_array($msg);
            }
            else
                echo $msg;
        }
        echo '</pre>]]]<br />';
    }
}

if ( ! function_exists('test_array'))
{
    function test_array($ary)
    {
        if (is_array($ary))
        {
            $output = '';
            //print_r($msg);
            foreach($ary AS $k => $m)
            {
                $output .= $k.' => '.$m.' | ';
            }
            $ary = trim($output);
        }
        return $ary;
    }
}

if ( ! function_exists('array_cut'))
{
    /**
     * $array_cuted - $use_to_cut_array的結果
     * @param Array $array_cuted 要被減的
     * @param Array $use_to_cut_array 拿去減人的
     * @return Array 
     */
    function array_cut($array_cuted, $use_to_cut_array)
    {
        $result = array();
        foreach ($array_cuted AS $cuted)
        {
            if (FALSE === in_array($cuted, $use_to_cut_array))
                $result[] = $cuted;
        }
        return $result;
    }
}

if ( ! function_exists('get_timestamp'))
{
    function get_timestamp()
    {
        return date('Y-m-d H:i:s.u e');
    }
}

if ( ! function_exists('starts_with'))
{
    function starts_with($subject, $prefix)
    {
        return (strlen($subject) >= $prefix
            && substr($subject, 0, strlen($prefix)) == $prefix);
    }
}

if ( ! function_exists('strip_selected_tags'))
{
    function strip_selected_tags($text, $tags = array())
    {
        $args = func_get_args();
        $text = array_shift($args);
        $tags = func_num_args() > 2 ? array_diff($args,array($text))  : (array)$tags;
        foreach ($tags as $tag){
            if( preg_match_all( '/<'.$tag.'[^>]*>([^<]*)<\/'.$tag.'>/iu', $text, $found) ){
                $text = str_replace($found[0],$found[1],$text);
            }
        }

        return preg_replace( '/(<('.join('|',$tags).')(\\n|\\r|.)*\/>)/iu', '', $text);
    }
}

/* End of file kals_helper.php */
/* Location: ./system/application/helpers/kals_helper.php */