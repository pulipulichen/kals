<?php
/**
 * @file
 * elms_navigation_left.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function elms_navigation_left_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_core-nav-left-actions';
  $context->description = 'Left side menu items for page operations';
  $context->tag = 'ELMS Core';
  $context->conditions = array(
    'context_og_condition_group_type' => array(
      'values' => array(
        'site' => 'site',
      ),
      'options' => array(
        'node_form' => 1,
      ),
    ),
    'path' => array(
      'values' => array(
        'node/*' => 'node/*',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'elms_navigation_left-2' => array(
          'module' => 'elms_navigation_left',
          'delta' => 2,
          'region' => 'regions_elms_navigation_left',
          'weight' => '0',
        ),
      ),
    ),
  );
  $context->condition_mode = 1;

  // Translatables
  // Included for use with string extractors like potx.
  t('ELMS Core');
  t('Left side menu items for page operations');
  $export['elms_core-nav-left-actions'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_core-nav-left-group';
  $context->description = 'Left side menu items in group scope';
  $context->tag = 'ELMS Core';
  $context->conditions = array(
    'context_og_condition_group_type' => array(
      'values' => array(
        'site' => 'site',
      ),
      'options' => array(
        'node_form' => 1,
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'elms_navigation_left-1' => array(
          'module' => 'elms_navigation_left',
          'delta' => 1,
          'region' => 'regions_elms_navigation_left',
          'weight' => '1',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('ELMS Core');
  t('Left side menu items in group scope');
  $export['elms_core-nav-left-group'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_core-nav-left-masquerade';
  $context->description = 'Left side menu area for masquerade';
  $context->tag = 'ELMS Core';
  $context->conditions = array(
    'sitewide' => array(
      'values' => array(
        1 => 1,
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'masquerade-0' => array(
          'module' => 'masquerade',
          'delta' => 0,
          'region' => 'regions_elms_navigation_left',
          'weight' => '4',
        ),
        'elms_navigation_left-3' => array(
          'module' => 'elms_navigation_left',
          'delta' => 3,
          'region' => 'regions_elms_navigation_left',
          'weight' => '-20',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('ELMS Core');
  t('Left side menu area for masquerade');
  $export['elms_core-nav-left-masquerade'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_core-nav-left-system';
  $context->description = 'Left side menu items that are system in scope';
  $context->tag = 'ELMS Core';
  $context->conditions = array(
    'context_og_condition_group_type' => array(
      'values' => array(
        '_none_' => '_none_',
      ),
      'options' => array(
        'node_form' => 1,
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'elms_navigation_left-0' => array(
          'module' => 'elms_navigation_left',
          'delta' => 0,
          'region' => 'regions_elms_navigation_left',
          'weight' => '3',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('ELMS Core');
  t('Left side menu items that are system in scope');
  $export['elms_core-nav-left-system'] = $context;

  return $export;
}
