<?php
/**
 * Generic_attribute_object
 *
 * 泛用屬性物件。屬性的意思是他們都有「$type_id」，或著有時候會有「$name」，並搭配資料表中有的「$type_field」、「$name_field」。
 * 這會讓資料庫存取時加入一些資料
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/10 上午 01:50:55
 * @example 繼承範例：<code>

class ${name} extends Generic_attribute_object {

    // --------
    // Generic Object 設定
    // -------

    protected $table_name = ''; //資料表名稱
    protected $primary_key = '_id'; //資料表主鍵
    protected $table_fields = array('_id', ''); //資料表欄位

//    protected $not_null_field = array('_id');    //非空值約束
//    protected $unique_restriction = array('_id');    //單一約束
//    protected $except_bind_fields = array();    //排除脫逸欄位
//    protected $default_field = '';  //預設欄位
//    protected $fake_delete = 'deleted';    //假性刪除欄位
//    protected $use_cache = FALSE;   //是否使用快取

    protected $type_id = ''; //類別ID
    protected $type_field = ''; //類別ID的資料表欄位

//    protected $name = '';   //名稱
//    protected $name_field = 'name';   //名稱欄位

//    protected function _post_construct($table_name = NULL, $id = NULL)  //__construct()完成後動作
//    protected  function _set_field_filter($cond)    //set_field()資料過濾
//    protected  function _get_field_filter($field)   //get_field()資料過濾
//    protected  function _pre_update($data)  //update()前動作
//    protected function _post_update()   //update()後動作
//    protected  function _pre_insert($data)  //新增(insert)前動作
//    protected  function _post_insert()  //新增(insert)後動作
//    protected  function _pre_delete()   //delete()前動作
//    protected  function _pre_create($data)  //create()前動作

    // --------
    // ${name} 設定
    // --------

    // Member Variables

    // Methods

}

 * </code>
 */
class Generic_attribute_object extends Generic_object {

    // --------
    // Member Variables 成員變數
    // --------

    /**
     * 類別ID
     * @var integer
     */
    protected $type_id;

    /**
     * 類別ID的資料表欄位
     * @var string
     */
    protected $type_field;

    /**
     * 名稱
     * @abstract 名稱是選填的。
     * @var string
     */
    protected $name;
    /**
     * 名稱欄位
     * @abstract 名稱欄位是選填的。
     * @var string
     */
    protected $name_field;

    // --------
    // Private Methods 內部運作函式
    // --------

    /**
     * 更新前動作
     * @abstract 將更新的資料插入$type_id跟$name。
     * 注意：子類別覆寫時請務必引用此方法。
     * @param array $data 原本要更新的資料
     * @return array 更新後的資料
     */
    protected  function _pre_update($data)
    {
        if (isset($this->type_field) && FALSE === isset($data[$this->type_field]))
        {
            $type_id = $this->get_type_id();
            if (is_class($this, 'Annotation_like'))
                test_msg('Generic_attribute_object::_pre_update() ', $type_id.'?');
            if (isset($type_id))
            {
                $data[$this->type_field] = $type_id;
                $this->set_field($this->type_field, $type_id);
            }
        }
        if (isset($this->name_field) && FALSE === isset($data[$this->name_field]))
        {
            $name = $this->get_name();
            $data[$this->name_field] = $name;
            $this->set_field($this->name_field, $name);
        }
        return $data;
    }

    // --------
    // Public Getter 公開取得器
    // --------
    
    /**
     * 取得類別ID
     * @return integer
     */
    public function get_type_id()
    {
        if (is_null($this->type_id))
        {
            $this->type_id = $this->get_field($this->type_field);
        }
        return $this->type_id;
    }

    /**
     * 取得名稱
     * @return string
     */
    public function get_name()
    {
        if (is_null($this->name) && isset($this->name_field))
        {
            $this->name = $this->get_field($this->name_field);
        }
        return $this->name;
    }
}


/* End of file Generic_attribute_object.php */
/* Location: ./system/application/libraries/Generic_attribute_object.php */