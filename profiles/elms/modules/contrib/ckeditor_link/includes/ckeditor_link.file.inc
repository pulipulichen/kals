<?php
/**
 * @file
 * Written by Henri MEDOT <henri.medot[AT]absyx[DOT]fr>
 * http://www.absyx.fr
 */

/**
 * Implementation of hook_ckeditor_link_TYPE_url().
 */
function ckeditor_link_ckeditor_link_file_url($path, $langcode) {
  $file_path = variable_get('file_public_path', conf_path() .'/files');
  if (strpos($path, $file_path .'/') === 0) {
    return file_create_url($path);
  }
}
