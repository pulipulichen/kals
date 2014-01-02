/**
 * Selectable_text_sentence
 *
 * @package     KALS
 * @category    Webpage Application Libraries
 * @author      Pulipuli Chen <pulipuli.chen@gmail.com>
 * @copyright   Copyright (c) Expression year is undefined on line 7, column 33 in Templates/KALS/KALS_JavaScript_Class.js., Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        https://github.com/pulipulichen/kals
 * @version     1.0 2014/1/2 下午 09:17:54
 */

/**
 * @memberOf {Selectable_text_sentence}
 * @extends {KALS_user_interface}
 * @constructor
 * @param {Selectable_text} _selectable_text 父物件
 */
function Selectable_text_sentence(_selectable_text) {
    
    this._selectable_text = _selectable_text;
    this._text = _selectable_text._text;
    return this;
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {Selectable_text_sentence}
 */
Selectable_text_sentence.prototype = new KALS_user_interface();

/**
 * 父物件
 * @type {Selectable_text}
 */
Selectable_text_sentence.prototype._selectable_text;

/**
 * 主要可以選擇的物件
 * @type {jQuery}
 */
Selectable_text_sentence.prototype._text;

// -----------------------------------
// 內部參數設定
// -----------------------------------

/**
 * 標點符號的classname
 * @type {String}
 */
Selectable_text_sentence.prototype.punctuation_classname = 'kals-punctuation';

/**
 * 分句用的標點符號classname
 * @type {String}
 */
Selectable_text_sentence.prototype.sententce_punctuation_classname = 'kals-sentence-punctuation';

/**
 * 分句用索引的classname
 * @type {String}
 */
Selectable_text_sentence.prototype.sententce_index_classname = 'kals-sentence-index';

/**
 * 句子特徵，保存句子切割的特徵。
 * @type {Array|number}
 */
Selectable_text_sentence.prototype.sententce_structure = [];


// -----------------------------------

/**
 * 取得句子位置的索引
 * 
 * 用來分析標註所在句子，跟段落paragraph是不一樣的。
 * @author Pudding Chen 20121228
 * @return {Array}
 */
Selectable_text_sentence.prototype.get_sentence_index = function () {
	
    //如果已經作過這樣的分析的話
    if (this._text.find('.'+this.sententce_index_classname).length > 0)
    {
            var _sentences = this._text.find('.'+this.sententce_index_classname);
            var _sentence_index = [];
            for (var _i = 0; _i < _sentences.length; _i++)
            {
                    var _sentence = _sentences.eq(_i);
                    var _word_id = _sentence.attr('id');
                    _word_id = _word_id.substr(this.word_id_prefix.length, _word_id);
                    _word_id = parseInt(_word_id,10);
                    _sentence_index.push(_word_id);
            }

            return _sentence_index;
    }

    //先來看被視為分句的標點符號位置
    _sentence_index = [0];
    var _sentence_punctuation =  $('.'+this.sententce_punctuation_classname);

    for (var _s = 0; _s < _sentence_punctuation.length; _s++)
    {
            var _id = _sentence_punctuation.eq(_s).attr('id');
            //kals_word_953
            //_id = _id.substring(10, _id.length);
            _id = $.get_prefixed_id(_id);
            _sentence_index.push(parseInt(_id,10));	
    }

    //再來看段落的最後一個字
    var _last_word = this._text.find('.'+this.word_classname+':last');
    var _last_paragraph = _last_word.parents("."+this.paragraph_classname+":first");

    //var _last_paragraph_classname = _last_paragraph.attr('className');
    //var _paragraph_classname_header = this.paragraph_classname + ' ' + this.paragraph_id_prefix;  
    //var _last_pid = _last_paragraph_classname.substring(_paragraph_classname_header.length , _last_paragraph_classname.length);
    //_last_pid = parseInt(_last_pid);
    var _last_pid = $.get_class_prefixed_id(_last_paragraph, this.paragraph_id_prefix);

    for (_i = 0; _i < _last_pid+1; _i++) {
        var _paragraph = $('.' + this.paragraph_id_prefix + _i + ":last");

        if (_paragraph.length === 1) 
        {
            _last_word = _paragraph.find('.'+this.word_classname+'.tooltip-trigger:last:not(.'+this.sententce_punctuation_classname+')');

            if (_last_word.length > 0) {
                _id = _last_word.attr('id');

                //_id = _id.substring(this.word_id_prefix.length, _id.length);
                _id = $.get_prefixed_id(_id);
                _sentence_index.push(parseInt(_id,10));

                if (isNaN(_id))
                {
                    _last_word.css('color', 'blue')
                            .attr('title', _id);
                }
            }
        }
    }

    //檢查測試結果用
    for (_i = 0; _i < _sentence_index.length; _i++) {

        var _sentense_index_word = $('#' + this.word_id_prefix + _sentence_index[_i]);
        _sentense_index_word.addClass(this.sententce_index_classname);

        //檢測找到的字是否真的是分句點，平時不使用應關掉
        //_sentense_index_word.css("color", "red");
        //alert([$('#kals_word_' + _i).length, _i]);
    }

    //排序
    //_sentence_index.sort(function (_a, _b) {
    //	return (_a - _b);
    //});

    return _sentence_index;
};

/* End of file Selectable_text_sentence */
/* Location: ./system/application/views/web_apps/Selectable_text_sentence.js */