<?php
/**
 * Base_override_function Unit Test
 *
 * @package             KALS
 * @category		Webpage Application QUnit
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 上午 12:17:29
 */

//load_toolkit();     //讀取常用工具
//load_core();        //讀取核心類別
//load_component();   //讀取元件類別
//@load_scripts('Base_override_function', $load_raw);

@load_scripts('libraries/Base', $load_raw);

?>
<script type="text/javascript">
QUNIT_TITLE = "Base_override_function";
//QUNIT_ASSERT = 5;

//如果有需要指定要測試的項目的話，請使用這個方法
//unit(1, false);

//0: Base_override_function
unit(function () {

    var A = Base.extend({
        t: function () {
            return 'a';
        }
    });
    
    var B = A.extend({
        t: function () {
            return 'b';
        }
    });

    var b = new B();
    var a = new A();
    

    test_not_equals( a.t()
        , b.t()
        , "Base_override_function" );
    
    unit();
});

unit(function () {
    
    /**
     * @extends {Base}
     */
    var A = function () {};
    A.prototype = {
        /**
         * TTT
         */
        t: function () {
            document.write('[A]');
        },
        /**
         * AAA
         * @memberOf {A}
         */
        afunc: function () {
            document.write('[afunc]');
        }
    };
    
    /**
     * @type {A} A
     */
    A = Base.extend(A.prototype);
    //kals_extend(Base, A);
    var a = new A();
    
    /**
     * B class!
     * @extends {A}
     */
    var B = function () {};
    B.prototype = {
        /**
         * BBB
         */
        t: function () {
            this.base();
            document.write('[B]');
        },
        bfunc: function () {
            document.write('[bfunc]');
        }
    };
    //B = A.extend(B.prototype);
    kals_extend(A, B);
    
    //kals_extend(A, B);
    var b = new B();
    b.bfunc();
    
});

function kals_extend(ancestor, child) {
    
    //child = ancetor.extend (child.protype);
    /*
    if (child == null)
    {
        ancestor.prototype = Base.extend(ancestor.prototype);
    }
    else
        child.protype = ancestor.extend(child.protype);
    */
   
    var obj = ancestor.extend(child.prototype);
    
    for (var key in child) 
    {
        delete child[key];
    }
    
    for (var key in obj)
    {
        child[key] = obj[key];
    }
}

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
/* End of file Base_override_function.php */
/* Location: ./system/application/views/qunit/core/Base_override_function.php */