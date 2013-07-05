<?php
/**
 * Render a feeds import form on import/[config] pages.
 */
function elms_user_management_import_form($form, &$form_state) {
  $source = feeds_source(variable_get('elms_um_importer', ''), 0);
  $form = array();
  $form['#importer_id'] = variable_get('elms_um_importer', '');
  // @todo Move this into fetcher?
  $form['#attributes']['enctype'] = 'multipart/form-data';
  $form['feeds'] = array(
    '#type' => 'fieldset',
    '#tree' => TRUE,
    '#title' => 'Advanced admin options for import',
    '#collapsed' => TRUE,
    '#collapsible' => TRUE,
    '#description' => 'Change these settings only if you know what you are doing',
  );
  $form['feeds'] += $source->configForm($form_state);
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Import'),
  );
  return $form;
}

/**
 * Validation handler for node forms and feeds_import_form().
 */
function elms_user_management_import_form_validate($form, &$form_state) {
  // @todo This may be a problem here, as we don't have a feed_nid at this point.
  feeds_source($form['#importer_id'])->configFormValidate($form_state['values']['feeds']);
}

/**
 * Submit handler for feeds_import_form().
 */
function elms_user_management_import_form_submit($form, &$form_state) {

  // Save source and import.
  $source = feeds_source($form['#importer_id']);
  $source->addConfig($form_state['values']['feeds']);
  $source->save();

  // Refresh feed if import on create is selected.
  if ($source->importer->config['import_on_create']) {
    feeds_batch_set(t('Importing'), 'import', $form['#importer_id']);
  }

  // Add to schedule, make sure importer is scheduled, too.
  $source->schedule();
  $source->importer->schedule();
}
