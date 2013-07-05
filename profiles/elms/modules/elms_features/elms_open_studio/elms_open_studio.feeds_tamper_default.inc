<?php
/**
 * @file
 * elms_open_studio.feeds_tamper_default.inc
 */

/**
 * Implements hook_feeds_tamper_default().
 */
function elms_open_studio_feeds_tamper_default() {
  $export = array();

  $feeds_tamper = new stdClass();
  $feeds_tamper->disabled = FALSE; /* Edit this to true to make a default feeds_tamper disabled initially */
  $feeds_tamper->api_version = 2;
  $feeds_tamper->id = 'blog_posts-author_name-current_user_id';
  $feeds_tamper->importer = 'blog_posts';
  $feeds_tamper->source = 'author_name';
  $feeds_tamper->plugin_id = 'feeds_node_maps';
  $feeds_tamper->settings = FALSE;
  $feeds_tamper->weight = 0;
  $feeds_tamper->description = 'Current User ID';
  $export['blog_posts-author_name-current_user_id'] = $feeds_tamper;

  return $export;
}
