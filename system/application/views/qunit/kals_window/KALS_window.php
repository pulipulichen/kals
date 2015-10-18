<?php
/**
 * KALS_window Unit Test
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
//@load_scripts('KALS_window', $load_raw);

load_package();    //讀取全部元件

?>
<script type="text/javascript">
QUNIT_TITLE = "KALS_window";
QUNIT_ASSERT = 14;
if ($.is_mobile_mode())
{
    QUNIT_ASSERT += 2;
}

//如果有需要指定要測試的項目的話，請使用這個方法
//unit(3, false);

//0: KALS_window
unit(function () {
    
    //先確定KALS_window要載入
    var timer = setInterval(function () {
        
        if (typeof(KALS_window) == 'object')
        {
            clearInterval(timer);
            KALS_context.reset(function () {
                unit();    
            });
        }
    }, 1000);
});
unit(function () {
    
    var _content = new Window_content();
    
    _content.heading = new KALS_language_param(
        '視窗的標題',
        'authentication.logout_error.heading'
    );
    
    _content._$create_ui = function () {
        
        return $('<div class="test-content">' + $('.input').html() + '</div>');
        
    };
    
    KALS_window.setup_window(_content, function () {
        
        var _ui = KALS_window.get_ui();
        if ($.is_mobile_mode())
        {
            
            test_equals((_ui.width() < 321), true
                , '手機模式下，視窗模式有沒有小於321？');
            
            test_equals(_ui.offset().top, 0
                , '手機模式下，視窗模式有沒有對到頭？');    
        }
        
        //$.test_msg('沒有出來嗎？');
        
        test_equals(KALS_window.is_opened(), true,
            'KALS_window開啟了');
        
        test_equals($('.window .dialog-heading').html()
            , '視窗的標題'
            , '視窗標題正確顯示');
        
        test_equals($('.test-content:visible').html()
            , $('.input').html()
            , '視窗內容正確顯示');
            
        unit();
    });
});

unit(function () {
    
    setTimeout(function() {
        
        KALS_window.toggle_loading(true, function () {
            
            
            test_equals($('.window-loading').css('display'), 'block',
                    '是否有顯示讀取中？');
            
            KALS_window.close(function () {
                
                test_equals(KALS_window.is_opened(), false,
                    'KALS_window關閉了');
                
                unit();
            });
            
        });
        
            
        
    }, 1000);
    
});

unit(function () {
    
    var _content = new Window_content();
    
    _content.heading = new KALS_language_param(
        '視窗的標題2',
        'authentication.register_error.heading'
    );
    
    _content._$create_ui = function () {
        
        return $('<div class="test-content">' + $('.input2').html() + '</div>');
        
    };
    
    var _submit = new Window_content_submit();
    _submit.url = 'authentication/check_user';
    _content.submit = _submit;
    
    //$.test_msg('ok?');
    KALS_window.setup_window(_content, function () {
        
        //return;
        
        test_equals(KALS_window.is_opened(), true,
            'KALS_window開啟了');
        
        test_equals($('.window .dialog-heading').html()
            , '視窗的標題2'
            , '視窗標題2正確顯示');
        
        test_equals($('.test-content:visible').html()
            , $('.input2').html()
            , '視窗內容2正確顯示');
            
        test_equals($('.window-content-submit:visible').length
            , 1
            , '有顯示遞交按鈕');
        
        unit();
    });
    
    setTimeout(function () {
        test_equals($('.window-content-submit:visible').length, 0,
            '還沒讀取完成之前，應該是看不到window-content-submit按鈕');    
            
    }, 500);
    
    
});

unit(function () {
    
    setTimeout(function() {
        
        $('.window .dialog-options .dialog-option').click();
        $('.window .dialog-options .dialog-option').click();
        $('.window .dialog-options .dialog-option').click();
        
        setTimeout(function () {
            test_equals($('#notify_modal .wrapper div').length, 1,
                '就算點三次，應該還是只有出現一次成功！');    
                
            unit();
        }, 2000);
        
    }, 1000);
    
});

unit(function () {
    
    var _content = new Window_content();
    
    _content.heading = new KALS_language_param(
        '視窗的標題3',
        'authentication.register_error.heading'
    );
    
    _content._$create_ui = function () {
        
        return $('<div class="test-content">' + '隨便設定內容的視窗' + '</div>');
        
    };
    
    var _submit = new Window_content_submit();
    //_submit.url = 'authentication/check_user';
    _content.submit = _submit;
    
    //$.test_msg('ok?');
    KALS_window.setup_window(_content, function () {
        
        test_equals($('.window-content-submit:visible').length, 0,
            '因為沒有設定submit url，所以應該只會顯示關閉按鈕');    
        
        test_equals($('.window .dialog-toolbar .dialog-option').html()
            , $('.window .dialog-options:first .dialog-option:first').html()
            , '檢查設定按鈕的顯示資料是否跟toolbar的相同');
        
        setTimeout(function () {
            
            KALS_window.close();
            unit();
            
        }, 3000);
            
        
    });
    
});
unit(function () {
    
    var _content = new Window_content();
    
    _content.heading = new KALS_language_param(
        //'視窗的標題: 測試寬度！',
        '視窗視窗視窗',
        'authentication.register_error.heading'
    );
    
    _content._$create_ui = function () {
        
        return $('<div class="test-content">' + $('.input').html() + '</div>');
        
    };
    
    _content.width = 320;
    
    
    KALS_window.setup_window(_content, function () {
        
        
        setTimeout(function () {
            
            if ($.is_tiny_width()){
                test_equals(KALS_window.get_ui().width(), $.get_viewport_width(),
                    '視窗寬度是否有如設定般的一樣？');
            }
            else{
                test_equals(KALS_window.get_ui().width(), 320,
                    '視窗寬度是否有如設定般的一樣？');    
            }
                
            setTimeout(function () {
                
                KALS_window.close();
                unit();
                
            }, 3000);
            
        
        }, 1000);
        
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

<div class="input"><p>過去以消費筆電兼顧商用市場的華碩，首度劃分出專屬的商用系列產品線，來強化在企業用戶心中的專業印象。</p> 
<p>華碩今(1)日正式發表B、P系列兩個商用筆電產品線，推出B53J/P42F/P52F共3款新機。B系列鎖定中大型企業，有較完整的安全機能，並有獨顯機種能同時輸出畫面至三個螢幕，價位在4萬至6萬元；P系列主打小型企業，規格與功能略低，定價3萬至4萬。</p> 
<p>在B、P系列可以看到許多過去在外商品牌筆電上才有的商用特色，包括：強調穩重形象的黑色方正機身、防眩光的霧面螢幕、防潑水鍵盤、smart card插槽、擴充底座、3年保固等，而且針對20台以上的採購，將可提供客製處理器、記憶體、硬碟及WiMAX/3G上網模組等規格。</p> 
<p>華碩B、P兩條商用筆電產品線的定位區分，也不免令人聯想到兩大外商品牌的商用筆電。像是惠普(HP)的EliteBook、ProBook系列，或是聯想(Lenovo)的T、R系列，都是分屬高階與中低階等級，功能與價位亦有明顯區隔。由此不難猜到，華碩商用筆電所預設的對手是誰。</p> 
<p>不過，華碩現在商用筆電的陣容顯然還不夠齊全，無法與對手全面對抗。今天發表的三款產品只有14、15.6吋兩種尺寸，向下缺乏訴求輕薄行動力的12、13吋機種(如聯想X系列)，向上也不見能取代桌機的高效能行動工作站(如惠普workstation系列)。</p> 
<p>再者，商用品牌的形象建立也非一蹴可及，仍有待時間的累積與市場的考驗。</p> 
<p><!-- img src="http://taiwan.cnet.com/sharedmedia/product/zdnet/2010/09/asusp42f.jpg" alt="" --><br> 
華碩P42F商用筆電</p> </div>

<div class="input2">
<p>台灣Android手機價格屢創新低，已經從9千有找降至7千元有找，將有助於智慧型手機進ㄧ步普及。</p> 
<p>台灣大哥大今(31)日發表自有品牌第二款Android手機T2，上市空機價僅6990元，為目前市場最低，並刷新前代T1於今(10)年二月創下的8990元低價紀錄。台哥大T2低價的關鍵，除部分規格稍差(2.8吋電阻式觸控螢幕、320萬畫素相機)之外，可能也跟此次是由中國廠商中興(ZTE)代工有關。</p> 
<p>台灣大哥大個人用戶事業群營運長賴弦五表示，台哥大的自有品牌策略向來是要滿足手機廠商無法滿足的部分。由於跟廠商有合作關係，該公司能提前看到半年後才要推出的產品，就會去研究有何市場空缺，能用自有品牌來補足。而現在最缺的，仍舊是低價的智慧型手機。</p> 
<p>賴弦五預估，隨著產品價格逐漸下滑，台灣明年智慧型手機滲透率將從今年的30%提高到40%，而且在5千至1萬價位帶的成長將最明顯；低於5千元的產品則可能在2011年底就會出現，並藉此將讓智慧型手機滲透率在2012年到達50%。</p> 
<p>此外，台哥大也不排除未來以自有品牌推出平板產品，預定明年第一季會先跟廠商合推Gingerbread(下一版Android代號)平板，之後再視市場情況，考慮是不是要用自有品牌推出更低價產品。相對來說，遠傳跟中華電信就顯得比較性急，兩者都已表示計畫將在年底前推出平板產品。</p> 
<p>賴弦五對此表示，「平板的關鍵不是誰先推，而是誰能符合用戶需求。」他認為Android 2.2(含)以前版本，支援的解析度還無法設計出讓人滿意的平板產品，所以儘管知道年底前就會有Android平板上市，但該公司並不打算搶在前頭，寧可等待明年搭載Gingerbread的產品。</p> 
<p><!-- img src="http://taiwan.cnet.com/sharedmedia/product/zdnet/2010/0813/twm_t2.jpg" alt="" --><br> 
  <strong>台哥大T2，是首款上市價即低於7千的Android手機</strong></p> 
</div>
<button type="button" disabled=''
<?php
/* End of file KALS_window.php */
/* Location: ./system/application/views/qunit/core/KALS_window.php */