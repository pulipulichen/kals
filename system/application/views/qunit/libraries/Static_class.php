<?php
/**
 * Static_class Unit Test
 *
 * @package     KALS
 * @category    Webpage Application QUnit
 * @author      Pudding Chen <puddingchen.35@gmail.com>
 * @copyright   Copyright (c) 2010, Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        http://sites.google.com/site/puddingkals/
 * @version     1.0 2010/10/1 下午 04:30:46
 */

//load_toolkit();     //讀取常用工具
//load_core();        //讀取核心類別
//load_component();   //讀取元件類別
//@load_scripts('Static_class', $load_raw);

//load_package();    //讀取全部元件

?>
<script type="text/javascript">
/*
A = {};

A.attr = 1;
A.method = function () {
    document.write(this.attr);
};

A.method();
*/

C = function () {
    
};

C.prototype.cc = function() {
    document.write('a');
};

A = function() {
    document.write('A');
};

A.prototype = new C();

A.prototype.c = function () {
    document.write(1);
};

B = function() {
    this.base();
}

B.prototype = new A();
B.prototype.base = A;

B.prototype.c = function () {
    this.base.prototype.c();
    
    document.write(2);
};

B.prototype.cc = function() {
    
    A.prototype.cc.call();
    
    document.write('b');
    
};

var b = new B();
//b.c();


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
/* End of file Static_class.php */
/* Location: ./system/application/views/qunit/core/Static_class.php */