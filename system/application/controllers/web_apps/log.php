<?php
include_once 'web_apps_controller.php';
/**
 * log
 *
 * 動作會儲存一個特別的資料：action
 * action是一個ID，各action跟對應動作表示如下
 * 
 * 
1=檢查登入成功	//記得要取得瀏覽器資料
2=檢查登入失敗
3=輸入登入成功
4=輸入登入失敗
5=內嵌登入成功
6=內嵌登入失敗
7=登出
8=註冊成功
9=註冊失敗
10=變更帳戶
11=變更密碼
12=瀏覽標註: 範圍
13=新增標註沒有建議:type;note
14=新增標註具有建議:type;note;recommend_id
15=修改標註:type:note
16=瀏覽討論
17=未登入者瀏覽
18=未登入者瀏覽討論
19=刪除標註:annotation_id
20=新增回應標註:type;topic_id;respond_id_list;note
21=修改回應標註:type;topic_id;respond_id_list;note
22=加入喜愛清單:被喜愛的annotation_id
23=移除喜愛清單:被移除的annotation_id
24=接受建議，沒有推薦:recommend_id
25=接受建議，有推薦:recommend_id
26=拒絕建議:recommend_id
27=發生錯誤:錯誤內容
28=查看說明
29=小地圖點選章節標題，note={index:1, title:"標題內文"}
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/10/23 下午 03:54:59
 */

class Log extends Web_apps_controller {

    protected $controller_enable_cache = FALSE;
    protected $login_require = FALSE;

    var $user = NULL;
    var $url = NULL;

    function __construct() {
        parent::__construct();

        $this->load->library('kals_actor/User');
        $this->user = get_context_user();
        $this->url = get_referer_url(TRUE);
    }

    public function create ($json, $callback) {

        //$this->output->enable_profiler(TRUE);
        
        $data = json_to_object($json);
        
        //取得參考網址資料跟位於session的user
        //$url = $this->url;
        $user = $this->user;

        //取得來自$json的範圍資料
        
        $action = $data->action;
        $note = $data->note;
        
        //$t = "\u6578\u4f4d\u5716\u66f8\u9928\u6982\u8aaa";
        //test_msg(kals_json_encode($note));

        kals_log($this->db, $action, $note);

        context_complete();
        
        set_ignore_authorize(false);

        $data = true;
        $this->_display_jsonp($data, $callback);
    }
    
    /**
     * 解碼
     * @param type $note
     */
    private function _decode_note($note) {
        return $note;
    }
    
    
}

/* End of file log.php */
/* Location: ./system/application/controllers/log.php */