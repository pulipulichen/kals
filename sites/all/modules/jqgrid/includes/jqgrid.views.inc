<?php

/**
 * @file
 * Contains Views module hooks.
 */

/**
 * Implements hook_views_plugins().
 */
function jqgrid_views_plugins() {
  $path = drupal_get_path('module', 'jqgrid');
  $views_path = drupal_get_path('module', 'views');
  return array(
    'module' => 'jqgrid',
    'display' => array(
      'jqgrid' => array(
        'title' => t('jqGrid'),
        'handler' => 'jqgrid_views_plugin',
        'help' => t('Displays data in an editable spreadsheet-style grid.'),
        'path' => $path . '/includes',
        'parent' => 'page',
        'theme' => 'views_view',
        'uses hook menu' => TRUE,
        'use pager' => TRUE,
      ),
    ),
    'style' => array(
      'parent' => array(
        'handler' => 'views_plugin_style',
        'path' => "$views_path/plugins",
        'theme file' => 'theme.inc',
        'theme path' => "$views_path/theme",
        'parent' => '',
      ),
      'jqgrid' => array(
        'title' => t('jqGrid'),
        'help' => t('Displays data in an editable spreadsheet-style grid.'),
        'path' => "$path/includes",
        'parent' => 'parent',
        'handler' => 'jqgrid_views_plugin',
        'theme file' => 'theme.inc',
        'theme path' => "$path/theme",
        'theme' => 'views_view_jqgrid',
        'uses fields' => TRUE,
        'uses options' => TRUE,
        'uses grouping' => FALSE,
        'uses hook menu' => FALSE,
        'uses hook block' => FALSE,
        'use ajax' => FALSE,
        'use pager' => FALSE,
        'accept attachments' => FALSE,
        'uses row plugin' => FALSE,
        'even empty' => FALSE,
        'type' => 'normal',
      ),
    ),
  );
}

/**
 * This hook is called at the very beginning of views processing,
 * before anything is done.
 *
 * Adding output to the view can be accomplished by placing text on
 * $view->attachment_before and $view->attachment_after.
 */
function jqgrid_views_pre_view(&$view, $display_id) {

  if ($view->display_handler->get_option('style_plugin') != 'jqgrid') {
    return;
  }

  // If ajax not use filter and sort will be done in frontend.
  if (!$view->display_handler->get_option('use_ajax')) {
    return;
  };

  // ADD SORT + FILTER FIELDS.
  if ($view->display_handler->get_option('jqgrid_ajax') == TRUE) {

    $style_options = $view->display_handler->get_option('style_options');

    // For each field.
    foreach ($view->display_handler->get_handlers('field') as $field) {

      // Sort.
      if ($style_options['columns'][$field->field]['sortable'] == 1 && $view->args['sidx'] == $field->field) {
        $sort_options = array('order' => $view->args['sord']);
        $view->add_item($display_id, 'sort', $field->table, $field->real_field, $sort_options);
      }

      // FILTER.
      // TODO Improve filter.
      if ($style_options['columns'][$field->field]['search'] == 1 && $view->args['filter'][$field->field]) {

        // If title.
        if ($field->field == 'title') {
          $search_option = array('value' => '%' . $view->args['filter'][$field->field]['data'] . '%', 'operator' => '=');
          $view->add_item($display_id, 'filter', $field->table, $field->real_field, $search_option);
        }
        // If text.
        elseif ($field->field_info && $field->field_info['type'] == 'text') {
          $search_option = array('value' => '%' . $view->args['filter'][$field->field]['data'] . '%', 'operator' => '=');
          $view->add_item($display_id, 'filter', $field->table, $field->real_field, $search_option);
        }
        // If text_list.
        elseif ($field->field_info && $field->field_info['type'] == 'list_text') {
          $search_option = array('value' => array($view->args['filter'][$field->field]['data']));
          $view->add_item($display_id, 'filter', $field->table, $field->real_field, $search_option);
        }
        // Default.
        else {
          $search_option = array('value' => array('value' => $view->args['filter'][$field->field]['data']));
          $view->add_item($display_id, 'filter', $field->table, $field->real_field, $search_option);
        }

      }

    }

  }

}


/**
 * This hook is called right before the execute process. The query is
 * now fully built, but it has not yet been run through db_rewrite_sql.
 *
 * Adding output to the view can be accomplished by placing text on
 * $view->attachment_before and $view->attachment_after.
 */
function jqgrid_views_pre_execute(&$view) {

  if ($view->display_handler->get_option('style_plugin') != 'jqgrid') {
    return;
  }

  $view->get_total_rows = TRUE;

  // IF NOT IN AJAX CALL DO NOT SPEND TIME TO EXECUTE FULL QUERY.
  if ($view->display_handler->get_option('jqgrid_ajax') != TRUE) {
    $view->query->limit = 1;
  }
  else {
    $limit = (isset($view->args['limit'])) ? $view->args['limit'] : 0;
    $offset = (isset($view->args['offset'])) ? $view->args['offset'] : 0;
    $view->query->limit = $limit;
    $view->query->offset = $offset;
  }

}
