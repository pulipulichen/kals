$(document).ready(function(){
  //scaling capabilities
  $('#regions_block_elms_navigation_bottom_0 .elms_zoom_in').click(function(){
    if (Drupal.settings.elms_navigation_bottom.factor <= 1.5) {
      Drupal.settings.elms_navigation_bottom.factor = Drupal.settings.elms_navigation_bottom.factor + 0.1;
      $('body').css('zoom', Drupal.settings.elms_navigation_bottom.factor).css('-moz-transform', 'scale('+ Drupal.settings.elms_navigation_bottom.factor +')');
    }
  });
  $('#regions_block_elms_navigation_bottom_0 .elms_zoom_out').click(function(){
    if (Drupal.settings.elms_navigation_bottom.factor >= 0.9) {
      Drupal.settings.elms_navigation_bottom.factor = Drupal.settings.elms_navigation_bottom.factor - 0.1;
      $('body').css('zoom', Drupal.settings.elms_navigation_bottom.factor).css('-moz-transform', 'scale('+ Drupal.settings.elms_navigation_bottom.factor +')');
    }
  });
  $('#regions_block_elms_navigation_bottom_0 .elms_zoom_reset').click(function(){
      Drupal.settings.elms_navigation_bottom.factor = 1;
      $('body').css('zoom', Drupal.settings.elms_navigation_bottom.factor).css('-moz-transform', 'scale('+ Drupal.settings.elms_navigation_bottom.factor +')');
  });
});