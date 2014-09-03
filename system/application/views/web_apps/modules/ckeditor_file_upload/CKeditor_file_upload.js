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
 * @version 20140902 Pulipuli Chen
 */
CKeditor_file_upload.php_file_host = function () {
    
    var _btn = $(".cke_dialog_ui_button.upload_to_server");
    
    var _classname = "uploading";
    
    if (_btn.hasClass(_classname)) {
        return;
    }
    
    var _php_file_host_upload_url = KALS_CONFIG.modules.CKeditor_file_upload.upload_url;
    var _php_file_host_get_link_url = KALS_CONFIG.modules.CKeditor_file_upload.get_link_url;
    
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
            if ($.starts_with(_data, "http")) {
                window.CKEDITOR.tools.callFunction(1, _data, '');
            }
            else {
                var _line = KALS_context.lang.line("ckeditor.php_file_host.upload_error");
                alert(_line + ": " + _data);
            }
            _btn.removeClass(_classname);
        }
    };
    KALS_util.ajax_click_upload_file(_config);
    return this;
};

/* End of file CKeditor_file_upload */
/* Location: ./system/application/views/web_apps/modules/ckeditor_file_upload/CKeditor_file_upload.js */