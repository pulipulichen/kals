<?php
/**
 * Generic_attribute_collection 泛用型屬性集合
 *
 * 屬性的意思是，集合成員的陣列會依據$type_id來作為索引名稱。
 * 成員的類別皆是Generic_attribute_object。
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/10 上午 01:35:59
 * @example 繼承範本：<code>

 class ${name} extends Generic_attribute_collection {

    // --------
    // Generic Attribute Collection
    // --------

    protected $table_name = ''; //資料表名稱
    protected $index_field = '_id';    //索引的欄位
    protected $type_field = '_type_id';  //類別欄位
    protected $class_name = array(
        1 => ''
    );
    protected $class_dir = '/';  //類別的目錄路徑
    protected $data_fields = array('_id', '_type_id', ''); //成員的資料表欄位

//    protected $limit = ;  //限定筆數
//    protected $members_readonly = TRUE;    //成員唯讀
//    protected $order_by = '';   //排序設定

//    protected function _pre_construct() //__construct()前動作
//    protected function _post_load() //load_default()後動作
//    protected function _pre_update($members)    //update()前動作
//    protected function _post_update()   //update()後動作
//    protected function _load_custom(CI_DB_active_record $db = NULL, $id = NULL) //load_default()的自訂追加條件

    // --------
    // ${name} Member Variables
    // --------


    // --------
    // ${name} Methods
    // --------

}

 * </code>
 */
class Generic_attribute_collection extends Generic_collection {

    /**
     * 類別名稱
     *
     * 搭配類別的$type_field資料來進行實體化動作。
     * 覆寫Generic_collection的方法。
     * @var array
     */
    protected $class_name = array();
    
    /**
     * 資源的ID
     * @var type 
     */
    protected $resource_type_id;

    /**
     * 預設設定集合成員的方法
     *
     * Generic_attribute_collection會將$type_id作為成員的索引名稱。
     * 覆寫Generic_collection的方法。
     * @param array $row 搜尋之後取得的資料
     * @param mixed $member
     */
    protected function _load_default_setup_member($row, $member)
    {
        $type_id = NULL;
        if (isset($row[$this->type_field])) {
            $type_id = $row[$this->type_field];
        }
        $this->members[$type_id] = $member;
    }

    /**
     * 插入成員
     *
     * 插入時的索引名稱是依據插入物件的$type_id來進行。
     * 覆寫Generic_collection的方法。
     * @param Generic_attribute_object $obj
     * @return Generic_attribute_collection
     */
    public function  add_item(Generic_attribute_object $obj) {
        return parent::add_item($obj, $obj->get_type_id());
    }

    /**
     * 取得指定$type_id的成員
     *
     * 如果當該$type_id沒有成員時，則建立此$type_id的空物件作為成員加入。
     * 覆寫Generic_collection的方法。
     * @param integer $type_id
     * @return Generic_attribute_object
     */
    public function  get_item($type_id) {
        $item = parent::get_item($type_id);
        if (is_null($item)) {
            $item = $this->create_item($type_id);
            if (isset($item)) {
                $this->add_item($item, $type_id);
            }
        }
        return $item;
    }

    /**
     * 建立並實體化成員
     *
     * 應用工廠模式，依據$type_id來判斷要建立哪一種物件。
     * 建立物件之後並且設定物件的屬性資料。
     * 覆寫Generic_collection的方法。
     * @param integer $type_id
     * @param array $data
     * @return Generic_attribute_object
     */
    public function  create_item($type_id = NULL, $data = array()) {
        $item = parent::create_item($type_id, $data);

        if (isset($item)) {
            if (isset($this->type_field) && isset($type_id)
                && is_null($item->get_field($this->type_field)))
                $item->set_field($this->type_field, $type_id);
            if (isset($this->index_field) && isset($this->id)
                && is_null($item->get_field($this->index_field)))
                $item->set_field($this->index_field, $this->id);
        }
        return $item;
    }
    
}

/* End of file Generic_attribute_collection.php */
/* Location: ./system/application/libraries/toolkit/Generic_attribute_collection.php */