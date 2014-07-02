/**
 * Site_reform
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2013, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals
 * @version    1.0 2013/12/27 下午 08:10:10
 * @extends {Event_dispatcher}
 */
function Site_reform() {
    
    Event_dispatcher.call(this);
    
}

/**
 * 繼承自Task_event_dispatcher
 */
Site_reform.prototype = new Event_dispatcher();

/**
 * 符合規則的類型
 * @type Array
 */
Site_reform.prototype._matched_site = [];

/**
 * 判斷是不是這個網站
 * @param {String} _site_feature
 * @returns {Boolean}
 */
Site_reform.prototype.match = function (_site_feature) {
    
    if (_site_feature === undefined
        || ($.is_string(_site_feature) && _site_feature === "" )
        || ($.is_array(_site_feature) && _site_feature.length === 0 )) {
        return false;
    }
    
    var _result = false;
    
    if ($.is_string(_site_feature)) {
        _result = ($("body").find(_site_feature).length > 0);
    }
    else if ($.is_array(_site_feature)) {
        
        //必須滿足全部條件
        var _condition_count = _site_feature.length;
        
        var _match_count = 0;
        for (var _i in _site_feature) {
            var _single_feature = _site_feature[_i];
            var _single_result = ($("body").find(_single_feature).length > 0);
            
            if (_single_result === false) {
                break;
            }
            else {
                _match_count++;
            }
        }
        
        if (_match_count === _condition_count) {
            _result = true;
        }
    }
    
    //var _feature_node = $("body").find(_site_feature).length;
    /*
    if (_feature_node > 0) {
        return true;
    }
    else {
        return false;
    }
    */
   
    return _result;
};

/**
 * 開始調整網站
 * @param {function} _callback 回呼函數
 * @returns {Site_reform}
 */
Site_reform.prototype.reform = function (_callback) {
    
    var _config = KALS_SITE_REFORM_CONFIG;
    
    var _i = 0;
    var _this = this;
    
    var _site_callback = function () {
        _i++;
        
        if (_i < _config.length) {
            setTimeout(function () {
                _this._reform_loop(_i, _config, _site_callback)
            }, 1);
        }
        else {
            _this._reform_complete(_callback);
        }
    };
    
    this._reform_loop(_i, _config, _site_callback);
    
    return this;
};

/**
 * 重整完成
 * @param {Function} _callback
 * @returns {Site_reform.prototype}
 */
Site_reform.prototype._reform_complete = function (_callback) {
    $.test_msg("重整完成");
    this.notify_listeners();
    $.trigger_callback(_callback);
    return this;
};

/**
 * 進行迴圈
 * @param {number} _i 現在進行的索引
 * @param {JSON} _config 設定檔案
 * @param {function} _callback 前往下一個迴圈的回呼函數
 */
Site_reform.prototype._reform_loop = function (_i, _config, _callback) {
    var _site = _config[_i];
        
    var _matched = this.match(_site.feature);
    if (_matched === true) {
        
        $.test_msg("Site_reform: match!", _site.title);
        this._matched_site.push(_site.title);
        
        if ($.is_function(_site.reform)) {
            _site.reform(function () {
                _callback();
            });
        }
        else if ($.is_object(_site.reform)) {
            
            if ($.is_function(_site.reform.before_init)) {
                _site.reform.before_init(function () {
                    _callback();
                });
            }
            
            if ($.is_function(_site.reform.after_init)) {
                //$.test_msg("完成？");
                KALS_context.init_profile.add_listener(function () {
                    //$.test_msg("完成？111");
                    _site.reform.after_init();
                });
            }
        }
    }
    else {
        _callback();
    }
};

/**
 * 是這類型的網站嗎？
 * @param {String} _target_site
 * @returns {Number}
 */
Site_reform.prototype.is_site = function (_target_site) {
    if ($.is_string(_target_site) === false) {
        return false;
    }
    return ($.inArray(_target_site, this._matched_site) > -1);
};

/* End of file Site_reform */
/* Location: ./system/application/views/web_apps/Site_reform.js */