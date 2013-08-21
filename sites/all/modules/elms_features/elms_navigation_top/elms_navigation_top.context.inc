<?php
/**
 * @file
 * elms_navigation_top.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function elms_navigation_top_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_core-nav-top';
  $context->description = 'Define the blocks for the top navigational region';
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
        'elms_navigation_top-0' => array(
          'module' => 'elms_navigation_top',
          'delta' => 0,
          'region' => 'regions_elms_navigation_top',
          'weight' => '-30',
        ),
        'elms_navigation_top-2' => array(
          'module' => 'elms_navigation_top',
          'delta' => 2,
          'region' => 'regions_elms_navigation_top',
          'weight' => '-29',
        ),
        'elms_navigation_top-1' => array(
          'module' => 'elms_navigation_top',
          'delta' => 1,
          'region' => 'regions_elms_navigation_top',
          'weight' => '-28',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Define the blocks for the top navigational region');
  t('ELMS Core');
  $export['elms_core-nav-top'] = $context;

  return $export;
}
