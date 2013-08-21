<?php
/**
 * @file
 * elms_terms.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function elms_terms_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_terms-nav-right';
  $context->description = 'Right hand menu integration with Terms';
  $context->tag = 'ELMS Terms';
  $context->conditions = array(
    'context_spaces_features' => array(
      'values' => array(
        'elms_terms' => 'elms_terms',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-elms_term_list-block_1' => array(
          'module' => 'views',
          'delta' => 'elms_term_list-block_1',
          'region' => 'regions_elms_navigation_right',
          'weight' => '3',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('ELMS Terms');
  t('Right hand menu integration with Terms');
  $export['elms_terms-nav-right'] = $context;

  return $export;
}
