/**
 * Search_form_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/9/16 上午 10:57:50
 * @extends {KALS_user_interface}
 */
function Search_form_component() {
    
    KALS_user_interface.call(this);

}

Search_form_component.prototype = new KALS_user_interface();

Search_form_component.prototype._$create_ui = function () {
    
    var _ui = $('<table class="search-form"><tbody><tr><td></td><td></td><td></td></tr></tbody></table>');
    
    var _input = this._create_input();
    _input.appendTo(_ui.find('td:eq(0)'));
    
    var _submit = this._create_submit();
    _submit.appendTo(_ui.find('td:eq(1)'));
    
    var _advanced = this._create_advanced_link();
    _advanced.appendTo(_ui.find('td:last'));

    // TODO Search_form_component search事件
    
    return _ui;
    
};

Search_form_component.prototype._create_advanced_link = function () {
    
    var _ui = $('<span class="link"></span>');
    
    KALS_context.lang.add_listener(_ui, new KALS_language_param('ADVANCED SEARCH'
        , 'toolbar.search.advanced_search'));
    
    _ui.addClass('advanced-link');
    
    return _ui;
};


Search_form_component.prototype._create_input = function () {
    
    var _input = $('<input type="text" placeholder="Search..." name="keyword" class="search-form-input" />');
    
    KALS_context.lang.add_listener(_input, new KALS_language_param('Search...'
        , 'toolbar.search.input_placeholder'));
    
    _input.placeHeld();
    
    return _input;
};

Search_form_component.prototype._create_submit = function () {
    
    var _submit = $('<button type="button" class="search-form-submit"></button>')
        .append(KALS_context.get_image_url('search.gif'));
    
    return _submit;
};

/* End of file Search_form_component */
/* Location: ./system/application/views/web_apps/Search_form_component.js */