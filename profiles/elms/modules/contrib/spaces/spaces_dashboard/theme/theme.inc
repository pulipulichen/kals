<?php

/**
 * Theme function to display the dashboard block selector as a table.
 */
function template_preprocess_spaces_dashboard_admin_form(&$variables) {
  drupal_add_css(drupal_get_path('module', 'spaces_dashboard') . '/spaces_dashboard.admin.css');
  drupal_add_js(drupal_get_path('module', 'spaces_dashboard') . '/spaces_dashboard.admin.js');
  drupal_add_js('misc/tableselect.js');

  $form = &$variables['form'];
  $links = array();
  $headers = array();
  $tables = array();
  foreach (element_children($form) as $i) {
    $grouping = $form[$i]['#grouping'];
    $grouping_id = $form[$i]['#grouping_id'];
    if (!isset($links[$grouping_id])) {
      $links[$grouping_id] = array(
        'title' => $grouping,
        'href' => '',
        'attributes' => array('class' => array("dashboard-blocks-{$grouping_id}")),
      );
      $tables[$grouping_id] = array();
      $headers[$grouping_id] = array(
        array(
          'class' => array('select-all'),
        ),
        array(
          'data' => t('Block'),
        ),
      );
    }

    $title = $form[$i]['#title'];
    unset($form[$i]['#title']);
    $row = array(
      array('data' => $form[$i]),
      array('data' => check_plain($title)),
    );
    $tables[$grouping_id][] = $row;
    unset($form[$i]);
  }
  ksort($links);
  ksort($tables);
  ksort($headers);
  $variables['tables'] = '';
  foreach ($tables as $grouping_id => $rows) {
    $variables['tables'] .= theme('table', array('header' => $headers[$grouping_id], 'rows' => $tables[$grouping_id], 'attributes' => array('id' => "dashboard-blocks-{$grouping_id}")));
  }
  $variables['links'] = theme('links', array('links' => $links, 'attributes' => array('id' => 'dashboard-blocks-links')));
}

/**
 * Theme function to display the dashboard block selector as a table.
 */
function template_preprocess_spaces_dashboard_admin_region_form(&$variables) {
  drupal_add_js(drupal_get_path('module', 'spaces_dashboard') . '/spaces_dashboard.admin.js');
  drupal_add_css(drupal_get_path('module', 'spaces_dashboard') . '/spaces_dashboard.admin.css');

  $form = &$variables['form'];
  $variables['tables'] = '';
  foreach (element_children($form['spaces_dashboard_layouts']) as $layout) {
    $rows = array();
    $title = check_plain($form['spaces_dashboard_layouts'][$layout]['#title']);
    $description = check_plain($form['spaces_dashboard_layouts'][$layout]['#description']);
    $help = t('Enable this layout for use with the dashboard. Select the regions that can be edited below.');
    $label = "<strong>{$title}</strong> &mdash; <em>{$description}</em><div class='description'>{$help}</div>";
    unset($form['spaces_dashboard_layouts'][$layout]['#title']);
    unset($form['spaces_dashboard_layouts'][$layout]['#description']);

    $header = array(
      array(
        'data' => $form['spaces_dashboard_layouts'][$layout],
        'header' => TRUE,
      ),
      array(
        'data' => $label,
        'header' => TRUE,
        'colspan' => 2,
        'class' => 'label',
      ),
    );

    foreach (element_children($form['spaces_dashboard_regions'][$layout]) as $region) {
      $title = $form['spaces_dashboard_regions'][$layout][$region]['#title'];
      unset($form['spaces_dashboard_regions'][$layout][$region]['#title']);
      $rows[] = array(
        array('data' => ''),
        array('data' => $form['spaces_dashboard_regions'][$layout][$region]),
        array(
          'data' => check_plain($title),
          'class' => 'label',
        ),
      );
    }

    $variables['tables'] = theme('table', array(
       'header' => $header,
       'rows' => $rows,
       'attributes' => array('class' => array('spaces-dashboard-regions')))
    );
  }

  unset($form['spaces_dashboard_layouts']);
  unset($form['spaces_dashboard_regions']);

}
