<?php
/**
 * Generic_collection 內建讀取之泛用集合
 *
 * 跟原本Collection不同的地方在於，
 * Generic_collection自行定義了$onload函數名稱為$load_default，
 * 並透過設定參數來調整$load_default的細節。
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/8 下午 08:35:41
 * @example 繼承樣板：<code>

class ${name} extends Generic_collection {

    // --------
    // Generic Collection
    // --------

    protected $table_name = ''; //資料表名稱
    protected $index_field = '_id';    //索引的欄位
//    protected $type_field = '_type_id';  //類別欄位
    protected $class_name = '';  //類別名稱
    protected $class_dir = '/';  //類別的目錄路徑
    protected $data_fields = array('_id', ''); //成員的資料表欄位

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
class Generic_collection extends Collection {

    // --------
    // Member Variables. Override them if need.
    // --------

    /**
     * 資料表名稱
     * @var string
     */
    protected $table_name;

    /**
     * 索引的欄位
     *
     * ID要搜尋的欄位名稱
     * @var string
     */
    protected $index_field;

    /**
     * 類別欄位
     * @var string
     */
    protected $type_field;

    /**
     * 類別名稱
     *
     * 取得資料之後，會使用此類別來進行成員的實體化。
     * 如果類別名稱是陣列，那麼會搭配類別的$type_field資料來進行實體化動作。
     * @var string|array
     */
    protected $class_name;

    /**
     * 類別的目錄路徑
     *
     * 如果不是在第一層目錄的話，注意最後要加上「/」，例如「fuzzy/」。
     * @var string
     */
    protected $class_dir = '';

    /**
     * 成員的資料表欄位
     * @abstract 實體化成員時$data_fields來過濾要實體化的資料，以避免多餘的資料匯入成員實體化的動作中。
     * @var array
     */
    protected $data_fields;

    /**
     * 限定筆數
     * @var integer
     */
    protected $limit;

    /**
     * 起始位移
     *
     * 0表示第一筆，1表示第二筆，依此類推。
     * @var integer
     */
    protected $offset;

    /**
     * 成員唯讀
     *
     * 設定update()時是否一併更新成員。如果成員沒有update()，
     * 或是不想讓此集合可以變更成員，則請設成TRUE。
     * @var boolean
     */
    protected $members_readonly = FALSE;

    /**
     * 排序設定
     *
     * 遵照Active Record的格式
     * @var string|null
     * @example protected $order_by = 'create_timestamp desc';
     */
    protected $order_by;

    // --------
    // Methods. Override them if need.
    // --------

    /**
     * __construct()前動作
     */
    protected function _post_construct()
    {

    }

    /**
     * load_default()後動作
     */
    protected function _post_load()
    {

    }

    /**
     * update()前動作
     *
     * 用來過濾成員的資料
     * @param array $members 集合的成員
     * @return array 過濾後的成員
     */
    protected function _pre_update($members)
    {
        return $members;
    }

    /**
     * update()後動作
     *
     * 在進行update()之後所進行的動作。
     */
    protected function _post_update()
    {

    }

    /**
     * load_default()的自訂追加條件
     *
     * 除了index_field跟id的搜尋條件之外，您可以自訂其他搜尋條件。
     * @param CI_DB_active_record $db
     * @param int $id
     */
    protected function _load_custom(CI_DB_active_record $db = NULL, $id = NULL)
    {

    }

    // --------
    // Private Memeber Variables
    // --------

    /**
     * 索引ID
     *
     * 跟$index_field搭配起來，在load_default()的時候搜尋資料使用。
     * @var integer
     */
    protected $id;

    /**
     * 索引物件
     *
     * 可以藉由設定索引物件$index_object來取$id或$type_id等資料。
     * @var Generic_object
     */
    protected $index_object;

    /**
     * 是否讀取
     *
     * $modified會影響是否要進行update()
     * @var boolean
     */
    protected $modified = FALSE;

    /**
     * 預設讀取的函數名稱
     *
     * 繼承Collection，但Generic_collection裡面則是內建設定成執行load_default()。
     * 實際上此變數並沒有用到。
     * @var string
     */
    protected $onload = 'load_default';

    // --------
    // Constrcut Methods 建構子相關
    // --------

    /**
     * 建構子
     * @param integer|Generic_object $id
     * @return Generic_collection
     */
    function  __construct($id = NULL) {
        parent::__construct();
        
        if (is_int($id) OR is_string($id))
        {
            $this->set_id($id);
        }
        else if (is_object($id))
        {
            $this->set_index_object($id);
        }

        if (isset($this->id) && isset($this->index_field))
        {
            $key = $this->index_field;
            $value = $this->id;
            $coll = get_cache($this, $key, $value);
            if (isset($coll))
            {
                $this->_import($coll);
                return $this;
            }
            else
                set_cache($this, $key, $value);
        }
        $this->_post_construct();
        
        return $this;
    }

    /**
     * 成員資料內部匯入
     *
     * 由於建構子中不能直接輸出快取得到的物件，所以要透過_import()來將成員資料匯入。
     * @param Generic_collection $gc
     * @return Generic_collection
     */
    protected function _import(Generic_collection $gc)
    {
        $class_vars = get_class_vars(get_class($gc));
        foreach ($class_vars AS $name => $value)
        {
            $this->$name =& $gc->$name;
        }
        return $this;
    }

    // ---------
    // Index Setter 設定索引資料
    // ---------

    /**
     * 取得索引ID
     * @return integer
     */
    public function get_id()
    {
        if (is_null($this->id) && isset($this->index_object))
        {
            $this->id = $this->index_object->get_id();
        }
        return $this->id;
    }

    /**
     * 設定索引ID
     * @param integer $id
     * @return Generic_collection
     */
    public function set_id($id)
    {
        $this->id = $id;
        $this->is_loaded = FALSE;
        return $this;
    }

    /**
     * 設定索引物件
     * @param Generic_object $obj
     * @return Generic_collection
     */
    public function set_index_object(Generic_object $obj)
    {
        $this->index_object = $obj;
        $this->id = $obj->get_id();
        $this->is_loaded = FALSE;
        return $this;
    }

    // --------
    // Members Loader 載入資料與設置成員相關方法
    // --------

    /**
     * 回呼函數(callback)檢查
     *
     * 這是覆寫Collection的方法。在這個方法中會呼叫load_default()方法，
     * 並由load_default()來判斷是否完成讀取。
     */
    protected function _check_callback()
    {
        if (isset($this->onload) && FALSE === $this->is_loaded)
        {
            $this->is_loaded = TRUE;
            $this->is_loaded = $this->load_default();
            if (is_null($this->is_loaded))
                $this->is_loaded = TRUE;
        }
    }

    /**
     * 強制重新載入
     * @return Generic_collection
     */
    public function force_loaded()
    {
        $this->is_loaded = TRUE;
        $this->is_loaded = $this->load_default();
        if (is_null($this->is_loaded))
            $this->is_loaded = TRUE;
        return $this;
    }

    /**
     * 預設從資料庫中取得集合資料的方法
     * @return boolean
     */
    public function load_default()
    {
        $id = $this->get_id();
        if (is_null($id))
            return FALSE;

        $db = $this->db;

        $db->from($this->table_name);
        $this->_load_default_index_where($db, $id);

        if (isset($this->offset))
            $db->offset ($this->offset);
        if (isset($this->limit))
            $db->limit($this->limit);
        if (isset($this->order_by))
            $db->order_by ($this->order_by);

        $this->_load_custom($db, $id);
        $query = $db->get();

        //$members = array();
        $this->members = array();

        //$class_name = $this->class_name;
        //$this->_check_class_dir();
        //$this->_CI_load('library', $this->class_dir.$this->class_name, strtolower($this->class_name));
        foreach ($query->result_array() AS $row)
        {
            $data = $this->_filter_data_field($row);
            //$member = new $class_name($data);
            if (isset($this->type_field) && isset($row[$this->type_field]))
                $member = $this->create_item($row[$this->type_field], $data);
            else
                $member = $this->create_item(NULL, $data);
            //array_push($members, $member);
            $this->_load_default_setup_member($row, $member);
        }

        //$this->members = $members;

        $this->_post_load();
        return TRUE;
    }

    /**
     * 預設搜尋條件
     *
     * 預設會搜尋$index_field中符合$id的資料
     * 子類別如有必要請覆寫此方法
     * @param CI_DB_active_record $db
     * @param integer $id
     */
    protected function _load_default_index_where(CI_DB_active_record $db, $id)
    {
        $db->where($this->table_name.'.'.$this->index_field, $id);
    }

    /**
     * 預設設定集合成員的方法
     *
     * 子類別如有必要請覆寫此方法
     * @param array $row 搜尋之後取得的資料
     * @param mixed $member
     */
    protected function _load_default_setup_member($row, $member)
    {
        $this->members[] = $member;
    }

    /**
     * 過濾建立成員的資料
     *
     * 要搭配$data_fields一起使用。
     * @param array $row 從load_default()中取得的資料
     * @return array 過濾之後的資料
     */
    protected function _filter_data_field($row)
    {
        if (count($this->data_fields) == 0)
            return $row;

        $data = array();
        foreach ($this->data_fields AS $field)
        {
            if (isset($row[$field]) && NULL !== $row[$field])
                $data[$field] = $row[$field];
        }
        return $data;
    }

    // --------
    // Member Creator 建立成員相關方法
    // --------

    /**
     * 建立並實體化成員
     *
     * 應用工廠模式。會依據$class_name的資料來建立成員物件。
     * 如果$class_name是陣列，則會利用$type_id來判斷要建立哪一種物件。
     * @param integer $type_id
     * @param array $data 初始化資料
     * @return Generic_object
     */
    public function create_item($type_id = NULL, $data = array())
    {
        $class_name = NULL;
        if (is_string($this->class_name))
            $class_name = $this->class_name;
        else if (isset($type_id) && isset($this->class_name[$type_id]))
            $class_name = $this->class_name[$type_id];
        else
            return NULL;

        if (is_array($type_id) && count($data) == 0)
        {
            $data = $type_id;
            $type_id = NULL;
        }


        //include_once $class_path.'.php';
        $filtered_data = $this->_filter_data_field ($data);
//        if (is_array($data) && count($data) > 0)
//        {
//            $item->force_loaded();
//            $item->set_field($data);
//        }

        $this->_check_class_dir();
        $class_path = $this->class_dir.$class_name;
        $this->_CI_load('library', $class_path, strtolower($class_name));

        $item = NULL;
        if (count($filtered_data) > 0)
        {
            // 這邊要注意到是否有用到association，有時候association關連外部資料表的物件，它的主鍵會跟index_field重疊
            if (is_string($this->index_field) && !isset($filtered_data[$this->index_field]))
                $filtered_data[$this->index_field] = $this->get_id();
            if (isset($this->type_field))
                $filtered_data[$this->type_field] = $type_id;
            $item = new $class_name($filtered_data);
        }
        else
            $item = new $class_name();

        return $item;
    }

    /**
     * 檢查$class_dir最後是否有「/」
     */
    protected function _check_class_dir()
    {
        if (trim($this->class_dir) != ''
            && substr($this->class_dir, -1) !== '/')
            $this->class_dir = $this->class_dir.'/';
        return $this;
    }

    // --------
    // Member Getter 成員取得器
    // --------

    /**
     * 取得指定$key的成員
     * @param integer $key 索引名稱
     * @return Generic_object
     */
    public function  get_item($key) {
        return parent::get_item($key);
    }

    /**
     * 取得成員的ID列表
     * @return array
     */
    public function get_member_id_array()
    {
        $members = $this->members;
        $id_array = array();
        foreach ($members AS $key => $member)
        {
            $id_array[] = $member->get_id();
        }
        return $id_array;
    }

    /**
     * 類別數量
     *
     * 取得$class_name的數量
     * @return integer
     */
    public function get_type_number()
    {
        if (is_array($this->class_name))
            return count($this->class_name);
        else
            return 1;
    }

    /**
     * 取得成員類別的對應類別ID
     * @return array|null
     */
    public function get_types_id()
    {
        if (is_array($this->class_name))
            return array_keys($this->class_name);
        else
            return NULL;
    }

    // --------
    // Member Setter 成員設置器
    // --------

    /**
     * 插入成員
     *
     * 如果有設定$key的話，則會指定插入$key索引，覆蓋該索引的成員。
     * @param Generic_object $obj
     * @param string|null $key
     * @return Generic_collection
     */
    public function  add_item(Generic_object $obj, $key = NULL) {
        parent::add_item($obj, $key);
        $this->modified = TRUE;
        return $this;
    }

    /**
     * 設定合集內成員
     * @param integer|Generic_object|array|Generic_collection $coll
     * 可以輸入Generic_object的ID(int)、Generic_object本身、包含Generic_object的陣列(array)、或是Generic_collection
     * @return Generic_collection
     */
    public function set_members($coll)
    {
        if (is_int($coll) && isset($this->index_object))
        {
            $coll = $this->index_object->filter_object($coll);
        }

        if (is_class($coll, $this->class_name))
        {
            $coll = array($coll);
        }

        $this->members = array();
        foreach ($coll AS $item)
        {
            $this->members[] = $item;
        }
        $this->modified = TRUE;
        $this->is_loaded = TRUE;
        return $this;
    }

    /**
     * 設定成員編號
     *
     * 取得成員並set_field()的捷徑。
     * @param integer $key 索引編號
     * @param array $data 要給成員設定的資料
     * @return Generic_collection
     */
    public function set_item_data($key, $data)
    {
        $item = $this->get_item($key);
        if (isset($item))
        {
            $item->set_field($data);
            $this->modified = TRUE;
        }
        return $this;
    }

    // --------
    // Member Management 成員管理
    // --------

    /**
     * 刪除指定成員
     * @param string $key
     * @return Generic_collection
     */
    public function  remove_item($key) {
        $this->_check_callback();
        if (isset($this->members[$key]))
        {
            $this->members[$key]->delete();
            unset($this->members[$key]);
        }
        $this->modified = TRUE;
        return $this;
    }

    /**
     * 移除所有成員
     * @return Generic_collection
     */
    public function remove_members()
    {
        $this->_check_callback();

        $keys = $this->keys();
        foreach ($keys AS $key)
        {
            $this->remove_item($key);
        }
        $this->modified = TRUE;
        return $this;
    }

    /**
     * 更新
     * @return Generic_collection
     */
    public function update()
    {
        if ($this->modified == FALSE)
            return $this;

        $members = array();
        
        if ($this->members_readonly === FALSE)
        {
            $members = $this->_pre_update($this->members);

            foreach ($members AS $key => $member)
            {
                /*
                if (FALSE === $member->is_deleted())
                {
                    $member->update();
                }
                else
                {
                    unset($this->members[$key]);
                }
                 */
                $member->update();

                if ($member->is_deleted())
                    unset($this->members[$key]);
            }
        }

        $this->_post_update();

        $this->modified = FALSE;
        return $this;
    }

    // --------
    // Limit & Offset setter 限制筆數與起始位移設定器
    // --------

    /**
     * 設定限制筆數
     * @param integer $limit
     * @return Generic_collection
     */
    public function set_limit($limit)
    {
        $this->limit = $limit;
        return $this;
    }

    /**
     * 取消限制筆數
     * @return Generic_collection
     */
    public function disable_limit()
    {
        $this->limit = NULL;
        return $this;
    }

    /**
     * 設定起始位移
     * @param integer $offset
     * @return Generic_collection
     */
    public function set_offset($offset)
    {
        $this->offset = $offset;
        return $this;
    }

    /**
     * 取消起始位移
     * @return Generic_collection
     */
    public function disable_offset()
    {
        $this->offset = NULL;
        return $this;
    }

    /**
     * 清除已修改旗號
     * @return Generic_collection
     */
    public function reset_modified()
    {
        $this->modified = FALSE;
        return $this;
    }

    // --------
    // Public Helpers 公開輔助函數
    // --------

    /**
     * 魔術方法：字串化
     * @return string
     */
    public function  __toString() {
        return get_class($this).'::$index_id='.$this->get_id();
    }
    
    
    /**
     * 輸出
     * @return \Generic_collection
     */
    public function export_to_array() {
        $output = array();
        
        foreach ($this AS $key => $item) {
            if (method_exists($item, 'export_to_array')) {
                $output[$key] = $item->export_to_array();
            }
            else {
                $output[$key] = $item;
            }
        }
        return $output;
    }
}

/* End of file Generic_collection.php */
/* Location: ./system/application/libraries/toolkit/Generic_collection.php */