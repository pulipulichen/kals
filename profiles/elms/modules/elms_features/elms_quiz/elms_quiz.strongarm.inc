<?php
/**
 * @file
 * elms_quiz.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function elms_quiz_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'better_formats_allowed_quiz';
  $strongarm->value = array();
  $export['better_formats_allowed_quiz'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'better_formats_allowed_quiz_directions';
  $strongarm->value = array();
  $export['better_formats_allowed_quiz_directions'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_long_answer_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '-5',
      'has_required' => FALSE,
      'title' => 'Title',
      'hidden' => 0,
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '-15',
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
      'title' => NULL,
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
    'helper' => array(
      'region' => 'main',
      'weight' => '0.008',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'rubric' => array(
      'region' => 'main',
      'weight' => '0.01',
      'has_required' => FALSE,
      'title' => 'Rubric',
      'hidden' => 0,
    ),
    'add_directly' => array(
      'region' => 'main',
      'weight' => '-3',
      'has_required' => FALSE,
      'title' => 'Add to Quiz',
      'collapsed' => 1,
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
  $export['nodeformscols_field_placements_long_answer_default'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_matching_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '-5',
      'has_required' => FALSE,
      'title' => 'Title',
      'hidden' => 0,
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '-15',
      'has_required' => TRUE,
      'title' => NULL,
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => NULL,
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
    'helper' => array(
      'region' => 'main',
      'weight' => '0.008',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'match' => array(
      'region' => 'main',
      'weight' => '-4',
      'has_required' => TRUE,
      'title' => 'Answer',
    ),
    'add_directly' => array(
      'region' => 'main',
      'weight' => '-3',
      'has_required' => FALSE,
      'title' => 'Add to Quiz',
      'collapsed' => 1,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'locations' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Location',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'og_nodeapi' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Course Versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
  );
  $export['nodeformscols_field_placements_matching_default'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_multichoice_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '-5',
      'has_required' => FALSE,
      'title' => 'Title',
      'hidden' => 0,
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '-15',
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
      'title' => NULL,
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
    'helper' => array(
      'region' => 'main',
      'weight' => '0.008',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'alternatives' => array(
      'region' => 'main',
      'weight' => '-4',
      'has_required' => TRUE,
      'title' => 'Answer',
      'collapsed' => 0,
    ),
    'add_directly' => array(
      'region' => 'main',
      'weight' => '-3',
      'has_required' => FALSE,
      'title' => 'Add to Quiz',
      'collapsed' => 1,
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
  $export['nodeformscols_field_placements_multichoice_default'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_quiz_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '-5',
      'has_required' => TRUE,
      'title' => 'Title',
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '0.008',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => NULL,
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
    'taking' => array(
      'region' => 'main',
      'weight' => '0.009',
      'has_required' => FALSE,
      'title' => 'Taking options',
      'collapsed' => 1,
      'hidden' => 0,
    ),
    'quiz_availability' => array(
      'region' => 'main',
      'weight' => '0.01',
      'has_required' => FALSE,
      'title' => 'Availability options',
      'collapsed' => 1,
      'hidden' => 0,
    ),
    'summaryoptions' => array(
      'region' => 'main',
      'weight' => '0.011',
      'has_required' => FALSE,
      'title' => 'Pass/fail options',
      'collapsed' => 1,
      'hidden' => 0,
    ),
    'resultoptions' => array(
      'region' => 'main',
      'weight' => '0.015',
      'has_required' => FALSE,
      'title' => 'Result Comments',
      'collapsed' => 1,
      'hidden' => 0,
    ),
    'remember_settings' => array(
      'region' => 'main',
      'weight' => '49',
      'has_required' => FALSE,
      'title' => 'Remember my settings',
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'locations' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Location',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'og_nodeapi' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Course Versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
  );
  $export['nodeformscols_field_placements_quiz_default'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_quiz_directions_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '-5',
      'has_required' => FALSE,
      'title' => 'Title',
      'hidden' => 0,
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '-15',
      'has_required' => TRUE,
      'title' => NULL,
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => NULL,
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'comment_settings' => array(
      'region' => 'right',
      'weight' => '8',
      'has_required' => FALSE,
      'title' => 'Comment settings',
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
      'weight' => '100',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'helper' => array(
      'region' => 'main',
      'weight' => '0.008',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'add_directly' => array(
      'region' => 'main',
      'weight' => '-3',
      'has_required' => FALSE,
      'title' => 'Add to Quiz',
      'collapsed' => 1,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'locations' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Location',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'og_nodeapi' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Course Versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
  );
  $export['nodeformscols_field_placements_quiz_directions_default'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_scale_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '-5',
      'has_required' => FALSE,
      'title' => 'Title',
      'hidden' => 0,
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '-15',
      'has_required' => TRUE,
      'title' => NULL,
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => NULL,
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'comment_settings' => array(
      'region' => 'right',
      'weight' => '8',
      'has_required' => FALSE,
      'title' => 'Comment settings',
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
      'weight' => '100',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'helper' => array(
      'region' => 'main',
      'weight' => '0.008',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'answer' => array(
      'region' => 'main',
      'weight' => '-4',
      'has_required' => TRUE,
      'title' => 'Answer',
      'collapsed' => 1,
    ),
    'jsArray' => array(
      'region' => 'main',
      'weight' => '0.011',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'add_directly' => array(
      'region' => 'main',
      'weight' => '-3',
      'has_required' => FALSE,
      'title' => 'Add to Quiz',
      'collapsed' => 1,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'locations' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Location',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'og_nodeapi' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Course Versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
  );
  $export['nodeformscols_field_placements_scale_default'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_short_answer_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '-5',
      'has_required' => FALSE,
      'title' => 'Title',
      'hidden' => 0,
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '-15',
      'has_required' => TRUE,
      'title' => NULL,
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => NULL,
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
    'helper' => array(
      'region' => 'main',
      'weight' => '0.008',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'answer' => array(
      'region' => 'main',
      'weight' => '-4',
      'has_required' => FALSE,
      'title' => 'Answer',
      'collapsed' => 1,
      'hidden' => 0,
    ),
    'add_directly' => array(
      'region' => 'main',
      'weight' => '-3',
      'has_required' => FALSE,
      'title' => 'Add to Quiz',
      'collapsed' => 1,
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
    'locations' => array(
      'region' => 'right',
      'weight' => '0',
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
  $export['nodeformscols_field_placements_short_answer_default'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_truefalse_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '-5',
      'has_required' => FALSE,
      'title' => 'Title',
      'hidden' => 0,
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '-15',
      'has_required' => TRUE,
      'title' => NULL,
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => NULL,
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'comment_settings' => array(
      'region' => 'right',
      'weight' => '8',
      'has_required' => FALSE,
      'title' => 'Comment settings',
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
      'weight' => '100',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'helper' => array(
      'region' => 'main',
      'weight' => '0.008',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'correct_answer' => array(
      'region' => 'main',
      'weight' => '-4',
      'has_required' => TRUE,
      'title' => 'Correct answer',
    ),
    'feedback_fields' => array(
      'region' => 'main',
      'weight' => '-3',
      'has_required' => FALSE,
      'title' => 'Feedback Settings',
      'collapsed' => 1,
      'hidden' => 0,
    ),
    'add_directly' => array(
      'region' => 'main',
      'weight' => '-3',
      'has_required' => FALSE,
      'title' => 'Add to Quiz',
      'collapsed' => 1,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'locations' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Location',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'og_nodeapi' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Course Versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
  );
  $export['nodeformscols_field_placements_truefalse_default'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_long_answer';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_long_answer'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_matching';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_matching'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_multichoice';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_multichoice'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_quiz';
  $strongarm->value = array(
    0 => 'status',
    1 => 'promote',
  );
  $export['node_options_quiz'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_quiz_directions';
  $strongarm->value = array(
    0 => 'status',
    1 => 'promote',
  );
  $export['node_options_quiz_directions'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_scale';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_scale'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_short_answer';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_short_answer'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_truefalse';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_truefalse'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_long_answer';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_long_answer'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_matching';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_matching'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_multichoice';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_multichoice'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_quiz';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_quiz'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_quiz_directions';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_quiz_directions'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_scale';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_scale'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_short_answer';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_short_answer'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_truefalse';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_truefalse'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_long_answer';
  $strongarm->value = '';
  $export['og_max_groups_long_answer'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_matching';
  $strongarm->value = '';
  $export['og_max_groups_matching'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_multichoice';
  $strongarm->value = '';
  $export['og_max_groups_multichoice'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_quiz';
  $strongarm->value = '';
  $export['og_max_groups_quiz'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_quiz_directions';
  $strongarm->value = '';
  $export['og_max_groups_quiz_directions'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_scale';
  $strongarm->value = '';
  $export['og_max_groups_scale'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_short_answer';
  $strongarm->value = '';
  $export['og_max_groups_short_answer'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_truefalse';
  $strongarm->value = '';
  $export['og_max_groups_truefalse'] = $strongarm;

  return $export;
}
