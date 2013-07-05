$(document).ready(function(){
  //block 1 is the default for an open
  $('#regions_elms_navigation_right .regions_1 .regions_block_content').css('display','block');
  //establish the default state for the nav which is closed
  $('#regions_elms_navigation_right .regions_pre_block_container').addClass('regions_toggle_closed');
  //when clicking the title, bring it to the front
  $('#regions_elms_navigation_right .regions_block_title').click(function(){
    //hide all block content
    $('#regions_elms_navigation_right .regions_block_content').css('display','none');
    //show this one
    $(this).parent().children('.regions_block_content').css('display','block');
    //only expand based on clicking block titles, never collapse
    if ($('#regions_elms_navigation_right .regions_pre_block_container').hasClass('regions_toggle_closed')) {
      $('#regions_elms_navigation_right .regions_pre_block_container').addClass('regions_toggle_open');
      $('#regions_elms_navigation_right .regions_pre_block_container').removeClass('regions_toggle_closed');
      $('#regions_elms_navigation_right').animate({right:'0'}, 'fast');
    }
  });
  //collapse based on toggle
  $('#regions_elms_navigation_right .regions_pre_block_container').click(function(){
    //additional logic is to account for menu being opened by clicking a block title
    if ($(this).hasClass('regions_toggle_closed')) {
      $(this).addClass('regions_toggle_open');
      $(this).removeClass('regions_toggle_closed');
      $('#regions_elms_navigation_right').animate({right:'0'}, 'fast');
    }
    else {
      $(this).addClass('regions_toggle_closed');
      $(this).removeClass('regions_toggle_open');
      $('#regions_elms_navigation_right').animate({right:'-30%'}, 'fast');
    }
  });
  //integration with node reference highlight
  $('.nrhi_body_item').click(function(){
    $('#'+ $(this).attr('name').replace('_body_item', '')).parent().click();
  });
});
