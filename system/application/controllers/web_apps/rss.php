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
     * 重新首頁
     * @version 20140423 Pulipuli Chen
     * @param type $webpage_id
     * @return type
     */
    public function index($webpage_id = NULL) {
        return $this->webpage($webpage_id);
    }
     
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
        $this->load->library('kals_resource/Annotation');
        $this->load->library('search/Search_annotation_collection');
        $this->lang->load('kals_web_apps'); //語系
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

        $webpage_title = $webpage->get_title();
        
        
        $channel = new Channel();
        $channel
            ->title($webpage_title)
            ->description("Channel Description")
            ->url('http://140.119.61.137/kals/mobile/annotation_topics/'.$webpage_id)
            ->appendTo($feed);

        foreach ($search AS $annotation) {
            $item = new Item();
            $type_name = $annotation->get_type()->get_name();
            $type_show ; 
           if ($type_name != 'annotation.type.custom'){  //自定標註顯示
               $type_show = $this->lang->line("web_apps.". $type_name);
           }
           else  {
               $type_show = $annotation->get_type()->get_name();
           }
            
           // anchor text
           // user name
           // date
           // annotation type
           // note
            $annotation_id = $annotation->get_id();            
            if (isset($annotation_id)){
                $topic_array = $this->db->query("SELECT topic_id
                                                 FROM annotation
                                                 WHERE annotation_id ='".$annotation_id."'");     
            }
            foreach ($topic_array->result_array() as $row){
                      $topic_id = $row['topic_id'];
            } 
            
            
            $item
                ->title("<div><span>[" . $type_show . "]</span> " . $annotation->get_anchor_text() ." </div>"
                        ) //title標題 ->[type] annotation anchor text  // $annotation->get_type()->get_name()
                ->description("<div>KALS user [" . $annotation->get_user()->get_name() . "] </div>
                               <div>" . $annotation->get_note() ." </div>                     
                              ") //user +annotation note
                //->url( base_url()."mobile/annotation_topics/".$webpage_id) // webpage_url->view
                ->url('http://140.119.61.137/kals/mobile/annotation_thread/'.$topic_id.'#annotation_'.$annotation_id) // webpage_url->view   
                ->appendTo($channel);
        }    

        echo $feed;
    }
}

/* End of file rss.php */
/* Location: ./system/application/controllers/web_apps/rest/rss.php */