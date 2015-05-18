<?php
/**
 * Prototype_extend_param_passing Unit Test
 *
 * @package     KALS
 * @category    Webpage Application QUnit
 * @author      Pudding Chen <puddingchen.35@gmail.com>
 * @copyright   Copyright (c) 2010, Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        http://sites.google.com/site/puddingkals/
 * @version     1.0 2010/10/2 下午 03:21:48
 */

//load_toolkit();     //讀取常用工具
//load_core();        //讀取核心類別
//load_component();   //讀取元件類別
@load_scripts('libraries/Base', $load_raw);

//load_package();    //讀取全部元件

?>
<script type="text/javascript" src="Base.js"></script>
<script type="text/javascript">
//建立類別A，繼承自Base類別
A = Base.extend({
    //建構子
    constructor: function () {
        //在畫面中輸出[Call A's constructor]，表示執行A的建構子
        document.write("[Call A's constructor]");    
    },
    method: function () {
        //表示執行A的方法
        document.write("[Hello, world!]");
    }
});

B = A.extend({
    //建構子
    constructor: function () {
        //在畫面中輸出[Call B's constructor]，表示執行B的建構子
        document.write("[Call B's constructor]");
    }
});

//實體化類別B到變數b中
var b = new B();    //畫面輸出[Call B's constructor]

//呼叫由類別A繼承來的方法
b.


</script>
<style type="text/css">
/**
 * 您可以在此寫入CSS內容
 */
</style>

<!--
  您可以在此寫入HTML內容
  -->

 <!--
 
 -->

<?php
/* End of file Prototype_extend_param_passing.php */
/* Location: ./system/application/views/qunit/core/Prototype_extend_param_passing.php */