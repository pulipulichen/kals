<?php
/**
 * Implements hook_views_query_alter().
 */
function elms_terms_views_query_alter(&$view, &$query) {
  //for the included view, allow for additional processing
  $group = og_context();
  if ($view->name == 'elms_term_list' && $view->current_display == 'block_1' && isset($group->nid)) {
    //add wrappers as we find them
    $node = node_load($view->args[0]);
    //make sure this node has content, otherwise we're wasting time
    if ($node->body != '') {
      // TODO Please convert this statement to the D7 database API syntax.
      $result = db_query(db_rewrite_sql("SELECT n.title, n.nid FROM {node} AS n JOIN {og_ancestry} AS oga ON oga.nid=n.nid WHERE type='term' AND oga.group_nid=%d"), $group->nid);
      while ($val = db_fetch_array($result)) {
        if (strpos($node->body, $val['title']) !== FALSE) {
          $nids[] = $val['nid'];
        }
      }
    }
    //we didn't find any nodes, make the query return nothing
    if (empty($nids)) {
      $nids = array(0);
    }
    //manually generate the additional where clause with list of nids
    $query->where[1] = array(
      'clauses' => array("node.nid in (" . db_placeholders($nids) . ")"),
      'args' => $nids,
      'type' => 'AND',
    );
  }
}
