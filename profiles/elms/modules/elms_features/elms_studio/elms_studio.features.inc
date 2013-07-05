<?php

/**
 * Implementation of hook_ctools_plugin_api().
 */
function elms_studio_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "context" && $api == "context") {
    return array("version" => 3);
  }
  elseif ($module == "strongarm" && $api == "strongarm") {
    return array("version" => 1);
  }
}

/**
 * Implementation of hook_imagecache_default_presets().
 */
function elms_studio_imagecache_default_presets() {
  $items = array(
    'elms_studio_submission_overview' => array(
      'presetname' => 'elms_studio_submission_overview',
      'actions' => array(
        '0' => array(
          'weight' => '0',
          'module' => 'imagecache',
          'action' => 'imagecache_scale_and_crop',
          'data' => array(
            'width' => '200',
            'height' => '150',
          ),
        ),
      ),
    ),
    'elms_studio_submission_page_view' => array(
      'presetname' => 'elms_studio_submission_page_view',
      'actions' => array(
        '0' => array(
          'weight' => '0',
          'module' => 'imagecache',
          'action' => 'imagecache_scale_and_crop',
          'data' => array(
            'width' => '450',
            'height' => '250',
          ),
        ),
      ),
    ),
  );
  return $items;
}

/**
 * Implementation of hook_node_info().
 */
function elms_studio_node_info() {
  $items = array(
    'studio_submission' => array(
      'name' => t('Studio Submission'),
      'module' => 'features',
      'description' => t('Submit a new item to the course studio'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'has_body' => '1',
      'body_label' => t('Body'),
      'min_word_count' => '0',
      'help' => '',
    ),
  );
  return $items;
}

/**
 * Implementation of hook_views_api().
 */
function elms_studio_views_api() {
  return array(
    'api' => '2',
  );
}
