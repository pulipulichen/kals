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
   
   this.init_hotkey();
}

KALS_hotkey_manager.prototype = new Multi_event_dispatcher(); 

KALS_hotkey_manager.prototype.register_hotkey = function (_hotkey, _listener) {
    _hotkey = _hotkey + "";
    return this.add_listener(_hotkey, _listener);
};

KALS_hotkey_manager.prototype.init_hotkey = function () {
    var _this = this;
   setTimeout(function () {
       $("body").keydown(function (_event) {
           var _key = _event.which;
           //$.test_msg('hotkey', [_key, _this.has_type(_key)]);
           if (_this.has_type(_key)) {
               _this.notify_listeners(_key);
               _event.preventDefault();
           }
       });
   }, 0);
   return this;
};

/* End of file KALS_hotkey_manager */
/* Location: ./system/application/views/web_apps/KALS_hotkey_manager.js */