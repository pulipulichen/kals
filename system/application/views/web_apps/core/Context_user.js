/**
 * Context_user
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/11 下午 10:40:29
 * @extends {Attribute_event_dispatcher}
 */
function Context_user(){
    
    Attribute_event_dispatcher.call(this);
    
    //$.test_msg('Context_user() 確認KALS_context.auth', $.object_isset('KALS_context.auth.add_listener'));
    
    //if ($.object_isset('KALS_context.auth.add_listener'))
    //{        
        KALS_context.auth.add_listener(this);
    //}
    
    var _this = this;
    setTimeout(function () {
        _this.set_anchor_navigation_type(KALS_CONFIG.anchor_navigation_type);
    }, 0);
}

Context_user.prototype = new Attribute_event_dispatcher();

Context_user.prototype._$data_key = 'user';
    
Context_user.prototype.set_email = function (_value) {
    this.set_attr('email', _value);
};

Context_user.prototype.set_name = function (_name) {
    this.set_attr('name', _name);
};

Context_user.prototype.set_id = function (_value) {
    this.set_attr('id', _value);
};

Context_user.prototype.set_photo = function (_value) {
    this.set_attr('has_photo', _value);
};

Context_user.prototype.set_locale = function (_value) {
    this.set_attr('locale', _value);
};

Context_user.prototype.set_sex = function (_value) {
    this.set_attr('sex', _value);
};

Context_user.prototype.get_name = function (_length) {
    return this.get_attr('name', null, _length);
};

Context_user.prototype.get_id = function () {
    return this.get_attr('id');
};

Context_user.prototype.get_locale = function () {
    return this.get_attr('locale');
};

Context_user.prototype.get_sex = function () {
    return this.get_attr('sex');
};

/**
 * 設定標註指引類型
 * 有all、recommend、none三種
 * @param {String} _type 標註指引類型
 * @version 20111106 Pudding Chen
 */
Context_user.prototype.set_anchor_navigation_type = function (_type) {
    return this.set_attr('anchor_navigation_type', _type);
};

/**
 * 取得標註指引類型
 * 預設存放在KALS_CONFIG.anchor_navigation_type當中
 * 有all、recommend、none三種
 * @type {String}
 * @version 20111106 Pudding Chen
 */
Context_user.prototype.get_anchor_navigation_type = function () {
    return this.get_attr('anchor_navigation_type', KALS_CONFIG.anchor_navigation_type);
};

/**
 * 是否擁有照片
 * @type {boolean}
 * @memberOf {Context_user}
 */
Context_user.prototype.has_photo = function () {
    var _has_photo = this.get_attr('has_photo');
    if ($.is_null(_has_photo)) {
        return false;
    }
    else {
        return _has_photo;
    }
};

Context_user.prototype.get_email = function () {
    return this.get_attr('email');
};

Context_user.prototype.has_login = function () {
    var _id = this.get_id();
    return ($.isset(_id));
};

/**
 * 取得目前使用者的User_param
 * @type {User_param}
 */
Context_user.prototype.get_data = function () {
    if (KALS_context.auth.is_login() === false) {
        return null;
    }
    
    var _id = this.get_id();
    var _name = this.get_name();
    
    if (_id === null) {
        return null;
    }
    
    var _param = new User_param(_id, _name);
    return _param;
};

/**
 * 取得使用者參數
 * @returns {User_param}
 */
Context_user.prototype.get_user_param = function () {
    if (this.has_login()) {
        return new User_param(this.get_id(), this.get_name());
    }
    else {
        return null;
    }
};

// --------------------------------------
// 統計資訊
// --------------------------------------

/**
 * 標註記錄
 * @type JSON
 */
Context_user.prototype._annotation_count = {
    /**
     * 主題標註
     * @type {JSON} = {
     *    importanct: 1,
     *    question: 2
     * }
     */
    "topic_annotation_count": {},
    /**
     * 回應到自己的標註
     * @type {JSON} = {
     *    importanct: 1,
     *    question: 2
     * }
     */
    "respond_to_my_annotation_count": {},
    /**
     * 回應到別人的標註
     * @type {JSON} = {
     *    importanct: 1,
     *    question: 2
     * }
     */
    "respond_to_other_annotation_count": {}
};

/**
 * 設定標註次數
 * 
 * @param {String} _wrtie_type "topic", "respond_to_my", "respond_to_other"
 * @param {Annotation_type_param} _annotation_type 標註類型
 * @param {Int} _count 次數
 * @returns {Context_user}
 */
Context_user.prototype.set_annotation_count = function (_write_type, _annotation_type, _count) {
    if ($.is_string(_write_type) === false 
            || $.is_class(_annotation_type, "Annotation_type_param") === false 
            || $.is_number(_count) === false) {
        KALS_util.show_exception("Context_user.set_annotation_count() parameters error: " 
                + [($.is_string(_write_type) === false), ($.is_class(_annotation_type, "Annotation_type_param") === false), ($.is_number(_count) === false)]);
        return this;
    }
    
    if (_count < 0) {
        _count = 0;
    }
    
    var _type_name = _annotation_type.get_name();
    this._annotation_count[_write_type][_type_name] = _count;
    
    var _write_type_count = this.get_annotation_count(_write_type);
    this.set_attr(_write_type, _write_type_count);
    //$.test_msg("Context_user.set_annotation_count", [_write_type, _type_name, _count, _write_type_count]);
    
    return this;
};

/**
 * 設定標註次數依照_count調整
 * 
 * @param {String} _wrtie_type "topic", "respond_to_my", "respond_to_other"
 * @param {Annotation_type_param} _annotation_type 標註類型
 * @param {Int} _count 次數
 * @returns {Context_user}
 */
Context_user.prototype.set_annotation_count_modify = function (_write_type, _annotation_type, _count) {
    if ($.is_string(_write_type) === false 
            || $.is_class(_annotation_type, "Annotation_type_param") === false 
            || $.is_number(_count) === false) {
        KALS_util.show_exception("Context_user.set_annotation_count_modify() parameters error: " 
                + [($.is_string(_write_type) === false), _write_type, ($.is_class(_annotation_type, "Annotation_type_param") === false), ($.is_number(_count) === false), _count]);
        return this;
    }
    
    var _original_count = this.get_annotation_count(_write_type, _annotation_type);
    var _modified_count = _original_count + _count;
    
    //$.test_msg("Context_user.set_annotation_count_modify", [_write_type, _count, _original_count, _modified_count]);
    
    return this.set_annotation_count(_write_type, _annotation_type, _modified_count);
};

/**
 * 設定標註次數增加
 * 
 * @param {String} _wrtie_type "topic", "respond_to_my", "respond_to_other"
 * @param {Annotation_type_param} _annotation_type 標註類型
 * @param {Int} _count 次數，可省略，預設是1
 * @returns {Context_user}
 */
Context_user.prototype.set_annotation_count_add = function (_write_type, _annotation_type, _count) {
    if (_count === undefined) {
        _count = 1;
    }
    return this.set_annotation_count_modify(_write_type, _annotation_type, _count);
};

/**
 * 設定標註次數減少
 * 
 * @param {String} _wrtie_type "topic", "respond_to_my", "respond_to_other"
 * @param {Annotation_type_param} _annotation_type 標註類型
 * @param {Int} _count 次數，可省略，預設是1
 * @returns {Context_user}
 */
Context_user.prototype.set_annotation_count_reduce = function (_write_type, _annotation_type, _count) {
    //$.test_msg("set_annotation_count_reduce", [_write_type, _annotation_type.get_name(), _count, typeof(_count), (_count === null)]);
    
    if (_count === undefined) {
        _count = 1;
    }
    
    if ($.is_number(_count)) {
        _count = -1 * _count;
        this.set_annotation_count_modify(_write_type, _annotation_type, _count)
    }
    return this;
};

/**
 * 設定標註次數修改
 * 
 * @param {String} _wrtie_type "topic", "respond_to_my", "respond_to_other"
 * @param {Annotation_type_param} _original_type 原本的標註類型
 * @param {Annotation_type_param} _annotation_type 修改後的標註類型
 * @returns {Context_user}
 */
Context_user.prototype.set_annotation_count_change = function (_write_type, _original_type, _annotation_type) {
    if (_original_type.equals(_annotation_type) === false) {
        //$.test_msg("set_annotation_count_change", [_write_type, _original_type.get_name(), _annotation_type.get_name()]);
        this.set_annotation_count_reduce(_write_type, _original_type);
        this.set_annotation_count_add(_write_type, _annotation_type);
    }
    return this;
};

/**
 * 取得標註次數
 * 
 * @param {String} _write_type "topic", "respond_to_my", "respond_to_other"，可省略
 * @param {Annotation_type_param} _annotation_type 標註類型，可省略
 * @returns {Int}
 */
Context_user.prototype.get_annotation_count = function (_write_type, _annotation_type) {
    
    var _count = 0;
    var _type_name;
    if ($.is_string(_write_type)) {
        if ($.is_class(_annotation_type, "Annotation_type_param")) {
            // 限定類型
            //$.test_msg("this._annotation_count[_write_type]" , this._annotation_count[_write_type]);
            _type_name = _annotation_type.get_name();
            if (typeof(this._annotation_count[_write_type][_type_name]) !== "undefined") {
                _count = this._annotation_count[_write_type][_type_name];
            }
            else {
                _count = 0;
            }
            return _count;
        }
        else {
            // 不限定類型
            var _annotation_count_collection = this._annotation_count[_write_type];
            for (_type_name in _annotation_count_collection) {
                var _type_count = _annotation_count_collection[_type_name];
                _count = _count + _type_count;
            }
            return _count;
        }
    }
    else {
        var _write_annotation_count_collection = this._annotation_count;
        for (_write_type in _write_annotation_count_collection) {
            var _annotation_count_collection = this._annotation_count[_write_type];
            if ($.is_class(_annotation_type, "Annotation_type_param")) {
                // 限定類型
                _type_name = _annotation_type.get_name();
                _count = _count + _annotation_count_collection[_type_name];
            }
            else {
                // 不限定類型
                for (_type_name in _annotation_count_collection) {
                    var _type_count = _annotation_count_collection[_type_name];
                    _count = _count + _type_count;
                }
            }
        }
        return _count;
    }
};

// -------------------------------
// parse write type

/**
 * 設定標註次數
 * 
 * @param {Annotation_param} _annotation_param 標註類型
 * @param {Int} _count 次數
 * @returns {Context_user}
 */
Context_user.prototype.set_annotation_count_by_param = function (_annotation_param, _count) {
    if ($.is_class(_annotation_param, "Annotation_param") === false 
            || $.is_number(_count) === false) {
        KALS_util.show_exception("Context_user.set_annotation_count() parameters error");
        return this;
    }
    
    if (_count < 0) {
        _count = 0;
    }
    
    // ------------------------
    // 加入Context_user的計數
    
    var _annotation_type_param = _annotation_param.type;
    var _write_type = this.parse_anntation_param_write_type(_annotation_param);
    
    return this.set_annotation_count(_write_type, _annotation_type_param, _count);
};

/**
 * 分析新增標註的形態
 * 
 * @param {Annotation_param} _annotation_param
 * @returns {String}
 */
Context_user.prototype.parse_anntation_param_write_type = function (_annotation_param) {
    
    var _is_respond = _annotation_param.is_respond();
    var _write_type;
    if (_is_respond === false) {
        //$.test_msg("create callback", _annotation_type_param);
        _write_type = "topic_annotation_count";
    } 
    else {
        var _topic_annotation_param = _annotation_param.topic;
        var _is_my_topic = _topic_annotation_param.is_my_annotation();
        
        if (_is_my_topic) {
            //KALS_context.user.set_respond_to_my_annotation_count_add(_annotation_type_param);
            _write_type = "respond_to_my_annotation_count";
        }
        else {
            //KALS_context.user.set_respond_to_other_annotation_count_add(_annotation_type_param);
            _write_type = "respond_to_other_annotation_count";
        }
    }
    
    return _write_type;
};

/**
 * 設定標註次數
 * 
 * @param {Annotation_param} _annotation_param 標註類型
 * @param {Int} _count 次數
 * @returns {Context_user}
 */
Context_user.prototype.get_annotation_count_by_param = function (_annotation_param) {
    if ($.is_class(_annotation_param, "Annotation_param") === false) {
        KALS_util.show_exception("Context_user.get_annotation_count() parameters error");
        return this;
    }
    
    var _annotation_type_param = _annotation_param.type;
    var _write_type = this.parse_anntation_param_write_type(_annotation_param);
    
    return this.get_annotation_count(_write_type, _annotation_type_param);
};

/**
 * 設定標註次數
 * 
 * @param {Annotation_param} _annotation_param 標註類型
 * @param {Int} _count 次數
 * @returns {Context_user}
 */
Context_user.prototype.set_annotation_count_modify_by_param = function (_annotation_param, _count) {
    if ($.is_class(_annotation_param, "Annotation_param") === false 
            || $.is_number(_count) === false) {
        KALS_util.show_exception("Context_user.set_annotation_count() parameters error");
        return this;
    }
    
    var _annotation_type_param = _annotation_param.type;
    var _write_type = this.parse_anntation_param_write_type(_annotation_param);
    
    return this.set_annotation_count_modify(_write_type, _annotation_type_param, _count);
};

/**
 * 依據標註參數，增加標註的次數
 * 
 * @param {Annotation_param} _annotation_param 標註類型
 * @param {Int} _count 次數
 * @returns {Context_user}
 */
Context_user.prototype.set_annotation_count_add_by_param = function (_annotation_param, _count) {
    if (_count === undefined) {
        _count = 1;
    }
    return this.set_annotation_count_modify_by_param(_annotation_param, _count);
};

/**
 * 依據標註參數，降低標註的次數
 * 
 * @param {Annotation_param} _annotation_param 標註類型
 * @param {Int} _count 次數
 * @returns {Context_user}
 */
Context_user.prototype.set_annotation_count_reduce_by_param = function (_annotation_param, _count) {
    if (_count === undefined) {
        _count = 1;
    }
    if ($.is_number(_count)) {
        _count = -1 * _count;
    }
    return this.set_annotation_count_modify_by_param(_annotation_param, _count);
};

/**
 * 依據標註參數，降低標註的次數
 * 
 * @param {Annotation_param} _original_param 原本的標註類型
 * @param {Annotation_param} _annotation_param 變更的標註類型
 * @returns {Context_user}
 */
Context_user.prototype.set_annotation_count_change_by_param = function (_original_param, _annotation_param) {
    var _original_type = _original_param.type;
    var _annotation_type = _annotation_param.type;
    if (_original_type.equals(_annotation_type) === false) {
        this.set_annotation_count_reduce_by_param(_original_param);
        this.set_annotation_count_add_by_param(_annotation_param);
    }
    return this;
};

// ------------------------------
// topic_annotation_count

/**
 * 設定主題標註次數
 * 
 * @param {Annotation_type_param} _annotation_type 標註類型
 * @param {Int} _count 次數
 * @returns {Context_user}
 */
Context_user.prototype.set_topic_annotation_count = function (_annotation_type, _count) {
    return this.set_annotation_count("topic_annotation_count", _annotation_type, _count);
};

/**
 * 設定主題標註次數增加
 * 
 * @param {Annotation_type_param} _annotation_type 標註類型
 * @param {Int} _count 次數，可省略，預設是1次
 * @returns {Context_user}
 */
Context_user.prototype.set_topic_annotation_count_add = function (_annotation_type, _count) {
    return this.set_annotation_count_add("topic_annotation_count", _annotation_type, _count);
};

/**
 * 設定主題標註次數減少
 * 
 * @param {Annotation_type_param} _annotation_type 標註類型
 * @param {Int} _count 次數，可省略，預設是1次
 * @returns {Context_user}
 */
Context_user.prototype.set_topic_annotation_count_reduce = function (_annotation_type, _count) {
    return this.set_annotation_count_reduce("topic_annotation_count", _annotation_type, _count);
};

/**
 * 設定主題標註次數改變
 * 
 * @param {Annotation_type_param} _original_type 標註類型
 * @param {Annotation_type_param} _annotation_type 標註類型
 * @returns {Context_user}
 */
Context_user.prototype.set_topic_annotation_count_change = function (_original_type, _annotation_type) {
    //$.test_msg("set_topic_annotation_count_change", [_original_type.get_name(), _annotation_type.get_name()]);
    return this.set_annotation_count_change("topic_annotation_count", _original_type, _annotation_type);
};

/**
 * 取得主題標註次數
 * 
 * @param {Annotation_type_param} _annotation_type 標註類型，可省略
 * @returns {Int}
 */
Context_user.prototype.get_topic_annotation_count = function (_annotation_type) {
    return this.get_annotation_count("topic_annotation_count", _annotation_type);
};

// ------------------------------
// respond_to_my_annotation_count

/**
 * 設定回應到自己的標註次數
 * 
 * @param {Annotation_type_param} _annotation_type 標註類型
 * @param {Int} _count 次數
 * @returns {Context_user}
 */
Context_user.prototype.set_respond_to_my_annotation_count = function (_annotation_type, _count) {
    return this.set_annotation_count("respond_to_my_annotation_count", _annotation_type, _count);
};

/**
 * 設定回應到自己的標註次數增加
 * 
 * @param {Annotation_type_param} _annotation_type 標註類型
 * @param {Int} _count 次數，可省略，預設是1次
 * @returns {Context_user}
 */
Context_user.prototype.set_respond_to_my_annotation_count_add = function (_annotation_type, _count) {
    return this.set_annotation_count_add("respond_to_my_annotation_count", _annotation_type, _count);
};

/**
 * 設定回應到自己的標註次數減少
 * 
 * @param {Annotation_type_param} _annotation_type 標註類型
 * @param {Int} _count 次數，可省略，預設是1次
 * @returns {Context_user}
 */
Context_user.prototype.set_respond_to_my_annotation_count_reduce = function (_annotation_type, _count) {
    return this.set_annotation_count_reduce("respond_to_my_annotation_count", _annotation_type, _count);
};


/**
 * 設定回應到自己的標註次數改變
 * 
 * @param {Annotation_type_param} _original_type 標註類型
 * @param {Annotation_type_param} _annotation_type 標註類型
 * @returns {Context_user}
 */
Context_user.prototype.set_respond_to_my_annotation_count_change = function (_original_type, _annotation_type) {
    return this.set_annotation_count_change("respond_to_my_annotation_count", _original_type, _annotation_type);
};

/**
 * 取得回應到自己的標註次數
 * 
 * @param {Annotation_type_param} _annotation_type 標註類型，可省略
 * @returns {Int}
 */
Context_user.prototype.get_respond_to_my_annotation_count = function (_annotation_type) {
    return this.get_annotation_count("respond_to_my_annotation_count", _annotation_type);
};

// ------------------------------
// respond_to_other_annotation_count

/**
 * 設定回應到別人的標註次數
 * 
 * @param {Annotation_type_param} _annotation_type 標註類型
 * @param {Int} _count 次數
 * @returns {Context_user}
 */
Context_user.prototype.set_respond_to_other_annotation_count = function (_annotation_type, _count) {
    return this.set_annotation_count("respond_to_other_annotation_count", _annotation_type, _count);
};

/**
 * 設定回應到別人的標註次數增加
 * 
 * @param {Annotation_type_param} _annotation_type 標註類型
 * @param {Int} _count 次數，可省略，預設是1次
 * @returns {Context_user}
 */
Context_user.prototype.set_respond_to_other_annotation_count_add = function (_annotation_type, _count) {
    return this.set_annotation_count_add("respond_to_other_annotation_count", _annotation_type, _count);
};

/**
 * 設定回應到別人的標註次數減少
 * 
 * @param {Annotation_type_param} _annotation_type 標註類型
 * @param {Int} _count 次數，可省略，預設是1次
 * @returns {Context_user}
 */
Context_user.prototype.set_respond_to_other_annotation_count_reduce = function (_annotation_type, _count) {
    return this.set_annotation_count_reduce("respond_to_other_annotation_count", _annotation_type, _count);
};

/**
 * 設定回應到別人的標註次數改變
 * 
 * @param {Annotation_type_param} _original_type 標註類型
 * @param {Annotation_type_param} _annotation_type 標註類型
 * @returns {Context_user}
 */
Context_user.prototype.set_respond_to_other_annotation_count_change = function (_original_type, _annotation_type) {
    return this.set_annotation_count_change("respond_to_other_annotation_count", _original_type, _annotation_type);
};

/**
 * 取得回應到別人的標註次數
 * 
 * @param {Annotation_type_param} _annotation_type 標註類型，可省略
 * @returns {Int}
 */
Context_user.prototype.get_respond_to_other_annotation_count = function (_annotation_type) {
    return this.get_annotation_count("respond_to_other_annotation_count", _annotation_type);
};

// ------------------------------
// responded_annotation_count

/**
 * 設定被別人回應的標註次數
 * 
 * @param {Int} _count 次數
 * @returns {Context_user}
 */
Context_user.prototype.set_responded_annotation_count = function (_count) {
    return this.set_attr("responded_annotation_count", _count);
};

/**
 * 取得被別人回應的標註次數
 * @param {Int} _count 次數
 * @returns {Context_user}
 */
Context_user.prototype.get_responded_annotation_count = function () {
    // 取用user_statistic的方法？
    return this.get_attr("responded_annotation_count", 0);
};

/**
 * 設定被多少人回應的人數
 *
 *  @returns {Int}
 */
Context_user.prototype.set_responded_users_count = function (_count) {
    return this.set_attr("responded_users_count", _count);
};

/**
 * 取得被多少人回應的人數
 * 
 *   @returns {Int}
 */
Context_user.prototype.get_responded_users_count = function () {
    return this.get_attr("responded_users_count", 0);
};

/**
 * 設定回應了多少人的人數
 *
 *  @returns {Int}
 */
Context_user.prototype.set_respond_to_users_count = function (_count) {
    return this.set_attr("respond_to_users_count", _count);
};

/**
 * 取得回應了多少人的人數
 * 
 *   @returns {Int}
 */
Context_user.prototype.get_respond_to_users_count = function () {
    return this.get_attr("respond_to_users_count", 0);
};

// ------------------------------
// like_to_count
/**
 * 設定喜愛別人的次數
 * 
 * @todo 20140515 初始化尚未設定 Pulipuli Chen
 * @param {Int} _count 次數
 * @returns {Context_user}
 */
Context_user.prototype.set_like_to_count = function (_count) {
    return this.set_attr("like_to_count", _count);
};

/**
 * 增加喜愛別人的次數
 * 
 * @todo 20140515 來源尚未設定 Pulipuli Chen
 * @param {Int} _count 次數
 * @returns {Context_user}
 */
Context_user.prototype.set_like_to_count_add = function (_count) {
    return this.set_attr_add("like_to_count", _count);
};


/**
 * 減少喜愛別人的次數
 * 
 * @todo 20140515 來源尚未設定 Pulipuli Chen
 * @param {Int} _count 次數
 * @returns {Context_user}
 */
Context_user.prototype.set_like_to_count_reduce = function (_count) {
    return this.set_attr_reduce("like_to_count", _count);
};

/**
 * 取得喜愛別人的次數
 * 
 * @returns {Int}
 */
Context_user.prototype.get_like_to_count = function () {
    return this.get_attr("like_to_count", 0);
};


// ------------------------------
// liked_count

/**
 * 設定被喜愛別人的次數
 * 
 * @todo 20140515 初始化尚未設定 Pulipuli Chen
 * @todo 20140515 來源尚未設定 Pulipuli Chen
 * @param {Int} _count 次數
 * @returns {Context_user}
 */
Context_user.prototype.set_liked_count = function (_count) {
    return this.set_attr("liked_count", _count);
};

/**
 * 取得被喜愛別人的次數
 * 
 * @returns {Int}
 */
Context_user.prototype.get_liked_count = function () {
    return this.get_attr("liked_count", 0);
};

/**
 * 設定我喜愛了多少人的人數
 *
 *  @returns {Int}
 */
Context_user.prototype.set_like_to_users_count = function (_count) {
    return this.set_attr("like_to_users_count", _count);
};

/**
 * 取得我喜愛了多少人的人數
 * 
 *   @returns {Int}
 */
Context_user.prototype.get_like_to_users_count = function () {
    return this.get_attr("like_to_users_count", 0);
};
//-----------------
/**
 * 設定有多少人喜愛我的人數
 *
 *  @returns {Int}
 */
Context_user.prototype.set_liked_users_count = function (_count) {
    return this.set_attr("liked_users_count", _count);
};

/**
 * 取得我喜愛了多少人的人數
 * 
 *   @returns {Int}
 */
Context_user.prototype.get_liked_users_count = function () {
    return this.get_attr("liked_users_count", 0);
};

// ---------------------------------

/**
 * 接收來自他人的資料
 * 
 * 通常其他人利用JSONP_dispatcher.add_listener來訂閱資料
 * @param {JSONP_dispatcher} _dispatcher
 * @param {Object} _data 從伺服器回傳的JSON資料
 */
Context_user.prototype.update = function (_dispatcher, _data) {
    
    var _data_key = this._$data_key;
    if (_data_key === null || _data === undefined) {
        return this;
    }
    
    //$.test_msg("user.update", [typeof(_data[_data_key]), _data_key ]);
    if (typeof(_data[_data_key]) !== 'undefined') {
        for (var _key in _data[_data_key]) {
            this._pre_update(_key, _data[_data_key][_key]);
            this.set_attr(_key, _data[_data_key][_key]);
        }
    }
    else {
        this.reset();
    }
    
    //$.test_msg('attr name' , this.get_attr('name', 'NULL'));
    return this;
};

/**
 * 檢查資料並更新
 * @param {String} _key
 * @param {Object} _value
 * @returns {Context_user}
 */
Context_user.prototype._pre_update = function (_key, _value) {
    
    var _type_name, _count, _write_type, _type_param;
    if (_key === "topic_annotation_count" 
            || _key === "respond_to_my_annotation_count"
            || _key === "respond_to_other_annotation_count") {
        
        _write_type =  _key;
        
        var _count_collection = _value;
        
        for (_type_name in _count_collection) {
            _count = _count_collection[_type_name];
            _type_param = new Annotation_type_param(_type_name);
            this.set_annotation_count(_write_type, _type_param, _count);
        }
    }
    
    return this;
};


// ---------------------------------

/**
 * 從server端獲取user相關資料
 *
 */
Context_user.prototype._load_params_uri = "statistics/user_params";

/**
 * 
 * @returns {undefined}
 */
Context_user.prototype.load_user_params = function ( _callback){
    
    var _this = this;
    var _get_callback = function (_data){
        _this.update(_this, _data);
        $.trigger_callback( _callback);
        //$.test_msg("test_responded_count", _data);
    };       
        
    var _config = {
        url: _this._load_params_uri,
        callback: _get_callback
    };
    
    KALS_util.ajax_get(_config);

    return this;
};

/* End of file Context_user */
/* Location: ./system/application/views/web_apps/Context_user.js */