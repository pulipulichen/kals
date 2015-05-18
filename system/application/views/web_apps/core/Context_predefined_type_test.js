/**
 * jQuery_kals_plugin_test.js
 *
 * jQuery_kals_plugin的單元測試
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2014/5/2 下午 03:36:17
 */


/**
 * 範例
 */
// 設定測試的標題
_test_subject = "Is QUnit work?";

// 執行測試的內容

// 驗證測試的結果
equals( 1+1
    , 2
    , _test_subject );

/**
 * 範例格式，請複製以下程式來撰寫單元測試
 
// ----------------
// 1. 設定測試的標題
_test_subject = "";
// 2. 執行測試的內容
// 3. 設定預期的結果
_result = true;
// 4. 驗證測試的結果
equals( _target
    , _result
    , _test_subject);

 */
// ----------------
// 1. 設定測試的標題
_test_subject = "20140503 get_type_list with enable_type";

// 2. 執行測試的內容

KALS_CONFIG = {
    /**
     * 預先定義標註類型。
     * 
     * 注意，這個設定不會覆蓋annotation_type_option設定的標註類型
     * 而是會加在原本的標註類型下面。
     * 如果你要取消原本的標註類型，請修改annotation_type_option
     */
    annotation_type_predefined: {
        //預先定義標註類型的設定
        //@type {string,JSON} 標註類型的名稱 
        "夢想": {
            //標註類型的說明 
            //@type {string} HTML語法
            hint: '這段話充滿了令人嚮往的夢想。',
            
            //標註類型的選項樣式 
            option: {
                //背景顏色
                //@type {string} CSS顏色表示法
                background_color: 'blue',
                //字型顏色
                //@type {string} CSS顏色表示法
                font_color: 'white'
            },
            
            //標註類型的錨點樣式
            anchor: {
                //標註顯示的類型
                //@type {string} 自訂類型，有以下選項可選
                //     'underline': 底線(預設)
                //     'dashedline': 底線虛線
                //     'dottedline': 底線虛線
                //     'doubleline': 底線雙線
                //     'background': 背景顏色
                style: 'dottedline',
                
                //錨點樣式的背景顏色
                //@type {string} CSS顏色表示法
                color: 'blue',
                
                //錨點樣式的字體顏色
                //@type {string} CSS顏色表示法
                font_color: '#00F'
            },
            enable: {
                topic: false,
                respond: true
            }
        },
        
        //預先定義標註類型的設定
        //@type {string,JSON} 標註類型的名稱 
        '現實': {
            
            //標註類型的說明
            //@type {string} HTML語法
            hint: '殘酷又覺得真實的事情。',
            
            //標註類型的選項樣式
            option: {
                //背景顏色
                //@type {string} CSS顏色表示法
                background_color: 'red',
                
                //字型顏色
                //@type {string} CSS顏色表示法
                font_color: 'blue'
            },
            
            //標註類型的錨點樣式
            anchor: {
                //標註顯示的類型
                //@type {string} 自訂類型，有以下選項可選
                //     'underline': 底線(預設)
                //     'dashedline': 底線虛線
                //     'dottedline': 底線虛線
                //     'doubleline': 底線雙線
                //     'background': 背景顏色
                style: 'background',
                
                //錨點樣式的背景顏色
                //@type {string} CSS顏色表示法
                color: '#F53004',
                
                //錨點樣式的字體顏色
                //@type {string} CSS顏色表示法
                font_color: 'white'
            },
            enable: {
                topic: false,
                respond: true
            }
        }
    }
};

var _context_predefined_type = new Context_predefined_type();

var _type_list = _context_predefined_type.get_type_list("topic");
// 3. 設定預期的結果
_result = 0;
// 4. 驗證測試的結果
equals( _type_list.length
    , _result
    , _test_subject);

_type_list = _context_predefined_type.get_type_list("respond");
equals( _type_list.length
    , 2
    , _test_subject);
