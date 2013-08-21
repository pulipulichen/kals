<?php

/**
 * Implements hook_content_default_fields().
 */
function elms_reaction_content_default_fields() {
  $fields = array();

  // Exported field: field_reaction_feeling
  $fields['reaction-field_reaction_feeling'] = array(
    'field_name' => 'field_reaction_feeling',
    'type_name' => 'reaction',
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
    'type' => 'text',
    'required' => '1',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => 'positive|Positive
negative|Negative
nuetral|Nuetral',
    'allowed_values_php' => '',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => 'nuetral',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Reaction Feeling',
      'weight' => '1',
      'description' => '',
      'type' => 'optionwidgets_select',
      'module' => 'optionwidgets',
    ),
  );

  // Exported field: field_related_content
  $fields['reaction-field_related_content'] = array(
    'field_name' => 'field_related_content',
    'type_name' => 'reaction',
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
    'required' => '1',
    'multiple' => '0',
    'module' => 'nodereference',
    'active' => '1',
    'referenceable_types' => array(
      'folder' => 'folder',
      'page' => 'page',
      'studio_submission' => 'studio_submission',
      'accessibility_guideline' => 0,
      'accessibility_test' => 0,
      'blog' => 0,
      'elms_event' => 0,
      'parent' => 0,
      'site' => 0,
      'link' => 0,
      'promo' => 0,
      'reaction' => 0,
      'feed_reader' => 0,
      'feed_user_import' => 0,
    ),
    'advanced_view' => '--',
    'advanced_view_args' => '',
    'widget' => array(
      'node_link' => array(
        'teaser' => 0,
        'full' => 1,
        'title' => 'Leave your Reaction',
        'hover_title' => 'Leave your Reaction',
        'destination' => 'node',
      ),
      'fallback' => 'autocomplete',
      'edit_fallback' => 0,
      'label' => 'Related Content',
      'weight' => '-1',
      'description' => '',
      'type' => 'nodereference_url',
      'module' => 'nodereference_url',
    ),
  );

  // Exported field: field_related_reaction
  $fields['reaction-field_related_reaction'] = array(
    'field_name' => 'field_related_reaction',
    'type_name' => 'reaction',
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
      'reaction' => 'reaction',
      'accessibility_guideline' => 0,
      'accessibility_test' => 0,
      'elms_event' => 0,
      'parent' => 0,
      'folder' => 0,
      'link' => 0,
      'page' => 0,
      'promo' => 0,
      'studio_submission' => 0,
      'site' => 0,
    ),
    'advanced_view' => 'elms_reaction_list',
    'advanced_view_args' => '',
    'widget' => array(
      'autocomplete_match' => 'contains',
      'size' => 60,
      'default_value' => array(
        '0' => array(
          'nid' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Related Reaction',
      'weight' => 0,
      'description' => '',
      'type' => 'nodereference_select',
      'module' => 'nodereference',
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Reaction Feeling');
  t('Related Content');
  t('Related Reaction');

  return $fields;
}
