(function ($) {
  $(document).ready(function(){
  //establish the default state for the nav which is closed
    $('#regions_admin_left .regions_pre_block_container') .addClass('regions_toggle_closed');
    //when clicking the title, bring it to the front
    $('#regions_admin_left .regions_pre_block_container').click(function(){
      if ($(this).hasClass('regions_toggle_closed')) {
        $(this).addClass('regions_toggle_open');
        $(this).removeClass('regions_toggle_closed');
        $('#regions_admin_left').animate({left:'0'}, 'fast');
      }
      else {
        $(this).addClass('regions_toggle_closed');
        $(this).removeClass('regions_toggle_open');
        $('#regions_admin_left').animate({left:'-200px'}, 'fast');
      }
    });
    // add click handler for any link inside here
    $('#regions_admin_left .regions_block_container a').click(function(){
      $('#regions_admin_left .regions_pre_block_container').click();
    });
  });
})(jQuery);