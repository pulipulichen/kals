<?php
/**
 * @file
 * elms_parent.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elms_parent_ctools_plugin_api() {
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
function elms_parent_node_info() {
  $items = array(
    'parent' => array(
      'name' => t('Course'),
      'base' => 'features',
      'description' => t('Use this to setup a name space to associate group instances to'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
