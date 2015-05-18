<?php
/**
 * KALS_authentication Unit Test
 *
 * @package             KALS
 * @category		Webpage Application QUnit
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 上午 12:17:29
 */

//load_toolkit(); //讀取常用工具
//load_core();    //讀取核心物件
load_package();
?>
<script type="text/javascript">
QUNIT_TITLE = "KALS_authentication";
QUNIT_ASSERT = 8;

unit(function () {
    
    test_equals( KALS_context.user.get_name()
        , null
        , "先看看user裡面有沒有資料……應該是沒有" );
        
    unit();
});

unit(function () {
    //嘗試登入
    
    //var email = 'puddingchen.35@gmail.com';
    var email = 'auth@test.kals.idv';
    var name = 'auth';
    //KALS_context.base_url = '<?= base_url() ?>/web_apps/';
    
    KALS_context.auth.set_email(email);
    KALS_context.auth.set_embed(true);
    
    var _lock = true;
    KALS_context.auth.login(function () {
        
        _lock = false;
        
        test_equals( KALS_context.user.get_name()
            , name
            , "登入之後，再看看user裡面有沒有資料……應該是有了" );
            
        test_equals( $.json_encode(KALS_context.user.get_name())
            , 'is_string'
            , "登入之後，檢查看看user attr get_name()，是否有資料" );
        
        unit();
    });
    
    setTimeout(function () {
        if (_lock == true)
        {
            test_equals(_lock, false
                , '沒有成功登入');
        }
    }, 3000);
}); 


unit(function() {
    //確認伺服器上的資料
    
    var id = KALS_context.user.get_id();
        
    var url = 'authentication/check_user';
    KALS_util.ajax_get({
        url: url, 
        callback: function (data) {
            test_equals(data.user.id
                , id
                , '確認User是否存在Session當中了？result->session / expected->剛剛取得的id ('+id+')');
            unit();    
        }
    });
});

unit(function () {
    //嘗試登出
    var url = 'authentication/check_user';
     KALS_context.auth.logout(function () {
         
         //$.test_msg('unit logout, 登出完畢');
         KALS_util.ajax_get({
             url: url, 
             callback: function (data) {
                 
                test_equals(data.user.id
                    , null
                    , '登出之後，確認User是否不存在Session當中了？result->session / expected->null');
                    
                unit();
            }
        });    //KALS_util.ajax_get(url, function (data) {
     });    //KALS_context.auth.logout(function () {
});

unit(function () {
    KALS_context.reset(function () {
        //先把資料清空
        
        unit();
        
    });
});

unit(function() {
    
    //以下是錯誤情況的測試
    
    KALS_context.auth.set_embed(false);
    KALS_context.auth.login(function () {
        test_equals(false, true, '應該會登入錯誤，此訊息不該出現');
    });
    
    setTimeout(function () {
        test_equals($('.dialog-modal').exists()
            , true
            , '密碼沒有輸入，確認有錯誤訊息。');
            
        
            var _heading = $('.dialog-modal:visible .dialog-heading').html();
               
            //載入語系
            KALS_context.load(function () {
                
                
               setTimeout(function () {
                    test_not_equals(_heading, $('.dialog-modal:visible .dialog-heading').html()
                        , '載入語系檔案之後，標頭應該有所改變');
                    
                    setTimeout(function () {
                        $('.dialog-modal .close').click();
                        unit();
                    }, 2000);     
               }, 1000); 
                    
            });
            
        
          
    }, 1000);
});

unit(function () {
    
    test_equals(location.href.indexOf('modal='), -1
        , '關閉Dialog之後，hash也要切掉。');
    
    unit();
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

<?php
/* End of file KALS_authentication.php */
/* Location: ./system/application/views/qunit/core/KALS_authentication.php */