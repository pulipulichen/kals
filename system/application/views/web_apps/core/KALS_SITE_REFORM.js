/**
 * KALS_SITE_REFORM_CONFIG
 * 
 * 在讀取完成時，去修改網站的作法
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals
 * @version    1.0 2013/12/27 下午 08:10:10
 * @extends {Event_dispatcher}
 */

KALS_SITE_REFORM_CONFIG = [
    {
        /**
         * 標題，只有偵錯訊息會用到
         * @type String
         */
        title: "pdf2html",
        
        /**
         * 該網站的特徵，請以jQuery Selector輸入
         * @type {Array|String}
         */
        feature: [
            "div:first",
            "img:first"
        ],
        
        /**
         * 符合特徵時做的事情
         * @type {Function}
         */
        reform: function (_callback) {
            //$.test_msg("是pdf2html");
            $("body").css("color", "green");
            _callback();
        }
    }   //site_title: "pdf2html",
];