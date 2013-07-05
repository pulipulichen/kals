<?php

/**
 * Implements hook_views_default_views().
 */
function elms_reference_links_views_default_views() {
  $views = array();

  // Exported view: elms_related_links_list
  $view = new view;
  $view->name = 'elms_related_links_list';
  $view->description = 'List all related links for a page';
  $view->tag = 'related links';
  $view->base_table = 'node';
  $view->core = 6;
  $view->api_version = '2';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */
  $handler = $view->new_display('default', 'Defaults', 'default');
  $handler->override_option('fields', array(
    'field_related_links_url' => array(
      'label' => '',
      'alter' => array(
        'alter_text' => 0,
        'text' => '',
        'make_link' => 0,
        'path' => '',
        'absolute' => 0,
        'link_class' => '',
        'alt' => '',
        'rel' => '',
        'prefix' => '',
        'suffix' => '',
        'target' => '',
        'help' => '',
        'trim' => 0,
        'max_length' => '',
        'word_boundary' => 1,
        'ellipsis' => 1,
        'html' => 0,
        'strip_tags' => 0,
      ),
      'empty' => '',
      'hide_empty' => 0,
      'empty_zero' => 0,
      'link_to_node' => 0,
      'label_type' => 'none',
      'format' => 'default',
      'multiple' => array(
        'group' => 1,
        'multiple_number' => '',
        'multiple_from' => '',
        'multiple_reversed' => 0,
      ),
      'exclude' => 0,
      'id' => 'field_related_links_url',
      'table' => 'node_data_field_related_links',
      'field' => 'field_related_links_url',
      'relationship' => 'none',
    ),
  ));
  $handler->override_option('filters', array(
    'type' => array(
      'operator' => 'in',
      'value' => array(
        'content_links' => 'content_links',
      ),
      'group' => '0',
      'exposed' => FALSE,
      'expose' => array(
        'operator' => FALSE,
        'label' => '',
      ),
      'id' => 'type',
      'table' => 'node',
      'field' => 'type',
      'relationship' => 'none',
    ),
    'current' => array(
      'operator' => '=',
      'value' => '',
      'group' => '0',
      'exposed' => FALSE,
      'expose' => array(
        'operator' => FALSE,
        'label' => '',
      ),
      'id' => 'current',
      'table' => 'spaces',
      'field' => 'current',
      'override' => array(
        'button' => 'Override',
      ),
      'relationship' => 'none',
    ),
  ));
  $handler->override_option('access', array(
    'type' => 'spaces_feature',
    'spaces_feature' => 'elms_reference_links',
    'perm' => 'access content',
  ));
  $handler->override_option('cache', array(
    'type' => 'none',
  ));
  $handler->override_option('title', 'Links');
  $handler->override_option('footer_format', '1');
  $handler->override_option('footer_empty', 0);
  $handler->override_option('items_per_page', 0);
  $handler->override_option('use_pager', '0');
  $handler->override_option('style_options', array(
    'grouping' => '',
  ));
  $handler->override_option('row_options', array(
    'inline' => array(
      'field_reaction_feeling_value' => 'field_reaction_feeling_value',
      'picture' => 'picture',
      'body' => 'body',
    ),
    'separator' => '',
    'hide_empty' => 0,
  ));
  $handler = $view->new_display('block', 'Stream Block', 'block_1');
  $handler->override_option('arguments', array(
    'field_related_content_ref_nid' => array(
      'default_action' => 'default',
      'style_plugin' => 'default_summary',
      'style_options' => array(),
      'wildcard' => 'all',
      'wildcard_substitution' => 'All',
      'title' => '',
      'breadcrumb' => '',
      'default_argument_type' => 'node',
      'default_argument' => '',
      'validate_type' => 'node',
      'validate_fail' => 'not found',
      'break_phrase' => 0,
      'not' => 0,
      'id' => 'field_related_content_ref_nid',
      'table' => 'node_data_field_related_content_ref',
      'field' => 'field_related_content_ref_nid',
      'validate_user_argument_type' => 'uid',
      'validate_user_roles' => array(
        2 => 0,
        3 => 0,
        6 => 0,
        4 => 0,
        9 => 0,
        10 => 0,
        8 => 0,
      ),
      'override' => array(
        'button' => 'Use default',
      ),
      'relationship' => 'none',
      'default_options_div_prefix' => '',
      'default_argument_user' => 0,
      'default_argument_fixed' => '',
      'default_argument_php' => '',
      'validate_argument_node_type' => array(
        'poll' => 0,
        'blog' => 0,
        'feed_reader' => 0,
        'course' => 0,
        'folder' => 0,
        'link' => 0,
        'page' => 0,
        'studio_submission' => 0,
        'reaction' => 0,
        'accessibility_guideline' => 0,
        'accessibility_test' => 0,
        'elms_resource' => 0,
        'place' => 0,
        'term' => 0,
        'timeline_item' => 0,
        'elms_event' => 0,
        'site' => 0,
        'content_links' => 0,
        'feed_user_import' => 0,
        'promo' => 0,
      ),
      'validate_argument_node_access' => 0,
      'validate_argument_nid_type' => 'nid',
      'validate_argument_vocabulary' => array(
        1 => 0,
      ),
      'validate_argument_type' => 'tid',
      'validate_argument_transform' => 0,
      'validate_user_restrict_roles' => 0,
      'validate_argument_node_flag_name' => '*relationship*',
      'validate_argument_node_flag_test' => 'flaggable',
      'validate_argument_node_flag_id_type' => 'id',
      'validate_argument_user_flag_name' => '*relationship*',
      'validate_argument_user_flag_test' => 'flaggable',
      'validate_argument_user_flag_id_type' => 'id',
      'validate_argument_is_member' => 'OG_VIEWS_DO_NOT_VALIDATE_MEMBERSHIP',
      'validate_argument_group_node_type' => array(
        'site' => 0,
      ),
      'validate_argument_php' => '',
    ),
  ));
  $handler->override_option('block_description', '');
  $handler->override_option('block_caching', -1);
  $handler = $view->new_display('page', 'Listing page', 'page_1');
  $handler->override_option('path', 'places');
  $handler->override_option('menu', array(
    'type' => 'normal',
    'title' => 'Places',
    'description' => 'List of all Course Places',
    'weight' => '0',
    'name' => 'features',
  ));
  $handler->override_option('tab_options', array(
    'type' => 'normal',
    'title' => 'Reactions',
    'description' => 'reactions to course materials',
    'weight' => '0',
    'name' => 'features',
  ));
  $handler = $view->new_display('page', 'All my Related Links', 'page_4');
  $handler->override_option('relationships', array(
    'group_nid' => array(
      'label' => 'Group node',
      'required' => 0,
      'id' => 'group_nid',
      'table' => 'og_ancestry',
      'field' => 'group_nid',
      'override' => array(
        'button' => 'Use default',
      ),
      'relationship' => 'none',
    ),
    'field_parent_ref_nid' => array(
      'label' => 'Course',
      'required' => 0,
      'delta' => -1,
      'id' => 'field_parent_ref_nid',
      'table' => 'node_data_field_parent_ref',
      'field' => 'field_parent_ref_nid',
      'override' => array(
        'button' => 'Use default',
      ),
      'relationship' => 'group_nid',
    ),
    'field_related_content_ref_nid' => array(
      'label' => 'Related Content',
      'required' => 0,
      'delta' => -1,
      'id' => 'field_related_content_ref_nid',
      'table' => 'node_data_field_related_content_ref',
      'field' => 'field_related_content_ref_nid',
      'override' => array(
        'button' => 'Use default',
      ),
      'relationship' => 'none',
    ),
  ));
  $handler->override_option('fields', array(
    'title_2' => array(
      'label' => 'Course',
      'alter' => array(
        'alter_text' => 0,
        'text' => '',
        'make_link' => 0,
        'path' => '',
        'absolute' => 0,
        'link_class' => '',
        'alt' => '',
        'rel' => '',
        'prefix' => '',
        'suffix' => '',
        'target' => '',
        'help' => '',
        'trim' => 0,
        'max_length' => '',
        'word_boundary' => 1,
        'ellipsis' => 1,
        'html' => 0,
        'strip_tags' => 0,
      ),
      'empty' => '',
      'hide_empty' => 0,
      'empty_zero' => 0,
      'link_to_node' => 1,
      'spaces' => array(
        'frontpage' => 0,
        'type' => 'spaces_og',
      ),
      'exclude' => 0,
      'id' => 'title_2',
      'table' => 'node',
      'field' => 'title',
      'override' => array(
        'button' => 'Use default',
      ),
      'relationship' => 'field_parent_ref_nid',
    ),
    'title_1' => array(
      'label' => 'Displayed On',
      'alter' => array(
        'alter_text' => 0,
        'text' => '',
        'make_link' => 0,
        'path' => '',
        'absolute' => 0,
        'link_class' => '',
        'alt' => '',
        'rel' => '',
        'prefix' => '',
        'suffix' => '',
        'target' => '',
        'help' => '',
        'trim' => 0,
        'max_length' => '',
        'word_boundary' => 1,
        'ellipsis' => 1,
        'html' => 0,
        'strip_tags' => 0,
      ),
      'empty' => '',
      'hide_empty' => 1,
      'empty_zero' => 0,
      'link_to_node' => 1,
      'spaces' => array(
        'frontpage' => 0,
        'type' => 'spaces_og',
      ),
      'exclude' => 0,
      'id' => 'title_1',
      'table' => 'node',
      'field' => 'title',
      'override' => array(
        'button' => 'Use default',
      ),
      'relationship' => 'field_related_content_ref_nid',
    ),
    'field_related_links_url' => array(
      'label' => '',
      'alter' => array(
        'alter_text' => 0,
        'text' => '',
        'make_link' => 0,
        'path' => '',
        'absolute' => 0,
        'link_class' => '',
        'alt' => '',
        'rel' => '',
        'prefix' => '',
        'suffix' => '',
        'target' => '',
        'help' => '',
        'trim' => 0,
        'max_length' => '',
        'word_boundary' => 1,
        'ellipsis' => 1,
        'html' => 0,
        'strip_tags' => 0,
      ),
      'empty' => '',
      'hide_empty' => 0,
      'empty_zero' => 0,
      'link_to_node' => 0,
      'label_type' => 'none',
      'format' => 'default',
      'multiple' => array(
        'group' => 1,
        'multiple_number' => '',
        'multiple_from' => '',
        'multiple_reversed' => 0,
      ),
      'exclude' => 0,
      'id' => 'field_related_links_url',
      'table' => 'node_data_field_related_links',
      'field' => 'field_related_links_url',
      'override' => array(
        'button' => 'Use default',
      ),
      'relationship' => 'none',
    ),
  ));
  $handler->override_option('filters', array(
    'type' => array(
      'operator' => 'in',
      'value' => array(
        'elms_resource' => 'elms_resource',
      ),
      'group' => '0',
      'exposed' => FALSE,
      'expose' => array(
        'operator' => FALSE,
        'label' => '',
      ),
      'id' => 'type',
      'table' => 'node',
      'field' => 'type',
      'relationship' => 'none',
      'override' => array(
        'button' => 'Use default',
      ),
    ),
  ));
  $handler->override_option('access', array(
    'type' => 'role',
    'role' => array(
      2 => 2,
    ),
  ));
  $handler->override_option('title', 'All My Related Links');
  $handler->override_option('path', 'my_related_links');
  $handler->override_option('menu', array(
    'type' => 'normal',
    'title' => 'My Related Links',
    'description' => 'All related links across your courses',
    'weight' => '0',
    'name' => 'menu-usermenu',
  ));
  $handler->override_option('tab_options', array(
    'type' => 'none',
    'title' => '',
    'description' => '',
    'weight' => 0,
    'name' => 'navigation',
  ));

  $views[$view->name] = $view;

  return $views;
}
