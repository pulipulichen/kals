<?php
/**
 * Generic_object 泛用Model類別原形
 *
 * 大部分存取資料庫相關的Model類別(class)的原形。
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/23 下午 03:35:51
 * @example 繼承時的範例：<code>
class ${name} extends Generic_object {

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
    // ${name} Member Variables
    // --------

    // --------
    // ${name} Methods
    // --------

}
    </code>
 */
class Generic_object extends KALS_object {

    // -------
    // Properties (Member Variables) to override
    // -------

    /**
     * 資料庫名稱
     * @var string
     * @example 以Domain類別為例：protected $table_name = 'domain';
     */
    protected $table_name;

    /**
     * 主鍵的欄位名稱
     * @var string
     * @example 以Group類別為例：protected $primary_key = 'group_id';
     */
    protected $primary_key;

    /**
     * 資料表欄位
     *
     * 設定之後，將會過濾掉只剩下該資料表欄位的資料才能存入資料庫，以防SQL輸入資料錯誤。
     * @var string
     * @example 以Domain類別為例：protected $table_fields = array('domain_id', 'host', 'title');
     */
    protected $table_fields = array();

    /**
     * 唯一鍵限制
     *
     * 這會影響到update的過程，也會讓create先執行find確認是否已經有該列資料才會繼續。
     * @var array
     * @example 以User類別為例：protected $unique_restriction = array('domain_id', 'name');
     */
    protected $unique_restriction = array();

    /**
     * 非空值限制
     *
     * 這是在進行update()時的確認，跟您資料庫當中的設定有些許差異。
     * @var array
     * @example 以Webpage類別為例：protected $not_null_field = array('uri');
     */
    protected  $not_null_field = array();

    /**
     * 預設欄位
     *
     * 如果有設定的話，會作為set_field, find, create的預設欄位。
     * @var string
     * @example 以Domain類別為例：protected $default_field = 'url';
     */
    protected  $default_field;

    /**
     * 外鍵
     *
     * 如果有設定的話，刪除之前會先確定是否有外鍵存在，存在的話則送出錯誤訊息。
     * @var array
     * @example 以Domain類別為例：<code>
     * protected $foreign_keys = array(
     *      'webpage' => 'domain_id',
     *      'user' => 'domain_id',
     *      'group' => 'domain'
     * ); </code>
     */
    protected  $foreign_keys = array();

    /**
     * 假性刪除
     *
     * 這種刪除並不會直接刪除資料表中的該筆資料，而只是把$fake_delete指定的欄位從FALSE設定成TRUE，並在find或create時略過被設成TRUE的欄位。
     * @var string 資料庫欄位
     */
    protected  $fake_delete;

    /**
     * 排除脫逸(escape)的欄位
     *
     * 以bind的方式而不以預設Active Record的方式進行SQL插入與更新的動作
     * @var array 排除escape的欄位
     */
    protected $except_bind_fields = array();

    /**
     * 是否使用快取。
     * @var boolean
     */
    protected $use_cache = TRUE;


    // -------
    // Methods to override if need.
    // -------

    /**
     * __construct()完成後動作
     *
     * 建構子執行完畢之後，進行的後續動作。
     * 如果此類別中有其他成員變數需要初始化的話，建議可以在此進行。
     * @param string|integer|array|null $table_name
     * 可以是資料表名稱(string)、ID(integer)、載入資料(array)，或是給CodeIgniter讀取時不輸入任何參數使用。(null)
     * @param integer|string|null $id
     * 可以是ID(integer或是string)，也可以是空值。
     */
    protected function _post_construct($table_name = NULL, $id = NULL)
    {

    }

    /**
     * set_field()資料過濾
     *
     * 欄位資料過濾。set_field、get_field、create、find都會經過此方法過濾欄位資料。
     * @param mixed $cond 輸入資料，一般而言是陣列。
     * @return mixed 輸出資料，一般而言是陣列
     * @example
     * 輸入資料：$cond = array('url' => 'http://sites.google.com/site/puddingkals/'); <br />
     * 輸出資料：array('host' => 'http://sites.google.com/')
     * @example <code>
     *     protected function _set_field_filter($cond)
     *     {
     *         if (is_array($cond) && array_key_exists('url', $cond))
     *             $cond['host'] = parse_host($cond['url']);
     *         else if (is_string($cond) && $cond == 'url')
     *             $cond = 'host';
     *         return $cond;
     *     }</code>
     */
    protected  function _set_field_filter($cond)
    {
        return $cond;
    }
    /**
     * get_field()資料過濾
     *
     * 輸出欄位資料過濾。get_field會經過此方法過濾欄位資料。
     * @param String $cond 輸入資料，一般而言是陣列。
     * @return mixed 輸出資料，一般而言是字串。
     */
    protected  function _get_field_filter($field)
    {
        return $field;
    }

    /**
     * update()前動作
     *
     * 做update之前的資料處理。
     * @var Array 由$database_fields傳來並處理過的資料
     * <code>'host' => 'http://sites.google.com/site/puddingkals/'</code>
     * @return Array 預備要給Active Record去set的資料
     * <code> 'host' => 'http://sites.google.com/site/puddingkals/',
     * 'title' => 'KALS!'</code>
     * @example <code>
     *     protected function _pre_update($data)
     *     {
     *         if (FALSE === isset($data['title'])
     *             OR is_null($data['title']))
     *         {
     *             $title = retrieve_title($this->get_field('host'));
     *             if (NULL != $title)
     *                 $data['title'] = $title;
     *         }
     *         return $data;
     *     } </code>
     */
    protected  function _pre_update($data)
    {
        return $data;
    }

    /**
     * update()後動作
     *
     * 在插入或更新完成之後會進行的動作。
     * 如果有其他成員變數要一併更新，建議可以在此處進行。
     */
    protected function _post_update()
    {

    }

    /**
     * 新增(insert)前動作
     *
     * 做insert之前的資料處理。
     * @var Array 由$database_fields傳來並處理過的資料
     * <code>'host' => 'http://sites.google.com/site/puddingkals/'</code>
     * @return Array 預備要給Active Record去set的資料
     * <code> 'host' => 'http://sites.google.com/site/puddingkals/',
     * 'title' => 'KALS!'</code>
     */
    protected  function _pre_insert($data)
    {
        return $data;
    }

    /**
     * 新增(insert)後動作
     *
     * 做完update中的insert之後要做的事情。如有必要請Override此方法。
     * @example <code>
     *     public function _post_insert()
     *     {
     *         if ($this->get_field('title') == NULL)
     *         {
     *             $title = retrieve_title($this->get_field('host'));
     *             if (NULL != $title)
     *             {
     *                 $this->set_field('title', $title);
     *                 parent::update();
     *             }
     *         }
     *     } </code>
     */
    protected  function _post_insert()
    {

    }

    /**
     * delete()前動作
     *
     * 做delete之前的資料處理。會在檢查外鍵之前進行。
     */
    protected  function _pre_delete()
    {

    }

    /**
     * create()前動作
     *
     * 在進行create動作之前，先將輸入的資料進行過濾。
     * 這個動作會在_set_field_filter()、檢查cache之後進行。只有create()有此動作。
     * @param mixed $data
     * @return mixed
     */
    protected  function _pre_create($data)
    {
        return $data;
    }

    // -------
    // Properties (Member Variables)
    // -------

    /**
     * ID
     *
     * Generic Object會利用此ID決定是否要作load()動作，或是在進行update()時決定到底要新增(insert)或更新(update)。
     * @var int
     */
    protected $id;

    /**
     * 資料陣列
     *
     * Generic Object用來保存資料的陣列。通常是跟資料庫的欄位一起搭配。
     * 如果有設定$table_fields的話，則會限定只能存入$table_fields指定的那幾個欄位。
     * @var array
     */
    protected $database_fields = array();

    /**
     * 是否已經載入
     * @var boolean
     */
    protected $loaded = FALSE;

    /**
     * 有變動過的欄位
     *
     * 此陣列會用來在update()時決定要進行更新(update)的欄位。沒有變動過的欄位則不會進行更新。
     * @var array
     */
    protected $modified_fields = array();

    /**
     * 是否變更過
     *
     * $modified會用於update()判斷是否要進行更新。
     * @var boolean
     */
    protected $modified = FALSE;

    /**
     * 是否刪除
     *
     * $deleted會在update()之後設定為FALSE，會在delete()之後設為TRUE。
     * 如果有設定ID的話，is_deleted()會從資料庫中去檢索，來判斷是否已經刪除。
     * @var boolean
     */
    protected $deleted = NULL;

    // --------
    // 建構子相關函數
    // --------

    /**
     * 建構子
     * @param string|integer|array|null $table_name
     * 可以是資料表名稱(string)、ID(integer)、載入資料(array)，或是給CodeIgniter讀取時不輸入任何參數使用。(null)
     * @param integer|string|null $id
     * 可以是ID(integer或是string)，也可以是空值。
     * @return Generic_object
     */
    function  __construct($table_name = NULL, $id = NULL) {

        parent::__construct();
        if ( $this->use_cache )
        {
            if (is_array($table_name) && isset($table_name[$this->primary_key]))
            {
                $key = $this->primary_key;
                $value = $table_name[$this->primary_key];
                $go = get_cache($this, $key, $value);
                if (isset($go))
                {
                    $this->_import($go);
                    $this->_post_construct($table_name, $id);
                    return $this;
                }
                else
                    set_cache($this, $key, $value);
            }
            else if ((is_string($table_name) || is_int($table_name))
                && is_null($id))
            {
                $cache_cond = $this->_get_cache_cond($table_name);
                $go = get_cache($this, $cache_cond);
                if (isset($go))
                {
                    $this->_import($go);
                    $this->_post_construct($table_name, $id);
                    return $go;
                }
                else
                    set_cache($this, $cache_cond);
            }
        }

        $result = $this->_initialize($table_name, $id);
        if (is_null($result))
            return NULL;
        $this->_post_construct($table_name, $id);
        return $this;
    }

    protected function _data_is_id($data)
    {
        if (FALSE === is_array($data))
            return TRUE;

        if (count($data) === 1
            && array_key_exists($this->primary_key, $data))
            return TRUE;
        else
            return FALSE;
    }

    /**
     * Generic Object初始化
     * 
     * @param string|integer|array|null $table_name
     * 可以是資料表名稱(string)、ID(integer)、載入資料(array)，或是給CodeIgniter讀取時不輸入任何參數使用。(null)
     * @param integer|string|null $tuple_id
     * 可以是ID(integer或是string)，也可以是空值。
     * @return Generic_object
     */
    protected function _initialize($table_name, $tuple_id = NULL)
    {
        if (is_array($table_name) && is_null($tuple_id)
            && isset($this->table_name) && isset($table_name[$this->primary_key]) )
        {
            $data = $this->_get_table_data($table_name, $this->table_fields);

            if (FALSE === $this->_data_is_id($data))
            {
                return $this->force_loaded($data);
            }
            else if (isset($this->primary_key) && isset($this->table_name))
            {
                $table_name = $this->table_name;
                $tuple_id = $data[$this->primary_key];
            }
        }

        if (NULL !== $table_name && is_null($tuple_id)
            && NULL != $this->table_name)
        {
            $tuple_id = intval($table_name);
            $this->id = $tuple_id;
            $table_name = $this->table_name;
        }

        if ($table_name != NULL)
            $this->table_name = $table_name;
        if ($tuple_id != NULL)
            $this->id = $tuple_id;
        return $this;
    }

    /**
     * 匯入
     *
     * 由於建構子沒辦法取得快取之後直接輸出，所以只好用匯入方法來將快取取得的資料匯入此物件當中。
     * @param Generic_object $go
     * @return Generic_object
     */
    protected function _import(Generic_object $go)
    {
        $class_vars = get_class_vars(get_class($go));
        foreach ($class_vars AS $name => $value)
        {
            //if (is_null($this->$name)
            //    OR (is_array($this->$name) && count($this->$name) == 0))
            $this->$name =& $go->$name;
        }
        return $this;
    }

    // --------
    // 讀取資料相關
    // --------

    /**
     * 重新讀取
     *
     * 重新從資料庫中取得欄位資料
     * @return Generic_object
     */
    public function reload()
    {
    	$id = $this->get_id();
        if (is_null($id))
            return $this;

        $pk = self::_get_pk($this->primary_key, $this->table_name);
    	$table_name = $this->table_name;

    	$this->db->from($table_name)
    		->where($pk, $id);
        if (is_string($this->fake_delete))
        {
            $this->db->where($this->fake_delete, 'FALSE');
        }
    	$query = $this->db->get();

        if ($query->num_rows() > 0)
        {
            $result_fields = $query->first_row('array');

            $this->database_fields = $result_fields;

            $this->loaded = TRUE;

            if (sizeof($this->modified_fields) > 0)
            {
                    foreach($this->modified_fields as $key => $value)
                    {
                            $this->modified_fields[$key] = FALSE;
                    }
            }
        }
    	return $this;
    }

    /**
     * 強制設成已讀取
     *
     * 這個方法可以避免Generic Object使用_load()去取得資料庫的資料。
     * 您可以輸入資料，作為強制設為已讀取的值。
     * @param mixed|null $data
     * @return Generic_object
     */
    public function force_loaded($data = NULL)
    {
        if (is_array($data))
        {
            $this->loaded = TRUE;
            $data = self::_get_table_data($data, $this->table_fields);
            if (count($data) > 0)
            {
                $this->set_field($data);
                return $this;
            }
            else
                return NULL;
        }
        else
        {
            $this->loaded = TRUE;
            return $this;
        }
    }

    /**
     * 設定為未讀取
     * @return Generic_object
     */
    public function reset_loaded()
    {
        $this->loaded = FALSE;
        return $this;
    }

    /**
     * 內部讀取
     *
     * 當要取得成員變數資料時，會先從資料庫取得該物件的欄位資料。
     * @return Generic_object
     */
    protected  function _load()
    {
    	$this->reload();
    	$this->loaded = TRUE;
    	return $this;
    }

    /**
     * 確認是否已經讀取
     * @return Generic_object
     */
    protected function _check_load()
    {
        if (FALSE === $this->loaded
            && TRUE === isset($this->id))
    	{
            $this->reload();
            $this->loaded = TRUE;
    	}

    	return $this;
    }

    // --------
    // Public Getter 公開的取得器
    // --------

    /**
     * 取得ID
     * @return int
     */
    public function get_id()
    {
        if (isset($this->id))
        {
            if (is_string($this->id) && in_array(trim($this->id), array('s', 'f', 't')))
            {
                $this->id = NULL;
                return NULL;
            }
            $id = intval($this->id);
            return $id;
        }
        else
            return NULL;
    }

    /**
     * 取得指定$field的欄位資料
     * @param string $field
     * @return mixed
     */
    public function get_field($field)
    {
        if (is_array($field))
        {
            $output = array();
            $cond = $field;
            foreach ($cond AS $f)
            {
                $value = $this->get_field($f);
                $output[$f] = $value;
            }
            return $output;
        }

        $id = $this->get_id();
    	if (TRUE === isset($id)
    		&& FALSE === $this->loaded)
    	{
            $this->reload();
    	}

        $f = $field;
        $field = $this->_get_field_filter($field);

        if (isset($this->database_fields[$field]))
            return $this->database_fields[$field];
        else if (in_array($field, $this->table_fields))
            return NULL;
        else
        {
            //return $this->database_fields[$field];
            handle_error($this->lang->line('generic_object.get_field.exception', array(get_class($this), $field)));
        }
    }

    /**
     * 取得全部欄位的資料
     * @return array
     */
    public function get_all_fields()
    {
    	if (FALSE === $this->loaded)
    		$this->reload();
    	return $this->database_fields;
    }

    // --------
    // 公開的設定器 Public Setter
    // --------

    /**
     * 設定欄位資料。
     *
     * 您也可以存入一個陣列，則set_field()會將陣列的索引作為欄位名稱，值作為要設定的資料，來進行批次設定。
     * 欄位名稱符合$primary_key時，同時會設定ID。
     * @param string|array $field
     * @param mixed|null $value
     * @return Generic_object
     */
    public function set_field($field, $value = NULL)
    {
        if (is_array($field) && is_null($value))
        {
            $data = $field;
            foreach ($data AS $field => $value)
            {
                $this->set_field($field, $value);
            }
            return $this;
        }

    	if (FALSE === $this->loaded
            && TRUE === isset($this->id))
    	{
            $this->reload();
    	}

        //if (get_class($this) == 'Annotation_scope')
       //     test_msg(get_class($this). ' set_field 1', $data);

        $data = self::_set_default_field($this->default_field, $field, $value);

        //if (get_class($this) == 'Annotation_scope')
        //    test_msg(get_class($this). ' set_field 2', $data);

        $data = $this->_set_field_filter($data);

        //if (get_class($this) == 'Annotation_scope')
        //    test_msg(get_class($this). ' set_field 3', array($data, is_array($data), $value));

        $data = self::_get_table_data($data, $this->table_fields);

        //if (get_class($this) == 'Annotation_scope')
        //    test_msg(get_class($this). ' set_field 4', $data);

        foreach ($data AS $field => $value)
        {
            $this->modified = TRUE;
            $this->database_fields[$field] = $value;
            $this->modified_fields[$field] = TRUE;

            if (isset($this->primary_key) && $field == $this->primary_key)
                $this->id = $value;
        }

    	return $this;
    }

    public function unset_field($field)
    {
        $this->modified = TRUE;
        $this->database_fields[$field] = '';
        $this->modified_fields[$field] = TRUE;

        return $this;
    }

    /**
     * 設定資料並更新
     *
     * 設定欄位資料之後直接進行更新。
     * @param string|array $field
     * @param mixed|null $value
     * @return Generic_object
     */
    public function save_field($field, $value = NULL)
    {
    	if (is_array($field))
    	{
    		foreach ($field as $key => $value)
    			$this->set_field($key, $value);
    		$this->save();
    	}
    	else
    	{
    		$this->set_field($field, $value)
    			->save();
    	}
    	return $this;
    }

    // --------
    // Delete Methods 刪除相關函數
    // --------

    /**
     * 刪除此物件。
     *
     * 刪除之後，$deleted會被設為TRUE。
     * @return boolean
     */
    public function delete()
    {
        $id = $this->get_id();
    	if (TRUE === isset($id)
            && TRUE === isset($this->table_name))
    	{
            $this->_pre_delete();

            $pk = self::_get_pk($this->primary_key, $this->table_name);
            //$id = $this->get_id();
            $table_name = $this->table_name;

            if (is_null($this->fake_delete))
            {
//                //先檢查是否有這個id吧
//                $result_num = $this->db->where($pk, $id)
//                        ->from($table_name)
//                        ->count_all_results();
//
//                if ($result_num > 0)
//                {
//
//                    $this->db->where($pk, $id)
//                        ->delete($table_name);
//
//                    $this->id = NULL;
//                    $this->database_fields = array();
//                    $this->loaded = FALSE;
//                    $this->modified_fields = array();
//                    $this->modified = FALSE;
//
//                    return TRUE;
//                }
                $this->db->where($pk, $id)
                        ->delete($table_name);
            }   //$this->_pre_delete();
            else
            {
                $deleted_field = $this->fake_delete;
                $this->db->set($deleted_field, 'TRUE');
                $this->db->where($pk, $id);
                $this->db->update($table_name);
            }

            if ($this->use_cache)
                unset_cache($this);
            $this->id = NULL;
            $this->database_fields = array();
            $this->loaded = FALSE;
            $this->modified_fields = array();
            $this->modified = FALSE;

            $this->deleted = TRUE;

            return TRUE;
    	}

    	return FALSE;
    }

    /**
     * 確定是否刪除
     * @return boolean
     */
    public function is_deleted()
    {
        if (is_null($this->deleted))
        {
            $id = $this->get_id();
            $db = $this->db;
            $pk = self::_get_pk($this->primary_key, $this->table_name);
            $table = $this->table_name;

            $db->where($pk, $id);
            if (isset($this->fake_delete))
                $db->where($this->fake_delete, 'FALSE');
            $count = $db->count_all_results($table);

            $this->deleted = ($count == 0);
        }
        return $this->deleted;
    }

    /**
     * 刪除此物件
     *
     * delete()的捷徑。
     * @return boolean
     */
    public function destroy()
    {
        return $this->delete();
    }

    /**
     * 復原刪除狀態。
     *
     * 如果有設定$fake_delete的話，則可以使用restore()復原刪除狀態。
     */
    public function restore()
    {
        if (is_null($this->fake_delete))
            return $this;

        $pk = self::_get_pk($this->primary_key, $this->table_name);
        $id = $this->get_id();
        $table_name = $this->table_name;

        $deleted_field = $this->fake_delete;
        $this->db->set($deleted_field, 'FALSE');
        $this->db->where($pk, $id);
        $this->db->update($table_name);

        $this->loaded = FALSE;
        $this->modified_fields = array();
        $this->modified = FALSE;

        return $this;
    }

    // -------
    // Update & Insert Methods 更新與新增的函式
    // -------

    /**
     * 更新資料
     *
     * 如果有設定ID，則會進行更新(update)，否則會進行新增(insert)
     * @return Generic_object
     */
    public function update()
    {
        $pk = self::_get_pk($this->primary_key, $this->table_name);
    	$id = $this->get_id();
    	$table_name = $this->table_name;

    	if (FALSE === isset($id))
            $this->loaded = FALSE;

        $data = self::_get_table_data($this->database_fields, $this->table_fields);
        $data = $this->_pre_update($data);

        if (count($data) > 0)
        {
            if (FALSE === $this->loaded)
            {
                $data = $this->_pre_insert($data);

                #假設這是一個新項目
                if (self::_has_unique_restriction($this->unique_restriction)
                    && (FALSE === self::_check_unique($this)
                        OR FALSE === self::_check_not_null($data, $this->not_null_field)) )
                {
                    test_msg('約束沒過 ['.get_class($this).'] (_check_unique='.self::_check_unique($this).'; _check_not_null='.self::_check_not_null($data, $this->not_null_field).')'
                        , $data);
                    return $this;
                }

                $this->_do_insert($data, $table_name);

                $select_last_insert_data = $this->_filter_except_bind_fields($data);

                //然後取得新增的ID
                $query = $this->db->select_max($pk, 'count')
                                ->where($select_last_insert_data)
                                ->get($table_name);
                if ($query->num_rows() > 0)
                {
                    $result = $query->row_array(); //$query->first_row('array', 0);
                    $proposed_id = $result['count'];
                    if ($proposed_id > 0)
                    {
                            $this->loaded = TRUE;
                            $this->id = $proposed_id;
                    }

                    $this->_post_insert();

                    if ( $this->use_cache)
                    {
                        $cache_cond = $this->_get_cache_cond();
                        set_cache($this, $cache_cond);
                    }
                }
            }
            else
            {
                #更新原有項目
                $this->_do_update($data, $table_name, $pk, $id);
            }

            //補齊原本資料中尚未擁有的資料
            foreach ($this->table_fields AS $field)
            {
                if (FALSE === isset($this->database_fields[$field]))
                {
                    $this->reload();
                    break;
                }
            }

        }   //if (count($data) > 0)

        $this->_post_update();
        $this->deleted = FALSE;

    	return $this;
    }

    /**
     * 更新
     *
     * update()的捷徑
     * @return Generic_object
     */
    public function save()
    {
        return $this->update();
    }
    
    /**
     * 以Active Record執行更新的動作
     *
     * 有些類別會想要覆寫更新方法
     * @param array $data
     * @param string $table_name
     * @param string $pk 主鍵
     * @param integer $id
     * @return Generic_object
     */
    protected function _do_update($data, $table_name, $pk, $id)
    {
        if (is_null($this->except_bind_fields)
            OR count($this->except_bind_fields) == 0 )
        {
            #更新原有項目
            $this->db->set($data);
            $this->db->where($pk, $id);
            if (is_string($this->fake_delete))
            {
                //只更新尚未被刪除的
                $this->db->where($this->fake_delete, 'FALSE');
            }
            $this->db->update($table_name);
        }
        else
        {
            $this->_do_update_binds($data, $table_name, $pk, $id, $this->except_bind_fields);
        }
        return $this;
    }

    /**
     * 以SQL方式更新資料
     * @param array $data
     * @param string $table_name
     * @param string $pk 主鍵
     * @param integer $id
     * @param array $except_bind_fields 脫逸欄位
     * @return Generic_object 
     */
    protected function _do_update_binds($data, $table_name, $pk, $id, $except_bind_fields = array())
    {
        if (count($except_bind_fields) == 0 || is_null($except_bind_fields))
        {
            $this->_do_update($data, $table_name, $pk, $id);
            return $this;
        }

        //test_msg('_do_update_binds()', $data);

        $binds = array();
        $set = '';

        foreach ($data AS $field => $value)
        {
            if (array_key_exists($field, $this->modified_fields) == FALSE
                || $this->modified_fields[$field] == FALSE)
                    continue;

            if ($set != '')
                $set .= ', ';

            if (in_array($field, $except_bind_fields))
            {
                if ($value == '')
                    $value = 'NULL';

                //過濾有問題的字元
                $value = str_replace('?', ' ', $value);
                $value = str_replace('%', ' ', $value);

                if (isset($value) == FALSE || is_null($value))
                    $set .= $field.' = NULL';
                else
                {
                    if (substr(($value), -1) != ')')
                    {
                        $value = str_replace("'", '', $value);
                        $value = "'" . $value . "'";
                    }
                    $set .= $field." = ".$value."";
                }
            }
            else
            {
                $set .= $field.' = ?';
                $binds[] = $value;
            }
        }

        if ($set == '')
            return $this;

        $sql = 'UPDATE '.$table_name.' SET '.$set.' WHERE '.$pk.' = '.$id;

        //test_msg($sql, $binds);

        $this->db->query($sql, $binds);

        return $this;
    }
    
    /**
     * 以Active Record執行插入動作
     *
     * 有些類別會想要覆寫此方法
     * @param array $data
     * @param string $table
     */
    protected function _do_insert($data, $table_name)
    {
        if (is_null($this->except_bind_fields)
            OR count($this->except_bind_fields) == 0 )
        {
            $this->db->set($data);
            $this->db->insert($table_name);
        }
        else
        {
            $this->_do_insert_binds($data, $table_name, $this->except_bind_fields);
        }
        return $this;
    }

    /**
     * 以SQL執行插入動作
     * @param array $data
     * @param string $table_name
     * @param array $except_bind_fields 不脫逸的欄位
     * @return Generic_object
     */
    protected function _do_insert_binds($data, $table_name, $except_bind_fields = array())
    {
        if (count($except_bind_fields) == 0 || is_null($except_bind_fields))
        {
            $this->_do_insert($data, $table_name);
            return $this;
        }

        $binds = array();
        $fields = '';
        $values = '';
        foreach ($data AS $field => $value)
        {
            if ($fields != '')
                $fields .= ', ';
            $fields .= $field;

            if ($values != '')
                $values .= ', ';

            if (in_array($field, $except_bind_fields))
                $values .= $value;
            else
            {
                $values .= '?';
                $binds[] = $value;
            }
        }

        $sql = 'INSERT INTO '.$table_name.' ('.$fields.') VALUES ('.$values.') ';

        $this->db->query($sql, $binds);
    }

    /**
     * 找出不脫逸欄位的資料
     * @param array $data
     * @return array
     */
    protected function _filter_except_bind_fields($data)
    {
        if (count($this->except_bind_fields) == 0)
            return $data;

        $ex = $this->except_bind_fields;
        foreach ($ex AS $field)
        {
            if (isset($data[$field]))
                unset($data[$field]);
        }
        return $data;
    }

    // --------
    // Factory Methods 工廠模式的方法
    // --------

    /**
     * 搜尋
     *
     * 輸入陣列的指定條件，取得第一個符合條件的物件資料，並建立新物件回傳。
     * 如果沒有找到，則回傳NULL
     * @param array|string|mixed $cond
     * 搜尋條件(array)，或是要搜尋的欄位(string，並有設定$value的情況)，或是已經設定$default_field的情況下的值(mixed)
     * @param mixed|null $value 值
     * @return Generic_object
     */
    public function find($cond, $value = NULL)
    {
        $cond = self::_set_default_field($this->default_field, $cond, $value);
        $cond = $this->_set_field_filter($cond);
        $cond = self::_get_table_data($cond, $this->table_fields);

        if (count($cond) == 0)
            return NULL;

        $pk = self::_get_pk($this->primary_key, $this->table_name);

        $cache_cond = $this->_get_cache_cond($cond);
        if ($this->use_cache)
        {
            $obj = get_cache($this, $cache_cond);
            if (is_object($obj))
                return $obj;
        }

        $this->db->where($cond);
        if (is_string($this->fake_delete))
            $this->db->where ($this->fake_delete, 'FALSE');
        $this->db->select($pk);
        $query = $this->db->get($this->table_name);
        if ($query->num_rows() > 0)
        {
            $row = $query->row_array();
            $id = intval($row[$pk]);
            $class_name = get_class($this);
            $obj = new $class_name($id);
            if ($this->use_cache)
                set_cache($obj, $cache_cond);
            return $obj;
        }
        else
        {
            return NULL;
        }
    }

    /**
     * 搜尋多個物件
     * @param array $cond 必須是以key跟value搭配的搜尋條件
     * @param integer $limit
     * @param integer $offset
     * @return array Generic Object會以陣列的形態回傳，並且全部都是loaded的狀態
     */
    function find_all($cond = NULL, $limit = NULL, $offset = NULL)
    {
        if (is_array($cond))
        {
            $cond = $this->_set_field_filter($cond);
            $cond = self::_get_table_data($cond, $this->table_fields);
        }
        $output = array();

        $pk = $this->primary_key;
        $class_name = get_class($this);

        if (is_array($cond) && count($cond) > 0)
            $this->db->where($cond);
        if (NULL !== $limit)
            $this->db->limit ($limit);
        if (NULL !== $offset)
            $this->db->offset ($offset);
        if (is_string($this->fake_delete))
            $this->db->where ($this->fake_delete, 'FALSE');
        $query = $this->db->get($this->table_name);

        foreach ($query->result_array() AS $row)
        {
            $id = intval($row[$pk]);
            $obj = NULL;
            if ($this->use_cache)
                $obj = get_cache($this, $pk, $id);
            if (is_null($obj))
            {
                $obj = new $class_name($id);
                $obj->force_loaded();
                $obj->set_field($row);
                if ($this->use_cache)
                    set_cache($obj, $pk, $id);
            }
            array_push($output, $obj);
        }
        return $output;
    }

    /**
     * 建立物件
     *
     * 輸入資料並建立物件，動作最後會做update()以確保資料建立。
     * 如果有設定$unique_restriction，而輸入資料也符合$unique_restriction，則會先進行find()，以免重複建立資料。
     * @param array|string|mixed $data
     * 要建立的資料(array)，或是要建立的欄位(string，並有設定$value的情況)，或是已經設定$default_field的情況下的值(mixed)
     * @param mixed|null $value 值
     * @return Generic_object
     */
    public function create($data, $value = NULL)
    {
        $data = self::_set_default_field($this->default_field, $data, $value);
        $data = $this->_set_field_filter($data);

        if (self::_has_unique_restriction($this->unique_restriction)
            && self::_match_unique($data, $this->unique_restriction, $this->table_fields))
        {
            //符合單一約束的話，表示只要先經過搜尋再確認
            $obj = $this->find($data);
            if (NULL !== $obj)
            {
                return $obj;
            }
        }

        $data = $this->_pre_create($data);
        $cache_cond = $this->_get_cache_cond($data);

        if ($this->use_cache)
        {
            $obj = get_cache($this, $cache_cond);
            if (is_object($obj))
                return $obj;
        }

        $class_name = get_class($this);
        $obj = new $class_name();
//        foreach ($data AS $field => $value)
//        {
//            $obj->set_field($field, $value);
//        }

        //test_msg(get_class($this) . ' create', $data);

        $obj->set_field($data);
        $obj->update();

        //加入快取
        if ($this->use_cache)
            set_cache($obj, $cache_cond);
        return $obj;
    }

    // --------
    // Constraint Check 約束檢查
    // --------

    /**
     * 查詢現在物件的數量
     *
     * 用來作單一約束的檢查
     * @param Generic_object $go
     * @param string $where
     * @return int
     */
    static protected function _get_result_num(Generic_object $go, $where)
    {
    	$go->db->where($where)
    		->from($go->table_name);
        if (is_int($go->get_id()))
        {
            $go->db->where_not_in(self::_get_pk($go->primary_key, $go->table_name), $go->get_id());
        }
        if (is_string($go->fake_delete))
        {
            $go->db->where($go->fake_delete, 'FALSE');
        }
    	$result_num = $go->db->count_all_results();
    	return $result_num;
    }

    /**
     * 檢查單一約束
     * @param Generic_object $go
     * @return boolean
     */
    static protected function _check_unique(Generic_object $go)
    {
    	$pass = TRUE;

        $restriction = $go->unique_restriction;
        $where = array();
        $full_data = TRUE;
        foreach($restriction as $field)
        {
            $where[$field] = $go->get_field($field);
            if (is_null($where[$field]))
            {
                $full_data = FALSE;
                break;
            }
        }

        if (TRUE === $full_data && count($where) > 0)
        {
            $result_num = self::_get_result_num($go, $where);
            if ($result_num > 0)
            {
                $pass = FALSE;
            }
        }

    	return $pass;
    }

    /**
     * 資料本身是否符合單一約束的檢查條件
     *
     * 這個方法只檢查是否要檢查單一約束，而不會去資料庫確認
     * @param array $data
     * @param array $unique_restriction 單一約束限制
     * @param string $table_fields
     * @return boolean
     */
    static protected function _match_unique($data, $unique_restriction, $table_fields)
    {
        if (is_null($data))
            return FALSE;
        $data = self::_get_table_data($data, $table_fields);

        $unique = $unique_restriction;

        if (count($data) !== count($unique))
            return FALSE;

        foreach ($data AS $key => $value)
        {
            if (FALSE === in_array($key, $unique))
                return FALSE;
        }
        return TRUE;
    }

    /**
     * 是否有單一約束
     * @param array $unique_restriction 單一約束陣列
     * @return boolean
     */
    static protected function _has_unique_restriction($unique_restriction)
    {
        return (count($unique_restriction) > 0);
    }

    /**
     * 檢查非空值約束
     * @param array $database_fields 資料
     * @param array $not_null_field 非空值的欄位
     * @return boolean
     */
    static protected function _check_not_null($database_fields, $not_null_field)
    {
    	$pass = TRUE;

//    	$not_null_field = $this->not_null_field;

    	foreach ($not_null_field as $field)
    	{
    		if (FALSE === isset($database_fields[$field]))
    		{
    			$pass = FALSE;
    			break;
    		}
    	}
    	return $pass;
    }


    // --------
    // Filter Methods 資料過濾函式
    // --------

    /**
     * 過濾資料表欄位
     *
     * 以免不相干的資料輸入到資料庫導致錯誤
     * @param array $data 資料
     * @param array $table_fields 資料表欄位
     * @return array 過濾後的資料
     */
    static protected function _get_table_data($data, $table_fields)
    {
//        if ($data == NULL)
//            $data = $this->database_fields;

    	if (count($table_fields) == 0)
    		return $data;
        else if (FALSE === is_array($data))
        {
            return array();
        }
    	else
    	{
            $output = array();
            foreach($table_fields as $field)
            {
                if (isset($data[$field]))
                    $output[$field] = $data[$field];
            }
            return $output;
    	}
    }

    /**
     * 檢查欄位是否是資料表欄位
     * @param array $table_fields
     * @param string $field
     * @return boolean
     */
    static protected function _in_table_field($table_fields, $field)
    {
        if (count($table_fields) == 0)
            return TRUE;
        else
        {
            return in_array($field, $table_fields);
        }
    }

    /**
     * 設定資料為預設欄位
     *
     * 如果有設定預設欄位$default_field，則會將資料重新組合成為預設欄位的形式再回傳
     * @param string|null $default_field
     * @param array $cond
     * @param mixed|null $value
     * @return array
     */
    static protected function _set_default_field($default_field, $cond, $value = NULL)
    {
        if (is_string($default_field)
            && (is_string($cond) || is_int($cond) || is_float($cond))
                && is_null($value))
        {
            //if ($cond == 'from_index')
            //    test_msg('_set_default_field 1');
            $cond = array(
                $default_field => $cond
            );
        }
        else
        {
            //if ( $cond == 'from_index')
            //    test_msg('_set_default_field 2');

            $cond = convert_cond($cond, $value);
        }
        return $cond;
    }

    // --------
    // Private Helpers 內部輔助函數
    // --------

    /**
     * 取得主鍵
     * @param string|null $primary_key
     * @param string $table_name
     * @return string
     */
    static protected function _get_pk($primary_key, $table_name)
    {
        if (NULL != $primary_key)
            return $primary_key;
        if ($table_name != NULL)
            return $table_name.'_id';
        else
            return 'id';
    }

    /**
     * 取得快取條件
     *
     * 如果有設定快取條件$data，則調整過後變成合適的快取條件。
     * 如果沒有，則設定$primary_key跟$id作為快取條件。
     * @param array|null $data 快取條件
     * @return array 包含快取欄位名稱$key與值$value的條件
     */
    protected function _get_cache_cond($data = NULL)
    {
        if (is_null($data))
            $data = $this->get_id();

        if (is_string($data) || is_int($data))
        {
            return array(
                $this->primary_key => intval($data)
            );
        }

        if (isset($data[$this->primary_key]))
        {
            return array(
                $this->primary_key => $data[$this->primary_key]
            );
        }
        else if (count($data) > 1)
        {
            $keys = array_keys($data);
            return array(
                $data[$keys[0]] => $data[$keys[1]]
            );
        }
        else
            return $data;
    }

    // --------
    // Private Setter 內部資料設定器
    // --------

    /**
     * 設定主鍵
     * @param string $pk
     * @return Generic_object
     */
    protected  function set_primary_key($pk)
    {
        $this->primary_key = $pk;
        return $this;
    }

    /**
     * 設定資料表欄位
     * @param string|array $field
     * @return Generic_object
     */

    protected  function set_table_fields($field)
    {
    	if (is_string($field))
            array_push($this->table_fields, $field);
        else if (is_array($field))
            $this->table_fields = $field;
        else if (is_null($field))
            $this->table_fields = array();
    	return $this;
    }

    /**
     * 清除資料表欄位
     * @return Generic_object
     */
    protected  function reset_table_fields()
    {
    	$this->table_fields = array();
    	return $this;
    }

    /**
     * 設定單一約束
     * @param array $unique
     * @return Generic_object
     */
    protected function set_unique($unique)
    {
        if (is_string($unique))
        {
            if (FALSE === in_array($this->unique_restriction, $unique))
                array_push($this->unique_restriction, $unique);
        }
        else if (is_array($unique))
        {
            $this->unique_restriction = $unique;
        }
        else if (NULL === $unique)
        {
            $this->unique_restriction = array();
        }
    	return $this;
    }

    /**
     * 清除單一約束
     * @return Generic_object
     */
    protected function reset_unique()
    {
    	$this->unique_restriction = array();
    	return $this;
    }

    /**
     * 設定非空值欄位
     * @param array $field
     * @return Generic_object
     */
    protected function set_not_null($field)
    {
        if (is_string($field))
            array_push($this->not_null_field, $field);
        else if (is_array($field))
            $this->not_null_field = $field;
        else if (is_null($field))
            $this->not_null_field = array();
    	return $this;
    }

    /**
     * 清除非空值欄位
     * @return Generic_object
     */
    protected  function reset_not_null()
    {
    	$this->not_null_field = array();
    	return $this;
    }

    /**
     * 檢查外鍵。但是暫時還不會用到…
     * @param integer $id
     */
    static protected  function _fk_check($id, $db, $fk, $exception_msg)
    {
        if (is_null($id))
            return;

        //$fk = $this->foreign_keys;
        //$db = $this->db;
        foreach ($fk AS $table_name => $field)
        {
            $db->where($field, $id);
            $count = $db->count_all_results($table_name);
            if ($count > 0)
            {
                //handle_error($this->lang->line('generic_object.fk_check.exception'));
                handle_error($exception_msg);
            }
        }
    }

    // --------
    // Public Helpers 輔助函數
    // --------

    /**
     * 過濾取得物件的ID
     *
     * 省去檢查該物件到底是物件還是ID的輔助函數
     * @param integer|Generic_object $go_id
     * @return integer
     */
    public function filter_id($go_id)
    {
        if (is_class($go_id, $this))
        {
            $go_id = $go_id->get_id();
        }
        return $go_id;
    }

    /**
     * 過濾取得物件
     *
     * 省去檢查該物件到底是物件還是ID的輔助函數
     * @param int|Generic_object $go
     * @return Generic_object
     */
    public function filter_object($go)
    {
        //if (FALSE === is_object($go))
        if (FALSE === is_class($go, $this)
            && (is_int($go) OR is_string($go)))
        {
            $class_name = get_class($this);
            $go = new $class_name($go);
        }
        return $go;
    }

    /**
     * 魔術方法：字串化
     * @return string
     */
    public function  __toString() {
        return get_class($this).'::$id='.$this->get_id();
    }
}

/* End of file Generic_object.php */
/* Location: ./system/application/libraries/toolkit/Generic_object.php */