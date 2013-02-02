<?php
/**
 * Generic_association_collection 關連資料表泛用關連集合
 *
 * 這種集合通常是用於多對多物件中間的關連資料表。
 * 在關連集合更新(update)時，會依據成員修正關連資料表的內容。
 * 舉例來說，關連資料表就像是以下的表格中的annotation2scope：<pre>
 *
 * -----------------     ------------
 * | annotation    |     | scope    |
 * | ------------- |     | -------- |
 * | annotation_id |     | scope_id |
 * -----------------     ------------
 * --------------------
 * | annotation2scope |
 * | -----------------|
 * | annotation_id    |
 * | scope_id         |
 * --------------------
 * </pre>
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/8 下午 08:35:41
 * @example <code>
class ${name} extends Generic_association_collection {

    // --------
    // Generic Association Collection
    // --------

    protected $table_name = ''; //資料表名稱
    protected $index_field = '_id';    //索引的欄位
//    protected $type_field = '_type_id';  //類別欄位
    protected $class_name = '';
    protected $class_dir = '/';  //類別的目錄路徑
    protected $data_fields = array('_id', '_type_id', ''); //成員的資料表欄位

    protected $foreign_field = '_id';  //外鍵欄位
    protected $class_table_name = '';   //成員類別資料表名稱
    protected $class_foreign_field = '_id';    //成員類別資料表中與$foreign_field對應的外鍵
//    protected $class_fake_delete = 'deleted';  //成員類別資料表中假性刪除的欄位

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
class Generic_association_collection extends Generic_collection {

    /**
     * 外鍵欄位
     *
     * 關連資料表中，與成員類別相連的外鍵欄位。
     * @var string
     */
    protected $foreign_field;

    /**
     * 成員類別資料表名稱
     * @var string
     */
    protected $class_table_name;

    /**
     * 成員類別資料表中與$foreign_field對應的外鍵
     * @var string
     */
    protected $class_foreign_field;

    /**
     * 成員類別資料表中假性刪除的欄位
     *
     * 可省略
     * @var string|null
     */
    protected $class_fake_delete;

    // --------
    // Private Methods 內部設定
    // --------

    /**
     * load_default()的自訂追加條件
     *
     * Generic_association_collection中加入了外鍵關連的設定。
     * 在Generic_collection的成員是取得自身$table_name的資料來建立成員。
     * 但Generic_association_collection則是取得$class_name_table資料表中的資料來建立成員。
     * @param CI_DB_active_record $db
     * @param int $id
     */
    protected function  _load_custom(CI_DB_active_record $db = NULL, $id = NULL) {
        
        //$db = $this->db;
        $class_table_name = $this->class_table_name;
        if ($this->table_name != $class_table_name)
        {
            $db->join($class_table_name
                , $this->table_name.'.'.$this->foreign_field.' = '.$class_table_name.'.'.$this->class_foreign_field);
        }
        else
        {
            $class_table_name = 'association';
            $db->join($this->class_table_name.' AS '.$class_table_name
                , $this->table_name.'.'.$this->foreign_field.' = '.$class_table_name.'.'.$this->class_foreign_field);
        }

        $db->select($class_table_name.'.*');
        if (isset($this->class_fake_delete))
            $db->where($class_table_name.'.'.$this->class_fake_delete, 'FALSE');
    }

    /**
     * update()後動作
     *
     * 在更新完成員之後，接下來再依據成員的內容，更新自身$table_name資料表的資料。
     * 如果成員有增加，則插入多的資料；如果成員減少了，則刪除多餘的資料。
     */
    protected function _post_update()
    {
        $new_id_array = $this->get_member_id_array();

        $id = $this->get_id();
        if (isset($id))
        {
            array_unique($new_id_array);

            $db = $this->db;
            $db->select($this->foreign_field);
            $db->from($this->table_name);
            $db->distinct();
            $db->where($this->index_field, $id);
            $query = $db->get();

            $old_id_array = array();
            foreach ($query->result_array() AS $row)
            {
                $old_id_array[] = $row[$this->foreign_field];
            }

            $delete_id_array = array_cut($old_id_array, $new_id_array);
            if (count($delete_id_array) > 0)
            {
                $db->where($this->index_field, $id);
                $db->where_in($this->foreign_field, $delete_id_array);
                $db->delete($this->table_name);
            }

            $insert_id_array = array_cut($new_id_array, $old_id_array);

            $set = array();
            $set[$this->index_field] = $id;
            foreach ($insert_id_array AS $insert_id)
            {
                $set[$this->foreign_field] = $insert_id;
                $db->insert($this->table_name, $set);
            }
        }   //if (isset($this->id))
    }

    public function  create_item($type_id = NULL, $data = array()) {
        $item = parent::create_item($type_id, $data);
        $item->reset_loaded();
        return $item;
    }
}


/* End of file Generic_association_collection.php */
/* Location: ./system/application/libraries/toolkit/Generic_association_collection.php */