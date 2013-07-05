<?php

/**
 * Implementation of hook_settings().
 */
function _elms_parent_pages_settings() {
  $form = array();
  // get a list of all pages
  $pages = _elms_parent_pages_list_pages();
  // convert the list to a select format
  foreach ($pages as $key => $page) {
    $options[$key] = $page['title'];
  }
  $form['elms_parent_pages_default'] = array(
    '#description' => t('The default parent page to land on if multiple are available'),
    '#type' => 'select',
    '#multiple' => FALSE,
    '#title' => t('Default page'),
    '#options' => $options,
    '#default_value' => variable_get('elms_parent_pages_default', ''),
  );
  return system_settings_form($form);
}
