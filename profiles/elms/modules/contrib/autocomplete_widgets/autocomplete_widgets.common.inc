<?php

/**
 * @file
 * Common functions for Autocomplete Widgets module.
 */

/**
 * Fetch an array of options for the given widget.
 *
 * @param $field
 *   The field description.
 * @param $string
 *   Optional string to filter values on (used by autocomplete).
 * @param $match
 *   Operator to match filtered name against, can be any of:
 *   'contains', 'equals', 'starts_with'
 * @param $keys
 *   Optional keys to lookup (the $string and $match arguments will be
 *   ignored).
 * @param $limit
 *   If non-zero, limit the size of the result set.
 *
 * @return
 *   An array of valid values in the form:
 *   array(
 *     key => value,
 *     ...
 *   )
 */
function _autocomplete_widgets_get_options($field, $string = '', $match = 'contains', $keys = NULL, $limit = NULL) {
  static $results = array();

  // Create unique id for static cache.
  if (!isset($keys) || !is_array($keys)) {
    $keys = array();
  }
  $cid = $field['field_name'] .':'. $match .':'. ($string !== '' ? $string : implode('-', $keys)) .':'. $limit;

  if (!isset($results[$cid])) {
    if ($field['widget']['type'] == 'autocomplete_widgets_allowvals') {
      $results[$cid] = _autocomplete_widgets_get_options_allowvals($field, $string, $match, $keys, $limit);
    }
    else if ($field['widget']['type'] == 'autocomplete_widgets_flddata') {
      $results[$cid] = _autocomplete_widgets_get_options_flddata($field, $string, $match, $keys, $limit);
    }
    else if ($field['widget']['type'] == 'autocomplete_widgets_suggested') {
      $results[$cid] = _autocomplete_widgets_get_options_suggested($field, $string, $match, $keys, $limit);
    }
    else if ($field['widget']['type'] == 'autocomplete_widgets_node_reference') {
      $results[$cid] = _autocomplete_widgets_get_options_node_reference($field, $string, $match, $keys, $limit);
    }
    else {
      $results[$cid] = array();
    }
  }

  return $results[$cid];
}

/**
 * Fetch an array of options for the given widget (allowed values).
 *
 * Options are retrieved from the allowed values defined for the field.
 */
function _autocomplete_widgets_get_options_allowvals($field, $string = '', $match = 'contains', $keys = NULL, $limit = NULL) {

  $field_name = $field['field_name'];
  $allowed_values = list_allowed_values(field_info_field($field_name));
  $limit = (!isset($limit) || !is_numeric($limit)) ? count($allowed_values) : $limit;
  $case_sensitive = $field['widget']['settings']['autocomplete_case'];
  $filter_xss = !empty($field['widget']['settings']['autocomplete_xss']);
  $options = array();
  $count = 0;

  foreach ($allowed_values as $key => $value) {
    if ($filter_xss) {
      // Filter all HTML in $value, then trim white spaces.
      $value = trim(filter_xss($value, array()));
    }
    if ($string === '') {
      if (isset($keys) && is_array($keys)) {
        if (in_array($key, $keys)) {
          $options[$key] = $value;
          $count++;
        }
      }
      else {
        $options[$key] = $value;
        $count++;
      }
    }
    else if ($match == 'equals') {
      if ($value == $string) {
        $options[$key] = $value;
        $count++;
      }
    }
    else {
      $pos = $case_sensitive ? strpos($value, $string) : strpos(drupal_strtolower($value), drupal_strtolower($string));
      if (($match == 'starts_with' && $pos === 0) || ($match == 'contains' && $pos !== FALSE)) {
        $options[$key] = $value;
        $count++;
      }
    }
    if ($count >= $limit) {
      break;
    }
  }
  return $options;
}

/**
 * Fetch an array of options for the given widget (field data).
 *
 * Options are retrieved from existing values for the field.
 */
function _autocomplete_widgets_get_options_flddata($field, $string = '', $match = 'contains', $keys = NULL, $limit = NULL) {
  $field_name = $field['field_name'];
  $table = 'field_data_' . $field_name;
  $column = $field_name . '_value';

  $select = db_select($table, 'fd');
  $select->addField('fd', $column);

  if (!empty($field['widget']['i18n_flddata'])) {
    // Adding a join with the node table allows the i18n rewrite the query
    // to filter values from node for the proper language.
    $select->join('node', 'n', 'vid = n.vid');
  }

  if ($string !== '') {
    $case_sensitive = empty($field['widget']['autocomplete_case']);
    $col = $case_sensitive ? $column : strtolower($column);
    $val = $case_sensitive ? $string : strtolower($string);

    switch ($match) {
      case 'equals':
        $select->condition($col, $val);
        break;
      case 'starts_with':
        $select->condition($col, $val . '%', 'LIKE');
        break;
      case 'contains':
      default:
        $select->condition($col, '%' . $val . '%', 'LIKE');
        break;
    }
  }
  elseif (isset($keys) && is_array($keys)) {
    $select->condition($column, $keys, 'IN');
  }
  if (!empty($limit)) {
    $select->range(0, $limit);
  }
  $rows = $select->execute()->fetchAll(PDO::FETCH_ASSOC);

  $options = array();
  foreach($rows as $row) {
    $options[$row[$column]] = $row[$column];
  }
  return $options;
}

/**
 * Fetch an array of options for the given widget (suggested).
 *
 * Options are retrieved from the suggested values defined for the field.
 */
function _autocomplete_widgets_get_options_suggested($field, $string = '', $match = 'contains', $keys = NULL, $limit = NULL) {
  $case_sensitive = empty($field['widget']['autocomplete_case']);

  $options = explode("\n", $field['widget']['settings']['suggested_values']);
  $options = array_map('trim', $options);
  $options = array_filter($options, 'strlen');

  switch ($match) {
    case 'contains':
    case 'starts_with':
      $matched_options = array();

      if (!$case_sensitive) {
        $options = array_map('strtolower', $options);
        $string = strtolower($string);
      }

      foreach ($options as $option) {
        if ($match == 'contains' && strpos($option, $string) !== FALSE) {
          $matched_options[] = $option;
        }
        elseif ($match == 'starts_with' && strpos($option, $string) === 0) {
          $matched_options[] = $option;
        }
      }
      $options = $matched_options;
      break;
    case 'equals':
      if (in_array($string, $options, TRUE)) {
        $options = array($string);
      }
      break;

  }

  return $options;
}

/**
 * Fetch an array of options for the given widget (node_reference).
 *
 * Options are retrieved from the titles of the allowed node types.
 */
function _autocomplete_widgets_get_options_node_reference($field, $string = '', $match = 'contains', $keys = NULL, $limit = NULL) {
  $field_name = $field['field_name'];
  $table = 'field_data_' . $field_name;
  $column = $field_name . '_value';
  $options = array();

  $field_query = db_select($table, 'fd')
    ->fields('fd', array($column));

  $node_title_query = db_select('node', 'n')
    ->fields('n', array('title'))
    ->condition('n.type', $field['widget']['settings']['allowed_node_types'], 'IN')
    ->addTag('node_access');

  if ($string !== '') {
    switch ($match) {
      case 'starts_with':
        $field_query->condition($column, $string . '%', 'LIKE');
        $node_title_query->condition('n.title', $string . '%', 'LIKE');
        break;
      case 'contains':
      default:
        $field_query->condition($column, '%' . $string . '%', 'LIKE');
        $node_title_query->condition('n.title', '%' . $string . '%', 'LIKE');
        break;
    }
    $rows = $node_title_query->execute()->fetchAll(PDO::FETCH_ASSOC);
    foreach($rows as $row) {
      $options[$row['title']] = $row['title'];
    }
    $rows = $field_query->execute()->fetchAll(PDO::FETCH_ASSOC);
    foreach($rows as $row) {
      $options[$row[$column]] = $row[$column];
    }
  }
  sort($options);
  return $options;
}
