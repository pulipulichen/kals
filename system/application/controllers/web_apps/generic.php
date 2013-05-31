<?php
include_once 'web_apps_controller.php';
/**
 * generic
 *
 * generic full description.
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/28 下午 01:08:33
 */

class generic extends Web_apps_controller {

    protected $controller_enable_cache = FALSE;

    function toolkit($return_list = NULL)
    {
        $list = array(
            'libraries/jquery.tools'
            ,'libraries/jquery.ba-bbq.min'
            , 'libraries/jquery.jcrop'
            , 'libraries/jquery.ba-hashchange'
            , 'libraries/jquery.placeheld'
            , 'libraries/jquery.endless-scroll.1.4.1'
        );

        $list_package = array(
            'core/KALS_CONFIG'
            , 'core/KALS_language_param'
            , 'libraries/yui'
            , 'libraries/jQuery_mousewheel_plugin'
            , 'libraries/jquery.scrollIntoView'
            , 'toolkit/jQuery_kals_plugin'
            , 'toolkit/KALS_user_interface' //Qunit
            , 'toolkit/KALS_modal'
            , 'toolkit/Overlay_modal'
            ,'toolkit/Tooltip_modal'
            , 'toolkit/Dialog_modal'
            , 'toolkit/Dialog_option'
            , 'toolkit/Dialog_link'
            , 'toolkit/Dialog_close_option'
            , 'toolkit/Dialog_close_link'
            , 'toolkit/Notify_modal'
            , 'toolkit/Event_dispatcher'
            , 'toolkit/Multi_event_dispatcher'
            , 'toolkit/Attribute_event_dispatcher'
            , 'toolkit/JSONP_dispatcher'
            , 'toolkit/Task_event_dispatcher'
            , 'helpers/KALS_exception'
            , 'toolkit/Name_value_pair'
            , 'helpers/KALS_util'   //Qunit

            //, 'toolkit/'
        );

        if (is_null($return_list))
        {
            $this->load_js($list);
            $this->pack_js($list_package, 'toolkit');
        }
        else
        {
            $full_list = $list;
            foreach ($list_package AS $path)
                $full_list[] = $path;
            return $full_list;
        }
    }

    function core($return_list = NULL)
    {
        $list = array(
            //'',
            ""
        );

        $list_package = array(
            'core/KALS_language',
            'core/Viewportmove_dispatcher',
            'core/KALS_authentication',
            'core/URL_hash_dispatcher',
            'core/Style_manager',
            'core/Overlay_manager',
            'core/Context_user',
            'core/Context_policy',
            'core/Context_search',
            'core/Context_custom_type',
            'core/Init_context',
            'core/Init_component',
            'core/Init_profile',
            'core/KALS_context',
            ''
        );

        if (is_null($return_list))
        {
            //$this->load_js($list);
            $this->pack_js($list_package, 'core');
        }
        else
        {
            $full_list = $list;
            foreach ($list_package AS $path)
                $full_list[] = $path;
            return $full_list;
        }
    }

    function component($return_list = NULL)
    {
        $list = array(            
            ''
        );

        $list_package = array(
            //'',
            'kals_window/KALS_window',
            'kals_window/Window_loading_component',
            'kals_window/Window_content',
            'kals_window/Window_content_submit',
            'kals_window/Window_user_interface',
            'kals_window/Window_change_link',

            'navigation/Navigation_list',

            'navigation/Anonymous_navigation',

            'navigation/Window_login',
            'navigation/Window_login_submit',
            'navigation/Window_register',
            'navigation/Window_register_submit',

            'navigation/Profile_navigation',
            'navigation/Embed_navigation',
            'navigation/Window_profile',
            'navigation/Window_profile_submit',
            //'navigation/Window_style',
            //'navigation/Window_style_submit',
            'navigation/Window_logout',
            'navigation/Window_logout_submit',
            'navigation/Window_password_change',
            'navigation/Window_password_change_submit',
            'navigation/Window_search',

            'navigation/Common_navigation',
            'navigation/Window_filter',
            'navigation/Window_filter_submit',

            'kals_toolbar/Toolbar_component',
            'kals_toolbar/Toolbar_toggle_component',
            'kals_toolbar/Toolbar_padding_component',
            'kals_toolbar/Logo_component',
            'kals_toolbar/Loading_component',
            'kals_toolbar/Search_component',
            'kals_toolbar/Search_form_component',
            'kals_toolbar/Search_result_component',

            'kals_toolbar/Avatar_component',
            'kals_toolbar/Notification_component',

            'kals_toolbar/KALS_toolbar',

            'annotation_param/Scope_param',
            'annotation_param/Scope_collection_param',
            'annotation_param/User_param',
            'annotation_param/User_collection_param',
            'annotation_param/Annotation_type_param',
            'annotation_param/Annotation_param',
            'annotation_param/Annotation_collection_param',
            'annotation_param/Recommend_param',

            'selection/Selection',
            'selection/Selection_view',
            'selection/Selection_select',
            'selection/Selection_search',
            'selection/Selection_recommend',
            'selection/Selection_recommended',
            'selection/Selection_recommend_by',
            
            'selection/Selection_my',
            'selection/Selection_my_importance',
            'selection/Selection_my_concept',
            'selection/Selection_my_confusion',
            'selection/Selection_my_question',
            'selection/Selection_my_example',
            'selection/Selection_my_summary',
            'selection/Selection_my_custom',
            'selection/Selection_my_manager',

            'selection/Selection_my_custom_type',
            'selection/Selection_my_custom_manager',
            
            'selection/Selection_navigation',
            'selection/Selection_navigation_bad',
            'selection/Selection_navigation_normal',
            'selection/Selection_navigation_good',
            'selection/Selection_navigation_great',
            'selection/Selection_navigation_manager',

            'selection/Select_tooltip',
            'selection/Selectable_text',
            'selection/Selection_manager',

            
            'annotation_editor/Editor_container',
            'annotation_editor/Annotation_editor',
            'annotation_editor/Type_component',
            'annotation_editor/Type_menu',
            'annotation_editor/Note_editor',
            'annotation_editor/Note_editor_ckeditor',
            'annotation_editor/Init_note_editor',
            'annotation_editor/Note_editor_manager',
            'annotation_editor/Editor_respond_to',
            'annotation_editor/Editor_respond_to_collection',
            'annotation_editor/Editor_respond_to_topic',
            'annotation_editor/Policy_component',
            'annotation_editor/Window_policy',
            'annotation_editor/Window_policy_submit',

            'annotation_list/List_collection',
            'annotation_list/List_collection_like',
            'annotation_list/List_collection_my',
            'annotation_list/List_collection_other',
            'annotation_list/List_collection_anonymous',
            'annotation_list/Respond_list_collection',
            'annotation_list/Topic_list',


            'annotation_list/List_timestamp_component',
            'annotation_list/List_menu',

            'annotation_list/List_menu_tooltip',
            'annotation_list/List_menu_block',
            'annotation_list/List_like_component',
            'annotation_list/List_header_component',
            'annotation_list/List_note_component',
            'annotation_list/List_item',
            'annotation_list/List_item_topic',
            'annotation_list/List_item_respond',

            'annotation_recommend/Recommend_hint',
            'annotation_recommend/Recommend_tooltip',
            'annotation_recommend/Recommend_list_item',

            'annotation_view/View_anchor_text_component',
            'annotation_view/View_list_collection',
            'annotation_view/View_list_item_topic',
            'annotation_view/View_list_item_respond',
            'annotation_view/View_editor_container',
            'annotation_view/View_respond_list_collection',
            'annotation_view/Window_view',

            'kals_text/Annotation_tool',
            'kals_text/Annotation_scope_loader',
            'kals_text/My_annotation_loader',
            'kals_text/My_basic_annotation_loader',
            'kals_text/My_custom_annotation_loader',
            'kals_text/Navigation_loader',

            'kals_text/Init_text',
            'kals_text/KALS_text',
        );

        if (is_null($return_list))
        {
            //$this->load_js($list);
            $this->pack_js($list_package, 'component');
        }
        else
        {
            $full_list = $list;
            foreach ($list_package AS $path)
                $full_list[] = $path;
            return $full_list;
        }
    }

    function package($is_demo = NULL) {
	
        if (isset($is_demo))
        {
                $this->dir = $this->release_dir;
        }

        $full_list = array();
        
        $list_toolkit = $this->toolkit(true);
        $list_core = $this->core(true);
        $list_component = $this->component(true);

        
        $full_list = $list_toolkit;
        foreach ($list_core AS $path)
            $full_list[] = $path;
        foreach ($list_component AS $path)
            $full_list[] = $path;

        //$this->load_js($full_list);
        $this->pack_js($full_list, 'package');
    }
    
    function component_package($is_demo = NULL) {
	
        if (isset($is_demo))
        {
                $this->dir = $this->release_dir;
        }

        $this->core();
        $this->component();

    }
    

    function style()
    {
        $list = array(
        	'kals-reset',
            'generic',
            'dialog',
            'notify',
            'toolbar',
            'tooltip',
            'jquery.jcrop',
            'window',
            'navigation',
            'selection',
            'text',
            'annotation_tool',
            'annotation_list',
            'annotation_editor',
            'annotation_view',
            'annotation_recommend',
            'core'
        );
        /*
        foreach ($list AS $path)
        {
            //測試用時，寫load_css
            //$this->load_css($path);

            //實際使用時，寫pack_css
            
            //$this->_20130219_pack_css($path);
        }*/
        $this->pack_css($list, 'style');
    }

    /**
     * @deprecated 20111106 Pudding Chen 請使用style
     */
    function style_release()
    {
        $list = array(
            'kals-reset',
            'generic',
            'dialog',
            'notify',
            'toolbar',
            'tooltip',
            'jquery.jcrop',
            'window',
            'navigation',
            'selection',
            'text',
            'annotation_tool',
            'annotation_list',
            'annotation_editor',
            'annotation_view',
            'annotation_recommend',
            'core'
        );
        foreach ($list AS $path)
        {
            //測試用時，寫load_css
            //$this->load_css_release($path);

            //實際使用時，寫pack_css
            $this->pack_css($path, 'style_release');
        }
    }

    function load_css($path, $path2 = NULL)
    {
        if (isset($path2))
            $path .= '/'.$path2;

        $path .= '.css';
        if (FALSE === starts_with($path, 'style/'))
            $path = 'style/'.$path;

        $file_path = './system/application/views/'.$this->dir.$path;
        //test_msg($file_path, is_file($file_path));
        if (is_file($file_path) == FALSE)
            return;


        $style = $this->load->view($this->dir.$path, NULL, TRUE);

        //取代網址
        $base_url = base_url();
        $style = str_replace('${base_url}', $base_url, $style);

        send_css_header($this->output);
        $this->load->view($this->dir.'display', array('data'=>$style));
    }
    
    function load_css_release($path, $path2 = NULL)
    {
        if (isset($path2))
            $path .= '/'.$path2;

        $path .= '.css';
        if (FALSE === starts_with($path, 'style/'))
            $path = 'style/'.$path;

        $file_path = './system/application/views/'.$this->dir.$path;
        //test_msg($file_path, is_file($file_path));
        if (is_file($file_path) == FALSE)
            return;


        $style = $this->load->view($this->dir.$path, NULL, TRUE);

        //取代網址
        $base_url = base_url();
        $style = str_replace('${base_url}', $base_url, $style);

        send_css_header($this->output);
        $this->load->view($this->release_dir.'display', array('data'=>$style));
    }

    function jquery()
    {
        $path = 'libraries/jquery';
        //$this->pack_js($path);
        $this->load_js($path);
    }

    function loader($is_release = NULL)
    {
        //if (is_null($is_release) == false)
        if (true)
        {
                $this->dir = $this->release_dir;
        }
        
        $path = 'core/KALS_loader';

        //$this->load_js($path);
        $this->pack_js($path, 'loader');
    }

    function info($json, $callback = NULL)
    {
        if (is_null($callback))
        {
            $callback = $json;
            $json = NULL;
        }
        
        //分析json
        if (isset($json))
        {
            $input_data = json_to_object($json);

            if (isset($input_data->anchor_navigation_type))
            {
                $type = $input_data->anchor_navigation_type;
                $GLOBALS['context']->set_anchor_navigation_type ($type);
            }
        }

        $data = array();

        $data['KALS_language'] = $this->_load_lang();
        $data['Window_profile'] = array(
            'sex' => array(0, 1, 2),    //性別
            'locale' => array('zh_tw', 'en_us') //語系
        );

        require_once 'authentication.php';
        $authentication = new authentication();

        $data['KALS_authentication'] = $authentication->default_data();

        $this->_display_jsonp($data, $callback);
    }

    private function _load_lang()
    {
        $this->lang->load('kals_web_apps');
        $web_apps_lang = $this->lang->package('web_apps');
        return $web_apps_lang;
    }

    /**
     * 設置標註指引類型
     * @version 20111106 Pudding Chen
     * @param string $json = 'all', 'recommend', 'none'
     * @param string $callback
     */
    public function set_anchor_navigation_type($json, $callback = NULL)
    {
        if (is_null($callback))
        {
            $callback = $json;
            $json = 'all';
        }
        
        $type = $json;
        $GLOBALS['context']->set_anchor_navigation_type($type);

        $data = true;
        $this->_display_jsonp($data, $callback);
    }
}


/* End of file generic.php */
/* Location: ./system/application/controllers/generic.php */