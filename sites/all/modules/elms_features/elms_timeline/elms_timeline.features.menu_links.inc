<?php
/**
 * @file
 * elms_timeline.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function elms_timeline_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: features:timeline
  $menu_links['features:timeline'] = array(
    'menu_name' => 'features',
    'link_path' => 'timeline',
    'router_path' => 'timeline',
    'link_title' => 'Timeline',
    'options' => array(
      'attributes' => array(
        'title' => 'List of all Course Timeline items',
      ),
    ),
    'module' => 'system',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '0',
  );
  // Exported menu link: menu-usermenu:my_timelines
  $menu_links['menu-usermenu:my_timelines'] = array(
    'menu_name' => 'menu-usermenu',
    'link_path' => 'my_timelines',
    'router_path' => 'my_timelines',
    'link_title' => 'My Timelines',
    'options' => array(
      'attributes' => array(
        'title' => 'All timlines across your courses',
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
  t('My Timelines');
  t('Timeline');


  return $menu_links;
}
