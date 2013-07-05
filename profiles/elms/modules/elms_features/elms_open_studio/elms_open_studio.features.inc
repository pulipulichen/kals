<?php
/**
 * @file
 * elms_open_studio.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elms_open_studio_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
  list($module, $api) = func_get_args();
  if ($module == "feeds" && $api == "feeds_importer_default") {
    return array("version" => "1");
  }
  list($module, $api) = func_get_args();
  if ($module == "feeds_tamper" && $api == "feeds_tamper_default") {
    return array("version" => "2");
  }
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function elms_open_studio_node_info() {
  $items = array(
    'exhibit' => array(
      'name' => t('Exhibit'),
      'base' => 'features',
      'description' => t('Use this to organize your work'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'exhibit_image' => array(
      'name' => t('Exhibit Image'),
      'base' => 'features',
      'description' => t('Use this to add an image to your exhibit'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'exhibit_post' => array(
      'name' => t('Exhibit Post'),
      'base' => 'features',
      'description' => t('A post to the open studio without media.  Use this for blog posts and other written assignments.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'exhibit_video' => array(
      'name' => t('Exhibit video'),
      'base' => 'features',
      'description' => t('Add a video to your exhibit from an external source'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
