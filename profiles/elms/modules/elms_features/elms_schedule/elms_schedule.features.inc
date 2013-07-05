<?php
/**
 * @file
 * elms_schedule.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elms_schedule_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_flag_default_flags().
 */
function elms_schedule_flag_default_flags() {
  $flags = array();
  // Exported flag: "Student self reporting of completed course events".
  $flags['complete'] = array(
    'content_type' => 'node',
    'title' => 'Student self reporting of completed course events',
    'global' => '0',
    'types' => array(),
    'flag_short' => 'incomplete',
    'flag_long' => '',
    'flag_message' => '',
    'unflag_short' => 'complete',
    'unflag_long' => '',
    'unflag_message' => '',
    'unflag_denied_text' => '',
    'link_type' => 'toggle',
    'roles' => array(
      'flag' => array(
        0 => 2,
      ),
      'unflag' => array(
        0 => 2,
      ),
    ),
    'show_on_page' => 0,
    'show_on_teaser' => 0,
    'show_on_form' => 0,
    'access_author' => '',
    'i18n' => 0,
    'module' => 'elms_schedule',
    'locked' => array(
      0 => 'name',
    ),
    'api_version' => 2,
  );
  return $flags;
}

/**
 * Implements hook_node_info().
 */
function elms_schedule_node_info() {
  $items = array(
    'elms_event' => array(
      'name' => t('Course Event'),
      'base' => 'features',
      'description' => t('Use this to add an event / task / container to the course\'s schedule'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
