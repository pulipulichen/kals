<?php
/**
 * @file
 * elms_polls.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function elms_polls_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: features:polls
  $menu_links['features:polls'] = array(
    'menu_name' => 'features',
    'link_path' => 'polls',
    'router_path' => 'polls',
    'link_title' => 'Polls',
    'options' => array(
      'attributes' => array(
        'title' => 'List of all Course Polls',
      ),
    ),
    'module' => 'system',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '0',
  );
  // Exported menu link: menu-usermenu:my_polls
  $menu_links['menu-usermenu:my_polls'] = array(
    'menu_name' => 'menu-usermenu',
    'link_path' => 'my_polls',
    'router_path' => 'my_polls',
    'link_title' => 'My Polls',
    'options' => array(
      'attributes' => array(
        'title' => 'All polls across your courses',
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
  t('My Polls');
  t('Polls');


  return $menu_links;
}
