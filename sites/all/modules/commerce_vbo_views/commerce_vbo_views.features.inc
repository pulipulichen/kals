<?php
/**
 * @file
 * commerce_vbo_views.features.inc
 */

/**
 * Implements hook_views_api().
 */
function commerce_vbo_views_views_api() {
  list($module, $api) = func_get_args();
  if ($module == "views" && $api == "views_default") {
    return array("version" => "3.0");
  }
}
