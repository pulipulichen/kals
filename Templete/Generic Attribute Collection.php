<?php
/**
 * ${name}
 *
 * ${name} full description.
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 ${date} ${time}
 */
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


/* End of file ${name}.php */
/* Location: ./system/application/libraries/.../${name}.php */