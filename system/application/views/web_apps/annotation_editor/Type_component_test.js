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
_test_subject = "20140505 Type_component._setup_menu() topic";

// 2. 執行測試的內容

var _type_component = new Type_component();

var _menu_ui = _type_component._setup_menu();
var _menu = _type_component.menu;
//_ui.appendTo($("body"));
equals( _menu._enable_type
    , "topic"
    , _test_subject);

// ----------------
// 1. 設定測試的標題
_test_subject = "20140505 Type_component._setup_menu() respond";

// 2. 執行測試的內容

var _editor = {
    is_respond: function () {
        return true;
    }
};

var _type_component = new Type_component(_editor);

var _menu_ui = _type_component._setup_menu();
var _menu = _type_component.menu;
//_ui.appendTo($("body"));
equals( _menu._enable_type
    , "respond"
    , _test_subject);