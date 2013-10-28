/**
 * Base_extend
 * 使用Dean Edwards的Base繼承庫的繼承代碼，目的是為了騙過Aptana的JavaScirpt分析器。
 *
 * @package     KALS
 * @category    Webpage Application Libraries
 * @author      Pudding Chen <puddingchen.35@gmail.com>
 * @copyright   Copyright (c) 2010, Pudding Chen
 * @license     http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link        http://sites.google.com/site/puddingkals/
 * @version     1.0 2010/9/29 下午 09:57:42
 * @extends {KALS_user_interface}
 * @param {Object} _subclass 要被繼承的下層物件
 * @param {Object|null} _superclass 要繼承的上層物件。預設是以Dean Edwards的Base繼承庫為繼承對象。
 */
function Base_extend (_subclass, _superclass)
{
    if (_superclass == null)
        _superclass = Base;
    
    var _obj = _superclass.extend(_subclass.prototype);
    
    //清理_child原本的屬性
    for (var _key in _subclass) 
    {
        delete _subclass[_key];
    }
    
    //將繼承之後的物件複製到_child當中
    for (var _key in _obj)
    {
        _subclass[_key] = _obj[_key];
    }
}

/* End of file Base_extend */
/* Location: ./system/application/views/web_apps/Base_extend.js */