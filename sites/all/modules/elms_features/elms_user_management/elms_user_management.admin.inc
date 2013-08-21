<?php
/**
 * Render a feeds import form on import/[config] pages.
 */
function elms_user_management_admin_form($form, &$form_state) {
  // load in all available feeds
  $feeds = feeds_importer_load_all();
  // only find the ones that are user import objects
  foreach ($feeds as $importer) {
    if (get_class($importer->processor) == 'FeedsUserProcessor') {
      $user_importers[$importer->id] = $importer->config['name'];
    }
  }
  // Select the name
  $form['elms_um_importer'] = array(
    '#type' => 'select',
    '#options' => $user_importers,
    '#title' => 'Feed for import',
    '#description' => 'This feed will be the one primarily used for the import of users into sites.',
    '#default_value' => variable_get('elms_um_importer', ''),
  );
  // base address
  $form['elms_um_importer_address'] = array(
    '#type' => 'textfield',
    '#title' => 'Base import address',
    '#description' => 'The base address for remote calls. If your import routine does not have a remote address then ignore this. This is useful for connecting to remote systems ithout people needing to know the entire address',
    '#default_value' => variable_get('elms_um_importer_address', ''),
    '#maxlength' => 200,
  );
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
  );
  return $form;
}

/**
 * Submit handler for elms_user_management_admin_form().
 */
function elms_user_management_admin_form_submit($form, &$form_state) {
  // store values
  drupal_set_message('Settings saved!');
  variable_set('elms_um_importer', check_plain($form_state['values']['elms_um_importer']));
  variable_set('elms_um_importer_address', check_plain($form_state['values']['elms_um_importer_address']));

}

/**
 * Menu callback; displays a module's settings page.
 */
function elms_user_management_settings_overview() {
  // Check database setup if necessary
  if (function_exists('db_check_setup') && empty($_POST)) {
    db_check_setup();
  }
  // create the elms admin container for adding settings to
  $item = menu_get_item('elms_site_admin/user_management');
  $content = system_admin_menu_block($item);
  $output = theme('admin_block_content', array('content' => $content));
  return $output;
}
