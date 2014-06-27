/**
 * Overlay_modal
 * 這個Overlay是指jQuery TOOLS的Overlay
 * 
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/8/26 下午 04:00:31
 * @extends {KALS_modal}
 * @memberOf {Overlay_modal}
 */
function Overlay_modal() {
    
    KALS_modal.call(this);
    
}

/**
 * @type {KALS_modal}
 */
Overlay_modal.prototype = new KALS_modal();

/**
 * 統一的模型名稱
 * @type {string}
 */
Overlay_modal.prototype._$modal_name = 'Overlay_modal';

/**
 * 是否需要使用jQuery Tools中的expose功能
 */
Overlay_modal.prototype._$need_expose = true;

/**
 * 此Overlay是否需要Mask的設定
 * @type {boolean}
 */
Overlay_modal.prototype._$exposable = false;

/**
 * Overlay的共通輸入參數。實際上設定是在建構子時設定的。
 * @type {object}
 */
Overlay_modal.prototype._$get_config = function () {
    
    //$.test_msg('Overlay_modal._$get_config()', this._$modal_name);
    
    var _this = this;
    
    var _config = {
        //top: '10%',
        left: 'center',
        closeOnClick: false,
        load: false,
        onBeforeLoad: function() {
            //跟Modal_controller註冊開啟
            if (typeof(KALS_context) == 'object' && typeof(KALS_context.overlay) == 'object') {
				KALS_context.overlay.add_opened(_this);
			}
            
            var _ui = _this.get_ui();
            if ($.is_function(_this._$onviewportmove)) {
				_this._$onviewportmove(_ui);
			}
        },
        onLoad: function () {
            
            //$.test_msg('Overlay_modal._$get_config() onLoad', [_this._$temp_callback, _this.call_temp_callback]);
            
            var _ui = _this.get_ui();
            
            //2010.10.16 將定位移至onBeforeLoad執行
            //if ($.is_function(_this._$onviewportmove))
            //    _this._$onviewportmove(_ui);
            
            _ui.animate({}, {
                complete: function () {
                    setTimeout(function () {
                        if ($.is_function(_this._$onopen)) {
							_this._$onopen(_ui);
						}
                        _this.call_temp_callback(_ui);    
                    }, 1000);
                       
                }
            });
        },
        onBeforeClose: function () {
            //跟Modal_controller註冊關閉
            if (typeof(KALS_context) == 'object' && typeof(KALS_context.overlay) == 'object') {
				KALS_context.overlay.delete_opened(_this);
			}
            
        },
        onClose: function () {
            
            var _ui = _this.get_ui();
            if ($.is_function(_this._$onclose)) {
				_this._$onclose(_ui);
			}
            _this.call_temp_callback(_ui);
            
            
            //$.test_msg('Overlay_modal._$get_config() onClose 應該已經關閉了吧？');
            _ui.hide();
        },
        oneInstance: false
    };   
    return _config; 
};

/**
 * 設定好effect
 */
Overlay_modal.prototype._setup_effect = function () {
	$.tools.overlay.addEffect("fade", function(position, done) {
	      this.getOverlay().css(position).fadeIn(this.getConf().speed, done);
	   },// close function
	   function(done) {
	      // fade out the overlay
	      this.getOverlay().fadeOut(this.getConf().closeSpeed, done);
	   }
	); 
};

/**
 * Overlay的開啟動作
 * @param {function|null} _callback
 */
Overlay_modal.prototype.open = function (_callback) {
    
    if (this.is_opened() === false) {
        var _ui = this.get_ui();
        var _this = this;
        
        //$.test_msg('Overlay_modal.open() check _ui', [(_ui != null), (typeof(_ui.overlay) == 'function'), _callback]);
        
        if (_ui !== null) {
            if (typeof(_ui.overlay) === 'function') {
                //$.test_msg('Overlay_modal.open() 設置this._$temp_callback', _callback);
                this._$temp_callback = _callback;
                //$.test_msg('Overlay_modal.open() 設置了this._$temp_callback', this._$temp_callback);
                
                //此處的callback會在load的時候就呼叫了
                var _api = _ui.data("overlay");
				//$.test_msg('Overlay_modal.open() 有API嗎?', $.isset(_api));
				
                if ($.isset(_api)) {
                    _api.setOpened(false);
					try {
						_api.load();
					}
					catch (_e) {
						_this._setup_effect();
						try {
							//再試著讀取一次
							_api.load();
						}
						catch (_final_e) {
							$.test_msg('open Overlay failed: ' , _final_e);
						}
					}
                      
                }
                _ui.show();
                
                if (this.is_exposable() && typeof(this.expose) == "function") {
                    this.expose();
                }
            }
            else {
                _ui.show();
                
                //$.test_msg('Overlay_modal.open() after show');
                
                if ($.is_function(_callback)) {
					_callback(_ui);
				}
            }
        }
    }
    else {
        $.trigger_callback(_callback);
    }
    
    return this;
};

/**
 * Overlay的關閉動作
 * @param {function|null} _callback
 */
Overlay_modal.prototype.close = function (_callback) {
    if (this._$closable && this.is_opened()) {
        var _ui = this.get_ui();
        
        var _this = this;
        
        if (_ui !== null) {
            if (typeof(_ui.overlay) === 'function') {
                //$.test_msg('close set temp callback', [this.get_modal_name(), typeof(_callback)]);
                //$.test_msg('close set temp callback', _ui.overlay().close);
                this._$temp_callback = _callback;
                
                //if (typeof(_ui.overlay().isOpened()) != 'undefined')
                var _api = _ui.data("overlay");
                if ($.isset(_api)) {
                    _api.setOpened(true);
                    _api.close();    
                }
                _ui.hide();
                //else
                //{
                    
                //}
            }
            else {
                _ui.hide();
                if ($.is_function(_callback)) {
					_callback(_ui);
				}
            }
        }
    }
    return this;
};

/**
 * 此Overlay是否需要Mask
 * @type {boolean}
 */
Overlay_modal.prototype.is_exposable = function () {
    return this._$exposable;
};

/**
 * Mask的z-index
 * @type {number}
 * @property
 * @private
 */
Overlay_modal.prototype._mask_z_index = 9998;

/**
 * 讓此Overlay背後顯示mask
 * @param {Object} _callback
 */
Overlay_modal.prototype.expose = function (_callback) {
    if (this._$exposable === false) {
		return this;
	}
    
    var _ui = this.get_ui();
    
    if ($.isset(_ui) && typeof(_ui.expose) === "function") {
        _ui.expose({
            color: '#333333',
            loadSpeed: 200,
            opacity: 0.5,
            zIndex: this._mask_z_index,
            closeOnClick: false,
            closeOnEsc: false
        });
        _ui.css('z-index', (this._mask_z_index+1));
    }
    
    setTimeout(function () {
        $.trigger_callback(_callback);
    }, 200);
    return this;
};

/**
 * 讓此Overlay隱藏到Mask之後
 * @param {function} _callback
 */
Overlay_modal.prototype.cover = function (_callback) {
    if (this._$exposable === false) {
        return this;
    }
    
    var _ui = this.get_ui();
    
    if ($.isset(_ui)) {
        _ui.css('z-index', (this._mask_z_index-1));
    }
    
    $.trigger_callback(_callback);
    
    return this;
};

//var a = new Overlay_modal();


/* End of file Overlay_modal */
/* Location: ./system/application/views/web_apps/Overlay_modal.js */