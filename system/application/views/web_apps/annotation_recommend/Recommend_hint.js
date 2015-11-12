/**
 * Recommend_hint
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/11/12 上午 11:07:59
 * @extends {Overlay_modal}
 */
function Recommend_hint() {
    
    Overlay_modal.call(this);
}

Recommend_hint.prototype = new Overlay_modal();

Recommend_hint.prototype._$modal_name = 'Recommend_hint';

Recommend_hint.prototype._$exposable = false;

Recommend_hint.prototype._$tooltip_id = 'recommend_hint';

/**
 * @type {List_item_topic}
 */
//Recommend_hint.prototype._recommended_item = null;

/**
 * @type {Annotation_param}
 */
Recommend_hint.prototype._recommended = null;

// ---------
// Recommended Setup
// --------

/**
 * @param {List_item}
 */
Recommend_hint.prototype.setup_recommend = function(_recommended) {
    
    if (KALS_CONFIG.enable_annotation_recommend === false) {
        /**
         * 如果允許建議的話，再讓他可以用標註
         */
        return this;
    }
    
    if ($.isset(_recommended)) {   
        //this._recommended_item = _recommended_item;
        //this._recommended = _recommended_item.get_annotation_param();
        this._recommended = _recommended;
        
        if (this.has_recommend() === false) {
			return this;
		}
        
        this._setup_position_words();
        this.setup_position();
        
        this.close();
        
        this.open();
    }
    return this;
};

/**
 * 是否有建議標註？
 * @return {boolean}
 */
Recommend_hint.prototype.has_recommend = function () {
    
    if ($.is_null(this._recommended)) {
		return false;
	}
    //$.test_msg('Recommend_hint.has_reocmmend()', this._recommended.recommend);
    //$.test_msg('Recommend_hint.has_reocmmend()', [(this.has_recommend_by() || this.has_tips()), this.has_recommend_by(), this.has_tips()]);
    return (this.has_recommend_by() || this.has_tips());
};


Recommend_hint.prototype.has_recommend_by = function () {
    return ($.isset(this._recommended)
        && typeof(this._recommended.recommend) != 'undefined'
        && this._recommended.recommend !== null
        && typeof(this._recommended.recommend.recommend_by) == 'object'
        && $.is_class(this._recommended.recommend.recommend_by, 'Annotation_param'));
};


Recommend_hint.prototype.has_tips = function () {
    return ($.isset(this._recommended)
        && $.isset(this._recommended.recommend)
        && typeof(this._recommended.recommend.tips) == 'object'
        && this._recommended.recommend.tips.length > 0);
};

Recommend_hint.prototype.get_recommended_id = function () {
    if ($.is_null(this._recommended)) {
		return null;
	}
	else {
		return this._recommended.annotation_id;
	}
};

/**
 * 取得被建議的標註
 * @return {Annotation_param}
 */
Recommend_hint.prototype.get_recommend_by = function () {
    if (this.has_recommend_by()) {
		return this._recommended.recommend.recommend_by;
	}
	else {
		return null;
	}
};

// --------
// UI
// --------

/**
 * Create UI
 * @memberOf {Recommend_hint}
 * @type {jQuery} UI
 */
Recommend_hint.prototype._$create_ui = function () {
    var _ui = $('<div></div>')
        .addClass('tooltip recommend-hint')
        .appendTo($('body'))
        .hide();
    
    var _content = $('<div class="tip-content kals-modal"></div>')
        .appendTo(_ui);
    
    var _recommend_content = this._create_recommend_content();
    _recommend_content.appendTo(_content);
    
    // ---------
    
    var _needle_top = $('<div class="tip-needle top"></div>')
        .prependTo(_ui);
    var _needle_bottom = $('<div class="tip-needle bottom"></div>')
        .appendTo(_ui);
    
    var _this = this;
    _ui.click(function () {
        $.test_msg('Recommend_hint._$create_ui() click', $.isset(_this._recommended));
        KALS_text.tool.recommend.setup_recommend(_this._recommended);
    });
    
    return _ui;
};

Recommend_hint.prototype._create_recommend_content = function () {
    
    var _content = $('<div></div>')
        .addClass('recommend-hint');
    
    var _recommend_img = KALS_context.get_image_url('has-recommend.gif')
        .appendTo(_content);
    
    return _content;
};

// ---------
// POSITION
// ---------

/**
 * @deprecated Pudding 20151112 不應該在這邊設定
 */
//Recommend_hint.prototype.word_id_prefix = 'kals_word_';

Recommend_hint.prototype._first_word = null;
Recommend_hint.prototype._last_word = null;

Recommend_hint.prototype._setup_position_words = function () {
    
    if (this.has_recommend() === false) {
        return this;
    }
    
    var _scope = this._recommended.scope;
    var _first_index = _scope.get_first_index();
    var _last_index = _scope.get_last_index();
    
    var _word_id_prefix = KALS_text.selection.text.word.get_id_prefix();
    this._first_word = $('#' + _word_id_prefix + _first_index);
    this._last_word = $('#' + _word_id_prefix + _last_index);
    
    return this;
};

Recommend_hint.prototype._$default_position = 'top';

Recommend_hint.prototype._touch_top = function () {
    var _ui = this.get_ui();
    var _ui_height = _ui.height();
    var _first_word = this._first_word;
    //var _first_word_top = _first_word.offset().top;
    var _first_word_top = $.get_offset_top(_first_word);
    
    var _body_top = 0;
    if ($.is_small_height() === false) {
		_body_top = KALS_toolbar.get_ui().height();
	}
    //$.test_msg('Recommend_hint._touch_top()', [_body_top, _first_word_top, _ui_height]);
    return (_first_word_top - _ui_height - 5 < _body_top);
};

Recommend_hint.prototype._touch_bottom = function () {
    var _ui = this.get_ui();
    var _ui_height = _ui.height();
    
    var _last_word = this._last_word;
    //var _last_word_bottom = _last_word.offset().top + _last_word.height();
    var _last_word_bottom = $.get_offset_bottom(_last_word);
    
    var _body_bottom = $('body').height();
    //$.test_msg('Recommend_hint._touch_bottom()', [_body_bottom, _last_word_bottom, _ui_height, _last_word_bottom + _ui_height, ( _last_word_bottom + _ui_height > _body_bottom )]);
    return ( _last_word_bottom + _ui_height + 5 > _body_bottom );
};

Recommend_hint.prototype.setup_position = function (_callback) {
    
    if (KALS_CONFIG.enable_annotation_recommend === false) {
        $.trigger_callback(_callback);
        return;
    }
    
    if (this.has_recommend() === false) {
        //$.test_msg('Recommend_hint.setup_position()'
        //    , [this.has_recommend(), this.has_recommend_by(), this.has_tips()]);
        return this;
    }
    
    var _pos = this._$default_position;
    //$.test_msg('Recommend_hint.setup_position() decide pos', [_pos, this._touch_top(), this._touch_bottom()]);
    if (_pos === 'top'
        && (this._touch_top() === true && this._touch_bottom() === false)) {
        _pos = 'bottom';
    }
    else if (_pos === 'bottom'
        && (this._touch_bottom() === true && this._touch_top() === false)) {
        _pos = 'top';
    }
    //$.test_msg('Recommend_hint.setup_position() final pos', _pos);
    
    var _tooltip_bottom_classname = 'bottom';
    var _ui = this.get_ui();
    
    var _get_center = function (_obj) {
        var _obj_width = _obj.width();
        //var _obj_left = _obj.offset().left;
        var _obj_left = $.get_offset_left(_obj);
        return _obj_left + (_obj_width / 2);
    };
    
    //$.test_msg('Recommend_hint.setup_position()', _pos, this._last_word.css('color', 'blue'));
    
    //var _ui_offset = _ui.offset();
    var _ui_offset = $.get_offset(_ui);
    var _ui_width = _ui.width();
    var _center, _ui_left, _ui_top;
    if (_pos === 'bottom') {     
       /*
       $.test_msg('Recommend_hint.setup_position() bottom before', [_ui.css('position'), _ui.offset().top, this._last_word.offset().top]);
        _ui.position({
            of: this._last_word,
            my: 'center top',
            at: 'center bottom',
            offset: '0 5'
        });
        $.test_msg('Recommend_hint.setup_position() bottom after', [_ui.offset().top, this._last_word.offset().top]);
        */
        _center = _get_center(this._last_word);
        
        //_ui_top = this._last_word.offset().top + this._last_word.height();
        _ui_top = $.get_offset_bottom(this._last_word);
        _ui_top = _ui_top + 10; 
        
        _ui.addClass(_tooltip_bottom_classname);
    }
    else {
        /*
        _ui.position({
            of: this._first_word,
            my: 'center bottom',
            at: 'center top',
            offset: '0 -5'
        });
        */
        _center = _get_center(this._first_word);
        //_ui_top = this._first_word.offset().top - _ui.height() - 10;
        _ui_top = $.get_offset_top(this._first_word);
        _ui_top = _ui_top - _ui.height() - 10;
       
        _ui.removeClass(_tooltip_bottom_classname);
    }
    
    _ui_left = _center - (_ui_width / 2);
    _ui.css({
        top: _ui_top + 'px',
        left: _ui_left + 'px'
    });
    
    
    //修正左右
    if (_ui_offset.left < 0) {
		_ui.css('left', '0px');
	}
    var _body_right = $('body').width();
    if (_ui_offset.left + _ui_width > _body_right) {
        _ui_left = _body_right - _ui_width;
        _ui.css('left', _ui_left + 'px');
    }
    
    //修正最上方
    var _body_top = 0;
    if ($.is_small_height() === false) {
		_body_top = KALS_toolbar.get_ui().height();
	}
    if (_ui_offset.top < _body_top) {
		_ui.css('top', _body_top + 'px');
	}
    
    $.trigger_callback(_callback);
    
    return this;
};

//2010.11.18 因為允許移動，所以不固定
Recommend_hint.prototype._$onviewportmove = function () {
    return this.setup_position();
};
/* End of file Recommend_hint */
/* Location: ./system/application/views/web_apps/Recommend_hint.js */