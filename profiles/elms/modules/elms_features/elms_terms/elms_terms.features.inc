<?php
/**
 * @file
 * elms_terms.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elms_terms_ctools_plugin_api() {
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
function elms_terms_node_info() {
  $items = array(
    'term' => array(
      'name' => t('Term'),
      'base' => 'features',
      'description' => t('Define a term for use in a course'),
      'has_title' => '1',
      'title_label' => t('Term'),
      'help' => '',
    ),
  );
  return $items;
}
