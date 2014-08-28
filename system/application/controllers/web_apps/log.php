<?php
include_once 'web_apps_controller.php';
/**
 * log
 *
 * 動作會儲存一個特別的資料：action
 * action是一個ID，各action跟對應動作表示如下
 * 
 * 
1=login.check.success=檢查登入成功	//記得要取得瀏覽器資料
2=login.check.failed=檢查登入失敗
3=login.manual.success=輸入登入成功
4=login.manual.failed=輸入登入失敗
5=login.embed.failed=內嵌登入成功
6=login.embed.failed=內嵌登入失敗
7=logout=登出
8=register.success=註冊成功
9=register.fail=註冊失敗
10=user.edit_info=變更帳戶
11=user.edit_password=變更密碼
12=select.scope=瀏覽標註: 範圍
13=annotation.add.no_recommand=新增標註沒有建議:type;note
14=annotation.add.has_recommand=新增標註具有建議:type;note;recommend_id
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
30=搜尋 標註筆記
31=搜尋 作者
32=搜尋 標註類型
33=搜尋 文章
34=瀏覽最新標註
35=tooltip放在文章上面的顯示標註
36=查詢Dashboard
37=KALS_model使用
38=點選selectable text的超連結，note={url:"http://www.google.com.tw", target="_blank"}
39=從mobile裝置登入(有登入)
40=使用mobile裝置瀏覽文章的topic_list(有登入)
41=使用mobile裝置瀏覽討論標註(有登入)
42=從mobile_apps登出
(以後依然要記錄log的項目，但不需要依照編號，例如「login.check.success=檢查登入成功」)
 * 
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

    /**
     * 建立記錄
     * 
     * @author Pulipuli Chen <pulipuli.chen@gmail.com>
     * 20131225 從get改成用post傳遞
     * @param type $callback
     */
    public function create($json = NULL) {
        
        $index = 'create_post';
        if ($this->_is_callback($json) == false)
        {
            //從POST中取得JSON的資料
            $json = $this->_get_post_json();

            $data = $this->_create_log($json);

            //然後把data存入session中
            $this->_set_post_session($index, $data);
            $this->_display_post_complete();
        }
        else
        {
            $callback = $json;
            $data = $this->_get_post_session($index);

            $this->_display_jsonp($data, $callback);
        }
        context_complete();
    }
    
    /**
     * 實際建立log的方法
     * @param String $json
     * @return type
     */
    private function _create_log($json) {
        if ($json === FALSE) {
            return FALSE;
        }
        
        //$this->output->enable_profiler(TRUE);
        //print_r($_POST);
        
        /*
        if (!isset($_POST["json"])) {
            $data = false;
            //$this->_display_jsonp($data, $callback);
            echo "aaaaaaaaaaaaaaaaaaaaa";
            return;
        }
        
        $json = $_POST["json"];
         */
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
        //$this->_display_jsonp($data, $callback);
        return $data;
    }
    
    /**
     * 解碼
     * @param type $note
     */
    private function _decode_note($note) {
        return $note;
    }
    
    /**
     * 故意顯示錯誤
     * @param type $json
     * @param type $callback
     */
    /*
    public function error($json, $callback) {
        $data = true;
        test_msg("錯誤訊息");
        //$this->_display_jsonp($data, $callback);
    }
     */
}

/* End of file log.php */
/* Location: ./system/application/controllers/log.php */