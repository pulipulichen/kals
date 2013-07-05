<?php
/**
 * @file
 * elms_content_import.feeds_tamper_default.inc
 */

/**
 * Implements hook_feeds_tamper_default().
 */
function elms_content_import_feeds_tamper_default() {
  $export = array();

  $feeds_tamper = new stdClass();
  $feeds_tamper->disabled = FALSE; /* Edit this to true to make a default feeds_tamper disabled initially */
  $feeds_tamper->api_version = 2;
  $feeds_tamper->id = 'elms_node_import-xpathparser_3-current_user_id';
  $feeds_tamper->importer = 'elms_node_import';
  $feeds_tamper->source = 'xpathparser:3';
  $feeds_tamper->plugin_id = 'feeds_node_maps';
  $feeds_tamper->settings = FALSE;
  $feeds_tamper->weight = 0;
  $feeds_tamper->description = 'Current User ID';
  $export['elms_node_import-xpathparser_3-current_user_id'] = $feeds_tamper;

  return $export;
}
