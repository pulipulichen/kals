<?php
/**
 * Selection_manager Unit Test
 *
 * @package             KALS
 * @category		Webpage Application QUnit
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/20 上午 12:17:29
 */

$title = 'Selection_manager';
load_toolkit();
load_core();
@load_scripts('kals_text/Selection_manager', $load_raw);
?>
<script type="text/javascript">
QUNIT_TITLE = "<?= $title ?>";
QUNIT_ASSERT = 2;
$.lock_viewport();
$(function () {
    

test("Selection_manager", function() {
	
	$('body').css('background-color', 'gray');
    var selection_manager = new Selection_manager({
    	selector: '#text', 
    	on_initialize_complete: function () {
        	setTimeout(function () {
        		$('body').css('background-color', 'white');
        		test("Selection_manager", function() {
        		setTimeout(function() {
        			KALS_context.get_lang().load();
        		}, 3000);
        		});
        	}, 1000);
    	},
    	initialize: true
    });
    
    selection_manager.add_listener('select', function (_manager) {
    	//test('select event', function () {
        	_manager.add_class('red');
        	
        	var rs = _manager.get_recommend_scope();
        	for (var i in rs)
        	{
        		var f = rs[i][0];
        		var t = rs[i][1];
        		
        		$('#kals_word_' + f).addClass('recommend-scope');
        		$('#kals_word_' + t).addClass('recommend-scope');
        	}
        	
        	//alert('選取範圍為' + _manager.get_scope());
        	alert('選取範圍為' + _manager.get_scope() 
        		+ '\n推薦範圍為：' + _manager.get_recommend_scope()
        		+ '\n選取文字為：' + _manager.get_anchor_text()
        		+ '\n選取位置為：' + _manager.get_paragraph_location());
    	//});
    });
    
    selection_manager.add_listener('cancel_select', function (_manager) {
    	_manager.remove_class('red');
    	$('.recommend-scope').removeClass('recommend-scope');
    });

    //equals(true, true, '1');
    //equals(true, true, '2');
});

});
</script>
<style type="text/css">
/**
 * 您可以在此寫入CSS內容
 */
/*.kals-paragraph {background-color: yellow;}*/
/*.kals-word {color: red;};*/
.red {color:red}
.kals-word {cursor:pointer;}
.kals-word.selected {border: 1px solid green;
	background-color:yellow;;}

.kals-word.selected.from {border-right-width: 0 !important}
.kals-word.selected.middle {border-width: 1px 0 !important}
.kals-word.selected.to {border-left-width: 0 !important}
.kals-word.selected.from.to {border-width: 1px !important}

.location-head {color: #FF0000;}
.location-near-head {color: #990000;}
.location-foot {color: #0000FF;}
.location-near-foot {color: #000099;}
.recommend-scope {color:green !important;}
</style>

<div id="text">
 
<p>最近美國網路在流傳<a href="http://www.mentalfloss.com/blogs/archives/15131">一篇2008年即被人寫出來的文章</a>，這位文章的作者在網路上意外發現，有某一個人，從1979年起就使用「拍立得」(Polaroid)來<strong>「每天」拍一張相片</strong>，不一定是拍自己，也有拍其他景物的，但是他真的每天都拍下一張具當天代表性的照片，有時候也拍電視螢幕，秀出當天最重要的新聞。這位作者透過這些照片來「認識」這個天天拍照的奇人，看著這奇人這樣天天拍、天天拍到1997年（拍了近20年），最後，有一張照片是他躺在病床上，顯然剛剛動過腦瘤的手術，接下來他依然拍照，在他生命的最後，趕上時間「結婚」了。最後一張照片，發生在1997年10月24日，拍到病床旁邊看護的家人，還有他本人，嘴巴微張，躺在病床，臉上插滿了管。那是他的最後一張照片。後來，這位作者找到這些照片主人的身份，也知道了他是在10月25日，也就是在最後一張照片後一天去世，那天剛好是他四十一歲的生日，透過照片來述說這樣一個人生，真是淒美。</p>
<p><img src="http://mr6.cc/wp-content/uploads/2010/08/a13.jpg" /></p>
<?php  if (true) {?>   
<p>一天拍一張照片是一種「習慣」，<strong>「習慣」有「價」嗎</strong>？今日忙碌，摘錄一段在《非凡新聞周刊》的專欄文章（改寫過），再加上之前曾寫過的一篇「習慣行銷」的文章，說明一下：</p> 
<p>FourSquare推出「打卡機」，運用「全球定位系統」(GPS)，讓網友可以每到一個地方，就告訴每一個朋友「他在哪裡」。但，奇怪的是，FourSquare的規模<strong>至今似乎依然相當「小」</strong>，今年四月才剛剛破100萬會員，成長速度似乎「還好」？反倒是很多其他的小型服務，推出了類似FourSqaure的創意，奇怪的是，<strong>它們竟然都沒有用到「GPS」</strong>？</p> 
<p>換句話說，有一些其他的服務出來了，他們都學FourSquare的「打卡、拿勳章」的動作，卻不需要使用GPS！結果，照樣還是活得好好的！甚至使用者爆增！大家終於發現了一個事實，原來FourSquare好玩的重點並不是在「地點」，而是「打卡」。</p> 
<p>再說一次，重點<strong>不是在「地點」，而是「打卡」</strong>！</p> 
<p>那麼，難道有這種「不要地點」的「打卡」嗎？這要怎麼玩呢？</p> 
<p>上周有一間叫GetGlue的小公司，竟然取得了電影電視台HBO的長期合約，讓它大出風頭，GetGlue其實就是一個類似於FourSquare的打卡系統，不過它並沒有用到GPS，而是讓人們一邊看電視，<strong>一邊「打卡」告訴朋友，你在看什麼電視劇</strong>？看很多某種電視的人，就可以得到虛擬的「勳章」，網路上很多網友對這種「勳章」超喜歡的，為了收集完整勳章，他們就會刻意去看某些電視節目，以取得該勳章；倘若滯留在外無法回家看電視，最痛苦的不是錯過劇情，而是連續打卡好幾個月的「勳章」就這樣「斷掉了」！</p> 
<p>目前GetGlue快速成長，每個月已經有高達450萬人自動的一邊看電視而一邊打卡，成長速度似乎一點也不遜於FourSquare。而HBO電視台看上這一點，打算長期與GetGlue合作，讓它可以為HBO量身打造新的「勳章」，天天看哪些HBO的影集，就可以得到「勳章」。</p> 
<p>這是網路上的新的手法，我們稱為「習慣行銷」，這些勳章都是虛擬的，自己玩的時候，是沒有「價值」的，不過，一旦<strong>與一大群人開始「比一比」，它的價值很快就會被激盪出來</strong>。有趣的是，勳章只能吸引一些使用者，一開始，有些人只是為了勳章而來，不過，為了勳章而這樣天天「打卡」之後，久而久之，他們打開電視就會自然的先去「打卡」，如果沒有打卡，自己都會覺得今天好像「少做」了什麼事情！<br /> 
<span id="more-4909"></span><br /> 
之前寫過「習慣行銷」的威力，稱它甚至還可以拿來加強目前最流行的網路「社群行銷」──習慣行銷之下，儘管它在第一天，只能從「100人」知道變成「1000人」知道，但那1000個人之中，倘若明天有10%的人（也就是100人）會繼續「打卡」，那麼，扣除重覆的人之後，明天那100個人至少可以讓500人知道，如果後天也是同樣的10%的人、500人知道，就算我們的活動雖然只有人家的十分之一的強度，在重覆進行了18天以後（500 x 18 = 9000），也會有1萬個人知道了。也就是說，第一天不強，靠接下來18天來彌補，有些行銷的方法，是以大贈品引誘網友而來，但有些行銷方法卻不必花費大贈品，只要施一點小利，甚至只是「虛擬勳章」這類的東西，網友因為一點點原因，就「天天過來」；等到養成了「習慣」之後，這些網友就成了這個最好的傳聲筒了。 </p> 
<p>GetGlue紅起來之後，現在一些有線電視業者如Comcast也自行推出了一個叫做「TunerFish」的「天天打卡服務」，要觀眾一邊看電視，一邊告訴朋友們他正在看什麼？除了這些，另外還有幾間「沒裝GPS」的「打卡服務」，也非常被看好，譬如有一間叫做「Hot Potato」的，也是讓朋友告訴朋友他們正在做什麼？正在聽什麼音樂，看什麼書，到什麼地方吃飯？這間公司據說有可能被facebook併購入團隊，後者要的不是他們的產品，而是他們的「人」，由他們來幫facebook也開一個類似的系統。</p> 
<p>不只這樣，現在的Groupon式的集購、團購，也是在挑動每一個人的每天的「習慣」，我今天趁便宜買了一張餐廳券，享受了一次之後，明天我賣的東西<strong>已經不是「便宜」，而是你昨天那一次美好的體驗</strong>。</p> 
<p>等到下星期，我賣的東西甚至已經不是每一次的體驗，而是<strong>你常常去享受一次美好體驗的「習慣」</strong>！</p> 
<p>所以，最後這間公司所賣的，其實是<strong>消費者自己的回憶、自己的習慣</strong>。你説這是「制約」？不，應該說，廠商的存在，讓消費者更快樂，多了一個「快樂的習慣」，而廠商被付錢，來繼續幫忙幫助客戶維持這個「好習慣」，天天快樂！</p> 
<p>但，不是每一個產業都可以建立這樣的習慣，不過，有一種關於「習慣」的收費模式卻真的是所有公司應該去好好思考的。<strong>這種模式稱為「訂閱制」(subscription model)</strong>。並不是每一種習慣行銷都要扯上「訂閱制」，也不是每一種「訂閱制」的獲利模式都和習慣有關，但「訂閱制」的成功，有時候和「創造一個新習慣」有關係，這是許多網路公司值得思索去創造的新路。</p> 
<p>「訂閱制」可能是目前網路上大家最喜歡的機制，也是目前所有公司「跳出接案」的最佳捷徑之一，包括我們公司在裡面。我們一直在嘗試著不一樣的服務，最後找到了幾個客戶需要的服務，我們努力完成任務，但，我們一邊服務現在的客戶，一邊也趁有時間的時候就默默在找尋新的商業模式，而我們一直在追尋的，就是某一種「訂閱制」。</p> 
<p>訂閱制，在有需求之下是容易OK成交的，比如說，訂閱「線上音樂」，你每天搭公車就有音樂可聽，停了就沒了，所以我願意付月費去聽線上的音樂！另外，比如說是「徵才」，我天天都在找四～五個新職位，停了就沒了，所以我就一定要「訂閱」才能繼續刊登這些職位。</p> 
<p>但，如果是沒有「需求」的情況下，要你的客戶去「訂閱」的難度，<strong>遠遠比要客戶「一次衝動買下」的難度，要難上一百倍</strong>！但，它卻是我們認為未來的模式，所以我們以我們公司開始，尋求這樣的模式，直到成功；我們就算再怎麼賺錢，也要全部投回去試圖建立一個「訂閱」的網路新模式，或許，到時候可以將成功經驗分享給所有的網路創業家。</p> 
<p>大家可以來想想，有人可以一天拍一張照片直到死去，那麼，你的產品夠好，也可以讓人一個月付ｎ元，付到死去！</p>

<?php } ?>
</div>
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
<?php
/* End of file Selection_manager.php */
/* Location: ./system/application/views/qunit/core/Selection_manager.php */