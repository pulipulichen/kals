<?php

/**
 * Implements hook_content_default_fields().
 */
function elms_places_content_default_fields() {
  $fields = array();

  // Exported field: field_location_content_ref
  $fields['place-field_location_content_ref'] = array(
    'field_name' => 'field_location_content_ref',
    'type_name' => 'place',
    'display_settings' => array(
      'label' => array(
        'format' => 'above',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
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
    'required' => '0',
    'multiple' => '0',
    'module' => 'nodereference',
    'active' => '1',
    'referenceable_types' => array(
      'folder' => 'folder',
      'page' => 'page',
      'accessibility_guideline' => 0,
      'accessibility_test' => 0,
      'content_links' => 0,
      'parent' => 0,
      'elms_event' => 0,
      'elms_resource' => 0,
      'link' => 0,
      'place' => 0,
      'poll' => 0,
      'reaction' => 0,
      'referenced_page' => 0,
      'term' => 0,
      'timeline_item' => 0,
      'site' => 0,
    ),
    'advanced_view' => '--',
    'advanced_view_args' => '',
    'widget' => array(
      'autocomplete_match' => 'contains',
      'size' => 60,
      'node_link' => array(
        'teaser' => 0,
        'full' => 1,
        'title' => 'Associate a Place to this Content',
        'hover_title' => 'Associate a Place to this Content',
        'destination' => 'node',
      ),
      'fallback' => 'leave_blank',
      'edit_fallback' => 0,
      'default_value' => array(
        '0' => array(
          'nid' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Content Reference',
      'weight' => '-4',
      'description' => '',
      'type' => 'nodereference_select',
      'module' => 'nodereference',
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Content Reference');

  return $fields;
}
