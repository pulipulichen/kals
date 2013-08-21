<?php

/**
 * Implementation of hook_views_data().
 */
function views_filters_populate_views_data() {
  $data['views_filters_populate']['table']['group'] = t('Global');
  $data['views_filters_populate']['table']['join'] = array(
    '#global' => array(),
  );

  $data['views_filters_populate']['populate'] = array(
    'title' => t('Populate filters'),
    'help' => t('Use other filters with the value of this filter.'),
    'filter' => array(
      'handler' => 'views_filters_populate_handler_filter',
    ),
  );
  
  return $data;
}
