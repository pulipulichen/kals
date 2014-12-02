<?php
/**
 * KALS_object KALS類別的原形
 *
 * 內建讀取Helper、Context、語系，並將CI實體保存成為屬性。
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/23 下午 03:35:51
 * @property CI_Base $CI
 * @property CI_DB_active_record $db
 * @property CI_Langauge $lang
 */
class KALS_object {
	
    /**
     * CodeIgniter主體
     * @var CI_Base
     */
    public $CI;

    /**
     * 資料庫連線
     * @var CI_DB_active_record
     */
    public $db;

    /**
     * 語系
     * @var CI_Langauge
     */
    public $lang;

    /**
     * 建構子
     *
     * 設定Helper、Context、讀取語系擋、資料庫，並將CI實體設定為屬性。
     * 任何子類別要覆寫建構子時，請務必要呼叫此方法。
     */
    public function __construct()
    {
        $this->CI =& get_instance();
        $this->CI->load->helper('kals');
        $this->CI->load->helper('context');
        $this->CI->lang->load('kals');
        $this->lang = $this->CI->lang;
        if (FALSE == isset($this->CI->db))
            $this->CI->load->database();
        $this->db = $this->CI->db;
        return $this;
    }

    /**
     * 類別讀取器
     *
     * 使用CI的建構子來讀取類別。如果已經讀取過了，則不再讀取。
     * 因為原本CI的load方法除了讀取之外還會將該類別實體化，重複實體化會浪費系統資源。
     * 故使用此方法來取代原本CI的load方法。
     * @param string $type 通常是'library'
     * @param string $path 類別路徑
     * @param string $class_name
     * 實體化成為CI成員變數的名稱。此方法是檢查此名稱是否已經設定作為已經讀取的判斷。
     * @return KALS_object
     */
    protected function _CI_load($type, $path, $class_name = NULL)
    {
        if (is_null($class_name))
        {
            $class_name = $path;
            $index = strrpos($class_name, '/');
            if (FALSE !== $index)
                $class_name = substr($class_name, $index + 1);
            $class_name = strtolower($class_name);
        }

        if (FALSE === isset($this->CI->$class_name))
        {
            $this->CI->$class_name = TRUE;
            $this->CI->load->$type($path, NULL, $class_name);

            //檢查是否正確呼叫
            //if (strtolower(get_class($this->CI->$class_name)) != $class_name)
            
            $ucfirst_class_name = ucfirst($class_name);
            if (is_object($this->CI->$class_name) === FALSE
                && class_exists($ucfirst_class_name))
            {
                $this->CI->$class_name = new $ucfirst_class_name();
            }
        }
        return $this;
    }
}

/* End of file KALS_object.php */
/* Location: ./system/application/libraries/toolkit/KALS_object.php */