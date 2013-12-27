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
        title: "pdf2htmlEx",
        
        /**
         * 該網站的特徵，請以jQuery Selector輸入
         * @type {Array|String}
         */
        feature: [
            "#sidebar",
            "#page-container",
            "#pf1:first",
            //".t:first",
            //".m0:first",
            //".ls0:first",
            //"._0:first",
        ],
        
        /**
         * 符合特徵時做的事情
         * @type {Function}
         */
        reform: function (_callback) {
            
            $("body").css("background-color", "#2f3236");
            $("#page-container").css("position", "relative");
            
            //pdf2htmlEX = KALS_pdf2htmlEX();
            //$.test_msg("pdf2htmlEx ", typeof(pdf2htmlEX.Viewer));
            
            // 最後一定要callback
            _callback();
        }
    }   //site_title: "pdf2html",
];