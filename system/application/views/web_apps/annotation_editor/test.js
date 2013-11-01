/**
 * test
 *
 * @package		KALS
 * @category		Webpage Application Libraries
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) Expression year is undefined on line 7, column 41 in Templates/KALS/JavaScript Class.js., Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2013/6/9 下午 03:17:45
 */

/**
 * @memberOf {test}
 * @extends {KALS_user_interface}
 * @constructor
 */
function test() {
    this._test_reset();
    return this;
}

/**
 * Extends from KALS_user_interface.
 * @memberOf {test}
 */
test.prototype = new KALS_user_interface();

/**
 * Attribute description about attribute.
 * @memberOf {test}
 * @type {Object}
 */
test.prototype.attribute = null;

//test.prototype.attribute = null;

/**
 * Reset test
 * @memberOf {test}
 */
test.prototype._test_reset = function ()
{
    //this.attribute = null;
    return this;
};


/**
 * Create UI
 * @memberOf {test}
 * @type {jQuery} UI
 */
test.prototype._$create_ui = function ()
{
    return this;
};

//test.prototype.method = function (_param)
//{
//    return this;
//};

// ---------
// Initilaize
// ---------
//$(function () {
//    test = new test();
//});

/* End of file test */
/* Location: ./system/application/views/web_apps_release/test.js */