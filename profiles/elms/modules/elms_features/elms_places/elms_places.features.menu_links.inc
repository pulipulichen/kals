<?php
/**
 * @file
 * elms_places.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function elms_places_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: features:places
  $menu_links['features:places'] = array(
    'menu_name' => 'features',
    'link_path' => 'places',
    'router_path' => 'places',
    'link_title' => 'Places',
    'options' => array(
      'attributes' => array(
        'title' => 'List of all Course Places',
      ),
    ),
    'module' => 'system',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '0',
  );
  // Exported menu link: menu-usermenu:my_places
  $menu_links['menu-usermenu:my_places'] = array(
    'menu_name' => 'menu-usermenu',
    'link_path' => 'my_places',
    'router_path' => 'my_places',
    'link_title' => 'My Places',
    'options' => array(
      'attributes' => array(
        'title' => 'All places across your courses',
      ),
    ),
    'module' => 'system',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '0',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('My Places');
  t('Places');


  return $menu_links;
}
