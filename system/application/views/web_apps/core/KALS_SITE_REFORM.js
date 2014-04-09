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
        reform: {
            before_init: function (_callback) {
                //pdf2htmlEX = KALS_pdf2htmlEX();
                setTimeout(function () {
                    
                    //先記錄目前的瀏覽進度
                    var _now_top = $("#page-container").attr("scrollTop");
                    
                    /*
                    $("body .pf").each(function (_index, _pf) {
                        var _top = $(_pf).offset().top;
                        setTimeout(function () {
                            $("#page-container").scrollTop(_top);
                        }, 0);
                        $.test_msg("簽到 " + _index, _top);
                    });
                    */
                    //$.test_msg("pdf2htmlEx ", typeof(pdf2htmlEX.Viewer));
                    //window.scrollTo(0, 1000);
                    // 最後一定要callback
                    
                    //$.test_msg("簽到 ", $("#page-container").attr("scrollHeight"));
                    var _top = $("#page-container").attr("scrollHeight");
                    $("#page-container").scrollTop(_top);
                    /*
                    setTimeout(function () {
                        //$("#page-container").scrollTop(0);
                    }, 10000);
                    */
                    setTimeout(function () {
                        $("#page-container").scrollTop(1);
                    }, 1);
                    _callback();
                }, 0);
                    
            },
            after_init: function () {
                $("body").css("background-color", "#2f3236");
                $("#page-container").css("position", "relative");
                
                //$.test_msg("完成？222");
            }
        }
                
    }   //site_title: "pdf2html",
];

/* End of file KALS_SITE_REFORM.js */
/* Location: ./system/application/views/web_apps/../KALS_SITE_REFORM.js */