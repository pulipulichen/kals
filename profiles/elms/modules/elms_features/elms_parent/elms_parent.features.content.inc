<?php

/**
 * Implements hook_content_default_fields().
 */
function elms_parent_content_default_fields() {
  $fields = array();

  // Exported field: field_description
  $fields['parent-field_description'] = array(
    'field_name' => 'field_description',
    'type_name' => 'parent',
    'display_settings' => array(
      'weight' => '20',
      'parent' => 'group_documentation',
      'label' => array(
        'format' => 'hidden',
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
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'rows' => '3',
      'size' => 60,
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_description][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Description',
      'weight' => '9',
      'description' => 'What would be listed in the bluebook that describes the course in a meaningful way to students.',
      'type' => 'text_textarea',
      'module' => 'text',
    ),
  );

  // Exported field: field_faculty_resources
  $fields['parent-field_faculty_resources'] = array(
    'field_name' => 'field_faculty_resources',
    'type_name' => 'parent',
    'display_settings' => array(
      'weight' => '23',
      'parent' => 'group_documentation',
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
    'type' => 'filefield',
    'required' => '0',
    'multiple' => '1',
    'module' => 'filefield',
    'active' => '1',
    'list_field' => '0',
    'list_default' => 1,
    'description_field' => '1',
    'widget' => array(
      'file_extensions' => 'txt doc docx pdf',
      'file_path' => '',
      'progress_indicator' => 'bar',
      'max_filesize_per_file' => '20M',
      'max_filesize_per_node' => '',
      'label' => 'Faculty Resources',
      'weight' => '23',
      'description' => 'Upload documents that could help facilitate course communication between faculty members and instructional designers',
      'type' => 'filefield_widget',
      'module' => 'filefield',
    ),
  );

  // Exported field: field_id_of_record
  $fields['parent-field_id_of_record'] = array(
    'field_name' => 'field_id_of_record',
    'type_name' => 'parent',
    'display_settings' => array(
      'weight' => '25',
      'parent' => 'group_additional_settings',
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
    'type' => 'userreference',
    'required' => '0',
    'multiple' => '0',
    'module' => 'userreference',
    'active' => '1',
    'referenceable_roles' => array(
      '6' => 6,
      '2' => 0,
      '3' => 0,
      '4' => 0,
      '9' => 0,
      '10' => 0,
      '8' => 0,
    ),
    'referenceable_status' => '1',
    'advanced_view' => 'elms_parent_get_ids',
    'advanced_view_args' => '',
    'widget' => array(
      'autocomplete_match' => 'contains',
      'size' => 60,
      'reverse_link' => 0,
      'default_value' => array(
        '0' => array(
          'uid' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'ID of Record',
      'weight' => '19',
      'description' => 'Use this to establish who is principally responsible for this course running.  This information is used in administrative views for planning purposes.',
      'type' => 'userreference_select',
      'module' => 'userreference',
    ),
  );

  // Exported field: field_initial_parent_launch
  $fields['parent-field_initial_parent_launch'] = array(
    'field_name' => 'field_initial_parent_launch',
    'type_name' => 'parent',
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
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => 'sp05|Spring 05
su05|Summer 05
fa05|Fall 05
sp06|Spring 06
su06|Summer 06
fa06|Fall 06
sp07|Spring 07
su07|Summer 07
fa07|Fall 07
sp08|Spring 08
su08|Summer 08
fa08|Fall 08
sp09|Spring 09
su09|Summer 09
fa09|Fall 09
sp10|Spring 10
su10|Summer 10
fa10|Fall 10
sp11|Spring 11
su11|Summer 11
fa11|Fall 11
sp12|Spring 12
su12|Summer 12
fa12|Fall 12',
    'allowed_values_php' => '',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Initial Course Launch',
      'weight' => '20',
      'description' => 'The semester and year that the course was initially ran.  This is useful for showing our growth across time.',
      'type' => 'optionwidgets_select',
      'module' => 'optionwidgets',
    ),
  );

  // Exported field: field_lead_faculty
  $fields['parent-field_lead_faculty'] = array(
    'field_name' => 'field_lead_faculty',
    'type_name' => 'parent',
    'display_settings' => array(
      'weight' => '26',
      'parent' => 'group_additional_settings',
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
    'type' => 'userreference',
    'required' => '0',
    'multiple' => '0',
    'module' => 'userreference',
    'active' => '1',
    'referenceable_roles' => array(
      '4' => 4,
      '2' => 0,
      '3' => 0,
      '6' => 0,
      '9' => 0,
      '10' => 0,
      '11' => 0,
      '8' => 0,
    ),
    'referenceable_status' => '1',
    'advanced_view' => 'elms_parent_get_insts',
    'advanced_view_args' => '',
    'widget' => array(
      'autocomplete_match' => 'contains',
      'size' => '20',
      'reverse_link' => 0,
      'default_value' => array(
        '0' => array(
          'uid' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Lead Faculty',
      'weight' => '21',
      'description' => '',
      'type' => 'userreference_select',
      'module' => 'userreference',
    ),
  );

  // Exported field: field_link_more_info
  $fields['parent-field_link_more_info'] = array(
    'field_name' => 'field_link_more_info',
    'type_name' => 'parent',
    'display_settings' => array(
      'weight' => '21',
      'parent' => 'group_documentation',
      'label' => array(
        'format' => 'hidden',
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
    'type' => 'link',
    'required' => '0',
    'multiple' => '1',
    'module' => 'link',
    'active' => '1',
    'attributes' => array(
      'target' => 'default',
      'rel' => 'nofollow',
      'class' => '',
      'title' => 'Click to access [title]',
    ),
    'display' => array(
      'url_cutoff' => '80',
    ),
    'url' => 0,
    'title' => 'required',
    'title_value' => '',
    'enable_tokens' => 0,
    'validate_url' => 1,
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'title' => '',
          'url' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Link to more Info',
      'weight' => '10',
      'description' => 'Use this to link to an external resources that has additional information about the course.  The most common use for this is a university bulletin',
      'type' => 'link',
      'module' => 'link',
    ),
  );

  // Exported field: field_listing_only
  $fields['parent-field_listing_only'] = array(
    'field_name' => 'field_listing_only',
    'type_name' => 'parent',
    'display_settings' => array(
      'weight' => '28',
      'parent' => 'group_additional_settings',
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
    'type' => 'text',
    'required' => '0',
    'multiple' => '1',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => 'list|List Course Name Only',
    'allowed_values_php' => '',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Listing Only',
      'weight' => '-2',
      'description' => 'Check this box to indicate that you only want to list the fact that a course exists but not to create pages and versions in the system.  By default ELMS will automatically create a version to work off of, this disables this functionality.  Use this in instances where you want to list a course using ELMS but not build out a space (you can always build one in the future).',
      'type' => 'optionwidgets_buttons',
      'module' => 'optionwidgets',
    ),
  );

  // Exported field: field_parent_name
  $fields['parent-field_parent_name'] = array(
    'field_name' => 'field_parent_name',
    'type_name' => 'parent',
    'display_settings' => array(
      'weight' => '7',
      'parent' => '',
      'label' => array(
        'format' => 'hidden',
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
    'type' => 'text',
    'required' => '1',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'rows' => 5,
      'size' => '60',
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_parent_name][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Name',
      'weight' => '-3',
      'description' => 'The name of the course as it would be listed in university course listings.  Examples:
Art 010
Dance 100
IST 110
Art 122 Y',
      'type' => 'text_textfield',
      'module' => 'text',
    ),
  );

  // Exported field: field_parent_promotion
  $fields['parent-field_parent_promotion'] = array(
    'field_name' => 'field_parent_promotion',
    'type_name' => 'parent',
    'display_settings' => array(
      'weight' => '24',
      'parent' => 'group_documentation',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'image_plain',
        'exclude' => 1,
      ),
      'full' => array(
        'format' => 'image_plain',
        'exclude' => 1,
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
    'description_field' => '0',
    'widget' => array(
      'file_extensions' => 'png gif jpg jpeg',
      'file_path' => '',
      'progress_indicator' => 'bar',
      'max_filesize_per_file' => '2MB',
      'max_filesize_per_node' => '10MB',
      'max_resolution' => '0',
      'min_resolution' => '0',
      'alt' => 'Sample Course Screenshot',
      'custom_alt' => 1,
      'title' => 'Sample Course Screenshot',
      'custom_title' => 1,
      'title_type' => 'textfield',
      'default_image' => array(
        'filename' => 'defaultcourseimage.jpg',
        'filepath' => 'profiles/elms/images/defaultcourseimage.jpg',
        'filemime' => 'image/jpeg',
        'source' => 'default_image_upload',
        'destination' => 'profiles/elms/images/defaultcourseimage.jpg',
        'filesize' => 804195,
        'uid' => '1',
        'status' => 1,
        'timestamp' => 1322680167,
        'origname' => '',
        'fid' => '54',
      ),
      'use_default_image' => 1,
      'label' => 'Course Promotion',
      'weight' => '11',
      'description' => 'Upload images that are representative of the course',
      'type' => 'imagefield_widget',
      'module' => 'imagefield',
    ),
  );

  // Exported field: field_parent_title
  $fields['parent-field_parent_title'] = array(
    'field_name' => 'field_parent_title',
    'type_name' => 'parent',
    'display_settings' => array(
      'weight' => '8',
      'parent' => '',
      'label' => array(
        'format' => 'hidden',
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
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'rows' => 5,
      'size' => '60',
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_parent_title][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Title',
      'weight' => '8',
      'description' => 'Examples:
Introduction to World Music
The Evolution of Jazz
Advanced Network Design',
      'type' => 'text_textfield',
      'module' => 'text',
    ),
  );

  // Exported field: field_past_faculty
  $fields['parent-field_past_faculty'] = array(
    'field_name' => 'field_past_faculty',
    'type_name' => 'parent',
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
    'type' => 'userreference',
    'required' => '0',
    'multiple' => '1',
    'module' => 'userreference',
    'active' => '1',
    'referenceable_roles' => array(
      '2' => 0,
      '3' => 0,
      '6' => 0,
      '4' => 0,
      '9' => 0,
      '10' => 0,
      '11' => 0,
      '8' => 0,
    ),
    'referenceable_status' => '',
    'advanced_view' => 'elms_parent_get_insts',
    'advanced_view_args' => '',
    'widget' => array(
      'autocomplete_match' => 'contains',
      'size' => 60,
      'reverse_link' => 0,
      'default_value' => array(
        '0' => array(
          'uid' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Past Faculty',
      'weight' => '22',
      'description' => '',
      'type' => 'userreference_select',
      'module' => 'userreference',
    ),
  );

  // Exported field: field_prerequisites
  $fields['parent-field_prerequisites'] = array(
    'field_name' => 'field_prerequisites',
    'type_name' => 'parent',
    'display_settings' => array(
      'weight' => '27',
      'parent' => 'group_additional_settings',
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
    'required' => '0',
    'multiple' => '1',
    'module' => 'nodereference',
    'active' => '1',
    'referenceable_types' => array(
      'parent' => 'parent',
      'accessibility_guideline' => 0,
      'accessibility_test' => 0,
      'elms_event' => 0,
      'folder' => 0,
      'link' => 0,
      'page' => 0,
      'promo' => 0,
      'reaction' => 0,
      'studio_submission' => 0,
      'site' => 0,
    ),
    'advanced_view' => '--',
    'advanced_view_args' => '',
    'widget' => array(
      'autocomplete_match' => 'contains',
      'size' => '60',
      'default_value' => array(
        '0' => array(
          'nid' => NULL,
          '_error_element' => 'default_value_widget][field_prerequisites][0][nid][nid',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Prerequisites',
      'weight' => '24',
      'description' => 'List parents required in order to take this one.',
      'type' => 'nodereference_autocomplete',
      'module' => 'nodereference',
    ),
  );

  // Exported field: field_required_plugins
  $fields['parent-field_required_plugins'] = array(
    'field_name' => 'field_required_plugins',
    'type_name' => 'parent',
    'display_settings' => array(
      'weight' => '12',
      'parent' => 'group_requirements',
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
    'type' => 'text',
    'required' => '0',
    'multiple' => '1',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => 'flash|Flash
silverlight|Silver Light
pdf|PDF Reader (Adobe / Other)
quicktime|Quick Time
java|Java
html5|HTML 5
realplayer|Real Player
wmp|Windows Media Player
gears|Google Gears
director|Adobe Director',
    'allowed_values_php' => '',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => 'flash',
        ),
        '1' => array(
          'value' => 'pdf',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Plugin',
      'weight' => '12',
      'description' => 'Select the plugins required to take this course.',
      'type' => 'optionwidgets_buttons',
      'module' => 'optionwidgets',
    ),
  );

  // Exported field: field_sample_materials
  $fields['parent-field_sample_materials'] = array(
    'field_name' => 'field_sample_materials',
    'type_name' => 'parent',
    'display_settings' => array(
      'weight' => '22',
      'parent' => 'group_documentation',
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
    'type' => 'filefield',
    'required' => '0',
    'multiple' => '1',
    'module' => 'filefield',
    'active' => '1',
    'list_field' => '0',
    'list_default' => 1,
    'description_field' => '1',
    'widget' => array(
      'file_extensions' => 'txt doc pdf docx xls xlsx',
      'file_path' => '',
      'progress_indicator' => 'bar',
      'max_filesize_per_file' => '10M',
      'max_filesize_per_node' => '',
      'label' => 'Sample Materials',
      'weight' => '12',
      'description' => 'Use this for uploading syllabi and other sample materials to give students a feel for the course.',
      'type' => 'filefield_widget',
      'module' => 'filefield',
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Course Promotion');
  t('Description');
  t('Faculty Resources');
  t('ID of Record');
  t('Initial Course Launch');
  t('Lead Faculty');
  t('Link to more Info');
  t('Listing Only');
  t('Name');
  t('Past Faculty');
  t('Plugin');
  t('Prerequisites');
  t('Sample Materials');
  t('Title');

  return $fields;
}
