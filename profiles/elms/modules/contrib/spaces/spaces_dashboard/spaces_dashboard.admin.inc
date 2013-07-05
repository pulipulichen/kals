<?php

/**
 * Form for adding/editing custom Dashboards.
 */
function spaces_dashboard_add($form, &$form_state) {
  $custom = variable_get('spaces_dashboard_custom', array('custom-1' => t('Dashboard')));
  $form = array();
  $form['spaces_dashboard_custom'] = array(
    '#description' => t('Enter a label for each dashboard you would like to use. To remove a custom dashboard clear its field.'),
    '#title' => t('Custom dashboards'),
    '#tree' => TRUE,
    '#type' => 'fieldset',
  );
  for ($i = 1; $i < 6; $i++) {
    $form['spaces_dashboard_custom']["custom-{$i}"] = array(
      '#type' => 'textfield',
      '#default_value' => isset($custom["custom-{$i}"]) ? $custom["custom-{$i}"] : '',
      '#element_validate' => array('spaces_dashboard_add_validate'),
    );
  }
  return system_settings_form($form);
}

/**
 * Element validator for custom Dashboards.
 */
function spaces_dashboard_add_validate($element, &$form_state) {
  $value = trim($element['#value']);
  $key = end($element['#parents']);
  if ($key === 'custom-1' && empty($value)) {
    $form_state['values']['spaces_dashboard_custom'][$key] = t('Dashboard');
  }
  else {
    $form_state['values']['spaces_dashboard_custom'][$key] = $value;
  }
}

/**
 * Provide a form that allows administrators to select which blocks are
 * available in which dashboards.
 */
function spaces_dashboard_admin_form($form, &$form_state) {
  $blocks = context_get_plugin('reaction', 'block')->get_blocks(NULL, NULL, TRUE);
  $default = variable_get('spaces_dashboard_blocks', array());
  $form['spaces_dashboard_blocks'] = array(
    '#tree' => TRUE,
    '#theme' => 'spaces_dashboard_admin_form',
  );
  ksort($blocks);
  foreach ($blocks as $k => $block) {
    $module = spaces_dashboard_get_module($block);
    $info = system_get_info('module', $module);
    $form['spaces_dashboard_blocks'][$k] = array(
      '#type' => 'checkbox',
      '#title' => $block->info,
      '#grouping' => $info['name'],
      '#grouping_id' => $module,
    );
    if (isset($default[$k])) {
      $form['spaces_dashboard_blocks'][$k]['#default_value'] = $default[$k];
    }
  }
  return system_settings_form($form);
}

/**
 * Validation for spaces_dashboard_admin_form, actually just limits what is
 * saved to what needs to be saved.
 */
function spaces_dashboard_admin_form_validate($form, &$form_state) {
  $form_state['values']['spaces_dashboard_blocks'] = array_filter($form_state['values']['spaces_dashboard_blocks']);
}

/**
 * Allow administrators to select which regions and layouts are available
 * in dashboards.
 */
function spaces_dashboard_admin_region_form($form, $form_state) {
  $theme_key = variable_get('theme_default', 'garland');
  $layouts = module_exists('context_layouts') ? context_layouts_get_layouts($theme_key) : array();
  if (empty($layouts)) {
    $layouts['default'] = array(
      'title' => t('Default'),
      'description' => t('Default layout'),
      'regions' => array_keys(system_region_list($theme_key)),
    );
  }

  $region_labels = system_region_list($theme_key);

  $form = array();
  $form['spaces_dashboard_layouts'] = array('#tree' => TRUE);
  $form['spaces_dashboard_regions'] = array('#tree' => TRUE);

  $default_layouts = variable_get('spaces_dashboard_layouts', array());
  $default_regions = variable_get('spaces_dashboard_regions', array());

  foreach ($layouts as $k => $v) {
    if (!empty($v['regions'])) {
      $form['spaces_dashboard_layouts'][$k] = array(
        '#type' => 'checkbox',
        '#title' => isset($v['name']) ? $v['name'] : $k,
        '#description' => isset($v['description']) ? $v['description'] : NULL,
        '#default_value' => isset($default_layouts[$k]) ? $default_layouts[$k] : TRUE,
      );
      foreach ($v['regions'] as $region) {
        $form['spaces_dashboard_regions'][$k][$region] = array(
          '#type' => 'checkbox',
          '#title' => check_plain($region_labels[$region]),
          '#grouping' => isset($v['name']) ? check_plain($v['name']) : $k,
          '#grouping_id' => $k,
          '#default_value' => isset($default_regions[$k][$region]) ? $default_regions[$k][$region] : TRUE,
        );
      }
    }
  }
  $form = system_settings_form($form);
  $form['#theme'] = 'spaces_dashboard_admin_region_form';
  return $form;
}

