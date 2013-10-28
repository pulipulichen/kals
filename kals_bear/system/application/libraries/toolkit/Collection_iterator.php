<?php
/**
 * Collection_iterator
 *
 * 集合的迭代器(Iterator)
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/8 下午 02:21:36
 */
class Collection_iterator implements Iterator {

    /**
     * 迭代器使用資料的來源合集。注意此合集必須要用clone來複製，否則容易發生資料錯亂的問題。
     * @var <type>
     */
    private $collection;

    /**
     * 迭代器目前的索引
     * @var int
     */
    private $current_index = 0;

    /**
     * 來源合集的成員陣列索引
     * @var array
     */
    private $keys;

    /**
     * 建構子。建構時需要輸入來源合集。但由於CodeIgniter在載入時會先經過一次實體化程序，所以不強制在建構子時輸入來源集合。
     * @param Collection $obj_coll
     * @return Collection_iterator
     */
    function  __construct(Collection $obj_coll = NULL) {
        if (is_null($obj_coll))
            return;

        $this->collection = $obj_coll;
        $this->keys = $this->collection->keys();
    }

    /**
     * 指標重置。
     */
    function rewind()
    {
        $this->current_index = 0;
        return $this;
    }

    /**
     * 是否還有更多成員。
     * @return boolean
     */
    function hasMore()
    {
        return ($this->current_index < $this->collection->length());
    }

    /**
     * 取得目前的索引名稱。
     * @return string
     */
    function key()
    {
        return $this->keys[$this->current_index];
    }

    /**
     * 取得目前的成員。
     * @return mixed
     */
    function current()
    {
        $key = $this->key();
        return $this->collection->get_item($key);
    }

    /**
     * 將指標移至下一個。
     */
    function next()
    {
        $this->current_index++;
        return $this;
    }

    /**
     * 來源集合是否有目前的索引名稱的成員。
     * @return boolean
     */
    function valid()
    {
        if (isset($this->keys[$this->current_index]))
            return $this->collection->exists($this->key());
        else
            return FALSE;
    }
}

/* End of file Collection_iterator.php */
/* Location: ./system/application/libraries/Collection_iterator.php */