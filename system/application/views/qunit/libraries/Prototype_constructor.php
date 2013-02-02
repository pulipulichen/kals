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

/*    
function A() {
    
    document.write('[Call A's constructor]');
}

A.prototype.constructor = A;

A.prototype.callback = null;
A.prototype.c = function () {
    
    if (typeof(this.callback) == 'function')
        this.callback();
    
};

function B() {
    
    document.write('[Call B's constructor]');
    
};

//document.write(A.prototype);
//B.prototype = new Object(A.prototype);
//B.prototype = new A();
B.prototype = A.prototype;

B.prototype.constructor = B;

B.prototype.c = function (_callback) {
    
    
    document.write('done');
    this.callback = _callback;
    
    A.prototype.c.call(this, _callback);
    
    document.write('done');
    
};

var b = new B();

b.c(function() {
    
    document.write('ready');
    
});
*/

//建立類別A，以下是建構子(constructor)
function A() {
    //在畫面中輸出[Call A's constructor]，表示執行A的建構子
    document.write("[Call A's constructor]");
}

//A的方法，稍後會給B繼承
A.prototype.method = function () {
    //表示執行A的方法
    document.write("[Hello, world!]");
};

//建立類別B，以下是建構子
function B() {
    //在畫面中輸出[Call B's constructor]，表示執行B的建構子
    document.write("[Call B's constructor]");
}

//prototype方式的繼承。注意，此處呼叫了A類別的建構子
B.prototype = new A();    //畫面輸出[Call A's constructor]

//實體化類別B到變數b中
var b = new B();    //畫面輸出[Call B's constructor]

//呼叫由類別A繼承來的方法
b.method();    //畫面輸出[Hello, world!]

function test() {
    var private1 = "I'm private variable 'private1'!";//私有成員變數
    this.public1 = "I'm public valiable 'public1'!";//公開成員變數
    function getPrivateFriend() {//私有成員函數
        alert(private1);
    }
    this.getPrivatePublic = function() {//公開成員函數
        getPrivateFriend();
    }
}

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