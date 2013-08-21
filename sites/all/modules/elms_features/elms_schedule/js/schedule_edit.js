// JavaScript Document
$(document).ready(function(){
  //trigger for the edit link since its a complex version of clicktoedit
  $('.schedule_edit_link').click(function(){
  //need additional logic for which form field we're editing
    $(this).find('.clicktoedit').click();
  });
  //toggle the collapse / expand button
  $('.container_close').toggle(function(){
  $(this).parent().find('.schedule_row').slideUp('fast', function(){$(this).parent().addClass('schedule_container_closed');});
    $(this).addClass('container_closed');
  },function(){
    $(this).removeClass('container_closed');
    $(this).parent().removeClass('schedule_container_closed');
    $(this).parent().find('.schedule_row').slideDown('fast');
  });
  //hide / show the edit event button
  $(".views-row").hover(function(){
    $(this).find('.clicktoedit').addClass('row-hover');
    $(this).find('.schedule_edit_event').css('visibility','visible');
    $(this).find('.schedule_edit_link').css('visibility','visible');
  },function(){
    $(this).find('.clicktoedit').removeClass('row-hover');
    $(this).find('.schedule_edit_event').css('visibility','hidden');
    $(this).find('.schedule_edit_link').css('visibility','hidden');
  });
  //show the field which is typically hidden in our use case when clicked
  $('.schedule_edit_field').live('click',function(){
    $(this).prev('.form-text').css('display','block');
  });
  //set checkboxes / handle them with the click and route it to the flag setting
  $('.schedule_checkbox').each(function(){
    if ($(this).parent().find('.schedule_flag a').html() == 'complete') {
      $(this).click();
      $('.'+ $(this).attr('id') +'_row').addClass('schedule_crossoff');
      //if this is an organizing unit collapse it
      $(this).parent().parent().parent().parent().parent().find('.container_close:not(.container_closed)').click();
    }
  });
  //trigger change event for color picker
  $('.schedule_edit_color').click(function(){
  $(this).find('.clicktoedit').click();
  });
  
  $('.schedule_checkbox').click(function(){
    $(this).parent().find('.schedule_flag a').click();
    if ($(this).parent().find('.schedule_flag a').html() == 'incomplete') {
      //marked as complete, grey it out
      $('.'+ $(this).attr('id') +'_row').addClass('schedule_crossoff');
      //if this is an organizing unit collapse it
      $(this).parent().parent().parent().parent().parent().find('.container_close:not(.container_closed)').click();
    }
    else {
      //marked as incomplete, ungrey
      $('.'+ $(this).attr('id') +'_row').removeClass('schedule_crossoff');
    }
  });

});
//fix glitch where a link loads in something that needs to be clicked on
Drupal.behaviors.elms_schedule = function(context) {
  /*$('.schedule_title a').each(function(){
    $(this).attr('href','#'+$(this).children().attr('nid'));
    $(this).attr('name',$(this).children().attr('nid'));
    $(this).attr('target','');
  });*/
  $('.colorpicker').each(function(){
   $(this).css('backgroundColor',$(this).html());
  });
  //update date value visually
  $('#edit-field-end-date-0-value-datepicker-popup-0').change(function(){
  $(this).parent().parent().parent().parent().parent().parent().parent().find('.schedule_spacer').html('-');
  });
  //allows for update of the image on the fly
  $('#edit-field-event-type-value').change(function(){
  var icon = $(this).val();
  //use case where they unset the icon
  if (icon == '') {
    icon = 'blank';
  }
  var imgobj = $(this).parent().parent().parent().parent().parent().parent().find('img.schedule_event_type');
    var current = imgobj.attr('title');
  imgobj.attr('src',imgobj.attr('src').replace(current +'.png', icon +'.png'));
  imgobj.attr('title', icon);
  imgobj.attr('alt', icon);
  });
  //ugly but updates the background color automatically
  $('#edit-field-color-0-value').change(function(){
    $(this).parent().parent().parent().parent().parent().parent().find('.schedule_task').css('backgroundColor',$(this).val());
  });
  
}