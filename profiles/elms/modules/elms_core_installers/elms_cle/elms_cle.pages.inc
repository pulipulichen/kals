<?php
/**
 * @file
 * Functions specific to the cle install core.
 */

/**
 * Redirect to the book root for this course
 */
function _elms_cle_home() {
  drupal_goto('open_studio');
  return 1;
}
