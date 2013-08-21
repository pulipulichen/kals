<?php
/**
 * @file
 * elms_navigation_top.features.menu_custom.inc
 */

/**
 * Implements hook_menu_default_menu_custom().
 */
function elms_navigation_top_menu_default_menu_custom() {
  $menus = array();

  // Exported menu: menu-usermenu
  $menus['menu-usermenu'] = array(
    'menu_name' => 'menu-usermenu',
    'title' => 'User Menu',
    'description' => 'Use this to store user profile / global links',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Use this to store user profile / global links');
  t('User Menu');


  return $menus;
}
