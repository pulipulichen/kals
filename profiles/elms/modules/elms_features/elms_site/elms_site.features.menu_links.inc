<?php

/**
 * Implements hook_menu_default_menu_links().
 */
function elms_site_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: admin:admin/build/workflow/list
  $menu_links['admin:admin/build/workflow/list'] = array(
    'menu_name' => 'admin',
    'link_path' => 'admin/structure/workflow/list',
    'router_path' => 'admin/structure/workflow/list',
    'link_title' => 'Site statuses',
    'options' => array(
      'purl' => 'disabled',
      'attributes' => array(
        'title' => 'Edit the status list for sites',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '-48',
    'parent_path' => 'admin/content/node-type/site/fields',
  );
  // Exported menu link: admin:admin/content/node-type/site/fields
  $menu_links['admin:admin/content/node-type/site/fields'] = array(
    'menu_name' => 'admin',
    'link_path' => 'admin/content/node-type/site/fields',
    'router_path' => 'admin/content/node-type/site/fields',
    'link_title' => 'Edit micro-site settings',
    'options' => array(
      'purl' => 'disabled',
      'attributes' => array(
        'title' => 'Shortcut to work on fields related to a site',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '1',
    'expanded' => '1',
    'weight' => '-45',
    'parent_path' => 'admin/elms',
  );
  // Exported menu link: admin:admin/content/node-type/site/fields/field_campus
  $menu_links['admin:admin/content/node-type/site/fields/field_campus'] = array(
    'menu_name' => 'admin',
    'link_path' => 'admin/content/node-type/site/fields/field_campus',
    'router_path' => 'admin/content/node-type/site/fields/field_campus',
    'link_title' => 'Campus list',
    'options' => array(
      'purl' => 'disabled',
      'attributes' => array(
        'title' => 'Change the available campuses for selection',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '-50',
    'parent_path' => 'admin/content/node-type/site/fields',
  );
  // Exported menu link: admin:admin/content/node-type/site/fields/field_section_semester
  $menu_links['admin:admin/content/node-type/site/fields/field_section_semester'] = array(
    'menu_name' => 'admin',
    'link_path' => 'admin/content/node-type/site/fields/field_section_semester',
    'router_path' => 'admin/content/node-type/site/fields/field_section_semester',
    'link_title' => 'Semester',
    'options' => array(
      'purl' => 'disabled',
      'attributes' => array(
        'title' => 'Change the available semesters',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '-49',
    'parent_path' => 'admin/content/node-type/site/fields',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Campus list');
  t('Edit micro-site settings');
  t('Semester');
  t('Site statuses');


  return $menu_links;
}
