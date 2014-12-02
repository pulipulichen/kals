/**
 * Init_note_editor
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <puddingchen.35@gmail.com>
 * @copyright  Copyright (c) 2010, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       http://sites.google.com/site/puddingkals/
 * @version    1.0 2010/10/25 下午 02:42:42
 * @extends {Task_event_dispatcher}
 */
function Init_note_editor() {
    
    Task_event_dispatcher.call(this);

    this._$schedule_task = [
        //'ckeditor'
        'textarea'
    ];
}

Init_note_editor.prototype = new Task_event_dispatcher();

/* End of file Init_note_editor */
/* Location: ./system/application/views/web_apps/Init_note_editor.js */