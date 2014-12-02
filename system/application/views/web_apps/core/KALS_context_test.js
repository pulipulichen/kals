/**
 * KALS_context_test.js
 *
 * KALS_context的單元測試
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2014/5/5 下午 03:36:17
 */

// 測試運作
equals( 1+1, 2, "Is QUnit work?" );

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
_test_subject = "20140505 create_type_param_list default";

var _context = KALS_context;

var _type_list = _context.create_type_param_list();
var _type_count = 0;
for (var _type in _type_list) {
    _type_count++;
}

equals( _type_count, 7, _test_subject);

// ----------------
_test_subject = "20140505 create_type_param_list custom";

// Mock
KALS_CONFIG = {
    annotation_type_basic: {
        'importance' : {
            enable: {
                topic: false,
                respond: false
            },
            order: 1
        },
        'concept' : {
            enable: {
                topic: true,
                respond: true
            },
            order: 1
        },
        'confusion' : {
            enable: {
                topic: true,
                respond: true
            },
            order: 3
        }
    }
};

// Stub
_context.basic_type = new Context_basic_type();
_context.predefined_type = new Context_predefined_type();

_test_subject = "20140505 create_type_param_list custom topic";
var _type_list = _context.create_type_param_list("topic");
var _type_count = 0;
for (var _type in _type_list) {
    _type_count++;
}
equals( _type_count, 2, _test_subject);

_test_subject = "20140505 create_type_param_list custom respond";
var _type_list = _context.create_type_param_list("respond");
var _type_count = 0;
for (var _type in _type_list) {
    _type_count++;
}
equals( _type_count, 2, _test_subject);

_test_subject = "20140505 create_type_param_list custom order";
var _type_list = _context.create_type_param_list("respond");
var _type_order = "";
for (var _type in _type_list) {
    _type_order = _type_order + _type + "-";
}
equals( _type_order, "confusion-concept-", _test_subject);