<?php

/**
 * Implementation of hook_strongarm().
 */
function elms_studio_strongarm() {
  $export = array();

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_studio_submission';
  $strongarm->value = 0;
  $export['comment_anonymous_studio_submission'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_controls_studio_submission';
  $strongarm->value = '3';
  $export['comment_controls_studio_submission'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_studio_submission';
  $strongarm->value = '4';
  $export['comment_default_mode_studio_submission'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_order_studio_submission';
  $strongarm->value = '1';
  $export['comment_default_order_studio_submission'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_studio_submission';
  $strongarm->value = '50';
  $export['comment_default_per_page_studio_submission'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_studio_submission';
  $strongarm->value = '0';
  $export['comment_form_location_studio_submission'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_studio_submission';
  $strongarm->value = '1';
  $export['comment_preview_studio_submission'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_studio_submission';
  $strongarm->value = '2';
  $export['comment_studio_submission'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_studio_submission';
  $strongarm->value = '1';
  $export['comment_subject_field_studio_submission'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'content_extra_weights_studio_submission';
  $strongarm->value = array(
    'title' => '-5',
    'body_field' => '0',
    'revision_information' => '20',
    'author' => '20',
    'options' => '25',
    'comment_settings' => '30',
    'menu' => '-2',
    'book' => '10',
    'path' => '30',
    'og_nodeapi' => '0',
    'print' => '30',
    'workflow' => '10',
    'spaces_preset' => '100',
    'purl' => '0',
    'themes' => '1',
  );
  $export['content_extra_weights_studio_submission'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_studio_submission_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '0',
      'has_required' => TRUE,
      'title' => 'Title',
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => 'Revision information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'path' => array(
      'region' => 'right',
      'weight' => '7',
      'has_required' => FALSE,
      'title' => 'URL path settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'options' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'Publishing options',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'author' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Authoring information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'buttons' => array(
      'region' => 'main',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'field_studio_images' => array(
      'region' => 'main',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Images',
      'hidden' => 0,
    ),
    'og_nodeapi' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Course Studios',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
  );
  $export['nodeformscols_field_placements_studio_submission_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_studio_submission';
  $strongarm->value = array(
    0 => 'status',
    1 => 'revision',
  );
  $export['node_options_studio_submission'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_studio_submission';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_studio_submission'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'upload_studio_submission';
  $strongarm->value = '0';
  $export['upload_studio_submission'] = $strongarm;

  return $export;
}
