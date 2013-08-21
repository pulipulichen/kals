<?php
/**
 * @file
 * elms_navigation_top.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elms_navigation_top_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
}
