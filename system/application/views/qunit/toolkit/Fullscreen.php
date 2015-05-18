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
@load_scripts('toolkit/Zoom_observable', $load_raw);
@load_scripts('toolkit/Zoom_observer', $load_raw);
?>
<script type="text/javascript">
QUNIT_TITLE = "<?= $title ?>";

test("Align", function() {
    
    var viewport = $('meta[name=viewport]');
    if (viewport.length > 0)
    {
        var content = viewport.attr('content');
        
    }
    $.test_msg(window.devicePixelRatio);

    var box = $.create_once('<div class="box"></div>')
        .valign('top');
    box.onzoom = function (_zoom_observable) {
        var _scale = _zoom_observable.zoom_scale;
        box.css_scale('width', '30px', _scale);
        box.css_scale('height', '30px', _scale)
            .css_scale('font-size', '30px', _scale)
            .css_scale('border-width', '5px', _scale);
        box.valign({
            option: 'top',
            scale: _scale,
            offset: -10
        });
        
        box.align({
            option: 'left',
            scale: _scale,
            offset: -10
        });
        
        //box.html(View.getWidth());
    };  
        
    var box2 = $.create_once('<div class="box box2"></div>')
        .valign('middle');
    box2.onzoom = function (_zoom_observable) {
        var _scale = _zoom_observable.zoom_scale;
        box2.css_scale('width', '30px', _scale);
        box2.css_scale('height', '30px', _scale)
            //.css_scale('font-size', '10px', _scale)
            .css_scale('border-width', '5px', _scale);
        
        
        box2.valign({
            option: 'middle',
            scale: _scale,
            offset: -10
        });
        box2.align({
            option: 'center',
            scale: _scale
        });
        box2.html(_scale);
        
    };
    box2.click(function () {
        
        box2.css('position', 'fixed')
            .css('top', null)
            .css('bottom', 0);
        alert([box2.css('position'), box2.css('bottom')]);
    });    
        
    var box3 = $.create_once('<div class="box box3"></div>')
        .valign('bottom');
    box3.onzoom = function (_zoom_observable) {
        var _scale = _zoom_observable.zoom_scale;
        box3.css_scale('width', '30px', _scale);
        box3.css_scale('height', '30px', _scale)
            //.css_scale('font-size', '30px', _scale)
            .css_scale('border-width', '5px', _scale);
        //box3.css_scale('height', '455px', _scale)
        box3.valign({
            option: 'bottom',
            scale: _scale,
            offset: -10
        });
        box3.align({
            option: 'right',
            scale: _scale,
            offset: -10
        });
        box3.html(window.outerHeight - window.screenTop);
        
    };
    box3.click (function () {
        var top = $(this).css('top');
        var top = top.substring(0, top.length-2);
        top = eval(top + 5);
        top = top + 'px';
        $(this).css('top', top);
    });
    
        

    var zoom_obs = new Zoom_observable();
    zoom_obs.addObserver(box3);
    zoom_obs.addObserver(box2);
    zoom_obs.addObserver(box);
    zoom_obs.notifyObservers();
    
    $.test_msg($.is_mobile_mode());
    
    setInterval(function () {
        zoom_obs.notifyObservers();
    }, 1000);

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
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
1<br />
<?php
/* End of file Align.php */
/* Location: ./system/application/views/qunit/core/Align.php */