<?php
/**
 * Collection
 *
 * 集合
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/8 下午 12:37:07
 */
class Collection extends KALS_object implements IteratorAggregate {

    /**
     * 集合成員
     * @var mixed
     */
    protected $members = array();

    /**
     * callback的函式名稱
     * @var String 函式名稱
     */
    protected $onload;

    /**
     * 是否已經利用callback初始化過
     * @var <type>
     */
    protected $is_loaded = TRUE;

    /**
     * 建構子
     * @param mixed $obj 可以藉由在初始化時輸入參數，讓他成為預設成員
     * @return Collection
     */
    function  __construct($obj = NULL) {
        parent::__construct();

        if (is_null($obj))
            return $this;
        if (is_array($obj))
            $this->members = $obj;
        else if (isset($obj))
            $this->add_item($obj);
        return $this;
    }

    /**
     * 將$obj加入合集成員中。您可以指定$key，以取代該$key的成員。
     * @param mixed $obj
     * @param string $key
     * @return Collection
     */
    public function add_item($obj, $key = NULL)
    {
        $this->_check_callback();

        if (is_null($key))
        {
            $this->members[] = $obj;
        }
        else
        {
            if (isset($this->members[$key]))
            {
                //throw new KeyInUseException("Key $key already in use!");
                handle_error("Key $key already in use!");
            }
            else
                $this->members[$key] = $obj;
        }
        return $this;
    }

    /**
     * 將另一個集合的成員加入此集合當中。
     * @param Collection $collection
     * @return Collection
     */
    public function add_collection(Collection $collection)
    {
        $this->_check_callback();
        foreach ($collection AS $item)
        {
            $this->add_item($item);
        }
        return $this;
    }

    /**
     * 移除指定$key的成員。
     * @param string $key
     * @return Collection
     */
    public function remove_item($key)
    {
        $this->_check_callback();
        if (isset($this->members[$key]))
            unset($this->members[$key]);
        return $this;
    }

    /**
     * 取得指定$key的成員。
     * @param String $key
     * @return mixed
     */
    public function get_item($key)
    {
        $this->_check_callback();
        if (isset($this->members[$key]))
            return $this->members[$key];
        else
            return NULL;
    }

    /**
     * 取得成員的陣列索引。
     * @return array
     */
    public function keys()
    {
        $this->_check_callback();
        return array_keys($this->members);
    }

    /**
     * 成員的長度。
     * @return int
     */
    public function length()
    {
        $this->_check_callback();
        return count($this->members);
    }

    /**
     * 查詢指定$key是否有成員存在
     * @param string $key
     * @return boolean
     */
    public function exists($key)
    {
        $this->_check_callback();
        return (isset($this->members[$key]));
    }

    /**
     * 設定callback的函式名稱，並檢查此函式能否運作。callback會在第一次取用此集合的成員時，先進行讀取成員資料的動作。
     * @param string $function_name
     * @param string $obj_or_clss
     * @return Collection
     */
    public function set_load_callback($function_name, $obj_or_clss = NULL)
    {
        $callback = NULL;
        if ($obj_or_clss)
        {
            $callback = array($obj_or_clss, $function_name);
        }
        else
        {
            $callback = $function_name;
        }

        if ( FALSE === is_callable($callback, FALSE, $callable_name) )
        {
            //throw new Exception("$callable_name is not callable as a parameter to onload");
            handle_error("$callable_name is not callable as a parameter to onload");
            return FALSE;
        }
        $this->onload = $callback;
        $this->is_loaded = FALSE;
        return $this;
    }

    /**
     * 內部呼叫callback使用。
     */
    protected function _check_callback()
    {
        if (isset($this->onload) && FALSE === $this->is_loaded)
        {
            $this->is_loaded = TRUE;
            $this->is_loaded = call_user_func($this->onload, $this);
            if (is_null($this->is_loaded))
                $this->is_loaded = TRUE;
        }
    }

    /**
     * 產生迭代器(iterator)，可以讓迭代器進入foreach迴圈中運作。這個方法是為了實作IteratorAggregate而使用。
     * 產生迭代器時輸入的來源集合使用了clone複製，以免跟原始的集合發生錯亂。
     * @return Collection_iterator
     */
    public function  getIterator() {
        $this->_check_callback();
        return new Collection_iterator(clone $this);
    }
}

/* End of file Collection.php */
/* Location: ./system/application/libraries/Collection.php */