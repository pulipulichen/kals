/**
 * Type_menu的單元測試
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
// 1. 設定測試的標題
_test_subject = "20140505 Type_menu._$create_ui for topic";

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
    annotation_type_config: {
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
KALS_context.basic_type = new Context_basic_type();

var _type_menu = new Type_menu({});
_type_menu.change_enable_type("topic");
var _ui = _type_menu.get_ui();
_ui.appendTo($("body"));
equals( _ui.find(".type-option:visible").length
    , 2
    , _test_subject);

var _option = KALS_context.basic_type.get_type_list("topic");
equals( _option.length, 2, _test_subject);


// ----------------
// 1. 設定測試的標題
_test_subject = "20140505 Type_menu._$create_ui for respond";

var _type_menu = new Type_menu({});

_type_menu.change_enable_type("respond");
var _ui = _type_menu.get_ui();
_ui.appendTo($("body"));
equals( _ui.find(".type-option:visible").length
    , 1
    , _test_subject);


