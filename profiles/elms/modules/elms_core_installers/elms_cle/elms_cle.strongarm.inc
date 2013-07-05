<?php

/**
 * Implements hook_strongarm().
 */
function elms_cle_strongarm() {
  $export = array();

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'theme_default';
  $strongarm->value = 'cube';
  $export['theme_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'filter_html_1';
  $strongarm->value = '1';
  $export['filter_html_1'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'book_allowed_types';
  $strongarm->value = array(
    0 => 'folder',
    1 => 'link',
    2 => 'page',
    3 => 'poll',
    4 => 'referenced_page',
  );
  $export['book_allowed_types'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'book_child_type';
  $strongarm->value = 'page';
  $export['book_child_type'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_expanded';
  $strongarm->value = array();
  $export['menu_expanded'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'purl_types';
  $strongarm->value = array(
    'path' => 'path',
    'pair' => '0',
    'subdomain' => '0',
    'domain' => '0',
    'extension' => '0',
    'useragent' => '0',
    'querystring' => '0',
  );
  $export['purl_types'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'purl_method_spaces_og';
  $strongarm->value = 'path';
  $export['purl_method_spaces_og'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'user_admin_role';
  $strongarm->value = '3';
  $export['user_admin_role'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'imce_profiles';
  $strongarm->value = array(
    1 => array(
      'name' => 'User-1',
      'usertab' => '1',
      'filesize' => '0',
      'quota' => '0',
      'tuquota' => '0',
      'extensions' => '*',
      'dimensions' => '1200x1200',
      'filenum' => '0',
      'directories' => array(
        0 => array(
          'name' => '.',
          'subnav' => '1',
          'browse' => '1',
          'upload' => '1',
          'thumb' => '1',
          'delete' => '1',
          'resize' => '1',
          'crop' => '1',
        ),
      ),
      'thumbnails' => array(
        0 => array(
          'name' => 'Small',
          'dimensions' => '90x90',
          'prefix' => 'small_',
          'suffix' => '',
        ),
        1 => array(
          'name' => 'Medium',
          'dimensions' => '120x120',
          'prefix' => 'medium_',
          'suffix' => '',
        ),
        2 => array(
          'name' => 'Large',
          'dimensions' => '180x180',
          'prefix' => 'large_',
          'suffix' => '',
        ),
      ),
    ),
    2 => array(
      'name' => 'Instructor Profile',
      'usertab' => '1',
      'filesize' => '10',
      'quota' => '1000',
      'tuquota' => '0',
      'extensions' => 'gif png jpg jpeg',
      'dimensions' => '800x600',
      'filenum' => '1',
      'directories' => array(
        0 => array(
          'name' => 'u%uid',
          'subnav' => '0',
          'browse' => '1',
          'upload' => '1',
          'thumb' => '1',
          'delete' => '0',
          'resize' => '1',
          'crop' => '1',
        ),
      ),
      'thumbnails' => array(
        0 => array(
          'name' => 'Thumb',
          'dimensions' => '90x90',
          'prefix' => 'thumb_',
          'suffix' => '',
        ),
      ),
    ),
  );
  $export['imce_profiles'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'imce_roles_profiles';
  $strongarm->value = array(
    6 => array(
      'weight' => '0',
      'pid' => '1',
    ),
    3 => array(
      'weight' => '0',
      'pid' => '1',
    ),
    9 => array(
      'weight' => '0',
      'pid' => '1',
    ),
    4 => array(
      'weight' => '0',
      'pid' => '2',
    ),
    8 => array(
      'weight' => '0',
      'pid' => '2',
    ),
    10 => array(
      'weight' => '0',
      'pid' => '0',
    ),
    2 => array(
      'weight' => '11',
      'pid' => '0',
    ),
    1 => array(
      'weight' => '12',
      'pid' => '0',
    ),
  );
  $export['imce_roles_profiles'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_modulelist';
  $strongarm->value = array(
    0 => 'node',
    1 => 'user',
    2 => 'taxonomy',
  );
  $export['pathauto_modulelist'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_taxonomy_supportsfeeds';
  $strongarm->value = '0/feed';
  $export['pathauto_taxonomy_supportsfeeds'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_taxonomy_pattern';
  $strongarm->value = '';
  $export['pathauto_taxonomy_pattern'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_taxonomy_bulkupdate';
  $strongarm->value = 0;
  $export['pathauto_taxonomy_bulkupdate'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_taxonomy_applytofeeds';
  $strongarm->value = '';
  $export['pathauto_taxonomy_applytofeeds'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_taxonomy_2_pattern';
  $strongarm->value = '';
  $export['pathauto_taxonomy_2_pattern'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_taxonomy_1_pattern';
  $strongarm->value = '';
  $export['pathauto_taxonomy_1_pattern'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_ignore_words';
  $strongarm->value = 'a,an,as,at,before,but,by,for,from,is,in,into,like,of,off,on,onto,per,since,than,the,this,that,to,up,via,with';
  $export['pathauto_ignore_words'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_indexaliases';
  $strongarm->value = FALSE;
  $export['pathauto_indexaliases'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_indexaliases_bulkupdate';
  $strongarm->value = FALSE;
  $export['pathauto_indexaliases_bulkupdate'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_max_component_length';
  $strongarm->value = '100';
  $export['pathauto_max_component_length'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_max_length';
  $strongarm->value = '100';
  $export['pathauto_max_length'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_bulkupdate';
  $strongarm->value = FALSE;
  $export['pathauto_node_bulkupdate'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_image_pattern';
  $strongarm->value = '';
  $export['pathauto_node_image_pattern'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_page_pattern';
  $strongarm->value = '';
  $export['pathauto_node_page_pattern'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_pattern';
  $strongarm->value = '';
  $export['pathauto_node_pattern'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_quotes';
  $strongarm->value = '0';
  $export['pathauto_punctuation_quotes'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_separator';
  $strongarm->value = '';
  $export['pathauto_separator'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_update_action';
  $strongarm->value = '1';
  $export['pathauto_update_action'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_user_bulkupdate';
  $strongarm->value = 0;
  $export['pathauto_user_bulkupdate'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_user_pattern';
  $strongarm->value = 'users/[user-raw]';
  $export['pathauto_user_pattern'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_user_supportsfeeds';
  $strongarm->value = '';
  $export['pathauto_user_supportsfeeds'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_verbose';
  $strongarm->value = 0;
  $export['pathauto_verbose'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_applytofeeds';
  $strongarm->value = '';
  $export['pathauto_node_applytofeeds'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_hyphen';
  $strongarm->value = '1';
  $export['pathauto_punctuation_hyphen'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'beautytips_defaults';
  $strongarm->value = array(
    'fill' => '#F4F4F4',
    'strokeStyle' => '#666666',
    'spikeLength' => 20,
    'spikeGirth' => 10,
    'width' => 350,
    'overlap' => 0,
    'centerPointY' => 1,
    'cornerRadius' => 0,
    'cssStyles' => array(
      'fontFamily' => '"Lucida Grande",Helvetica,Arial,Verdana,sans-serif',
      'fontSize' => '12px',
      'padding' => '10px 14px',
    ),
    'shadow' => TRUE,
    'shadowColor' => 'rgba(0,0,0,.5)',
    'shadowBlur' => 8,
    'shadowOffsetX' => 4,
    'shadowOffsetY' => 4,
  );
  $export['beautytips_defaults'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'jquery_colorpicker_ie6_page';
  $strongarm->value = 0;
  $export['jquery_colorpicker_ie6_page'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'views_bulk_operations_actions';
  $strongarm->value = 'a:11:{i:0;s:6:"fields";i:1;s:6:"script";i:2;s:7:"ruleset";i:3;s:4:"book";i:4;s:6:"delete";i:5;s:16:"content_taxonomy";i:6;s:7:"profile";i:7;s:10:"user_roles";i:8;s:8:"taxonomy";i:9;s:17:"argument_selector";i:10;s:7:"archive";}';
  $export['views_bulk_operations_actions'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'site_frontpage';
  $strongarm->value = 'parents';
  $export['site_frontpage'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'site_frontpage_path';
  $strongarm->value = 'parents';
  $export['site_frontpage_path'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'admin_menu_display';
  $strongarm->value = '0';
  $export['admin_menu_display'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'admin_theme';
  $strongarm->value = 'rubik';
  $export['admin_theme'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'admin_toolbar';
  $strongarm->value = array(
    'layout' => 'vertical',
    'position' => 'sw',
    'behavior' => 'df',
    'blocks' => array(
      'context_ui-devel' => -1,
      'admin-create' => -1,
      'admin-menu' => 1,
      'admin-devel' => -1,
    ),
  );
  $export['admin_toolbar'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ant_feed_user_import';
  $strongarm->value = '1';
  $export['ant_feed_user_import'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ant_parent';
  $strongarm->value = '1';
  $export['ant_parent'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ant_pattern_feed_user_import';
  $strongarm->value = 'Import #[nid]';
  $export['ant_pattern_feed_user_import'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ant_pattern_parent';
  $strongarm->value = '[field_parent_name-formatted]';
  $export['ant_pattern_parent'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'backup_migrate_destination_id';
  $strongarm->value = 'download';
  $export['backup_migrate_destination_id'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'backup_migrate_profile_id';
  $strongarm->value = 'default';
  $export['backup_migrate_profile_id'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'backup_migrate_source_id';
  $strongarm->value = 'db';
  $export['backup_migrate_source_id'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'beautytips_added_selectors_array';
  $strongarm->value = array(
    0 => '',
  );
  $export['beautytips_added_selectors_array'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'beautytips_added_selectors_string';
  $strongarm->value = '';
  $export['beautytips_added_selectors_string'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'beautytips_advanced_help';
  $strongarm->value = 0;
  $export['beautytips_advanced_help'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'beautytips_always_add';
  $strongarm->value = 0;
  $export['beautytips_always_add'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'beautytips_custom_style';
  $strongarm->value = array(
    'fill' => '',
    'strokeWidth' => '',
    'strokeStyle' => '',
    'width' => '',
    'padding' => '',
    'cornerRadius' => '',
    'spikeGirth' => '',
    'spikeLength' => '',
    'shadowBlur' => '',
    'shadowColor' => '',
    'shadow' => 'default',
  );
  $export['beautytips_custom_style'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'beautytips_default_style';
  $strongarm->value = 'hulu';
  $export['beautytips_default_style'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'beautytips_drupal_help';
  $strongarm->value = 0;
  $export['beautytips_drupal_help'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'beautytips_form_id';
  $strongarm->value = '';
  $export['beautytips_form_id'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'beautytips_position';
  $strongarm->value = 'bottom';
  $export['beautytips_position'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'beautytips_show_form';
  $strongarm->value = 0;
  $export['beautytips_show_form'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'beautytips_text_input';
  $strongarm->value = 0;
  $export['beautytips_text_input'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'better_formats_allowed_folder';
  $strongarm->value = array(
    0 => 2,
  );
  $export['better_formats_allowed_folder'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'better_formats_allowed_link';
  $strongarm->value = array(
    0 => '1',
  );
  $export['better_formats_allowed_link'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'better_formats_allowed_page';
  $strongarm->value = array(
    0 => 2,
  );
  $export['better_formats_allowed_page'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'better_formats_allowed_parent';
  $strongarm->value = array(
    0 => 2,
  );
  $export['better_formats_allowed_parent'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'better_formats_allowed_parent_resource';
  $strongarm->value = array(
    0 => 2,
  );
  $export['better_formats_allowed_parent_resource'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'better_formats_allowed_referenced_page';
  $strongarm->value = array(
    0 => 2,
    1 => 5,
  );
  $export['better_formats_allowed_referenced_page'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'better_formats_allowed_site';
  $strongarm->value = array(
    0 => 2,
  );
  $export['better_formats_allowed_site'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'better_formats_fieldset_title';
  $strongarm->value = 'Text Editor';
  $export['better_formats_fieldset_title'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'better_formats_long_tips_link_text';
  $strongarm->value = ' ';
  $export['better_formats_long_tips_link_text'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'better_formats_per_node_type';
  $strongarm->value = '1';
  $export['better_formats_per_node_type'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'block_cache';
  $strongarm->value = '1';
  $export['block_cache'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'book_block_mode';
  $strongarm->value = 'book pages';
  $export['book_block_mode'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'bt-options-box-cornerRadius';
  $strongarm->value = '';
  $export['bt-options-box-cornerRadius'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'bt-options-box-fill';
  $strongarm->value = '';
  $export['bt-options-box-fill'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'bt-options-box-padding';
  $strongarm->value = '';
  $export['bt-options-box-padding'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'bt-options-box-shadow';
  $strongarm->value = 'default';
  $export['bt-options-box-shadow'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'bt-options-box-shadowBlur';
  $strongarm->value = '';
  $export['bt-options-box-shadowBlur'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'bt-options-box-shadowColor';
  $strongarm->value = '';
  $export['bt-options-box-shadowColor'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'bt-options-box-spikeGirth';
  $strongarm->value = '';
  $export['bt-options-box-spikeGirth'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'bt-options-box-spikeLength';
  $strongarm->value = '';
  $export['bt-options-box-spikeLength'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'bt-options-box-strokeStyle';
  $strongarm->value = '';
  $export['bt-options-box-strokeStyle'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'bt-options-box-strokeWidth';
  $strongarm->value = '';
  $export['bt-options-box-strokeWidth'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'bt-options-box-width';
  $strongarm->value = '';
  $export['bt-options-box-width'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'bt-options-css-color';
  $strongarm->value = '';
  $export['bt-options-css-color'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'bt-options-css-fontFamily';
  $strongarm->value = '';
  $export['bt-options-css-fontFamily'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'bt-options-css-fontSize';
  $strongarm->value = '';
  $export['bt-options-css-fontSize'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'bt-options-css-fontWeight';
  $strongarm->value = '';
  $export['bt-options-css-fontWeight'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'bt-options-cssClass';
  $strongarm->value = '';
  $export['bt-options-cssClass'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'button';
  $strongarm->value = 'Update old groups';
  $export['button'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'cache';
  $strongarm->value = '1';
  $export['cache'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'cache_flush_cache';
  $strongarm->value = 0;
  $export['cache_flush_cache'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'cache_flush_cache_block';
  $strongarm->value = 0;
  $export['cache_flush_cache_block'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'cache_flush_cache_content';
  $strongarm->value = 0;
  $export['cache_flush_cache_content'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'cache_flush_cache_filter';
  $strongarm->value = 0;
  $export['cache_flush_cache_filter'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'cache_flush_cache_form';
  $strongarm->value = 0;
  $export['cache_flush_cache_form'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'cache_flush_cache_menu';
  $strongarm->value = 0;
  $export['cache_flush_cache_menu'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'cache_flush_cache_page';
  $strongarm->value = 0;
  $export['cache_flush_cache_page'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'cache_flush_cache_views';
  $strongarm->value = 0;
  $export['cache_flush_cache_views'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'cache_flush_cache_views_data';
  $strongarm->value = 0;
  $export['cache_flush_cache_views_data'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'cache_lifetime';
  $strongarm->value = '0';
  $export['cache_lifetime'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ckeditor_link_autocomplete_menus';
  $strongarm->value = array(
    '- any -' => 0,
    'devel' => 0,
    'navigation' => 0,
    'primary-links' => 0,
    'menu-elms-reactions' => 0,
    'secondary-links' => 0,
    'menu-studio' => 0,
    'menu-usermenu' => 0,
  );
  $export['ckeditor_link_autocomplete_menus'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ckeditor_link_autocomplete_node_types';
  $strongarm->value = array(
    'folder' => 'folder',
    'link' => 'link',
    'page' => 'page',
    'referenced_page' => 'referenced_page',
    '- any -' => 0,
    'parent' => 0,
    'site' => 0,
  );
  $export['ckeditor_link_autocomplete_node_types'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ckeditor_link_autocomplete_vocabularies';
  $strongarm->value = array(
    '- any -' => 0,
    1 => 0,
  );
  $export['ckeditor_link_autocomplete_vocabularies'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ckeditor_link_type_name';
  $strongarm->value = 'Internal path';
  $export['ckeditor_link_type_name'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ckeditor_link_type_selected';
  $strongarm->value = 1;
  $export['ckeditor_link_type_selected'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'customerror_404';
  $strongarm->value = '<?php
$failed_path = split(\'_\',$_REQUEST[\'destination\'],2);
$path = drupal_lookup_path(\'source\', $failed_path[0]);
$path = split(\'/\',$path,2);
$node = node_load($path[1]);
if (isset($node->nid)) {
  unset($_REQUEST[\'destination\']);
  drupal_goto(\'node/\'. $node->nid);
}
?>requested page not found';
  $export['customerror_404'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'customerror_404_php';
  $strongarm->value = '1';
  $export['customerror_404_php'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'customerror_404_title';
  $strongarm->value = 'requested page not found';
  $export['customerror_404_title'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'date_format_long';
  $strongarm->value = 'l, F j, Y - g:ia';
  $export['date_format_long'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'date_format_long_custom';
  $strongarm->value = 'l, F j, Y - H:i';
  $export['date_format_long_custom'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'date_format_medium';
  $strongarm->value = 'D, m/d/Y - g:ia';
  $export['date_format_medium'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'date_format_medium_custom';
  $strongarm->value = 'D, m/d/Y - H:i';
  $export['date_format_medium_custom'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'date_format_schedule_date';
  $strongarm->value = 'D m/d';
  $export['date_format_schedule_date'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'date_format_schedule_date_2';
  $strongarm->value = 'D, m/d/Y - H:i';
  $export['date_format_schedule_date_2'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'date_format_short';
  $strongarm->value = 'm/d/Y - g:ia';
  $export['date_format_short'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'date_format_short_custom';
  $strongarm->value = 'm/d/Y - H:i';
  $export['date_format_short_custom'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'default_container';
  $strongarm->value = '-1';
  $export['default_container'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'default_feeds_tamper';
  $strongarm->value = array(
    'user_import-xpathparser_2-drupal_roles' => '',
    'user_import-xpathparser_1-convert_case' => '',
    'user_import-xpathparser_0-convert_case' => '',
    'user_import-xpathparser_1-rewrite' => '',
    'elms_node_import-xpathparser_3-current_user_id' => '',
  );
  $export['default_feeds_tamper'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'dev_mem';
  $strongarm->value = 1;
  $export['dev_mem'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'dev_query';
  $strongarm->value = 1;
  $export['dev_query'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'dev_timer';
  $strongarm->value = 1;
  $export['dev_timer'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'devel_error_handler';
  $strongarm->value = '1';
  $export['devel_error_handler'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'devel_execution';
  $strongarm->value = '5';
  $export['devel_execution'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'devel_query_display';
  $strongarm->value = 0;
  $export['devel_query_display'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'devel_query_sort';
  $strongarm->value = '1';
  $export['devel_query_sort'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'enable_revisions_page_accessibility_guideline';
  $strongarm->value = '1';
  $export['enable_revisions_page_accessibility_guideline'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'enable_revisions_page_accessibility_test';
  $strongarm->value = '1';
  $export['enable_revisions_page_accessibility_test'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'enable_revisions_page_link';
  $strongarm->value = '1';
  $export['enable_revisions_page_link'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'enable_revisions_page_page';
  $strongarm->value = '1';
  $export['enable_revisions_page_page'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'enable_revisions_page_parent';
  $strongarm->value = '1';
  $export['enable_revisions_page_parent'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'enable_revisions_page_parent_event';
  $strongarm->value = '1';
  $export['enable_revisions_page_parent_event'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'enable_revisions_page_site';
  $strongarm->value = '1';
  $export['enable_revisions_page_site'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'error_level';
  $strongarm->value = '1';
  $export['error_level'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'feed_default_items';
  $strongarm->value = '5';
  $export['feed_default_items'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'feed_item_length';
  $strongarm->value = 'title';
  $export['feed_item_length'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'feeds_reschedule';
  $strongarm->value = FALSE;
  $export['feeds_reschedule'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ffp_parent_field_parent_promotion';
  $strongarm->value = 0;
  $export['ffp_parent_field_parent_promotion'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ffp_parent_resource_field_cr_logo';
  $strongarm->value = 0;
  $export['ffp_parent_resource_field_cr_logo'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ffp_upload_accessibility_guideline';
  $strongarm->value = array(
    0 => 'file_path_cleanup',
    1 => 'file_name',
    2 => 'file_name_cleanup',
  );
  $export['ffp_upload_accessibility_guideline'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ffp_upload_accessibility_test';
  $strongarm->value = array(
    0 => 'file_path_cleanup',
    1 => 'file_name',
    2 => 'file_name_cleanup',
  );
  $export['ffp_upload_accessibility_test'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ffp_upload_folder';
  $strongarm->value = array(
    0 => 'file_path_cleanup',
    1 => 'file_name',
    2 => 'file_name_cleanup',
  );
  $export['ffp_upload_folder'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ffp_upload_link';
  $strongarm->value = array(
    0 => 'file_path_cleanup',
    1 => 'file_name',
    2 => 'file_name_cleanup',
  );
  $export['ffp_upload_link'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ffp_upload_page';
  $strongarm->value = array(
    0 => 'file_path_cleanup',
    1 => 'file_name',
    2 => 'file_name_cleanup',
  );
  $export['ffp_upload_page'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ffp_upload_parent';
  $strongarm->value = array(
    0 => 'file_path_cleanup',
    1 => 'file_name',
    2 => 'file_name_cleanup',
  );
  $export['ffp_upload_parent'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ffp_upload_parent_event';
  $strongarm->value = array(
    0 => 'file_path_cleanup',
    1 => 'file_name',
    2 => 'file_name_cleanup',
  );
  $export['ffp_upload_parent_event'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ffp_upload_reaction';
  $strongarm->value = array(
    0 => 'file_path_cleanup',
    1 => 'file_name',
    2 => 'file_name_cleanup',
  );
  $export['ffp_upload_reaction'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ffp_upload_site';
  $strongarm->value = array(
    0 => 'file_path_cleanup',
    1 => 'file_name',
    2 => 'file_name_cleanup',
  );
  $export['ffp_upload_site'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ffp_upload_studio_submission';
  $strongarm->value = array(
    0 => 'file_path_cleanup',
    1 => 'file_name',
    2 => 'file_name_cleanup',
  );
  $export['ffp_upload_studio_submission'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'file_downloads';
  $strongarm->value = '1';
  $export['file_downloads'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'filter_default_format';
  $strongarm->value = '1';
  $export['filter_default_format'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'filter_html_4';
  $strongarm->value = '1';
  $export['filter_html_4'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'filter_html_help_4';
  $strongarm->value = '1';
  $export['filter_html_help_4'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'filter_url_length_2';
  $strongarm->value = '72';
  $export['filter_url_length_2'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'filter_url_length_4';
  $strongarm->value = '72';
  $export['filter_url_length_4'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'flag_default_flag_status';
  $strongarm->value = array(
    'bookmarks' => '1',
  );
  $export['flag_default_flag_status'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'htmlpurifier_config_2';
  $strongarm->value = array(
    'Null_Attr.AllowedClasses' => '1',
    'Attr.AllowedFrameTargets' => '',
    'Attr.AllowedRel' => '',
    'Attr.AllowedRev' => '',
    'Null_Attr.ClassUseCDATA' => '1',
    'Null_Attr.DefaultImageAlt' => '1',
    'Attr.DefaultInvalidImage' => '',
    'Attr.DefaultInvalidImageAlt' => 'Invalid image',
    'Attr.DefaultTextDir' => 'ltr',
    'Attr.EnableID' => '0',
    'Attr.ForbiddenClasses' => '',
    'Attr.IDBlacklist' => '',
    'Null_Attr.IDBlacklistRegexp' => '1',
    'Attr.IDPrefix' => '',
    'Attr.IDPrefixLocal' => '',
    'AutoFormat.AutoParagraph' => '0',
    'AutoFormat.Custom' => '',
    'AutoFormat.DisplayLinkURI' => '0',
    'AutoFormat.Linkify' => '0',
    'AutoFormat.PurifierLinkify.DocURL' => '#%s',
    'AutoFormat.PurifierLinkify' => '0',
    'AutoFormat.RemoveEmpty.RemoveNbsp.Exceptions' => 'td
th
tr
iframe',
    'AutoFormat.RemoveEmpty.RemoveNbsp' => '1',
    'AutoFormat.RemoveEmpty' => '1',
    'AutoFormat.RemoveSpansWithoutAttributes' => '1',
    'CSS.AllowImportant' => '0',
    'CSS.AllowTricky' => '0',
    'Null_CSS.AllowedFonts' => '1',
    'Null_CSS.AllowedProperties' => '1',
    'CSS.ForbiddenProperties' => '',
    'CSS.MaxImgLength' => '1200px',
    'CSS.Proprietary' => '0',
    'CSS.Trusted' => '0',
    'Cache.DefinitionImpl' => 'Drupal',
    'Null_Cache.SerializerPath' => '1',
    'Cache.SerializerPermissions' => '493',
    'Core.AggressivelyFixLt' => '1',
    'Core.CollectErrors' => '0',
    'Core.ColorKeywords' => 'maroon:#800000
red:#FF0000
orange:#FFA500
yellow:#FFFF00
olive:#808000
purple:#800080
fuchsia:#FF00FF
white:#FFFFFF
lime:#00FF00
green:#008000
navy:#000080
blue:#0000FF
aqua:#00FFFF
teal:#008080
black:#000000
silver:#C0C0C0
gray:#808080
',
    'Core.ConvertDocumentToFragment' => '1',
    'Core.DirectLexLineNumberSyncInterval' => '0',
    'Core.Encoding' => 'utf-8',
    'Core.EscapeInvalidChildren' => '0',
    'Core.EscapeInvalidTags' => '0',
    'Core.EscapeNonASCIICharacters' => '0',
    'Core.HiddenElements' => 'script
style',
    'Core.Language' => 'en',
    'Null_Core.LexerImpl' => '1',
    'Null_Core.MaintainLineNumbers' => '1',
    'Core.NormalizeNewlines' => '1',
    'Core.RemoveInvalidImg' => '1',
    'Core.RemoveProcessingInstructions' => '0',
    'Null_Core.RemoveScriptContents' => '1',
    'Filter.Custom' => '',
    'Filter.ExtractStyleBlocks.Escaping' => '1',
    'Null_Filter.ExtractStyleBlocks.Scope' => '1',
    'Null_Filter.ExtractStyleBlocks.TidyImpl' => '1',
    'Filter.ExtractStyleBlocks' => '0',
    'Filter.YouTube' => '1',
    'Null_HTML.Allowed' => '1',
    'HTML.AllowedAttributes' => 'a.href
img.src
img.alt
*.class
td.scope
th.scope
table.summary
iframe.width
iframe.height
iframe.src
iframe.name
iframe.id
iframe.frameborder',
    'HTML.AllowedElements' => 'a
p
h2
fieldset
pre
iframe
legend
table
li
ul
ol
tr
td
th
caption
blockquote
span
strong
em
div
img
abbr
sub
sup',
    'Null_HTML.AllowedModules' => '1',
    'HTML.Attr.Name.UseCDATA' => '0',
    'HTML.BlockWrapper' => 'p',
    'HTML.CoreModules' => 'Structure
Text
Hypertext
List
NonXMLCommonAttributes
XMLCommonAttributes
CommonAttributes',
    'Null_HTML.CustomDoctype' => '1',
    'HTML.Doctype' => 'XHTML 1.0 Transitional',
    'HTML.FlashAllowFullScreen' => '0',
    'HTML.ForbiddenAttributes' => 'style',
    'HTML.ForbiddenElements' => 'h1
h3
h4
h5
h6',
    'HTML.MaxImgLength' => '1200',
    'HTML.Nofollow' => '0',
    'HTML.Parent' => 'div',
    'HTML.Proprietary' => '0',
    'HTML.SafeEmbed' => '1',
    'HTML.SafeObject' => '1',
    'HTML.Strict' => '0',
    'HTML.TidyAdd' => '',
    'HTML.TidyLevel' => 'heavy',
    'HTML.TidyRemove' => '',
    'HTML.Trusted' => '0',
    'HTML.XHTML' => '1',
    'Output.CommentScriptContents' => '1',
    'Output.FixInnerHTML' => '1',
    'Output.FlashCompat' => '1',
    'Null_Output.Newline' => '1',
    'Output.SortAttr' => '0',
    'Output.TidyFormat' => '0',
    'Test.ForceNoIconv' => '0',
    'URI.AllowedSchemes' => 'http
https
mailto
ftp
nntp
news',
    'Null_URI.Base' => '1',
    'URI.DefaultScheme' => 'http',
    'URI.Disable' => '0',
    'URI.DisableExternal' => '0',
    'URI.DisableExternalResources' => '0',
    'URI.DisableResources' => '0',
    'URI.Host' => 'online.aanda.psu.edu',
    'URI.HostBlacklist' => '',
    'URI.MakeAbsolute' => '0',
    'Null_URI.Munge' => '1',
    'URI.MungeResources' => '0',
    'Null_URI.MungeSecretKey' => '1',
    'URI.OverrideAllowedSchemes' => '1',
  );
  $export['htmlpurifier_config_2'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'htmlpurifier_doublecache';
  $strongarm->value = 0;
  $export['htmlpurifier_doublecache'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'htmlpurifier_help_2';
  $strongarm->value = 1;
  $export['htmlpurifier_help_2'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'image_jpeg_quality';
  $strongarm->value = '90';
  $export['image_jpeg_quality'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'image_toolkit';
  $strongarm->value = 'gd';
  $export['image_toolkit'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'imageapi_image_toolkit';
  $strongarm->value = 'imageapi_gd';
  $export['imageapi_image_toolkit'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'imageapi_jpeg_quality';
  $strongarm->value = '90';
  $export['imageapi_jpeg_quality'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'imce_settings_absurls';
  $strongarm->value = '1';
  $export['imce_settings_absurls'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'imce_settings_replace';
  $strongarm->value = '0';
  $export['imce_settings_replace'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'imce_settings_thumb_method';
  $strongarm->value = 'scale_and_crop';
  $export['imce_settings_thumb_method'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'jquery_colorpicker_ie6_support';
  $strongarm->value = 0;
  $export['jquery_colorpicker_ie6_support'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'jquery_update_compression_type';
  $strongarm->value = 'none';
  $export['jquery_update_compression_type'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'jquery_update_replace';
  $strongarm->value = TRUE;
  $export['jquery_update_replace'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'locale_custom_disabled_strings_en';
  $strongarm->value = array();
  $export['locale_custom_disabled_strings_en'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'locale_custom_strings_en';
  $strongarm->value = array(
    'A brief description for the group details block and the group directory.' => 'Enter a short studio topic description',
    'Add New Site' => 'Add New Studio',
    'Add Parent' => 'Add Course',
    'Add Site' => 'Add Studio',
    'Books need to have at least one piece of content in them in order to work correctly with the outline designer' => 'Studio Outlines need to have at least one piece of content in them before you can work with the outline designer',
    'Choose a path. May contain only lowercase letters, numbers, dashes and underscores. e.g. "my-value"' => '"Choose a path for your studio. May only contain lowercase letters and numbers. e.g. "art010""',
    'Create Parent' => 'Create Course',
    'Create Sandbox' => 'Create Studio',
    'Create Site' => 'Create Studio',
    'Delete all group posts which don\'t also belong to another group.' => 'Delete all content of this studio.',
    'Delete group' => 'Delete Course Studio',
    'Editorial note' => 'Instructor Highlight',
    'Enroll in a group' => 'Enter code',
    'Enter a registration key if you want to allow users to enter a key to join this group. Leave this field blank if you do not want to allow users to join this group with a registration key.' => 'Enter a passcode if you want to restrict your course studio materials to only the people you give the code to.',
    'Enter the username to masquerade as.' => '',
    'Enter your message text here' => 'Type your questions here',
    'Go' => 'Masquerade',
    'Group activity' => 'Course Activity',
    'Group Name' => 'Studio Name',
    'Group posts' => 'How should studio content be handled?',
    'Group registration key' => 'Studio Passcode',
    'Group space' => 'Type of Studio',
    'Group Stats' => 'Status',
    'Groups' => 'Course Studios',
    'If you chose <strong>Move all group posts</strong> above, specify a destination group.' => 'If you chose <strong>move all course studio content</strong>, specify the destination studio.',
    'In addition to deleting this group, you choose how to disposition the posts and memberships within it.' => '',
    'Join' => 'Enter Course Studio',
    'Make your personal annotations about this content here. When marked private only you (and the site administrator) will be able to see them.' => 'Notes on content will only be visible to you and instructional staff.',
    'Move all group posts and memberships to the group listed below.' => 'Move all studio content and students/instructors to the studio selected below.',
    'Move all group posts to the group listed below.' => 'Move all studio content to the studio selected below.',
    'My groups' => 'My Courses',
    'No groups found.' => 'No course studios found.',
    'No posts in this group.' => ' ',
    'No public posts in this group.' => '',
    'No public posts in this group. Consider <a href="!url">joining this group</a> in order to view its posts.' => '',
    'No public posts in this group. You must <a href="!login">login</a> and become a member in order to post messages, and view any private posts.' => '',
    'No public posts in this group. You must <a href="!register">register</a> or <a href="!login">login</a> and become a member in order to post messages, and view any private posts.' => '',
    'Parent' => 'Course',
    'Parent Status' => 'Course Status',
    'Parents' => 'Courses',
    'Rearrange child pages' => 'Edit Outline',
    'Sandbox' => 'Studio',
    'Search group' => 'Search Course',
    'Selecting a different theme will change the look and feel of the group.' => 'Select a theme for the course studio',
    'Site' => 'Studio',
    'Site State: @workflow' => 'Studio Status: @workflow',
    'Site Status' => 'Studio Status',
    'Sites' => 'Studios',
    'Submit' => 'Save',
    'Target group' => 'Target Studio',
    'Theme configuration' => 'Theme',
    'This action cannot be undone.' => '<strong>This action cannot be undone.</strong>',
    'Use a registration key to enroll in a group.' => '',
    'You are now a member of !group_name.' => 'You are now enrolled in !group_name.',
    'You are now a member of %group.' => 'You are now enrolled in %group.',
    'Site Settings' => 'Studio Settings',
  );
  $export['locale_custom_strings_en'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'masquerade_admin_roles';
  $strongarm->value = array(
    3 => '3',
    1 => '0',
    2 => '0',
    7 => '0',
    6 => '0',
    4 => '0',
  );
  $export['masquerade_admin_roles'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_primary_links_source';
  $strongarm->value = 'features';
  $export['menu_primary_links_source'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_secondary_links_source';
  $strongarm->value = 'features';
  $export['menu_secondary_links_source'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_accessibility_guideline';
  $strongarm->value = array(
    0 => 'status',
    1 => 'promote',
  );
  $export['node_options_accessibility_guideline'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_accessibility_test';
  $strongarm->value = array(
    0 => 'status',
    1 => 'promote',
  );
  $export['node_options_accessibility_test'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_feed_user_import';
  $strongarm->value = array(
    0 => 'status',
    1 => 'revision',
  );
  $export['node_options_feed_user_import'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_feed_user_import_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '1',
      'hidden' => '0',
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => '',
      'title' => 'Menu settings',
      'collapsed' => '1',
      'hidden' => '1',
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => '',
      'title' => 'Revision information',
      'collapsed' => '1',
      'hidden' => '1',
    ),
    'path' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => '',
      'title' => 'URL path settings',
      'collapsed' => '1',
      'hidden' => '1',
    ),
    'options' => array(
      'region' => 'main',
      'weight' => '4',
      'has_required' => '',
      'title' => 'Publishing options',
      'collapsed' => '1',
      'hidden' => '0',
    ),
    'author' => array(
      'region' => 'main',
      'weight' => '3',
      'has_required' => '',
      'title' => 'Authoring information',
      'collapsed' => '1',
      'hidden' => '0',
    ),
    'buttons' => array(
      'region' => 'main',
      'weight' => '5',
      'has_required' => '',
      'title' => '',
      'hidden' => '0',
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => '',
      'title' => 'Book outline',
      'collapsed' => '1',
      'hidden' => '1',
    ),
    'feeds' => array(
      'region' => 'main',
      'weight' => '0',
      'has_required' => '1',
      'title' => 'Feed',
    ),
    'og_nodeapi' => array(
      'region' => 'main',
      'weight' => '2',
      'has_required' => '',
      'title' => 'Course Versions',
      'collapsed' => '1',
      'hidden' => '0',
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => '',
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => '1',
      'hidden' => '1',
    ),
  );
  $export['nodeformscols_field_placements_feed_user_import_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_folder_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '-5',
      'has_required' => TRUE,
      'title' => 'Title',
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '0.008',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => 'Revision information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'path' => array(
      'region' => 'right',
      'weight' => '7',
      'has_required' => FALSE,
      'title' => 'URL path settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'options' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'Publishing options',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'author' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Authoring information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'buttons' => array(
      'region' => 'main',
      'weight' => '100',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'og_nodeapi' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Course Versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
  );
  $export['nodeformscols_field_placements_folder_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_link_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '0',
      'has_required' => TRUE,
      'title' => 'Title',
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '7',
      'has_required' => FALSE,
      'title' => 'Revision information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'comment_settings' => array(
      'region' => 'right',
      'weight' => '10',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 1,
    ),
    'path' => array(
      'region' => 'right',
      'weight' => '9',
      'has_required' => FALSE,
      'title' => 'URL path settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'options' => array(
      'region' => 'right',
      'weight' => '8',
      'has_required' => FALSE,
      'title' => 'Publishing options',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'author' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'Authoring information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'buttons' => array(
      'region' => 'main',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'og_nodeapi' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Course Versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'field_link' => array(
      'region' => 'main',
      'weight' => '1',
      'has_required' => TRUE,
      'title' => 'Link',
    ),
    'sections' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 1,
    ),
    'custom_breadcrumbs' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 1,
    ),
  );
  $export['nodeformscols_field_placements_link_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_page_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '2',
      'has_required' => TRUE,
      'title' => 'Title',
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'Revision information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'path' => array(
      'region' => 'right',
      'weight' => '8',
      'has_required' => FALSE,
      'title' => 'URL path settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'options' => array(
      'region' => 'right',
      'weight' => '7',
      'has_required' => FALSE,
      'title' => 'Publishing options',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'author' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => 'Authoring information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'buttons' => array(
      'region' => 'main',
      'weight' => '7',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'og_nodeapi' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Course Versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'custom_breadcrumbs' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 1,
    ),
  );
  $export['nodeformscols_field_placements_page_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_elms_resource_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '-5',
      'has_required' => TRUE,
      'title' => 'Title',
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '0.008',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Revision information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'path' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'URL path settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'options' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => 'Publishing options',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'author' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Authoring information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'buttons' => array(
      'region' => 'main',
      'weight' => '100',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'field_cr_logo' => array(
      'region' => 'main',
      'weight' => '-4',
      'has_required' => FALSE,
      'title' => 'Logo',
      'hidden' => 0,
    ),
    'field_resource_link' => array(
      'region' => 'main',
      'weight' => '-3',
      'has_required' => TRUE,
      'title' => 'Link to Resource',
    ),
    'field_short_description' => array(
      'region' => 'main',
      'weight' => '-2',
      'has_required' => TRUE,
      'title' => 'Short Description',
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
  );
  $export['nodeformscols_field_placements_elms_resource_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_parent_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '2',
      'has_required' => '1',
      'title' => 'Course Name',
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'Revision information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'comment_settings' => array(
      'region' => 'right',
      'weight' => '8',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 1,
    ),
    'path' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'URL path settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'options' => array(
      'region' => 'right',
      'weight' => '7',
      'has_required' => FALSE,
      'title' => 'Publishing options',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'author' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => 'Authoring information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'buttons' => array(
      'region' => 'main',
      'weight' => '7',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'taxonomy' => array(
      'region' => 'main',
      'weight' => '0',
      'has_required' => TRUE,
      'title' => NULL,
    ),
    'field_parent_name' => array(
      'region' => 'main',
      'weight' => '1',
      'has_required' => TRUE,
      'title' => 'Name',
    ),
    'group_additional_settings' => array(
      'region' => 'main',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Additional Information',
      'hidden' => 0,
      'collapsed' => 1,
    ),
    'group_requirements' => array(
      'region' => 'main',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'Technical Requirements',
      'collapsed' => 1,
      'hidden' => 0,
    ),
    'group_administrative' => array(
      'region' => 'main',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => 'Administrative',
      'hidden' => 0,
      'collapsed' => 1,
    ),
    'field_listing_only' => array(
      'region' => 'main',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Listing Only',
      'hidden' => 0,
    ),
  );
  $export['nodeformscols_field_placements_parent_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_parent_resource_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '0',
      'has_required' => TRUE,
      'title' => 'Title',
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => 'Revision information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'path' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'URL path settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'options' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Publishing options',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'author' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Authoring information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'buttons' => array(
      'region' => 'main',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'field_resource_link' => array(
      'region' => 'main',
      'weight' => '1',
      'has_required' => TRUE,
      'title' => 'Link to Resource',
    ),
    'field_cr_logo' => array(
      'region' => 'main',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Logo',
      'hidden' => 0,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'field_short_description' => array(
      'region' => 'main',
      'weight' => '3',
      'has_required' => TRUE,
      'title' => 'Short Description',
    ),
  );
  $export['nodeformscols_field_placements_parent_resource_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_referenced_page_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '-5',
      'has_required' => TRUE,
      'title' => 'Title',
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => 'Revision information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'path' => array(
      'region' => 'right',
      'weight' => '7',
      'has_required' => FALSE,
      'title' => 'URL path settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'options' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'Publishing options',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'author' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Authoring information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'buttons' => array(
      'region' => 'main',
      'weight' => '100',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'field_reference_page' => array(
      'region' => 'main',
      'weight' => '-2',
      'has_required' => TRUE,
      'title' => 'Reference',
    ),
    'og_nodeapi' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Course Versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
  );
  $export['nodeformscols_field_placements_referenced_page_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_site_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '0',
      'has_required' => TRUE,
      'title' => 'Version Name',
    ),
    'menu' => array(
      'region' => 'footer',
      'weight' => '7',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'footer',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Revision information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'comment_settings' => array(
      'region' => 'footer',
      'weight' => '8',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 1,
    ),
    'path' => array(
      'region' => 'footer',
      'weight' => '10',
      'has_required' => FALSE,
      'title' => 'URL path settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'options' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Publishing options',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'author' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Authoring information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'buttons' => array(
      'region' => 'main',
      'weight' => '7',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'footer',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'field_parent_ref' => array(
      'region' => 'main',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Course',
      'hidden' => 0,
    ),
    'og_description' => array(
      'region' => 'main',
      'weight' => '2',
      'has_required' => TRUE,
      'title' => 'Description',
      'hidden' => '0',
    ),
    'og_selective' => array(
      'region' => 'footer',
      'weight' => '1',
      'has_required' => TRUE,
      'title' => 'Membership requests',
    ),
    'og_register' => array(
      'region' => 'footer',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Registration form',
      'hidden' => 1,
    ),
    'og_directory' => array(
      'region' => 'footer',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'List in groups directory',
      'hidden' => 1,
    ),
    'themes' => array(
      'region' => 'main',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Theme',
      'collapsed' => 1,
      'hidden' => 0,
    ),
    'print' => array(
      'region' => 'footer',
      'weight' => '9',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'workflow' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 1,
    ),
    'og_private' => array(
      'region' => 'footer',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => 'Private group',
      'hidden' => 1,
    ),
    'purl' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 1,
    ),
    'group_content' => array(
      'region' => 'main',
      'weight' => '3',
      'has_required' => TRUE,
      'title' => 'Content',
      'hidden' => '0',
      'collapsed' => 1,
    ),
    'group_section_info' => array(
      'region' => 'main',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => 'Section Info',
      'hidden' => 0,
      'collapsed' => 1,
    ),
    'group_site_settings' => array(
      'region' => 'main',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'Additional Settings',
      'hidden' => 0,
    ),
  );
  $export['nodeformscols_field_placements_site_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_audience_required';
  $strongarm->value = '1';
  $export['og_audience_required'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_audience_site';
  $strongarm->value = array(
    0 => 'link',
    1 => 'page',
    2 => 'elms_event',
  );
  $export['og_audience_site'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_contact_display_tab';
  $strongarm->value = '1';
  $export['og_contact_display_tab'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_contact_enable_all';
  $strongarm->value = '1';
  $export['og_contact_enable_all'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_contact_group_admin_single';
  $strongarm->value = '1';
  $export['og_contact_group_admin_single'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_contact_group_name_in_subject';
  $strongarm->value = '1';
  $export['og_contact_group_name_in_subject'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_contact_group_not_public';
  $strongarm->value = '1';
  $export['og_contact_group_not_public'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_contact_group_recipients';
  $strongarm->value = '1';
  $export['og_contact_group_recipients'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_accessibility_guideline';
  $strongarm->value = 'omitted';
  $export['og_content_type_usage_accessibility_guideline'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_accessibility_test';
  $strongarm->value = 'omitted';
  $export['og_content_type_usage_accessibility_test'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_feed_user_import';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_feed_user_import'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_folder';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_folder'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_link';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_link'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_page';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_page'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_parent_resource';
  $strongarm->value = 'omitted';
  $export['og_content_type_usage_parent_resource'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_referenced_page';
  $strongarm->value = 'group_post_standard';
  $export['og_content_type_usage_referenced_page'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_description_enforce_site';
  $strongarm->value = '1';
  $export['og_description_enforce_site'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_description_optional_site';
  $strongarm->value = '1';
  $export['og_description_optional_site'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_home_page_view';
  $strongarm->value = '0';
  $export['og_home_page_view'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_folder';
  $strongarm->value = '';
  $export['og_max_groups_folder'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_page';
  $strongarm->value = '';
  $export['og_max_groups_page'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_parent';
  $strongarm->value = '';
  $export['og_max_groups_parent'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_parent_resource';
  $strongarm->value = '';
  $export['og_max_groups_parent_resource'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_max_groups_referenced_page';
  $strongarm->value = '';
  $export['og_max_groups_referenced_page'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_private_groups';
  $strongarm->value = '3';
  $export['og_private_groups'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_private_parent';
  $strongarm->value = '1';
  $export['og_private_parent'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_private_site';
  $strongarm->value = '1';
  $export['og_private_site'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_selective_enforce_site';
  $strongarm->value = '1';
  $export['og_selective_enforce_site'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_selective_parent';
  $strongarm->value = '0';
  $export['og_selective_parent'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_selective_site';
  $strongarm->value = '3';
  $export['og_selective_site'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_visibility';
  $strongarm->value = '0';
  $export['og_visibility'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_visibility_directory';
  $strongarm->value = '1';
  $export['og_visibility_directory'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_visibility_registration';
  $strongarm->value = '0';
  $export['og_visibility_registration'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_collapse_toggle';
  $strongarm->value = 1;
  $export['outline_designer_collapse_toggle'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_context_menu_exclusion_matrix';
  $strongarm->value = array(
    2 => array(
      'nid' => array(
        'unchecked' => TRUE,
      ),
      'add_content' => array(
        'unchecked' => TRUE,
      ),
      'rename' => array(
        'unchecked' => TRUE,
      ),
      'edit' => array(
        'unchecked' => TRUE,
      ),
      'view' => array(
        'unchecked' => TRUE,
      ),
      'delete' => array(
        'unchecked' => TRUE,
      ),
      'duplicate' => array(
        'unchecked' => TRUE,
      ),
      'change_type' => array(
        'unchecked' => TRUE,
      ),
    ),
    4 => array(
      'nid' => array(
        'unchecked' => TRUE,
      ),
      'delete' => array(
        'unchecked' => TRUE,
      ),
      'duplicate' => array(
        'unchecked' => TRUE,
      ),
      'change_type' => array(
        'unchecked' => TRUE,
      ),
    ),
    9 => array(
      'nid' => array(
        'unchecked' => TRUE,
      ),
      'delete' => array(
        'unchecked' => TRUE,
      ),
      'duplicate' => array(
        'unchecked' => TRUE,
      ),
      'change_type' => array(
        'unchecked' => TRUE,
      ),
    ),
    10 => array(
      'nid' => array(
        'unchecked' => TRUE,
      ),
      'add_content' => array(
        'unchecked' => TRUE,
      ),
      'rename' => array(
        'unchecked' => TRUE,
      ),
      'edit' => array(
        'unchecked' => TRUE,
      ),
      'view' => array(
        'unchecked' => TRUE,
      ),
      'delete' => array(
        'unchecked' => TRUE,
      ),
      'duplicate' => array(
        'unchecked' => TRUE,
      ),
      'change_type' => array(
        'unchecked' => TRUE,
      ),
    ),
    8 => array(
      'nid' => array(
        'unchecked' => TRUE,
      ),
      'add_content' => array(
        'unchecked' => TRUE,
      ),
      'rename' => array(
        'unchecked' => TRUE,
      ),
      'edit' => array(
        'unchecked' => TRUE,
      ),
      'view' => array(
        'unchecked' => TRUE,
      ),
      'delete' => array(
        'unchecked' => TRUE,
      ),
      'duplicate' => array(
        'unchecked' => TRUE,
      ),
      'change_type' => array(
        'unchecked' => TRUE,
      ),
    ),
  );
  $export['outline_designer_context_menu_exclusion_matrix'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_accessibility_guideline_icon';
  $strongarm->value = '';
  $export['outline_designer_accessibility_guideline_icon'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_accessibility_test_icon';
  $strongarm->value = '';
  $export['outline_designer_accessibility_test_icon'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_folder_icon';
  $strongarm->value = 'profiles/elms/modules/contrib/outline_designer/images/folder.png';
  $export['outline_designer_folder_icon'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_link_icon';
  $strongarm->value = 'profiles/elms/modules/contrib/outline_designer/images/additional_icons/link.png';
  $export['outline_designer_link_icon'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_page_icon';
  $strongarm->value = 'profiles/elms/modules/contrib/outline_designer/images/page.png';
  $export['outline_designer_page_icon'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_parent_icon';
  $strongarm->value = '';
  $export['outline_designer_parent_icon'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_referenced_page_icon';
  $strongarm->value = 'profiles/elms/modules/contrib/outline_designer/images/additional_icons/view.png';
  $export['outline_designer_referenced_page_icon'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_site_icon';
  $strongarm->value = '';
  $export['outline_designer_site_icon'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_theme';
  $strongarm->value = 'human';
  $export['outline_designer_theme'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'page_cache_max_age';
  $strongarm->value = '0';
  $export['page_cache_max_age'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'page_compression';
  $strongarm->value = '0';
  $export['page_compression'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_case';
  $strongarm->value = '1';
  $export['pathauto_case'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_contact_bulkupdate';
  $strongarm->value = 0;
  $export['pathauto_contact_bulkupdate'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_contact_pattern';
  $strongarm->value = '';
  $export['pathauto_contact_pattern'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_contact_supportsfeeds';
  $strongarm->value = '';
  $export['pathauto_contact_supportsfeeds'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_max_bulk_update';
  $strongarm->value = '1000';
  $export['pathauto_max_bulk_update'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_announcement_pattern';
  $strongarm->value = 'announcements/[title-raw]';
  $export['pathauto_node_announcement_pattern'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_folder_pattern';
  $strongarm->value = '';
  $export['pathauto_node_folder_pattern'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_link_pattern';
  $strongarm->value = '';
  $export['pathauto_node_link_pattern'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_parent_pattern';
  $strongarm->value = '[title-raw]';
  $export['pathauto_node_parent_pattern'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_site_pattern';
  $strongarm->value = '';
  $export['pathauto_node_site_pattern'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_supportsfeeds';
  $strongarm->value = 'feed';
  $export['pathauto_node_supportsfeeds'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_ampersand';
  $strongarm->value = '0';
  $export['pathauto_punctuation_ampersand'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_asterisk';
  $strongarm->value = '0';
  $export['pathauto_punctuation_asterisk'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_at';
  $strongarm->value = '0';
  $export['pathauto_punctuation_at'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_back_slash';
  $strongarm->value = '0';
  $export['pathauto_punctuation_back_slash'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_backtick';
  $strongarm->value = '0';
  $export['pathauto_punctuation_backtick'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_caret';
  $strongarm->value = '0';
  $export['pathauto_punctuation_caret'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_colon';
  $strongarm->value = '0';
  $export['pathauto_punctuation_colon'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_comma';
  $strongarm->value = '0';
  $export['pathauto_punctuation_comma'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_dollar';
  $strongarm->value = '0';
  $export['pathauto_punctuation_dollar'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_double_quotes';
  $strongarm->value = '0';
  $export['pathauto_punctuation_double_quotes'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_equal';
  $strongarm->value = '0';
  $export['pathauto_punctuation_equal'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_exclamation';
  $strongarm->value = '0';
  $export['pathauto_punctuation_exclamation'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_greater_than';
  $strongarm->value = '0';
  $export['pathauto_punctuation_greater_than'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_hash';
  $strongarm->value = '0';
  $export['pathauto_punctuation_hash'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_left_curly';
  $strongarm->value = '0';
  $export['pathauto_punctuation_left_curly'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_left_parenthesis';
  $strongarm->value = '0';
  $export['pathauto_punctuation_left_parenthesis'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_left_square';
  $strongarm->value = '0';
  $export['pathauto_punctuation_left_square'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_less_than';
  $strongarm->value = '0';
  $export['pathauto_punctuation_less_than'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_percent';
  $strongarm->value = '0';
  $export['pathauto_punctuation_percent'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_period';
  $strongarm->value = '0';
  $export['pathauto_punctuation_period'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_pipe';
  $strongarm->value = '0';
  $export['pathauto_punctuation_pipe'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_plus';
  $strongarm->value = '0';
  $export['pathauto_punctuation_plus'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_question_mark';
  $strongarm->value = '0';
  $export['pathauto_punctuation_question_mark'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_right_curly';
  $strongarm->value = '0';
  $export['pathauto_punctuation_right_curly'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_right_parenthesis';
  $strongarm->value = '0';
  $export['pathauto_punctuation_right_parenthesis'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_right_square';
  $strongarm->value = '0';
  $export['pathauto_punctuation_right_square'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_semicolon';
  $strongarm->value = '0';
  $export['pathauto_punctuation_semicolon'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_slash';
  $strongarm->value = '0';
  $export['pathauto_punctuation_slash'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_tilde';
  $strongarm->value = '0';
  $export['pathauto_punctuation_tilde'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_punctuation_underscore';
  $strongarm->value = '0';
  $export['pathauto_punctuation_underscore'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_reduce_ascii';
  $strongarm->value = 1;
  $export['pathauto_reduce_ascii'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_tracker_applytofeeds';
  $strongarm->value = 'feed';
  $export['pathauto_tracker_applytofeeds'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_tracker_pattern';
  $strongarm->value = 'users/[user-raw]/track';
  $export['pathauto_tracker_pattern'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_tracker_supportsfeeds';
  $strongarm->value = 'feed';
  $export['pathauto_tracker_supportsfeeds'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_transliterate';
  $strongarm->value = FALSE;
  $export['pathauto_transliterate'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_accessibility_guideline';
  $strongarm->value = '1';
  $export['print_display_accessibility_guideline'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_accessibility_test';
  $strongarm->value = '1';
  $export['print_display_accessibility_test'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_comment_folder';
  $strongarm->value = 0;
  $export['print_display_comment_folder'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_comment_page';
  $strongarm->value = 0;
  $export['print_display_comment_page'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_comment_parent';
  $strongarm->value = 0;
  $export['print_display_comment_parent'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_comment_parent_resource';
  $strongarm->value = 0;
  $export['print_display_comment_parent_resource'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_comment_referenced_page';
  $strongarm->value = 0;
  $export['print_display_comment_referenced_page'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_folder';
  $strongarm->value = 1;
  $export['print_display_folder'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_page';
  $strongarm->value = 1;
  $export['print_display_page'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_parent';
  $strongarm->value = 0;
  $export['print_display_parent'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_parent_resource';
  $strongarm->value = 0;
  $export['print_display_parent_resource'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_referenced_page';
  $strongarm->value = 0;
  $export['print_display_referenced_page'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_studio_submission';
  $strongarm->value = '1';
  $export['print_display_studio_submission'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_urllist_accessibility_guideline';
  $strongarm->value = '1';
  $export['print_display_urllist_accessibility_guideline'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_urllist_accessibility_test';
  $strongarm->value = '1';
  $export['print_display_urllist_accessibility_test'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_urllist_folder';
  $strongarm->value = 1;
  $export['print_display_urllist_folder'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_urllist_page';
  $strongarm->value = 1;
  $export['print_display_urllist_page'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_urllist_parent';
  $strongarm->value = 0;
  $export['print_display_urllist_parent'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_urllist_parent_resource';
  $strongarm->value = 0;
  $export['print_display_urllist_parent_resource'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_display_urllist_referenced_page';
  $strongarm->value = 0;
  $export['print_display_urllist_referenced_page'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_footer_options';
  $strongarm->value = '1';
  $export['print_footer_options'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_html_book_link';
  $strongarm->value = '1';
  $export['print_html_book_link'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_html_link_class';
  $strongarm->value = 'print-page';
  $export['print_html_link_class'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_html_link_pos';
  $strongarm->value = array(
    'link' => '0',
    'corner' => '0',
  );
  $export['print_html_link_pos'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_html_link_text';
  $strongarm->value = 'Print';
  $export['print_html_link_text'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_html_new_window';
  $strongarm->value = '1';
  $export['print_html_new_window'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_html_node_link_visibility';
  $strongarm->value = '0';
  $export['print_html_node_link_visibility'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_html_show_link';
  $strongarm->value = '2';
  $export['print_html_show_link'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_html_sys_link_visibility';
  $strongarm->value = '1';
  $export['print_html_sys_link_visibility'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_html_windowclose';
  $strongarm->value = '1';
  $export['print_html_windowclose'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_logo_options';
  $strongarm->value = '0';
  $export['print_logo_options'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_newwindow';
  $strongarm->value = '1';
  $export['print_newwindow'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_robots_nofollow';
  $strongarm->value = '1';
  $export['print_robots_nofollow'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_robots_noindex';
  $strongarm->value = '1';
  $export['print_robots_noindex'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_sourceurl_date';
  $strongarm->value = '1';
  $export['print_sourceurl_date'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_sourceurl_enabled';
  $strongarm->value = '1';
  $export['print_sourceurl_enabled'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_sourceurl_forcenode';
  $strongarm->value = '1';
  $export['print_sourceurl_forcenode'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'print_urls';
  $strongarm->value = '1';
  $export['print_urls'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'public_button';
  $strongarm->value = 'Publicize old groups';
  $export['public_button'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'purl_menu_behavior_menu-usermenu';
  $strongarm->value = 'disabled';
  $export['purl_menu_behavior_menu-usermenu'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'site_403';
  $strongarm->value = 'customerror/403';
  $export['site_403'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'site_404';
  $strongarm->value = 'customerror/404';
  $export['site_404'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'space_type';
  $strongarm->value = 'og';
  $export['space_type'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'spaces_features';
  $strongarm->value = array(
    'spaces_dashboard' => '0',
  );
  $export['spaces_features'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'spaces_preset_og';
  $strongarm->value = 'og_private';
  $export['spaces_preset_og'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'spaces_preset_status';
  $strongarm->value = array(
    'og_controlled' => '1',
  );
  $export['spaces_preset_status'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'table';
  $strongarm->value = array(
    0 => array(
      'weight' => '0',
    ),
    1 => array(
      'weight' => '0',
    ),
  );
  $export['table'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'teaser_length';
  $strongarm->value = '200';
  $export['teaser_length'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'theme_chamfer_settings';
  $strongarm->value = array(
    'chamfer_borders' => 1,
    'chamfer_bgimage' => 0,
    'chamfer_top_logo' => 1,
    'chamfer_top_link' => '',
    'chamfer_bottom_logo' => 1,
    'chamfer_bottom_link' => '',
    'chamfer_color_template' => 'default',
    'chamfer_color_primary' => '000000',
    'chamfer_color_secondary' => '000000',
    'chamfer_color_header1' => '0099FF',
    'chamfer_color_header2' => '00CCFF',
    'chamfer_color_text' => '666666',
    'chamfer_color_link' => '0099FF',
    'chamfer_color_blocks' => 'E7E7E7',
    'chamfer_color_blockstyle_link' => '6D6D6D',
    'chamfer_color_blockstyle_bgcolor' => 'df5c5c',
    'chamfer_color_blockstyle_linkhover' => 'FFFFFF',
    'chamfer_color_footer_text' => 'FFFFFF',
    'chamfer_color_footer_link' => '00CCFF',
    'mission' => '',
    'default_logo' => 1,
    'logo_path' => '',
    'default_favicon' => 1,
    'favicon_path' => '',
    'primary_links' => 1,
    'secondary_links' => 1,
    'toggle_logo' => 1,
    'toggle_favicon' => 1,
    'toggle_name' => 1,
    'toggle_search' => 0,
    'toggle_slogan' => 1,
    'toggle_mission' => 0,
    'toggle_node_user_picture' => 0,
    'toggle_comment_user_picture' => 0,
    'toggle_primary_links' => 0,
    'toggle_secondary_links' => 0,
    'toggle_node_info_accessibility_guideline' => 0,
    'toggle_node_info_accessibility_test' => 0,
    'toggle_node_info_parent' => 0,
    'toggle_node_info_studio_submission' => 1,
    'toggle_node_info_site' => 0,
    'toggle_node_info_content_links' => 0,
    'toggle_node_info_elms_resource' => 0,
    'toggle_node_info_folder' => 0,
    'toggle_node_info_link' => 0,
    'toggle_node_info_page' => 0,
    'toggle_node_info_place' => 0,
    'toggle_node_info_poll' => 0,
    'toggle_node_info_reaction' => 0,
    'toggle_node_info_referenced_page' => 0,
    'toggle_node_info_term' => 0,
    'toggle_node_info_timeline_item' => 0,
    'logo_upload' => '',
    'favicon_upload' => '',
  );
  $export['theme_chamfer_settings'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'theme_settings';
  $strongarm->value = array(
    'toggle_logo' => 1,
    'toggle_name' => 1,
    'toggle_slogan' => 1,
    'toggle_mission' => 0,
    'toggle_node_user_picture' => 0,
    'toggle_comment_user_picture' => 0,
    'toggle_search' => 0,
    'toggle_favicon' => 1,
    'toggle_primary_links' => 0,
    'toggle_secondary_links' => 0,
    'toggle_node_info_accessibility_guideline' => 0,
    'toggle_node_info_accessibility_test' => 0,
    'toggle_node_info_content_links' => 0,
    'toggle_node_info_parent' => 0,
    'toggle_node_info_elms_resource' => 0,
    'toggle_node_info_folder' => 0,
    'toggle_node_info_link' => 0,
    'toggle_node_info_page' => 0,
    'toggle_node_info_place' => 0,
    'toggle_node_info_poll' => 0,
    'toggle_node_info_reaction' => 0,
    'toggle_node_info_referenced_page' => 0,
    'toggle_node_info_term' => 0,
    'toggle_node_info_timeline_item' => 0,
    'toggle_node_info_site' => 0,
    'default_logo' => 1,
    'logo_path' => '',
    'logo_upload' => '',
    'default_favicon' => 1,
    'favicon_path' => '',
    'favicon_upload' => '',
  );
  $export['theme_settings'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'tipsy';
  $strongarm->value = array(
    'drupal_forms' => array(
      'forms' => 0,
      'options' => array(
        'fade' => 1,
        'gravity' => 'autoWE',
        'delayIn' => '0',
        'delayOut' => '0',
        'trigger' => 'focus',
        'opacity' => '0.8',
        'offset' => '0',
      ),
    ),
    'custom_selectors' => array(
      0 => array(
        'selector' => '#regions_elms_navigation_left a, #regions_elms_navigation_left .regions_pre_block_container',
        'options' => array(
          'fade' => 0,
          'gravity' => 'w',
          'trigger' => 'hover',
          'delayIn' => '0',
          'delayOut' => '0',
          'opacity' => '1',
          'offset' => '0',
          'html' => 0,
          'title' => 'title',
        ),
      ),
      1 => array(
        'selector' => '#regions_block_elms_navigation_top_1 a',
        'options' => array(
          'fade' => 0,
          'gravity' => 'ne',
          'trigger' => 'hover',
          'delayIn' => '0',
          'delayOut' => '0',
          'opacity' => '1',
          'offset' => '1',
          'html' => 0,
          'title' => 'title',
        ),
      ),
      2 => array(
        'selector' => '#regions_block_elms_navigation_top_2 li a',
        'options' => array(
          'fade' => 0,
          'gravity' => 'e',
          'trigger' => 'hover',
          'delayIn' => '0',
          'delayOut' => '0',
          'opacity' => '1',
          'offset' => '0',
          'html' => 0,
          'title' => 'title',
        ),
      ),
      3 => array(
        'selector' => '#regions_block_elms_navigation_bottom_0 a,',
        'options' => array(
          'fade' => 0,
          'gravity' => 'se',
          'trigger' => 'hover',
          'delayIn' => '0',
          'delayOut' => '0',
          'opacity' => '1',
          'offset' => '0',
          'html' => 0,
          'title' => 'title',
        ),
      ),
      4 => array(
        'selector' => '#regions_block_elms_navigation_top_0 a',
        'options' => array(
          'fade' => 0,
          'gravity' => 'nw',
          'trigger' => 'hover',
          'delayIn' => '0',
          'delayOut' => '0',
          'opacity' => '1',
          'offset' => '0',
          'html' => 0,
          'title' => 'title',
        ),
      ),
      5 => array(
        'selector' => '#regions_elms_navigation_left a, #regions_elms_navigation_left .regions_pre_block_container',
        'options' => array(
          'fade' => 0,
          'gravity' => 'w',
          'trigger' => 'focus',
          'delayIn' => '0',
          'delayOut' => '0',
          'opacity' => '1',
          'offset' => '0',
          'html' => 0,
          'title' => 'title',
        ),
      ),
      6 => array(
        'selector' => '#regions_block_elms_navigation_bottom_0 a,',
        'options' => array(
          'fade' => 0,
          'gravity' => 'se',
          'trigger' => 'focus',
          'delayIn' => '0',
          'delayOut' => '0',
          'opacity' => '1',
          'offset' => '0',
          'html' => 0,
          'title' => 'title',
        ),
      ),
      7 => array(
        'selector' => '#regions_block_elms_navigation_top_1 a',
        'options' => array(
          'fade' => 0,
          'gravity' => 'ne',
          'trigger' => 'focus',
          'delayIn' => '0',
          'delayOut' => '0',
          'opacity' => '1',
          'offset' => '0',
          'html' => 0,
          'title' => 'title',
        ),
      ),
      8 => array(
        'selector' => '#regions_block_elms_navigation_top_0 a',
        'options' => array(
          'fade' => 0,
          'gravity' => 'nw',
          'trigger' => 'focus',
          'delayIn' => '0',
          'delayOut' => '0',
          'opacity' => '1',
          'offset' => '0',
          'html' => 0,
          'title' => 'title',
        ),
      ),
      9 => array(
        'selector' => '#regions_block_elms_navigation_top_2 li a',
        'options' => array(
          'fade' => 0,
          'gravity' => 'e',
          'trigger' => 'focus',
          'delayIn' => '0',
          'delayOut' => '0',
          'opacity' => '1',
          'offset' => '0',
          'html' => 0,
          'title' => 'title',
        ),
      ),
      10 => array(
        'selector' => '#regions_block_elms_navigation_top_2 .regions_block_title a',
        'options' => array(
          'fade' => 0,
          'gravity' => 'ne',
          'trigger' => 'hover',
          'delayIn' => '0',
          'delayOut' => '0',
          'opacity' => '1',
          'offset' => '0',
          'html' => 0,
          'title' => 'title',
        ),
      ),
      11 => array(
        'selector' => '#regions_block_elms_navigation_top_2 .regions_block_title a',
        'options' => array(
          'fade' => 0,
          'gravity' => 'ne',
          'trigger' => 'focus',
          'delayIn' => '0',
          'delayOut' => '0',
          'opacity' => '1',
          'offset' => '0',
          'html' => 0,
          'title' => 'title',
        ),
      ),
      12 => array(
        'selector' => '.advanced-help-link',
        'options' => array(
          'fade' => 0,
          'gravity' => 's',
          'trigger' => 'hover',
          'delayIn' => '0',
          'delayOut' => '0',
          'opacity' => '1',
          'offset' => '0',
          'html' => 0,
          'title' => 'title',
        ),
      ),
      13 => array(
        'selector' => '.advanced-help-link',
        'options' => array(
          'fade' => 0,
          'gravity' => 's',
          'trigger' => 'focus',
          'delayIn' => '0',
          'delayOut' => '0',
          'opacity' => '1',
          'offset' => '0',
          'html' => 0,
          'title' => 'title',
        ),
      ),
      14 => array(
        'selector' => '#nrhi_container a',
        'options' => array(
          'fade' => 0,
          'gravity' => 'autoNS',
          'trigger' => 'hover',
          'delayIn' => '0',
          'delayOut' => '0',
          'opacity' => '1',
          'offset' => '0',
          'html' => 0,
          'title' => 'title',
        ),
      ),
      15 => array(
        'selector' => '#nrhi_container a',
        'options' => array(
          'fade' => 0,
          'gravity' => 'autoNS',
          'trigger' => 'focus',
          'delayIn' => '0',
          'delayOut' => '0',
          'opacity' => '1',
          'offset' => '0',
          'html' => 0,
          'title' => 'title',
        ),
      ),
    ),
  );
  $export['tipsy'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'unique_field_comp_parent';
  $strongarm->value = 'each';
  $export['unique_field_comp_parent'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'unique_field_fields_parent';
  $strongarm->value = array(
    0 => 'title',
  );
  $export['unique_field_fields_parent'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'unique_field_scope_parent';
  $strongarm->value = 'type';
  $export['unique_field_scope_parent'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'unique_field_show_matches_parent';
  $strongarm->value = array(
    0 => 'show_matches',
  );
  $export['unique_field_show_matches_parent'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'update_check_frequency';
  $strongarm->value = '7';
  $export['update_check_frequency'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'update_notification_threshold';
  $strongarm->value = 'security';
  $export['update_notification_threshold'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'upload_accessibility_guideline';
  $strongarm->value = '1';
  $export['upload_accessibility_guideline'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'upload_accessibility_test';
  $strongarm->value = '1';
  $export['upload_accessibility_test'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'user_picture_default';
  $strongarm->value = 'profiles/elms/images/default-avatar.gif';
  $export['user_picture_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'user_picture_dimensions';
  $strongarm->value = '85x85';
  $export['user_picture_dimensions'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'user_picture_file_size';
  $strongarm->value = '30';
  $export['user_picture_file_size'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'user_picture_guidelines';
  $strongarm->value = '';
  $export['user_picture_guidelines'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'user_picture_path';
  $strongarm->value = 'pictures';
  $export['user_picture_path'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'user_pictures';
  $strongarm->value = '1';
  $export['user_pictures'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'user_register';
  $strongarm->value = '1';
  $export['user_register'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'user_registration_help';
  $strongarm->value = '';
  $export['user_registration_help'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'user_signatures';
  $strongarm->value = '0';
  $export['user_signatures'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'vertical_tabs_forms';
  $strongarm->value = array();
  $export['vertical_tabs_forms'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'vertical_tabs_minimum';
  $strongarm->value = '4';
  $export['vertical_tabs_minimum'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'views_devel_region';
  $strongarm->value = 'header';
  $export['views_devel_region'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'views_exposed_filter_any_label';
  $strongarm->value = 'old_any';
  $export['views_exposed_filter_any_label'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'views_filters_autosubmit';
  $strongarm->value = array(
    'admin_content' => 'admin_content',
    'parents' => 'parents',
    'flag_bookmarks' => 'flag_bookmarks',
    'admin_users' => '0',
    'appbar_alerts' => '0',
    'archive' => '0',
    'backlinks' => '0',
    'calendar' => '0',
    'comments_recent' => '0',
    'parent_charts' => '0',
    'data_feed' => '0',
    'date_browser' => '0',
    'flag_bookmarks_tab' => '0',
    'frontpage' => '0',
    'glossary' => '0',
    'og' => '0',
    'og_files' => '0',
    'og_ghp_parent_schedule' => '0',
    'og_ghp_ron' => '0',
    'og_members' => '0',
    'og_members_block' => '0',
    'og_members_faces' => '0',
    'og_my' => '0',
    'og_mytracker' => '0',
    'og_recent_type_term' => '0',
    'og_search' => '0',
    'og_tracker' => '0',
    'og_unread' => '0',
    'outlinelist' => '0',
    'popular' => '0',
    'posts_by_term' => '0',
    'rules_scheduler' => '0',
    'semantic_demo' => '0',
    'taxonomy_term' => '0',
    'tracker' => '0',
    'workflow_pending' => '0',
    'workflow_summary' => '0',
  );
  $export['views_filters_autosubmit'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'views_ui_disable_live_preview';
  $strongarm->value = '1';
  $export['views_ui_disable_live_preview'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'workflow_purl_';
  $strongarm->value = '[field_parent_ref-title]_master_[nid]';
  $export['workflow_purl_'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'workflow_purl_10';
  $strongarm->value = '[field_parent_ref-title]_master_[nid]';
  $export['workflow_purl_10'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'workflow_purl_3';
  $strongarm->value = '[field_parent_ref-title]_inactive_[nid]';
  $export['workflow_purl_3'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'workflow_purl_5';
  $strongarm->value = '[field_parent_ref-title]_[field_section_semester-raw][field_section_year-raw][field_campus-raw][field_section_number-raw]';
  $export['workflow_purl_5'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'workflow_purl_6';
  $strongarm->value = '[field_parent_ref-title]_active_[field_section_semester-raw][field_section_year-raw][field_campus-raw][field_section_number-raw]';
  $export['workflow_purl_6'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'workflow_purl_7';
  $strongarm->value = '[field_parent_ref-title]_sample_[nid]';
  $export['workflow_purl_7'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'workflow_site';
  $strongarm->value = array(
    0 => 'node',
  );
  $export['workflow_site'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'views_defaults';
  $strongarm->value = array(
    'og' => TRUE,
    'og_mytracker' => TRUE,
    'og_members_faces' => TRUE,
    'og_members_block' => TRUE,
    'og_members' => TRUE,
    'og_ghp_ron' => TRUE,
    'og_search' => TRUE,
    'og_tracker' => TRUE,
    'og_unread' => TRUE,
    'og_my' => TRUE,
    'og_recent_type_term' => TRUE,
    'posts_by_term' => TRUE,
  );
  $export['views_defaults'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_poll_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '-5',
      'has_required' => TRUE,
      'title' => 'Question',
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => 'Revision information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'path' => array(
      'region' => 'right',
      'weight' => '7',
      'has_required' => FALSE,
      'title' => 'URL path settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'options' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'Publishing options',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'author' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Authoring information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'buttons' => array(
      'region' => 'main',
      'weight' => '100',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'choice_wrapper' => array(
      'region' => 'main',
      'weight' => '-4',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'settings' => array(
      'region' => 'main',
      'weight' => '-3',
      'has_required' => FALSE,
      'title' => 'Poll settings',
      'collapsed' => 1,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'field_poll_content_ref' => array(
      'region' => 'main',
      'weight' => '-3',
      'has_required' => FALSE,
      'title' => 'Referenced Content',
      'hidden' => 0,
    ),
    'og_nodeapi' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Course Versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'field_poll_text_ref' => array(
      'region' => 'main',
      'weight' => '-1',
      'has_required' => FALSE,
      'title' => 'Text Referenced',
      'hidden' => 0,
    ),
  );
  $export['nodeformscols_field_placements_poll_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_place_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '-5',
      'has_required' => TRUE,
      'title' => 'Title',
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '0.008',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => 'Revision information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'path' => array(
      'region' => 'right',
      'weight' => '7',
      'has_required' => FALSE,
      'title' => 'URL path settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'options' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'Publishing options',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'author' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Authoring information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'buttons' => array(
      'region' => 'main',
      'weight' => '100',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'field_location_content_ref' => array(
      'region' => 'main',
      'weight' => '-4',
      'has_required' => FALSE,
      'title' => 'Content Reference',
      'hidden' => 0,
    ),
    'og_nodeapi' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Course Versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
  );
  $export['nodeformscols_field_placements_place_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_elms_event_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '-5',
      'has_required' => TRUE,
      'title' => 'Title',
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => 'Revision information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'path' => array(
      'region' => 'right',
      'weight' => '7',
      'has_required' => FALSE,
      'title' => 'URL path settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'options' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'Publishing options',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'author' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Authoring information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'buttons' => array(
      'region' => 'main',
      'weight' => '100',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'field_event_name' => array(
      'region' => 'main',
      'weight' => '-4',
      'has_required' => FALSE,
      'title' => 'Name',
      'hidden' => 0,
    ),
    'field_detail_text' => array(
      'region' => 'main',
      'weight' => '-3',
      'has_required' => FALSE,
      'title' => 'Details',
      'hidden' => 0,
    ),
    'field_event_type' => array(
      'region' => 'main',
      'weight' => '-2',
      'has_required' => FALSE,
      'title' => 'Type',
      'hidden' => 0,
    ),
    'og_nodeapi' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Course Versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'group_dates' => array(
      'region' => 'main',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Dates',
      'collapsed' => 0,
      'hidden' => 0,
    ),
    'group_additional_settings' => array(
      'region' => 'main',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Additional Settings',
      'collapsed' => 0,
      'hidden' => 0,
    ),
  );
  $export['nodeformscols_field_placements_elms_event_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_timeline_item_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '0',
      'has_required' => TRUE,
      'title' => 'Title',
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => 'Revision information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'path' => array(
      'region' => 'right',
      'weight' => '7',
      'has_required' => FALSE,
      'title' => 'URL path settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'options' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'Publishing options',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'author' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Authoring information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'buttons' => array(
      'region' => 'main',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'field_timeline_content_ref' => array(
      'region' => 'main',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Content Reference',
      'hidden' => 0,
    ),
    'field_time' => array(
      'region' => 'main',
      'weight' => '1',
      'has_required' => TRUE,
      'title' => 'Time',
    ),
    'og_nodeapi' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Course Versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'field_timeline_text_ref' => array(
      'region' => 'main',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Text',
      'hidden' => 0,
    ),
  );
  $export['nodeformscols_field_placements_timeline_item_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeformscols_field_placements_reaction_default';
  $strongarm->value = array(
    'title' => array(
      'region' => 'main',
      'weight' => '0',
      'has_required' => TRUE,
      'title' => 'Title',
    ),
    'body_field' => array(
      'region' => 'main',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'menu' => array(
      'region' => 'right',
      'weight' => '0',
      'has_required' => FALSE,
      'title' => 'Menu settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'revision_information' => array(
      'region' => 'right',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => 'Revision information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'path' => array(
      'region' => 'right',
      'weight' => '7',
      'has_required' => FALSE,
      'title' => 'URL path settings',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'options' => array(
      'region' => 'right',
      'weight' => '6',
      'has_required' => FALSE,
      'title' => 'Publishing options',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'author' => array(
      'region' => 'right',
      'weight' => '4',
      'has_required' => FALSE,
      'title' => 'Authoring information',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'buttons' => array(
      'region' => 'main',
      'weight' => '5',
      'has_required' => FALSE,
      'title' => NULL,
      'hidden' => 0,
    ),
    'book' => array(
      'region' => 'right',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Book outline',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'field_related_content' => array(
      'region' => 'main',
      'weight' => '1',
      'has_required' => TRUE,
      'title' => 'Related Content',
    ),
    'field_related_reaction' => array(
      'region' => 'main',
      'weight' => '2',
      'has_required' => FALSE,
      'title' => 'Related Reaction',
      'hidden' => 1,
    ),
    'field_reaction_feeling' => array(
      'region' => 'main',
      'weight' => '3',
      'has_required' => TRUE,
      'title' => 'Reaction Feeling',
    ),
    'og_nodeapi' => array(
      'region' => 'right',
      'weight' => '1',
      'has_required' => FALSE,
      'title' => 'Course Versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
    'print' => array(
      'region' => 'right',
      'weight' => '3',
      'has_required' => FALSE,
      'title' => 'Printer, e-mail and PDF versions',
      'collapsed' => 1,
      'hidden' => 1,
    ),
  );
  $export['nodeformscols_field_placements_reaction_default'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_poll_icon';
  $strongarm->value = 'profiles/elms/modules/contrib/outline_designer/images/additional_icons/node.png';
  $export['outline_designer_poll_icon'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_place_icon';
  $strongarm->value = '';
  $export['outline_designer_place_icon'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_reaction_icon';
  $strongarm->value = '';
  $export['outline_designer_reaction_icon'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_elms_resource_icon';
  $strongarm->value = '';
  $export['outline_designer_elms_resource_icon'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_timeline_item_icon';
  $strongarm->value = '';
  $export['outline_designer_timeline_item_icon'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'outline_designer_elms_event_icon';
  $strongarm->value = '';
  $export['outline_designer_elms_event_icon'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'elms_helper_default_theme';
  $strongarm->value = 'chamfer';
  $export['elms_helper_default_theme'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'elms_helper_disallowed_themes';
  $strongarm->value = array(
    'aed511' => 'aed511',
    'art020' => 'art020',
    'art030' => 'art030',
    'art100' => 'art100',
    'art297' => 'art297',
    'elearning_urban' => 'elearning_urban',
    'gd100' => 'gd100',
    'inart258' => 'inart258',
    'journal' => 'journal',
    'larch065' => 'larch065',
    'music007' => 'music007',
    'music009' => 'music009',
    'theat107' => 'theat107',
    'theater' => 'theater',
    'cube' => 'cube',
    'bluemarine' => 'bluemarine',
    'pushbutton' => 'pushbutton',
  );
  $export['elms_helper_disallowed_themes'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'og_content_type_usage_parent';
  $strongarm->value = 'omitted';
  $export['og_content_type_usage_parent'] = $strongarm;

  return $export;
}
