<?php
/**
 * @file
 * elms_places.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elms_places_ctools_plugin_api() {
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
function elms_places_node_info() {
  $items = array(
    'place' => array(
      'name' => t('Place'),
      'base' => 'features',
      'description' => t('Associate a place to content for use in views and display on maps'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
