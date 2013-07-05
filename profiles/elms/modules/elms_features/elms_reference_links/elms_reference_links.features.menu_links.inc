<?php
/**
 * @file
 * elms_reference_links.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function elms_reference_links_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: menu-usermenu:my_related_links
  $menu_links['menu-usermenu:my_related_links'] = array(
    'menu_name' => 'menu-usermenu',
    'link_path' => 'my_related_links',
    'router_path' => 'my_related_links',
    'link_title' => 'My Related Links',
    'options' => array(
      'attributes' => array(
        'title' => 'All related links across your courses',
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
  t('My Related Links');


  return $menu_links;
}
