<?php
/**
 * @file
 * ICMS page functions
 *
 * Establish the pages for an icms based system
 */
/**
 * Redirect to the book root for this course
 */
function _elms_icms_root() {
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

/**
 * Helper page for student funnel page for a parent.
 */
function _elms_icms_student_page() {
  return '<ol>
  <li>Read the help documents</li>
  <li>Get your welcome letter</li>
  <li>Get your activation code</li>
  <li>Do things</li>
  <li>Check below</li>
  </ol>';
}

/**
 * Helper page for marketing funnel page for a parent.
 */
function _elms_icms_marketing_page() {
  return 'This is the marketing page';
}

/**
 * Helper page for instructor funnel page for a parent.
 */
function _elms_icms_instructor_page() {
  return 'This content is for instructors';
}
