/**
 * KALS_CONFIG
 * 
 * 只有跨越不同程式而需要同一個參數時，才到此設定
 *
 * @package         KALS
 * @category        Webpage Application Libraries
 * @author          Pudding Chen <puddingchen.35@gmail.com>
 * @copyright       Copyright (c) 2010, Pudding Chen
 * @license         http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link            https://github.com/pulipulichen/kals
 * @version		1.5 2014/4/28 下午 07:50:21
 */

DEFAULT_KALS_CONFIG = {
    
    /**
     * 標註範圍指定區塊
     * @type {string,null} jQuery的指定語法(selector)
     *     請盡量以ID為指定區塊。
     *     例如指定ID名為「annotation_scope」的區塊，請輸入「#annotation_scope」
     *     如果是指定區有多個區塊，那麼只有第一個區塊能夠進行標註。
     *     預設是選擇全部的網頁。
     */
    annotation_scope_selector: null,
    
    /**
     * 標題圖示
     * 工具列左方的顯示內容
     * @type {string} HTML語法
     */
    logo: "KALS",
    
    /**
     * 預設登入的帳號
     * @type {string} = null E-mail郵件地址
     *     不使用預設登入時則是null 
     */
    user_email: null,
    
    /**
     * 預設權限
     * @type {string} = "public" 權限 
     *     公開： default_policy: "public"
     *     私密： default_policy: "private" 
     */
    default_policy_type: "public",
    
    /**
     * @type {boolean} = true 可否調整權限
     */
    policy_changable: true,
    
    /**
     * @type {boolean} = false 阻止註冊
     */
    deny_register: false,
    
    /**
     * @{type} string 登入時顯示的訊息，如果不使用的話，值填入null
     *     如果要使用的話，則填入字串
     */
    login_hint: null,
    
    /**
     * 顯示其他人的標註
     * @version 20111106 Pudding Chen
     *     2009年的舊稱呼是「navigation_annotation」，2011年改成「anchor_navigation_type」
     * @type {string} = "all" | "recommend" | "none" | null 預設使用all
     *     "all": 顯示所有標註
     *     "recommend": 顯示推薦標註。但並不準確，通常系統找不出推薦的標註。
     *     "none" | null：不顯示標註
     */
    anchor_navigation_type: "all",
    
    /**
     * @type {boolean} = false 是否啟用標註建議，預設關閉。
     */
    enable_annotation_recommend: false,
    
    /**
     * 使用的標註類型
     * 標註類型的順序會照以下設定排列。
     * 
     * 20140425 Pulipuli Chen
     * 舊名稱「annotation_type_option」，新名稱「annotation_type_basic_enable」
     * 20140505 Pulipuli Chen
     * 舊名稱「annotation_type_basic_enable」，新名稱「annotation_type_basic」
     * 
     * 基本的標註類型如下：
     *     importance: 重要
     *     concept: 概念
     *     confusion: 困惑
     *     question: 疑問
     *     example: 舉例
     *     summary: 摘要
     *     custon: 自訂
     *     
     *  請自行調整各標註類型的啟用範圍與順序
     */
    annotation_type_basic: {
        'importance' : {
            enable: {   // 啟用範圍
                topic: true,    // 新標註
                respond: true   // 回應標註
            },
            order: 1    // 數字越大，排序越上面
        },
        'concept' : {
            enable: {   // 啟用範圍
                topic: true,    // 新標註
                respond: true   // 回應標註
            },
            order: 1    // 數字越大，排序越上面
        },
        'confusion' : {
            enable: {   // 啟用範圍
                topic: true,    // 新標註
                respond: true   // 回應標註
            },
            order: 1    // 數字越大，排序越上面
        },
        'question' : {
            enable: {   // 啟用範圍
                topic: true,    // 新標註
                respond: true   // 回應標註
            },
            order: 1    // 數字越大，排序越上面
        },
        'example' : {
            enable: {   // 啟用範圍
                topic: true,    // 新標註
                respond: true   // 回應標註
            },
            order: 1    // 數字越大，排序越上面
        },
        'summary' : {
            enable: {   // 啟用範圍
                topic: true,    // 新標註
                respond: true   // 回應標註
            },
            order: 1    // 數字越大，排序越上面
        },
        'custom' : {
            enable: {   // 啟用範圍
                topic: true,    // 新標註
                respond: true   // 回應標註
            },
            order: 1    // 數字越大，排序越上面
        }
    },
    
    /**
     * 是否讓「自訂」選項可供使用者自由填入資料
     * 
     * 如果是true，就會顯示「自訂」
     * 如果是false，就會顯示「其他」
     * @type {boolean} = false
     */
    enable_custom_name: true,
    
    /**
     * 預先定義標註類型。
     * 
     * 注意，這個設定不會覆蓋annotation_type_option設定的標註類型
     * 而是會加在原本的標註類型下面。
     * 如果你要取消原本的標註類型，請修改annotation_type_option
     * 
     * 20140425 Pulipuli Chen
     * 舊名稱「annotation_custom_type」，新名稱「annotation_type_predefined」
     */
    /*
    annotation_type_predefined: {
        "預先定義1": {
            //type_id: 15,
            hint: '測試的說明',
            option: {
                background_color: 'blue',
                font_color: 'white'
            },
            anchor: {
                style: 'dottedline',
                color: 'blue'    
            },
            enable: {   // 啟用範圍
                topic: true,    // 新標註
                respond: true   // 回應標註
            },
            order: 1    // 數字越大，排序越上面
        },
        '預先定義2': {
            //type_id: 16,
            hint: '在測試的說明在測試的說明在測試的說明在測試的說明在測試的說明在測試的說明',
            option: {
                background_color: 'red',
                font_color: 'blue'
            },
            anchor: {
                style: 'background',
                color: '#F53004',
                font_color: 'white'
            },
            enable: {   // 啟用範圍
                topic: true,    // 新標註
                respond: true   // 回應標註
            },
            order: 1    // 數字越大，排序越上面
        }
    },
     */
   
    /**
     * KALS操作說明的網址
     * 
     * @type {string|null} help_base_url = 'help/' 網址
     *     也可以用http開頭的絕對網址，例如'http://www.google.com.tw/'
     */
    help_base_url: 'help/',
	
    /**
     * 預設標註類型
     *
     * @copyright 20130603 Pudding Chen
     * @type {string} = "importance" 重要，也可以寫上自訂的名字
     */
    default_annotation_type: "importance",

    /**
     * 網頁搜尋
     * 
     * @copyright 20130603 Pudding Chen
     * 可以設定網頁搜尋的網址。要搜尋的參數請設成{query}
     * 
     * @type {String} web_search_url = "http://www.google.com/search?q={query}"; 不想開放網頁搜尋功能時，請設成"disable"
     */
    web_search_url: "http://www.google.com/search?q={query}",
    //web_search_url: "disable",

    /**
     * 獨立模式
     * @type {boolean} isolation_mode: false，預設不開啟
     * 
     * 開啟之後，所有人都只能看到自己的標註，無法看到別人的標註。
     * 但是關閉之後，所有人又能看到別人的標註
     */
    isolation_mode: false,
	
    //----------------------------
    
    //以下是版面調整
    anchor_length_max: 144,
    ckeditor_config: {
        autoGrow_maxHeight: false,
        autoGrow_maxWidth: false,
        extraPlugins: 'kals_maximize,youtube',
        toolbar: [
			//最大化的時候顯示的工具列
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
			
			//最小化的時候顯示的工具列
            ['Maximize','Source','-','Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'Image','Youtube']	
        ],
        height: '50px',
        //width: '261px',
        resize_enabled: false,
        startupFocus: false,
        uiColor : '#CB842E'
    },
    //標註列表設定
    annotation_list: {
        //筆記顯示設定
        note: {
            simple_max_length: 150,
            //允許顯示的HTML標籤
            allow_html_tags: ["a", "img", "iframe"]
        }
    },
    
    // --------------------------
    // KALS framework
    // --------------------------
    
    /**
     * 需要初始化的事件名稱
     */
    view: {
        init_attrs: [
            'class',
            'value',
            //'style',
            'src',
            'height',
            'width',
            'alt',
            'title',
            'kals-style'
        ],
        event_names: [
            'click',
            'mouseover',
            'mouseout',
            'mouseenter',
            'blur',
            'focus',
            'change',
            'dblclick',
            'submit'
        ],
        kals_events: {
            'field_set': 'kals-event-field-set',
            'field_reset': 'kals-event-field-reset'
        },
        kals_attrs: {
            'field': 'kals-field',
            'field_parent': 'kals-field-parent',
            'field_repeat': 'kals-field-repeat',
            'repeat_index': 'kals-field-repeat-index',
            'attr_prefix': 'kals-attr-',
            'origin_value_postfix': '-origin-value',
            'event_prefix': 'kals-event-'
        },
        /**
         * 找尋變數的規則
         * @type {RegExp}
         */
        regular_expression: /\{\{([\w]|\-|\:|\.|\(|\))*\}\}/g
    },   //view: {
    /**
     * 是否啟用選取文字快取
     * @type Boolean
     */
    selectable_text_cache: false,
    
    /**
     * 偵錯用設定
     * @type JSON
     */
    debug: {
        /**
         * 是否顯示ajax_get的連接訊息
         * @type Boolean
         */
        ajax_get_message: false,
        
        /**
         * 開啟ajax_post設定
         * 設定檔案為 [VIEW]/helpers/KALS_util.js
         * @type Boolean
         */
        ajax_post: false, 
        
        /**
         * 取消載入KALS_context的後續動作
         * 等於不初始化其他元件
         * @type Boolean
         */
        kals_context_disable: false
    },
    
    /**
     * 模組設定
     * @type {JSON}
     */
    modules: {
        /**
         * 模組名稱: 模組設定內容
         * @type {JSON}
         */
        /**
         * 資訊區
         * @type {Object}
         */
        Dashboard: {
            /**
             * 是否啟用模組
             * @type Boolean
             */
            "enable": true,
            "nav_config": {
                /**
                 * 顯示資料
                 * @type Boolean
                 */
                display: true,

                /**
                 * 決定顯示導覽列的位置
                 * 
                 * 類型包括：
                 * - common: 不管什麼類型都會顯示(在以下三種類型中都會顯示)
                 * - login: 已經登入的使用者就會顯示
                 * - profile: 以手動登入的使用者才會顯示
                 * - embed: 以內嵌登入的使用者才會顯示
                 * - anonymous: 未登入的使用者才會顯示
                 * @type String
                 */
                nav_type: "common",

                /**
                 * 排序順序
                 * 
                 * 數字越大，越往左邊靠
                 * 數字最小的是1
                 * @type Number
                 */
                order: 1
            }
        },
        /**
         * 標註小地圖
         * @type {Object}
         */
        Annotation_navigation_map: {
            /**
             * 是否啟用模組
             * @type Boolean
             */
            "enable": true,
            "nav_config": {
                display: true,
                nav_type: "common",
                order: 1
            },
            /**
             * 安照原本的章節順序排序
             * @type boolean
             */
            order_by_article: true
        },
        /**
         * 零碎時間
         * @type type
         */
        Frag_reading: {
            /**
             * 是否啟用模組
             * @type Boolean
             */
            "enable": true,
            "nav_config": {
                display: true,
                nav_type: "common",
                order: 1
            },
            /**
             * 設定自動save_reading_progress的時間頻率
             * @type Number
             */
            "interval_span": 10,
            /**
             * 頁面停止時延遲的增加時間
             * @type Number
             */
            "increase_interval_span": 10
        },
        /**
         * 搜尋功能
         */
        Window_search: {
            "enable": false
        },
        /**
         * 章節地圖
         */
        Window_map: {
            "enable": false
        },
        /**
         * 標註顯示
         */
        Window_filter: {
            "enable": true
        },
        /**
         * 導讀功能
         */
        Reading_guide: {
            "enable": true
        },
        /**
         * 回報功能
         */
        Feedback_manager: {
            "enable": true
            /**
             * 回報接收者的電子郵件信箱
             * 
             * 可以設定很多位，用陣列組成
             * @type String|Array<String>
             */
            //,"receiver_email": "pudding@nccu.edu.tw"
            //,"receiver_email": ["puddingchen.35@gmail.com", "pudding@nccu.edu.tw", "pulipuli.chen@gmail.com"]
        },
        /**
         * 獎章功能
         */
        KALS_stamp: {
            "enable": true
        }
    }
};

/**
 * 偵測是否有參數，否則直接覆蓋
 */
if (typeof(KALS_CONFIG) !== 'undefined') {
    for (var _i in KALS_CONFIG) {
        DEFAULT_KALS_CONFIG[_i] = KALS_CONFIG[_i];
    }
}

KALS_CONFIG = DEFAULT_KALS_CONFIG;

/* End of file KALS_CONFIG */
/* Location: ./system/application/views/web_apps/KALS_CONFIG.js */