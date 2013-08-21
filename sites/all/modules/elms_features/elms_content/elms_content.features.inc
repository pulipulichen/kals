<?php

/**
 * Implements hook_ctools_plugin_api().
 */
function elms_content_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "context" && $api == "context") {
    return array("version" => 3);
  }
  elseif ($module == "strongarm" && $api == "strongarm") {
    return array("version" => 1);
  }
}

/**
 * Implements hook_flag_default_flags().
 */
function elms_content_flag_default_flags() {
  $flags = array();
  // Exported flag: "Bookmarks".
  $flags['bookmarks'] = array(
    'content_type' => 'node',
    'title' => 'Bookmarks',
    'global' => '0',
    'types' => array(
      '0' => 'folder',
      '1' => 'page',
    ),
    'flag_short' => '<span></span>',
    'flag_long' => 'Click to add this [type] to your bookmarks',
    'flag_message' => '<em>[title]</em> was added to your bookmarks',
    'unflag_short' => '<span></span>',
    'unflag_long' => 'Click to remove this [type] from your bookmarks',
    'unflag_message' => '<em>[title]</em> was removed from your bookmarks',
    'unflag_denied_text' => '',
    'link_type' => 'normal',
    'roles' => array(
      'flag' => array(
        '0' => 3,
        '1' => 6,
        '2' => 4,
        '3' => 9,
        '4' => 10,
        '5' => 8,
      ),
      'unflag' => array(
        '0' => 3,
        '1' => 6,
        '2' => 4,
        '3' => 9,
        '4' => 10,
        '5' => 8,
      ),
    ),
    'show_on_page' => 1,
    'show_on_teaser' => 0,
    'show_on_form' => 0,
    'access_author' => '',
    'i18n' => 0,
    'module' => 'elms_content',
    'locked' => array(
      '0' => 'name',
    ),
    'api_version' => 2,
  );
  return $flags;
}

/**
 * Implements hook_node_info().
 */
function elms_content_node_info() {
  $items = array(
    'folder' => array(
      'name' => t('Folder'),
      'base' => 'features',
      'description' => t('A folder is a container that holds lesson material without any text on it.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'has_body' => '1',
      'body_label' => t('Content'),
      'min_word_count' => '0',
      'help' => '',
    ),
    'link' => array(
      'name' => t('Link'),
      'base' => 'features',
      'description' => t('Create a link to reference external content in site outlines'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'has_body' => '0',
      'body_label' => '',
      'min_word_count' => '0',
      'help' => '',
    ),
    'page' => array(
      'name' => t('Page'),
      'base' => 'features',
      'description' => t('Create a page of content for use in site outlines.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'has_body' => '1',
      'body_label' => t('Content'),
      'min_word_count' => '0',
      'help' => '',
    ),
    'referenced_page' => array(
      'name' => t('Referenced page'),
      'base' => 'features',
      'description' => t('use this to reference other pieces of content.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'has_body' => '0',
      'body_label' => '',
      'min_word_count' => '0',
      'help' => '',
    ),
  );
  return $items;
}

/**
 * Implements hook_views_api().
 */
function elms_content_views_api() {
  return array(
    'api' => '2',
  );
}
