<?php
/**
 * @file
 * Views alter statements
 *
 * Change the way this view renders based on the spaces options for it
 */
/**
 * Implements hook_views_query_alter().
 */
function elms_id_best_practices_views_query_alter(&$view, &$query) {
  // for the included view, allow for additional processing
  $group = og_context();
  if ($view->name == 'elms_resources' && isset($group->nid)) {
    // need to filter out data from the query based on Spaces settings
    $resources = variable_get('elms_id_bp_resources', array());
    // make sure resources have been set
    if (!empty($resources)) {
      // manually generate the additional where clause as its per spaces settings / global defaults if undefined
      $query->where[1] = array(
        'clauses' => array("node.nid in (" . db_placeholders($resources) . ")"),
        'args' => $resources,
        'type' => 'AND',
      );
    }
  }
}
