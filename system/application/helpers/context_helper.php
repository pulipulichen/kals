<?php
/**
 * context_helper
 *
 * context_helper full description.
 *
 * @package		KALS
 * @category		Helpers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/21 下午 05:09:04
 * @var
 */

if ( ! function_exists('create_context'))
{
    function create_context($test = FALSE)
    {
        if (isset($GLOBALS['context']) === TRUE) {
            return;
        }
        $CI =& get_instance();
        $CI->load->library('core/Context');
        $GLOBALS['context'] = $CI->context;

        $GLOBALS['context']->db->trans_start($test);
        if ($test === TRUE)
            $GLOBALS['context']->set_ignore_authorize(TRUE);
        //echo '建立起全域的$context'.get_class($GLOBALS['context']);
    }
}

if ( ! function_exists('get_context_user'))
{
    /**
     * @return User
     */
    function get_context_user()
    {
        if (isset($GLOBALS['context']) === FALSE)
            return NULL;
        return $GLOBALS['context']->get_current_user();
    }
}

if ( ! function_exists('set_context_user'))
{
    function set_context_user($user)
    {
        if (isset($GLOBALS['context']) === FALSE)
            return NULL;
        return $GLOBALS['context']->set_current_user($user);
    }
}

if ( ! function_exists('set_context_user'))
{
    function set_context_user(User $user_in)
    {
        if (isset($GLOBALS['context']) === FALSE)
            return;
        return $GLOBALS['context']->set_current_user($user_in);
    }
}

if ( ! function_exists('clear_context_user'))
{
    function clear_context_user()
    {
        if (isset($GLOBALS['context']) === FALSE)
            return;
        return $GLOBALS['context']->clear_current_user();
    }
}

if ( ! function_exists('get_current_webpage'))
{
    /**
     * @return Webpage
     */
    function get_context_webpage()
    {
        if (isset($GLOBALS['context']) === FALSE)
            return NULL;
        return $GLOBALS['context']->get_current_webpage();
    }
}

if ( ! function_exists('get_current_domain'))
{
    /**
     * @return Domain
     */
    function get_context_domain()
    {
        if (isset($GLOBALS['context']) === FALSE)
            return NULL;
        return $GLOBALS['context']->get_current_domain();
    }
}

if ( ! function_exists('set_cache'))
{
    function set_cache(&$obj, $key, $value = NULL)
    {
        if (isset($GLOBALS['context']) === FALSE)
            return;
        return $GLOBALS['context']->set_cache($obj, $key, $value);
    }
}

if ( ! function_exists('unset_cache'))
{
    function unset_cache($obj)
    {
        if (isset($GLOBALS['context']) === FALSE)
        {
            return;
        }
        return $GLOBALS['context']->unset_cache($obj);
    }
}

if ( ! function_exists('get_cache'))
{
    function get_cache($type, $key, $value = NULL)
    {
        if (isset($GLOBALS['context']) === FALSE)
            return NULL;
        return $GLOBALS['context']->get_cache($type, $key, $value);
    }
}


if ( ! function_exists('set_session'))
{
    function set_session($index, $data)
    {
        if (isset($GLOBALS['context']) === FALSE)
            return false;
        return $GLOBALS['context']->set_session($index, $data);
    }
}

if ( ! function_exists('get_session'))
{
    function get_session($index)
    {
        if (isset($GLOBALS['context']) === FALSE)
            return false;
        return $GLOBALS['context']->get_session($index);
    }
}

if ( ! function_exists('destory_context'))
{
    function destory_context()
    {
        if (isset($GLOBALS['context']) === TRUE)
            unset($GLOBALS['context']);
    }
}

if ( ! function_exists('log_set_class'))
{
    function log_set_class($class)
    {
        if (isset($GLOBALS['context']) === FALSE)
            return;
        return $GLOBALS['context']->logger->set_class($class);
    }
}

if ( ! function_exists('log_enable'))
{
    function log_enable()
    {
        if (isset($GLOBALS['context']) === FALSE)
            return;
        return $GLOBALS['context']->logger->enable();
    }
}

if ( ! function_exists('log_disable'))
{
    function log_disable($message = NULL)
    {
        if (isset($GLOBALS['context']) === FALSE)
            return;
        return $GLOBALS['context']->logger->disable($message);
    }
}

if ( ! function_exists('log_debug'))
{
    function log_debug()
    {
        if (isset($GLOBALS['context']) === FALSE)
            return;
        return $GLOBALS['context']->logger->debug();
    }
}

if ( ! function_exists('log_info'))
{
    function log_info($message = NULL)
    {
        if (isset($GLOBALS['context']) === FALSE)
            return;
        return $GLOBALS['context']->logger->info($message);
    }
}

if ( ! function_exists('log_error'))
{
    function log_error($exception, $message = NULL)
    {
        if (isset($GLOBALS['context']) === FALSE)
            return;
        return $GLOBALS['context']->logger->error($exception, $message);
    }
}

if ( ! function_exists('handle_error'))
{
    function handle_error($exception, $message = NULL)
    {
        if (is_string($exception) && $message == NULL)
        {
            $message = $exception;
            $exception = NULL;
        }
        if (isset($GLOBALS['context']) === TRUE)
        {
            log_error($exception, $message);
        }
        show_error($message);

    }
}

if ( ! function_exists('context_test'))
{
    function context_test()
    {
        if (isset($GLOBALS['context']) === FALSE)
            return;

        $GLOBALS['context']->db->trans_start(TRUE);
    }
}

if ( ! function_exists('context_complete'))
{
    function context_complete()
    {
        if (isset($GLOBALS['context']) === FALSE) {
            return;
        }

        $GLOBALS['context']->db->trans_complete();
    }
}

if ( ! function_exists('context_abort'))
{
    function context_abort()
    {
        if (isset($GLOBALS['context']) === FALSE) {
            return;
        }

        $GLOBALS['context']->db->trans_rollback();
    }
}

if ( ! function_exists('load_library'))
{
    function load_library($path)
    {
        if (isset($GLOBALS['context']) === FALSE)
            return;

        $GLOBALS['context']->CI->load->library($path);
    }
}

if ( ! function_exists('set_ignore_authorize'))
{
    function set_ignore_authorize($ignore)
    {
        if (isset($GLOBALS['context']) === FALSE)
            return;

        $GLOBALS['context']->set_ignore_authorize($ignore);
    }
}

if ( ! function_exists('get_ignore_authorize'))
{
    function get_ignore_authorize()
    {
        if (isset($GLOBALS['context']) === FALSE)
            return FALSE;

        return $GLOBALS['context']->get_ignore_authorize();
    }
}

if ( ! function_exists('check_login_domain'))
{
    function check_login_domain($show_exception = TRUE)
    {
        if (isset($GLOBALS['context']) === FALSE)
            return TRUE;

        return $GLOBALS['context']->check_login_domain($show_exception);
    }
}

if ( ! function_exists('login_require'))
{
    function login_require($show_exception = TRUE)
    {
        $logined = FALSE;
        if (isset($GLOBALS['context']) === FALSE)
            $logined = FALSE;
        else
        {
            $user = get_context_user();

            if (isset($user))
            {
                $domain = $user->get_domain();
                $host = $domain->get_host();
                if (get_referer_host(FALSE) === $host)
                {
                    $logined = TRUE;
                }
            }
        }

        if ($show_exception && $logined === FALSE)
        {
            handle_error('login_require');
        }

        return $logined;
    }
}

/* End of file context_helper.php */
/* Location: ./system/application/helpers/context_helper.php */