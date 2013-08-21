<?php
/**
 * @file
 * elms_reaction.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elms_reaction_ctools_plugin_api() {
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
function elms_reaction_node_info() {
  $items = array(
    'reaction' => array(
      'name' => t('Reaction'),
      'base' => 'features',
      'description' => t('Add a reaction to a page in your site.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
