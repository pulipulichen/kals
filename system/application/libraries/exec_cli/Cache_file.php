<?php
/**
 * Cache_file
 *
 * 建立暫存檔案
 *
 * @package         KALS
 * @category        Libraries
 * @author          Pudding Chen <pulipuli.chhn@gmail.com>
 * @copyright       Copyright (c) 2014, Pudding Chen
 * @license         http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link            https://github.com/pulipulichen/kals
 * @version         1.0 2014/1/17 下午 09:05:34
 */
class Cache_file {
    
    public function __construct($key, $content = NULL, $expire_limit = 30) {
        $this->set_key($key);
        $this->set_content($content);
        $this->set_expire_limit($expire_limit);
        return $this;
    }
    
    public function set_key($key) {
        $key = trim($key);
        $this->key = $key;
        return $this;
    }
    
    public function set_content($content) {
        if (is_array($content)) {
            $content = implode("\n", $content);
        }
        $content = trim($content);
        $this->content = $content;
        return $this;
    }
    
    public function get_content() {
        $this->_check_cache();
        return $this->content;
    }
    
    public function save() {
        $this->_check_cache();
        return $this;
    }
    
    public function get_path() {
        $this->_check_cache();
        return $this->_get_cache_path();
    }
    
    public function is_expired() {
        return $this->_is_expired();
    }
    
    public function force_write($content) {
        $path = $this->_get_cache_path();
        file_put_contents($path, $content);
        return $this;
    }
    
    // -------------------------
    
    private $checked = FALSE;
    
    /**
     * 暫存檔案的檔案名稱
     * @var String 
     */
    private $key = "cache";
    
    /**
     * 要保存的內容
     * @var String 
     */
    private $content = NULL;
    
    private $_cache_content = NULL;
    
    /**
     * 暫存檔案的過期期限，單位是分鐘
     * 暫存檔案重開機之後一律會被清除
     * @var min
     */
    private $expire_limit = 30;
    
    // ------------------------
    
    
    private function _get_cache_content() {
        if ($this->_is_cache_existed() === FALSE) {
            return NULL;
        }
        $path = $this->_get_cache_path();
        return file_get_contents($path);
    }
    
    public function set_expire_limit($expire_limit) {
        $expire_limit = trim($expire_limit);
        $this->expire_limit = $expire_limit;
        return $this;
    }
    
    private function _get_cache_path() {
        $path = sys_get_temp_dir();
        $path .= DIRECTORY_SEPARATOR;
        $path .= $this->key;
        return $path;
    }
    
    private function _is_cache_existed() {
        $path = $this->_get_cache_path();
        return is_file($path);
    }
    
    private function _get_cache_time() {
        if ($this->_is_cache_existed() === FALSE) {
            return FALSE;
        }
        $path = $this->_get_cache_path();
        return filemtime($path);
    }
    
    private function _is_expired() {
        $cache_time = $this->_get_cache_time();
        if ($cache_time === FALSE) {
            return TRUE;
        }
        $mtime = time();
        
        //echo  $mtime . " -\n " . $cache_time . "\n";
        
        $diff_time = $mtime - $cache_time;
        $diff_time = $diff_time / 60;
        
        if ($diff_time > $this->expire_limit) {
            return TRUE;
        }
        else {
            return FALSE;
        }
    }
    
    private function _check_cache() {
        if ($this->checked === FALSE) {
            
            if ($this->_is_expired()) {
                $this->_write_cache();
            }
            else {
                $content = $this->_get_cache_content();
                $this->content = $content;
            }
            $this->checked = TRUE;
        }
        return $this;
    }
    
    private function _write_cache() {
        $path = $this->_get_cache_path();
        file_put_contents($path, $this->content);
        return $this;
    }
}

/* End of file Cache_file.php */
/* Location: ./system/application/libraries/.../Cache_file.php */