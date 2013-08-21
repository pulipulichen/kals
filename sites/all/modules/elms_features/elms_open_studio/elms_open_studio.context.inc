<?php
/**
 * @file
 * elms_open_studio.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function elms_open_studio_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_studio-media_stream';
  $context->description = 'Displays the media related to the current exhibit';
  $context->tag = 'ELMS Studio';
  $context->conditions = array(
    'node' => array(
      'values' => array(
        'exhibit' => 'exhibit',
      ),
      'options' => array(
        'node_form' => '0',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-open_studio_helpers-block_1' => array(
          'module' => 'views',
          'delta' => 'open_studio_helpers-block_1',
          'region' => 'content',
          'weight' => NULL,
        ),
        'views-open_studio_helpers-block_2' => array(
          'module' => 'views',
          'delta' => 'open_studio_helpers-block_2',
          'region' => 'regions_elms_navigation_right',
          'weight' => NULL,
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Displays the media related to the current exhibit');
  t('ELMS Studio');
  $export['elms_studio-media_stream'] = $context;

  return $export;
}
