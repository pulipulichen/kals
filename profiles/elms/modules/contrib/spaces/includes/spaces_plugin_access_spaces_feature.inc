<?php

/**
 * Provides access control for views by checking against the current space's
 * feature settings. Optionally allows a permission to be checked in addition
 * to the first feature access control check.
 *
 * This access plugin delegates access control first to spaces_feature_access()
 * which will check whether the user can first access content, then the active
 * space type's 'feature_access' method will be called.  If implementing your
 * own space type you have the ability to define your own access control.  See
 * 'space_og' class in Spaces OG module for an example implementation.
 */
class spaces_plugin_access_spaces_feature extends views_plugin_access {
  /**
   * Check access directly.
   */
  function access($account) {
    $feature = $this->options['spaces_feature'] == 0 ? $this->get_my_feature() : $this->options['spaces_feature'];
    if (!empty($this->options['perm'])) {
      return spaces_access_feature_perms('view', $feature, NULL, NULL, array($this->options['perm']));
    }
    return spaces_access_feature('view', $feature, NULL);
  }

  /**
   * Provide the access check as a callback.
   */
  function get_access_callback() {
    $feature = empty($this->options['spaces_feature']) ? $this->get_my_feature() : $this->options['spaces_feature'];
    if (!empty($this->options['perm'])) {
      return array('spaces_access_feature_perms', array('view', $feature, NULL, NULL, array($this->options['perm'])));
    }
    return array('spaces_access_feature', array('view', $feature, NULL));
  }

  /**
   * Display for Views UI.
   */
  function summary_title() {
    $features = spaces_features();
    if (isset($features[$this->options['spaces_feature']])) {
      return t('Feature: @feature', array('@feature' => $features[$this->options['spaces_feature']]->info['name']));
    }
    return empty($this->options['spaces_feature']) ? t('Autodetect') : t('Broken');
  }

  /**
   * Override of option_definition().
   */
  function option_definition() {
    $options = parent::option_definition();
    $options['spaces_feature'] = array('default' => '');
    $options['perm'] = array('default' => 'access content');
    return $options;
  }

  /**
   * Override of options_form().
   */
  function options_form(&$form, &$form_state) {
    // Generate feature options.
    $options = array(0 => t('Autodetect'));
    foreach (spaces_features() as $feature) {
      $options[$feature->name] = check_plain($feature->info['name']);
    }
    $form['spaces_feature'] = array(
      '#type' => 'select',
      '#title' => t('Feature'),
      '#default_value' => $this->options['spaces_feature'],
      '#options' => $options,
      '#description' => t('Only allow access to this view if the user has access to the selected feature.'),
    );

    // Get list of permissions.
    $perms = array('' => '<' . t('No permission check') . '>');
    $module_info = system_get_info('module');

    // Get list of permissions
    foreach (module_implements('permission') as $module) {
      $permissions = module_invoke($module, 'permission');
      foreach ($permissions as $name => $perm) {
        $perms[$module_info[$module]['name']][$name] = strip_tags($perm['title']);
      }
    }

    asort($perms);

    $form['perm'] = array(
      '#type' => 'select',
      '#options' => $perms,
      '#title' => t('Permission'),
      '#default_value' => $this->options['perm'],
      '#description' => t('Only users with the selected permission flag will be able to access this display. Note that users with "access all views" can see any view, regardless of other permissions.'),
    );
  }

  /**
   * Attempt to detect the feature that this view belongs to.
   */
  protected function get_my_feature() {
    $map = features_get_component_map('views_view');
    return !empty($map[$this->view->name]) ? reset($map[$this->view->name]) : FALSE;
  }
}
