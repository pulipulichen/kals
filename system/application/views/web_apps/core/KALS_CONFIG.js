/**
 * KALS_CONFIG
 * 
 * 只有跨越不同程式而需要同一個參數時，才到此設定
 *
 * @package		KALS
 * @category		Webpage Application Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/8/5 下午 07:50:21
 */

KALS_CONFIG = {
    exp2010_lock: true,
    anchor_length_max: 144,
    disable_annotation_type: ['concept', 'custom'],
    enable_custom_name: false,
    ckeditor_config: {
        autoGrow_maxHeight: false,
        autoGrow_maxWidth: false,
        extraPlugins: 'kals_maximize,youtube',
        toolbar: [
            ['Maximize','Source','Preview','-'],
            ['Cut','Copy','Paste','PasteText','PasteFromWord'],
            ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
            '/',
            ['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
            ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote','CreateDiv'],
            ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
            ['Link','Unlink','Anchor'],
            ['Image','Youtube','Table','HorizontalRule','Smiley','SpecialChar'],
            '/',
            ['Styles','Format','Font','FontSize'],
            ['TextColor','BGColor'],
            ['Maximize','-','Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink']
        ],
        height: '50px',
        //width: '261px',
        resize_enabled: false,
        startupFocus: false,
        uiColor : '#CB842E'
    }
};

/* End of file KALS_CONFIG */
/* Location: ./system/application/views/web_apps/KALS_CONFIG.js */