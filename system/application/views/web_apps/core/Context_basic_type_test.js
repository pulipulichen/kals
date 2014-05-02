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

// -----------------
// 設定測試的標題
_test_subject = "new Context_basic_type";

// 執行測試的內容
var _context_basic_type = new Context_basic_type();

// 驗證測試的結果
equals( typeof(_context_basic_type)
    , "object"
    , _test_subject);
    
