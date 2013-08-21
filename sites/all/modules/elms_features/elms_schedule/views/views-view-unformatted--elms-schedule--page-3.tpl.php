<?php
// $Id: views-view-unformatted.tpl.php,v 1.6 2008/10/01 20:52:11 merlinofchaos Exp $
/**
 * @file views-view-unformatted.tpl.php
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
 
 
 //use this to figure out the child depth for styling purposes, this has the NIDs of each row
 //create a map between the row $id and the $nid
 //then only store the values where a collapse is needed and style appropriately
  foreach($view->result as $key => $ary) {
    $tmpnid = $ary->nid;
    $depth = -1;
    //calculate depth
    while ($tmpnid != 0) {
      $last_nid = $tmpnid;
      $tmpnid = db_result(db_query("SELECT value FROM {draggableviews_structure} WHERE delta=1 AND view_name='elms_schedule' AND nid=%d", $last_nid));
      $depth++;
    }
    if ($depth == 0) {
      $nids[$key] = $ary->nid;
    }
  }
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<?php
 if (isset($_POST['num_events']) && drupal_valid_token($_POST['user_token'])) {
    $group = og_context();
    global $user;
    for($i=0; $i<$_POST['num_events']; $i++) {
      $node = _elms_schedule_clean_node();
      $node->og_groups = array($group->nid => $group->nid);
      $node->og_groups_both = array($group->nid => $group->title);
      node_save($node);
      //get the current max weight since we add all new objects to the end
      $weight = db_result(db_query("SELECT MAX(value) FROM {draggableviews_structure} WHERE delta=0 AND view_name='%s'",$view->name));
      //insert the weight value
      db_query("INSERT INTO {draggableviews_structure}(view_name, nid, delta, value, args) VALUES('%s', %d, %d, %d, '%s')", $view->name, $node->nid, 0, ($weight+1), '');
      //insert that this has no parent at the moment
      db_query("INSERT INTO {draggableviews_structure}(view_name, nid, delta, value, args) VALUES('%s', %d, %d, %d, '%s')", $view->name, $node->nid, 1, 0, '');
    }
    drupal_goto('schedule/edit');
 }
?>
<div class="schedule_add_events_wrapper">
<form id="schedule_add_events" method="post" class="schedule_add_events">
  <input type="hidden" name="user_token" value="<?php print drupal_get_token(); ?>" />
  <label>How many course events would you like to add? </label><select name="num_events">
    <option value=""></option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="15">15</option>
  </select>
  <input type="submit" name="Add Course Events" value="Add Course Events">
    <?php print l('<button id="schedule_edit">'. t('Edit Outline') .'</button>','schedule/outline',array('html' => true, 'attributes' => array('class' => 'schedule_automodal schedule_outline'))); ?>
<?php print l('<button id="schedule_delete">'. t('Delete Events') .'</button>','schedule/delete',array('html' => true, 'attributes' => array('class' => 'schedule_automodal schedule_delete'))); ?>
</form>
</div>
<?php
  foreach ($rows as $id => $row) {
    if (isset($nids[$id])) {
        if ($id != 0) {
          print '</div><div class="schedule_container"><div class="container_close"></div><div class="schedule_heading '. $classes[$id] .'">'. $row .'</div>';
        }
        else {
          print '<div class="schedule_container"><div class="container_close"></div><div class="schedule_heading '. $classes[$id] .'">'. $row .'</div>';
        }
    }
    else {
      print '<div class="schedule_row '. $classes[$id] .'">'. $row .'</div>';
    }
  }
?>
</div>