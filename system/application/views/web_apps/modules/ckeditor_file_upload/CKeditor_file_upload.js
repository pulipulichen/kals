/**
 * CKeditor_file_upload
 *
 * CKeditor上傳檔案修改
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2014/9/3 下午 03:36:17
 * @extends {KALS_controller_window}
 */
function CKeditor_file_upload() {
    // 繼承宣告的步驟之一
    KALS_controller_window.call(this);
}

/**
 * ===========================
 * 開頭宣告
 * ===========================
 */

/**
 * 繼承自KALS_controller_window
 * 
 * KALS_controller 是部分元件
 * KALS_controller_window 是獨立視窗
 */
CKeditor_file_upload.prototype = new KALS_controller_window();

/**
 * 指定Module的名稱
 * 
 * 也是顯示在Hash的名稱。如果是null，則會顯示KALS_modal._$modal_name
 * @type String
 */
CKeditor_file_upload.prototype.name = 'ckeditor_file_upload';

/**
 * 開啟檔案上傳的功能，但只是個空殼子
 * 如果有設定上傳網址才這樣做
 * 
 * @version 20140902 Pulipuli Chen
 * @type String
 */
if (typeof(KALS_CONFIG.modules.CKeditor_file_upload.enable) === "boolean" 
        && KALS_CONFIG.modules.CKeditor_file_upload.enable === true) {
    KALS_CONFIG.ckeditor_config.filebrowserUploadUrl = '_blank';
}

/**
 * 設定檔案上傳功能
 */
CKeditor_file_upload.php_file_host = function () {
    
    var _btn = $(".cke_dialog_ui_button.upload_to_server");
    
    var _classname = "uploading";
    
    if (_btn.hasClass(_classname)) {
        return;
    }
    
    //$.test_msg(_btn.length);
    
    //window.CKEDITOR.tools.callFunction(1, '/ckfinder/userfiles/files/app.png', '');
    
//    if (typeof(window.CKEDITOR) === "object"
//            && typeof(window.CKEDITOR.php_file_host) !== "function") {
//        window.CKEDITOR.php_file_host = function () {
//            //$.test_msg("rewe");
//            this.tools.callFunction(1, '/ckfinder/userfiles/files/app.png', '');
//        };
//    }
//    
//    var myDefinition = window.CKEDITOR.tools.extend( {}, elementDefinition );
//    var onClick = myDefinition.onClick;
//    
    //$.test_msg("rewe");
//    //var target = elementDefinition[ 'for' ];		// [ pageId, elementId ]
//    if ( !onClick || onClick.call( this, evt ) !== false )
//    {
//            //dialog.getContentElement( target[0], target[1] ).submit();
//            this.disable();
//    }

    // 1. 把表單放上去
    var _php_file_host_upload_url = KALS_CONFIG.modules.CKeditor_file_upload.upload_url;
    var _php_file_host_get_link_url = KALS_CONFIG.modules.CKeditor_file_upload.get_link_url;
    /*
    var _form_html = '<form action="' + _php_file_host_upload_url + '" method="post" enctype="multipart/form-data" style="display:none;"><input class="fileupload" type="file" name="file"><input name="local_upload" type="hidden" value="1" />' 
            //+ '<div id="progress" class="progress"><div class="progress-bar progress-bar-warning"></div></div>'
            //+ '<button type="submit">遞交</button>'
            + '</form>';
    
    var _form = $(_form_html);
    
    //$.test_msg(_form_html);
    
    //_btn.css("border", "4px solid red");
    
    
    _btn.after(_form);
    
    var _file_input = _form.find(".fileupload");
    
    
    //_form.submit(function () {
    var _upload = function () {
        var _config = {
            url: _php_file_host_upload_url,
            get_link_url: _php_file_host_get_link_url,
            userfile: _file_input,
            callback: function (_data) {
                //$.test_msg("form submit callback", _data);
                window.CKEDITOR.tools.callFunction(1, _data, '');
            }
        };
        //$.test_msg("form, submit", _option);
        KALS_util.ajax_upload(_config);
        //return false;
    //});
    };
    
    
    _file_input.change(_upload);
    _file_input.click();
    
    //setTimeout(function () {
    //    _form.submit();
    //}, 100);
    
    // 2. jQuery File Uploader化
    // 最小化安裝 https://github.com/blueimp/jQuery-File-Upload/wiki/Basic-plugin
    
//    _form.fileupload({
//        dataType: 'json',
//        done: function (_e, _data) {
//            $.test_msg("fileupload done", _data);
//            //$.each(_data.result.files, function (_index, _file) {
//            //    $.test_msg("ok?", _file.name);
//            //});
//        }
//    });
    
    // 3. 點下選擇檔案的按鈕
    
    //window.CKEDITOR.tools.callFunction(1, '/ckfinder/userfiles/files/app.png', '');
    //window.OnUploadCompleted(1, '/ckfinder/userfiles/files/app.png', '');
    */
    var _config = {
        url: _php_file_host_upload_url,
        get_link_url: _php_file_host_get_link_url,
        cross_origin: true,
        input_name: "file",
        exception_handle: function (_exception) {
            var _respond = $.json_decode(_exception.response);
            var _message = _respond.text;
            
            var _line = KALS_context.lang.line("ckeditor.php_file_host.upload_error");
            alert(_line + ": " + _message);
            
            _btn.removeClass(_classname);
        },
        change: function () {
            //alert(44444);
            _btn.addClass(_classname);
        },
        callback: function (_data) {
            //alert(121212);
            window.CKEDITOR.tools.callFunction(1, _data, '');
            _btn.removeClass(_classname);
        }
    };
    KALS_util.ajax_click_upload_file(_config);
    return this;
};

/* End of file CKeditor_file_upload */
/* Location: ./system/application/views/web_apps/modules/ckeditor_file_upload/CKeditor_file_upload.js */