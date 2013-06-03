/**
 * KALS_language
 * 語系控制器
 *
 * @package		KALS
 * @category		JavaScript Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/27 下午 06:47:21
 * @extends {Event_dispatcher}
 */
function KALS_language() {
    
    Event_dispatcher.call(this);
    
    this._lang = {};
    this._listeners_lang_param = [];
    
    var _this = this;
    //Context訂閱一下
    if (typeof(KALS_context) != 'undefined') {
        KALS_context.add_listener(function (_dispatcher, _data) {
            if (typeof(_data.KALS_language) != 'undefined') {
				_this.set_lang(_data.KALS_language);
			}
        });
    }
}

KALS_language.prototype = new Event_dispatcher();

/**
 * 語言檔的內容
 * @type {Object} JSON
 * @property
 * @private
 */
KALS_language.prototype._lang = {};

/**
 * 監聽者請求的語系擋內容
 * @type {Array} = [
 *     param1,    //KALS_language_param
 *     param2
 * ]
 * @property
 * @private
 */
KALS_language.prototype._listeners_lang_param = [];

/**
 * 將資料語系資料保存到lang變數中
 * 2010.9.2 現在是從KALS_context.load()中去向伺服器取得語系資料。設定的地方請看KALS_language的constructor
 * @param {Object} _lang_data
 */
KALS_language.prototype.set_lang = function(_lang_data){
    this._lang = _lang_data;
    this.set_changed();
    this.notify_listeners(_lang_data);
    return this;
};

/**
 * 依據語系索引取得語系檔
 * 
 * @param {KALS_language_param|string} _lang_param 如果是字串，則會將_lang_param直接作為語系索引
 * @type {jQuery} 輸出的語系結果
 */
KALS_language.prototype.line = function(_lang_param){
    var _line, _arg;
    if ($.is_object(_lang_param)) {
		_line = $.get_parameter(_lang_param, 'line');
		_arg = $.get_parameter(_lang_param, 'arg');
	}
	else 
		if ($.is_string(_lang_param)) {
			_line = _lang_param;
		}
    
    if ($.is_null(_line)) {
		return null;
	}
    
    if ($.isset(this._lang) &&
	$.isset(this._lang[_line])) {
		var _lang = this._lang[_line];
		_lang = this._lang_set_arg(_lang, _arg);
		return _lang;
	}
	else {
		return null;
	}
};

/**
 * 將lang字串中取代參數
 * @param {string} _lang
 * @param {Array} _arg
 * @type {jQuery}
 */
KALS_language.prototype._lang_set_arg = function (_lang, _arg) {
    if ($.isset(_arg)) {
        _arg = $.filter_array(_arg);
        
        //$.test_msg('lang._lang_set_arg' [_lang, _arg]);
        
        for (var _i in _arg) {
            var _search = '{'+_i+'}';
            var _replace = '<span class="lang-arg-'+_i+'"></span>';
            _lang = $.str_replace(_search, _replace, _lang); 
        }
        
        _lang = $('<span>'+_lang+'</span>');
        
        for (_i in _arg) {
            var _a = _arg[_i];
			if ($.is_object(_a) && typeof(_a.msg) == "string") {
				_lang.find('span.lang-arg-' + _i).html(_a);
			}
            else if ($.is_object(_a)) {
				_lang.find('span.lang-arg-' + _i).append(_a);
			}
			else {
				_lang.find('span.lang-arg-' + _i).html(_a);
			}
        }
    }
    return _lang;
};

/**
 * 加入觀察
 * @param {jQuery} _obj 要顯示語系的容器
 * @param {String|KALS_language_param} _lang_param 語系參數
 */
KALS_language.prototype.add_listener = function(_obj, _lang_param) {
    if ($.inArray(_obj, this._listeners) == -1) {
        this._listeners.push(_obj);
        var _key = $.inArray(_obj, this._listeners);
        
        if ($.is_string(_lang_param)) {
			_lang_param = new KALS_language_param(_lang_param);
		}
       
        this._listeners_lang_param[_key] = _lang_param;
        
        var _lang = this.line(_lang_param);
        
        if ($.isset(_lang)) {
            this._setup_obj(_obj, _lang);
        }   
        else if (typeof(_lang_param.msg) != 'undefined'
            && $.isset(_lang_param.msg)) {
            //如果找不到語系檔，則將預設顯示值輸出
            this._setup_obj(_obj, _lang_param.msg);
        }   
    }
    else {
        //如果已經存在此設定，則刪除原本的設定之後，再設定一次
        this.delete_listener(_obj);
        this.add_listener(_obj, _lang_param);
    }
    return this;
};

/**
 * 移除監聽者
 * @param {Object} _obj
 */
KALS_language.prototype.delete_listener = function (_obj) {
    var _key = $.inArray(_obj, this._listeners);
    if (_key > -1) {
        delete this._listeners[_key];
        delete this._listeners_lang_param[_key];
    }
    return this;
};

/**
 * 當語系檔有所修改時(KALS_language.set_lang())，確認每個觀察者是否有對應的語系檔，然後設定之。
 */
KALS_language.prototype.notify_listeners = function () {
    if (this._changed) {
        for (var _i in this._listeners) {
            var _lang_param = this._listeners_lang_param[_i];
            var _lang = this.line(_lang_param);
            if ($.isset(_lang)) {
                this._setup_obj(this._listeners[_i], _lang);
            }
        }
        this._changed = false;
    }
    return this;
};

/**
 * 建立監聽者
 * @param {string|KALS_language_param} _lang_param 語系參數
 */
KALS_language.prototype.create_listener = function (_lang_param) {
    if ($.is_string(_lang_param)) {
        _lang_param = new KALS_language_param(_lang_param);
    }
    
    var _listener = $('<span></span>');
    
    this.add_listener(_listener, _lang_param);
    
    return _listener;
};

/**
 * 建立間隔時間的監聽者
 * @param {number} _time
 * @type {jQuery}
 */
KALS_language.prototype.create_interval_time_listener = function (_time) {
    
    var _param = this.get_interval_param(_time);
    return this.create_listener(_param);
};

KALS_language.prototype.get_interval_message = function (_time) {
    var _param = this.get_interval_param(_time);
    return this.line(_param);
};

/**
 * 日期相關的語言變數。
 * @property
 * @private
 */
KALS_language.prototype._date_params = {
    interval: {
        recent: new KALS_language_param('recent', 'time.recent'),
        within_minute: new KALS_language_param('within 1 mimute', 'time.within_1_minute'),
        minute: new KALS_language_param('1 mimute ago', 'time.1_minute_ago'),
        minutes: new KALS_language_param('{0} mimutes ago', 'time.n_minutes_ago'),
        hour: new KALS_language_param('1 hour ago', 'time.1_hour_ago'),
        hours: new KALS_language_param('{0} hours ago', 'time.n_hours_ago'),
        half_day: new KALS_language_param('half of the day ago', 'time.half_day_ago'),
        day: new KALS_language_param('1 day ago', 'time.1_day_ago'),
        days: new KALS_language_param('{0} days ago', 'time.n_days_ago'),
        week: new KALS_language_param('1 week ago', 'time.1_week_ago'),
        weeks: new KALS_language_param('{0} weeks ago', 'time.n_weeks_ago'),
        month: new KALS_language_param('1 month ago', 'time.1_month_ago'),
        months: new KALS_language_param('{0} months ago', 'time.n_months_ago'),
        date: new KALS_language_param('{0} {1}', 'time.on_date'),
        year: new KALS_language_param('{0}', 'time.in_year')
    },  
    month_name: [
        null,    //編號0沒有月份
        new KALS_language_param('Jan', 'time.month_name.1'),
        new KALS_language_param('Feb', 'time.month_name.2'),
        new KALS_language_param('Mar', 'time.month_name.3'),
        new KALS_language_param('Apr', 'time.month_name.4'),
        new KALS_language_param('May', 'time.month_name.5'),
        new KALS_language_param('Jun', 'time.month_name.6'),
        new KALS_language_param('Jul', 'time.month_name.7'),
        new KALS_language_param('Aug', 'time.month_name.8'),
        new KALS_language_param('Sep', 'time.month_name.9'),
        new KALS_language_param('Oct', 'time.month_name.10'),
        new KALS_language_param('Nov', 'time.month_name.11'),
        new KALS_language_param('Dec', 'time.month_name.12') 
    ]
};

/**
 * 建立間隔時間敘述
 * 
 * 間距：
 * - 最近: 0 ~ 30s
 * - 1分鐘之內: 30s ~ 1m 
 * - n分鐘: 1m ~ 1h  
 * - 1小時左右: 1h ~ 1.5h
 * - n小時左右: nh - 0.5h ~ nh + 0.5h
 * - 半天左右: 12h ~ 1d
 * - 1天左右: 1d ~ 1.5d
 * - n天左右: nd-0.5d ~ nd+0.5d
 * - 1週左右: 7d ~ 10.5d
 * - 2週左右: 10.5d ~ 17.5d
 * - 半個月左右: 17.5d ~ 30d
 * - 1個月: 30d ~ 45d
 * - 8月26日: 45d ~ 365d
 * - 2011年: 365d ~ 
 * @param {number|strig} _time 單位是秒數
 * @type {KALS_language_param} Lang語言變數的結果
 */
KALS_language.prototype.get_interval_param = function (_time) {
    var _s, _m, _h, _hh, _d, _hd, _w, _hw, _y;
    _s = 1;    //一秒鐘
    _m = _s * 60;    //一分鐘
    _h = _m * 60;    //一小時
    _hh = _h / 2;    //半小時
    _d = _h * 24;    //一天
    _hd = _d / 2;    //半天
    _w = _d * 7;    //一週
    _hw = _w / 2;    //半週
    _month = 30* _d;
    _y = _d * 365;    //一年
    
    var _date_params = this._date_params.interval;
    var _lang_param = null;
    var _unit = null;
    
    if ($.is_string(_time)) {
		_time = parseInt(_time, 10);
	}
    
    var _interval = $.get_interval_time(_time);
    
    //$.test_msg('lang.get_itnerval_param()', [_time, _interval]);
    
    var _test_scope = function (_min, _max) {
        
        if (_min === null) {
            _min = 0;
        }
        
        if (_max !== null) {
            if ($.is_number(_max)) {
                _max--;
            }
            return (_interval > _min && _interval < _max);
        }
        else {
            return (_interval > _min);
        }
    };
    
    var _parse_unit = function (_len) {
        var _u = _interval / _len;
        _u = Math.round(_u); 
        return _u;
    };
    
    if (_interval < 30 *_s) {
        _lang_param = _date_params.recent;
    }
    else if (_test_scope(30*_s, _m)) {
        _lang_param = _date_params.within_minute;
    }
    else if (_test_scope(_m, _h)) {
        _unit = _parse_unit(_m);
        _lang_param = _date_params.minutes;
    }
    else if (_test_scope(_h, 2*_h)) {
        _lang_param = _date_params.hour;
    }
    else if (_test_scope(2*_h, 12*_h)) {
        _unit = _parse_unit(_h);
        _lang_param = _date_params.hours;
    }
    else if (_test_scope(12*_h, _d)) {
        _lang_param = _date_params.half_day;
    }
    else if (_test_scope(_d, 2*_d)) {
        _lang_param = _date_params.day;
    }
    else if (_test_scope(2*_d, _w)) {
        _unit = _parse_unit(_d);
        _lang_param = _date_params.days;
    }
    else if (_test_scope(_w, 2*_w)) {
        _lang_param = _date_params.week;
    }
    else if (_test_scope(2*_w, 3*_w)) {
        _unit = _parse_unit(_w);
        _lang_param = _date_params.weeks;
    }
    else if (_test_scope(3*_w, _month)) {
        _lang_param = _date_params.month;
    }
    else if (_test_scope(_month, _y)) {
        var _date_obj = new Date();
        _date_obj.setTime(_time);
        
        _month = this.get_month((_date_obj.getMonth()+1));
        var _date = _date_obj.getDate();
        $.test_msg("lang month", _month);
        _lang_param = _date_params.date;
        _lang_param.arg = [_month, _date];
    }
    else if (_test_scope(_y, null)) {
        _date_obj = new Date();
        _date_obj.setTime(_time);
        
        var _year = _date_obj.getYear();
        _lang_param = _date_params.year;
        _unit = _year;
    }
    
    if (_unit !== null
        && $.is_class(_lang_param, 'KALS_language_param')
        && $.is_null(_lang_param.arg)) {
        _lang_param.arg = [_unit];
    }
    
    return _lang_param;
};

/**
 * 取得月份
 * @param {number} _month_number 是1~12
 * @type {string} 月份字串，例如Jan、Feb
 */
KALS_language.prototype.get_month = function (_month_number) {
    if ($.is_number(_month_number)
        && _month_number > 0
        && _month_number < 13) {
		$.test_msg("lang", _month_number);
        return this._date_params.month_name[_month_number];
    }
    return null;
};

/**
 * 將顯示語言資料_lang設置到物件_obj中。依據_obj的不同，input跟textarea會設置到placeholder的值去。
 * @param {jQuery} _obj
 * @param {string} _lang
 */
KALS_language.prototype._setup_obj = function (_obj, _lang) {
    var _tag_name = _obj.attr('tagName').toLowerCase();
    if (_tag_name == 'input'
        || _tag_name == 'textarea') {   
        _obj.attr('placeholder', _lang).val('').blur();    //.change();
        
    }
    else {
        _obj.html(_lang);
    }
    return this;
};

/* End of file KALS_language */
/* Location: ./system/application/views/web_apps/core/KALS_language.js */