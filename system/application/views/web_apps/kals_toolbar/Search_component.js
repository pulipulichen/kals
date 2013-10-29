/**
 * Search_component
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/9/16 上午 10:57:40
 * @extends {KALS_user_interface}
 */
function Search_component() {
    
    KALS_user_interface.call(this);
    
    this.child('form', new Search_form_component());
    this.child('result', new Search_result_component());
    
}

Search_component.prototype = new KALS_user_interface();

Search_component.prototype._$create_ui = function () {
    
    var _ui = $('<div class="search-component form"></div>');
    
    var _form_ui = this.form.get_ui();
    _ui.append(_form_ui);
    
    // 2010.11.23 因為搜尋尚未完成，所以先關掉
    _form_ui.hide();
    
    //2010.10.3 將_advanced_link移至Search_form_component
    //var _advanced_link = this._get_advanced_link();
    //_ui.append(_advanced_link);
    
    var _advanced_button = this._create_advanced_button();
    _advanced_button.hide();
    _ui.append(_advanced_button);
    
    var _result_ui = this.result.get_ui();
    _ui.append(_result_ui);
    
    
    return _ui;
};

Search_component.prototype._create_advanced_button = function () {
    
    var _ui = $('<button type="button" class="advanced-button search-form-submit"></button>'); 
    
    _ui.append(KALS_context.get_image_url('search.gif'));
        
    return _ui;
};

Search_component.prototype.reset_form = function () {
    
    var _ui = this.get_ui();
    
    _ui.addClass('form');
    _ui.removeClass('result');
    
    
    return this;
};

Search_component.prototype.show_result = function () {
    
    var _ui = this.get_ui();
    
    _ui.removeClass('form');
    _ui.addClass('result');
    
    return this;
    
};

/* End of file Search_component */
/* Location: ./system/application/views/web_apps/Search_component.js */