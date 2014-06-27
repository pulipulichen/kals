/**
 * URL_hash_dispatcher_test.js
 *
 * URL_hash_dispatcher的單元測試
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2014/5/20 下午 03:36:17
 */

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
_test_subject = "20140520 要準備開始測試";

//equals( _type_list.length
//    , 2
//    , _test_subject);

location.href = "#";

$("<div>content</div>")
        .css("background-color", "gray")
        .css("height", "2000px")
        .appendTo("body");

$("<div>footer</div>")
        .css("background-color", "green")
        .appendTo("body");

$("body").scrollTop(500);

equals( $("body").scrollTop(), 500, "20140520 hash before set_field scrollTop" );

// -----------------------------------

var _hash = new URL_hash_dispatcher();

_hash.set_field("select", "1111");

equals( location.hash, "#select=1111", "20140520 hash set_field" );

equals( $("body").scrollTop(), 500, "20140520 hash after set_field scrollTop" );

_hash.delete_field("select");

equals( location.hash, "", "20140520 hash delete_field" );

setTimeout(function () {
    equals( $("body").scrollTop(), 500, "20140520 hash after delete_field scrollTop" );
}, 0);
