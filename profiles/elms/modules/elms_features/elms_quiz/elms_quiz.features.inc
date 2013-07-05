<?php
/**
 * @file
 * elms_quiz.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elms_quiz_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}
