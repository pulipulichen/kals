<?php
/**
 * @file
 * elms_forum.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function elms_forum_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_forum_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '-5',
      'has_required' => TRUE,
      'title' => 'Subject',
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '0.008',
      'has_required' => TRUE,
      'title' => NULL,
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
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'Revision information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'comment_settings' => array(
      'region' => 'right',
      'weight' => '9',
      'has_required' => FALSE,
      'title' => 'Comment settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'path' => array(
      'region' => 'right',
      'weight' => '8',
      'has_required' => FALSE,
      'title' => 'URL path settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'options' => array(
      'region' => 'right',
      'weight' => '7',
      'has_required' => FALSE,
      'title' => 'Publishing options',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'author' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => 'Authoring information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'buttons' => array(
      'region' => 'main',
      'weight' => '100',
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
    'taxonomy' => array(
      'region' => 'main',
      'weight' => '-3',
      'has_required' => TRUE,
      'title' => NULL,
    ),
    'locations' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Location',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'og_nodeapi' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Course Versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
  );
  $export['nodeformscols_field_placements_forum_default'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_forum';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_forum'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_forum';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_forum'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_forum';
  $strongarm->value = '';
  $export['og_max_groups_forum'] = $strongarm;

  return $export;
}
