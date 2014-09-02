/**
 * 強制讓ajax可以cache
 * @version 20140902 Pulipuli Chen
 */
$.ajaxSetup({cache:true});

/**
 * 避免找不到這個功能
 * http://blog.xuite.net/vexed/tech/44905647-jQuery+1.6+.attr()+%E5%92%8C+.prop()
 * @version 20140902 Pulipuli Chen
 */
if(!$.prop) {
  $.fn.prop = $.fn.attr;
}

if(!$._on) {
  $.fn._on = $.fn.on;
}