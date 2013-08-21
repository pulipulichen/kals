<?php

/**
 * Implements hook_feeds_importer_default().
 */
function elms_user_import_example_feeds_importer_default() {
  $export = array();

  $feeds_importer = new stdClass;
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'elms_user_file_import';
  $feeds_importer->config = array(
    'name' => 'ELMS User file import',
    'description' => 'Import users from a formatted text file',
    'fetcher' => array(
      'plugin_key' => 'FeedsFileFetcher',
      'config' => array(
        'direct' => FALSE,
      ),
    ),
    'parser' => array(
      'plugin_key' => 'FeedsCSVParser',
      'config' => array(
        'delimiter' => ',',
        'no_headers' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsUserProcessor',
      'config' => array(
        'roles' => array(),
        'update_existing' => FALSE,
        'status' => 1,
        'mappings' => array(
          0 => array(
            'source' => 'user',
            'target' => 'name',
            'unique' => 1,
          ),
          1 => array(
            'source' => 'first_name',
            'target' => 'profile_first_name',
            'unique' => FALSE,
          ),
          2 => array(
            'source' => 'last_name',
            'target' => 'profile_last_name',
            'unique' => FALSE,
          ),
          3 => array(
            'source' => 'role',
            'target' => 'og_roles',
            'unique' => FALSE,
          ),
        ),
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '-1',
    'expire_period' => 3600,
    'import_on_create' => 1,
  );
  $export['elms_user_file_import'] = $feeds_importer;

  return $export;
}
