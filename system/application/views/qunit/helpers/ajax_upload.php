<?php
/**
 * ajax_upload Unit Test
 *
 * @package             KALS
 * @category		Webpage Application QUnit
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 上午 12:17:29
 */

load_toolkit(); //讀取常用工具
load_core();    //讀取核心物件
load_styles();
?>
<script type="text/javascript">
QUNIT_TITLE = "ajax_upload";
//QUNIT_ASSERT = 5;

function do_upload(_userfile) {
    var _url = 'user_profile/upload_photo';
    
    KALS_util.ajax_upload(_url, _userfile, function () {
        
        test_equals(true, true, '上傳成功');
        
    });
}

function do_crop()
{
    var _data = CROP_DATA;
    $.test_msg('data', _data);
    $.test_msg('url', 'user_profile/edit_photo');
    KALS_util.ajax_get('user_profile/edit_photo', _data, function () {
        test_equals(true, ture, '編輯完成');
    }); 
}

$(function() {



test("ajax_upload", function() {

    var showCoords = function (c) {
        if (c.w != 0 && c.h != 0)
        {
            
            var data = {
                height: c.h,
                width: c.w,
                x_axis: c.x,
                y_axis: c.y
            };
            
            CROP_DATA = data;
            $('#data').val($.json_encode(data));
            
            var rx = 100 / c.w;
	        var ry = 100 / c.h;
        
        	$('.preview').css({
        		width: Math.round(rx * $('.photo-temp').width()) + 'px',
        		height: Math.round(ry * $('.photo-temp').height()) + 'px',
        		marginLeft: '-' + Math.round(rx * c.x) + 'px',
        		marginTop: '-' + Math.round(ry * c.y) + 'px'
        	});
        }
    };

    /*
    $('.photo-temp').Jcrop({
        aspectRatio: 1,
        onChange: showCoords,
        onSelect: showCoords
    });
    */ 
   
    /**
     * 由於jQuery Jcrop不符合jQuery 1.9以上，所以移除
     */
//    var jcrop_api = $.Jcrop('.photo-temp', {
//        aspectRatio: 1,
//        onChange: showCoords,
//        onSelect: showCoords
//    });
//    
//    setTimeout(function () {
//        var photo = $('.photo-temp');
//        var width = photo.width();
//        var height = photo.height();
//        
//        if (width < height)
//        {
//            jcrop_api.setSelect([0,0, width, width]);
//        }
//        else
//        {
//            jcrop_api.setSelect([0,0, height, height]);
//        }
//        
//        jcrop_api.enable();
//        
//    }, 0);
    

}); //$(function() {

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

<input type="file" onchange="do_upload(this);" onfocus="this.value='';" />
<div>

    <div style="width: 100px;height: 100px;overflow:hidden; margin-left: 5px;float:right">
        <img src="/CodeIgniter_1.7.2/user_photo/225_temp.jpg" class="preview" style="float:none;" />
    </div>

    <img src="/CodeIgniter_1.7.2/user_photo/225_temp.jpg" class="photo-temp" />

</div>
<input type="text" name="data" id="data" size="50" />
<button onclick='do_crop()'>CROP!</button>
<?php


/* End of file ajax_upload.php */
/* Location: ./system/application/views/qunit/core/ajax_upload.php */