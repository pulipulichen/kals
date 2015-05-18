<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * kals_exp_201012
 *
 * kals 2010年12月實驗用的設定檔
 *
 * @package		KALS
 * @category		Config
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/6/22 下午 10:41:19
 */

//要觀察的網址
$config['obs_webpage_url'] = 'http://demo-kals.dlll.nccu.edu.tw/homework';


$config['obs_date_from'] = '2010-12-02 17:00:00+08';
$config['obs_epoch_from'] = '1291280400';
$config['obs_date_to'] = '2010-12-16 17:00:00+08';
$config['obs_epoch_to'] = '1292490000';

//全部的觀察名單
$config['obs_email'] = array(
    '99913001@nccu.edu.tw',
    '99913002@nccu.edu.tw',
    '99913003@nccu.edu.tw',
    '99913004@nccu.edu.tw',
    '99913005@nccu.edu.tw',

    '99913006@nccu.edu.tw',
    '99913007@nccu.edu.tw',
    '99913008@nccu.edu.tw',
    '99913009@nccu.edu.tw',
    '99913011@nccu.edu.tw',

    '99913012@nccu.edu.tw',
    '99913014@nccu.edu.tw',
    '99913015@nccu.edu.tw',
    '99913016@nccu.edu.tw',
    '99913017@nccu.edu.tw',

    '99913018@nccu.edu.tw',
    '99913019@nccu.edu.tw',
    '99913021@nccu.edu.tw',
    '99913022@nccu.edu.tw'
);

$config['obs_group'] = array(
    '99913001@nccu.edu.tw' => 2,
    '99913002@nccu.edu.tw' => 2,
    '99913003@nccu.edu.tw' => 0,
    '99913004@nccu.edu.tw' => 0,
    '99913005@nccu.edu.tw' => 0,
    '99913006@nccu.edu.tw' => 0,
    '99913007@nccu.edu.tw' => 1,
    '99913008@nccu.edu.tw' => 1,
    '99913009@nccu.edu.tw' => 0,
    '99913011@nccu.edu.tw' => 1,
    '99913012@nccu.edu.tw' => 2,
    '99913014@nccu.edu.tw' => 1,
    '99913015@nccu.edu.tw' => 0,
    '99913016@nccu.edu.tw' => 2,
    '99913017@nccu.edu.tw' => 2,
    '99913018@nccu.edu.tw' => 0,
    '99913019@nccu.edu.tw' => 2,
    '99913021@nccu.edu.tw' => 1,
    '99913022@nccu.edu.tw' => 1
);

$config['obs_sex'] = array(
    '99913001@nccu.edu.tw' => 0,
    '99913002@nccu.edu.tw' => 1,
    '99913003@nccu.edu.tw' => 0,
    '99913004@nccu.edu.tw' => 1,
    '99913005@nccu.edu.tw' => 1,

    '99913006@nccu.edu.tw' => 1,
    '99913007@nccu.edu.tw' => 1,
    '99913008@nccu.edu.tw' => 1,
    '99913009@nccu.edu.tw' => 1,
    '99913011@nccu.edu.tw' => 1,

    '99913012@nccu.edu.tw' => 1,
    '99913014@nccu.edu.tw' => 1,
    '99913015@nccu.edu.tw' => 1,
    '99913016@nccu.edu.tw' => 0,
    '99913017@nccu.edu.tw' => 0,

    '99913018@nccu.edu.tw' => 1,
    '99913019@nccu.edu.tw' => 1,
    '99913021@nccu.edu.tw' => 1,
    '99913022@nccu.edu.tw' => 1
);

//綜合學習成效分數
$config['obs_mix_score'] = array(
    '99913001@nccu.edu.tw' => 0.84,
    '99913002@nccu.edu.tw' => 1,
    '99913003@nccu.edu.tw' => 0.81,
    '99913004@nccu.edu.tw' => 0.49,
    '99913005@nccu.edu.tw' => 0.54,
    '99913006@nccu.edu.tw' => 0.6,
    '99913007@nccu.edu.tw' => 0.32,
    '99913008@nccu.edu.tw' => 0.31,
    '99913009@nccu.edu.tw' => 0.56,
    '99913011@nccu.edu.tw' => 0.41,
    '99913012@nccu.edu.tw' => 0.86,
    '99913014@nccu.edu.tw' => 0.25,
    '99913015@nccu.edu.tw' => 0.53,
    '99913016@nccu.edu.tw' => 0.86,
    '99913017@nccu.edu.tw' => 0.94,
    '99913018@nccu.edu.tw' => 0.69,
    '99913019@nccu.edu.tw' => 0.88,
    '99913021@nccu.edu.tw' => 0.1,
    '99913022@nccu.edu.tw' => 0.28,
);

//報告分數
$config['obs_report_score'] = array(
    '99913001@nccu.edu.tw' => 0,
    '99913002@nccu.edu.tw' => 0,
    '99913003@nccu.edu.tw' => 0,
    '99913004@nccu.edu.tw' => 0,
    '99913005@nccu.edu.tw' => 0,
    '99913006@nccu.edu.tw' => 0,
    '99913007@nccu.edu.tw' => 0,
    '99913008@nccu.edu.tw' => 0,
    '99913009@nccu.edu.tw' => 0,
    '99913011@nccu.edu.tw' => 0,
    '99913012@nccu.edu.tw' => 0,
    '99913014@nccu.edu.tw' => 0,
    '99913015@nccu.edu.tw' => 0,
    '99913016@nccu.edu.tw' => 0,
    '99913017@nccu.edu.tw' => 0,
    '99913018@nccu.edu.tw' => 0,
    '99913019@nccu.edu.tw' => 0,
    '99913021@nccu.edu.tw' => 0,
    '99913022@nccu.edu.tw' => 0,
);

//測驗分數
$config['obs_test_score'] = array(
    '99913001@nccu.edu.tw' => 12,
    '99913002@nccu.edu.tw' => 12,
    '99913003@nccu.edu.tw' => 12,
    '99913004@nccu.edu.tw' => 9,
    '99913005@nccu.edu.tw' => 10,
    '99913006@nccu.edu.tw' => 10,
    '99913007@nccu.edu.tw' => 8,
    '99913008@nccu.edu.tw' => 8,
    '99913009@nccu.edu.tw' => 11,
    '99913011@nccu.edu.tw' => 8,
    '99913012@nccu.edu.tw' => 10,
    '99913014@nccu.edu.tw' => 8,
    '99913015@nccu.edu.tw' => 9,
    '99913016@nccu.edu.tw' => 10,
    '99913017@nccu.edu.tw' => 10,
    '99913018@nccu.edu.tw' => 9,
    '99913019@nccu.edu.tw' => 12,
    '99913021@nccu.edu.tw' => 6,
    '99913022@nccu.edu.tw' => 7,
);

$config['paragraph_scope'] = array(
    array(0, 682,     '0', '標題 - 作者 - 摘要 - 關鍵詞'),      //0 標題 - 作者 - 摘要 - 關鍵詞
    array(683, 1255,  '1', '壹、緒論 - 一、研究背景與動機'),   //1 壹、緒論 - 一、研究背景與動機
    array(1256, 1503, '2', '二、研究目的與研究問題'),  //2 二、研究目的與研究問題
    array(1504, 1742, '3', '三、研究貢獻'),  //3 三、研究貢獻
    array(1743, 2791, '4', '貳、文獻探討'),  //4 貳、文獻探討
    array(2792, 3411, '5', '參、e-GBL學習環境之導入架構'),  //5 參、e-GBL學習環境之導入架構
    array(3412, 3766, '6', '一、e-GBL課程範圍規畫'),  //6 一、e-GBL課程範圍規畫
    array(3767, 4082, '7', '二、教學活動設計'),  //7 二、教學活動設計
    array(4083, 5226, '8', '三、e-GBL平台導入'),  //8 三、e-GBL平台導入
    array(5227, 5789, '9', '四、科學教育香蕉學習網站之建置'),  //9 四、科學教育香蕉學習網站之建置
    array(5790, 6165, 'A', '肆、研究結果與分析'),  //A 肆、研究結果與分析
    array(6166, 6639, 'B', '一、自編知識問卷之學習成效分析'),  //B 一、自編知識問卷之學習成效分析
    array(6640, 7821, 'C', '二、思考風格分組之學習行為晤談'),  //C 二、思考風格分組之學習行為晤談
    array(7822, 8276, 'D', '三、綜合討論'),  //D 三、綜合討論
    array(8277, 9107, 'E', '伍、結 論'),  //E 伍、結 論
    array(9108, 9909, 'F', '參考文獻之後')   //F 參考文獻之後
);

$config['chapter_scope'] = array(
    array(0, 682,     '0', '標題 - 作者 - 摘要 - 關鍵詞'),      //0 標題 - 作者 - 摘要 - 關鍵詞
    array(683, 1742,  '1', '壹、緒論'),   //1 壹、緒論 - 一、研究背景與動機
    array(1743, 2791, '2', '貳、文獻探討'),  //4 貳、文獻探討
    array(2792, 5789, '3', '參、e-GBL學習環境之導入架構'),  //5 參、e-GBL學習環境之導入架構
    array(5790, 8276, '4', '肆、研究結果與分析'),  //A 肆、研究結果與分析
    array(8277, 9107, '5', '伍、結 論'),  //E 伍、結 論
    array(9108, 9909, '6', '參考文獻之後')   //F 參考文獻之後
);

/* End of file kals.php */
/* Location: ./system/application/config/kals.php */