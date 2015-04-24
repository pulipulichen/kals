/**
 * KALS_authentication
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license	   http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/12 下午 09:02:21
 * @extends {JSONP_dispatcher}
 */
function KALS_authentication(){
    
    JSONP_dispatcher.call(this);
    
    this._auth_data = null;
    this.reset_auth_data();
    
    //從這邊開始，向伺服器取得預設重置的資料
    /*
    var _this = this;
    var _default_data_url = 'authentication/default_data';
    KALS_util.ajax_get({
        url: _default_data_url,
        callback: function (_data) {
            
            //$.test_msg('KALS_authentication() _default_data', _data);
            
            _this._default_reset_data = _data;
        }
    });
    */
   
   //2010.10.26 請KALS_context給予資料吧
   var _this = this;
   KALS_context.add_once_listener(function (_context, _data) {
       if (typeof(_data.auth) !== 'undefined') {
           _this._default_reset_data = _data.auth;
       }
   });
}

KALS_authentication.prototype = new JSONP_dispatcher();

KALS_authentication.prototype._login_url = 'authentication/login';
KALS_authentication.prototype._encrypt_login_url = 'authentication/encrypt_login';
KALS_authentication.prototype._register_url = 'authentication/register';
KALS_authentication.prototype._logout_url = 'authentication/logout';
KALS_authentication.prototype._deregister_url = 'authentication/deregister';
KALS_authentication.prototype._check_login_url = 'authentication/check_login';

KALS_authentication.prototype._is_login = false;

// ---------
// 登入資料
// ---------

/**
 * 登入資料
 */
KALS_authentication.prototype._auth_data = null;

/**
 * 取得登入資料
 * @type {Object} JSON物件
 */
KALS_authentication.prototype.get_auth_data = function () {
    return this._auth_data;
};

/**
 * 設定電子信箱
 * @param {String} _value 電子信箱
 * @returns {KALS_authentication}
 */
KALS_authentication.prototype.set_email = function (_value) {
    _value = $.trim(_value);
    if (this.is_embed() && $.is_email(_value)) {
        this._auth_data.email = _value;
    }
    else {
        this._auth_data.email = _value;
    }
    return this;
};

/**
 * 清空電子信箱
 * @returns {KALS_authentication}
 */
KALS_authentication.prototype.clear_email = function () {
    this._auth_data.email = null;
    return this;
};

/**
 * 取得電子信箱
 * @returns String
 */
KALS_authentication.prototype.get_email = function () {
    return this._auth_data.email;
};

KALS_authentication.prototype.set_password = function (_value) {
    this._auth_data.password = _value;
    return this;
};

/**
 * 設定是否是嵌入登入
 * @param {Boolean} _value
 * @returns {KALS_authentication}
 */
KALS_authentication.prototype.set_embed = function (_value) {
    this._auth_data.embed = _value;
    return this;
};

/**
 * 設置標註指引類型
 * @deprecated 20111106 Pudding Chen
 *     廢棄，在讀取generic_info的時候設置吧
 */
//KALS_authentication.prototype.set_anchor_navigation_type = function (_value) {
//    this._auth_data['anchor_navigation_type'] = _value;
//    return this;
//};

/**
 * 是否是嵌入登入的狀態
 * @returns {Boolean}
 */
KALS_authentication.prototype.is_embed = function () {
    return this._auth_data.embed;
};

KALS_authentication.prototype.is_login = function () {
    return this._is_login;   
}; 

/**
 * 是否是管理者的狀態
 * @returns {Boolean}
 * @author Pudding 20150410
 */
KALS_authentication.prototype.is_admin = function () {
    //return false;
    var _admin_email_list = KALS_CONFIG.admin_email_list;
    test_msg("auth.is_admin()", _admin_email_list);
    var _user_email = KALS_context.user.get_email();
    
    return ($.inArray(_user_email, _admin_email_list) !== -1);
};

/**
 * 清空帳號資料
 * 
 * @return {null}
 * @version 20111110 Pudding Chen
 */
KALS_authentication.prototype.reset_auth_data = function () {
    this._auth_data = {
        email: null,
        password: null,
        embed: false,
        anchor_navigation_type: KALS_CONFIG.anchor_navigation_type
    };
    
    //如果有KALS_CONFIG設定的話
    if (typeof(KALS_CONFIG.user_email) === 'string') {
        this._auth_data.email = KALS_CONFIG.user_email;
        this._auth_data.embed = true;
    }
    
    return this.reset_data();
};

KALS_authentication.prototype.config_is_embed = function () {
    return (typeof(KALS_CONFIG.user_email) === 'string');
};

/**
 * 取得登入錯誤的訊息。這是依據this._auth_data來判斷的。
 * @type {KALS_language_param}
 * @private
 */
KALS_authentication.prototype._get_error_message = function () {
    var _lang_param;
    
    if (this._auth_data.email === null 
        && (this._auth_data.embed === false && this._auth_data.password === null)) {
        _lang_param = new KALS_language_param('Email and Password are empty.'
            , 'authentication.error.message_empty_email_and_password');
    }   
    else if (this._auth_data.email === null) {
        _lang_param = new KALS_language_param('Email is empty.'
            , 'authentication.error.message_empty_email');
    }   
    else if (this._auth_data.embed === false && this._auth_data.password === null) {
        _lang_param = new KALS_language_param('Password is empty.'
            , 'authentication.error.message_empty_password');
    }   
    else {
        _lang_param = new KALS_language_param('System error.'
            , 'authentication.error.message');
    }    
    
    return _lang_param;
};

// ---------
// 登入功能
// ---------

/**
 * 登入
 * 
 * 以有的資料進行登入動作
 * @param {boolean} _return_error = false 是否要回傳錯誤訊息？
 * @param {Function} _callback 登入之後的動作
 */
KALS_authentication.prototype.login = function (_return_error, _callback) {
    
    if ($.is_function(_return_error) 
            && $.is_null(_callback)) {
        _callback = _return_error;
        _return_error = false;
    }
    
    var _data = this.get_auth_data();
    var _this = this;
    var _heading, _message;
        
    if (_data.email === null
            || (_data.embed === false && _data.password === null)) {   
        _heading = new KALS_language_param('ERROR', 'authentication.login_error.heading');
        _message = this._get_error_message();
        
        KALS_util.alert(_heading, _message, function () {
             _this.show_login_form();   
        });
    }
    else    //如果資料都齊全
    {   
        this._$load_url = this._login_url;
        
        //$.test_msg('login', this._$load_url);
        //$.test_msg('login data', _data);
        
        if (this.is_embed()) {
            this.request_embed_email(function () {
                _data.email = _this.get_email();
                _data.embed = _this.is_embed();
                //$.test_msg("embed_login 預備 load", _data);

                //if (_data.email === null && _data.embed === false) {
                //    _this.show_login_form();
                //}
                //else {
                if (_data.email !== null && _data.embed !== false) {
                    _this.load(_data, function (_this, _data) {
                        //$.test_msg("embed_login 預備 after_login", _data);
                        _this._after_login(_return_error, _data, _callback);
                    });
                }
                else {
                    $.trigger_callback(_callback);
                }
            });
        }
        else {
            this.load(_data, function (_this, _data) {
                //$.test_msg("embed_login 預備 after_login", _data);
                _this._after_login(_return_error, _data, _callback);
            });
        }
    }
    return this;
};

/**
 * 登入之後的動作
 * 
 * @version 20140519 Pulipuli Chen
 * @param {boolean} _return_error = false 是否要回傳錯誤訊息？
 * @param {JSON} _data
 * @param {Function} _callback
 * @returns {KALS_authentication}
 */
KALS_authentication.prototype._after_login = function (_return_error, _data, _callback) {
    //$.test_msg('login load', _data);
        
    //$.test_msg("mobile_redirect", typeof(_data.mobile_redirect));
    if (typeof(_data.mobile_redirect) === "string") {
        //$.test_msg("mobile_redirect ready go", _data.mobile_redirect);
        location.href = _data.mobile_redirect;
        return this;
    }

    var _this = this;
    if (typeof(_data.error) !== 'undefined') {
        //顯示錯誤

        var _heading = new KALS_language_param('ERROR', 'authentication.login_error.heading');
        var _message = new KALS_language_param('E-mail or password is not correct.', 'authentication.login_error.' + _data.error);
        //$.test_msg('auth.login()', _return_error);
        if (_return_error) {
            if ($.is_function(_callback)) {
                _callback(_this, _message);
            }
        }
        else {
            KALS_util.alert(_heading, _message, function () {
                //_this.show_login_form();
                var _content = new Window_login();
                KALS_window.setup_window(_content);   
            });   
        }
    }
    else {
        _this._is_login = true;

        if (KALS_CONFIG.isolation_mode) {
            KALS_context.policy.set_attr("read", true);
        }

        setTimeout(function () {
            if ($.is_function(_callback)) {
                _callback(_this, _data);
            } 
        }, 100);

        //else
        //    _this.login_callback(_this, _data);




        //$.test_msg('load complete', [_this._is_login, _this.is_login()]);
    }
    
    return this;
};

/**
 * 內嵌登入的檢查方法
 * @param {Function} _callback
 * @returns {KALS_authentication}
 */
KALS_authentication.prototype.request_embed_email = function (_callback) {
    
    if (this._auth_data.embed === true) {
        
        var _url = this._auth_data.email;
        
        var _this = this;
        if ($.is_url(_url) || $.starts_with(_url, "/")) {
            //$.test_msg("內嵌登入，是網址", _url);
            
            if (_url.indexOf("?") === -1) {
                _url = _url + "?" + $.create_id("auth");
            }
            else {
                _url = _url + "&" + $.create_id("auth");
            }
            
            var _get_callback = function (_data) {
                if ($.is_email(_data)) {
                    _this.set_email(_data);
                }
                else {
                    _this.clear_email();
                    _this.set_embed(false);
                }
                //$.trigger_callback(_callback);
                
                if ($.is_function(_callback)) {
                    _callback(_data);
                }
            };
            
            KALS_util.ajax_local_get({
                url: _url,
                callback: _get_callback
            });
        }
        else {
            $.trigger_callback(_callback);
            return this;
        }
    }
    else {
        $.trigger_callback(_callback);
        return this;
    }
};

/**
 * 顯示登入表單
 * @param {function} _callback
 */
KALS_authentication.prototype.show_login_form = function (_callback) {
    
    // TODO KALS_authentication.show_login_form() 這邊要顯示登入表單，但是尚未撰寫，所以先空著
    $.trigger_callback(_callback);
    return this;
};

/**
 * 以加密的方式登入
 * @param {boolean} _embed = false
 */
KALS_authentication.prototype.encrypt_login = function () {
    
    //現在先不作加密式登入功能
    //未來有時間再來作
    
    //所以就使用普通登入的功能
    return this.login(_embed);
};

// ---------
// 註冊功能
// ---------

/**
 * 註冊
 * @param {boolean} _return_error = false
 * @param {function} _callback = function (_auth, _data) { };
 */
KALS_authentication.prototype.register = function (_return_error, _callback) {
    
    if ($.is_function(_return_error) && $.is_null(_callback)) {
        _callback = _return_error;
        _return_error = false;
    }
    
    var _data = this.get_auth_data();
    var _this = this;
    var _heading, _message;
        
    if (_data.email === null) {
        _heading = new KALS_language_param('REGISTER ERROR', 'authentication.register_error.heading');
        _message = this._get_error_message();
        KALS_util.alert(_heading, _message, function () { _this.show_register_form(); });
    }
    else {
        this._$load_url = this._register_url;
        
        this.load(_data, function (_this, _data) {
            
            //$.test_msg('auth.register()', [_data, _return_error]);
            
			//先檢查登入是否有錯誤
            if (typeof(_data.error) !== 'undefined') {
                _heading = new KALS_language_param('REGISTER ERROR', 'authentication.register_error.heading');
                _message = new KALS_language_param('The e-mail is not correct or had been registered.'
                    , 'authentication.register_error.' + _data.error);
                
                if (_return_error) {
                    if ($.is_function(_callback)) {
                        _callback(_this, _message);
                    }     
                }
                else {
                    KALS_util.alert(_heading, _message, function () { 
                        //_this.show_register_form();
                        var _content = new Window_register();
                        KALS_window.setup_window(_content);
                    });
                }
            }
            else {
               //正常登入的情況
               _this._is_login = true;
               
                setTimeout(function () {
                    if ($.is_function(_callback)) {
                        _callback(_this, _data);
                    } 
                }, 100);
                //else
                //    this.register_callback(_this, _data);
                
            }  
        });    //this.load(...
    }
    
    return this;
};

/**
 * 顯示註冊表單
 * @param {Function} _callback
 */
KALS_authentication.prototype.show_register_form = function (_callback) {
    // TODO 2010.8 show_regieter_form 這邊要顯示註冊表單，但是尚未撰寫，所以先空著
    
    $.trigger_callback(_callback);
    return this;
};

// ---------
// 登出功能
// ---------

/**
 * 登出
 * @param {boolean} _return_error = false
 * @param {function} _callback = function (_auth: KALS_authentication, _data) { }; 
 */
KALS_authentication.prototype.logout = function (_return_error, _callback) {
    
    if ($.is_function(_return_error) && $.is_null(_callback)) {
        _callback = _return_error;
        _return_error = false;
    }
    
    var _heading, _message;
    
    this._$load_url = this._logout_url;
    
    this.load(function (_this, _data) {
        
        //$.test_msg('auth logout', _data);
        
        if (typeof(_data.error) !== 'undefined') {
            
            
            //顯示錯誤
            _heading = new KALS_language_param('ERROR', 'authentication.logout_error.heading');
            _message = new KALS_language_param('Logout failed.', 'authentication.logout_error.message');
            
            if (_return_error) {
                if ($.is_function(_callback)) {
                    _callback(_this, _message);
                }      
            }
            else {
                KALS_util.alert(_heading, _message, function () { 
                    //_this.show_login_form();
                    var _content = new Window_logout();
                    KALS_window.setup_window(_content); 
                });
            }
        }
        else { //if (_data === true) {
            /**
             * 由於登出後回傳資料有所修改，原本的登出會有bug
             * 在此修正
             * @version 20111110 Pudding Chen
             */
               
            var _auth_data = _this.reset_auth_data();
            
            _this._is_login = false;
			
            if (KALS_CONFIG.isolation_mode) {
                KALS_context.policy.set_attr("read", false);
            }
            
            setTimeout(function () {
                if ($.is_function(_callback)) {
                    _callback(_this, _data);
                }    
            }, 100);
        }
    });
    return this;
};


/**
 * 刪除已經登入的使用者
 * 這是測試用的功能，平常不應該使用
 * @param {function} _callback = function (_auth: KALS_authentication, _data) { }; 
 */
KALS_authentication.prototype.deregister = function (_callback) {
    
    var _heading, _message;
    
    this._$load_url = this._deregister_url;
    
    //$.test_msg('auth.deregister()', this._$load_url);
    
    this.load(function (_this, _data) {
        
        //$.test_msg('auth.deregister() loaded', _data);
        
        if (typeof(_data.error) !== 'undefined') {            
            //顯示錯誤
            _heading = new KALS_language_param('ERROR', 'authentication.deregister_error.heading');
            _message = new KALS_language_param('Logout failed.', 'authentication.deregister_error.message');
            
            KALS_util.alert(_heading, _message, function () { 
                //_this.show_login_form();
                var _content = new Window_logout();
                KALS_window.setup_window(_content); 
            });
        }
        else if (_data === true) {
            _this._is_login = false;
            
            var _auth_data = _this.reset_auth_data();
            
            KALS_util.notify('Deregister success!');
            
            setTimeout(function () {
                if ($.is_function(_callback)) {
                    _callback(_this, _data);
                }    
            }, 100);
        }
    });
    return this;
};

// --------
// 確認是否登入
// --------

/**
 * 不輸入帳號密碼地到伺服器查詢是否有session登入狀態。有的話則切換成登入。
 * @param {function} _callback
 */
KALS_authentication.prototype.check_login = function (_callback) {
    
    var _embed_login = this.config_is_embed();
    
    if (_embed_login === false) {
        //如果不是預設帳號登入，則改成check_login
        //20111105 Pudding Chen
        this._$load_url = this._check_login_url;
        
        /**
         * @deprecated 20111106 Pudding Chen
         */
        //設定資料
        //var _check_data = {};
            //標註指引類型
            //_check_data['anchor_navigation_type'] = this.get_auth_data().get_anchor_navigation_type();
        //this.load(_check_data ,function (_this, _data) {
        
        this.load(function (_this, _data) {
            _this._after_check_login(_data, _callback);
        });    //this.load(function (_this, _data) {
    }
    else {
        this._login_checked = true;
        this.login(false, _callback);
    }
    
    return this;
};

/**
 * 在確認登入之後
 * @param {JSON} _data 從check_login傳來的資料
 * @param {Function} _callback
 * @returns {KALS_authentication}
 */
KALS_authentication.prototype._after_check_login = function (_data, _callback) {
    
    //$.test_msg("check_login", _data);

    if (typeof(_data.login) === 'boolean' 
            && _data.login === true) {
        this._is_login = true;
    }
    else {
        this._is_login = false;
    }

    this._login_checked = true;

    if (typeof(_data.webpage_id) === "number") {
        KALS_context.webpage_id = _data.webpage_id;
    }

    if (typeof(_data.mobile_redirect) === "string") {
        location.href = _data.mobile_redirect;
    }

    //$.test_msg('auth check_login()', _data);

    if ($.is_function(_callback)) {
        _callback(this, _data);
    }
    
    return this;
}

/**
 * 已經確認過是否登入
 * @type Boolean
 */
KALS_authentication.prototype._login_checked = false;

/**
 * 確認是否已經check過
 * @returns {Boolean}
 */
KALS_authentication.prototype.is_login_checked = function () {
    return this._login_checked;
}

/* End of file KALS_authentication */
/* Location: ./system/application/views/web_apps/KALS_authentication.js */