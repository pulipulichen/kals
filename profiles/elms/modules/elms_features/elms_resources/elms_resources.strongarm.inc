<?php
/**
 * @file
 * elms_resources.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function elms_resources_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'content_extra_weights_elms_resource';
  $strongarm->value = array(
    'title' => '-5',
    'body_field' => '-1',
    'revision_information' => '6',
    'author' => '5',
    'options' => '7',
    'menu' => '2',
    'book' => '4',
    'path' => '9',
    'print' => '8',
    'workflow' => '3',
    'spaces_preset' => '10',
    'purl' => '1',
    'themes' => '0',
  );
  $export['content_extra_weights_elms_resource'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_elms_resource';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_elms_resource'] = $strongarm;

  return $export;
}
