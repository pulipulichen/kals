<?php

/**
 * @file
 * Preprocess functions for JQGRID.
 */

/**
 * Builds the JQGRID structure.
 */
function jqgrid_preprocess_views_view_jqgrid(&$variables) {
  global $user;

  $path = drupal_get_path('module', 'jqgrid');
  $view = & $variables['view'];

  // Get any attached export links.
  $view->style_options['export_enable'] = FALSE;
  $view->style_options['export_path'] = array();
  foreach ($view->display as $id => $display) {
    if ($display->display_plugin == 'views_data_export') {
      $view->style_options['export_enable'] = TRUE;
      $view->style_options['export_path'][] = $display->display_options['path'];
    }
  }

  // Enable edition according to permission.
  if (user_access('edit jqgrid')) {
    $view->style_options['cellEdit'] = TRUE;
  }
  else {
    $view->style_options['cellEdit'] = FALSE;
  }

  $handlers = $view->style_plugin->display->handler->get_handlers('field');

  // Arrays to store ordered / unordered columns in.
  $ordered_columns = array();
  $unordered_columns = array();

  // Build the jqgrid columns.
  foreach ($handlers as $field_id => $field_handler) {

    // Set up search option.
    // If list.
    if (isset($view->style_options['columns'][$field_id]['search']) && $view->style_options['columns'][$field_id]['search'] == 1 && isset($field_handler->field_info['type']) && $field_handler->field_info['type'] == 'list_text') {
      $view->style_options['columns'][$field_id]['stype'] = 'select';
      $view->style_options['columns'][$field_id]['searchoptions']['sopt'] = array('eq');
      $view->style_options['columns'][$field_id]['searchoptions']['searchhidden'] = TRUE;
      $view->style_options['columns'][$field_id]['searchoptions']['value'] = array();
      $view->style_options['columns'][$field_id]['searchoptions']['value'][''] = t('None');
      foreach ($field_handler->field_info['settings']['allowed_values'] as $key => $value) {
        // Use key if ajax or value if not
        if ($view->use_ajax)
        $view->style_options['columns'][$field_id]['searchoptions']['value'][$key] = $value;
        else
        $view->style_options['columns'][$field_id]['searchoptions']['value'][$value] = $value;
      }
    }

    // Set up edit option.
    // If list.
    if (isset($view->style_options['columns'][$field_id]['editable']) && $view->style_options['columns'][$field_id]['editable'] == 1 && $field_handler->field_info['type'] == 'list_text') {
      $view->style_options['columns'][$field_id]['edittype'] = 'select';
      $view->style_options['columns'][$field_id]['editoptions']['sopt'] = array('eq');
      $view->style_options['columns'][$field_id]['editoptions']['value'] = array();
      $view->style_options['columns'][$field_id]['editoptions']['value'][''] = t('None');
      foreach ($field_handler->field_info['settings']['allowed_values'] as $key => $value) {
        $view->style_options['columns'][$field_id]['editoptions']['value'][$key] = $value;
      }
    }

    // Column label for the group by function in jqgrid.js.
    $view->style_plugin->options['columns'][$field_id]['label'] = $field_handler->options['label'];

  }

  if ($errors = drupal_get_messages('error', FALSE)) {
    $variables['jqgrid'] = theme('status_messages', array(
      'display' => 'error',
    ));
  }
  else {
    // Create the jqgrid - an instance of a jqgrid theme.
    $variables['jqgrid'] = theme('jqgrid', array(
      'view' => $view,
    ));
  }

}

/**
 * The main theme function for the jqgrid.
 */
function theme_jqgrid($variables) {

  $view = $variables['view'];

  // Add all the CSS & JS.
  // Add the core jqgrid library.
  drupal_add_library('jqgrid', 'jqgrid');
  // Add this modules jqgrid files.
  $path = drupal_get_path('module', 'jqgrid');

  // Get option.
  $option = $view->style_options;

  // View->field will only contain the field the user can see.
  $fields   = $view->field;
  $handler  = $view->style_plugin;

  // Remove and reoder.
  $columns  = $handler->sanitize_columns($option['columns'], $fields);

  $col_names = array();
  $col_model = array();

  $i = 0;
  foreach ($columns as $key => $column) {
    $col_names[$i] = $handler->options['columns'][$key]['label'];
    $col_model[$i]['name'] = $key;
    $col_model[$i]['index'] = $key;
    $col_model[$i]['footerdata'] = (is_array($column) && isset($column['footerdata'])) ? $column['footerdata'] : 'none';
    $col_model[$i]['align'] = (is_array($column) && isset($column['align'])) ? $column['align'] : '';
    $col_model[$i]['width'] = (is_array($column) && isset($column['width'])) ? $column['width'] : 100;
    $col_model[$i]['sortable'] = (is_array($column) && isset($column['sortable']) && $column['sortable']) ? TRUE : FALSE;
    $col_model[$i]['resizable'] = (is_array($column) && isset($column['resizable']) && $column['resizable']) ? TRUE : FALSE;
    $col_model[$i]['search'] = (is_array($column) && isset($column['search']) && $column['search']) ? TRUE : FALSE;
    $col_model[$i]['editable'] = (is_array($column) && isset($column['editable']) && $column['editable']) ? TRUE : FALSE;
    $col_model[$i]['hidden'] = (is_array($column) && $column['hidden']) ? TRUE : FALSE;
    // TODO add frozen support with tag frozen.
    // Search.
    $col_model[$i]['stype'] = (isset($column['stype']) && $column['stype']) ? $column['stype'] : 'text';
    $col_model[$i]['searchoptions'] = (isset($column['searchoptions']) && $column['searchoptions']) ? $column['searchoptions'] : '';

    // Edition.
    $col_model[$i]['edittype'] = (isset($column['edittype']) && $column['edittype']) ? $column['edittype'] : 'text';
    $col_model[$i]['editoptions'] = (!empty($column['editoptions'])) ? $column['editoptions'] : NULL;

    // If type is date_picker add date picker pluggin.
    if (isset($column['edittype']) && $column['edittype'] == "date_picker") {
      $col_model[$i]['editplugin'] = 'date_picker';
      $col_model[$i]['edittype'] = 'text';
    }

    $col_model[$i]['formater'] = '';
    $i++;
  }

  $arguments = $view->args;
  $arguments = implode('/', $arguments);
  $jqgrid_options['name'] = $view->name;
  $jqgrid_options['current_display'] = $view->current_display;
  $jqgrid_options['arguments'] = $arguments;
  $jqgrid_options['human_name'] = $view->human_name;
  $jqgrid_options['colNames'] = $col_names;
  $jqgrid_options['colModel'] = $col_model;

  // ORDER.
  $jqgrid_options['sortname'] = $option['default'];
  $jqgrid_options['sortorder'] = ($option['default'] != -1 && is_array($option['columns'][$option['default']])) ? $option['columns'][$option['default']]['default_sort_order'] : 'asc';

  // EDITION.
  $jqgrid_options['cellEdit'] = $option['cellEdit'];

  // SETTINGS.
  $jqgrid_options['scroll'] = $option['scroll'];
  $jqgrid_options['sortable'] = $option['sortable'];
  $jqgrid_options['filterToolbar'] = $option['filterToolbar'];

  // USE AJAX.
  $jqgrid_options['loadonce'] = ($view->display_handler->get_option('use_ajax')) ? FALSE : TRUE;

  // PAGINATION.
  $jqgrid_options['rowNum'] = $option['rowNum'];

  // FOOTER
  $jqgrid_options['footerrow'] = $option['footerrow'];

  // SIZE.
  $jqgrid_options['height'] = $option['height'];
  $jqgrid_options['width'] = $option['width'];

  // EXPORT.
  $jqgrid_options['export_enable'] = $option['export_enable'];
  $jqgrid_options['export_path'] = $option['export_path'];

  // Add specific jqgrid js/css.
  drupal_add_css($path . '/css/jqgrid.css');

  drupal_add_js(array('jqgrid' => array('#' . 'list' => $jqgrid_options)), 'setting');
  drupal_add_js($path . '/js/jqgrid.js');
  unset($jqgrid_options);

  $output = '<table id="list"></table> <div id="pager-list"></div>';
  return $output;

}

/**
 * Theme the form for the matrix style plugin.
 */
function theme_jqgrid_views_plugin_table($variables) {
  $form = $variables['form'];
  $output = drupal_render($form['description_markup']);
  $variables['header'] = array(
    t('Field'),
    t('Resizable'),
    t('Width'),
    t('Footer Data'),
    t('Align'),
    array(
      'data' => t('Sortable'),
      'align' => 'center',
    ),
    array(
      'data' => t('Default order'),
      'align' => 'center',
    ),
    array(
      'data' => t('Default sort'),
      'align' => 'center',
    ),
    array(
      'data' => t('Hide'),
      'align' => 'center',
    ),
    t('Search'),
    t('Editable'),
    t('Type'),
  );
  $variables['rows'] = array();
  foreach (element_children($form['columns']) as $id) {
    $row = array();
    $row[] = drupal_render($form['columns'][$id]['name']);
    $row[] = drupal_render($form['columns'][$id]['resizable']);
    $row[] = drupal_render($form['columns'][$id]['width']);
    $row[] = drupal_render($form['columns'][$id]['footerdata']);
    $row[] = drupal_render($form['columns'][$id]['align']);
    if (!empty($form['columns'][$id]['sortable'])) {
      $row[] = array(
        'data' => drupal_render($form['columns'][$id]['sortable']),
        'align' => 'center',
      );
      $row[] = array(
        'data' => drupal_render($form['columns'][$id]['default_sort_order']),
        'align' => 'center',
      );
      $row[] = array(
        'data' => drupal_render($form['default'][$id]),
        'align' => 'center',
      );
    }
    else {
      $row[] = '';
      $row[] = '';
      $row[] = '';
    }
    $row[] = drupal_render($form['columns'][$id]['hidden']);
    $row[] = drupal_render($form['columns'][$id]['search']);
    $row[] = drupal_render($form['columns'][$id]['editable']);
    $row[] = drupal_render($form['columns'][$id]['edittype']);
    $variables['rows'][] = $row;
  }
  // Add default sort.
  $variables['rows'][] = array(
    '',
    '',
    '',
    '',
  	'',
    '',
    '',
    array(
      'data' => drupal_render($form['default'][-1]),
      'align' => 'center',
    ),
    '',
    '',
    '',
    '',
  );
  $output .= theme('table', $variables);
  $output .= drupal_render_children($form);
  return $output;
}
