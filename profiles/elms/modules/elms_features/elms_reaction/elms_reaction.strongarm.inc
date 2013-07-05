<?php
/**
 * @file
 * elms_reaction.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function elms_reaction_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_reaction';
  $strongarm->value = 0;
  $export['comment_anonymous_reaction'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_controls_reaction';
  $strongarm->value = '3';
  $export['comment_controls_reaction'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_reaction';
  $strongarm->value = '4';
  $export['comment_default_mode_reaction'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_order_reaction';
  $strongarm->value = '1';
  $export['comment_default_order_reaction'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_reaction';
  $strongarm->value = '50';
  $export['comment_default_per_page_reaction'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_reaction';
  $strongarm->value = '0';
  $export['comment_form_location_reaction'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_reaction';
  $strongarm->value = '1';
  $export['comment_preview_reaction'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_reaction';
  $strongarm->value = '0';
  $export['comment_reaction'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_reaction';
  $strongarm->value = '1';
  $export['comment_subject_field_reaction'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'content_extra_weights_reaction';
  $strongarm->value = array(
    'title' => '-5',
    'body_field' => '2',
    'revision_information' => '6',
    'author' => '7',
    'options' => '8',
    'comment_settings' => '9',
    'menu' => '-4',
    'book' => '5',
    'path' => '11',
    'og_nodeapi' => '-3',
    'print' => '10',
    'workflow' => '4',
    'spaces_preset' => '12',
    'purl' => '-2',
    'themes' => '3',
  );
  $export['content_extra_weights_reaction'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_reaction';
  $strongarm->value = array(
    0 => 'status',
    1 => 'revision',
  );
  $export['node_options_reaction'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_reaction';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_reaction'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'upload_reaction';
  $strongarm->value = '0';
  $export['upload_reaction'] = $strongarm;

  return $export;
}
