<?php

/**
 * Implements hook_content_default_fields().
 */
function elms_content_content_default_fields() {
  $fields = array();

  // Exported field: field_link
  $fields['link-field_link'] = array(
    'field_name' => 'field_link',
    'type_name' => 'link',
    'display_settings' => array(
      'weight' => '31',
      'parent' => '',
      'label' => array(
        'format' => 'hidden',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'token' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'cck_redirection',
    'required' => '1',
    'multiple' => '0',
    'module' => 'cck_redirection',
    'active' => '1',
    'widget' => array(
      'redirect_type' => '0',
      'default_value' => array(
        '0' => array(
          'value' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Link',
      'weight' => '31',
      'description' => 'Give the full URL for an external link.',
      'type' => 'cck_redirection',
      'module' => 'cck_redirection',
    ),
  );

  // Exported field: field_reference_page
  $fields['referenced_page-field_reference_page'] = array(
    'field_name' => 'field_reference_page',
    'type_name' => 'referenced_page',
    'display_settings' => array(
      'weight' => '-2',
      'parent' => '',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 1,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 1,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'token' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'nodereference',
    'required' => '1',
    'multiple' => '0',
    'module' => 'nodereference',
    'active' => '1',
    'referenceable_types' => array(
      'parent' => 0,
      'site' => 0,
      'folder' => 0,
      'link' => 0,
      'page' => 0,
      'referenced_page' => 0,
    ),
    'advanced_view' => 'elms_content_get_content_for_ref',
    'advanced_view_args' => '',
    'widget' => array(
      'autocomplete_match' => 'contains',
      'size' => '100',
      'default_value' => array(
        '0' => array(
          'nid' => NULL,
          '_error_element' => 'default_value_widget][field_reference_page][0][nid][nid',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Reference',
      'weight' => '-2',
      'description' => 'Start typing the name of the page you would like to display here by reference',
      'type' => 'nodereference_autocomplete',
      'module' => 'nodereference',
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Link');
  t('Reference');

  return $fields;
}
