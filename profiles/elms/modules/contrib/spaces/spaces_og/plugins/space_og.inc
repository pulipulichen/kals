<?php

/**
 * Organic groups integration for Spaces.
 */
class space_og extends space_type_purl {
  var $group = NULL;

  /**
   * Constructor.
   */
  function __construct($type, $id = NULL) {
    parent::__construct($type, $id);
    // Extend spaces object with og entity.
    if (function_exists("og_get_group")) {
      $this->og = og_get_group('node', $this->id);
    }
  }

  /**
   * Override of title().
   */
  function title() {
    return $this->group->title;
  }

  /**
   * Override of activate().
   */
  function activate() {
    if (parent::activate()) {
      // TODO determine what replaces this in D7.
      // og_set_group_context($this->group);
      // og_set_language($this->group);

      // Handle theme switching for OG
      if (!empty($this->group->og_theme)) {
        global $custom_theme;
        $custom_theme = $this->group->og_theme;
      }

      return TRUE;
    }
    return FALSE;
  }

  /**
   * Override of load().
   */
  function load() {
    // The 0 id means a new group is being saved. Instantiate a space
    // so preset values can become active.
    if ($this->id === 0) {
      return TRUE;
    }
    else if ($this->group = node_load($this->id)) {
      return TRUE;
    }
    return FALSE;
  }

  /**
   * Override of access_space().
   */
  function access_space($account = NULL) {
    global $user;
    $account = isset($account) ? $account : $user;

    return parent::access_space($account) && (
      user_access('administer group') ||
      $this->group->{OG_ACCESS_FIELD}[LANGUAGE_NONE][0]['value'] != 1 || // Group is public, allow access
      og_is_member($this->og->gid, 'user', $account) || // User is group member, allow access
      user_is_anonymous()); // User hasn't logged in -- provide entry point
  }

  /**
   * Override access_admin().
   */
  function access_admin($account = NULL) {
    global $user;
    $account = isset($account) ? $account : $user;

    if ($this->og && ($this->og_is_group_admin($this->og, $account) || $this->group->uid === $account->uid)) {
      return TRUE;
    }
    else {
     if (user_access('administer spaces', $account) || user_access('administer group', $account)) {
      return TRUE;
      }
    }
    return parent::access_admin($account);
  }

  /**
   * Override of access_feature().
   */
  function access_feature($op = 'view', $feature, $account = NULL) {
    $access = parent::access_feature($op, $feature, $account);

    global $user;
    $account = isset($account) ? $account : $user;

    // Only allow access if: user can administer OG, group is public,
    // or user is a member.
    $membership = FALSE;
    if ($membership = og_get_group_membership($this->og->gid, 'user', $account->uid)) {
      $membership = $membership->state;
    }
    $access = $access && (user_access('administer group') || $this->group->{OG_ACCESS_FIELD}[LANGUAGE_NONE][0]['value'] == OG_CONTENT_ACCESS_PUBLIC || $membership);

    // Additional check for group membership if authoring content in this group.
    if ($op === 'create') {
      return $access && og_is_member($this->og->gid, 'user', $account);
    }
    return $access;
  }

  /**
   * Override of access_user().
   */
  function access_user($op = 'view', $account = NULL) {
    global $user;
    $account = isset($account) ? $account : $user;
    // Test whether both user and account belong to current space.
    $test_user = og_is_member($this->og->gid, 'user');
    $test_account = og_is_member($this->og->gid, FALSE, $account->uid);
    if (($test_user && $test_account) || user_access('view users outside groups')) {
      return parent::access_user($op, $account);
    }
    return FALSE;
  }

  /**
   * Implementation of space->router().
   */
  function router($op, $object = NULL, $is_active = TRUE) {
    global $user;
    switch ($op) {
      case 'init':
        return;
      case 'node':
        $node = $object;
        $form = !isset($node->nid) || isset($node->date) ? TRUE : FALSE;

        // Group node
        if (og_is_group_type('node', $node->type)) {
          // Don't make new groups from within a group space.
          if (!isset($node->nid) && $this->active) {
            $this->deactivate();
            return;
          }
          // If editing or viewing an existing node, make sure we're in the correct space
          else if (isset($node->nid) && (!$this->active || ($this->active && $this->id != $node->nid)) && $space = spaces_load('og', $node->nid)) {
            $space->activate();
            return;
          }
        }
        // Group enabled node, route to correct group context.
        // TODO verify that this sufficiently replaces the og_is_omitted_type() function.
        else if (og_is_group_content_type('node', $node->type)) {
          if (!empty($node->{OG_AUDIENCE_FIELD}[LANGUAGE_NONE])) {
            foreach($node->{OG_AUDIENCE_FIELD}[LANGUAGE_NONE] as $item) {
              $gids[] = $item['gid'];
            }
          }

          // If the node belongs to the current active group space, or we're in an allowable other space type, pass thru
          if ($this->active && in_array($this->og->gid, $gids)) {
            return;
          }

          // Otherwise route
          $gid = reset($gids);
          if ($gid) {
            spaces_load('og', og_load($gid)->etid)->activate();
          }
          return;
        }
        break;
    }
  }

  // Spaces OG views filter
  function views_filter(&$query, $base_table = '', $relationship = '') {
    /**
     * TODO Fix ensure_table. This works only for certain relationships
     */
    switch ($base_table) {
      case 'node':
        $table = $query->ensure_table('field_data_group_audience', $relationship);
        $query->add_where(0, 'field_data_group_audience.group_audience_gid', $this->og->gid, '=');
        break;
      case 'users':
        $table = $query->ensure_table('og_membership', $relationship);
        $query->add_where(0, 'og_membership_users.gid', $this->og->gid);
        break;
    }
  }

  /**
   * Custom function group_node_admin_access().
   * Check that the current menu node object is also a group node.
   */
  function group_node_admin_access($node) {
    if ($node && og_is_group_type('node', $node->type)) {
      return $this->admin_access();
    }
    return FALSE;
  }

  /**
   * Check if the user is a group administator.
   *
   * @param $group
   *  Group entity.
   * @param $account
   *  User entity.
   */
  function og_is_group_admin($group, $account) {
    $membership = og_get_group_membership($group->gid, 'user', $account->uid);
    if (isset($membership->state) && $membership->state == OG_STATE_ACTIVE) {
      return og_user_access($group->gid, 'manage group space', $account);
    }
    return FALSE;
  }

  /**
   * Override of excluded_paths().
   * Adds og, og/* paths.
   */
  protected function excluded_paths() {
    $excluded = parent::excluded_paths();
    $excluded[] = 'og';
    $excluded[] = 'og/my';
    $excluded[] = 'og/all';
    return $excluded;
  }
}
