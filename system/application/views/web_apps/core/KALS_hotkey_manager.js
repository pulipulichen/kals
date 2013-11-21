/**
 * KALS_hotkey_manager
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/21 下午 02:28:30
 * @extends {Multi_event_dispatcher}
 */
function KALS_hotkey_manager(){
   
   Event_dispatcher.call(this);
   
   var _this = this;
   setTimeout(function () {
       $("body").keydown(function (_event) {
           var _key = _event.which;
           if (_this.has_type(_key)) {
               _this.notify_listeners(_key);
           }
       });
   }, 0);
}

KALS_hotkey_manager.prototype = new Multi_event_dispatcher(); 

KALS_hotkey_manager.prototype.register_hotkey = function (_hotkey, _listener) {
    return this.add_listener(_hotkey, _listener);
};

/* End of file KALS_hotkey_manager */
/* Location: ./system/application/views/web_apps/KALS_hotkey_manager.js */