<?php
/**
 * @file
 * elms_navigation_bottom.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function elms_navigation_bottom_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_core-nav-bottom';
  $context->description = 'Define the blocks for the bottom navigational region';
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
        'elms_navigation_bottom-0' => array(
          'module' => 'elms_navigation_bottom',
          'delta' => 0,
          'region' => 'regions_elms_navigation_bottom',
          'weight' => NULL,
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Define the blocks for the bottom navigational region');
  t('ELMS Core');
  $export['elms_core-nav-bottom'] = $context;

  return $export;
}
