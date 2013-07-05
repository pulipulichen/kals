<?php
/**
 * @file
 * elms_reaction.features.menu_custom.inc
 */

/**
 * Implements hook_menu_default_menu_custom().
 */
function elms_reaction_menu_default_menu_custom() {
  $menus = array();

  // Exported menu: menu-elms-reactions
  $menus['menu-elms-reactions'] = array(
    'menu_name' => 'menu-elms-reactions',
    'title' => 'Reactions',
    'description' => 'Area for Reaction specific menu to display',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Area for Reaction specific menu to display');
  t('Reactions');


  return $menus;
}
