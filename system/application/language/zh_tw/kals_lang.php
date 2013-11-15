<?php

/*
 * 索引說明：
 * 種類1： $lang['CLASS_NAME.FUNCTION_NAME.LANG_TYPE']
 * 種類2： $lang['CLASS_NAME.TARGET_CLASS_NAME.LANG_TYPE']
 * 以底線來取代空格，不使用連接線「-」。
 */

$lang['generic_object.fk_check.exception'] = '無法刪除，因為有外鍵存在。';
$lang['generic_object.save.no_asso.exception'] = '無法建立，因為沒有設定關聯';
$lang['generic_object.get_field.exception'] = '嘗試取出 {0}物件 的 {1} 欄位，但 {0}物件 不存在 {1} 欄位';
$lang['actor.save.miss_domain.exception']			= '無法建立User，由於沒有設定關連的Domain';
$lang['user.create.failed_by_no_domain']			= '無法建立User，由於沒有設定關連的Domain';
$lang['user.delete.failed']			= '無法刪除User';
$lang['user.get_field.get_password_deny.exception'] = '禁止取用Password欄位資料';

$lang['webpage.create.failed_by_no_domain']			= '無法建立Webpage，由於沒有設定關連的Domain';
$lang['webpage.delete.failed']			= '無法刪除Webpage';
$lang['domain.delete.failed']			= '無法刪除Domain';

$lang['action.domain.administration'] = '管理Domain';
$lang['action.domain.administration.exception'] = '管理Domain錯誤';
$lang['action.webpage.administration'] = '管理Webpage';
$lang['action.webpage.administration.exception'] = '管理Webpage錯誤';
$lang['action.webpage.read'] = '讀取Webpage的Annotation';
$lang['action.webpage.read.exception'] = '讀取Webpage的Annotation錯誤';
$lang['action.webpage.recommend_show'] = '顯示Wepbage上的推薦標註';
$lang['action.webpage.recommend_show.exception'] = '顯示Wepbage上的推薦標註錯誤';
$lang['action.annotation.read'] = '讀取Annotation';
$lang['action.annotation.read.exception'] = '讀取Annotation錯誤';
$lang['action.annotation.administration.exception'] = '無法管理Annotation錯誤';

$lang['annotation_like_collection.deny_annotation_author.exception'] = '標註作者不能喜歡自己的標註';

$lang['kals_resource.type.1'] = '網域';
$lang['kals_resource.type.2'] = '網頁';
$lang['kals_resource.type.3'] = '標註';

$lang['notification.default'] = '{0} 在 {1} ({2})上有動作。';
$lang['notification.default.trigger_actor'] = '{0} 有動作。';
$lang['notification.default.trigger_resource'] = '您的 {0} ({1}) 有變更。';
$lang['notification.responded'] = '{0} 回應了您的{1} ({2})。';
$lang['notification.liked'] = '{0} 喜歡您的 {1} ({2})。';
$lang['notification.recommended'] = '有建議要給您的 {0} ({1})。';
$lang['notification.liked.create_notification.exception'] = '建立喜歡通知失敗';
$lang['notification.recommended.create_notification.exception'] = '建立推薦通知失敗';
$lang['notification.responeded.create_notification.exception'] = '建立回應通知失敗';

$lang['tip.comma'] = '、';
$lang['tip.general'] = '您的標註在某些方面來說不太好，您確定您要儲存這個標註嗎？';

$lang['tip.speech.text'] = '建議您選擇{0}等較具體的內容來標註，這可讓您對文章的印象更為深刻。';

$lang['tip.speech.Vi'] = '不及物動詞';
$lang['tip.speech.N'] = '名詞';
$lang['tip.speech.DET'] = '定詞';
$lang['tip.speech.Vt'] = '及物動詞';
$lang['tip.speech.ASP'] = '時態標記';
$lang['tip.speech.M'] = '量詞';
$lang['tip.speech.FW'] = '外文標記';
//$lang['tip.speech.ADV'] = '副詞';
$lang['tip.speech.A'] = '形容詞';
//$lang['tip.speech.C'] = '對等連接詞';
//$lang['tip.speech.POST'] = '連接詞';
//$lang['tip.speech.T'] = '感嘆詞';

$lang['tip.location.text.0'] = NULL;    //0 => head
$lang['tip.location.text.1'] = '段落開頭的內容可能是比較重要的部份，建議您選擇此處來標註。';    //1 => near head
$lang['tip.location.text.2'] = '段落開頭或最後的內容可能是比較重要的部份，建議您選擇此處來標註。';  //2 => near head & foot
$lang['tip.location.text.3'] = '段落最後的內容可能是比較重要的部份，建議您選擇此處來標註。';    //3 => near foot
$lang['tip.location.text.4'] = NULL;    //4 => foot
$lang['tip.location.text.5'] = NULL;    //5 => head-foot
$lang['tip.location.text.6'] = $lang['tip.location.text.2'];    //6 => body

$lang['tip.location.text.head_foot'] = '段落開頭或最後的內容可能是比較重要的部份，建議您選擇此處來標註。';
$lang['tip.location.text.head'] = '段落開頭的內容可能是比較重要的部份，建議您選擇此處來標註。';
$lang['tip.location.text.foot'] = '段落最後的內容可能是比較重要的部份，建議您選擇此處來標註。';


$lang['tip.length.text'] = '建議您標註範圍盡量不要超過{0}字，讓重點更為聚焦。';

/**
 * 意見回饋功能
 */
$lang['feedback.heading'] = "KALS意見回饋"; //KALS FEEDBACK REPORT 
$lang['feedback.issue'] = "回饋意見內容"; //ISSUE
$lang['feedback.additional_information'] = "其他資料"; //ADDTIONAL INFORMATION
$lang['feedback.report_timestamp'] = "回報時間"; //REPORT TIMESTAMP
$lang['feedback.kals_server_url'] = "KALS伺服器網址"; //KALS SERVER URL
$lang['feedback.referer_url'] = "問題網址"; //REFERER URL
$lang['feedback.domain_id'] = "網域編號(DOMIAN ID)"; //DOMIAN ID
$lang['feedback.webpage_id'] = "網頁編號(WEBPAGE ID)"; //WEBPAGE ID
$lang['feedback.user_id'] = "使用者編號(USER ID)"; //USER ID
$lang['feedback.user_name'] = "使用者名字"; //USER NAME
$lang['feedback.user_email'] = "使用者信箱"; //USER E-MAIL

/* End of file kals_actor_lang.php */
/* Location: ./system/language//calendar_lang.php */