<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * kals
 *
 * kals設定檔
 * 2010.11之前測試用的參數
 *
 * @package		KALS
 * @category		Config
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/22 下午 10:41:19
 */


// --------
// KALS User Password Key
// --------
$config['crypt_salt'] = 'kals2010';

$config['output.cache.enable'] = false;
$config['output.cache.expiration'] = 5;  //快取的單位是「分鐘」

$config['CACHEABLE_TYPES'] = array('Domain', 'Webpage', 'Annotation', 'User', 'Group', 'Annotation_scope', 'Scope_anchor_text', 'Annotation_like'
        , 'Annotation_feature_collection', 'Annotation_like_collection', 'Annotation_respond_collection', 'Annotation_topic_respond_collection'
        , 'Annotation_scope_collection', 'Annotation_score_collection'
        , 'Notification_collection', 'Policy', 'Notification', 'Annotation_collection', 'User_friend_collection'
        , 'Search_annotation_collection', 'Search_annotation_id_collection'
        , 'Language_variable_collection', 'Language_variable_consensus', 'Language_variable_like'
        , 'Annotation_recommend'
        );
$config['CACHEABLE_TYPES_CLOSE'] = array();

// ---------
// 斷詞器設定
// ---------

$config['segmentor.default'] = 'segmentor.ckip';    //預設斷詞器
//$config['segmentor.default'] = 'segmentor.scws';    //預設斷詞器
//$config['segmentor.default_for_search'] = 'segmentor.scws';    //預設搜尋時使用的斷詞器
$config['segmentor.default_for_search'] = 'segmentor.ckip';    //預設搜尋時使用的斷詞器
$config['ckip.username'] = 'pulipuli36';
$config['ckip.password'] = '740324';
$config['ckip.server_ip'] = '140.109.19.104';
$config['ckip.server_port'] = '1501';

// --------
// 模糊參數
// --------

$config['fuzzy_inference_engine'] = 'closure_addition'; // closure_addition | zadeh
$config['recommended_threshold'] = 2;   //需要推薦的門檻
$config['recommend_by_threshold'] = 2;  //標註被拿去推薦用的門檻

$config['langvar.consensus.weight'] = 0.24;
$config['langvar.like.weight'] = 0.24;
$config['langvar.type.weight'] = 0.09;
$config['langvar.speech.weight'] = 0.15;
$config['langvar.length.weight'] = 0.17;
$config['langvar.location.weight'] = 0.11;

$config['fuzzy.default_clustering_path'] = 'fuzzy/Clustering_k_means';

$config['langvar.consensus.threshold'] = 50;
$config['langvar.consensus.threshold_factor'] = 2;
$config['langvar.consensus.membership_function_variables'] = array(
    0 => array(1,   0,  0),
    1 => array(1,   0,  0),
    3 => array(0.8, 0.2,    0),
    4 => array(0.4, 0.6,    0),
    5 => array(0.2, 0.8,    0),
    7 => array(0,   0.8,    0.2),
    9 => array(0,   0.6,    0.4),
    10 => array(0,  0.2,    0.8),
    'default' => array(0,0,1)
);

$config['langvar.like.threshold'] = 20;
$config['langvar.like.threshold_factor'] = 2;
$config['langvar.like.membership_function_variables'] = array(
    0 => array(1,   0,  0),
    2 => array(0,   0,  1),
    3 => array(0.8,  0.2,  0),
    5 => array(0.7, 0.3,    0),
    8 => array(0.4, 0.6,    0),
    10 => array(0.2, 0.8,    0),
    11 => array(0,   0.8,    0.2),
    13 => array(0,   0.5,    0.5),
    15 => array(0,   0.4,    0.6),
    18 => array(0,  0.2,    0.8),
    'default' => array(0,0,1)
);

$config['langvar.type.membership_function_variables'] = array(
    1 => array(0,0,1),  //重要
    2 => array(0,0,1),  //質疑
    3 => array(1,0,0),  //困惑
    4 => array(1,0,0),  //摘要
    5 => array(0,1,0),  //概念
    6 => array(0,1,0),  //舉例
    7 => array(1,0,0),  //自訂
    'default' => array(1,0,0)
);

//切記，要按照重要程度遞減排序！
//參考來源：http://ckipsvr.iis.sinica.edu.tw/
$config['langvar.speech.membership_function_variables'] = array(
    'Vi' => array(0,0,1),    //動作不及物動詞; 動作類及物動詞; 狀態不及物動詞; 狀態類及物動詞
    'N' => array(0,0,1),    //普通名詞; 專有名稱; 地方詞; 位置詞; 時間詞; 代名詞
    'Vt' => array(0,0.2,0.8),    //動作使動動詞; 動作及物動詞; 動作接地方賓語動詞; 雙賓動詞; 動作句賓動詞; 動作謂賓動詞; 分類動詞; 狀態使動動詞; 狀態及物動詞; 狀態句賓動詞; 狀態謂賓動詞; 有
    'DET' => array(0,0.2,0.8),    //指代定詞; 數量定詞; 特指定詞; 數詞定詞
    'ASP' => array(0,0.8,0.2),    //時態標記
    'M' => array(0,1,0),    //量詞
    'FW' => array(0,0.5,0.5),    //外文標記
    'ADV' => array(0.8,0.2,0),    //副詞; 數量副詞; 動詞前程度副詞; 動詞後程度副詞; 句副詞
    'A' => array(1,0,0),    //非謂形容詞
    'C' => array(1,0,0),    //對等連接詞，如：和、跟; 關聯連接詞;
    'POST' => array(1,0,0),    //連接詞，如：等等; 連接詞，如：的話; 後置數量定詞; 後置詞
    'T' => array(1,0,0),    //感嘆詞; 語助詞
    //'NAV' => array(0,0,0),    //
    'default' => array(1,0,0)
);
//$config['langvar.speech.membership_function_variables'] = array(
//    'Nb' => array(0,0,1),    //專有名稱
//    'Nc' => array(0,0,1),    //地方詞
//    'Ncd' => array(0,0,1),    //位置詞
//    'Nes' => array(0,0,1),    //特指定詞
//    'VA' => array(0,0,1),    //動作不及物動詞
//    'VAC' => array(0,0,1),    //動作使動動詞
//    'VB' => array(0,0,1),    //動作類及物動詞
//    'VC' => array(0,0,1),    //動作及物動詞
//    'VCL' => array(0,0,1),    //動作接地方賓語動詞
//    'VD' => array(0,0,1),    //雙賓動詞
//    'VE' => array(0,0,1),    //動作句賓動詞
//    'VF' => array(0,0,1),    //動作謂賓動詞
//    'VG' => array(0,0.2,0.8),    //分類動詞
//    'Na' => array(0,0.5,0.5),    //普通名詞
//    'Nep' => array(0,0.5,0.5),    //指代定詞
//    'Ng' => array(0,0.8,0.2),    //後置詞
//    'Nh' => array(0,1,0),    //代名詞
//    'Neqa' => array(0,1,0),    //數量定詞
//    'Neqb' => array(0,1,0),    //後置數量定詞
//    'Nf' => array(0,1,0),    //量詞
//    'A' => array(0,1,0),    //非謂形容詞
//    'Nd' => array(0,1,0),    //時間詞
//    'Neu' => array(0,1,0),    //數詞定詞
//    'Dfa' => array(0,1,0),    //動詞前程度副詞
//    'Dfb' => array(0,1,0),    //動詞後程度副詞
//    'Di' => array(0,1,0),    //時態標記
//    'FW' => array(0,1,0),    //外文標記
//    'VH' => array(0.2,0.8,0),    //狀態不及物動詞
//    'VHC' => array(0.2,0.8,0),    //狀態使動動詞
//    'Dk' => array(0.5,0.5,0),    //句副詞
//    'D' => array(0.5,0.5,0),    //副詞
//    'Da' => array(0.8,0.2,0),    //數量副詞
//    'VI' => array(0.8,0.2,0),    //狀態類及物動詞
//    'VJ' => array(0.8,0.2,0),    //狀態及物動詞
//    'VK' => array(0.8,0.2,0),    //狀態句賓動詞
//    'VL' => array(0.8,0.2,0),    //狀態謂賓動詞
//    'Caa' => array(1,0,0),    //對等連接詞，如：和、跟
//    'Cab' => array(1,0,0),    //連接詞，如：等等
//    'Cba' => array(1,0,0),    //連接詞，如：的話
//    'Cbb' => array(1,0,0),    //關聯連接詞
//    'I' => array(1,0,0),    //感嘆詞
//    'P' => array(1,0,0),    //介詞
//    'T' => array(1,0,0),    //語助詞
//    'V_2' => array(1,0,0),    //有
//    'DE' => array(1,0,0),    //的, 之, 得, 地
//    'SHI' => array(1,0,0),    //是
//    'PARENTHESISCATEGORY' => array(1,0,0),  //標點符號
//    'default' => array(1,0,0)
//);

$config['langvar.length.membership_function_variables'] = array(
    4 => array(0, 0, 1),
    6 => array(0, 0.2, 0.8),
    8 => array(0, 0.5, 0.5),
    10 => array(0, 0.8, 0.2),
    13 => array(0, 1, 0),
    15 => array(0.5, 0.5, 0),
    'default' => array(1, 0, 0)
);

//注意！重要性要由高到低往下排列！
$config['langvar.location.membership_function_variables'] = array(
    5 => array(0, 0, 1),    //開頭結尾
    0 => array(0, 0.2, 0.8),    //開頭
    4 => array(0, 0.2, 0.8),    //結尾
    2 => array(0, 0.5, 0.5),    //接近開頭結尾
    1 => array(0, 1, 0),    //接近開頭
    3 => array(0, 1, 0),    //接近結尾
    6 => array(1, 0, 0),    //其他
    'default' => array(1,0,0)   //其他
);

//$config['yahoo.app_id'] = 'K7WZ.qrV34HHPDMPT4WGq.MSj6Z85hSDdPQYASkuxT9E1mjzC25kcZ1UImJdOHf06VAYXj4-'; //for kals wiki
//$config['yahoo.app_id'] = 'zno81EPV34FUKrAEs_Hn1pcuB1IQ4TBGLBXwLLRWwB2nyaBDnIZT94EESP2s39Xn2zKnfBo-'; //for 140.119.61.174

/* End of file kals.php */
/* Location: ./system/application/config/kals.php */