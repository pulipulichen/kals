<?php

/**
 * Implementation of hook_content_default_fields().
 */
function elms_studio_content_default_fields() {
  $fields = array();

  // Exported field: field_studio_images
  $fields['studio_submission-field_studio_images'] = array(
    'field_name' => 'field_studio_images',
    'type_name' => 'studio_submission',
    'display_settings' => array(
      'weight' => '101',
      'parent' => '',
      'label' => array(
        'format' => 'hidden',
      ),
      'teaser' => array(
        'format' => 'imagefield__lightbox2_compact__elms_studio_submission_page_view__original',
        'exclude' => 1,
      ),
      'full' => array(
        'format' => 'imagefield__lightbox2_compact__elms_studio_submission_page_view__original',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'image_plain',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'image_plain',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'image_plain',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'image_plain',
        'exclude' => 0,
      ),
      'token' => array(
        'format' => 'image_plain',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'filefield',
    'required' => '0',
    'multiple' => '1',
    'module' => 'filefield',
    'active' => '1',
    'list_field' => '0',
    'list_default' => 1,
    'description_field' => '1',
    'widget' => array(
      'file_extensions' => 'png gif jpg jpeg',
      'file_path' => '',
      'progress_indicator' => 'bar',
      'max_filesize_per_file' => '2 MB',
      'max_filesize_per_node' => '20 MB',
      'max_resolution' => '1000x1000',
      'min_resolution' => '0',
      'alt' => '',
      'custom_alt' => 0,
      'title' => '',
      'custom_title' => 1,
      'title_type' => 'textarea',
      'default_image' => NULL,
      'use_default_image' => 0,
      'label' => 'Images',
      'weight' => '101',
      'description' => '',
      'type' => 'imagefield_widget',
      'module' => 'imagefield',
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Images');

  return $fields;
}
