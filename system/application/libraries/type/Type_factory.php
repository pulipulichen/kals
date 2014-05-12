<?php
/**
 * Type_factory
 *
 * 自訂標註類型
 *
 * 當用到基本類型之外的(importance, question...)
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/25 下午 08:05:32
 * @property CI_DB_active_record $db
 * @property CI_Base $CI
 * @property CI_Language $lang
 * @example
 * 資料表建立：<code>

-- Table: "type"

-- DROP TABLE "type";

CREATE TABLE "type"
(
  type_id serial NOT NULL,
  "name" text NOT NULL,
  basic boolean NOT NULL DEFAULT false,
  CONSTRAINT type_pk_type_id PRIMARY KEY (type_id),
  CONSTRAINT type_unique_name UNIQUE (name)
)
WITH (OIDS=FALSE);

-- 要插入預設值

INSERT INTO "type"(type_id, "name", "basic") VALUES (1, 'annotation.type.importance', true);
INSERT INTO "type"(type_id, "name", "basic") VALUES (2, 'annotation.type.question', true);
INSERT INTO "type"(type_id, "name", "basic") VALUES (3, 'annotation.type.confusion', true);
INSERT INTO "type"(type_id, "name", "basic") VALUES (4, 'annotation.type.summary', true);
INSERT INTO "type"(type_id, "name", "basic") VALUES (5, 'annotation.type.concept', true);
INSERT INTO "type"(type_id, "name", "basic") VALUES (6, 'annotation.type.example', true);
INSERT INTO "type"(type_id, "name", "basic") VALUES (7, 'annotation.type.custom', true);

 * </code>
 */
class Type_factory extends Generic_object {

    protected $table_name = 'type';
    protected $table_fields = array('type_id', 'name', 'basic');
    protected $primary_key = 'type_id';
    protected $not_null_field = array('name');
    protected $unique_restriction = array('name');

    private $throw_exception = FALSE;
    
    private $asso_name = 'annotation';
    private $asso_pk = 'annotation_type_id';

    public function set_name($name)
    {
        return $this->set_field('name', $name);
    }

    public function get_name()
    {
        return $this->get_field('name');
    }

    public function create_type($name)
    {
        return $this->create('name', $name);
    }

    /**
     * 設定這是否屬於基本的標註類型，
     * 包括重點、質疑、舉例，還有「自訂」。
     * 只有改變名稱的「自訂」才不是基本類型。
     * @version 20111104 Pudding Chen
     * @param boolean = false $is_basic
     * @return Type_factory
     */
    public function set_basic($is_basic = false)
    {
        return $this->set_field('is_basic', $is_basic);
    }

    /**
     * 得知這是否屬於基本的標註類型，
     * 包括重點、質疑、舉例，還有「自訂」。
     * 只有改變名稱的「自訂」才不是基本類型。
     * @version 20111104 Pudding Chen
     * @return boolean
     */
    public function is_basic()
    {
        return $this->get_field('is_basic', true);
    }

    /**
     * 取得type的ID
     * @version 20111105 Pudding Chen
     * @param number|string $type_name 要查詢的值。
     *  可以是數字(那應該就是type_id)，
     *  也可以是字串，那會查詢並轉換成type_id。
     */
    public function filter_id($type_name) {
        if (is_int($type_name))
            return $type_name;
        else if (is_string($type_name))
        {
            $type = $this->create_type($type_name);
            return $type->get_id();
        }
        else {
            return null;
        }
    }
    
    /**
     * 取得type的Object
     * @version 20140512 Pudding Chen
     * @param number|string $type_name 要查詢的值。
     *  可以是數字(那應該就是type_id)，
     *  也可以是字串，那會查詢並轉換成type_id。
     */
    public function filter_object($type_name) {
        if (is_int($type_name)) {
            return new Annotation_type($type_name);
        }
        else if (is_string($type_name)){
            $type = $this->create_type($type_name);
            return $type;
        }
        else {
            return null;
        }
    }


    /**
     * 取得type的name
     * @version 20111105 Pudding Chen
     * @param number|string $type_id 要查詢的id。
     *  可以是數字，那他會查詢之後再回傳name，找不到的話就是null，
     *  也可以是字串，那會建立(或查詢)之後回傳name。
     */
    public function filter_name($type_id) {
        if (is_int($type_id))
        {
            $type = $this->find('type_id', $type_id);
            if (is_null($type))
                return NULL;
            else
                return $type->get_name();
        }
        else if (is_string($type_id))
        {
            $type = $this->create_type($type_id);
            return $type->get_name();
        }
        else
            return null;
    }
}


/* End of file Policy.php */
/* Location: ./system/application/libraries/.../Policy.php */