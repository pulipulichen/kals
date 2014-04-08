/**
 * List_menu_tooltip
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/30 下午 08:11:03
 * @extends {List_menu}
 * @param {List_item} _item
 * @param {String[]} _disable_option
 */
function List_menu_tooltip(_item, _disable_option) {
    
    List_menu.call(this, _item, _disable_option);
    
    if ($.isset(_item)) {
        var _annotation_id = _item.get_annotation_id();
        this._$tooltip_id = this._$tooltip_id + '_' + _annotation_id; 
    }
}

List_menu_tooltip.prototype = new List_menu();

List_menu_tooltip.prototype._$modal_name = 'List_menu_tooltip';

List_menu_tooltip.prototype._$tooltip_id = 'list_menu_tooltip';

/**
 * Create UI
 * 建立時預設是隱藏的。等待別人呼叫tooltip()來召喚他。
 * @memberOf {List_menu_tooltip}
 * @type {jQuery} UI
 */
List_menu_tooltip.prototype._$create_ui = function () {
    var _ui = List_menu.prototype._$create_ui.call(this);
    
    var _tooltip = this._create_tooltip_prototype({
        content: _ui,
        classname: 'list-menu-tooltip kals-modal'
    });
    
    _tooltip.hide();
    
    return _tooltip;
};

List_menu_tooltip.prototype._$get_config = function (_selector) {
    
    var _config = Tooltip_modal.prototype._$get_config.call(this, _selector);
    
    var _this = this;
    
    var _onbeforeshow = $.get_parameter(_config, 'onBeforeShow');
    
    _config.onBeforeShow = function () {
        //$.test_msg('List_menu_tooltip._$get_config() onBeforeShow', _this._item.get_menu_style());
        
        var _menu_style = _this._item.get_menu_style();
        if (_menu_style == 'block') {
			return false;
		}
        
        //先找到其他顯示的tooltip，並把他們關掉
        //$('.list-menu-tooltip:not(#'+_this._$tooltip_id+')').fadeOut();
        
        var _other_trigger_selector = '.list-item.' + _this._$modal_name + '_trigger';
        var _other_trigger = $(_other_trigger_selector);
        //$.test_msg('List_menu_tooltip._$get_config()', [_other_trigger_selector, _other_trigger.length]);
        if (_other_trigger.length > 0) {
            var _api = _other_trigger.data('tooltip');
            _api.hide();    
        }
                   
        //確認tip不要超過畫面右方
        var _tooltip = this.getTip();
        var _trigger = this.getTrigger();
        
        var _tooltip_width = _tooltip.width();
        var _trigger_left = _trigger.offset().left;
        
        var _trigger_width = _trigger.width();
        var _trigger_padding_left = $.strip_unit(_trigger.css('padding-left'));
        var _trigger_padding_right = $.strip_unit(_trigger.css('padding-right'));
        _trigger_width = _trigger_width + _trigger_padding_left + _trigger_padding_right;
		
       
        //確認tip不要超過畫面左方
        var _tooltip_left = _trigger_left - _tooltip_width;
        
        if (_tooltip_left < 0) {
			// @20130602 Pudding Chen
			// 不知道為什麼+20之後會出問題，現在先關掉
            //_tooltip_left = _trigger_width + 20;
			_tooltip_left = _trigger_width;
            
            var _tooltip_right = _tooltip_left + _tooltip_width;
            
            //$.test_msg('List_menu_tooltip._$get_config()', [_tooltip_left, _trigger_left, _tooltip_width, _trigger_width
            //    , (_tooltip_right < $('body').width()), _tooltip_right]);
                    
            
            if (_tooltip_right < $('body').width()) {
				_tooltip.css("visibility", "hidden");
                setTimeout(function () {
                    _tooltip.css('left', _tooltip_left + 'px');   
                    _tooltip.css('width', _tooltip_width + 'px');
					_tooltip.css("visibility", "visible"); 
                }, 0);
            }
        }
        
        _this.get_ui().show();
        
        if ($.is_function(_onbeforeshow)) {
            _onbeforeshow.call(this);
        }
        
        //2010.11.11 測試用
        //setTimeout(function () {
        //    _this.get_ui().appendTo($('body')).show();
        //}, 1000);
    };
    
    //方向
    _config.position = 'top left';
    //_config.position = 'center left';
    
    _config.relative = true;
    
    _config.offset = [31, -5];
    //_config.offset = [0, -5];
    
    _config.delay = 5000; 
    
    _config.events = {
        def: 'mouseover click focus, blur mouseout'
    };
    
    _config.tip = '#' + this._$tooltip_id;
    //$.test_msg('List_menu_tooltip._$get_config()', _config.tip);
    
    return _config;
};

/* End of file List_menu_tooltip */
/* Location: ./system/application/views/web_apps/List_menu_tooltip.js */