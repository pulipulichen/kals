<?php

/**
 * Spaces features form.
 */
function spaces_features_form($form, &$form_state) {
  $spaces_features = variable_get('spaces_features', array());

  $form['spaces_features'] = array('#tree' => TRUE);
  $form['labels'] = array('#tree' => FALSE);
  $form['settings'] = array('#tree' => FALSE);

  $space = spaces_get_space();
  $parent = menu_get_item();
  $features = spaces_features($space ? $space->type : 'site');
  ksort($features);
  foreach ($features as $feature => $info) {
    $label = "<strong>" . t($info->info['name']) . "</strong>";
    $label .= "<div class='description'>" . t($info->info['description']) . "</div>";
    $form['labels'][$feature] = array(
      '#type' => 'markup',
      '#markup' => $label,
    );
    $form['spaces_features'][$feature] = array(
      '#type' => 'select',
      '#options' => $space ? $space->feature_options() : array(
        0 => t('Disabled'),
        1 => t('Enabled'),
      ),
      '#default_value' => isset($spaces_features[$feature]) ? $spaces_features[$feature] : 0,
    );

    // By convention, features can provide settings pages at features/[feature].
    // This will detect the items that have been grafted from features/* onto the
    // portion of the menu tree that relates to this pace.
    $item = menu_get_item("{$parent['href']}/{$feature}");
    if ($item && $item['href'] != $parent['href'] && $item['access']) {
      $settings = l($item['title'], $item['href'], array('query' => array('destination' => $_GET['q'])));
    }
    else {
      $settings = '';
    }
    $form['settings'][$feature] = array(
      '#type' => 'markup',
      '#markup' => $settings,
    );
  }

  $options = $space ? array('spaces-frontpage' => '<' . t('Default page') . '>') : array();
  $links = menu_navigation_links(variable_get('menu_main_links_source', 'main-menu'));
  if (!empty($links)) {
    foreach ($links as $link) {
      $options[$link['href']] = $link['title'];
    }
  }
  $options['spaces-other'] = '<' . t('Other...') . '>';

  $front_page = variable_get('site_frontpage', 'node');

  ctools_include('dependent');
  $form['site_frontpage'] = array(
    '#type' => 'select',
    '#options' => $options,
    '#title' => t('Default front page'),
    '#default_value' => isset($options[$front_page]) ? $front_page : 'spaces-other',
    '#description' => t('The home page displays content from this menu item.'),
    '#element_validate' => array('spaces_site_frontpage_validate'),
  );
  $form['site_frontpage_path'] = array(
    '#type' => 'textfield',
    '#description' => t('A relative path to use as the front page.'),
    '#default_value' => $front_page,
    '#process' => array('ctools_dependent_process'),
    '#dependency' => array(
      'edit-site-frontpage' => array('spaces-other'),
    ),
  );

  $form = system_settings_form($form);
  $form['#theme'] = 'spaces_features_form';
  $form['buttons']['#weight'] = 100;
  return $form;
}

/**
 * Validation for site_frontpage setting in spaces forms.
 */
function spaces_site_frontpage_validate($element, &$form_state) {
  if ($element['#value'] == 'spaces-other') {
    $path = $form_state['values']['site_frontpage_path'];
    $form_state['values']['site_frontpage'] = $element['#value'] = $path;
    unset($form_state['values']['site_frontpage_path']);
  }
  if ($element['#value'] !== 'spaces-frontpage') {
    $item = menu_get_item($element['#value']);
    if (!$item) {
      form_error($element, t('Invalid front page selected'));
    }
  }
}

/**
 * Generate a form snippet for choosing a spaces preset.
 */
function spaces_preset_form($presets, $type, $include_disabled = FALSE) {
  $types = spaces_types();
  $form = array(
    '#tree' => FALSE,
    '#title' => isset($types[$type]['title']) ? $types[$type]['title'] : '',
    '#theme' => 'spaces_preset_form',
    '#space_type' => $type,
  );
  $form["spaces_preset_{$type}"] = array(
    '#type' => 'radios',
    '#options' => array(),
    '#default_value' => variable_get("spaces_preset_{$type}", NULL),
  );
  foreach ($presets as $preset) {
    if (empty($preset->disabled) || $include_disabled) {
      // Default preset radio
      if (empty($preset->disabled)) {
        $form["spaces_preset_{$preset->space_type}"]['#options'][$preset->name] = '';
      }

      // Label
      $label = "<strong>" . t(check_plain($preset->title)) . "</strong>";
      $label .= "<div class='description'>" . t(check_plain($preset->description)) . "</div>";
      $form['labels'][$preset->name] = array(
        '#type' => 'markup',
        '#markup' => $label,
      );
    }
  }
  return $form;
}

/**
 * Form for managing space override values.
 */
function spaces_overrides_form($form_state) {
  $space = spaces_get_space();
  $stack = array('space', 'preset');
  $form = array();
  if ($space) {
    foreach (array_keys(spaces_controllers()) as $controller) {
      foreach ($stack as $env) {
        foreach ($space->controllers->{$controller}->get(NULL, $env) as $key => $value) {
          if (!isset($form[$controller][$key])) {
            $form[$controller][$key] = array(
              '#type' => 'checkbox',
              '#title' => $key,
              '#disabled' => $env !== 'space',
              '#description' => $space->controllers->{$controller}->summary($key, $value),
              '#default_value' => NULL,
            );
          }
        }
      }
    }
    if (element_children($form)) {
      $form['#tree'] = TRUE;
      $form['#theme'] = 'spaces_overrides_form';
      $form['space'] = array(
        '#type' => 'value',
        '#value' => $space,
      );
      $presets = spaces_preset_load(NULL, $space->type);
      $default_preset = variable_get('spaces_preset_' . $space->type, NULL);
      if (isset($presets, $default_preset) && array_key_exists($default_preset, $presets) && spaces_access_admin_perms(array('administer spaces'))) {
        $preset_name = t($presets[$default_preset]->title);
        $form['preset'] = array(
          '#tree' => FALSE,
          '#type' => 'item',
          '#title' => t('Save'),
          '#description' => t('Save selected overrides from this space to the current preset <strong>@preset</strong>.', array('@preset' => $preset_name)),
        );
        $form['preset']['preset_save'] = array(
          '#type' => 'submit',
          '#value' => t('Save to preset'),
          '#submit' => array('spaces_overrides_preset_save'),
        );
      }
      $form['revert'] = array(
        '#tree' => FALSE,
        '#type' => 'item',
        '#title' => t('Revert'),
        '#description' => t('Revert the selected overrides for this space.'),
      );
      $form['revert']['revert'] = array(
        '#type' => 'submit',
        '#value' => t('Revert overrides'),
        '#submit' => array('spaces_overrides_revert'),
      );
    }
  }
  return $form;
}

/**
 * Submit handler for saving overrides to a preset.
 */
function spaces_overrides_preset_save(&$form, &$form_state) {
  $space = $form_state['values']['space'];
  $preset = spaces_preset_load(variable_get('spaces_preset_' . $space->type, NULL), NULL, TRUE);
  $selected = FALSE;
  $space->activate();
  foreach (array_keys(spaces_controllers()) as $controller) {
    $save = !empty($form_state['values'][$controller]) ? array_filter($form_state['values'][$controller]) : array();
    foreach (array_keys($save) as $key) {
      $override = $space->controllers->{$controller}->get($key, 'space');
      if ($override !== NULL) {
        $selected = TRUE;
        $preset->value[$controller][$key] = $override;
      }
    }
  }
  if ($selected) {
    spaces_preset_save($preset);
    drupal_set_message(t('Saved preset %title.', array('%title' => $preset->title)));
  }
  else {
    drupal_set_message(t('You need to select at least one override to save to the preset.'), 'error');
  }
}

/**
 * Submit handler for reverting overrides.
 */
function spaces_overrides_revert(&$form, &$form_state) {
  $space = $form_state['values']['space'];
  foreach (array_keys(spaces_controllers()) as $controller) {
    $remove = !empty($form_state['values'][$controller]) ? array_filter($form_state['values'][$controller]) : array();
    foreach (array_keys($remove) as $key) {
      $space->controllers->{$controller}->del($key);
    }
  }
  drupal_set_message(t('Saved %title.', array('%title' => $space->title())));
}

/**
 * Override of user/autocomplete. This accomplishes two things:
 * - Pushes the result set through db_rewrite_sql() which allows access
 *   conditions to be placed on the query.
 * - Uses a View, which allows implementing space types to filter the result
 *   set when a space is active.
 */
function spaces_user_autocomplete($string = '') {
  $space = spaces_get_space();
  $matches = array();
  if ($string) {
    $query = db_select('users', 'u')
    ->fields('u', array('name'))
    ->condition('u.name', db_like($string) . '%', 'LIKE')
    ->range(0, 10)
    ->addTag('user_autocomplete');

    // Add spaces specific tag. Every Spaces Controller should implement
    // hook_query_spaces_user_autocomplet_[TYPE]_alter.
    // @see spaces_og_query_spaces_user_autocomplete_og_alter()
    if (isset($spaces->type)) {
      $query->addTag('user_autocomplete_spaces');
      $query->addTag('user_autocomplete_spaces_' . $spaces->type);
    }

    $result = $query->execute();
    foreach ($result as $user) {
      $matches[$user->name] = check_plain($user->name);
    }
  }
  drupal_json_output($matches);
}
