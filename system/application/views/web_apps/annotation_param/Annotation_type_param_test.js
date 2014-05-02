/**
 * Annotation_type_param_test.js
 *
 * Annotation_type_param的單元測試
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
_target = true;
_result = true;
// 4. 驗證測試的結果
equals( _target, _result, _test_subject);

 */

// ----------------
// 1. 設定測試的標題
_test_subject = "20140503 Create Importantance Annotation_type_param & get id";
// 2. 執行測試的內容
var _type_param = new Annotation_type_param("importance");

// 3. 設定預期的結果
_target = _type_param.get_id();
_result = 1;
// 4. 驗證測試的結果
equals( _target
    , _result
    , _test_subject);
    
// ----------------
// 1. 設定測試的標題
_test_subject = "20140503 Set Enable Config";
// 2. 執行測試的內容
var _type_param = new Annotation_type_param("importance");
var _type = "topic";
var _option = false;
_type_param.set_enable_config(_type, _option);

// 3. 設定預期的結果
_target = _type_param.is_enable(_type);
_result = _option;
// 4. 驗證測試的結果
equals( _target, _result, _test_subject);

// ----------------
// 1. 設定測試的標題
_test_subject = "20140503 Set Enable Config with object";
// 2. 執行測試的內容
var _type_param = new Annotation_type_param("importance");
var _type = "topic";
var _option = false;
var _type_config = {
    topic: false
};
_type_param.set_enable_config(_type_config);

// 3. 設定預期的結果
_target = _type_param.is_enable(_type);
_result = _option;
// 4. 驗證測試的結果
equals( _target, _result, _test_subject);

// ----------------
// 1. 設定測試的標題
_test_subject = "20140503 Set Enable Config with object 重複產生！";
// 2. 執行測試的內容
var _type_param1 = new Annotation_type_param("importance");
var _type_config = {
    topic: false
};
_type_param1.set_enable_config(_type_config);
equals( _type_param1.is_enable("topic"), false, _test_subject + ".1");

var _type_param2 = new Annotation_type_param("question");
var _type_config = {
    topic: true
};
_type_param2.set_enable_config(_type_config);
equals( _type_param1.is_enable("topic"), false, _test_subject + ".2");

// 3. 設定預期的結果
_target = _type_param1.is_enable(_type);
_result = false;
// 4. 驗證測試的結果
equals( _target, _result, _test_subject);