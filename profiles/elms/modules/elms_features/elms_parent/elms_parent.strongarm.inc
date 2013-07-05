<?php
/**
 * @file
 * elms_parent.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function elms_parent_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'content_extra_weights_parent';
  $strongarm->value = array(
    'title' => '-5',
    'revision_information' => '5',
    'author' => '7',
    'options' => '8',
    'menu' => '3',
    'taxonomy' => '-4',
    'book' => '4',
    'path' => '11',
    'print' => '10',
    'workflow' => '2',
    'spaces_preset' => '12',
    'purl' => '6',
    'themes' => '9',
  );
  $export['content_extra_weights_parent'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_parent';
  $strongarm->value = array(
    0 => 'status',
    1 => 'revision',
  );
  $export['node_options_parent'] = $strongarm;

  return $export;
}
