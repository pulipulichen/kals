<?php
/**
 * @file
 * elms_reference_links.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elms_reference_links_ctools_plugin_api() {
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
function elms_reference_links_node_info() {
  $items = array(
    'content_links' => array(
      'name' => t('Content Links'),
      'base' => 'features',
      'description' => t('Associate reference links to content'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
