<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * kals_log
 *
 * kals 關於記錄的儲存資訊
 *
 * @package		KALS
 * @category		Config
 * @author		Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2014, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2014/12/10 下午 10:41:19
 */

// ---------------------
// KALS URL
// ---------------------
$config["log.action_key_mapper"] = array(
    1 => "login.check.success",     //檢查登入成功	//記得要取得瀏覽器資料
    2 => "login.check.failed", //檢查登入失敗
    3 => "login.manual.success", //輸入登入成功
    4 => "login.manual.failed", //輸入登入失敗
    5 => "login.embed.success", //內嵌登入成功
    6 => "login.embed.failed", //內嵌登入失敗
    7 => "logout", //登出
    8 => "register.success", //註冊成功
    9 => "register.fail", //註冊失敗
    10 => "user.edit_info", //變更帳戶
    11 => "user.edit_password", //變更密碼
    12 => "select.scope", //瀏覽標註: 範圍
    13 => "annotation.add.no_recommand", //新增標註沒有建議:type;note
    14 => "annotation.add.has_recommand", //=新增標註具有建議:type;note;recommend_id
    15 => "annotation.edit", //修改標註:type:note
    16 => "view_thread.logined", //=瀏覽討論
    17 => "select.anonymous", //未登入者瀏覽
    18 => 'view_thread.anonymous', //未登入者瀏覽討論
    19 => 'annotation.delete', //刪除標註:annotation_id
    20 => 'annotation_response.add', //新增回應標註:type;topic_id;respond_id_list;note
    21 => 'annotation_response.edit', //修改回應標註:type;topic_id;respond_id_list;note
    22 => 'annotation_like.add', //加入喜愛清單:被喜愛的annotation_id
    23 => 'annotation_like.delete', //移除喜愛清單:被移除的annotation_id
    24 => 'annotation_recommend.accept.no_recommend', // 接受建議，沒有推薦:recommend_id
    25 => 'annotation_recommend.accept.recommond_existed', //接受建議，有推薦:recommend_id
    26 => 'annotation_recommend.deny.recommond_existed', //拒絕建議:recommend_id
    27 => 'exception', //發生錯誤:錯誤內容
    28 => 'toolbar.help', //查看說明
    29 => 'Window_map.select_heading', //小地圖點選章節標題，note={index:1, title:"標題內文"}
    30 => 'search.note', //搜尋 標註筆記
    31 => 'search.author', //搜尋 作者
    32 => 'search.annotation_type', //搜尋 標註類型
    33 => 'search.anchor_text', //搜尋 文章
    34 => 'search_recent', //瀏覽最新標註
    35 => 'select.tooltip', //tooltip放在文章上面的顯示標註
    36 => 'Dashboard.open', //查詢Dashboard
    37 => 'kals_framework.KALS_model.action', //KALS_model使用
    38 => 'annotation_list.click_link', //點選selectable text的超連結，note={url:"http://www.google.com.tw", target="_blank"}
    39 => 'mobile.login', //從mobile裝置登入(有登入)
    40 => 'mobile.view_topic_list', //使用mobile裝置瀏覽文章的topic_list(有登入)
    41 => 'mobile.view_thread', //使用mobile裝置瀏覽討論標註(有登入)
    42 => 'mobile.logout', //從mobile_apps登出
    43 => 'Frag_reading.save', //零碎時間閱讀
);