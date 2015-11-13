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
     * 是否啟用KALS
     * @type Boolean
     */
    "enable_kals": true,
    
    /**
     * 標註範圍指定區塊
     * @type {string,null} jQuery的指定語法(selector)
     *     請盡量以ID為指定區塊。
     *     例如指定ID名為「annotation_scope」的區塊，請輸入「#annotation_scope」
     *     如果是指定區有多個區塊，那麼只有第一個區塊能夠進行標註。
     *     預設是選擇全部的網頁。
     */
    "annotation_scope_selector": null,
    
    /**
     * 標題圖示
     * 工具列左方的顯示內容
     * @type {string} HTML語法
     */
    "logo": "KALS",
    
    /**
     * 預設登入的帳號
     * @type {string} = null E-mail郵件地址
     *     也可以使用網址，該網址應該要回傳使用者的email，例如 "http://localhost/user.txt"
     *     不使用預設登入時則是null 
     */
    "user_email": null,
    
    /**
     * 預設權限
     * @type {string} = "public" 權限 
     *     公開： default_policy: "public"
     *     私密： default_policy: "private" 
     */
    "default_policy_type": "public",
    
    /**
     * @type {boolean} = true 可否調整權限
     */
    "policy_changable": true,
    
    /**
     * @type {boolean} = false 阻止註冊
     */
    "deny_register": false,
    
    /**
     * @{type} string 登入時顯示的訊息，如果不使用的話，值填入null
     *     如果要使用的話，則填入字串
     */
    "login_hint": null,
    
    /**
     * 顯示其他人的標註
     * @version 20111106 Pudding Chen
     *     2009年的舊稱呼是「navigation_annotation」，2011年改成「anchor_navigation_type」
     * @type {string} = "all" | "recommend" | "none" | null 預設使用all
     *     "all": 顯示所有標註
     *     "recommend": 顯示推薦標註。但並不準確，通常系統找不出推薦的標註。
     *     "none" | null：不顯示標註
     *     "my": 顯示跟my的標註一樣的樣子(顏色跟樣式都相同喔) @author Pudding 20151101
     */
    "anchor_navigation_type": "all",
    
    /**
     * @type {boolean} = false 是否啟用標註建議，預設關閉。
     */
    "enable_annotation_recommend": false,
    
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
    "annotation_type_basic": {
        "importance" : {
            "enable": {   // 啟用範圍
                "topic": true,    // 新標註
                "respond": true   // 回應標註
            },
            "order": 10    // 數字越大，排序越上面
        },
        "concept" : {
            "enable": {   // 啟用範圍
                "topic": true,    // 新標註
                "respond": true   // 回應標註
            },
            "order": 10    // 數字越大，排序越上面
        },
        "confusion" : {
            "enable": {   // 啟用範圍
                "topic": true,    // 新標註
                "respond": true   // 回應標註
            },
            "order": 10    // 數字越大，排序越上面
        },
        "question" : {
            "enable": {   // 啟用範圍
                "topic": true,    // 新標註
                "respond": true   // 回應標註
            },
            "order": 10    // 數字越大，排序越上面
        },
        "example" : {
            "enable": {   // 啟用範圍
                "topic": true,    // 新標註
                "respond": true   // 回應標註
            },
            "order": 10    // 數字越大，排序越上面
        },
        "summary" : {
            "enable": {   // 啟用範圍
                "topic": true,    // 新標註
                "respond": true   // 回應標註
            },
            "order": 10    // 數字越大，排序越上面
        },
        "custom" : {
            "enable": {   // 啟用範圍
                "topic": true,    // 新標註
                "respond": true   // 回應標註
            },
            "order": 1    // 數字越大，排序越上面
        }
    },
    
    /**
     * 是否讓「自訂」選項可供使用者自由填入資料
     * 
     * 如果是true，就會顯示「自訂」
     * 如果是false，就會顯示「其他」
     * @type {boolean} = false
     */
    "enable_custom_name": true,
    
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
    "annotation_type_predefined": {
        "預先定義1": {
            "hint": "測試的說明",
            "option": {
                // 顏色可以用CSS英文單字"blue" 或是 #FFF 色碼代表
                "background_color": "blue",
                "font_color": "white"
            },
            "anchor": {
                // "underline": 底線(預設) / 'dashedline': 底線虛線 
                // 'dottedline': 底線虛線 / 'doubleline': 底線雙線 
                // "background": 背景顏色 / "none": 沒有特別的格式
                "style": "dottedline",
                "color": "blue"    
            },
            "enable": {   // 啟用範圍
                "topic": true,    // 新標註
                "respond": true   // 回應標註
            },
            "order": 1    // 數字越大，排序越上面
        },
        "預先定義2": {
            "hint": "在測試的說明在測試的說明在測試的說明在測試的說明在測試的說明在測試的說明",
            "option": {
                "background_color": "red",
                "font_color": "blue"
            },
            "anchor": {
                "style": "background",
                "font_color": "white"
            },
            "enable": {   // 啟用範圍
                "topic": true,    // 新標註
                "respond": true   // 回應標註
            },
            "order": 1    // 數字越大，排序越上面
        }
    },
     */
   
    /**
     * 預設標註類型
     *
     * @copyright 20130603 Pudding Chen
     * @type {string} = "importance" 重要，也可以寫上自訂的名字
     */
    "default_annotation_type": "importance",

    /**
     * 網頁搜尋
     * 
     * @copyright 20130603 Pudding Chen
     * 可以設定網頁搜尋的網址。要搜尋的參數請設成{query}
     * 
     * @type {String} web_search_url = "http://www.google.com/search?q={query}"; 不想開放網頁搜尋功能時，請設成"disable"
     */
    "web_search_url": { 
        "Google搜尋": "http://www.google.com/search?q={query}",
        "圖片：Google圖片": "https://www.google.com.tw/search?tbm=isch&safe=active&q={query}",
        "百科：維基百科": "http://zh.wikipedia.org/w/index.php?search={query}",
        "中英翻譯：Google翻譯": "https://translate.google.com.tw/#auto/zh-TW/{query}",
        "中英字典：Yahoo字典": "https://tw.dictionary.yahoo.com/dictionary?p={query}",
        "中文字典：萌典": "https://www.moedict.tw/{query}",
        "影片：YouTube": "https://www.youtube.com/results?search_query={query}&page=&utm_source=opensearch"
    },
    //web_search_url: "disable",

    /**
     * 獨立模式
     * @type {boolean} isolation_mode: false，預設不開啟
     * 
     * 開啟之後，所有人都只能看到自己的標註，無法看到別人的標註。
     * 但是關閉之後，所有人又能看到別人的標註
     */
    "isolation_mode": false,
    
    /**
     * 是否啟用選取文字快取
     * @type Boolean
     */
    "selectable_text_cache": true,
    
    /**
     * 是否覆寫選取文字快取
     * 當文字修改之後要重新建立快取時，可以啟用這個選項
     * 如果該選項一直維持true，則會強制一直覆寫快取，而不會讀取快取
     * @type Boolean
     */
    "selectable_text_clean_overwrite": false,
    
    
    /**
     * 標註工具相關設定
     * @author Pudding 20151028
     */
    "annotation_tool": {
        /**
         * 自動選取
         *
         * @type Number 如果是數字，就是選擇的秒數。如果是false，那就不啟用。
         * @author Pudding 20151028
         */
        "auto_select": false,
        
        /**
         * 是否顯示標註工具開頭的bar
         * @type Boolean
         * @author Pudding 20151029
         */
        "editor_tool_display": true,
        
        /**
         * 水平對齊的模式
         * left: 選擇範圍的左邊
         * center: 選擇範圍的右邊
         * sidebar: 變成側邊框
         * @type String
         * @author Pudding 20151029
         */
        "horizon_align": "left"
    },
    
    /**
     * 是否啟用搜尋工具列
     * @type Boolean
     */
    "enable_search_toolbar": true,
    
    /**
     * 是否啟用KALS工具列
     * @type Boolean
     * @author Pudding 20151019
     */
    "enable_kals_toolbar": true,
    
    /**
     * 是否啟用KALS標註編輯器
     * @type Boolean
     * @author Pudding 20151019
     */
    "enable_annotation_editor": true,
    
    /**
     * 是否啟用離開時提示訊息
     * @author Pulipuli Chen 20150117
     * @type Boolean
     */
    "enable_exit_confirm": false,
    
    /**
     * 管理者的名字清單
     * @type Array|String
     * @author Pudding Chen 20150410
     * admin_email_list: [
        "demo@dlll.nccu.edu.tw"
    ],
     */
    "admin_email_list": [],
    
    /**
     * 從其他檔案讀取設定檔
     * @author Pulipuli Chen 20151017
     * @type String
     */
    kals_config_api: null,
    
    /**
     * 主題佈景的顏色
     * 
     * 選項請參考Semantic UI的顏色差異
     * http://semantic-ui.com/elements/button.html#colored
     * - red
     * - orange
     * - yellow
     * - olive 橄欖綠
     * - green
     * - teal 青綠
     * - blue
     * - violet 藍紫
     * - purple 紫色
     * - pink 粉紅色
     * - brown 棕色：KALS的預設色
     * - grey 灰色
     * - black
     * @author Pudding 20151028
     */
    "theme": {
        /**
         * 按鈕
         * @type String
         */
        "button": "brown"
    },
    //----------------------------
    
    //以下是版面調整
    anchor_length_max: 144,
    ckeditor_config: {
        autoGrow_maxHeight: false,
        autoGrow_maxWidth: false,
        extraPlugins: 'kals_maximize,youtube,recordmp3js',
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
            ['Maximize','Source','-','Bold', 'Italic', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', 'Image','Youtube', 'recordmp3js']	
        ],
        height: '50px',
        //width: '261px',
        resize_enabled: false,
        startupFocus: false,
        uiColor : '#CB842E',
        'startupFocus': true,
        recordmp3js: {
            /**
             * 上傳檔案的位置
             * @type String
             */
            upload_url: "http://exp-php-file-host-2014.dlll.nccu.edu.tw/php-file-host/upload",
            /**
             * 取得網址的位置
             * @type String
             */
            get_link_url: "http://exp-php-file-host-2014.dlll.nccu.edu.tw/php-file-host/get_link",
            /**
             * 錄音檔案的限制
             * 最多60秒
             * @type Number
             */
            record_limit: 15    
        }
    },
    //標註列表設定
    annotation_list: {
        //筆記顯示設定
        note: {
            simple_max_length: 150,
            //允許顯示的HTML標籤
            allow_html_tags: ["a", "img", "iframe"]
        },
        /**
         * 加入喜愛的間隔限制，單位是秒
         * @author Pulipuli Chen 20141113
         * @type Number
         */
        like_interval: 5
    },
    /**
     * 編輯器的相關設定
     */
    annotation_editor: {
        /**
         * 新增標註之後，是否要變成編輯模式？
         * 
         * "edit": 編輯模式
         * "create": 新增模式
         * @relation Annotation_editor.js
         * @type String
         */
        mode_after_create_annotation: "create",
        /**
         * 是否實際遞交資料給伺服器
         * 
         * false: 真的遞交，正常運作應該選擇此項
         * true: 假的遞交，測試時使用
         * @type Boolean
         */
        create_annotation_mock: false,
        /**
         * 新增模式時，是否要重置標註類型？
         * 
         * false: 不重置標註類型
         * true: 重置標註類型
         * @relation Type_component.js
         * @type Boolean
         */
        annotation_type_reset_enable: false,
        
        /**
         * 註解最少字數
         * @type Number
         */
        //note_word_minimum_limit: 10,
        
        /**
         * 禁止字
         * @type Array<String>
         */
        //note_stop_words: ["fuck", ""]
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
        kals_context_disable: false,
        
        /**
         * 上傳快取資料
         * @type Boolean
         */
        //webpage_cache_save_enable: false,
        
        /**
         * 確認KALS_util.notify的時間
         * @type Boolean
         */
        notify_auto_hide: true,
        
        /**
         * 自動執行，測試使用的自動執行，請把要執行的function依序寫入auto_run中，以陣列組合
         * @author Pulipuli Chen 20141111
         * @type Array
         */
        auto_run: [
            /**
             * @author Pulipuli Chen 20141111
             * 測試搜尋最新標註用
             */
//            function () {
//                $.test_msg("點選最新標註");
//                $("td.item a.Window_search_recent:first").click();
//            }
            /**
             * @author Pulipuli Chen 20141116
             * 測試帳號資料按鈕用
             */
//            function () {
//                $.test_msg("測試帳號資料按鈕用");
//                $("td.item a.Window_search_recent:first").click();
//                setTimeout(function () {
//                    KALS_window.close();
//                    setTimeout(function () {
//                        $("td.item a.Filter:first").click();
//                    }, 1000);
//                }, 3000);
//            }
            /**
             * @author Pulipuli Chen 20141116
             * 測試自訂標註類型
             */
//            function () {
//                $.test_msg("測試自訂標註類型");
//                $(".search-form-init .dropdown.query-field").val("annotation_type");
//                $(".search-form-init .dropdown.annotation-type").val("custom");
//                $(".search-form-init .button.dialog-option.search-form-submit").click();
//            }
            /**
             * @author Pulipuli Chen 20151028
             * 測試縮小選單
             */
//            function () {
//                $(".navigation-list.profile-navgation .menu").click();
//            }
            /**
             * @author Pulipuli Chen 20151029
             * 測試開啟工具列的功能
             */
//            function () {
//                KALS_toolbar.open_navigation("Profile");
//            }
        ]
    },
    
    /**
     * 模組設定
     * @type {JSON}
     */
    "modules": {
        /**
         * 模組名稱: 模組設定內容
         * @type {JSON}
         */
        /**
         * 資訊區
         * @type {Object}
         */
        "Dashboard": {
            //"heading": "資訊區",    //視窗的名稱
            //"nav_heading": "資訊區",    //工具列上的名稱
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
                "display": true,

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
                "nav_type": "common",

                /**
                 * 排序順序
                 * 
                 * 數字越大，越往左邊靠
                 * 數字最小的是1
                 * @type Number
                 */
                "order": 1
            }
        },
        /**
         * 標註小地圖
         * @type {Object}
         */
        "Annotation_navigation_map": {
            //"heading": "標註地圖",    //視窗的名稱
            //"nav_heading": "標註地圖",    //工具列上的名稱
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
        "Frag_reading": {
            /**
             * 是否啟用模組
             * @type Boolean
             */
            "enable": true,
            "nav_config": {
                "display": false,
                "nav_type": "login",
                "order": 1
            },
            /**
             * 設定自動save_reading_progress的時間頻率
             * 單位：秒
             * 
             * 預設30秒
             * @type Number
             */
            //"interval_span": 5,
            /**
             * 頁面停止時延遲的增加時間
             * @type Number
             */
            //"increase_interval_span": 10
        },
        /**
         * 搜尋功能
         */
        "Window_search": {
            "enable": false
        },
        
        /**
         * 社會網路分析功能
         * @author 20150426 洪維均
         * 
         * 預設應該關掉
         */
        "Sna_counting": {
            "enable": false
        },
        
        /**
         * 推薦互動名單
         * @author 20150426 洪維均
         * 
         * 預設應該關掉
         */
        "Random_user": {
            "enable": false
        },
        
        /**
         * 章節地圖
         */
        "Window_map": {
            //"heading": "章節地圖",    //視窗的名稱
            //"nav_heading": "章節地圖",    //工具列上的名稱
            "enable": true
        },
        /**
         * 標註顯示
         */
        "Window_filter": {
            //"heading": "標註顯示",    //視窗的名稱
            //"nav_heading": "標註顯示",    //工具列上的名稱
            "enable": true
        },
        /**
         * 標註顯示
         */
        //Window_search: {
        //    "enable": true
        //},
        /**
         * 導讀功能
         * 
         * @version 20140625 因為不穩定，所以沒事不開啟
         */
        "Reading_guide": {
            "enable": false
        },
        /**
         * 回報功能
         */
        "Feedback_manager": {
            //"heading": "回報",    //視窗的名稱
            //"nav_heading": "回報",    //工具列上的名稱
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
        "KALS_stamp": {
            //"heading": "獎章",    //視窗的名稱
            //"nav_heading": "獎章",    //工具列上的名稱
            "enable": false,
            /**
             * 獎章資格設定
             */
			 
            //"stamps": [
                 /**
                 * 獎章稱號
                 * @types {String}
                 */
              /* {  // 第0階
                    "name": "soldier",
                    "is_qualified": true,
                    /**
                     * 如何獲得獎章的訊息
                     * @types {String}
                     */
               /*     "qualification_message": "你已經是士兵了",
                    /**
                     * 獲得獎章時候的通知(升級) 
                     * @types {String}
                     */
               /*     "quailfy_message": "恭喜你晉升為士兵！",
                    /**
                     * 取消獎章時候的通知(降級) 
                     * @types {String}
                     */
               /*     "disqualify_message": "你降級了喔~請多加油吧！",                    
                    /**
                     * 已經獲得獎章的訊息 
                     * @types {String}
                     */
               /*     "qualified_message": "您已經晉升為士兵了！",
                    /**
                     * 獎章資格
                     * @types {JSON}
                     */
               /*    "qualifier": {   
                        topic_annotation_count: {
                            "_total": {
                                count:0
                            }
                        }
                    }, //qualifier
                    /**
                     * 設定是否呈現名單
                     */
               /*     "set_list":false,
                    /**
                     * 設定是已通知過晉升
                     */
               /*     "is_notify":false,    
                    /**
                     * 權限設定
                     * @types {JSON}
                     */
               /*     "policy": {// 要寫出所有的設定條件
                        // 可以寫topic
                        "topic_writable": true,
                        // 可以看他人的topic
                        "other_topic_readable": false,
                        // 可以回應他人的topic
                        "other_topic_respondable": false,
                        // 可以看別人回自己topic的內容
                        "other_respond_readable": false,
                        // 可以使用喜愛功能
                        "like": false
                    }
                },//第0階over                
                /**
                 * 獎章稱號
                 * @types {String}
                 */
                /* {  // 第一階
                    "name": "knight",
                    "is_qualified": false,
                    /**
                     * 如何獲得獎章的訊息
                     * @types {String}
                     */
                    "qualification_message": "想要晉升騎士的話請試著標註2篇標註！",
                /*    /**
                     * 獲得獎章時候的通知 
                     * @types {String}
                     */
                /*    "quailfy_message": "恭喜你晉升為騎士！",
                    /**
                     * 取消獎章時候的通知(降級) 
                     * @types {String}
                     */
                /*    "disqualify_message": "你降級了喔~請多加油吧！",                     
                    /**
                     * 已經獲得獎章的訊息 
                     * @types {String}
                     */
                /*    "qualified_message": "您已經晉升為騎士了！",
                    /**
                     * 獎章資格
                     * @types {JSON}
                     */
                /*    "qualifier": {
                        // 表示topic必須重要1個
                        //topic_annotation_count: {
                        //    importance: {
                        //      count:1,
                        //      condition: ">"
                        //    }
                        //}
                        topic_annotation_count: {
                            "_total": {
                                count:2
                            }
                        }                      
                    }, //qualifier
                     /**
                     * 設定是否呈現名單
                     */
                /*    "set_list":false,
                    /**
                     * 設定是已通知過晉升
                     */
                /*    "is_notify":false,                       
                    /**
                     * 權限設定
                     * @types {JSON}
                     */
                /*    "policy": {
                        // 要寫出所有的設定條件
                        "topic_writable": true,
                        "other_topic_readable": true,
                        "other_topic_respondable": true,
                        "other_respond_readable": false,
                        "like": false
                    }
                }, // 第一階OVER
                {  // 第二階
                    "name": "bishop",
                    "is_qualified": false,
                    /**
                     * 如何獲得獎章的訊息
                     * @types {String}
                     */
                /*   "qualification_message": "想要達到主教的話請撰寫8篇標註，至少試著標註3篇【我知道】、2篇【我不懂】與回應3位同學喔！<hr><li>文章中或同學們的標註內容有沒有你知道的地方呢?請試著使用<font style='background-color:#37FF39'><b>標註類型-我知道</b></font>將你的意見說出來吧。</li><li>文章中或同學的意見有沒有讓你覺得疑惑的地方呢？請試著使用<font style='background-color:#FF8F19'><b>標註類型-我不懂</b></font>來向大家提問題吧。</li>",
                    /**
                     * 獲得獎章時候的通知 
                     * @types {String}
                     */
                /*    "quailfy_message": "恭喜你晉升為主教！",
                    /**
                     * 取消獎章時候的通知(降級) 
                     * @types {String}
                     */
                /*    "disqualify_message": "你降級了喔~請多加油吧！",                     
                    /**
                     * 已經獲得獎章的訊息 
                     * @types {String}
                     */
                /*    "qualified_message": "您已經晉升為主教了！",
                    /**
                     * 獎章資格
                     * @types {JSON}
                     */
                /*    "qualifier": {
                        topic_annotation_count: {
                            "_total":{
                              count:8 
                            },
                            "我知道": {
                              count:3
                            },
                             "我不懂": {
                              count:2
                            }                  
                        },
                        respond_to_user_count: {                  
                              count:2  
                        }
                       /*respond_annotation_count: {
                            "_respond_total":{
                              count:3 
                            }
                            "confusion": {
                              count:3
                            }  
                        }*/
                /*    },
                     /**
                     * 設定是否呈現名單
                     */
                /*    "set_list":false,
                    /**
                     * 設定是已通知過晉升
                     */
                /*    "is_notify":false,                       
                    /**
                     * 權限設定
                     * @types {JSON}
                     */
                /*    "policy": {
                        // 要寫出所有的設定條件
                        "topic_writable": true,
                        "other_topic_readable": true,
                        "other_topic_respondable": true,
                        "other_respond_readable": true,
                        "like": false                  
                    }
                }, // 第二階OVER
                {  // 第三階
                    "name": "castle",
                    "is_qualified": false,
                    /**
                     * 如何獲得獎章的訊息
                     * @types {String}
                     */
                /*    "qualification_message": "想要晉升城主的話請撰寫3篇【新知識】、3篇【補充舉例】，並試著回應6位同學的標註吧！<hr><li>文章中或同學的討論有沒有你第一次學到的知識呢？請試著使用<font style='background-color:#F7FA00'><b>標註類型-新知識</b></font>來說明吧。</li><li>對於文章內容或是同學的想法你有什麼想要額外補充資料或舉例的呢？請試著使用<font style='background-color:#F2F8F8'><b>標註類型-補充舉例</b></font>分享給同學吧。</li>",
                    /**
                     * 獲得獎章時候的通知 
                     * @types {String}
                     */
                /*    "quailfy_message": "恭喜你晉升為城主！",
                    /**
                     * 取消獎章時候的通知(降級) 
                     * @types {String}
                     */
                /*    "disqualify_message": "你降級了喔~請多加油吧！",                     
                    /**
                     * 已經獲得獎章的訊息 
                     * @types {String}
                     */
                /*    "qualified_message": "您已經晉升為城主了！",
                    /**
                     * 獎章資格
                     * @types {JSON}
                     */
                /*    "qualifier": {
                        topic_annotation_count: {
                            "新知識": {
                              count:3
                            },
                            "補充舉例": {
                              count:3
                            }                      
                        },
                        respond_to_user_count: {                  
                              count:6 
                        },
                        responded_user_count: {
                            count:2  
                        }
                    },
                    /**
                     * 設定是否呈現名單
                     */
                /*    "set_list":false,  
                    /**
                     * 設定是已通知過晉升
                     */
                /*    "is_notify":false,                       
                    /**
                     * 權限設定
                     * @types {JSON}
                     */
                /*    "policy": {
                        // 要寫出所有的設定條件
                        "topic_writable": true,
                        "other_topic_readable": true,
                        "other_topic_respondable": true,
                        "other_respond_readable": true,
                        "like": true           
                    }
                }, //第三階over
                {  // 第四階
                    "name": "king",
                    "is_qualified": false,
                    /**
                     * 如何獲得獎章的訊息
                     * @types {String}
                     */
                /*    "qualification_message": "想要成為國王的話請試著標註4篇【我想說】與2篇【很奇怪】，並多多回應與喜愛別人喔~<hr><li>對於文章或同學們的標註內容你有什麼想法呢？請試著使用<font style='background-color:#3799FF'><b>標註類型-我想說</b></font>將你的意見說出來吧。</li><li>文章中或同學的討論中有什麼讓你覺得奇怪的地方嗎？請試著使用<font style='background-color:#FF55FD'><b>標註類型-很奇怪</b></font>和同學們一起討論？</li><li>你同意同學們的說法嗎？覺得認同的話就大方地給他一個<font style='color:red'><b>愛心</b></font>吧！</li>",
                    /**
                     * 獲得獎章時候的通知 
                     * @types {String}
                     */
                /*    "quailfy_message": "恭喜你晉升為國王！",
                    /**
                     * 取消獎章時候的通知(降級) 
                     * @types {String}
                     */
                /*    "disqualify_message": "你降級了喔~請多加油吧！",                     
                    /**
                     * 已經獲得獎章的訊息 
                     * @types {String}
                     */
                /*    "qualified_message": "您已經晉升為國王了！",
                    /**
                     * 獎章資格
                     * @types {JSON}
                     */
                /*    "qualifier": {
                        topic_annotation_count: {
                            //count:3,
                           // "_total":{
                           //   count:20  
                           //},
                             "我想說": {
                              count:4
                            },
                            "很奇怪": {
                              count:2
                            }                     
                        },
                       // respond_annotation_count: {
                            //"_respond_total":{
                             // count:11  
                            //}
                        //},
                        respond_to_user_count: {                  
                              count:10
                        },
                        responded_user_count: {
                            count:3  
                        },
                        //liked_count:{
                       //     count:2
                        //},
                        like_to_users_count: {
                            count:6  
                        }, 
                        liked_users_count: {
                            count:3  
                        }, 
                    },
                    /**
                     * 設定是否呈現名單
                     */
                /*    "set_list":true,  
                    /**
                     * 設定是已通知過晉升
                     */
                /*    "is_notify":false,                       
                    /**
                     * 權限設定
                     * @types {JSON}
                     */
                /*    "policy": {   
                        "topic_writable": true,
                        "other_topic_readable": true,
                        "other_topic_respondable": true,
                        "other_respond_readable": true,
                        "like": true   
                    }
                } //第四階over
            ]*/
        },
        /**
         * 開啟行動版網頁
         * @type type
         */
        "Open_mobile_apps": {
            enable: true
        },
        /**
         * 最新標註
         */
        "Window_search_recent": {
            //"heading": "最新標註",    //視窗的名稱
            //"nav_heading": "最新標註",    //工具列上的名稱
            "enable": true
        },
        /**
         * 啟用檔案上傳功能
         * @version 20140902 Pulipuli Chen
         */
        "CKeditor_file_upload": {
            "enable": true,
            /**
             * 上傳的網址
             * @type String
             */
            "upload_url": "http://exp-php-file-host-2014.dlll.nccu.edu.tw/php-file-host/upload",
            /**
             * 取得檔案網址的網址
             * @type String
             */
            "get_link_url": "http://exp-php-file-host-2014.dlll.nccu.edu.tw/php-file-host/get_link"
        },
        /**
         * 說明的設定
         * @author Pudding 20151027
         */
        "Navigation_help": {
            //"nav_heading": "<i class='help circle icon'></i>",    //工具列上的名稱
            "enable": true,
            /**
             * KALS操作說明的網址
             * 
             * @type {string|null} help_base_url = 'help/' 網址
             *     也可以用http開頭的絕對網址，例如'http://www.google.com.tw/'
             */
            "help_base_url": 'help/',
        },
        /**
         * 回到指定頁面
         * @author Pudding 20151027
         */
        "Navigation_back": {
            //"nav_heading": "<i class='level up icon'></i>",    //工具列上的名稱
            /**
             * 是否啟用
             * 
             * 也可以改成 function () { return (top != window); }
             * 表示被嵌入在iframe的時候，不使用
             * 
             * @returns {Boolean}
             */
            "enable": true,
            /**
             * 回到上一層的網址
             * 
             * 可以用字串："https://github.com/pulipulichen/kals"
             * 、相對位置："../"
             * 、也可以用function來計算
             * 
             * @type String
             */
            "back_url": "../"
        },
        /**
         * 標註討論點
         * 
         * class="kals-annotation-spot" 成為標註討論點
         * class="kals-annotation-spot private" 成為標註討論點，並且只能看到自己的標註。但是加入admin_email_list的帳號不受到限制。
         * @author Pudding 20151102
         */
        "Annotation_spot": {
            "enable": true
        },
    }
};
/* End of file KALS_CONFIG */
/* Location: ./system/application/views/web_apps/KALS_CONFIG.js */