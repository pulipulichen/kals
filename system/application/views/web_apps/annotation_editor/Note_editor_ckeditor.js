/**
 * Note_editor_ckeditor
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/19 下午 06:24:56
 * @extends {Note_editor}
 * @param {Annotation_editor} _editor
 */
function Note_editor_ckeditor(_editor) {
    
    //$.test_msg('Note_editor_ckeditor()', typeof(_editor));
    Note_editor.call(this, _editor);
}

Note_editor_ckeditor.prototype = new Note_editor();

Note_editor_ckeditor.prototype._$name = 'ckeditor';

Note_editor_ckeditor.prototype._$classname = 'Note_editor_ckeditor';

Note_editor_ckeditor.prototype._$apply_type = 'default';

/**
 * Create UI
 * @memberOf {Note_editor_ckeditor}
 * @type {jQuery} UI
 */
Note_editor_ckeditor.prototype._$create_ui = function () {
    var _ui = Note_editor.prototype._$create_ui.call(this);
    
    //_ui.attr('id', 'textarea_' + $.create_id());
    _ui.addClass('ckeditor')
        .addClass('note-editor-ckeditor');
    _ui.find('textarea:first').show();
	
    //$.test_msg('Note_editor_cheditor._$create_ui [stantby ready to call setup]');
    
    var _this = this;
    setTimeout(function () {
        //Note_editor_ckeditor._setup_ckeditor();
        Note_editor_ckeditor._setup_ckeditor();
        
        //_this.set_text("測試看看");
    }, 0);
    return _ui;
};

/**
 * CKEditor的核心物件
 */
Note_editor_ckeditor.prototype._ckeditor = null;
    
Note_editor_ckeditor._ckeditor_config = KALS_CONFIG.ckeditor_config;

Note_editor_ckeditor._setup_timer = null;

Note_editor_ckeditor._counter = 0;
//Note_editor_ckeditor._setup_locker = false;

Note_editor_ckeditor._setup_ckeditor = function () {
    
//    if (this._setup_locker === true) {
//        return;
//    }
//    else {
//        this._setup_locker = true;
//    }
    
    //$.test_msg("Note_editor_ckeditor._setup_ckeditor", "開始初始化");
    if ($.isset(this._setup_timer)) {
        clearTimeout(this._setup_timer);
    }
    
    //this._setup_php_file_upload();
    
    var _this = Note_editor_ckeditor;
    var _setup = function () {
        
        var _textareas = $('.note-editor-ckeditor:not(.initialized)');
        
        //$.test_msg('Note_editor_ckeditor.setup_ckeditor() textareas', _textareas.length);
        
        /**
         * 這樣就不會重複初始化已經初始化過的textarea了
         * @author Pulipuli Chen 20151018
         */
        _textareas.addClass("initialized");
        
        _textareas.each(function(_index, _textarea) {
            var _ui = $(_textarea).find('textarea.note-editor-textarea:first');
            _ui.attr("id", "note_editor_ckeditor_" + _this._counter);
            _this._counter++;
            //$.test_msg("note_editor_ckeditor_", _ui.attr("id"));

            var _hint_lang = new KALS_language_param(
                'If editor could not edit, press "source" button twice to enable it.',
                "note.ckeditor.edit_hint"
            );
            var _hint = KALS_context.lang.create_listener(_hint_lang)
                    .addClass("enable-editor-hint")
                    .insertAfter(_ui);

			
            //$.test_msg('Note_editor_ckeditor.setup_ckeditor() [each textarea]', [_ui.length, typeof(_ui.ckeditor)]);
            _ui.ckeditor(function () {
            
                //$.test_msg('Note_editor_ckeditor.setup_ckeditor() after ckeditor setup ok?');
                
                //var _ui = _textareas.eq(_i);
                
                var _editor_span = _ui.nextAll('span:first'); 
                var _toolbox = _editor_span.find('.cke_toolbox');
                
                _toolbox.children('.cke_toolbar:last').addClass('minimize');
                _toolbox.children('.cke_toolbar:not(:last)').addClass('maximize');
                
                /**
                 * 隱藏多餘的工具列，預設只顯示最後一行
                 * @author Pulipuli Chen 20151018
                 */
                var _cke_editor = _editor_span.find('table.cke_editor:first');
                var _cke_bottom_tr = _cke_editor.find('> tbody > tr:last').addClass('cke_bottom_tr');

                _ui.ckeditorGet().on("contentDom", function () {
                    this.document.on("mousedown", function () {
                        $.test_msg("鎖定捲軸位置");
                        $.lock_scroll_once();
                        //$.test_msg("儲存位置");
//                        $.save_scroll_position();
//                        $(window).one("scroll", function () {
//                            $.test_msg("捲動中");
//                            $.load_scroll_position();
//                        });
                        //setTimeout(function () {
                        //    $.test_msg("讀取位置3");
                        //    $.load_scroll_position();
                        //}, 100);
                    });
//                    this.document.on("click", function (event) {
//                        //$.test_msg("讀取位置2");
//                        
//                    });
                });
//                _ui.ckeditorGet().on("focus", function () {
//                    //alert(2);
//                    setTimeout(function () {
//                        $.test_msg("讀取位置1");
//                        $.load_scroll_position();
//                    }, 100);
//                });
//                
            }, _this._ckeditor_config);
			
        });
    };
    
    //$.test_msg('Note_editor_ckeditor.setup_ckeditor() [standby ready]');
    this._setup_timer = setTimeout(_setup, 100);
    
    return this;
};

/**
 * 設定CKedtior中的文字
 * 
 * CKeditor的設定方式比較特別，請小心喔
 * @param {String} _text
 */
Note_editor_ckeditor.prototype.set_text = function (_text) {
    //$.test_msg("ckeditr set_text", _text);
    
    var _setted_text = this.get_text();
    _setted_text = $.trim(_setted_text);
    
    //$.test_msg("已經設定的文字", _setted_text);
    
    if ($.is_null(_text)) {
        _text = '';
    }
    else {
        _text = $.trim(_text);
    }
    
	/*
    if (_text == _setted_text) {
		return this;
	}
	*/
    
	//$.test_msg("Note_editor_ckeditor.set_text()", _text);
	
    var _ui = this.get_ui('.note-editor-textarea:first');
    
    
    //為了避免CKeditor還沒初始化前就設定，我們必須等它一下。
    var _this = this;
    var _set_data = function () {
        if (typeof(_ui.ckeditorGet) !== "function") {
            //$.test_msg("check _ui.ckeditorGet() failed", typeof(_ui.ckeditorGet));
            throw "CKeditor_not_ready"; 
            return;
        }
        
        //$.test_msg("CHeditor", [_setted_text, _text]);
        if (_setted_text === _text && _text !== "") {
            //$.test_msg("CHeditor 沒問題");
            return this;
        }
        
        $.save_scroll_position();
        //_ui.ckeditorGet().setData(_text, function () {
            //$.test_msg("Note_editor_ckeditor.set_text() ok", _text);
        //});
        
//        _text = _text + "!!!!!";
        //$.test_msg("準備設定CKeditor! [" + _text + "]");
        
        if (_this._ckeditor === null) {
            _this._ckeditor = _ui.ckeditorGet();
        } 
        _this._ckeditor.setData(_text);
        
//        setTimeout(function () {
//            _text = _text + "?????";
//            _this._ckeditor.setData(_text);
//        }, 1000);
        
        //_ui.ckeditorGet().setData(_text);
        //_ui.val(_text);
        $.load_scroll_position();
    };

    var _loop_count = 0;
    var _loop_limit = 10;
    var _loop = function () {
        
        // 避免無止盡讀取下去
        if (_loop_count > _loop_limit) {
            return;
        }
        _loop_count++;
        
        try {
            _set_data();
        }
        catch (_e) {
            setTimeout(function () {
                _loop();
            }, 1000);
        }
    };

    _loop();
    
    return this;
};

Note_editor_ckeditor.prototype._ckeditor = null;

/**
 * 將游標聚焦於編輯器上
 * 改成CKEditor的版本
 * @author Pulipuli Chen 20151018
 */
Note_editor_ckeditor.prototype.focus = function () {
    var _ui = this.get_ui('.note-editor-textarea:first');
    
    var _ckeditor = _ui.ckeditorGet();
    _ckeditor.focus();

    return this;	
};


/* End of file Note_editor_ckeditor */
/* Location: ./system/application/views/web_apps/Note_editor_ckeditor.js */