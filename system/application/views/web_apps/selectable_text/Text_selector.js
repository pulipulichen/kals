/**
 * Text_selector
 *
 * 分擔KALS_context中關於網址部分的工作
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2014/5/19 下午 03:36:17
 * @extends {Multi_event_dispatcher}
 */
function Text_selector(){
   
   Event_dispatcher.call(this);
   
}

Text_selector.prototype = new Multi_event_dispatcher(); 

/**
 * @type {jQuery|null}
 * @version 20111105 Pudding Chen
 */
Text_selector.prototype._text_selector = null;

/**
 * 確保選取位置。
 * 必須要在所有元件加入body之前確保完畢
 * @param {function} _callback 回呼函數
 * @version 20111105 Pudding Chen
 */
Text_selector.prototype.check_text_selector = function (_callback) {
    
    if (this._text_selector === null) {
        // TODO 2010.10.16 KALS_context._text_selector：測試時設置預設值
        //this._text_selector = '#selectable';
        
        //this._text_selector = 'body';
        
        //$.test_msg('KALS_context.check_text_selector()', $('.selectable-text').legnth);
        if ($('#articleContent').length !== 0) {
            //this._text_selector = $('#articleContent');
            /*
            var _text_container = $('<div></div>')
                .addClass('selectable-text')
                .($('body'));
        
            $('body').find('#articleContent')
                .appendTo(_text_container);
            //$('body').children('p')
            //    .appendTo(_text_container);
            */
            this._text_selector = $('#articleContent').addClass('selectable-text');
        }   // if ($('#articleContent').length !== 0) {
        else if ($('.selectable-text').length === 0) {
            /*
            var _text_container = $('<div></div>')
                .addClass('selectable-text')
                .prependTo($('body'));
        
            var _move = function (_selector) {
                var _content = $('body').children(_selector);
                
                _content.find('script').remove();
                
                _content.appendTo(_text_container);
            };
            
            //_move('div:not(.selectable-text)');
            //_move('p');
            //_move('table');
            for (var _i in KALS_CONFIG.selectable_text) {
                _move(KALS_CONFIG.selectable_text[_i]);
            }
            */
           
            
            var _text_container;
            
            if (KALS_CONFIG.annotation_scope_selector === null) {
                _text_container = this._init_default_scope();
            }
            else {
                _text_container = this._init_selectable_text();
            }     
            this._text_selector = _text_container;
        }   // else if ($('.selectable-text').length === 0) {
        else {
            this._text_selector = $('.selectable-text:last');
        }
            
        // ----------------------------------------
        // 加入事件監聽
        // ----------------------------------------

        this._init_listener();

        // -----------------------------------------

    }   //if (this._text_selector === null) {
    
    //this.init_context.complete('selector');
    
    //setTimeout(function () {
    $.trigger_callback(_callback);
    //}, 0);
    
    return this;
};

/**
 * 初始化可選擇區域
 * @returns {jQuery|Multi_event_dispatcher._create_selectable_text._text_container|Text_selector.prototype._create_selectable_text._text_container}
 */
Text_selector.prototype._init_default_scope = function () {
    var _text_container = $('<div></div>')
        .addClass('selectable-text');

    var _content = $('body').children(":not(.selectable-text):not(script):not(.KALS)");
    _content.find('script').remove();
    _content.appendTo(_text_container);

    _text_container.appendTo($('body'));
    return _text_container;
};

/**
 * 初始化可選擇區域
 * @returns {jQuery|Multi_event_dispatcher._create_selectable_text._text_container|Text_selector.prototype._create_selectable_text._text_container}
 */
Text_selector.prototype._init_selectable_text = function () {
    
    var _text_container;
    
    var _scope_selector = KALS_CONFIG.annotation_scope_selector;
    var _scope_content = $(_scope_selector);

    if (_scope_content.length === 0) {
        _text_container = this._init_default_scope();
    }
    else if (_scope_content.length > 1) {
        _scope_content = _scope_content.filter(':first');
    }

    var _children_content = _scope_content.children();

    _text_container = $('<div></div>')
        .addClass('selectable-text');

    _children_content.find('script').remove();

    //_text_container.insertBefore(_scope_content);
    //_scope_content.appendTo(_text_container);

    _text_container.prependTo(_scope_content);
    _children_content.appendTo(_text_container);

    /*
    else if (_scope_content.length == 1) {
        _text_container = $('<div></div>')
            .addClass('selectable-text');

        _scope_content.find('script').remove();

        _text_container.insertBefore(_scope_content);
        _scope_content.appendTo(_text_container);
    }
    else {
        for (var _i = 0; _i < _scope_content.length; _i++) {
            var _content = _scope_content.eq(_i);

            var _container = $('<div></div>')
                .addClass('selectable-text');

            _content.find('script').remove();
            _container.insertBefore(_content);
            _content.appendTo(_container);
        }

        _text_container = $('.selectable-text');
    }
    */
    
    return _text_container;
};

// ------------------------------------
// 初始化監聽事件
// ------------------------------------

/**
 * 初始化間聽器
 * @returns {Text_selector.prototype}
 */
Text_selector.prototype._init_listener = function () {
    
    var _this = this;
    KALS_context.ready(function () {
        KALS_text.tool.add_listener(["open", "close"], function (_tool) {
            //$.test_msg("tool open", (_tool.is_opened() === false));
            _this._enable_click_close_annotation_tool = _tool.is_opened();
        });
        
        _this._text_selector.mousedown(function (_e) {
            //$.test_msg("text container啟動 mousedown");
            _this._close_tool(_e);
        });
    });
    
    return this;
};

/**
 * 是否啟用點選關閉標註工具的功能
 * @type Boolean
 */
Text_selector.prototype._enable_click_close_annotation_tool = false;

/**
 * 
 * @param {Event} _e
 * @returns {Text_selector}
 */
Text_selector.prototype._close_tool = function (_e) {
    if (this._enable_click_close_annotation_tool) {
        KALS_text.tool.close();
    }
    
    return this;
};

/**
 * 取得可選取的文字區
 * @retrun {jQuery} 要選取的範圍
 * @version 20111105 Pudding Chen
 */
Text_selector.prototype.get_text_selector = function () {
    return this._text_selector;
};

/**
 * 設定可選取的文字區
 * @param {Object} _selector
 */
Text_selector.prototype.set_text_selector = function (_selector) {
    this._text_selector = _selector;
    return this;
};

/* End of file Text_selector */
/* Location: ./system/application/views/web_apps/Text_selector.js */