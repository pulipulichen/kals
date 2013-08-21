<?php

/**
 * @file
 * Get JSON data to populate grid.
 */

/**
 * Build Json Data.
 */
function jqgrid_json($view_name = NULL, $view_display = NULL) {

  // Get the requested page.
  $page = (int) $_REQUEST['page'];
  // Get how many rows we want to have into the grid.
  $limit = (int) ($_REQUEST['rows']) ? $_REQUEST['rows'] : '0';

  // Sort.
  $sidx = ($_REQUEST['sidx']) ? $_REQUEST['sidx'] : '';
  $sord = ($_REQUEST['sord']) ? $_REQUEST['sord'] : 'asc';

  // Search on.
  $search_on = $_REQUEST['_search'];

  // Filter.
  $filter_on = (isset($_REQUEST['filters'])) ? $_REQUEST['filters'] : NULL;

  // Bail out if no view_name or view_display is passed.
  if (empty($view_name) && empty($view_display)) {
    return;
  }

  // Get the view and check access.
  $view = views_get_view($view_name);

  if ($view && $view->access($view_display)) {

    $view->set_display($view_display);

    $args = array();
    if ($view->display_handler->get_option('use_ajax')) {
      $args['offset'] = ($page - 1) * $limit;
      $args['limit'] = $limit;
      $view->get_total_rows = TRUE;
    }

    // SEARCH.
    if ($search_on && $filter_on) {
      $search_json = drupal_json_decode($filter_on, TRUE);
      foreach ($search_json['rules'] as $key => $val) {
        $args['filter'][$val['field']] = $val;
      }
    }

    // ORDER.
    $arguments = arg();
    for ($compt = 4; $compt < count($arguments); $compt++) {
      $args[] = $arguments[$compt];
    }
    $args['sidx'] = $sidx;
    $args['sord'] = $sord;
    $args['jqgrid_ajax'] = TRUE;
    $view->display_handler->set_option('jqgrid_ajax', TRUE);

    // PASS ARGUMENT TO VIEW.
    $view->set_arguments($args);

    // Execute the display and render results.
    // If available into $content variable.
    $view->preview($view_display);

    if (!empty($view->result)) {

      $fields   = &$view->field;
      $options  = $view->style_plugin->options;
      $handler  = $view->style_plugin;

      // Remove and reorder.
      $columns  = $handler->sanitize_columns($options['columns'], $fields);

      // http://drupal.org/node/1306196.
      // Need to add offset.
      $count = $view->query->pager->total_items;

      if ($count > 0) {
        $total_pages = ceil($count / $limit);
      }
      else {
        $total_pages = 0;
      }
      if ($page > $total_pages) {
        $page = $total_pages;
      }
      $start = ($limit * $page) - $limit;
      if ($start < 0) {
        $start = 0;
      }

      // Construct the json data.
      $response = array();
      // Current page.
      $response['page'] = $page;
      // Total pages.
      $response['total'] = $total_pages;
      // Total records.
      $response['records'] = $count;
      $results = $view->style_plugin->row_tokens;

      foreach ($results as $num => $row) {
        foreach ($columns as $column => $field) {
          $response['rows'][$num]['id'] = (isset($row['[nid]'])) ? $row['[nid]'] : $num;
          $response['rows'][$num]['cell'][] = $row['[' . $column . ']'];
        }
      }
    }
  }

  drupal_json_output($response);

}
