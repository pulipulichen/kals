<?php

/**
 * Implements hook_content_default_fields().
 */
function elms_schedule_content_default_fields() {
  $fields = array();

  // Exported field: field_color
  $fields['elms_event-field_color'] = array(
    'field_name' => 'field_color',
    'type_name' => 'elms_event',
    'display_settings' => array(
      'weight' => '13',
      'parent' => 'group_additional_settings',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'token' => array(
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
    ),
    'widget_active' => '1',
    'type' => 'colorpicker_cck_textfield',
    'required' => '0',
    'multiple' => '0',
    'module' => 'colorpicker_cck',
    'active' => '1',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => '#FFFFFF',
          '_error_element' => 'default_value_widget][field_color][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Color',
      'weight' => '13',
      'description' => 'The background color of the item in schedules and related displays',
      'type' => 'colorpicker_cck',
      'module' => 'colorpicker_cck',
    ),
  );

  // Exported field: field_date_mod_text
  $fields['elms_event-field_date_mod_text'] = array(
    'field_name' => 'field_date_mod_text',
    'type_name' => 'elms_event',
    'display_settings' => array(
      'weight' => '4',
      'parent' => 'group_dates',
      'label' => array(
        'format' => 'above',
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
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => 'Due
Complete by
Attend on',
    'allowed_values_php' => '',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Date Modifier',
      'weight' => '4',
      'description' => 'Use this to prefix the start date value when presented in the schedule.  i.e. "Due by Mon 12/12" or "Complete by Fri 12/15".',
      'type' => 'optionwidgets_select',
      'module' => 'optionwidgets',
    ),
  );

  // Exported field: field_detail_text
  $fields['elms_event-field_detail_text'] = array(
    'field_name' => 'field_detail_text',
    'type_name' => 'elms_event',
    'display_settings' => array(
      'weight' => '1',
      'parent' => 'group_event_text',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'token' => array(
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
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '75',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'rows' => 5,
      'size' => '60',
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_detail_text][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Details',
      'weight' => '-3',
      'description' => 'Additional details, this is typically a location or action details and is limited to 75 characters',
      'type' => 'text_textfield',
      'module' => 'text',
    ),
  );

  // Exported field: field_due_date
  $fields['elms_event-field_due_date'] = array(
    'field_name' => 'field_due_date',
    'type_name' => 'elms_event',
    'display_settings' => array(
      'weight' => '5',
      'parent' => 'group_dates',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'schedule_date',
        'exclude' => 0,
      ),
      'token' => array(
        'format' => 'schedule_date',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'schedule_date',
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
    ),
    'widget_active' => '1',
    'type' => 'date',
    'required' => '0',
    'multiple' => '0',
    'module' => 'date',
    'active' => '1',
    'granularity' => array(
      'year' => 'year',
      'month' => 'month',
      'day' => 'day',
    ),
    'timezone_db' => '',
    'tz_handling' => 'none',
    'todate' => '',
    'repeat' => 0,
    'repeat_collapsed' => '',
    'default_format' => 'schedule_date',
    'widget' => array(
      'default_value' => 'blank',
      'default_value_code' => '',
      'default_value2' => 'same',
      'default_value_code2' => '',
      'input_format' => 'D, m/d/Y',
      'input_format_custom' => '',
      'increment' => '1',
      'text_parts' => array(),
      'year_range' => '-0:+1',
      'label_position' => 'above',
      'label' => 'Start Date',
      'weight' => '5',
      'description' => 'If this is a range, this is the beginning of the range.  If it is a single date this will act as the due-date for the event.',
      'type' => 'date_popup',
      'module' => 'date',
    ),
  );

  // Exported field: field_due_time
  $fields['elms_event-field_due_time'] = array(
    'field_name' => 'field_due_time',
    'type_name' => 'elms_event',
    'display_settings' => array(
      'weight' => '6',
      'parent' => 'group_dates',
      'label' => array(
        'format' => 'above',
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
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '7',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'rows' => 5,
      'size' => '7',
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_due_time][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Time',
      'weight' => '6',
      'description' => 'If the due-date has a time that day the event is due then specify that here (format hh:mmPM)',
      'type' => 'text_textfield',
      'module' => 'text',
    ),
  );

  // Exported field: field_end_date
  $fields['elms_event-field_end_date'] = array(
    'field_name' => 'field_end_date',
    'type_name' => 'elms_event',
    'display_settings' => array(
      'weight' => '7',
      'parent' => 'group_dates',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'schedule_date',
        'exclude' => 0,
      ),
      'token' => array(
        'format' => 'schedule_date',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'schedule_date',
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
    ),
    'widget_active' => '1',
    'type' => 'date',
    'required' => '0',
    'multiple' => '0',
    'module' => 'date',
    'active' => '1',
    'granularity' => array(
      'year' => 'year',
      'month' => 'month',
      'day' => 'day',
    ),
    'timezone_db' => '',
    'tz_handling' => 'none',
    'todate' => '',
    'repeat' => 0,
    'repeat_collapsed' => '',
    'default_format' => 'schedule_date',
    'widget' => array(
      'default_value' => 'blank',
      'default_value_code' => '',
      'default_value2' => 'same',
      'default_value_code2' => '',
      'input_format' => 'D, m/d/Y',
      'input_format_custom' => '',
      'increment' => '1',
      'text_parts' => array(),
      'year_range' => '-0:+1',
      'label_position' => 'above',
      'label' => 'End Date',
      'weight' => '7',
      'description' => 'Only use this if this is a date range',
      'type' => 'date_popup',
      'module' => 'date',
    ),
  );

  // Exported field: field_event_content_ref
  $fields['elms_event-field_event_content_ref'] = array(
    'field_name' => 'field_event_content_ref',
    'type_name' => 'elms_event',
    'display_settings' => array(
      'weight' => '14',
      'parent' => 'group_additional_settings',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'plain',
        'exclude' => 0,
      ),
      'token' => array(
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
    'advanced_view' => 'elms_site_get_outlines',
    'advanced_view_args' => '',
    'widget' => array(
      'autocomplete_match' => 'contains',
      'size' => '10',
      'default_value' => array(
        '0' => array(
          'nid' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Content',
      'weight' => '4',
      'description' => 'Use this to link a course event to a piece of course content.  Anytime the content lives in this course you should use this field.',
      'type' => 'nodereference_select',
      'module' => 'nodereference',
    ),
  );

  // Exported field: field_event_name
  $fields['elms_event-field_event_name'] = array(
    'field_name' => 'field_event_name',
    'type_name' => 'elms_event',
    'display_settings' => array(
      'weight' => 0,
      'parent' => 'group_event_text',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'token' => array(
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
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '40',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'rows' => 5,
      'size' => '20',
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_event_name][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Name',
      'weight' => '-4',
      'description' => 'Title of the event / action.  This is limited to 40 characters',
      'type' => 'text_textfield',
      'module' => 'text',
    ),
  );

  // Exported field: field_event_type
  $fields['elms_event-field_event_type'] = array(
    'field_name' => 'field_event_type',
    'type_name' => 'elms_event',
    'display_settings' => array(
      'weight' => '-4',
      'parent' => '',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'token' => array(
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
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => 'activity|Activity
assessment|Assessment
assignment|Assignment
discussion|Discussion
lecture|Lecture
reading|Reading',
    'allowed_values_php' => '',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Type',
      'weight' => '-2',
      'description' => 'Changing Type will provide a visual way for learners to view the scheduled events in the course.  It is also used for filtering of items. Example: A student wants to know the points values of all Assignments in the course.',
      'type' => 'optionwidgets_select',
      'module' => 'optionwidgets',
    ),
  );

  // Exported field: field_score_value
  $fields['elms_event-field_score_value'] = array(
    'field_name' => 'field_score_value',
    'type_name' => 'elms_event',
    'display_settings' => array(
      'weight' => '12',
      'parent' => 'group_additional_settings',
      'label' => array(
        'format' => 'above',
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
    'type' => 'number_integer',
    'required' => '0',
    'multiple' => '0',
    'module' => 'number',
    'active' => '1',
    'prefix' => '',
    'suffix' => '',
    'min' => '',
    'max' => '',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_score_value][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Score Value',
      'weight' => '12',
      'description' => 'Use this value to associate points to this event.  This is useful for communicating the weight of a test, assignment or attendance relative to the course as a whole.  You can tell the course to interpret this value as a percentage or a point value.',
      'type' => 'number',
      'module' => 'number',
    ),
  );

  // Exported field: field_task_link
  $fields['elms_event-field_task_link'] = array(
    'field_name' => 'field_task_link',
    'type_name' => 'elms_event',
    'display_settings' => array(
      'weight' => '15',
      'parent' => 'group_additional_settings',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'plain',
        'exclude' => 0,
      ),
      'token' => array(
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
    ),
    'widget_active' => '1',
    'type' => 'link',
    'required' => '0',
    'multiple' => '0',
    'module' => 'link',
    'active' => '1',
    'attributes' => array(
      'target' => '_blank',
      'rel' => 'nofollow',
      'class' => '',
      'title' => '[title]',
    ),
    'display' => array(
      'url_cutoff' => '40',
    ),
    'url' => 0,
    'title' => 'none',
    'title_value' => '',
    'enable_tokens' => 0,
    'validate_url' => 1,
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'url' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Task link',
      'weight' => '15',
      'description' => 'Use this to link the event Name to an external source',
      'type' => 'link',
      'module' => 'link',
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Color');
  t('Content');
  t('Date Modifier');
  t('Details');
  t('End Date');
  t('Name');
  t('Score Value');
  t('Start Date');
  t('Task link');
  t('Time');
  t('Type');

  return $fields;
}
