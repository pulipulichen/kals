// JavaScript Document
$(document).ready(function(){
  //define progress bar based on checkbox
  $( "#progressbar" ).progressbar({
    value: 0
  });
  Drupal.set_progressbar();
  //toggle the collapse / expand button
  $('.container_close').toggle(function(){
    $(this).parent().find('.schedule_row').slideUp('fast', function(){$(this).parent().addClass('schedule_container_closed');});
    $(this).addClass('container_closed');
  },function(){
    $(this).removeClass('container_closed');
    $(this).parent().removeClass('schedule_container_closed');
    $(this).parent().find('.schedule_row').slideDown('fast');
  });
  //set checkboxes / handle them with the click and route it to the flag setting
  $('.schedule_checkbox').each(function(){
    if ($(this).parent().find('.schedule_flag a').html() == 'complete') {
      $(this).click();
      $('.'+ $(this).attr('id') +'_row').addClass('schedule_crossoff');
      Drupal.set_progressbar();
    }
  });
  //if this is an organizing unit collapse it
  $('.schedule_heading .schedule_checkbox').each(function(){
    if ($(this).parent().find('.schedule_flag a').html() == 'complete') {
      $(this).parent().parent().parent().parent().parent().find('.container_close:not(.container_closed)').click() ;
    }
  });
  //if this is an organizing unit collapse it
  $(this).parent().parent().parent().parent().parent().find('.container_close:not(.container_closed)').click();
  //on click of a heading, collapse
  $('.schedule_heading .schedule_checkbox').click(function(){
    if ($(this).parent().find('.schedule_flag a').html() == 'incomplete') {
      $(this).parent().parent().parent().parent().parent().find('.container_close:not(.container_closed)').click();
      //if we click that a week is done, click everything done below it
      $(this).parent().parent().parent().parent().parent().find('.schedule_row .schedule_checkbox').each(function(){
        if ($(this).parent().find('.schedule_flag a').html() == 'incomplete') {
          $(this).click();
          $('.'+ $(this).attr('id') +'_row').addClass('schedule_crossoff');
        }
      });
    }
    Drupal.set_progressbar();
  });
  $('.schedule_checkbox').click(function(){
    $(this).parent().find('.schedule_flag a').click();
    if ($(this).parent().find('.schedule_flag a').html() == 'incomplete') {
      //marked as complete, grey it out
      $('.'+ $(this).attr('id') +'_row').addClass('schedule_crossoff');
    }
    else {
      //marked as incomplete, ungrey
      $('.'+ $(this).attr('id') +'_row').removeClass('schedule_crossoff');
    }
    Drupal.set_progressbar();
  });
  //stick the progressbar as the user scrolls
  var elTop = $('#progressbar_container').offset().top+10;
  var sticky_width = $('#progressbar_container').width();
  $(window).scroll(function() {
    var windowTop = $(window).scrollTop();
    if (windowTop > elTop) {
      $('#progressbar_container').addClass('sticky');
      $('#progressbar_container').width(sticky_width);
    }
    else {
      $('#progressbar_container').removeClass('sticky');
    }
  });
});
//set the progressbar percentage
Drupal.set_progressbar = function() {
  var msg = '';
  var progressbar = Math.round(($(".schedule_checkbox:checked").size() / $(".schedule_checkbox").size()) * 100);
  $( "#progressbar" ).progressbar( "option", "value", progressbar );  
  if (progressbar == 0) {
    msg = '0% Complete';
  }
  else if(progressbar == 100) {
    msg = 'Course Completed!';
  }
  else {
    msg = progressbar +'% Complete';
  }
  $("#progressbar_container .percent_complete").html(msg);
};