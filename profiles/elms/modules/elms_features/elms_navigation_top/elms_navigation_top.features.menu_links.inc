<?php
/**
 * @file
 * elms_navigation_top.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function elms_navigation_top_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: menu-usermenu:bookmarks
  $menu_links['menu-usermenu:bookmarks'] = array(
    'menu_name' => 'menu-usermenu',
    'link_path' => 'bookmarks',
    'router_path' => 'bookmarks',
    'link_title' => 'My Bookmarks',
    'options' => array(
      'purl' => 'disabled',
      'attributes' => array(
        'title' => 'My Bookmarks',
        'class' => 'menu-16504',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '-47',
  );
  // Exported menu link: menu-usermenu:user
  $menu_links['menu-usermenu:user'] = array(
    'menu_name' => 'menu-usermenu',
    'link_path' => 'user',
    'router_path' => 'user',
    'link_title' => 'My Profile',
    'options' => array(
      'purl' => 'disabled',
      'attributes' => array(
        'title' => 'Your User profile',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '-50',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('My Bookmarks');
  t('My Profile');


  return $menu_links;
}
