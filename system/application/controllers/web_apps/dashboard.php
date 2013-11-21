<?php
include_once 'kals_model.php';
/**
 * Dashboard
 *
 * 輸出網頁標註資訊的位置
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2013, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2013/11/19 下午 03:51:22
 */

class dashboard extends KALS_model {

    
    public function init($data) {
        $data["annotation_count"] = rand(5, 100);
        $data["user_count"] = rand(1, 6);
        $data["last_annotation_id"] = 14848;
        $data["last_annotation_timestamp"] = time();
        
        $last_annotation = new Annotation(14848);
        $annotation_json = $last_annotation->export_data();
        $data["last_annotation"] = array($annotation_json, $annotation_json);
        
        $data["activity"] = "Good";
        
        return $data;
    }
}

/* End of file dashboard.php */
/* Location: ./system/application/controllers/web_apps/rest/dashboard.php */