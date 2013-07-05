<?php
/**
 * @file
 * elms_open_studio.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function elms_open_studio_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'better_formats_allowed_exhibit';
  $strongarm->value = array(
    0 => 1,
  );
  $export['better_formats_allowed_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'better_formats_allowed_exhibit_image';
  $strongarm->value = array(
    0 => 1,
  );
  $export['better_formats_allowed_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_exhibit';
  $strongarm->value = 0;
  $export['comment_anonymous_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_exhibit_image';
  $strongarm->value = 0;
  $export['comment_anonymous_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_exhibit_post';
  $strongarm->value = 0;
  $export['comment_anonymous_exhibit_post'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_exhibit_video';
  $strongarm->value = 0;
  $export['comment_anonymous_exhibit_video'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_controls_exhibit';
  $strongarm->value = '3';
  $export['comment_controls_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_controls_exhibit_image';
  $strongarm->value = '3';
  $export['comment_controls_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_controls_exhibit_post';
  $strongarm->value = '3';
  $export['comment_controls_exhibit_post'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_controls_exhibit_video';
  $strongarm->value = '3';
  $export['comment_controls_exhibit_video'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_exhibit';
  $strongarm->value = '4';
  $export['comment_default_mode_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_exhibit_image';
  $strongarm->value = '4';
  $export['comment_default_mode_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_exhibit_post';
  $strongarm->value = '4';
  $export['comment_default_mode_exhibit_post'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_exhibit_video';
  $strongarm->value = '4';
  $export['comment_default_mode_exhibit_video'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_order_exhibit';
  $strongarm->value = '2';
  $export['comment_default_order_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_order_exhibit_image';
  $strongarm->value = '2';
  $export['comment_default_order_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_order_exhibit_post';
  $strongarm->value = '2';
  $export['comment_default_order_exhibit_post'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_order_exhibit_video';
  $strongarm->value = '2';
  $export['comment_default_order_exhibit_video'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_exhibit';
  $strongarm->value = '300';
  $export['comment_default_per_page_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_exhibit_image';
  $strongarm->value = '300';
  $export['comment_default_per_page_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_exhibit_post';
  $strongarm->value = '300';
  $export['comment_default_per_page_exhibit_post'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_exhibit_video';
  $strongarm->value = '300';
  $export['comment_default_per_page_exhibit_video'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_exhibit';
  $strongarm->value = '2';
  $export['comment_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_exhibit_image';
  $strongarm->value = '2';
  $export['comment_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_exhibit_post';
  $strongarm->value = '2';
  $export['comment_exhibit_post'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_exhibit_video';
  $strongarm->value = '2';
  $export['comment_exhibit_video'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_exhibit';
  $strongarm->value = '1';
  $export['comment_form_location_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_exhibit_image';
  $strongarm->value = '1';
  $export['comment_form_location_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_exhibit_post';
  $strongarm->value = '1';
  $export['comment_form_location_exhibit_post'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_exhibit_video';
  $strongarm->value = '1';
  $export['comment_form_location_exhibit_video'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_exhibit';
  $strongarm->value = '0';
  $export['comment_preview_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_exhibit_image';
  $strongarm->value = '0';
  $export['comment_preview_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_exhibit_post';
  $strongarm->value = '0';
  $export['comment_preview_exhibit_post'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_exhibit_video';
  $strongarm->value = '0';
  $export['comment_preview_exhibit_video'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_exhibit';
  $strongarm->value = '0';
  $export['comment_subject_field_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_exhibit_image';
  $strongarm->value = '0';
  $export['comment_subject_field_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_exhibit_post';
  $strongarm->value = '0';
  $export['comment_subject_field_exhibit_post'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_exhibit_video';
  $strongarm->value = '0';
  $export['comment_subject_field_exhibit_video'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'content_extra_weights_exhibit_post';
  $strongarm->value = array(
    'title' => '-5',
    'body_field' => '-1',
    'revision_information' => '4',
    'author' => '5',
    'options' => '6',
    'comment_settings' => '9',
    'menu' => '-4',
    'book' => '3',
    'path' => '7',
    'og_nodeapi' => '0',
    'print' => '8',
    'workflow' => '2',
    'spaces_preset' => '10',
    'purl' => '-3',
    'themes' => '1',
  );
  $export['content_extra_weights_exhibit_post'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'content_extra_weights_exhibit_video';
  $strongarm->value = array(
    'title' => '-5',
    'body_field' => '-2',
    'revision_information' => '5',
    'author' => '6',
    'options' => '7',
    'comment_settings' => '10',
    'menu' => '-4',
    'book' => '4',
    'path' => '8',
    'og_nodeapi' => '-1',
    'print' => '9',
    'workflow' => '1',
    'spaces_preset' => '11',
    'purl' => '-3',
    'themes' => '0',
  );
  $export['content_extra_weights_exhibit_video'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_comment_exhibit';
  $strongarm->value = '0';
  $export['fivestar_comment_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_comment_exhibit_image';
  $strongarm->value = '0';
  $export['fivestar_comment_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_exhibit';
  $strongarm->value = 1;
  $export['fivestar_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_exhibit_image';
  $strongarm->value = 1;
  $export['fivestar_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_feedback_exhibit';
  $strongarm->value = 1;
  $export['fivestar_feedback_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_feedback_exhibit_image';
  $strongarm->value = 1;
  $export['fivestar_feedback_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_labels_enable_exhibit';
  $strongarm->value = 1;
  $export['fivestar_labels_enable_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_labels_enable_exhibit_image';
  $strongarm->value = 1;
  $export['fivestar_labels_enable_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_labels_exhibit';
  $strongarm->value = array(
    0 => 'Cancel rating',
    1 => 'Poor',
    2 => 'Okay',
    3 => 'Good',
    4 => 'Great',
    5 => 'Awesome',
    6 => 'Give it @star/@count',
    7 => 'Give it @star/@count',
    8 => 'Give it @star/@count',
    9 => 'Give it @star/@count',
    10 => 'Give it @star/@count',
  );
  $export['fivestar_labels_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_labels_exhibit_image';
  $strongarm->value = array(
    0 => 'Cancel rating',
    1 => 'Poor',
    2 => 'Okay',
    3 => 'Good',
    4 => 'Great',
    5 => 'Awesome',
    6 => 'Give it @star/@count',
    7 => 'Give it @star/@count',
    8 => 'Give it @star/@count',
    9 => 'Give it @star/@count',
    10 => 'Give it @star/@count',
  );
  $export['fivestar_labels_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_position_exhibit';
  $strongarm->value = 'below';
  $export['fivestar_position_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_position_exhibit_image';
  $strongarm->value = 'below';
  $export['fivestar_position_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_position_teaser_exhibit';
  $strongarm->value = 'hidden';
  $export['fivestar_position_teaser_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_position_teaser_exhibit_image';
  $strongarm->value = 'hidden';
  $export['fivestar_position_teaser_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_stars_exhibit';
  $strongarm->value = '5';
  $export['fivestar_stars_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_stars_exhibit_image';
  $strongarm->value = '5';
  $export['fivestar_stars_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_style_exhibit';
  $strongarm->value = 'average';
  $export['fivestar_style_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_style_exhibit_image';
  $strongarm->value = 'smart';
  $export['fivestar_style_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_text_exhibit';
  $strongarm->value = 'dual';
  $export['fivestar_text_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_text_exhibit_image';
  $strongarm->value = 'dual';
  $export['fivestar_text_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_title_exhibit';
  $strongarm->value = 1;
  $export['fivestar_title_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_title_exhibit_image';
  $strongarm->value = 1;
  $export['fivestar_title_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_unvote_exhibit';
  $strongarm->value = 1;
  $export['fivestar_unvote_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fivestar_unvote_exhibit_image';
  $strongarm->value = 1;
  $export['fivestar_unvote_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_exhibit';
  $strongarm->value = array(
    0 => 'status',
    1 => 'revision',
  );
  $export['node_options_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_exhibit_image';
  $strongarm->value = array(
    0 => 'status',
    1 => 'revision',
  );
  $export['node_options_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_exhibit_post';
  $strongarm->value = array(
    0 => 'status',
    1 => 'revision',
  );
  $export['node_options_exhibit_post'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_exhibit_video';
  $strongarm->value = array(
    0 => 'status',
    1 => 'revision',
  );
  $export['node_options_exhibit_video'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_exhibit';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_exhibit_image';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_exhibit';
  $strongarm->value = '';
  $export['og_max_groups_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_exhibit_image';
  $strongarm->value = '';
  $export['og_max_groups_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_comment_exhibit';
  $strongarm->value = 0;
  $export['print_display_comment_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_comment_exhibit_image';
  $strongarm->value = 0;
  $export['print_display_comment_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_exhibit';
  $strongarm->value = 0;
  $export['print_display_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_exhibit_image';
  $strongarm->value = 0;
  $export['print_display_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_urllist_exhibit';
  $strongarm->value = 0;
  $export['print_display_urllist_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_urllist_exhibit_image';
  $strongarm->value = 0;
  $export['print_display_urllist_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'show_diff_inline_exhibit';
  $strongarm->value = 0;
  $export['show_diff_inline_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'show_diff_inline_exhibit_image';
  $strongarm->value = 0;
  $export['show_diff_inline_exhibit_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'show_preview_changes_exhibit';
  $strongarm->value = 0;
  $export['show_preview_changes_exhibit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'show_preview_changes_exhibit_image';
  $strongarm->value = 0;
  $export['show_preview_changes_exhibit_image'] = $strongarm;

  return $export;
}
