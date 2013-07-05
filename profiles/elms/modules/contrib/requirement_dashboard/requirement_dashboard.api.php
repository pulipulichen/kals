<?php

/**
 * @file
 * Hooks provided by Requirement Dashboard.
 */

/**
 * Add requirement dashboards to be created
 *
 * Allows other modules to create providers for requirement dashboards
 *
 */
function hook_requirement_dashboard_provider() {
  // this is the machine name used on permissions page / elsewhere
  $dashboards['provider_name'] = array(
    // required: name of the module invoking this
    'title' => 'Title of the Dashboard',
    // required: menu path for accessing this
    'path' => 'pathname',
  );
  // you can define as many providers as you want though including only 1 is more modular
  $dashboards['og'] = array(
    'title' => 'Group Status',
    'path' => 'node/%node/og_status',
  );
  return $dashboards;
}

/**
 * Implements hook_requirement_dashboard_provider_alter().
 */
function hook_requirement_dashboard_provider_alter(&$dashboards) {

}

/**
 * Add requirments to dashboard providers
 *
 * Allows other modules to define requirements
 * Valid severities are:
 * REQUIREMENT_INFO
 * REQUIREMENT_OK
 * REQUIREMENT_WARNING
 * REQUIREMENT_ERROR
 *
 */
function hook_dashboard_requirements($provider) {
  // always include a switch statement with each case being the name of a provider
  switch ($provider) {
    case 'provider':
      // something to make this info dynamic
      $calculated_value = 'something dynamic';
      // you can define requirements much like the core requirements hook
      $requirements['requirement_name'] = array(
        // required: The title to appear in the first column
        'title' => t('Title'),
        // required: The value to display in the 2nd column, most likely something variable
        'value' => $calculated_value,
        // required: The class that should be applied, this should be calculated in most instances
        'severity' => REQUIREMENT_INFO,
        // optional: a description of the information
        'description' => 'This provides the data of the item',
      );
      break;
    case 'og':
      // example requirement from the group provider
      $group = og_group_get_context();
      $requirements['name'] = array(
        'title' => t('Group Name'),
        'value' => $group->title,
        'severity' => REQUIREMENT_INFO,
      );
      break;
  }
  return $requirements;
}

/**
 * Implements hook_dashboard_requirements_alter().
 */
function hook_dashboard_requirements_alter(&$requirements, $provider) {

}
