<?php

/**
 * @file
 * Call back for edition / deletion.
 */

/**
 * Update field.
 */
function jqgrid_callback_update() {

  $entity_type = 'node';

  // Get all post value as we don't know which field is to be updated.
  foreach ($_POST as $var => $value) {
    $args[$var] = $value;
  }

  $node = node_load($args['id']);

  // Check permissions.
  if (user_access('edit jqgrid') && node_access('update', $node)) {
    // Remove operation and id.
    unset($args['oper']);
    unset($args['id']);
    $status = FALSE;
    // For now we will only update one value.
    foreach ($args as $field => $value) {
      $fieldinfo = field_info_field($field);
      switch ($fieldinfo['type']) {
        case 'number_float':
          if ($value != '') {
            $langcode = field_language($entity_type, $node, $field);
            $item = &$node->{$field}[$langcode][0];
            $item['value'] = (float) ($value);
            $return_value = (float) ($value);
            $status = TRUE;
          }
          else {
            // Delete field.
            $langcode = field_language($entity_type, $node, $field);
            $node->{$field}[$langcode][0] = NULL;
            $return_value = '';
            $status = TRUE;
          }
          break;

        case 'datestamp':
          if ($value != '') {
            $langcode = field_language($entity_type, $node, $field);
            $item = &$node->{$field}[$langcode][0];
            $item['value'] = strtotime($value);
            $return_value = date('d/m/Y', strtotime($value));
            $status = TRUE;
          }
          else {
            // Delete field.
            $langcode = field_language($entity_type, $node, $field);
            $node->{$field}[$langcode][0] = NULL;
            $return_value = '';
            $status = TRUE;
          }
          break;

        case 'list_text':
          if ($value == '' || isset($fieldinfo['settings']['allowed_values'][$value])) {
            $langcode = field_language($entity_type, $node, $field);
            $item = &$node->{$field}[$langcode][0];
            $item['value'] = $value;
            $return_value = $fieldinfo['settings']['allowed_values'][$value];
            $status = TRUE;
          }
          break;

        case 'text':
          if (strlen($value) < $fieldinfo['settings']['max_length']) {
            $langcode = field_language($entity_type, $node, $field);
            $item = &$node->{$field}[$langcode][0];
            $item['value'] = $value;
            $return_value = $value;
            $status = TRUE;
          }
          break;

        default:
          // Field not editable. Could be nid.
      }
    }

    // BUG with rules.
    // Need to save in order to execute actions based on node save.
    if ($status) {
      node_save($node);
    }

    $json = array(
      'status' => TRUE,
      'op' => $op,
      'value' => $return_value,
    );

  }

  // Return the json.
  drupal_json_output($json);

}
