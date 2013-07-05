<?php

/**
 * Implementation of hook_menu_default_menu_links().
 */
function elms_studio_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: features:studio
  $menu_links['features:studio'] = array(
    'menu_name' => 'features',
    'link_path' => 'studio',
    'router_path' => 'studio',
    'link_title' => 'Studio',
    'options' => array(
      'attributes' => array(
        'title' => 'Course studio',
      ),
    ),
    'module' => 'system',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '1',
    'expanded' => '0',
    'weight' => '3',
  );
  // Exported menu link: features:studio/my
  $menu_links['features:studio/my'] = array(
    'menu_name' => 'features',
    'link_path' => 'studio/my',
    'router_path' => 'studio/my',
    'link_title' => 'My Submissions',
    'options' => array(
      'attributes' => array(
        'title' => 'My Studio Submissions',
      ),
    ),
    'module' => 'system',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '1',
    'parent_path' => 'studio',
  );
  // Exported menu link: features:studio/view
  $menu_links['features:studio/view'] = array(
    'menu_name' => 'features',
    'link_path' => 'studio/view',
    'router_path' => 'studio/view',
    'link_title' => 'View Studio',
    'options' => array(
      'attributes' => array(
        'title' => 'View all Studio Submissions',
      ),
    ),
    'module' => 'system',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '0',
    'parent_path' => 'studio',
  );
  // Exported menu link: menu-studio:node/add/studio-submission
  $menu_links['menu-studio:node/add/studio-submission'] = array(
    'menu_name' => 'menu-studio',
    'link_path' => 'node/add/studio-submission',
    'router_path' => 'node/add/studio-submission',
    'link_title' => 'Create Submission',
    'options' => array(
      'attributes' => array(
        'title' => 'Create Studio Submission',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '-48',
  );
  // Exported menu link: menu-studio:studio/my
  $menu_links['menu-studio:studio/my'] = array(
    'menu_name' => 'menu-studio',
    'link_path' => 'studio/my',
    'router_path' => 'studio/my',
    'link_title' => 'My Studio',
    'options' => array(
      'attributes' => array(
        'title' => 'My Studio Submissions',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '-49',
  );
  // Exported menu link: menu-studio:studio/view
  $menu_links['menu-studio:studio/view'] = array(
    'menu_name' => 'menu-studio',
    'link_path' => 'studio/view',
    'router_path' => 'studio/view',
    'link_title' => 'View Studio',
    'options' => array(
      'attributes' => array(
        'title' => 'View all Studio Submissions',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '-50',
  );
  // Exported menu link: menu-usermenu:my_studio
  $menu_links['menu-usermenu:my_studio'] = array(
    'menu_name' => 'menu-usermenu',
    'link_path' => 'my_studio',
    'router_path' => 'my_studio',
    'link_title' => 'My Studio',
    'options' => array(
      'attributes' => array(
        'title' => 'All my studio submissions',
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
  t('Create Submission');
  t('My Studio');
  t('My Submissions');
  t('Studio');
  t('View Studio');


  return $menu_links;
}
