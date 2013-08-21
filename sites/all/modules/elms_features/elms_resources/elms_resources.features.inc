<?php
/**
 * @file
 * elms_resources.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elms_resources_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function elms_resources_node_info() {
  $items = array(
    'elms_resource' => array(
      'name' => t('ELMS Resource'),
      'base' => 'features',
      'description' => t('Resources for communicating information about resources used in a course'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
