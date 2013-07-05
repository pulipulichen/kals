<?php
/**
 * @file
 * elms_places.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function elms_places_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_place-nav-right';
  $context->description = 'Right hand menu integration with Places';
  $context->tag = 'ELMS Place';
  $context->conditions = array(
    'context_spaces_features' => array(
      'values' => array(
        'elms_places' => 'elms_places',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-elms_place_list-block_1' => array(
          'module' => 'views',
          'delta' => 'elms_place_list-block_1',
          'region' => 'regions_elms_navigation_right',
          'weight' => '1',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('ELMS Place');
  t('Right hand menu integration with Places');
  $export['elms_place-nav-right'] = $context;

  return $export;
}
