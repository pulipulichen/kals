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

// -----------------
// 設定測試的標題
_test_subject = "new Context_basic_type";

// 執行測試的內容
var _context_basic_type = new Context_basic_type();

// 驗證測試的結果
equals( typeof(_context_basic_type)
    , "object"
    , _test_subject);
    
// ----------------
// 1. 設定測試的標題
_test_subject = "get_type_list";

// 2. 執行測試的內容
var _type_list = _context_basic_type.get_type_list();

// 3. 設定預期的結果
_result = 7;
// 4. 驗證測試的結果
equals( _type_list.length
    , _result
    , _test_subject);
    
// ----------------
// 1. 設定測試的標題
_test_subject = "get_type_list with enable_type";

// 2. 執行測試的內容

KALS_CONFIG = {
    annotation_type_config: {
        'importance' : {
            enable: {
                topic: false,
                respond: false
            }
        },
        'concept' : {
            enable: {
                topic: true,
                respond: true
            }
        },
        'confusion' : {
            enable: {
                topic: true,
                respond: true
            }
        },
        'question' : {
            enable: {
                topic: true,
                respond: true
            }
        },
        'example' : {
            enable: {
                topic: true,
                respond: true
            }
        },
        'summary' : {
            enable: {
                topic: true,
                respond: true
            }
        },
        'custom' : {
            enable: {
                topic: true,
                respond: true
            }
        }
    }
};

var _context_basic_type = new Context_basic_type();

var _type_list = _context_basic_type.get_type_list("topic");

// 3. 設定預期的結果
_result = 6;
// 4. 驗證測試的結果
equals( _type_list.length
    , _result
    , _test_subject);
