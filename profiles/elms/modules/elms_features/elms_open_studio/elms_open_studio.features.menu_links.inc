<?php
/**
 * @file
 * elms_open_studio.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function elms_open_studio_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: features:node/add
  $menu_links['features:node/add'] = array(
    'menu_name' => 'features',
    'link_path' => 'node/add',
    'router_path' => 'node/add',
    'link_title' => 'Add post / media',
    'options' => array(
      'attributes' => array(
        'title' => 'Add content',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '-47',
  );
  // Exported menu link: features:node/add/exhibit
  $menu_links['features:node/add/exhibit'] = array(
    'menu_name' => 'features',
    'link_path' => 'node/add/exhibit',
    'router_path' => 'node/add/exhibit',
    'link_title' => 'Create Exhibit',
    'options' => array(
      'attributes' => array(
        'title' => 'Create an exhibit to showcase your work',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '-48',
  );
  // Exported menu link: features:open_studio
  $menu_links['features:open_studio'] = array(
    'menu_name' => 'features',
    'link_path' => 'open_studio',
    'router_path' => 'open_studio',
    'link_title' => 'Studio Gallery',
    'options' => array(),
    'module' => 'system',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '-50',
  );
  // Exported menu link: features:open_studio/my
  $menu_links['features:open_studio/my'] = array(
    'menu_name' => 'features',
    'link_path' => 'open_studio/my',
    'router_path' => 'open_studio/my',
    'link_title' => 'My Gallery',
    'options' => array(
      'attributes' => array(
        'title' => 'A listing of all your exhibits for the studio',
      ),
    ),
    'module' => 'system',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '0',
  );
  // Exported menu link: menu-usermenu:my_studio
  $menu_links['menu-usermenu:my_studio'] = array(
    'menu_name' => 'menu-usermenu',
    'link_path' => 'my_studio',
    'router_path' => 'my_studio',
    'link_title' => 'My Exhibits',
    'options' => array(),
    'module' => 'system',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '0',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Add post / media');
  t('Create Exhibit');
  t('My Exhibits');
  t('My Gallery');
  t('Studio Gallery');


  return $menu_links;
}
