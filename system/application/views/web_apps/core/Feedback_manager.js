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

Feedback_manager.prototype.init = function () {
	
	var _base_url = KALS_context.get_base_url();
	
	Feedback({
        h2cPath:'js/html2canvas.js',
        url: _base_url + '/feedback'
    });
};

/* End of file Feedback_manager */
/* Location: ./system/application/views/web_apps/Feedback_manager.js */