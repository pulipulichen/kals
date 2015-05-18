<?php
/**
 * jquery Unit Test
 *
 * @package             KALS
 * @category		QUnit
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 上午 12:17:29
 */

$title = 'jquery';
//load_toolkit();     //讀取常用工具
//load_core();        //讀取核心類別
//load_component();   //讀取元件類別
load_package();

?>
<script type="text/javascript">
QUNIT_TITLE = "<?= $title ?>";
QUNIT_ASSERT = 25;

$(function () {
    

test("jquery", function() {
    equals( $.substr('0123456789', -1, 1)
        , '9'
        , "substr" );
    equals( $.substr('0123456789', -1)
        , "9"
        , "substr但省略length" );
    equals( $.substr('0123456789', -3)
        , '789'
        , "substr但省略length" );
    equals( $.ends_with('0123456789', "6789")
        , true
        , "ends_with" );
    equals( $.ends_with('0123456789', "67898")
        , false
        , "ends_with false" );
    equals( $.appends_with('0123456789', "6789")
        , '0123456789'
        , "appends_with false" );
    equals( $.appends_with('0123456789', "67898")
        , '0123456789'+'67898'
        , "appends_with false" );


    var ary = [1, 3 ,5 ,6];
    equals( $.is_class(ary, 'Array')
        , true
        , "is_class() array" );

    ary = 11212;
    equals( $.is_class(ary, 'Array')
        , false
        , "is_class() false" );

    json = {"value":"這'樣呢？", "array":[1, 'p', {tt: 1212}]};
    //json = [1,2,4,5];
    equals( $.json_encode(json)
        , 'is_string'
        , "JSON字串化" );

    var img = 'http://www.trailershut.com/movie-posters/The-Social-Network-Movie-Poster.jpg#test?twste=1212';
    equals( $.is_image(img)
        , true
        , "is_image()" );

    $.create_once('<div id="a">1212</div>');
    equals( $('#a').exists()
        , true
        , "exists" );

    $.create_once('<div id="a">1212</div>');
    equals( $('#a').length
        , 1
        , "create_once" );

    var obj = {a: 1};
    equals( $.is_jquery(obj)
        , false
        , "is_jquery false" );

    var obj = $('<div></div>');
    equals( $.is_jquery(obj)
        , true
        , "is_jquery true" );

    var element = document.getElementById('a');
    equals( $.is_html_element(element)
        , true
        , "is_element true" );
        
    equals( $.is_html_element(obj)
        , false
        , "is_element false" );
    
    var path = 'jQuery.substr';
    equals( $.object_isset(path)
        , true
        , "object_isset" );
        
    equals( $.object_isset('jQuery.Substr')
        , false
        , "object_isset false" );
    
    equals($.get_class($('body')), 'jQuery'
        , "get_class jQuery");
    
    equals($.get_class($('body')), 'jQuery'
        , "get_class jQuery");
        
    equals($.is_jquery($('body')), true
        , "is_jquery");
    
    equals($.get_class(new KALS_language_param()), 'KALS_language_param'
        , "get_class KALS_language_param");
        
    equals($.get_class({test: true}), 'Object'
        , "get_class Obejct (JSON)");
        
    equals($.is_jquery({test: true}), false
        , "is_jquery JSON");
    
    equals($.is_ascii('1'), true
        , 'is_ascii: 1');
    
    equals($.is_ascii('1我'), false
        , 'is_ascii: 1我');    
    
    //$.scroll_to({y: '+1000'});
    
		
});

});    //$(function () {
</script>

<!--
你可以在此寫入HTML內容
-->
<div style="height: 1000px;"> </div>
<?php
/* End of file jquery.php */
/* Location: ./system/application/views/qunit/jquery.php */