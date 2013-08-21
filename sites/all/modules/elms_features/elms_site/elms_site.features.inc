<?php
/**
 * @file
 * elms_site.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elms_site_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function elms_site_node_info() {
  $items = array(
    'site' => array(
      'name' => t('Version'),
      'base' => 'features',
      'description' => t('A site is a microsite contained within a larger ELMS instance'),
      'has_title' => '1',
      'title_label' => t('Site Name'),
      'help' => '',
    ),
  );
  return $items;
}
