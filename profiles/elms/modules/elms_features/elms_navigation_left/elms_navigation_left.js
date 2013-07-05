$(document).ready(function(){
  // establish the default state for the nav which is closed
  $('#regions_elms_navigation_left .regions_pre_block_container').addClass('regions_toggle_closed').attr('title', 'Open Menu');
  $('#regions_elms_navigation_left .regions_block_title').each(function(){
    $(this).attr('title', $(this).html());
  });
  // when clicking the title / collapse/expand, bring it all to the front
  $('#regions_elms_navigation_left .regions_pre_block_container, #regions_elms_navigation_left .regions_block_title, #regions_elms_navigation_left .click_handler').click(function(){
    // open this region if clicked on a tab, close if you do
    if ($('#regions_elms_navigation_left .regions_pre_block_container').hasClass('regions_toggle_closed')) {
      $('#regions_elms_navigation_left .regions_pre_block_container').addClass('regions_toggle_open').attr('title', 'Close Menu');
      $('#regions_elms_navigation_left .regions_pre_block_container').removeClass('regions_toggle_closed');
      $('#regions_elms_navigation_left').animate({left:'0'}, 'fast');
    }
    else {
      $('#regions_elms_navigation_left .regions_pre_block_container').addClass('regions_toggle_closed').attr('title', 'Open Menu');
      $('#regions_elms_navigation_left .regions_pre_block_container').removeClass('regions_toggle_open');
      $('#regions_elms_navigation_left').animate({left:'-182'}, 'fast');
    }
  });
  // focus / select the masquerade text field if you click to open it
  $('#regions_elms_navigation_left .click_handler').click(function(){
  $('#regions_elms_navigation_left #edit-masquerade-user-field').focus().select();
  });
});