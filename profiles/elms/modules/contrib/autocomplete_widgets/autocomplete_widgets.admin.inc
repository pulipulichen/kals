<?php

/**
 * @file
 * Administration related code for Autocomplete Widgets module.
 */

/**
 * Implementation of hook_field_widget_settings_form().
 */
function _autocomplete_widgets_field_widget_settings_form($field, $instance) {
  $widget = $instance['widget'];
  $settings = $widget['settings'];

  $form = array();
  $form['size'] = array(
    '#type' => 'textfield',
    '#title' => t('Size of textfield'),
    '#default_value' => $settings['size'],
    '#element_validate' => array('_element_validate_integer_positive'),
    '#required' => TRUE,
  );

  $form['autocomplete_match'] = array(
    '#type' => 'select',
    '#title' => t('Autocomplete matching'),
    '#default_value' => $settings['autocomplete_match'],
    '#options' => array('starts_with' => t('Starts with'), 'contains' => t('Contains')),
    '#description' => t('Select the method used to collect autocomplete suggestions. Note that <em>Contains</em> can cause performance issues on sites with thousands of records.'),
  );
  if ($widget['type'] != 'autocomplete_widgets_node_reference') {
    $form['autocomplete_case'] = array(
      '#type' => 'radios',
      '#title' => t('Case sensitive'),
      '#default_value' => $settings['autocomplete_case'],
      '#options' => array(0 => t('Disabled'), 1 => t('Enabled')),
    );
  }

  switch ($widget['type']) {
    case 'autocomplete_widgets_flddata':
    case 'autocomplete_widgets_suggested':
      $form['autocomplete_case']['#description'] = t('Case-insensitive queries are implemented using the <a href="!function-lower-url">LOWER()</a> function in combination with the <a href="!operator-like-url">LIKE</a> operator.', array(
        '!function-lower-url' => 'http://dev.mysql.com/doc/refman/5.1/en/string-functions.html#function_lower',
        '!operator-like-url' => 'http://dev.mysql.com/doc/refman/5.1/en/string-comparison-functions.html#operator_like',
      ));
      $db_type = Database::getConnection()->databaseType();
      if (in_array($db_type, array('mysql', 'mysqli'))) {
        $form['autocomplete_case']['#description'] .= ' '. t('Note that MySQL might ignore case sensitivity depending on the collation used in your database definition (see <a href="!mysql-i18n-l10n-url">Internationalization and Localization</a> chapter in the MySQL manual). If you need case insensitive checks, it is recommended (for performance reasons) to use a case insensitive collation as well (such as utf8_general_ci), rather than disabling the case sensitive option here.', array(
          '!mysql-i18n-l10n-url' => 'http://dev.mysql.com/doc/refman/5.1/en/internationalization-localization.html',
        ));
      }
      elseif ($db_type == 'pgsql') {
        $form['autocomplete_case']['#description'] .= ' '. t('You may want to create an expression index using the LOWER() function to speed up this kind of queries in PostgreSQL (See <a href="!indexes-expressional-url">Indexes on Expressions</a>).', array(
          '!indexes-expressional-url' => 'http://www.postgresql.org/docs/8.4/static/indexes-expressional.html',
        ));
      }
      break;
    case 'autocomplete_widgets_allowvals':
      $form['autocomplete_case']['#description'] = t('Case-insensitive queries are implemented using the function <a href="!drupal-strtolower-url">drupal_strtolower()</a>.', array(
        '!drupal-strtolower-url' => 'http://api.drupal.org/api/function/drupal_strtolower/6',
      ));
      break;
  }

  $form['autocomplete_xss'] = array(
    '#type' => 'radios',
    '#title' => t('Filter HTML'),
    '#default_value' => (isset($widget['autocomplete_xss']) ? $widget['autocomplete_xss'] : 0),
    '#options' => array(0 => t('Disabled'), 1 => t('Enabled')),
    '#description' => t('Enable this option to filter out HTML in display of values.'),
  );
  if (($widget['type'] == 'autocomplete_widgets_flddata') && module_exists('i18n')) {
    $form['i18n_flddata'] = array(
      '#type' => 'radios',
      '#title' => t('Internationalization support'),
      '#default_value' => (isset($widget['i18n_flddata']) ? $widget['i18n_flddata'] : 0),
      '#options' => array(0 => t('Disabled'), 1 => t('Enabled')),
      '#description' => t('Enable this option to provide a different set of allowed values based on the language their nodes are assigned to. This option is only available when <a href="@i18n-project-page">Internationalization</a> module is enabled.', array('@i18n-project-page' => 'http://drupal.org/project/i18n')),
    );
  }
  else {
    $form['i18n_flddata'] = array(
      '#type' => 'value',
      '#value' => 0,
    );
  }

  if ($widget['type'] == 'autocomplete_widgets_suggested') {
    $settings['suggested_values'] = !isset($settings['suggested_values']) ? '' : $settings['suggested_values'];
    $form['suggested_values'] = array(
      '#type' => 'textarea',
      '#title' => t('Suggeset values list'),
      '#default_value' => $settings['suggested_values'],
      '#rows' => 10,
      '#description' => t('Autocomplete requests will only respond with suggestions from this list. If a user enters a value not on this list, it will <em>not</em> be added to the autocomplete options in the future. Enter one suggestion per line.'),
    );
  }

  if ($widget['type'] == 'autocomplete_widgets_node_reference') {
    $settings['allowed_node_types'] = !isset($settings['allowed_node_types']) ? array() : $settings['allowed_node_types'];
    $types = _node_types_build()->types;
    $options= array();
    foreach ($types as $key => $value) {
      $options[$key] = $value->name;
    }
    $form['allowed_node_types'] = array(
      '#type' => 'checkboxes',
      '#title' => t('Allowed node types'),
      '#options' => $options,
      '#default_value' => $settings['allowed_node_types'],
      '#description' => t('Autocomplete suggestions will be based on the titles of the selected nodes and existing field values.'),
    );
  }

  return $form;

}
