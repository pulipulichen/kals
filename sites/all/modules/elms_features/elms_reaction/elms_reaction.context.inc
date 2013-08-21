<?php
/**
 * @file
 * elms_reaction.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function elms_reaction_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_reaction-nav-right';
  $context->description = 'Right hand menu integration with Reactions';
  $context->tag = 'ELMS Reaction';
  $context->conditions = array(
    'context_spaces_features' => array(
      'values' => array(
        'elms_reaction' => 'elms_reaction',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-elms_reaction_list-block_1' => array(
          'module' => 'views',
          'delta' => 'elms_reaction_list-block_1',
          'region' => 'regions_elms_navigation_right',
          'weight' => '-1',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('ELMS Reaction');
  t('Right hand menu integration with Reactions');
  $export['elms_reaction-nav-right'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_reaction-navigation';
  $context->description = 'Provide navigation if primary links are in use';
  $context->tag = 'ELMS Reaction';
  $context->conditions = array(
    'context_spaces_features' => array(
      'values' => array(
        'elms_reaction' => 'elms_reaction',
      ),
    ),
    'context_var' => array(
      'values' => array(
        'theme_%theme_settings|toggle_primary_links:1' => 'theme_%theme_settings|toggle_primary_links:1',
        'theme_%theme_settings|toggle_secondary_links:0' => 'theme_%theme_settings|toggle_secondary_links:0',
      ),
    ),
    'views' => array(
      'values' => array(
        'elms_reaction_list:page_1' => 'elms_reaction_list:page_1',
        'elms_reaction_list:page_2' => 'elms_reaction_list:page_2',
        'elms_reaction_list:page_3' => 'elms_reaction_list:page_3',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'menu-menu-elms-reactions' => array(
          'module' => 'menu',
          'delta' => 'menu-elms-reactions',
          'region' => 'left',
          'weight' => '0',
        ),
      ),
    ),
    'menu' => 'reactions',
  );
  $context->condition_mode = 1;

  // Translatables
  // Included for use with string extractors like potx.
  t('ELMS Reaction');
  t('Provide navigation if primary links are in use');
  $export['elms_reaction-navigation'] = $context;

  return $export;
}
