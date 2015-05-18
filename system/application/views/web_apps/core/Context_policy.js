/**
 * Context_policy
 * 控制權限
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/12 上午 10:45:43
 * @extends {Attribute_event_dispatcher}
 */
function Context_policy(){
    Attribute_event_dispatcher.call(this);
    
    //if ($.object_isset('KALS_context.auth.add_listener()'))
    //{
        //KALS_context.auth.add_listener(this);
            var _this = this;
            KALS_context.auth.add_listener(function (_auth) {
                //$.test_msg("Context_policy", _auth._data.policy);
                if (typeof (_auth.get_data().policy) !== "undefined") {
                    if (_auth.is_login()) {
                        _this.set_attr(_auth.get_data().policy);
                    }
                    else {
                        if (typeof(_auth.get_data().navigation_data) !== "undefined") {
                                _this.set_attr("navigation_data", _auth.get_data().policy.navigation_data);
                        }
                        _this.reset();
                    }	
            }

            });
    //}
	
    _this.reset();
}

Context_policy.prototype = new Attribute_event_dispatcher();

Context_policy.prototype._$data_key = 'policy';

/**
 * 是否可讀取
 * @returns Boolean
 */
Context_policy.prototype.readable = function () {		
    if (KALS_CONFIG.isolation_mode === true) {
        //$.test_msg("policy.readable()", this.get_attr('read'));
        return this.get_attr('read', false);
    }
    return this.get_attr('read', true);
};

/**
 * 是否可讀入
 * @returns {Boolean}
 */
Context_policy.prototype.writable = function () {
    if (KALS_CONFIG.isolation_mode === true 
            && KALS_context.auth.is_login() === false) {
        return false;
    }
    return this.get_attr('write', false);
};

/**
 * 是否允許顯示別人的標註
 */
Context_policy.prototype.allow_show_navigation = function () {
    if (KALS_CONFIG.isolation_mode === true) {
        return false;
    }

    var _allow_show = this.get_attr('show_navigation', true);
    //$.test_msg("policy show_navigation", _allow_show);
    return _allow_show; 
	
    //實驗中，預設是不顯示推薦標註
    //return this.get_attr('show_navigation', false);
    
    //正式使用時，預設是顯示推薦標註
    //return this.get_attr('recommend', true);
};

Context_policy.prototype.get_navigation_data = function () {
    return this.get_attr('navigation_data');
};

/**
 * 我的標註的範圍資料
 */
Context_policy.prototype.get_my_basic = function () {
    return this.get_attr('my_basic');
};

/**
 * 我的自訂標註的範圍資料
 */
Context_policy.prototype.get_my_custom = function () {
    return this.get_attr('my_custom');
};

Context_policy.prototype.set_readable = function (_boolean) {
    return this.set_attr('read', _boolean);
};

Context_policy.prototype.set_writable = function (_boolean) {
    return this.set_attr('write', _boolean);
};

Context_policy.prototype.set_show_navigation = function (_boolean) {
    return this.set_attr('show_navigation', _boolean);
};

/**
 * 重新設定權限
 * @returns {Context_policy}
 */
Context_policy.prototype.reset = function () {
    if (KALS_CONFIG.isolation_mode === true) {
        this.set_attr("read", true);
        this.set_attr("write", KALS_context.auth.is_login());
        this.set_attr("show_navigation", false);		
        this.unset_attr("my_basic");
        
        this.set_attr("other_topic_readable", true);
        this.set_attr("respond_other_topic_wrtiable", true);
        this.set_attr("respond_my_topic_wrtiable", true);
        this.set_attr("other_respond_readable", true);
        this.set_attr("my_respond_readable", true);
        this.set_attr("able_like_topic", true);
        this.set_attr("able_like_respond", true);
        
        return this;
    }

    this.set_attr("read", true);
    this.set_attr("write", KALS_context.auth.is_login());
    this.set_attr("show_navigation", true);
    this.unset_attr("my_basic");
    
    this.set_attr("other_topic_readable", true);
    this.set_attr("respond_other_topic_wrtiable", true);
    this.set_attr("respond_my_topic_wrtiable", true);
    this.set_attr("other_respond_readable", true);
    this.set_attr("my_respond_readable", true);
    this.set_attr("able_like_topic", true);
    this.set_attr("able_like_respond", true);
    
    return this;
};

/**
 * 是否可以讀取其他人的主題標註
 * 
 * @todo 20140511 對應功能未設定
 * @returns {Boolean}
 * @version 20140511 Pulipuli Chen
 */
Context_policy.prototype.other_topic_readable = function () {
    //return false;
    return this.get_attr('other_topic_readable', true);
};

/**
 * 設定是否可以讀取其他人的主題標註
 * 
 * @param {Boolean} _boolean 設定條件
 * @version 20140511 Pulipuli Chen
 */
Context_policy.prototype.set_other_topic_readable = function (_boolean) {
    return this.set_attr('other_topic_readable', _boolean);
};

/**
 * 是否可以回應其他人的主題標註
 * 
 * @returns {Boolean}
 * @version 20140511 Pulipuli Chen
 */
Context_policy.prototype.respond_other_topic_wrtiable = function () {
    //return false;
    return this.get_attr('respond_other_topic_wrtiable', true);
};

/**
 * 設定是否可以回應其他人的主題標註
 * 
 * @param {Boolean} _boolean 設定條件
 * @version 20140511 Pulipuli Chen
 */
Context_policy.prototype.set_respond_other_topic_wrtiable = function (_boolean) {
    return this.set_attr('respond_other_topic_wrtiable', _boolean);
};

/**
 * 自己是否可以撰寫主題標註
 * 
 * @returns {Boolean}
 * @version 20140511 Pulipuli Chen
 */
Context_policy.prototype.topic_writable = function () {
    //return false;
    return this.writable();
};

/**
 * 設定自己是否可以撰寫主題標註
 * 
 * @param {Boolean} _boolean 設定條件
 * @version 20140511 Pulipuli Chen
 */
Context_policy.prototype.set_topic_writable = function (_boolean) {
    return this.set_writable(_boolean);
};

/**
 * 是否可以回應自己的主題標註
 * 
 * @returns {Boolean}
 * @version 20140511 Pulipuli Chen
 */
Context_policy.prototype.respond_my_topic_wrtiable = function () {
    //return false;
    return this.get_attr('respond_my_topic_wrtiable', true);
};

/**
 * 設定是否可以回應自己的主題標註
 * 
 * @param {Boolean} _boolean 設定條件
 * @version 20140511 Pulipuli Chen
 */
Context_policy.prototype.set_respond_my_topic_wrtiable = function (_boolean) {
    return this.set_attr('respond_my_topic_wrtiable', _boolean);
};

/**
 * 是否可以讀取其他人的回應標註
 * 
 * @returns {Boolean}
 * @version 20140511 Pulipuli Chen
 */
Context_policy.prototype.other_respond_readable = function () {
    //return false;
    return this.get_attr('other_respond_readable', true);
};

/**
 * 設定是否可以讀取其他人的回應標註
 * 
 * @param {Boolean} _boolean 設定條件
 * @version 20140511 Pulipuli Chen
 */
Context_policy.prototype.set_other_respond_readable = function (_boolean) {
    return this.set_attr('other_respond_readable', _boolean);
};

/**
 * 是否可以讀取自己的回應標註
 * 
 * @returns {Boolean}
 * @version 20140511 Pulipuli Chen
 */
Context_policy.prototype.my_respond_readable = function () {
    //return false;
    return this.get_attr('my_respond_readable', true);
};

/**
 * 設定是否可以讀取自己的回應標註
 * 
 * @param {Boolean} _boolean 設定條件
 * @version 20140511 Pulipuli Chen
 */
Context_policy.prototype.set_my_respond_readable = function (_boolean) {
    return this.set_attr('my_respond_readable', _boolean);
};

// -------------------------

/**
 * 是否可以喜愛主題標註
 * 
 * @returns {Boolean}
 * @version 20140511 Pulipuli Chen 已經設定完畢
 */
Context_policy.prototype.able_like_topic = function () {
    //return false;
    return this.get_attr('able_like_topic', true);
};

/**
 * 設定是否可以喜愛主題標註
 * 
 * @param {Boolean} _boolean 設定條件
 * @version 20140511 Pulipuli Chen
 */
Context_policy.prototype.set_able_like_topic = function (_boolean) {
    return this.set_attr('able_like_topic', _boolean);
};

/**
 * 是否可以喜愛回應標註
 * 
 * @returns {Boolean}
 * @version 20140511 Pulipuli Chen 已經設定完畢
 */
Context_policy.prototype.able_like_respond = function () {
    //return false;
    return this.get_attr('able_like_respond', true);
};

/**
 * 設定是否可以喜愛回應標註
 * 
 * @param {Boolean} _boolean 設定條件
 * @version 20140511 Pulipuli Chen
 */
Context_policy.prototype.set_able_like_respond = function (_boolean) {
    return this.set_attr('able_like_respond', _boolean);
};

/* End of file Context_policy */
/* Location: ./system/application/views/web_apps/Context_policy.js */