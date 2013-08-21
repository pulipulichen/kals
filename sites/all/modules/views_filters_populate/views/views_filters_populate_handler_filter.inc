<?php

/**
 * @file
 * Filter classes.
 *
 * These classes are always used together, so we keep them in the same file.
 */

/**
 * Generic views handler filter to add code to manipulate the query object.
 */
class views_filters_populate_handler_filter extends views_handler_filter {
  // Don't display empty space where the operator would be.
  var $no_operator = TRUE;
  var $no_single = TRUE;
  
  function admin_summary() {
    if (!empty($this->options['exposed'])) {
      return t('exposed');
    }

    return $output;
  }

  function option_definition() {
    $options = parent::option_definition();

    $options['filters'] = array('default' => array());

    return $options;
  }

  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);

    foreach((array)$this->view->display_handler->get_handlers('filter') as $id => $filter) {
      if ($id != $this->options['id']) {
        $options[$id] = t($filter->definition['group']) . ':' . t($filter->definition['title']);
      }
    }
    
    $form['filters'] = array(
      '#type' => 'checkboxes',
      '#options' => $options,
      '#title' => t('Filters'),
      '#description' => t('Choose the filters whose value will be replaced by the one specified here.'),
      '#default_value' => $this->options['filters'],
    );

  }
  
 /**
   * Add this filter to the query.
   *
   * Due to the nature of fapi, the value and the operator have an unintended
   * level of indirection. You will find them in $this->operator
   * and $this->value respectively.
   */
  function query() {
    // do nothing
  }
  
  function pre_query() {
    // start with default value
    $value = $this->value;
    
    // If eexposed, take data from input, as this hasn't reached the views
    // object yet
    if ($this->options['exposed']) {
      $input = $this->view->get_exposed_input();
      $identifier = $this->options['expose']['identifier'];
      if (isset($input[$identifier])) {
        $value = $input[$identifier];
      }
    }
    foreach ($this->options['filters'] as $filter) {
      if ($filter) {
        // attempt to support different types of values over different filters
        // i.e. cck integer value is an array of min, max and value
        if (is_string($this->view->filter[$filter]->value)) {
          $this->view->filter[$filter]->value = $value;
        }
        if (is_array($this->view->filter[$filter]->value) && is_string($this->view->filter[$filter]->value['value'])) {
          $this->view->filter[$filter]->value['value'] = $value;
        }
      }
    }
  }
  
  /**
   * Provide a simple textfield for equality
   */
  function value_form(&$form, &$form_state) {
    
    if (!empty($form_state['exposed'])) {
      $identifier = $this->options['expose']['identifier'];
    }
    
    $form['value'] = array(
      '#type' => 'textfield',
      '#title' => t('Value'),
      '#size' => 30,
      '#default_value' => $this->value,
    );

    if (!empty($form_state['exposed']) && !isset($form_state['input'][$identifier])) {
      $form_state['input'][$identifier] = $this->value;
    }

    if (!isset($form['value'])) {
      // Ensure there is something in the 'value'.
      $form['value'] = array(
        '#type' => 'value',
        '#value' => NULL
      );
    }
  }
}
