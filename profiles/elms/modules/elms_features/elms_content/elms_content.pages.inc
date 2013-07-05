<?php
/**
 * @file
 * ELMS content page functions
 *
 * This helps find the book root
 */

/**
 * Redirect to the book root for this course
 */
function _elms_content_root() {
  // get the group
  $group = og_context();
  // if we find a group node, take them to the book's first page
  if (isset($group->book_nid)) {
    $root = node_load($group->book_nid);
    // account for an empty book though that would cause issues
    if ($next = book_next($root->book)) {
      drupal_goto($next['href']);
    }
    else {
      drupal_goto('node/' . $group->book_nid);
    }
  }
  // if it didn't find anything go to the course node
  drupal_goto('node/' . $group->nid);
  return 1;
}
