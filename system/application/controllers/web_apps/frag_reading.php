<?php
include_once 'kals_model.php';
/**
 * frag_reading
 *
 * 以word id記錄閱讀進度
 *  
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2013, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2013/11/19 下午 03:51:22
 */
class frag_reading extends KALS_model {

     
    /**
     * Action範例
     * 
     * @param Array $data 由KALS_controller傳入的資料，組成是關連式的陣列
     * 
     * [Controller的JSON格式]
     * _data = {
     *  "field": "value"
     * };
     * 
     * //取用範例
     * _data["field];   //回傳value
     * 
     * [Model的Array格式]
     * $data = array(
     *  "field" => "value"
     * );
     * 
     * $data["field"];  //回傳value
     * 
     * @return Array 要回傳給KALS_controller的資料
     * 一樣是以關聯式陣列組成
     * 
     */
    public function open($data) {
        $data = array();
        
        $word_id = 29;
        $data['word_id'] = $word_id;
        $test_msg = 'test';
        $data['test_msg'] = $test_msg;
        return $data;
    }
}

/* End of file frag_reading.php */
/* Location: ./system/application/controllers/web_apps/rest/dashboard.php */