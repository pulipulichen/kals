/**
 * Window_policy
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/22 下午 04:36:42
 * @extends {Window_content}
 * @param {Policy_component} _trigger
 */
function Window_policy(_trigger) {
    
    Window_content.call(this);
    
    if ($.isset(_trigger))
        this._trigger = _trigger;
    
    this._setup_submit(new Window_policy_submit());
}

Window_policy.prototype = new Window_content();

Window_policy.prototype.heading = new KALS_language_param(
    'Annotation Policy',
    'window.policy.heading'
);

Window_policy.prototype.name = 'Policy';

Window_policy.prototype.width = 320;

/**
 * @type {Policy_component}
 */
Window_policy.prototype._trigger = null;

/**
 * @type {Policy_component}
 */
Window_policy.prototype.get_trigger = function () {
    return this._trigger;
};

/**
 * @type {Share_list_component}
 */
Window_policy.prototype._share = null;

/**
 * @type {Friends_list_component}
 */
Window_policy.prototype._friends = null;

/**
 * @type {User_search_input}
 */
Window_policy.prototype._input = null;

/**
 * 目前選擇的policy type
 * @type {String}
 */
Window_policy.prototype._policy_type = 'public';

// --------
// UI
// --------

/**
 * Create UI
 * @memberOf {Window_policy}
 * @type {jQuery} UI
 */
Window_policy.prototype._$create_ui = function ()
{
    var _ui = $('<form></form>')
        .addClass('window-policy');
    
    var _this = this;
    var _options = this._trigger.get_options();
    for (var _i in _options) {
        
        var _type = _options[_i];
        
        
        
        var _label = $('<label></label>')
            .addClass(_type + '-label')
            .appendTo(_ui);
        
        var _dt = $('<div class="dt"><input type="radio" name="window_policy" value="'+_type+'"> <span class="heading"></span></div>')
            .appendTo(_label);
        
        var _dd = $('<div class="help"></div>')
            .appendTo(_label);
        
        var _heading = _dt.find('.heading:first');
        var _heading_lang = new KALS_language_param(
            _type,
            'policy_type.' + _type
        );
        
        KALS_context.lang.add_listener(_heading, _heading_lang);
        
        var _help_lang = new KALS_language_param(
            ' ',
            'policy_type.' + _type + '.help'
        );
        
        if (_type == 'public')
            _help_lang.msg = 'Everyone can read this annotation.';
        else if (_type == 'private')
            _help_lang.msg = 'Only you can read this annotation.';
        else if (_type == 'share')
            _help_lang.msg = 'People in follow list can read this annotation.';
        
        //$.test_msg('Window_policy._$create_ui()', [_type, _heading.length, _dt.length]);
        
        KALS_context.lang.add_listener(_dd, _help_lang);
        
        var _radio = _dt.find('input:radio:first');
        _radio.change(function () {
            var _type = this.value;
            _this.ontypechange(_type);
        });
    }
    
    //設定Input、Share、Friend
    
    var _this  = this;
    setTimeout(function () {
        _this.set_policy_type();
    }, 0);
    
    return _ui;
};

Window_policy.prototype.ontypechange = function (_type) {
    
    this._policy_type = _type;
    
    return this;
};

Window_policy.prototype.set_policy_type = function (_type) {
    
    if ($.is_null(_type))
    {
        _type = this._trigger.get_policy_type();
    }
    
    var _radio = this.get_ui('input:radio[value="'+_type+'"]').click();
    return this;
};

Window_policy.prototype.get_policy_type = function () {
    
    var _type = this._policy_type;
    
    return _type;
};

/**
 * @deprecated 2010.10.22 因為共享標註功能腰斬，所以暫時先不做
 * @type {User_search_input}
 */
Window_policy.prototype._setup_input = function () {
    
};

/**
 * @deprecated 2010.10.22 因為共享標註功能腰斬，所以暫時先不做
 * @type {Share_list_component}
 */
Window_policy.prototype._setup_share = function () {
    
};

/**
 * @deprecated 2010.10.22 因為共享標註功能腰斬，所以暫時先不做
 * @type {Friends_list_component}
 */
Window_policy.prototype._setup_friend = function () {
    
};


/* End of file Window_policy */
/* Location: ./system/application/views/web_apps/Window_policy.js */