$(document).ready(function(){
  //allow user menu to slide into focus
  $('#regions_block_elms_navigation_top_2 .regions_block_title').click(function(){
    $('#regions_block_elms_navigation_top_2 .regions_block_content').slideToggle('fast', 'linear');
  });
  $('#regions_block_elms_navigation_top_1 .regions_block_title').click(function(){
    $('#regions_block_elms_navigation_top_1 .regions_block_content').slideToggle('fast', 'linear');
    //class to retain the hover state
    if ($(this).hasClass('elms_nav_top_open')) {
      $(this).removeClass('elms_nav_top_open');
    }
    else {
      $(this).addClass('elms_nav_top_open');
    }
  });
  
  //extend the drupal js object by adding in an elms_navigation name-space
  Drupal.elms_navigation = Drupal.elms_navigation || { functions: {} };
  //allow for adding messages after page load
  Drupal.elms_navigation.add_message = function (type, message) {
  try {
    if (Drupal.settings.elms_helpdesk.icon_map) {
      var map = Drupal.settings.elms_helpdesk.icon_map;
    }
  }
  catch(e) {
     var map = '';
  }
  //make sure this isn't a parent'ed item
  var map_title, map_bar_icon, title_type;
  if (typeof map[type]['parent'] != 'undefined') {
    map_title = map[map[type]['parent']]['title'];
    map_bar_icon = map[map[type]['parent']]['bar_icon'];
    title_type = map[type]['parent'];
  }
  else {
    map_title = map[type]['title'];
    map_bar_icon = map[type]['bar_icon'];
    title_type = type;
  }
  //add to the title container or increment a count
  if ($('#regions_block_elms_navigation_top_1 .regions_block_title .'+ title_type).length == 0) {
    var title = '<a name="notification" title="'+ title_type +', click for more details"><div class="elms_nav_top_msg_bar_icon '+ title_type +'" style="background-image:url('+ map_bar_icon +')" title="'+ map_title +', click for more details" alt="'+ map_title +', click for more details"><div class="elms_nav_top_msg_bar_icon_count"></div></div></a>';
    $('#regions_block_elms_navigation_top_1 .regions_block_title').append(title);
    Drupal.settings.elms_navigation_top.msg_count[title_type] = 1;
  }
  else {
    Drupal.settings.elms_navigation_top.msg_count[title_type]++;
    $('#regions_block_elms_navigation_top_1 .regions_block_title .'+ title_type + ' .elms_nav_top_msg_bar_icon_count').html(Drupal.settings.elms_navigation_top.msg_count[title_type]);
  }
  //add to the content container
  var content = '<div class="elms_nav_top_row"><img src="'+ map[type]['icon'] +'" title="'+ map[type]['title'] +', click for more details" alt="'+ map[type]['title'] +', click for more details" class="elms_nav_top_icon"/><div class="elms_nav_top_msg"><div class="elms_nav_top_msg_title">'+ map[type]['title'] +'</div><div class="elms_nav_top_msg_text">'+ message +'</div></div></div>';
  $('#regions_block_elms_navigation_top_1 .regions_block_content').append(content);
  };
});