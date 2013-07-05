<?php

/**
 * Implements hook_context_default_contexts().
 */
function elms_cle_context_default_contexts() {
  $export = array();

  $context = new stdClass;
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_cle_nav';
  $context->description = 'Collaborative learning environment core navigation';
  $context->tag = 'ELMS CLE nav';
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
        'menu-menu-studio' => array(
          'module' => 'menu',
          'delta' => 'menu-studio',
          'region' => 'left',
          'weight' => '-29',
        ),
      ),
    ),
  );
  $context->condition_mode = 1;

  // Translatables
  // Included for use with string extractors like potx.
  t('Collaborative learning environment core navigation');
  t('ELMS CLE nav');
  $export['elms_cle_nav'] = $context;

  return $export;
}
