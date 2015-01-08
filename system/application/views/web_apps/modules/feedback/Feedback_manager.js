/**
 * Feedback_manager
 * 設置意見回饋
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/16 下午 03:38:58
 */
function Feedback_manager() {
	
}

Feedback_manager.prototype = new Navigation_item_link();

Feedback_manager.prototype.name = "Feedback_manager";

/**
 * @type Feedback
 */
Feedback_manager.prototype._feedback = null;

Feedback_manager.prototype.init = function () {
	
    var _base_url = KALS_context.get_base_url();
    var _libraries_url = KALS_context.get_library_url();

    var _lang = KALS_context.lang;

    //$.test_msg('feedback init', _lang.line('feedback.ui.label'));

    this._feedback = Feedback({
        //h2cPath: 'js/html2canvas.js',
        h2cPath: _base_url + 'libraries/feedback.js/html2canvas.js',
        url: _base_url + 'feedback',
        label: _lang.line('feedback.ui.label'),   //"Send Feedback";
        header: _lang.line('feedback.ui.header'),   //"Send Feedback";
        nextLabel: _lang.line('feedback.ui.nextLabel'),   //"Continue";
        reviewLabel: _lang.line('feedback.ui.reviewLabel'),   //"Review";
        sendLabel: _lang.line('feedback.ui.sendLabel'),   //"Send";
        closeLabel: _lang.line('feedback.ui.closeLabel'),   //"Close";
        messageSuccess: _lang.line('feedback.ui.messageSuccess'),   //"Your feedback was sent succesfully.";
        messageError: _lang.line('feedback.ui.messageError'),   // "There was an error sending your feedback to the server.";
        issueLabel: _lang.line('feedback.ui.issueLabel')   //  "Please describe the issue you are experiencing";
    });
};

Feedback_manager.prototype.open = function () {
    this._feedback.open();
    //$(".feedback-btn.KALS").click();
};

Feedback_manager.prototype.nav_heading = new KALS_language_param (
    'Feedback',
    'toolbar.navigation_list.feedback'
);

/**
 * 導覽列相關的設定
 * @type JSON
 */
Feedback_manager.prototype.nav_config = {
    /**
     * 顯示資料 
     * @type Boolean
     */
    display: true,
    
    /**
     * 決定顯示導覽列的位置
     * 
     * 類型包括：
     * - common: 不管什麼類型都會顯示(在以下三種類型中都會顯示)
     * - login: 已經登入的使用者就會顯示
     * - profile: 以手動登入的使用者才會顯示
     * - embed: 以內嵌登入的使用者才會顯示
     * - anonymous: 未登入的使用者才會顯示
     * @type String
     */
    nav_type: "common",
    
    /**
     * 排序順序
     * 
     * 數字越大，越往左邊靠
     * 數字最小的是1
     * @type Number
     */
    order: 1
};

/**
 * 檢測是否是獨立視窗
 * 
 * 搭配模組化使用
 * @returns {Boolean}
 */
Feedback_manager.prototype.is_absolute = function () {
    return false;
};

/* End of file Feedback_manager */
/* Location: ./system/application/views/web_apps/Feedback_manager.js */