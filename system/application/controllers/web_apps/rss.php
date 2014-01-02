<?php
include_once 'web_apps_controller.php';
/**
 * rss
 *
 * KALS Framework範例：Model的設定
 * 輸出網頁標註資訊的位置
 * 
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright		Copyright (c) 2013, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link                https://github.com/pulipulichen/kals/
 * @version		1.0 2013/11/19 下午 03:51:22
 */
class rss extends Web_apps_controller {

     
    /**
     * 讀取RSS
     * 
     * 範例：http://localhost/kals/web_apps/rss/webpage/1573
     */
    public function webpage($webpage_id = NULL) {
        if (is_null($webpage_id)) {
            $webpage = get_context_webpage();
            $webpage_id = $webpage->get_id();
            redirect("/web_apps/rss/webpage/".$webpage_id);
            return;
        }
        
        $this->load->library('kals_resource/Webpage');
        $this->load->library('search/Search_annotation_collection');
        //echo $webpage_id;
        $webpage = new Webpage($webpage_id);
        
        //$search = $webpage->get_search_annotation();
        $search = new Search_annotation_collection();
        
        $search->set_target_webpage($webpage_id);
        $search->set_limit(10);
        
        $order_type_id = 6;
        $desc = TRUE;
        $search->add_order($order_type_id, $desc);
        
        
        // ------------------------------
        // 以下開始建立RSS清單
        // 
        // 請使用php-rss-writer來建立
        // 
        // 專案首頁：https://github.com/suin/php-rss-writer
        // 程式碼位置：https://github.com/suin/php-rss-writer/tree/master/Source/Suin/RSSWriter
        // ------------------------------
        
        $this->load->library("web_apps/Suin/RSSWriter/Feed");
        $this->load->library("web_apps/Suin/RSSWriter/Channel");
        $this->load->library("web_apps/Suin/RSSWriter/Item");
        
        $feed = new Feed();

        $channel = new Channel();
        $channel
            ->title("Channel Title")
            ->description("Channel Description")
            ->url('http://blog.example.com')
            ->appendTo($feed);

        foreach ($search AS $annotation) {
            $item = new Item();
            $item
                ->title("Blog Entry Title")
                ->description("<div>Blog body" . $annotation->get_id() . " </div>")
                ->url('http://blog.example.com/2012/08/21/blog-entry/')
                ->appendTo($channel);
        }    

        echo $feed;
    }
}

/* End of file rss.php */
/* Location: ./system/application/controllers/web_apps/rest/rss.php */