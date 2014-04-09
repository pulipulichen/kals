/**
 * Selection_my_concept
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/24 下午 01:58:03
 * @extends {Selection_my}
 */
function Selection_my_concept(_text) {
    
    Selection_my.call(this,_text);
    
}

Selection_my_concept.prototype = new Selection_my();

Selection_my_concept.prototype._$name = 'my_concept';

/* End of file Selection_my_concept */
/* Location: ./system/application/views/web_apps/Selection_my_concept.js */