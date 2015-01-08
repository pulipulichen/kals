/**
 * Selection_my_question
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
function Selection_my_question(_text) {
    
    Selection_my.call(this,_text);
    
}

Selection_my_question.prototype = new Selection_my();

Selection_my_question.prototype._$name = 'my_question';

/* End of file Selection_my_question */
/* Location: ./system/application/views/web_apps/Selection_my_question.js */