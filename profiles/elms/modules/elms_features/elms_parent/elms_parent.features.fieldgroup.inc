<?php

/**
 * Implements hook_fieldgroup_default_groups().
 */
function elms_parent_fieldgroup_default_groups() {
  $groups = array();

  // Exported group: group_additional_settings
  $groups['parent-group_additional_settings'] = array(
    'group_type' => 'standard',
    'type_name' => 'parent',
    'group_name' => 'group_additional_settings',
    'label' => 'Additional Information',
    'settings' => array(
      'form' => array(
        'style' => 'fieldset_collapsible',
        'description' => 'These fields are not required but they help fill out the Public course space.',
      ),
      'display' => array(
        'description' => '',
        '5' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'teaser' => array(
          'format' => 'fieldset',
          'exclude' => 1,
        ),
        'full' => array(
          'format' => 'fieldset',
          'exclude' => 1,
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
    'weight' => '-1',
    'fields' => array(
      '0' => 'field_parent_title',
      '1' => 'field_description',
      '2' => 'field_link_more_info',
      '3' => 'field_parent_promotion',
      '4' => 'field_sample_materials',
    ),
  );

  // Exported group: group_administrative
  $groups['parent-group_administrative'] = array(
    'group_type' => 'standard',
    'type_name' => 'parent',
    'group_name' => 'group_administrative',
    'label' => 'Administrative',
    'settings' => array(
      'form' => array(
        'style' => 'fieldset_collapsed',
        'description' => 'These values are for internal record keeping as well as helping streamline project management items.',
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
      '0' => 'field_id_of_record',
      '1' => 'field_initial_parent_launch',
      '2' => 'field_lead_faculty',
      '3' => 'field_past_faculty',
      '4' => 'field_faculty_resources',
      '5' => 'field_prerequisites',
    ),
  );

  // Exported group: group_requirements
  $groups['parent-group_requirements'] = array(
    'group_type' => 'standard',
    'type_name' => 'parent',
    'group_name' => 'group_requirements',
    'label' => 'Technical Requirements',
    'settings' => array(
      'form' => array(
        'style' => 'fieldset_collapsed',
        'description' => 'List the technical requirements so that they can be checked against the user prior to them taking the course.  This can offset headaches that would arise after course launch.',
      ),
      'display' => array(
        'weight' => '10',
        'label' => 'above',
        'teaser' => array(
          'format' => 'fieldset',
          'exclude' => 1,
        ),
        'full' => array(
          'format' => 'fieldset',
          'exclude' => 1,
        ),
        'description' => '',
        '5' => array(
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
      ),
    ),
    'weight' => '1',
    'fields' => array(
      '0' => 'field_required_plugins',
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Additional Information');
  t('Administrative');
  t('Technical Requirements');

  return $groups;
}
