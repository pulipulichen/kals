<?php
// $Id: views-view-unformatted.tpl.php,v 1.6 2008/10/01 20:52:11 merlinofchaos Exp $
/**
 * @file views-view-unformatted.tpl.php
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
 ?>
<div id="progressbar_wrapper"><div id="progressbar_container"><div id="progressbar"><div class="percent_complete"></div></div></div></div>
 <?php
  print theme('advanced_help_topic', 'elms_schedule', 'about-elms-schedule');
 //use this to figure out the child depth for styling purposes, this has the NIDs of each row
 //create a map between the row $id and the $nid
 //then only store the values where a collapse is needed and style appropriately
  foreach($variables['view']->result as $key => $ary) {
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
  //use these heading dates to calculate based on today, where someone should be in the course.
  foreach ($nids as $nid) {
    $node = node_load($nid);
    if (isset($node->field_due_date[0]['value'])) {
      $sdate = strtotime($node->field_due_date[0]['value']);
    }
    //if this doesn't have a date then ignore it
    if (isset($sdate)) {
      $container_dates[] = array($nid, intval(date('z', $sdate)));
    }
    //unset so we can start the loop over
    unset($sdate);
  }
  //calculate if the current day falls between any days
  if (isset($container_dates)) {
    $current_day = intval(date('z',time()));
    foreach ($container_dates as $record) {
      if(!isset($jump_to_current)) {
        if ($current_day == $record[1]) {
          $jump_to_current = '<div><a href="#event_'. $record[0] .'">Jump to this week'."'".'s content</a></div>';
        }
        elseif (isset($prev_record) && $prev_record[1] < $current_day && $record[1] > $current_day) {
          $jump_to_current = '<div><a href="#event_'. $prev_record[0] .'">Jump to this week'."'".'s content</a></div>';
        }
        $prev_record = $record;
      }
    }
  }
  print $jump_to_current;
  foreach ($rows as $id => $row) {
    if (isset($nids[$id])) {
        if ($id != 0) {
          print '</div><a name="event_'. $nids[$id] .'"></a><div class="schedule_container"><div class="container_close"></div><div class="schedule_heading '. $classes[$id] .'">'. $row .'</div>';
        }
        else {
          print '<a name="event_'. $nids[$id] .'"></a><div class="schedule_container"><div class="container_close"></div><div class="schedule_heading '. $classes[$id] .'">'. $row .'</div>';
        }
    }
    else {
      print '<div class="schedule_row '. $classes[$id] .'">'. $row .'</div>';
    }
  }
?>
</div>