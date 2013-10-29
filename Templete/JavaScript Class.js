/**
 * ${name}
 *
 * @package		KALS
 * @category		Webpage Application Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 ${date} ${time}
 */

/**
 * @memberOf {${name}}
 * @extends {KALS_user_interface}
 * @constructor
 */
function ${name}() {
    this._${name}_reset();
    return this;
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {${name}}
 */
${name}.prototype = new KALS_user_interface();

/**
 * Attribute description about attribute.
 * @memberOf {${name}}
 * @type {Object}
 */
${name}.prototype.attribute = null;

//${name}.prototype.attribute = null;

/**
 * Reset ${name}
 * @memberOf {${name}}
 */
${name}.prototype._${name}_reset = function ()
{
    //this.attribute = null;
    return this;
};


/**
 * Create UI
 * @memberOf {${name}}
 * @type {jQuery} UI
 */
${name}.prototype._$create_ui = function ()
{
    return this;
};

//${name}.prototype.method = function (_param)
//{
//    return this;
//};

// ---------
// Initilaize
// ---------
//$(function () {
//    ${name} = new ${name}();
//});

/* End of file ${name} */
/* Location: ./system/application/views/web_apps/${name}.js */