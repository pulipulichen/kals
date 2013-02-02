<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 
/**
 * logger
 *
 * 用來記錄資料的功能. A part of KALS
 * @author Pudding Chen <puddingchen.35@gmail.com>
 * @version 1.0 2010/6/18 上午 11:56:29
 * @copyright Copyright (c) 2010, Pudding Chen
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 *
 */
class Logger {

    var $CI;

    var $enable_logging = TRUE;
    var $class_name = NULL;

    function Logger($class = NULL)
    {
        $this->CI =& get_instance();
        $this->set_class($class);
    }

    function set_class($class = NULL)
    {
        if (is_object($class))
        {
            $CI->class_name = get_class($class);
        }
    }

    function enable()
    {
        $this->enable_logging = TRUE;
    }
    function disable()
    {
        $this->enable_logging = FALSE;
    }
    
    function debug($message = NULL)
    {
        if ($this->enable_logging === TRUE)
            log_message('debug', $this->_prepend_class_name($message));
    }

    function info($message = NULL)
    {
        if ($this->enable_logging === TRUE)
            log_message('info', $this->_prepend_class_name($message));
    }

    function error($exception, $message = NULL)
    {
        if ($this->enable_logging === TRUE)
        {
            if (is_string($exception) && $message == NULL)
            {
                $message = $exception;
                $exception = NULL;
            }

            if (is_object($exception))
                $error_message = "Error on line ".$exception->getLine()." in ".$exception->getFile();
            else if (is_string($exception))
                $error_message = $exception;
            else
                $error_message = '';

            if ($message == NULL)
                $message = $error_message;
            else if ($error_message != '')
                $message = $error_message.": ".$message;
            
            $message = $this->_prepend_class_name($message);
            log_message('error', $message);
        }
    }

    //private

    function _prepend_class_name($message = NULL)
    {
        $class_name = $this->class_name;
        if ($class_name != NULL)
        {
            if ($message != NULL)
                $message = '['.$class_name.'] '.$message;
            else
                $message = '['.$class_name.']';
        }
        else if ($message == NULL)
        {
            $message = '';
        }
        return $message;
    }
}

/* End of file logger.php */
/* Location: ./system/application/model/core/logger.php */