<?php
/**
 * @file
 * elms_terms.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function elms_terms_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: features:elms_terms
  $menu_links['features:elms_terms'] = array(
    'menu_name' => 'features',
    'link_path' => 'elms_terms',
    'router_path' => 'elms_terms',
    'link_title' => 'Glossary',
    'options' => array(
      'attributes' => array(
        'title' => 'Course Glossary',
      ),
    ),
    'module' => 'system',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '0',
  );
  // Exported menu link: menu-usermenu:my_terms
  $menu_links['menu-usermenu:my_terms'] = array(
    'menu_name' => 'menu-usermenu',
    'link_path' => 'my_terms',
    'router_path' => 'my_terms',
    'link_title' => 'My Terms',
    'options' => array(
      'attributes' => array(
        'title' => 'All terms across your courses',
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
  t('Glossary');
  t('My Terms');


  return $menu_links;
}
