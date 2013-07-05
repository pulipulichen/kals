<?php

/**
 * @file
 * Implementation of the spaces theme form.
 */

// helper function for group theme settings
function _spaces_theme_theme_form($form, &$form_state) {
  $spaces_features = variable_get('spaces_features', array());
  // create directories just in-case of first load
  $dir = file_default_scheme() . '://spaces_theme_logos';
  file_prepare_directory($dir,   1);
  $dir = file_default_scheme() . '://spaces_theme_favicons';
  file_prepare_directory($dir,   1);
  $group = og_context();
  $node = node_load($group['gid']);
  // get local overrides from the new theme if possible
  $settings = variable_get('theme_' . $node->group_theme['und'][0]['value'] . '_settings', array());
  // verify something was returned, otherwise pull from the global defaults
  if (count($settings) == 0) {
    $settings = variable_get('theme_settings', array());
  }
  if (!is_array($settings)) {
    $settings = array();
  }
  $form = array();
  // add in theme selection form
  $form['theme'] = array(
    '#type' => 'select',
    '#title' => t('Theme'),
    '#options' => og_theme_field_allowed_values(),
    '#default_value' => $node->group_theme['und'][0]['value'],
    '#description' => t('Select a new theme to use.'),
  );
  // site logo
  $form['logo'] = array(
    '#type' => 'fieldset',
    '#title' => t('Site logo'),
    '#collapsed' => TRUE,
    '#collapsible' => TRUE,
  );
  $form['logo']['default_logo'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use the default logo'),
    '#default_value' => $settings['default_logo'],
    '#description' => t('Check here if you want the theme to use the logo supplied with it.'),
  );
  $form['logo']['logo_path'] = array(
    '#type' => 'textfield',
    '#size' => '40',
    '#title' => t("File path"),
    '#required' => FALSE,
    '#default_value' => $settings['logo_path'],
  );
  $form['logo']['logo_upload'] = array(
    '#type' => 'file',
    '#size' => '10',
    '#title' => t("Upload"),
    '#description' => t('The logo typically is in the top left corner of the theme'),
    '#required' => FALSE,
  );
  // favorite's icon
  $form['favicon'] = array(
    '#type' => 'fieldset',
    '#title' => t('Shortcut icon'),
    '#collapsed' => TRUE,
    '#collapsible' => TRUE,
  );
  $form['favicon']['default_favicon'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use the default shortcut icon.'),
    '#default_value' => $settings['default_favicon'],
    '#description' => t('Check here if you want the theme to use the default shortcut icon.'),
  );
  $form['favicon']['favicon_path'] = array(
    '#type' => 'textfield',
    '#size' => '40',
    '#title' => t("File path"),
    '#required' => FALSE,
    '#default_value' => $settings['favicon_path'],
  );
  $form['favicon']['favicon_upload'] = array(
    '#type' => 'file',
    '#size' => '10',
    '#title' => t("Upload"),
    '#description' => 'The icon you see in the left corner of the link bar.  This is usually a 16x16 icon and file size must be less then 1M',
    '#required' => FALSE,
  );
  // additional theme settings
  $form['theme_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Settings'),
    '#collapsed' => TRUE,
    '#collapsible' => TRUE,
  );
  // support for logo
  $form['theme_settings']['toggle_logo'] = array(
    '#type' => 'checkbox',
    '#title' => t("Logo"),
    '#description' => "Display the logo uploaded in this theme",
    '#default_value' => $settings['toggle_logo'],
  );
  // support for site name
  $form['theme_settings']['toggle_name'] = array(
    '#type' => 'checkbox',
    '#title' => t("Name"),
    '#description' => "Display the site name if the theme supports it",
    '#default_value' => $settings['toggle_name'],
  );
  // support for site slogan
  $form['theme_settings']['toggle_slogan'] = array(
    '#type' => 'checkbox',
    '#title' => t("Slogan"),
    '#description' => "Display the Slogan if the theme supports it",
    '#default_value' => $settings['toggle_slogan'],
  );
  // ability to swap primary links out
  $form['theme_settings']['toggle_main_menu'] = array(
    '#type' => 'checkbox',
    '#title' => t("Primary links"),
    '#description' => "Include primary links if the theme supports them",
    '#default_value' => $settings['toggle_main_menu'],
  );
  // ability to swap secondary links out
  $form['theme_settings']['toggle_secondary_menu'] = array(
    '#type' => 'checkbox',
    '#title' => t("Secondary links"),
    '#description' => "Include secondary links if the theme supports them",
    '#default_value' => $settings['toggle_secondary_menu'],
  );
  // This needs to be added so that we can successfully submit images / files
  $form['#attributes'] = array('enctype' => "multipart/form-data");
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Apply theme settings'),
    '#weight' => 10,
    '#submit' => array('_spaces_theme_theme_form_submit'),
  );
  return $form;
}

// validate the form values
function _spaces_theme_theme_form_validate($form, &$form_state) {
  $form_state['storage']['logo'] = '';
  $form_state['storage']['favicon'] = '';
  // create the theme logo area and validate its size
  $dir = file_default_scheme() . '://spaces_theme_logos';
  $is_writable = file_prepare_directory($dir, 1);
  if ($is_writable) {
    $validators = array(
      'file_validate_is_image' => array(),
      'file_validate_size' => array(2000 * 1024),
    );
    if ($file = file_save_upload('logo_upload', $validators, $dir, FILE_EXISTS_RENAME)) {
      $form_state['storage']['logo'] = str_replace(' ', '%20', $file->filepath);
    }
  }
  // same operation but for the icon
  $dir = file_default_scheme() . '://spaces_theme_favicons';
  $is_writable = file_prepare_directory($dir, 1);
  if ($is_writable) {
    // this uses a validator developed for outline designer to force the image to 16x16
    $validators = array(
      'file_validate_is_image' => array(),
      '_spaces_theme_validate_image_resolution' => array('16x16'),
      'file_validate_size' => array(1000 * 1024),
    );
    if ($file = file_save_upload('favicon_upload', $validators, $dir, FILE_EXISTS_RENAME)) {
      $form_state['storage']['favicon'] = str_replace(' ', '%20', $file->filepath);
    }
  }
}

// theme settings submit
function _spaces_theme_theme_form_submit($form, &$form_state) {
  // store values in related group
  $group = og_context();
  $node = node_load($group['gid']);
  $theme = $form_state['values']['theme'];
  $space = spaces_load('og', $node->nid, TRUE);
  if ($space && $theme == $node->group_theme['und'][0]['value']) {
    // get local overrides from the new theme if possible
    $theme_array = variable_get('theme_' . $theme . '_settings', array());
    // verify something was returned, otherwise pull from the global defaults
    if (count($theme_array) == 0) {
      $theme_array = variable_get('theme_settings', array());
    }
    foreach ($form_state['values'] as $key => $val) {
      // filter out fields we don't care about
      switch ($key) {
        case 'preset_generate':
        case 'op':
        case 'submit':
        case 'form_build_id':
        case 'form_token':
        case 'form_id':
        case 'theme':
          break;
        default:
          $theme_array[$key] = $val;
          break;
      }
    }
    // if a theme logo / banner was uploaded, throw it in
    if ($form_state['storage']['logo'] != '') {
      $theme_array['logo_path'] = $form_state['storage']['logo'];
    }
    // if favicon was uploaded, store the file path
    if ($form_state['storage']['favicon'] != '') {
      $theme_array['favicon_path'] = $form_state['storage']['favicon'];
    }
    // if CSS was uploaded, store the file path
    if (isset($form_state['storage']['css'])) {
      $theme_array['extra_css_path'] = $form_state['storage']['css'];
    }
    // save theme settings to a local instance for this theme only
    $space->controllers->variable->set('theme_' . $theme . '_settings', $theme_array);
  }
  else {
    $node->group_theme['und'][0]['value'] = $theme;
    // get local overrides from the new theme if possible
    $theme_array = variable_get('theme_' . $theme . '_settings', array());
    // verify something was returned, otherwise pull from the global default
    if (count($theme_array) == 0) {
      $theme_array = variable_get('theme_settings', array());
      // this will help in setting defaults should they not exist
      $space->controllers->variable->set('theme_' . $theme . '_settings', $theme_array);
    }
    node_save($node);
  }
  $ary = $_GET;
  // need to add in a random value, it's silly as to why but this forces a cache refresh for the user so that their changes are reflected immediately as opposed to a few page loads from now
  $ary['set'] = rand(10, 100);
  // set where we want things to go manually so that the random value can be appended
  unset($ary['q']);
  // TODO $ary needs to be an array of keys and values instead of a string.
  drupal_goto(drupal_get_path_alias($_GET['q']), array('query' => $ary));
}

// used in validating that an icon upload is the correct size
function _spaces_theme_validate_image_resolution(&$file, $dimensions) {
  $errors = array();
  // Check first that the file is an image.
  if ($info = image_get_info($file->filepath)) {
    // Check if the favicon matches the given dimensions.
    list($width, $height) = explode('x', $dimensions);
    if ($info['width'] != $width || $info['height'] != $height) {
      // Try to resize the image to fit the dimensions if it doesn't.
      if (image_get_toolkit() && image_scale_and_crop($file->filepath, $file->filepath, $width, $height)) {
        drupal_set_message(t('The image was resized to the allowed dimensions of %dimensions pixels.', array('%dimensions' => $dimensions)));
        // Clear the cached filesize and refresh the image information.
        clearstatcache();
        $info = image_get_info($file->filepath);
        $file->filesize = $info['file_size'];
      }
      else {
        $errors[] = t('Image dimensions need to be %dimensions pixels.', array('%dimensions' => $maximum_dimensions));
      }
    }
  }
  return $errors;
}
