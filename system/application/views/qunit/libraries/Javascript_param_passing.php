<?php
/**
 * Javascript_param_passing Unit Test
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
//@load_scripts('Javascript_param_passing', $load_raw);

load_package();    //讀取全部元件

?>
<script type="text/javascript">
QUNIT_TITLE = "Javascript_param_passing";

//0: Javascript_param_passing
unit(function () {

/*
//宣告變數，資料類型為字串
var paramA = true;

//確認變數資料
document.write(paramA + '<br />');    //輸出 original

//定義函數，在函數中修改參數資料，並且輸出做確認
function changeParamA(paramA)
{
    //修改參數
    paramA = false;
    
    //確認被修改之後的參數資料
    document.write(paramA + '<br />');    //輸出 changed
}

//在函數中修改參數
changeParamA(paramA);    //在函數中運作，輸出 changed

//被函數修改之後，仍然維持原本的資料
document.write(paramA + '<br />');    //輸出 original
*/
// --------
/*
//宣告變數，資料類型為物件
var paramB = {
    attr: 'original'
};

//確認變數資料
document.write(paramB.attr + '<br />');    //輸出 original

//定義函數，在函數中修改參數資料，並且輸出做確認
function changeParamB(paramB)
{
    //修改參數。注意修改的方式，是直接指定物件的屬性進行修改，而非建立新的物件。
    paramB.attr = "changed";
    
    //確認被修改之後的參數資料
    document.write(paramB.attr + '<br />');    //輸出 changed
}

//在函數中修改參數
changeParamB(paramB);    //在函數中運作，輸出 changed

//被函數修改之後，物件的屬性也跟著改變了
document.write(paramB.attr + '<br />');    //輸出 changed
*/
// --------

/*
//宣告變數，資料類型為物件
var paramC = {
    attr: 'original'
};

//確認變數資料
document.write(paramC.attr + '<br />');    //輸出 original

//定義函數，在函數中修改參數資料，並且輸出做確認
function changeParamC(paramC)
{
    //修改參數。注意修改的方式，是建立新的物件，而新的物件裡面也包含attr屬性。
    paramC = {
        attr: 'changed'
    };
    
    //確認被修改之後的參數資料
    document.write(paramC.attr + '<br />');    //輸出 changed
}

//在函數中修改參數
changeParamC(paramC);    //在函數中運作，輸出 changed

//被函數修改之後，仍然維持原本的資料
document.write(paramC.attr + '<br />');    //輸出 original
*/

//宣告變數，資料類型為陣列
var paramAry = ['original'];

//確認變數資料
document.write(paramAry[0] + '<br />');    //輸出 original

//定義函數，在函數中修改參數資料，並且輸出做確認
function changeParamAry1(paramAry)
{
    //修改參數。注意修改的方式，是建立新的陣列。
    paramAry = ['changed'];
    
    //確認被修改之後的參數資料
    document.write(paramAry[0] + '<br />');    //輸出 changed
}

function changeParamAry2(paramAry)
{
    //修改參數。注意修改的方式，是修改陣列裡面的索引，而非建立新的陣列。
    paramAry[0] = 'changed';
    
    //確認被修改之後的參數資料
    document.write(paramAry[0] + '<br />');    //輸出 changed
}

//在函數中修改參數
changeParamAry1(paramAry);    //在函數中運作，輸出 changed

//被函數修改之後，仍然維持原本的資料
document.write(paramAry[0] + '<br />');    //輸出 original

//在函數中修改參數
changeParamAry2(paramAry);    //在函數中運作，輸出 changed

//被函數修改之後，參數的資料已經被修改
document.write(paramAry[0] + '<br />');    //輸出 changed


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
/* End of file Javascript_param_passing.php */
/* Location: ./system/application/views/qunit/core/Javascript_param_passing.php */