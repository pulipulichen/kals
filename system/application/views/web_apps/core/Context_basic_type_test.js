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
_test_subject = "20140503 new Context_basic_type";

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
_test_subject = "20140503 get_type_list with enable_type";

// 2. 執行測試的內容

KALS_CONFIG = {
    annotation_type_basic: {
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

_type_param = _context_basic_type._type_list["importance"];
equals( typeof(_type_param)
    , "object"
    , "20140503 取得importance類型");
    
equals( _type_param.is_enable("topic")
    , false
    , "20140503 importance類型的topic啟用設定");

// --------------------

_type_param = _context_basic_type._initialize_type("importance", {enable:{topic: false} });
equals( typeof(_type_param)
    , "object"
    , "20140503 自產自銷 initialize_type");
equals( _type_param.is_enable("topic")
    , false
    , "20140503 自產自銷 initialize_type importance類型的topic啟用設定");
    
// ----------------
// 1. 設定測試的標題
_test_subject = "20140503 get_type_list with enable_type respond & topic";

// 2. 執行測試的內容

KALS_CONFIG = {
    annotation_type_basic: {
        'importance' : {
            enable: {
                topic: false,
                respond: false
            }
        },
        'concept' : {
            enable: {
                topic: false,
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

var _topic_type_list = _context_basic_type.get_type_list("topic");
var _respond_type_list = _context_basic_type.get_type_list("respond");

// 3. 設定預期的結果
_result = 6;
// 4. 驗證測試的結果
equals( _topic_type_list.length, 5, _test_subject + ".1");
equals( _respond_type_list.length, 6, _test_subject + ".2");

// --------------------------------------
_test_subject = "20140505 get_type_list ";

// 2. 執行測試的內容
KALS_CONFIG = {
    /**
     * 使用的標註類型
     * 標註類型的順序會照以下設定排列。
     * @type {array[string]} 可用的標註類型如下，如果不想用該類型的標註時，您可以省略它：
     *     importance: 重要
     *     concept: 概念
     *     confusion: 困惑
     *     question: 疑問
     *     example: 舉例
     *     summary: 摘要
     *     custon: 自訂
     */
    annotation_type_basic: {
        'importance': {
            enable: {
                topic: true,
                respond: false
            }
        },
        //, 'concept'    //不使用「概念」標註類型
        //, 'confusion'    //不使用「困惑」標註類型
        'question': {
            enable: {
                topic: true,
                respond: false
            }
        },
        //, 'example'    //不使用「舉例」標註類型
        'summary': {
            enable: {
                topic: false,
                respond: true
            }
        }
        //, 'custom'    //不使用「自訂」標註類型
    }
};  

var _context_basic_type = new Context_basic_type();

var _topic_type_list = _context_basic_type.get_type_list("topic");
equals( _topic_type_list.length, 2, _test_subject + ".1");