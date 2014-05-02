/**
 * unit
 *
 * 輔助單元測試用的
 *
 * @package		KALS
 * @category		Webpage Application Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/9/4 下午 07:57:20
 */

/**
 * 輔助單元測試使用
 * @param {number|function} _param = 0 {number} 指定要執行的任務 {function} 加入測試任務
 * @param {boolean} _rewind = true 任務執行到最後一個之後，是否要倒帶到第一個任務繼續執行，或是就此停止
 */
function unit(_param, _rewind) {

    if (typeof(_param) == 'boolean' && _loop == null)
    {
        _loop = _param;
        _param = null;
    }

    //初始化各參數
    if (typeof(UNIT_CONFIG) == 'undefined')
    {
        UNIT_CONFIG = {
            index: 0,
            queue: [],
            check_length: null,
            check_timer: null,
            rewind: true,
            prepare: null
        };
    }
    
    var _finish = function () {
        //結束了，沒有任何任務需要執行
        $('body').append('<div class="unit-complete"><hr />UNIT FINISH!</div>');
        UNIT_CONFIG.check_length = null;
    };
    
    if (_rewind == 'prepare' && typeof(_param) == 'function')
    {
        UNIT_CONFIG.prepare = _param;
        //$.test_msg('prepared', _param);
        return;
    }
    
    if (typeof(_param) == 'function') {
        
        UNIT_CONFIG.queue.push(_param);
        return;
    }
    else if (typeof(_param) == 'number' && _param < 1000)
    {
        UNIT_CONFIG.index = _param;
        _wait = 3000;
    }
    
    
    if (typeof(UNIT_CONFIG.prepare) == 'function')
    {
        var _prepare = UNIT_CONFIG.prepare;
        UNIT_CONFIG.prepare = true;
        
        _prepare();
        return;
    }
    else if (UNIT_CONFIG.prepare == true)
    {
        return;
    }
    
    
    if (_rewind == false)
    {
        UNIT_CONFIG.rewind = false;
    }
    
    if (UNIT_CONFIG.check_timer != null)
    {
        clearTimeout(UNIT_CONFIG.check_timer);
        UNIT_CONFIG.check_timer = null;
    }
    
    if (UNIT_CONFIG.check_length == null)
    {
        UNIT_CONFIG.check_length = UNIT_CONFIG.queue.length;
        
        UNIT_CONFIG.check_timer = setTimeout(function () {
            unit();
        }, 100);
    }
    else
    {
        if (UNIT_CONFIG.check_length != UNIT_CONFIG.queue.length)
        {
            //表示還在增加中，請稍後再執行
            UNIT_CONFIG.check_length = UNIT_CONFIG.queue.length;
        
            UNIT_CONFIG.check_timer = setTimeout(function () {
                unit();
            }, 100);
            return;
        }
        else
        {
            if (UNIT_CONFIG.queue.length == 0)
            {
                //結束了，沒有任何任務需要執行
                _finish();
                return;
            }
            
            //開始執行
            
            //先確認是否該索引有
            var _index = UNIT_CONFIG.index;
            if (typeof(UNIT_CONFIG.queue[_index]) == 'undefined')
            {
                if (UNIT_CONFIG.rewind)
                {
                    UNIT_CONFIG.index = 0;
                    _index = 0;    
                }
                else
                {
                    //結束了，沒有任何任務需要執行
                    _finish();
                    return; 
                }
            }
            
            //取出該任務
            var _test = UNIT_CONFIG.queue[_index];
            
            //將後面的索引往前移動
            if (_index == UNIT_CONFIG.queue.length - 1)
            {
                //然後移除最後一個
                UNIT_CONFIG.queue.pop();
            }    
            else
            {
                for (var _i = _index; _i < UNIT_CONFIG.queue.length - 1; _i++)
                {
                    UNIT_CONFIG.queue[_i] = UNIT_CONFIG.queue[(_i + 1)];
                    
                    if (_i == UNIT_CONFIG.queue.length - 2)
                    {
                        //然後移除最後一個
                        UNIT_CONFIG.queue.pop();
                    }
                }
            }
            
            //$.test_msg('移除之後的數量', [UNIT_CONFIG.queue.length, _index]);
            
            UNIT_CONFIG.check_length = UNIT_CONFIG.queue.length; 
            
            var _wait = 3000;
            
            if (typeof(_param) == 'number' && _param > 999)
                _wait = _param;
            
            //執行該項測試
            setTimeout(function () {
                test(false, function () {
                    if (UNIT_CONFIG.prepare != null)
                    {
                        var _prepare = UNIT_CONFIG.prepare;
                        UNIT_CONFIG.prepare = null;
                        _prepare();
                        return;
                    }
                    else
                    {
                        //$.test_msg('我要執行囉');
                        _test();    
                    }
                }); 
            }, _wait);
            
        }
    }   
}

function prepare(_function) {
    unit(_function, 'prepare');
}

function prepare_iframe () {
    prepare(function () {
        
        IFRAME = $('<iframe src="../Iframe" class="qunit-iframe" id="iframe"></iframe>')
            .appendTo($('body'));
        
        IFRAME.compact_width = function (_compact, _callback) {
            
            if (_callback == null && typeof(_compact) == 'function')
            {
                _callback = _compact;
                _compact = null;
            }
            
            var _this = IFRAME;
            
            var _class_name = 'compact-width';
            if (_compact == null)
                _this.toggleClass(_class_name);
            else if (_compact == true)
                _this.addClass(_class_name);
            else
                _this.removeClass(_class_name);
            
            if (typeof(_callback) == 'function')
                setTimeout(_callback, 1000);
            
            return this;
        };
        
        IFRAME.compact_height = function (_compact, _callback) {
            
            if (_callback == null && typeof(_compact) == 'function')
            {
                _callback = _compact;
                _compact = null;
            }
            
            var _this = IFRAME;
            
            var _class_name = 'compact-height';
            if (_compact == null)
                _this.toggleClass(_class_name);
            else if (_compact == true)
                _this.addClass(_class_name);
            else
                _this.removeClass(_class_name);
            
            if (typeof(_callback) == 'function')
                setTimeout(_callback, 1000);
            
            return this;
        };
        
        IFRAME.compact = function (_compact, _callback) {
            
            if (_callback == null && typeof(_compact) == 'function')
            {
                _callback = _compact;
                _compact = null;
            }
            
            var _this = $(this);
            
            var _class_name = 'compact-height';
            var _class_name2 = 'compact-width';
            if (_compact == null)
            {
                _this.toggleClass(_class_name);
                _this.toggleClass(_class_name2);
            }
            else if (_compact == true)
            {
                _this.addClass(_class_name);
                _this.addClass(_class_name2);
            }
            else
            {
                _this.removeClass(_class_name);
                _this.removeClass(_class_name2);
            }
            
            if (typeof(_callback) == 'function')
                setTimeout(_callback, 1000);
            
            return this;
        };
        
        IFRAME.load(function () {
            if (typeof(LOCK) != 'undefined')
                return;
            setTimeout(function () {
                //$.test_msg('IFRAME typeof', typeof(IFRAME));
                CONTENTS = $('#iframe').contents();
                UNIT_CONFIG.prepare = null;
                LOCK = true;
                unit();
            }, 1500);
        });
    });
}

var _autorun = true;
if (_autorun)
{
    //初次載入時，移除hash
    /*
    var href = location.href;
    var hash_pos = href.indexOf('#'); 
    if (hash_pos > -1)
    {
        //location.href = href.substr(0, hash_pos + 1);
        location.hash = '#';
    }
    */  
    
    $(function () {
        unit(3000);    
    });
}

/* End of file unit */
/* Location: ./js/unit.js */