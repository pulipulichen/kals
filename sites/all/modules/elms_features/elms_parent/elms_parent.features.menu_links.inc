<?php

/**
 * Implements hook_menu_default_menu_links().
 */
function elms_parent_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: admin:admin/content/taxonomy/1
  $menu_links['admin:admin/content/taxonomy/1'] = array(
    'menu_name' => 'admin',
    'link_path' => 'admin/structure/taxonomy/1',
    'router_path' => 'admin/structure/taxonomy/%',
    'link_title' => 'Department list',
    'options' => array(
      'purl' => 'disabled',
      'attributes' => array(
        'title' => 'Edit the departments listed in elms',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '-48',
    'parent_path' => 'admin/elms',
  );
  // Exported menu link: admin:system_stats
  $menu_links['admin:system_stats'] = array(
    'menu_name' => 'admin',
    'link_path' => 'system_stats',
    'router_path' => 'system_stats',
    'link_title' => 'System stats',
    'options' => array(
      'purl' => 'disabled',
      'attributes' => array(
        'title' => 'System status information',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '-50',
    'parent_path' => 'admin/elms',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Department list');
  t('System stats');


  return $menu_links;
}
