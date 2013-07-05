<?php
/**
 * @file
 * elms_parent.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function elms_parent_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_parent-pages-faculty';
  $context->description = 'Faculty funnel page for the course';
  $context->tag = 'ELMS Parent';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'node/*/view/faculty' => 'node/*/view/faculty',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-parents-block_3' => array(
          'module' => 'views',
          'delta' => 'parents-block_3',
          'region' => 'content',
          'weight' => '3',
        ),
        'views-parents-block_5' => array(
          'module' => 'views',
          'delta' => 'parents-block_5',
          'region' => 'content',
          'weight' => '4',
        ),
        'views-elms_parent_info_blocks-block_4' => array(
          'module' => 'views',
          'delta' => 'elms_parent_info_blocks-block_4',
          'region' => 'right',
          'weight' => '4',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('ELMS Parent');
  t('Faculty funnel page for the course');
  $export['elms_parent-pages-faculty'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_parent-pages-marketing';
  $context->description = 'Marketing funnel page';
  $context->tag = 'ELMS Parent';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'node/*/view/marketing' => 'node/*/view/marketing',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-parent_promo-block_1' => array(
          'module' => 'views',
          'delta' => 'parent_promo-block_1',
          'region' => 'content',
          'weight' => '0',
        ),
        'views-elms_parent_info_blocks-block_3' => array(
          'module' => 'views',
          'delta' => 'elms_parent_info_blocks-block_3',
          'region' => 'right',
          'weight' => '0',
        ),
        'views-parents-block_4' => array(
          'module' => 'views',
          'delta' => 'parents-block_4',
          'region' => 'right',
          'weight' => '1',
        ),
        'views-elms_parent_info_blocks-block_2' => array(
          'module' => 'views',
          'delta' => 'elms_parent_info_blocks-block_2',
          'region' => 'right',
          'weight' => '2',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('ELMS Parent');
  t('Marketing funnel page');
  $export['elms_parent-pages-marketing'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'elms_parent-pages-student';
  $context->description = 'Student funnel page for the course';
  $context->tag = 'ELMS Parent';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'node/*/view/student' => 'node/*/view/student',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-elms_parent_info_blocks-block_3' => array(
          'module' => 'views',
          'delta' => 'elms_parent_info_blocks-block_3',
          'region' => 'right',
          'weight' => '0',
        ),
        'views-elms_parent_info_blocks-block_1' => array(
          'module' => 'views',
          'delta' => 'elms_parent_info_blocks-block_1',
          'region' => 'right',
          'weight' => '3',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('ELMS Parent');
  t('Student funnel page for the course');
  $export['elms_parent-pages-student'] = $context;

  return $export;
}
