<?php
/**
 * @file
 * ID best practice pages
 *
 * place holders for pages created by this module
 */

/**
 * Display Syllabus Page
 */
function _elms_id_best_practices_page_syllabus() {
  // get the group
  $group = og_context();
  return variable_get('elms_id_bp_syllabus', '');
}

/**
 * Display Help Page
 */
function _elms_id_best_practices_page_help() {
  // get the group
  $group = og_context();
  return variable_get('elms_id_bp_help', '');
}


/**
 * Settings form for book feature.
 */

/**
 * @todo Please document this function.
 * @see http://drupal.org/node/1354
 */
function elms_id_best_practices_settings($form, &$form_state) {
  // create directory just in-case of first load
  $dir = file_create_path(file_directory_path() . '/syllabi');
  file_prepare_directory($dir,   1);
  $form = array();
  $form['elms_id_bp_syllabus_type'] = array(
    '#default_value' => variable_get('elms_id_bp_syllabus_type', 'node'),
    '#description' => t('How you want to treat the syllabus in the course, if its an uploaded file or a piece of content to edit.'),
    '#type' => 'select',
    '#options' => array(
      'node' => 'Page of content',
      'upload' => 'Uploaded file',
    ),
    '#title' => t('Type of syllabus'),
  );
  $form['elms_id_bp_syllabus'] = array(
    '#default_value' => variable_get('elms_id_bp_syllabus', ''),
    '#description' => t('Upload your syllabus'),
    '#type' => 'file',
    '#size' => '10',
    '#title' => t('Syllabus'),
  );
  $form['elms_id_bp_help'] = array(
    '#default_value' => variable_get('elms_id_bp_help', 'Course Help'),
    '#description' => t('Text to display on the help page'),
    '#rows' => '3',
    '#cols' => '60',
    '#input_format' => '2',
    '#type' => 'textarea',
    '#title' => t('Help page'),
  );
  $form['elms_id_bp_instructor_block'] = array(
    '#default_value' => variable_get('elms_id_bp_instructor_block', ''),
    '#description' => t('Text to display in the instructor contact info block'),
    '#rows' => '3',
    '#cols' => '60',
    '#input_format' => '2',
    '#type' => 'textarea',
    '#title' => t('Instructor contact block'),
  );
  // render a select list based on a list of all available resources
  // TODO Please convert this statement to the D7 database API syntax.
  $result = db_query(db_rewrite_sql("SELECT nid,title FROM {node} as n WHERE n.type='elms_resource'"));
  $options = array();
  while ($val = db_fetch_array($result)) {
    $options[$val['nid']] = $val['title'];
  }
  $form['elms_id_bp_resources'] = array(
    '#default_value' => variable_get('elms_id_bp_resources', array()),
    '#description' => t('Select the resources you would like to use from the available list'),
    '#type' => 'select',
    '#multiple' => TRUE,
    '#title' => t('Resource list'),
    '#options' => $options,
  );
  // needs to be added for WYSIWYG to work correctly
  // $form['format'] = filter_form('2');
  // needs to be added so that we can successfully submit files
  $form['#attributes'] = array('enctype' => "multipart/form-data");
  return system_settings_form($form);
}

// validate the form values
/**
 * @todo Please document this function.
 * @see http://drupal.org/node/1354
 */
function elms_id_best_practices_settings_validate($form, &$form_state) {
  $form_state['storage']['elms_id_bp_syllabus'] = '';
  // create the theme logo area and validate its size
  $dir = file_create_path(file_directory_path() . '/syllabi');
  $is_writable = file_prepare_directory($dir, 1);
  if ($is_writable) {
    $validators = array(
      'file_validate_size' => array(20 * 1024),
      'file_validate_extensions' => array('pdf'),
    );
    if ($file = file_save_upload('elms_id_bp_syllabus', $validators, $dir)) {
      $form_state['storage']['elms_id_bp_syllabus'] = str_replace(' ', '%20', $file->filepath);
    }
  }
}
