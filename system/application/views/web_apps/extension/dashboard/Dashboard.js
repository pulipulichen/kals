/**
 * Dashboard
 *
 * 結合樣板的控制器
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2011/11/19 下午 03:36:17
 * @extends {KALS_controller_window}
 */
function Dashboard() {
    KALS_controller_window.call(this);
}

/**
 * ===========================
 * 開頭宣告
 * ===========================
 */

Dashboard.prototype = new KALS_controller_window();

/**
 * ===========================
 * 請覆寫的屬性
 * ===========================
 */

/**
 * 此類別要讀取的url網址。
 * ※ 請覆寫這個類別
 * 
 * 要注意的是，前置基本網址會在KALS_util.ajax_get當中自動加入，所以此處並不需要前置網址
 * 例如：load_url = 'login';
 * 實際上送出時會變成 'http://192.168.11.2/CodeIgniter_1.7.2/web_apps/login'
 * @type {string}
 * @protected
 */
Dashboard.prototype._$model = 'dashboard';

Dashboard.prototype._$view = 'extension/dashboard/view/Dashboard';

Dashboard.prototype._$open_request_action = 'init';

Dashboard.prototype._$enable_debug = true;

Dashboard.prototype._$auth_allow_anonymous = true;

Dashboard.prototype.name = 'Dashboard';

Dashboard.prototype.heading = new KALS_language_param (
    'Dashboard',
    'window.dashboard.heading'
);

Dashboard.prototype.nav_heading = new KALS_language_param (
    'Dashboard',
    'window.dashboard.heading'
);

Dashboard.prototype.open_last_annotation = function () {
	var _id = this.get_field("last_annotation_id");
	KALS_text.tool.view.load_view(_id);
};

Dashboard.prototype.setup_activity = function (_ele) {
	var _activity = this.get_field('activity').toLowerCase();
        _ele.attr('className', 'activity-' + _activity);
};

Dashboard.prototype.open_recent_annotation = function() {
	this.close(function () {
		KALS_context.search.open_recent_annotation();
	});
	
};

/* End of file Dashboard */
/* Location: ./system/application/views/web_apps/extension/dashboard/Dashboard.js */