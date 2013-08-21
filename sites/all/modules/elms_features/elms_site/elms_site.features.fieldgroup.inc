<?php

/**
 * Implements hook_fieldgroup_default_groups().
 */
function elms_site_fieldgroup_default_groups() {
  $groups = array();

  // Exported group: group_content
  $groups['site-group_content'] = array(
    'group_type' => 'standard',
    'type_name' => 'site',
    'group_name' => 'group_content',
    'label' => 'Content',
    'settings' => array(
      'form' => array(
        'style' => 'fieldset_collapsible',
        'description' => '',
      ),
      'display' => array(
        'weight' => '0',
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
    'weight' => '0',
    'fields' => array(
      '0' => 'field_instructional_template',
      '1' => 'field_lesson_count',
    ),
  );

  // Exported group: group_section_info
  $groups['site-group_section_info'] = array(
    'group_type' => 'standard',
    'type_name' => 'site',
    'group_name' => 'group_section_info',
    'label' => 'Section Info',
    'settings' => array(
      'form' => array(
        'style' => 'fieldset_collapsible',
        'description' => '',
      ),
      'display' => array(
        'weight' => '3',
        'label' => 'above',
        'teaser' => array(
          'format' => 'fieldset',
          'exclude' => 1,
        ),
        'full' => array(
          'format' => 'fieldset',
          'exclude' => 0,
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
    'weight' => '3',
    'fields' => array(
      '0' => 'field_section_semester',
      '1' => 'field_section_year',
      '2' => 'field_campus',
      '3' => 'field_section_number',
      '4' => 'field_activation_codes',
    ),
  );

  // Exported group: group_site_settings
  $groups['site-group_site_settings'] = array(
    'group_type' => 'standard',
    'type_name' => 'site',
    'group_name' => 'group_site_settings',
    'label' => 'Additional Settings',
    'settings' => array(
      'form' => array(
        'style' => 'fieldset_vertical_tab',
        'description' => '',
      ),
      'display' => array(
        'weight' => '4',
        'label' => 'above',
        'teaser' => array(
          'format' => 'fieldset',
          'exclude' => 1,
        ),
        'full' => array(
          'format' => 'fieldset',
          'exclude' => 1,
        ),
        'description' => 'Additional settings for making this site unique',
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
    'weight' => '4',
    'fields' => array(
      '0' => 'field_inst_contact_block',
      '1' => 'field_footer',
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Additional Settings');
  t('Content');
  t('Section Info');

  return $groups;
}
