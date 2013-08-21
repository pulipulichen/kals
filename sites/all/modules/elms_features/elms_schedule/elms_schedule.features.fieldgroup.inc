<?php

/**
 * Implements hook_fieldgroup_default_groups().
 */
function elms_schedule_fieldgroup_default_groups() {
  $groups = array();

  // Exported group: group_additional_settings
  $groups['elms_event-group_additional_settings'] = array(
    'group_type' => 'standard',
    'type_name' => 'elms_event',
    'group_name' => 'group_additional_settings',
    'label' => 'Additional Settings',
    'settings' => array(
      'form' => array(
        'style' => 'fieldset_collapsible',
        'description' => '',
      ),
      'display' => array(
        'description' => '',
        '5' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'teaser' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'full' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '4' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '2' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '3' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'token' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'label' => 'above',
      ),
    ),
    'weight' => '2',
    'fields' => array(
      '0' => 'field_score_value',
      '1' => 'field_color',
      '2' => 'field_task_link',
    ),
  );

  // Exported group: group_dates
  $groups['elms_event-group_dates'] = array(
    'group_type' => 'standard',
    'type_name' => 'elms_event',
    'group_name' => 'group_dates',
    'label' => 'Dates',
    'settings' => array(
      'form' => array(
        'style' => 'fieldset_collapsible',
        'description' => '',
      ),
      'display' => array(
        'description' => '',
        '5' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'teaser' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'full' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '4' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '2' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '3' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'token' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'label' => 'above',
      ),
    ),
    'weight' => '0',
    'fields' => array(
      '0' => 'field_date_mod_text',
      '1' => 'field_due_date',
      '2' => 'field_due_time',
      '3' => 'field_end_date',
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Additional Settings');
  t('Dates');

  return $groups;
}
