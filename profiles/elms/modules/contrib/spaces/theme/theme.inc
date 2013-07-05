<?php

/**
 * Preprocessor for theme('spaces_features_form').
 */
function template_preprocess_spaces_features_form(&$vars) {
  $form = &$vars['form'];
  drupal_add_css(drupal_get_path('module', 'spaces') . '/spaces.css');
  $rows = array();
  if (isset($form['spaces_features'])) {
    foreach (element_children($form['spaces_features']) as $feature) {
      $rows[] = array(
        array(
          'class' => 'label',
          'data' => $form['labels'][$feature],
        ),
        array(
          'class' => 'option',
          'data' => $form['spaces_features'][$feature],
        ),
        array(
          'class' => 'actions',
          'data' => $form['settings'][$feature],
        ),
      );
    }
  }

  $table = array(
    'header' => array(),
    'rows' => $rows,
    'attributes' => array('class' => 'spaces')
  );
  $vars['features'] = theme('table', $table);

  unset($form['labels']);
  unset($form['spaces_features']);
  unset($form['settings']);
}


/**
 * Preprocessor for theme('spaces_preset_form').
 */
function template_preprocess_spaces_preset_form(&$variables) {
  $form = &$variables['form'];
  drupal_add_css(drupal_get_path('module', 'spaces') . '/spaces.css');
  $header = array(
    array(
      'data' => check_plain($form['#title']),
      'colspan' => isset($form['storage']) ? 4 : 3,
    )
  );
  $type = $form['#space_type'];
  $rows = array();
  if (!empty($form['#description'])) {
    $rows[] = array(
      array(
        'data' => "<div class='description'>{$form['#description']}</div>",
        'colspan' => isset($form['storage']) ? 4 : 3,
      )
    );
  }
  foreach (element_children($form["spaces_preset_{$type}"]) as $preset) {
    $row = array();
    $row[] = array(
      'class' => array('option'),
      'data' => $form["spaces_preset_{$type}"][$preset],
    );
    $row[] = array(
      'class' => array('label'),
      'data' => $form['labels'][$preset],
    );
    if (isset($form['storage'][$preset])) {
      $row[] = array(
        'class' => array('storage'),
        'data' => $form['storage'][$preset],
      );
    }
    $row[] = array(
      'class' => array('actions'),
      'data' => isset($form['actions'][$preset]) ? $form['actions'][$preset] : '',
    );
    $rows[] = array(
      'class' => !empty($form["spaces_preset_{$type}"][$preset]) ? array('enabled') : array('disabled'),
      'data' => $row,
    );
  }

  $table = array(
    'header' => $header,
    'rows' => $rows,
    'attributes' => array('class' => array('spaces'))
  );
  $variables['presets'] = theme('table', $table);

  unset($form["spaces_preset_{$type}"]);
  unset($form['labels']);
  unset($form['storage']);
  unset($form['actions']);
}

/**
 * Preprocessor for theme('spaces_overrides_form').
 */
function template_preprocess_spaces_overrides_form(&$variables) {
  drupal_add_js(drupal_get_path('module', 'spaces') . '/spaces.js');
  drupal_add_css(drupal_get_path('module', 'spaces') . '/spaces.css');
  drupal_add_js('misc/tableselect.js');

  $form = &$variables['form'];
  $header = array(
    array(
      'class' => array('select-all'),
      'colspan' => 1,
    ),
    array(
      'data' => t('Type'),
      'colspan' => 1,
    ),
    array(
      'data' => t('Override value'),
      'colspan' => 2,
    ),
  );
  $rows = array();
  foreach (array_keys(spaces_controllers()) as $controller) {
    if (!empty($form[$controller])) {
      foreach (element_children($form[$controller]) as $key) {
        $label = $form[$controller][$key]['#title'];
        $value = $form[$controller][$key]['#description'];
        $inherited = !empty($form[$controller][$key]['#disabled']);
        unset($form[$controller][$key]['#title'], $form[$controller][$key]['#description']);

        $row = array(
          'data' => array(
            array(
              'class' => array('option'),
              'data' => $form[$controller][$key],
            ),
            array(
              'class' => array('controller'),
              'data' => $controller,
            ),
            array(
              'class' => array('key'),
              'data' => l($label, $_GET['q'], array('fragment' => $key)) . '<span class="override-value"><pre>' .  $value . '</pre></span>',
              'colspan' => $inherited ? 1 : 2,
            ),
          ),
        );
        if ($inherited) {
          $row['class'] = array('inherited');
          $row['data'][] = array(
            'class' => array('tag'),
            'data' => t('inherited'),
          );
        }
        $rows[] = $row;
      }
    }
    unset($form[$controller]);
  }
  if (count($rows)) {
    if (isset($form['preset'])) {
      $preset_label = $form['preset']['#title'];
      unset($form['preset']['#title']);
      $rows[] = array(
        array(
          'data' => $preset_label,
          'class' => array('action-label'),
          'colspan' => 2,
        ),
        array(
          'data' => $form['preset'],
          'class' => array('action-form'),
          'colspan' => 3,
        ),
      );
      unset($form['preset']);
    }
    if (isset($form['revert'])) {
      $revert_label = $form['revert']['#title'];
      unset($form['revert']['#title']);
      $rows[] = array(
        array(
          'data' => $revert_label,
          'class' => array('action-label'),
          'colspan' => 2,
        ),
        array(
          'data' => $form['revert'],
          'class' => array('action-form'),
          'colspan' => 3,
        ),
      );
      unset($form['revert']);
    }
  }
  else {
    $rows[] = array(array(
        'data' => t('No overrides present.'),
        'colspan' => 5,
      ));
  }
  $table = array(
    'header' => $header,
    'rows' => $rows,
    'attributes' => array('class' => array('spaces'))
  );
  $variables['overrides'] = theme('table', $table);
}
