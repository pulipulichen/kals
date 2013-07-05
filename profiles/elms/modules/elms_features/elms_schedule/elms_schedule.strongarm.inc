<?php
/**
 * @file
 * elms_schedule.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function elms_schedule_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_elms_event';
  $strongarm->value = 0;
  $export['comment_anonymous_elms_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_controls_elms_event';
  $strongarm->value = '3';
  $export['comment_controls_elms_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_elms_event';
  $strongarm->value = '4';
  $export['comment_default_mode_elms_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_order_elms_event';
  $strongarm->value = '1';
  $export['comment_default_order_elms_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_elms_event';
  $strongarm->value = '50';
  $export['comment_default_per_page_elms_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_elms_event';
  $strongarm->value = '0';
  $export['comment_elms_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_elms_event';
  $strongarm->value = '0';
  $export['comment_form_location_elms_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_elms_event';
  $strongarm->value = '1';
  $export['comment_preview_elms_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_elms_event';
  $strongarm->value = '1';
  $export['comment_subject_field_elms_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'content_extra_weights_elms_event';
  $strongarm->value = array(
    'title' => '-5',
    'revision_information' => '7',
    'author' => '6',
    'options' => '8',
    'menu' => '10',
    'book' => '5',
    'path' => '11',
    'og_nodeapi' => '3',
    'print' => '9',
    'workflow' => '12',
    'spaces_preset' => '13',
    'purl' => '-1',
    'themes' => '1',
  );
  $export['content_extra_weights_elms_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_elms_event';
  $strongarm->value = array(
    0 => 'status',
    1 => 'revision',
  );
  $export['node_options_elms_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_elms_event';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_elms_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_elms_event';
  $strongarm->value = '1';
  $export['og_max_groups_elms_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'upload_elms_event';
  $strongarm->value = '0';
  $export['upload_elms_event'] = $strongarm;

  return $export;
}
