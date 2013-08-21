<?php
/**
 * @file
 * elms_navigation_left.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elms_navigation_left_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}
