<?php


/**
 * Theme function for spaces_presets_list_new().
 */
function template_preprocess_spaces_preset_list_new(&$vars) {
  drupal_add_css(drupal_get_path('module', 'spaces') .'/spaces.css');

  $form = &$vars['form'];
  $row = $header = array();
  foreach (element_children($form) as $key) {
    if (isset($form[$key]['#title'])) {
      $header[] = $form[$key]['#title'];
      unset($form[$key]['#title']);
    }
    else {
      $header[] = '';
    }
    $row[]['data'] = $form[$key];
    unset($form[$key]);
  }
  $table = array(
    'header' => $header,
    'rows' => array($row),
  );
  $vars['presets'] = theme('table', $table);
}
