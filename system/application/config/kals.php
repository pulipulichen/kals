<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * kals
 *
 * kals設定檔
 *
 * @package		KALS
 * @category		Config
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/22 下午 10:41:19
 */

// ---------------------
// KALS URL
// ---------------------

/**
 * 會被視為是localhost的網址名稱
 * 需包括開頭的「http://」或「https://」與結尾的「/」
 * 
 * 例如：「http://pc-pudding-2013.dlll.nccu.edu.tw/」
 * 在KALS之中，會被視為是「http://localhost/」
 */
$config["web_apps.localhost_domains"] = array(
    "http://pc-pudding-2013.dlll.nccu.edu.tw/",
    "http://140.119.61.127/",
    //"http://exp-kals-moodle-2014.dlll.nccu.edu.tw/"
);

// ---------------------
// KALS Cache &  Package
// ---------------------

/**
 * 禁止使用cache的domain
 * 
 * 除了本機測試之外，外部測試全部都啟用cache
 */
$config['output.cache.disable_domains'] = array(
    "http://localhost/",
    "http://127.0.0.1/"
);

$config['output.cache.enable'] = true; //是否使用快取功能，預設是true;
$config['output.cache.expiration'] = 50;  //快取的單位是「分鐘」
$config['output.cache.navigation_data.expiration'] = 0.25;  //快取的單位是「分鐘」

/**
 * 禁止使用package壓縮程式碼
 * 
 * 規則上同output.cache_disable_domains
 */
$config['output.package.disable_domains'] = $config['output.cache.disable_domains'];
$config['output.package.enable'] = true; //是否啟用壓縮功能，預設是true;

// --------
// KALS User Password Key
// --------
$config['crypt_salt'] = 'kals2010';

$config['CACHEABLE_TYPES'] = array('Domain', 'Webpage', 'Annotation', 'User', 'Group', 'Annotation_scope', 'Scope_anchor_text', 'Annotation_like'
        , 'Annotation_feature_collection', 'Annotation_like_collection', 'Annotation_respond_collection', 'Annotation_topic_respond_collection'
        , 'Annotation_scope_collection', 'Annotation_score_collection'
        , 'Notification_collection', 'Policy', 'Notification', 'Annotation_collection', 'User_friend_collection'
        , 'Search_annotation_collection', 'Search_annotation_id_collection'
        , 'Language_variable_collection', 'Language_variable_consensus', 'Language_variable_like'
        , 'Annotation_recommend'
        );
$config['CACHEABLE_TYPES_CLOSE'] = array();

$config["TIMEZONE"] = "Asia/Taipei";
date_default_timezone_set($config["TIMEZONE"]);

$config['webpage_cache.expiration'] = 60 * 24 * 7; //快取的單位是「分鐘」，預設是1週

/**
 * 意見回饋設定
 */

// 當使用者未登入時，採用以下設定寄信
$config["feedback.default_sender_email"] = "anonymous@localhost"; //預設寄出的EMAIL。預設是anonymous@localhost
$config["feedback.default_sender_name"] = "Anonymous Feedback"; // 預設寄出EMAIL的名字

$config["feedback.receiver_email"] = "pudding@nccu.edu.tw"; //接收EMAIL。預設是 kals@localhost

// ---------
// 斷詞器設定
// ---------

$config['segmentor.default'] = 'segmentor.disable';    //預設斷詞器
//$config['segmentor.default'] = 'segmentor.ckip';    //預設斷詞器
//$config['segmentor.default'] = 'segmentor.scws';    //預設斷詞器
$config['segmentor.default_for_search'] = 'segmentor.disable';    //預設搜尋時使用的斷詞器
//$config['segmentor.default_for_search'] = 'segmentor.scws';    //預設搜尋時使用的斷詞器
//$config['segmentor.default_for_search'] = 'segmentor.ckip';    //預設搜尋時使用的斷詞器

//$config['ckip.username'] = 'kals';
//$config['ckip.password'] = 'password';
//$config['ckip.server_ip'] = 'exp-ckip.dlll.nccu.edu.tw';
//$config['ckip.server_port'] = '58151';

//$config['yahoo.app_id'] = 'K7WZ.qrV34HHPDMPT4WGq.MSj6Z85hSDdPQYASkuxT9E1mjzC25kcZ1UImJdOHf06VAYXj4-'; //for kals wiki
//$config['yahoo.app_id'] = 'zno81EPV34FUKrAEs_Hn1pcuB1IQ4TBGLBXwLLRWwB2nyaBDnIZT94EESP2s39Xn2zKnfBo-'; //for 140.119.61.174

// --------
// 模糊參數
// ※ 參數都是取到小數第三位喔！
// --------

/**
 * 是否開啟推薦功能
 */
$config['reccommend_enable'] = FALSE;

$config['fuzzy_inference_engine'] = 'closure_addition'; // closure_addition | zadeh

/**
 * 需要推薦的門檻
 * 
 * 這是用六項因素各去計算的糢糊樣本平均數，再經過糢糊綜合評判，重心法解糢糊後取得的值
 * 
 * 意義為：以各種因素條件的平均情況作為門檻，低於這個值表示需要推薦，高於這個值表示不需推薦
 */
$config['recommended_threshold'] = 2.243;

/**
 * 可以拿來推薦的門檻
 *
 * 這是用標註共識人數、標註喜愛人數最低值
 * 標註範圍字數、標註位置、標註詞性、標註類型最高值去綜合評判之後，再以重心法解模糊化求得的答案。
 *
 * 意義為：即使標註尚未與人達成共識、也沒人喜歡的情況下，但是其他四項因素皆已經達到最高水準的標準，即可拿來推薦。
 */
$config['recommend_by_threshold'] = 1.947;

/**
 * 六項因素的權重
 */
$config['langvar.consensus.weight'] = 0.253;    //實際上四捨五入是0.252，但因為要加總為1，所以將最後配分0.001給它
$config['langvar.like.weight'] = 0.2;
$config['langvar.type.weight'] = 0.095;
$config['langvar.speech.weight'] = 0.171;
$config['langvar.length.weight'] = 0.086;
$config['langvar.location.weight'] = 0.195;

$config['fuzzy.default_clustering_path'] = 'fuzzy/Clustering_k_means';  //之後應該採用糢糊分類法

/**
 * 標註共識人數
 * 編號1
 */
$config['langvar.consensus.threshold'] = 30;    //本實驗暫不使用更新功能
$config['langvar.consensus.threshold_factor'] = 2;    //本實驗暫不使用更新功能
$config['langvar.consensus.membership_function_variables'] = array(
    0 => array(1,   0,  0), //1
    2 => array(1,   0,  0), //1
    3 => array(0.8, 0.2,    0), //1.2
    4 => array(0.8, 0.2,    0), //1.2
    5 => array(0.8, 0.1,    0.1),   //
    6 => array(0,   0.9,    0.1),   //
    7 => array(0,   0.8,    0.2),   //
    10 => array(0,   0.8,    0.2),  //
    11 => array(0,  0,      1), //
    'default' => array(0,0,1)   //最大上限只會到21喔
);

/**
 * 標註喜愛人數
 * 編號2
 */
$config['langvar.like.threshold'] = 30;    //本實驗暫不使用更新功能
$config['langvar.like.threshold_factor'] = 2;    //本實驗暫不使用更新功能
$config['langvar.like.membership_function_variables'] = array(
    0 => array(1,   0,  0),
    2 => array(1,   0,  0),
    3 => array(0.8, 0.2,  0),
    4 => array(0.8, 0.2,    0),
    5 => array(0.1, 0.9,    0),
    6 => array(0.1, 0.7,    0.2),
    7 => array(0,   0.8,    0.2),
    8 => array(0,   0.8,    0.2),
    9 => array(0,   0.1,    0.9),
    10 => array(0,  0.1,   0.9),
    11 => array(0,  0,     1),
    'default' => array(0,0,1)   //最大上限只會到21喔
);

/**
 * 標註類別
 * 編號3
 */
$config['langvar.type.membership_function_variables'] = array(
    1 => array(0.07,0.16,0.77),  //重要 2.7
    2 => array(0.09,0.33,0.58),  //質疑 2.49
    3 => array(0.1, 0.34,0.56),  //困惑 2.46
    4 => array(0.05,0.23,0.72),  //摘要 2.67
    5 => array(0,1,0),  //概念  //本次不使用
    6 => array(0.2 ,0.26,0.54),  //舉例 2.34
    7 => array(1,0,0),  //自訂  //本次不使用
    'default' => array(1,0,0)
);

/**
 * 標註詞性
 * 編號:4
 *
 * 糢糊樣本平均數為1.685，也就是說，1.685以上的詞性是適合拿來作為建議的。也就是N, Vt, M, FW, Vi
 */

//切記，要按照重要程度遞減排序！
//參考來源：http://ckipsvr.iis.sinica.edu.tw/
$config['langvar.speech.membership_function_variables'] = array(
    'N' => array(0.05,0.21,0.74),     //2.69 名詞：普通名詞; 專有名稱; 地方詞; 位置詞; 時間詞; 代名詞
    'Vt' => array(0.22,0.29,0.49),    //2.27 及物動詞：動作使動動詞; 動作及物動詞; 動作接地方賓語動詞; 雙賓動詞; 動作句賓動詞; 動作謂賓動詞; 分類動詞; 狀態使動動詞; 狀態及物動詞; 狀態句賓動詞; 狀態謂賓動詞; 有
    'M' => array(0.3,0.24,0.46),      //2.16 量詞
    'FW' => array(0.43,0.15,0.42),    //1.99 外文標記
    'Vi' => array(0.4,0.29,0.31),     //1.91 不及物動詞：動作不及物動詞; 動作類及物動詞; 狀態不及物動詞; 狀態類及物動詞
    'A' => array(0.65,0.17,0.18),     //1.53 非謂形容詞
    'ADV' => array(0.67,0.17,0.16),   //1.49 副詞; 數量副詞; 動詞前程度副詞; 動詞後程度副詞; 句副詞
    'DET' => array(0.63,0.26,0.11),   //1.48 定詞：指代定詞; 數量定詞; 特指定詞; 數詞定詞
    'ASP' => array(0.69,0.19,0.12),   //1.43 時態標記
    'POST' => array(0.78,0.16,0.06),  //1.28 連接詞，如：等等; 連接詞，如：的話; 後置數量定詞; 後置詞
    'C' => array(0.85,0.11,0.04),     //1.19 對等連接詞，如：和、跟; 關聯連接詞;
    'T' => array(0.86,0.11,0.03),     //1.17 感嘆詞; 語助詞
    'default' => array(0.79,0.1,0.11) //1.32 無法辨識，但一定是排在最後一種情況下。
    //1	剖析失敗
);
$config['langvar.speech.tip.recommend_by_threshold'] = 1.685;

$config['langvar.speech.tip.threshold'] = 3;    //要低於這個數字才給予建議

/**
 * 標註字數
 * 編號:5
 *
 * 搭配段落平均字數，用糢糊頻率統計分析法做出來的
 */
$config['langvar.length.membership_function_variables'] = array(
    1 => array(0, 0, 1),    //100
    21 => array(0, 0, 1),   //100
    22 => array(0, 0.4, 0.6),   //80
    28 => array(0, 0.4, 0.6),   //80
    29 => array(0, 0.7, 0.3),   //65
    35 => array(0, 0.7, 0.3),   //65
    36 => array(0, 1, 0),   //50
    43 => array(0, 1, 0),   //50
    44 => array(0.4, 0.6, 0),   //30
    57 => array(0.4, 0.6, 0),   //30
    58 => array(0.7, 0.3, 0),   //15
    71 => array(0.7, 0.3, 0),   //15
    72 => array(1, 0, 0),   //0
    'default' => array(1, 0, 0) //最大判斷到平均段落字數144個字…但實際上可以更高啦，只是就都是低了
);
$config['langvar.length.tip.threshold'] = 3;    //要低於這個數字才給予建議

/**
 * 標註位置
 * 編號:6
 */

//注意！重要性要由高到低往下排列！
$config['langvar.location.membership_function_variables'] = array(
    4 => array(0.07, 0.23, 0.7),    //結尾 2.63
    0 => array(0.13, 0.2, 0.67),    //開頭,2.54
    1 => array(0.17, 0.19, 0.64),    //接近開頭 2.47
    3 => array(0.14, 0.32, 0.54),    //接近結尾 2.4
    5 => array(0.18, 0.37, 0.45),    //開頭結尾,2.27 只有一句而已
    2 => array(0.32, 0.26, 0.42),    //接近開頭結尾 2.1
    6 => array(0.48, 0.29, 0.23),    //其他 1.75
    'default' => array(0.48, 0.29, 0.23),    //其他 1
);

$config['langvar.location.tip.threshold'] = 3;    //要低於這個數字才給予建議


/* End of file kals.php */
/* Location: ./system/application/config/kals.php */
