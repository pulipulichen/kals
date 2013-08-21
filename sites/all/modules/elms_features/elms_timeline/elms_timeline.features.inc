<?php
/**
 * @file
 * elms_timeline.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elms_timeline_ctools_plugin_api() {
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
function elms_timeline_node_info() {
  $items = array(
    'timeline_item' => array(
      'name' => t('Timeline Item'),
      'base' => 'features',
      'description' => t('ELMS Timeline uses this content type to associate content to a timeline'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
