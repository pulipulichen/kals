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
//@load_scripts('Prototype_extend_param_passing', $load_raw);

//load_package();    //讀取全部元件

?>
<script type="text/javascript">
QUNIT_TITLE = "Prototype_extend_param_passing";
//QUNIT_ASSERT = 5;

//如果有需要指定要測試的項目的話，請使用這個方法
//unit(1, false);

//prepare_iframe();

//0: Prototype_extend_param_passing
unit(function () {

A = function () {
    
};



A.prototype.callback = null;
A.prototype.c = function () {
    
    if (typeof(this.callback) == 'function')
        this.callback();
    
};

B = function() {
    
};

B.prototype = new A();

B.prototype.c = function (_callback) {
    
    this.callback = _callback;
    
    A.prototype.c.call(this, _callback);
    
    document.write('done');
    
};

var b = new B();
b.c(function() {
    
    document.write('ready');
    
});



});

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