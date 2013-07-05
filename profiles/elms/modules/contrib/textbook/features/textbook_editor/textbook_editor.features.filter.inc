<?php
/**
 * @file
 * textbook_editor.features.filter.inc
 */

/**
 * Implements hook_filter_default_formats().
 */
function textbook_editor_filter_default_formats() {
  $formats = array();

  // Exported format: Textbook.
  $formats['textbook_editor'] = array(
    'format' => 'textbook_editor',
    'name' => 'Textbook',
    'cache' => '1',
    'status' => '1',
    'weight' => '-10',
    'filters' => array(
      'filter_html' => array(
        'weight' => '-49',
        'status' => '1',
        'settings' => array(
          'allowed_html' => '<div> <h2> <h3> <h4> <h5> <h6> <em> <strong> <img> <blockquote> <cite> <sup> <sub> <p> <ul> <ol> <li> <dl> <dt> <dd> <a> <table> <tr> <td> <th> <tbody> <thead> <tfoot> <colgroup> <caption> <hr>',
          'filter_html_help' => 1,
          'filter_html_nofollow' => 0,
        ),
      ),
      'video_filter' => array(
        'weight' => '-48',
        'status' => '1',
        'settings' => array(
          'video_filter_width' => '640',
          'video_filter_height' => '420',
          'video_filter_autoplay' => '0',
          'video_filter_related' => '0',
          'video_filter_html5' => '1',
        ),
      ),
      'ckeditor_link_filter' => array(
        'weight' => '-43',
        'status' => '1',
        'settings' => array(),
      ),
      'transliteration' => array(
        'weight' => '-42',
        'status' => '1',
        'settings' => array(
          'no_known_transliteration' => '?',
        ),
      ),
      'filter_url' => array(
        'weight' => '-41',
        'status' => '1',
        'settings' => array(
          'filter_url_length' => '60',
        ),
      ),
      'filter_htmlcorrector' => array(
        'weight' => '-35',
        'status' => '1',
        'settings' => array(),
      ),
    ),
  );

  return $formats;
}
