<?php
/**
 * @file
 * elms_icms.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elms_icms_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}
