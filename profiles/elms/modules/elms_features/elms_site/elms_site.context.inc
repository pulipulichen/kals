<?php
/**
 * @file
 * elms_site.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function elms_site_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_site-features';
  $context->description = 'Display the block navigation for the enabled Features';
  $context->tag = 'ELMS Sites';
  $context->conditions = array(
    'context_og_condition_group_type' => array(
      'values' => array(
        'site' => 'site',
      ),
      'options' => array(
        'node_form' => 1,
      ),
    ),
    'context_var' => array(
      'values' => array(
        'theme_%theme_settings|toggle_primary_links:0' => 'theme_%theme_settings|toggle_primary_links:0',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'menu-features' => array(
          'module' => 'menu',
          'delta' => 'features',
          'region' => 'left',
          'weight' => '10',
        ),
      ),
    ),
  );
  $context->condition_mode = 1;

  // Translatables
  // Included for use with string extractors like potx.
  t('Display the block navigation for the enabled Features');
  t('ELMS Sites');
  $export['elms_site-features'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_site-sandboxes';
  $context->description = 'Adds a block to the user profile page to display their development sandboxes';
  $context->tag = 'ELMS Sites';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'user/*' => 'user/*',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-site_sandboxes-block_1' => array(
          'module' => 'views',
          'delta' => 'site_sandboxes-block_1',
          'region' => 'right',
          'weight' => 0,
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Adds a block to the user profile page to display their development sandboxes');
  t('ELMS Sites');
  $export['elms_site-sandboxes'] = $context;

  return $export;
}
