/**
 * Note_editor_manager
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/19 下午 06:59:24
 * @extends {KALS_user_interface}
 * @param {Annotation_editor} _editor
 */
function Note_editor_manager(_editor) {
    
    KALS_user_interface.call(this);
    
    if ($.isset(_editor)) {
        this._editor = _editor;
        this._listen_editor();
    }
    this.child('init', new Init_note_editor());
    
    if ($.browser.msie) {
        this._type_mapping = this._type_mapping_ie;
    }
}

Note_editor_manager.prototype = new KALS_user_interface();

/**
 * @type {Annotation_editor}
 */
Note_editor_manager.prototype._editor = null;

/**
 * @type {Note_editor}
 */
Note_editor_manager.prototype._active_editor = null;

/**
 * @type {String}
 */
Note_editor_manager.prototype._active_editor_name = null;

/**
 * @type {Init_note_editor}
 */
Note_editor_manager.prototype.init = null;

Note_editor_manager.prototype._type_mapping = {
    'importance': 'Note_editor_ckeditor',
    'question': 'Note_editor_ckeditor',
    'confusion': 'Note_editor_ckeditor',
    'summary': 'Note_editor_ckeditor',
    'concept': 'Note_editor_ckeditor',
    'example': 'Note_editor_ckeditor',
    'custom': 'Note_editor_ckeditor'
};

/**
 * 給IE用的列表
 * @version 2009 Pudding Chen
 * @type JSON
 */
Note_editor_manager.prototype._type_mapping_ie = {
    'importance': 'Note_editor',
    'question': 'Note_editor',
    'confusion': 'Note_editor',
    'summary': 'Note_editor',
    'concept': 'Note_editor',
    'example': 'Note_editor',
    'custom': 'Note_editor'
};

Note_editor_manager.prototype._default_editor = 'Note_editor_ckeditor';
//Note_editor_manager.prototype._default_editor = 'Note_editor';

Note_editor_manager.prototype._$create_ui = function () {
    var _ui = $('<div></div>')
        .addClass('note-editor');

    // 加入防止被hotkey影響的設定
    _ui.keydown(function (_event) {
        _event.preventDefault();
    });
    
    return _ui;
};


/**
 * 建立編輯器
 * @param {String} _type
 */
Note_editor_manager.prototype.create = function (_type) {
    //if ($.browser.msie == false)
    //    return new Note_editor_ckeditor(this._editor);
    //else
        return new Note_editor(this._editor);
};

Note_editor_manager.prototype.get_text = function () {
    if ($.isset(this._active_editor))
        return this._active_editor.get_text();
    else
        return null;
};

Note_editor_manager.prototype.set_text = function (_text) {
    
    //$.test_msg('Note_editor_manager.set_text()', [_text, this._active_editor, typeof(this._active_editor.set_text)]);
    /*
    for (var _i in this._note_editors)
    {
        //var _note_editor = this._note_editors[_i];
        //_note_editor.set_text('121212121212');
        this._note_editors[_i].set_text(_text);
        //$.test_msg('Note_editor_managr.reset() set ', [_i, $.isset(this._note_editors[_i]), $.get_class(_note_editor)]);
    }
    */
    if ($.isset(this._active_editor)) {
        this._active_editor.set_text(_text);
    }
    return this;
};

Note_editor_manager.prototype._get_editor_list = function () {
    
    var _list = [];
    
    for (var _i in this._type_mapping)
    {
        var _editor_name = this._type_mapping[_i];
        
        if ($.inArray(_editor_name, _list) === -1) {
            _list.push(_editor_name);
        }
    }
    
    //$.test_msg('Note_editor._get_editor_list', _list);
    
    return _list;
    
};

Note_editor_manager.prototype._note_editors = {};

Note_editor_manager.prototype.initialize = function (_callback) {
    
    //$.test_msg('Note_editor_manager.initialize()', _callback);
    
    //初始化完成之後，呼叫回呼函數
    var _this = this;
    this.init.set_oncomplete(function () {
        
        _this.toggle_editor();
        //$.test_msg('Note_editor_manager.initialize() init oncomplete()');
        $.trigger_callback(_callback);
        
    });
    var _ui = this.get_ui();
    /*
    var _note_editor = new Note_editor_ckeditor(this._editor);
    _note_editor.appendTo();
    */
    var _list = this._get_editor_list();
    this.init._$schedule_task = _list;
    for (var _i in _list)
    {
        var _note_editor_name = _list[_i];
        //$.test_msg('Note_editor_manager.initialize()', _note_editor_name);
        
        var _note_editor;
        eval('_note_editor = new ' + _note_editor_name + '(this._editor);');
        
        var _note_editor_ui = _note_editor.get_ui();
        _note_editor_ui.addClass(_note_editor_name)
            .appendTo(_ui);
        
        _note_editor.add_listener(function (_dispatcher) {
            var _name = _dispatcher.get_classname();
            
            //$.test_msg('Note_editor_manager.initialize()', _name);
            
            _this.init.complete(_name);
        });
        
        //$.test_msg('Note_editor_manager.initialize()', _note_editor_name);
        
        this._note_editors[_note_editor_name] = _note_editor;
    }
    
    this._editor.type.add_listener(function (_dispatcher, _type) {
        _this.ontypechange(_type);
    });
    
    return this;
};

/**
 * @param {Annotation_type_param|String} _type
 */
Note_editor_manager.prototype.toggle_editor = function (_type) {
    
    if ($.is_null(_type)) {
        _type = this._editor.type.get_default_type();
    }
    
    if ($.is_class(_type, 'Annotation_type_param')) {
        _type = _type.get_type_name();
    }
    
    var _note_editor_name;
    if (typeof(this._type_mapping[_type]) === 'string') {
        _note_editor_name = this._type_mapping[_type];
    }
    else {
        _note_editor_name = this._default_editor;
    }
    
    //防止重複更換
    if (_note_editor_name === this._active_editor_name) {
        return this;
    }
    else {
        this._active_editor_name = _note_editor_name;    
    }
    
    var _ui = this.get_ui();
    
    _ui.children(':not(.' + _note_editor_name + ')').hide();
    _ui.children('.' + _note_editor_name).show();
    
    
    var _text = false;
    if ($.isset(this._active_editor))
        _text = this._active_editor.get_text();
    
    this._active_editor = this._note_editors[ _note_editor_name ];
    
    if (_text !== false) {
        this._active_editor.set_text(_text);
    }
    
    return this;
};

Note_editor_manager.prototype.ontypechange = function (_type) {
    //$.test_msg('Note_editor_manager.ontypechange()', _type);
    return this.toggle_editor(_type);
};


/**
 * 設置標註參數
 * @param {Annotation_param} _param
 */
Note_editor_manager.prototype.set_data = function (_param) {
    
    if ($.isset(_param)
        && typeof(_param.note) !== 'undefined') {
        this.set_text(_param.note);
    }
    return this;
};


Note_editor_manager.prototype._listen_editor = function () {
    
    var _this = this;
    this._editor.add_listener('set', function (_editor, _param) {
        _this.set_data(_param);
    });
    
    this._editor.add_listener('get', function (_editor, _annotation_param) {
        var _text = _this.get_text();
        
        _annotation_param = _this.validate(_text, _annotation_param);
        
        //如果是空值，則不傳輸資料，由伺服器端去取得預設值
        if ($.isset(_text)) {
            _annotation_param.note = _text;
        }
    });
    
    this._editor.add_listener('reset', function (_editor) {
        _this.reset();
    });
};

/**
 * 驗證是否合格
 * @author Pulipuli Chen 20141111
 * @param {null|String} _text
 * @param {Annotation_param} _annotation_param
 * @returns {Annotation_param}
 */
Note_editor_manager.prototype.validate = function (_text, _annotation_param) {
    
    var _plain_text = this._flat_text(_text);
    
    var _config = KALS_CONFIG.annotation_editor;
    
    // ------------------------------
    
    //$.test_msg("Note_editor_manager.validate() validate", _text);
    _annotation_param = this.validate_word_minimum_limit(_text, _plain_text, _annotation_param, _config);
    _annotation_param = this.validate_check_stop_words(_plain_text, _annotation_param, _config);
    
    // ------------------------------
    
    return _annotation_param;

};

/**
 * 使帶有HTML Element的text變成純文字 
 * @author Pulipuli Chen 20141113
 * @param {type} _text
 * @returns {String}
 */
Note_editor_manager.prototype._flat_text = function (_text) {
    var _plain_text = "";
    if (_text !== null) {
        _plain_text = $(_text).text();
        _plain_text = $.trim(_plain_text);
    }
    return _plain_text;
};

/**
 * 使帶有HTML Element的text變成純文字 
 * @author Pulipuli Chen 20141113
 * @param {type} _text
 * @returns {String}
 */
Note_editor_manager.prototype._text_has_multimedia = function (_text) {
    
    var _jquery_text = $(_text);
    var _result = (_jquery_text.find("img, a, iframe, embed").length > 0);
    
    //$.test_msg("_text_has_multimedia", _result);
    
    return _result;
};
  
/**
 * 驗證是否合格：最小字數
 * @author Pulipuli Chen 20141111
 * 
 * @author Pulipuli Chen 20141113
 * 排除圖片、影片、網頁
 * 
 * @param {String} _text note
 * @param {String} _plain_text 化為純文字之後的note
 * @param {Annotation_param} _annotation_param
 * @param {JSON} _config 來自KALS_CONFIG.annotation_editor
 * @returns {Annotation_param}
 */
Note_editor_manager.prototype.validate_word_minimum_limit = function (_text, _plain_text, _annotation_param, _config) {
    
    /**
     * @author Pulipuli Chen 20141113
     * 排除圖片、影片、網頁
     */
    if (this._text_has_multimedia(_text) === true) {
        return _annotation_param;
    }
    
    var _note_word_minimum_limit = _config.note_word_minimum_limit;
    var _plain_text_length = $.str_replace(" ", '', _plain_text).length;
    
    //$.test_msg("Note_editor_manager.validate() note_word_minimum_limit", [_plain_text_length, _note_word_minimum_limit]);
    //$.test_msg("Note_editor_manager.validate() note_word_minimum_limit", _plain_text);
    if (typeof(_note_word_minimum_limit) === "number"
        && (_plain_text_length < _note_word_minimum_limit)) {

        //$.test_msg("無法新增，字數過少");
        if (_plain_text_length > 0) {
            _annotation_param.add_invalid(new KALS_language_param(
                    "You have to write at least {0} words. Now you have wrote {1} words.",
                    "annotation_editor.note_word_minimum_limit",
                    [_note_word_minimum_limit, _plain_text_length]
            ));
        }
        else {
            _annotation_param.add_invalid(new KALS_language_param(
                    "You have to write at least {0} words. Plese write something.",
                    "annotation_editor.note_word_minimum_limit_null",
                    _note_word_minimum_limit
            ));
        }
    }   //if (typeof(KALS_CONFIG.annotation_editor.note_word_minimum_limit) === "number"
    
    // ------------------------------
    
    return _annotation_param;

};

/**
 * 驗證是否合格：停用字
 * @author Pulipuli Chen 20141111
 * @param {String} _plain_text
 * @param {Annotation_param} _annotation_param
 * @param {JSON} _config 來自KALS_CONFIG.annotation_editor
 * @returns {Annotation_param}
 */
Note_editor_manager.prototype.validate_check_stop_words = function (_plain_text, _annotation_param, _config) {
        
    var _stop_words = _config.note_stop_words;
    
    if (_stop_words === undefined) {
        return _annotation_param;
    }
    
    _plain_text = _plain_text.toLocaleLowerCase();
    var _match_stop_words = [];
    
    for (var _i in _stop_words) {
        var _word = _stop_words[_i];
        _word = _word.toLocaleString();
        
        if (_plain_text.indexOf(_word) > -1) {
            _match_stop_words.push(_word);
        }
    }
    
    if (_match_stop_words.length > 0) {
        _annotation_param.add_invalid(new KALS_language_param(
                "Please don't write indecent words: {0}",
                "annotation_editor.note_stop_words",
                [_match_stop_words.join(" ")]
        ));
    }
    
    return _annotation_param;
};

/**
 * 重置文字編輯器
 * @author 20140907 Pulipuli Chen
 * @returns {Note_editor_manager.prototype}
 */
Note_editor_manager.prototype.reset = function () {
    
    /*
    for (var _i in this._note_editors)
    {
        //var _note_editor = this._note_editors[_i];
        //_note_editor.set_text('121212121212');
        this._note_editors[_i].reset();
        //$.test_msg('Note_editor_managr.reset() set ', [_i, $.isset(this._note_editors[_i]), $.get_class(_note_editor)]);
    }
    */
    if ($.isset(this._active_editor)) {
        this._active_editor.reset();
    }
    
    //$.test_msg('Note_editor_managr.reset()', "收到了重置的動作");
    //this.set_text('');
    
    //var _ui = this.get_ui('textarea');
    //_ui.val('');
    
    
    return this;
};

/**
 * 聚焦於編輯器上
 */
Note_editor_manager.prototype.focus = function () {
    if ($.isset(this._active_editor)) {
        this._active_editor.focus();
    } 
    
    return this;
};

/* End of file Note_editor_manager */
/* Location: ./system/application/views/web_apps/Note_editor_manager.js */