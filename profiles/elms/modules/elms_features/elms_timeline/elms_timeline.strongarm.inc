<?php
/**
 * @file
 * elms_timeline.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function elms_timeline_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'content_extra_weights_timeline_item';
  $strongarm->value = array(
    'title' => '12',
    'body_field' => '20',
    'revision_information' => '25',
    'author' => '24',
    'options' => '26',
    'menu' => '17',
    'book' => '22',
    'path' => '27',
    'og_nodeapi' => '18',
    'print' => '28',
    'workflow' => '23',
    'spaces_preset' => '29',
    'purl' => '19',
    'themes' => '21',
  );
  $export['content_extra_weights_timeline_item'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_timeline_item';
  $strongarm->value = array(
    0 => 'status',
    1 => 'revision',
  );
  $export['node_options_timeline_item'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_timeline_item';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_timeline_item'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'timeline_library_source';
  $strongarm->value = 'local';
  $export['timeline_library_source'] = $strongarm;

  return $export;
}
