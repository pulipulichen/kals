<?php
/**
 * @file
 * How to handle book pages
 *
 * This is done for consistency across the ELMS environment
 */
  // find 1 level from the top
  if (arg(0) == 'node' && is_numeric(arg(1))) {
    $nid = arg(1);
    // if active is the first child page to the previous item, remove the previous url
    if ($prev_depth < $active_depth) {
      $prev_url = FALSE;
    }
    // if active is the last child page in this branch and the next item is in a new branch, remove the next url
    if ($active_depth > $next_depth) {
      $next_url = FALSE;
    }
    if ($tree || $has_links): ?>
  <br/>
  <div id="book-navigation-<?php print $book_id; ?>" class="book-navigation">
    <?php
    // check for highest level, print table of contents if this is the case
    if ($tree && $book_id == $nid) {
      print _elms_content_toc($book_id);
    }
    else {
      $node = menu_get_object();
      if ($node->type == 'folder') {
        print $tree;
      }
    }
  ?>
  </div>
<?php
  endif;
}
