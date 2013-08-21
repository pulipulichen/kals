<?php
/**
 * @file
 * elms_reaction.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function elms_reaction_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: menu-elms-reactions:reactions/all
  $menu_links['menu-elms-reactions:reactions/all'] = array(
    'menu_name' => 'menu-elms-reactions',
    'link_path' => 'reactions/all',
    'router_path' => 'reactions/all',
    'link_title' => 'All Reactions',
    'options' => array(
      'attributes' => array(
        'title' => 'View all Reactions',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '0',
  );
  // Exported menu link: menu-elms-reactions:reactions/my
  $menu_links['menu-elms-reactions:reactions/my'] = array(
    'menu_name' => 'menu-elms-reactions',
    'link_path' => 'reactions/my',
    'router_path' => 'reactions/my',
    'link_title' => 'My Reactions',
    'options' => array(
      'attributes' => array(
        'title' => 'View all my reactions',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '0',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('All Reactions');
  t('My Reactions');


  return $menu_links;
}
