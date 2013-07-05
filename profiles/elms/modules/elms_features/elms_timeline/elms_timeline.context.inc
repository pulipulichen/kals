<?php
/**
 * @file
 * elms_timeline.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function elms_timeline_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_timeline-nav-right';
  $context->description = 'Right hand menu integration with Timelines';
  $context->tag = 'ELMS Timeline';
  $context->conditions = array(
    'context_spaces_features' => array(
      'values' => array(
        'elms_timeline' => 'elms_timeline',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-elms_timeline_list-block_1' => array(
          'module' => 'views',
          'delta' => 'elms_timeline_list-block_1',
          'region' => 'regions_elms_navigation_right',
          'weight' => '2',
        ),
      ),
    ),
  );
  $context->condition_mode = 1;

  // Translatables
  // Included for use with string extractors like potx.
  t('ELMS Timeline');
  t('Right hand menu integration with Timelines');
  $export['elms_timeline-nav-right'] = $context;

  return $export;
}
