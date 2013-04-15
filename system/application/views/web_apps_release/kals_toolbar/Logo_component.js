/**
 * Logo_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license	   http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/9/16 上午 10:57:25
 * @extends {KALS_user_interface}
 */
function Logo_component() {
    
    KALS_user_interface.call(this);

}

Logo_component.prototype = new KALS_user_interface();

Logo_component.prototype._$create_ui = function () {
    
    var _ui = $('<div class="logo-component">' + KALS_CONFIG.logo + '</div>');
    //var _ui = $('<div class="logo-component" style= "display:inline ">' + KALS_CONFIG.logo + '</div>' + '<div class="imp-component" style= "display:inline ">' + KALS_CONFIG.imp + '</div>'+ '<div class="exp-component" style= "display:inline ">' + KALS_CONFIG.exp + '</div>'+ '<div class="lnk-component" style= "display:inline ">' + KALS_CONFIG.lnk + '</div>'+ '<div class="ben-component" style= "display:inline ">' + KALS_CONFIG.ben + '</div>'+ '<div class="sum-component" style= "display:inline ">' + KALS_CONFIG.sum + '</div>');
    
    return _ui;
};

/* End of file Logo_component */
/* Location: ./system/application/views/web_apps/Logo_component.js */