<?php
/**
 * Align Unit Test
 *
 * @package             KALS
 * @category		Webpage Application QUnit
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 上午 12:17:29
 */

$title = 'Align';
@load_scripts('toolkit/yui', $load_raw);
@load_scripts('toolkit/jquery.extends', $load_raw);
@load_scripts('toolkit/Observable', $load_raw);
@load_scripts('toolkit/Viewportmove_observable', $load_raw);
?>
<script type="text/javascript">
QUNIT_TITLE = "<?= $title ?>";

test("Align", function() {
    
    var viewport = $('meta[name=viewport]');
    if (viewport.length > 0)
    {
        var content = viewport.attr('content');
    }
    
    /**
     * @type {jQuery}
     */
    var box = $.create_once('<div class="box"></div>');
    box.click(function () {
        alert(typeof(zoom_obs.zoom_scale));
        ZOOM_SCALE = zoom_obs.zoom_scale;
        XOFFSET = window.pageXOffset;
        YOFFSET = window.pageYOffset;
        //alert([ZOOM_SCALE, window.pageXOffset, window.pageYOffset]);
        
        //var _viewport = $('<meta name="viewport" content="width=device-width, maximum-scale=1.0, minimum-scale=1.0, user-scalable=yes" />')
        //var _viewport = $('<meta name="viewport" content="width=device-width, user-scalable=no" />')
        //    .appendTo($('head'));
        zoom_obs.lock_viewport();
    });
        /*
    box.onzoom = function (_zoom_observable) {
        var _scale = _zoom_observable.zoom_scale;
        box.css_scale('width', '30px', _scale);
        box.css_scale('height', '30px', _scale)
            .css_scale('font-size', '30px', _scale)
            .css_scale('border-width', '5px', _scale);
            
        box.fullscreen_width(_scale);
        box.valign({
            option: 'top',
            scale: _scale,
            offset: -10
        });
        
        box.align({
            option: 'left',
            scale: _scale,
        });
        
        //box.html(View.getWidth());
    }; 
    */
    var box2 = $.create_once('<div class="box box2"></div>');
        /*
    box2.onzoom = function (_zoom_observable) {
        var _scale = _zoom_observable.zoom_scale;
        box2.css_scale('width', '30px', _scale);
        box2.css_scale('height', '30px', _scale)
            //.css_scale('font-size', '10px', _scale)
            .css_scale('border-width', '5px', _scale);
        box2.fullscreen(_scale);
        
        box2.valign({
            option: 'middle',
            scale: _scale
            //,offset: -10
        });
        box2.align({
            option: 'center',
            scale: _scale
        });
        box2.html(_scale);
        
    };
    */
    box2.click(function () {
        
        //'<meta name="viewport" content="width=device-width initial-scale=1.0 user-scalable=no" />'
        //$('meta[name=viewport]').attr('content', 'width=800, user-scalable=yes')
        
        //var content = 'width=800, user-scalable=yes, initial-scale='+ZOOM_SCALE 
        //$('meta[name=viewport]').attr('content', content);
        
        //    .remove();
        //alert($('meta[name=viewport]').length);
        
        //window.scrollTo(XOFFSET, YOFFSET);
        zoom_obs.unlock_viewport();
        
        box2.css('position', 'fixed')
            .css('top', null)
            .css('bottom', 0);
        //alert([box2.css('position'), box2.css('bottom')]);
        
        box2.fullscreen();
        box.hide();
        box3.hide();
    });    
        
    var box3 = $.create_once('<div class="box box3"></div>');
        /*
    box3.onzoom = function (_zoom_observable) {
        var _scale = _zoom_observable.zoom_scale;
        box3.css_scale('width', '30px', _scale);
        box3.css_scale('height', '30px', _scale)
            //.css_scale('font-size', '30px', _scale)
            .css_scale('border-width', '5px', _scale);
        //box3.css_scale('height', '455px', _scale)
        
        box3.fullscreen_height(_scale);
        
        box3.valign({
            option: 'bottom',
            scale: _scale
            //, offset: -10
        });
        box3.align({
            option: 'right',
            scale: _scale
            , offset: -10
        });
        box3.html(window.outerHeight - window.screenTop);
        
    };
    */
    box3.click (function () {
        var top = $(this).css('top');
        var top = top.substring(0, top.length-2);
        top = eval(top + 5);
        top = top + 'px';
        $(this).css('top', top);
    });
    
        

    zoom_obs = new Viewportmove_observable();
    zoom_obs.add_observer(box, function (_zoom_observable) {
        
        var _scale = _zoom_observable.zoom_scale;
        box.css_scale('width', '30px', _scale);
        box.css_scale('height', '30px', _scale)
            .css_scale('font-size', '30px', _scale)
            .css_scale('border-width', '5px', _scale);
            
        box.fullscreen_width(_scale);
        box.valign({
            option: 'top',
            scale: _scale,
            offset: -10
        });
        
        box.align({
            option: 'left',
            scale: _scale,
        });
        
        //box.html(View.getWidth());
    });
    zoom_obs.add_observer(box2,function (_zoom_observable) {
        var _scale = _zoom_observable.zoom_scale;
        box2.css_scale('width', '30px', _scale);
        box2.css_scale('height', '30px', _scale)
            //.css_scale('font-size', '10px', _scale)
            .css_scale('border-width', '5px', _scale);
        //box2.fullscreen(_scale);
        
        box2.valign({
            option: 'middle',
            scale: _scale
            //,offset: -10
        });
        box2.align({
            option: 'center',
            scale: _scale
        });
        box2.html(_scale);
        
    });
    zoom_obs.add_observer(box3,function (_zoom_observable) {
        var _scale = _zoom_observable.zoom_scale;
        box3.css_scale('width', '30px', _scale);
        box3.css_scale('height', '30px', _scale)
            //.css_scale('font-size', '30px', _scale)
            .css_scale('border-width', '5px', _scale);
        //box3.css_scale('height', '455px', _scale)
        
        box3.fullscreen_height(_scale);
        
        box3.valign({
            option: 'bottom',
            scale: _scale
            //, offset: -10
        });
        box3.align({
            option: 'right',
            scale: _scale
            , offset: -10
        });
        box3.html(window.outerHeight - window.screenTop);
        
    });
    
    
    zoom_obs.notify_observers();
    
    $.test_msg($.is_mobile_mode());
    
    /*
    setInterval(function () {
        zoom_obs.notify_observers();
    }, 1000);
    */

/*
    setInterval(function () {
        box.valign('top');
        
        box2.valign('middle');
        
        box3.valign('bottom');
    }, 1000);
    */

//    equals( result
//        , expected
//        , "Align" );

});
</script>
<style type="text/css">
/**
 * 您可以在此寫入CSS內容
 */
 .box {
     width: 100px;
     height: 100px;
     background-color: red;
     position: fixed;
     border: 10px solid pink;
     font-size: 2px;
     color:white;
}

 .box2 { background-color: green;}
 .box3 { background-color: blue;}
</style>

<!--
  您可以在此寫入HTML內容
  -->
1<br />
1<br />
1<em>◆《仙境傳說》世界盃公開賽 台灣選手實力強</em><br /> 
<br /> 
　　遊戲新幹線超人氣線上遊戲《<a class="acglink" href="http://acg.gamer.com.tw/search.php?encode=utf8&kw=%E4%BB%99%E5%A2%83%E5%82%B3%E8%AA%AA" target="_blank">仙境傳說</a>》推出至今 8 年，人氣依舊歷久彌新，8 年來累積超過 700 萬名會員，每年舉辦的「RO 世界盃公開賽」，更如同大型網聚派對般熱鬧，都吸引超過上千玩家報名。而今年 10 月在印尼舉辦第 5 屆「2010 RWC 世界盃公開賽...<br /> 
<br /> 
<em>◆《嬌蠻貓娘大橫行》創作團隊 矢吹健太朗首度登台</em><br /> 
<br /> 
　　第11屆漫畫博覽會人潮爆滿，累計 5 天已有逼近 50 萬人次入館，創歷屆新高。開館前各入口處就大排長龍，一開館漫迷全往內衝，隨即館內已萬頭攢動，甚至還因館內一度因湧進太多人、二氧化碳濃度飆高，主辦單位立即管制進場人數。而這次漫博會青文...<br /> 
<br /> 
<em>◆《CRASH！》漫畫家藤原友佳簽名會甜美開場</em><br /> 
<br /> 
　　尖端出版在漫博會，邀請到《<a class="acglink" href="http://acg.gamer.com.tw/search.php?encode=utf8&kw=CRASH%EF%BC%81" target="_blank">CRASH！</a>》漫畫家藤原友佳老師來台辦簽名會，第一次到台灣來的藤原友佳老師，老師長相甜美可愛，就像作品中的女主角白星花一樣，一登台立即驚豔全場，主持人還安排一位熱情粉絲裝扮黑瀨桐上台獻上禮物與老師合影...<br /> 
<br /> 
<em>◆ 美女漫畫家咲坂芽亞登台 漫畫人物走出來</em><br /> 
<br /> 
　　天氣熱爆了，漫畫博覽會現場也擠爆了。漫畫迷為了到現場搶好康，把現場擠得水泄不通，而長長的排隊人潮就像貪吃蛇遊戲，隊伍越排越長，漫博會人數創下歷年來新高。而長鴻出版《<a class="acglink" href="http://acg.gamer.com.tw/search.php?encode=utf8&kw=%E8%A6%AA%E8%A6%AA%E8%99%8E%E7%89%99%E5%92%AC%E4%B8%80%E5%8F%A3" target="_blank">親親虎牙咬一口</a>》日本美女漫畫家咲坂芽亞也在現場引發大騷動...<br /> 
<br /> 
<em>◆《彩雲國物語》漫畫家由羅海里簽名會</em><br /> 
<br /> 
　　在日本與台灣都大受歡迎的《<a class="acglink" href="http://acg.gamer.com.tw/search.php?encode=utf8&kw=%E5%BD%A9%E9%9B%B2%E5%9C%8B%E7%89%A9%E8%AA%9E" target="_blank">彩雲國物語</a>》，作者由羅海里受角川出版邀請來台與漫畫迷相見歡。由羅海里是一位短髮氣質的女性作家，一出場就很有風度的向讀者問好。當問起老師在作品中最喜歡的男角色是誰？由羅老師表示，最喜歡的是黃奇人，但...<br /> 
<br /> 
<em>◆ 熱情杉井光超興奮 大玩合體遊戲</em><br /> 
<br /> 
　　東立出版的知名輕小說作家杉井光，靠著《<a class="acglink" href="http://acg.gamer.com.tw/search.php?encode=utf8&kw=%E7%81%AB%E7%9B%AE%E7%9A%84%E5%B7%AB%E5%A5%B3" target="_blank">火目的巫女</a>》一砲而紅，而他也首次來台非常興奮。一出場看到台下讀者，先來個飛吻，台下讀者大喊老師名字熱情回應。東立出版也安排 Cosplay 扮成女主角獻花給老師，此外這次簽名板做成 3D 圖畫本，一位...<br /> 
<br /> 
<em>◆ 傑尼斯系聲優浪川大輔帥氣登場</em><br /> 
<br /> 
　　木棉花人氣動畫《<a class="acglink" href="http://acg.gamer.com.tw/search.php?encode=utf8&kw=%E7%BE%A9%E5%91%86%E5%88%A9" target="_blank">義呆利</a>》中的帥氣聲優浪川大輔，有著如同偶像般的外型，而他一出場以宏亮的聲音大喊「PASTA」，現場女性粉絲為之瘋狂，浪川大輔帥氣迷人的五官，搭上簡單的日本披肩，後面還有義大利的圖案，拿著可愛方型抱枕，投出瞬間在場...<br /> 
<br /> 
　　以上為摘錄內容，完整內容請參閱影片。<br /><br />
1<br />
1<br />
<?php
/* End of file Align.php */
/* Location: ./system/application/views/qunit/core/Align.php */