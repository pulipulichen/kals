<?php
/**
 * @file
 * elms_polls.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function elms_polls_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_poll-nav-right';
  $context->description = 'Right hand menu integration with Polls';
  $context->tag = 'ELMS Poll';
  $context->conditions = array(
    'context_spaces_features' => array(
      'values' => array(
        'elms_polls' => 'elms_polls',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-elms_poll_list-block_1' => array(
          'module' => 'views',
          'delta' => 'elms_poll_list-block_1',
          'region' => 'regions_elms_navigation_right',
          'weight' => '0',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('ELMS Poll');
  t('Right hand menu integration with Polls');
  $export['elms_poll-nav-right'] = $context;

  return $export;
}
