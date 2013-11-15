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

/**
 * @type Feedback
 */
Feedback_manager.prototype._feedback = null;

Feedback_manager.prototype.init = function () {
	
	var _base_url = KALS_context.get_base_url();
	
	var _lang = KALS_context.lang;
	
	//$.test_msg('feedback init', _lang.line('feedback.ui.label'));
	
	this._feedback = Feedback({
        h2cPath:'js/html2canvas.js',
        url: _base_url + '/feedback',
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
};

/* End of file Feedback_manager */
/* Location: ./system/application/views/web_apps/Feedback_manager.js */