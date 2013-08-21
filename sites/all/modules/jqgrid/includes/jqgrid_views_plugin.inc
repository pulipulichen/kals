<?php

/**
 * @file
 * Definition of the view
 */

/**
 * Extending the view_plugin_style class to provide a jqgrid style.
 */
class jqgrid_views_plugin extends views_plugin_style {

  /**
   * Ini.
   */
  function init(&$view, &$display, $options = NULL) {
    parent::init($view, $display, $options);

    if (empty($options)) {
      return;
    }

    if (isset($options['pager']) && $options['pager']) {
      // If using jqgrid pager, need to set items per page to 0.
      $this->display->handler->default_display->options['pager']['options']['items_per_page'] = 0;
    }
  }

  /**
   * Set default options.
   */
  function option_definition() {
    $options = parent::option_definition();

    $options['columns'] = array('default' => array());
    $options['default'] = array('default' => '');
    $options['order'] = array('default' => 'asc');

    $options['scroll'] = array('default' => TRUE);
    $options['sortable'] = array('default' => TRUE);
    $options['filterToolbar'] = array('default' => TRUE);
    $options['footerrow'] = array('default' => FALSE);
    
    $options['rowNum'] = array('default' => 20);
    $options['height'] = array('default' => 300);
    $options['width'] = array('default' => 1200);

    return $options;
  }

  /**
   * Normalize a list of columns based upon the fields that are
   * available. This compares the fields stored in the style handler
   * to the list of fields actually in the view, removing fields that
   * have been removed and adding new fields in their own column.
   *
   * - Each field must be in a column.
   * - Each column must be based upon a field, and that field
   * is somewhere in the column.
   * - Any fields not currently represented must be added.
   * - Columns must be re-ordered to match the fields.
   *
   * @param $columns
   * An array of all fields; the key is the id of the field and the
   * value is the id of the column the field should be in.
   * @param $fields
   * The fields to use for the columns. If not provided, they will
   * be requested from the current display. The running render should
   * send the fields through, as they may be different than what the
   * display has listed due to access control or other changes.
   */
  function sanitize_columns($columns, $fields = NULL) {
    $sanitized = array();
    if ($fields === NULL) {
      $fields = $this->display->handler->get_option('fields');
    }
    // Preconfigure the sanitized array so that the order is retained.
    foreach ($fields as $field => $info) {
      // Set to itself so that if it isn't touched, it gets column
      // status automatically.
      $sanitized[$field] = $field;
    }
    if (is_array($columns)) {
      foreach ($columns as $field => $column) {
        // Make sure the field still exists.
        if (isset($sanitized[$field])) {
          $sanitized[$field] = $column;
        }
      }
    }
    return $sanitized;
  }

  /**
   * Add settings for the particular jqgrid.
   */
  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);

    $handlers = $this->display->handler->get_handlers('field');
    if (!isset($this->options['columns'])) {
      $this->options['columns'] = array();
    }

    $columns = $this->sanitize_columns($this->options['columns']);
    $field_labels = $this->display->handler->get_field_labels();
    if (empty($columns)) {
      $form['error_markup'] = array(
        '#value' => t('You need at least one field before you can configure your jqgrid settings'),
        '#prefix' => '<div class="error form-item description">',
        '#suffix' => '</div>',
      );
      return;
    }

    if (isset($this->options['default'])) {
      $default = $this->options['default'];
      if (!isset($columns[$default])) {
        $default = -1;
      }
    }
    else {
      $default = -1;
    }

    // Create an array of fields and form items for setting width,
    // sortable & available plugins.
    foreach ($columns as $field_id => $column) {

      $safe = str_replace(array('][', '_', ' '), '-', $field_id);
      // The $id of the column for dependency checking.
      $id = 'edit-style-options-columns-' . $safe;

      // Field name.
      $form['columns'][$field_id]['name'] = array(
        '#markup' => $field_labels[$field_id],
      );

      // Field for setting a column's width.
      $form['columns'][$field_id]['width'] = array(
        '#type' => 'textfield',
        '#default_value' => (isset($this->options['columns'][$field_id]['width']) ? $this->options['columns'][$field_id]['width'] : 100),
        '#size' => 10,
        '#maxlength' => 10,
      );

      // Footerdata.
      $form['columns'][$field_id]['footerdata'] = array(
        '#type' => 'select',
        '#default_value' => !empty($this->options['columns'][$field_id]['footerdata']) ? $this->options['columns'][$field_id]['footerdata'] : '',
        '#options' => array(
          '' => t('None'),
          'sum' => t('Sum'),
          'avg' => t('Average'),
          'count' => t('Count'),
          'min' => t('Min'),
          'max' => t('Max'),
        ),
      );

      // Align.
      $form['columns'][$field_id]['align'] = array(
        '#type' => 'select',
        '#default_value' => !empty($this->options['columns'][$field_id]['align']) ? $this->options['columns'][$field_id]['align'] : '',
        '#options' => array(
          '' => t('None'),
          'left' => t('Left'),
          'center' => t('Center'),
          'right' => t('Right'),
        ),
      );

      // Can this field be sorted?
      if ($handlers[$field_id]->click_sortable()) {
        $form['columns'][$field_id]['sortable'] = array(
          '#type' => 'checkbox',
          '#default_value' => !empty($this->options['columns'][$field_id]['sortable']),
        );
        $form['columns'][$field_id]['default_sort_order'] = array(
          '#type' => 'select',
          '#options' => array('asc' => t('Ascending'), 'desc' => t('Descending')),
          '#default_value' => !empty($this->options['columns'][$field_id]['default_sort_order']) ? $this->options['columns'][$field_id]['default_sort_order'] : 'asc',
          '#dependency' => array('edit-style-options-columns-' . $safe . '-sortable' => array(1)),
        );
        // Provide an ID so we can have such things.
        $radio_id = drupal_html_id('edit-default-' . $field_id);
        $form['default'][$field_id] = array(
          '#type' => 'radio',
          '#return_value' => $field_id,
          '#parents' => array('style_options', 'default'),
          '#id' => $radio_id,
          // Because 'radio' doesn't fully support '#id' =(.
          '#attributes' => array('id' => $radio_id),
          '#default_value' => $default,
          '#dependency' => array('edit-style-options-columns-' . $safe . '-sortable' => array(1)),
        );
      }

      $form['columns'][$field_id]['hidden'] = array(
        '#type' => 'checkbox',
        '#default_value' => (isset($this->options['columns'][$field_id]['hidden']) ? $this->options['columns'][$field_id]['hidden'] : FALSE),
      );

      $form['columns'][$field_id]['resizable'] = array(
        '#type' => 'checkbox',
        '#default_value' => (isset($this->options['columns'][$field_id]['resizable']) ? $this->options['columns'][$field_id]['resizable'] : FALSE),
      );

      // TODO
      // Can this field be searchable?
      if ($handlers[$field_id]->click_sortable()) {
        // Field for setting if a column is sortable.
        $form['columns'][$field_id]['search'] = array(
          '#type' => 'checkbox',
          '#default_value' => (isset($this->options['columns'][$field_id]['search']) ? $this->options['columns'][$field_id]['search'] : FALSE),
          '#size' => 10,
        );
      }

      // TODO
      // Can this field be editable?
      if ($handlers[$field_id]->click_sortable()) {
        // Field for setting if a column is sortable.
        $form['columns'][$field_id]['editable'] = array(
          '#type' => 'checkbox',
          '#default_value' => (isset($this->options['columns'][$field_id]['editable']) ? $this->options['columns'][$field_id]['editable'] : FALSE),
          '#size' => 10,
        );
        $form['columns'][$field_id]['edittype'] = array(
          '#type' => 'select',
          '#options' => array(
            'text' => t('Text'),
            'date_picker' => t('Date PopUp'),
            'list' => t('List'),
          ),
          '#default_value' => !empty($this->options['columns'][$field_id]['edittype']) ? $this->options['columns'][$field_id]['edittype'] : 'text',
          '#dependency' => array('edit-style-options-columns-' . $safe . '-editable' => array(1)),
        );
      }
    }

    // Provide a radio for no default sort.
    $form['default'][-1] = array(
      '#type' => 'radio',
      '#return_value' => -1,
      '#parents' => array('style_options', 'default'),
      '#id' => 'edit-default-0',
      '#default_value' => $default,
    );

    $form['layout'] = array(
      '#type' => 'fieldset',
      '#title' => t('Layout'),
    );
    $form['layout']['height'] = array(
      '#type' => 'textfield',
      '#title' => t('Height'),
      '#default_value' => $this->options['height'],
      '#parents' => array(
        'style_options',
        'height',
      ),
    );
    $form['layout']['width'] = array(
      '#type' => 'textfield',
      '#title' => t('Width'),
      '#default_value' => $this->options['width'],
      '#parents' => array(
        'style_options',
        'width',
      ),
    );
    $form['layout']['rowNum'] = array(
      '#type' => 'textfield',
      '#title' => t('Row Num'),
      '#default_value' => $this->options['rowNum'],
      '#parents' => array(
        'style_options',
        'rowNum',
      ),
    );

    $form['settings'] = array(
      '#type' => 'fieldset',
      '#title' => t('Settings'),
    );
    $form['settings']['scroll'] = array(
      '#type' => 'checkbox',
      '#title' => t('Creates dynamic scrolling grids.'),
      '#default_value' => $this->options['scroll'],
      '#parents' => array(
        'style_options',
        'scroll',
      ),
    );
    $form['settings']['sortable'] = array(
      '#type' => 'checkbox',
      '#title' => t('Enable reordering columns'),
      '#default_value' => $this->options['sortable'],
      '#parents' => array(
        'style_options',
        'sortable',
      ),
    );
    $form['settings']['filterToolbar'] = array(
      '#type' => 'checkbox',
      '#title' => t('Enable filter Toolbar'),
      '#default_value' => $this->options['filterToolbar'],
      '#parents' => array(
        'style_options',
        'filterToolbar',
      ),
    );
    $form['settings']['footerrow'] = array(
      '#type' => 'checkbox',
      '#title' => t('Enable footer'),
      '#description' => t('Enable a footer table with one row below the gird records and above the pager.'),
      '#default_value' => $this->options['footerrow'],
      '#parents' => array(
        'style_options',
        'footerrow',
      ),
    );
    
    $form['#theme'] = 'jqgrid_views_plugin_table';
  }

  /**
   * Run Query.
   */
  function query() {
    // We always want the query to be distinct.
    // This also adds the correct base field.
    $this->view->query->set_distinct();
  }
}
