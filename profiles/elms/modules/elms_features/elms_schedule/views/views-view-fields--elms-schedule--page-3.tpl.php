<?php
// $Id: views-view-fields.tpl.php,v 1.6 2008/09/24 22:48:21 merlinofchaos Exp $
/**
 * @file views-view-fields.tpl.php
 * Default simple view template to all the fields as a row.
 *
 * - $view: The view in use.
 * - $fields: an array of $field objects. Each one contains:
 *   - $field->content: The output of the field.
 *   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.
 *   - $field->class: The safe class id to use.
 *   - $field->handler: The Views field handler object controlling this field. Do not use
 *     var_export to dump this object, as it can't handle the recursion.
 *   - $field->inline: Whether or not the field should be inline.
 *   - $field->inline_html: either div or span based on the above flag.
 *   - $field->separator: an optional separator that may appear before a field.
 * - $row: The raw result object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 */
foreach ($fields as $id => $field) {
  switch ($id) {
    case 'field_color_value':
      $color = strtolower($field->content);
      if ($color != '#ffffff' && $color != '') {
        $style = 'style="background-color:'. $color .';"';
      }
    break;
    case 'field_event_name_value':
      $title = $field->content;
      $title = str_replace('<div','<div title="Click to edit Title"',$title);
    break;
    case 'field_task_link_url':
      $url = $field->content;
    break;
    case 'field_score_value_value':
      $points = $field->content;
      $points = str_replace('<div','<div title="Click to edit Score Value"', $points);
      if (strip_tags($field->content) != '') {
        $points.='</div><div class="schedule_points_format">'. _elms_schedule_score_format();
      }
    break;
    case 'nid_1':
      $nid = $field->content;
      $tmpnid = $field->content;
    break;
    case 'field_event_content_ref_nid_1':
      $ref_nid = $field->content;
    break;
    case 'field_due_time_value':
      $time = $field->content;
    break;
    case 'field_due_date_value':
      $date = $field->content;
      $date = str_replace('<div','<div title="Click to edit Start Date"',$date);
      if (strip_tags($field->content) != '') {
          //set just the date part minus html
          $tmpdate = strip_tags($field->content);
          //blow it up and get the date part we care about
          $pieces = explode(", ", $tmpdate);
          $pieces = explode('/',$pieces[1]);
          //convert from incorrect format to how we want it
          $tmpdate2 = date("D m/d",strtotime($pieces[2]."-".$pieces[0]."-".$pieces[1]));
          //replace the old date with the new date preserving html
          $date = str_replace($tmpdate, $tmpdate2, $date);
          if (strip_tags($time) != '') {
           $date.=' '. $time;
          }
      }
    break;
    case 'field_end_date_value':
      $date2 = $field->content;
      $date2 = str_replace('<div','<div title="Click to edit End Date"',$date2);
      if (strip_tags($date2) != '') {
        //set just the date part minus html
        $tmpdate = strip_tags($field->content);
        //blow it up and get the date part we care about
        $pieces = explode(", ", $tmpdate);
        //blow it up again
        $pieces = explode("/",$pieces[1]);
        //convert from incorrect format to how we want it
        $tmpdate2 = date("D m/d",strtotime($pieces[2]."-".$pieces[0]."-".$pieces[1]));
        //replace the old date with the new date preserving html      
        $date2 = str_replace($tmpdate, $tmpdate2, $date2);
        $date.= '<div class="schedule_spacer">-</div>' . $date2;
      }
    break;
    case 'field_detail_text_value':
      $details = $field->content;
      $details = str_replace('<div','<div title="Click to edit Details"',$details);
    break;
    case 'ops':
      $flag = $field->content;
    break;
    case 'field_event_type_value':
      $event_type = $field->content;
      //nothing's set so just display the field to change the icon
      if (strip_tags($event_type) == '') {
        $event_type = '<div title="Click to edit Type" class="schedule_edit_type">'. $event_type .'</div>';
        $event_type.= '<img width="24px" height="24px" class="schedule_event_type" src="'. base_path() . drupal_get_path('module','elms_schedule') .'/images/types/blank.png" alt="blank" title="blank"/>';
      }
      else {
        $event_icon = strip_tags(strtolower($event_type));
        $event_type = str_replace(strip_tags($event_type),'',$event_type);
        $event_type = '<div title="Click to edit Type" class="schedule_edit_type">'. $event_type .'</div>';
        $event_type.= '<img width="24px" height="24px" class="schedule_event_type" src="'. base_path() . drupal_get_path('module','elms_schedule') .'/images/types/'. $event_icon .'.png" alt="'. $event_icon .'" title="'. $event_icon .'"/>';
      }
    break;
    case 'edit_node':
      $edit = str_replace('>edit<',' title="edit course event" alt="edit course event" class="schedule_automodal"><div class="schedule_edit_event"></div><',$field->content);
    break;
    case 'field_color_value_1':
      $color_widget = '<div class="schedule_edit_color"><img width="16px" height="16px" alt="Click to edit Background Color" title="Click to edit Background Color" src="'. base_path() . drupal_get_path('module','colorpicker') .'/css/picker_button.png" />'. $field->content .'</div>';
    break;
  }
}
$depth = -1;
//calculate depth
while ($tmpnid != 0) {
    $last_nid = $tmpnid;
    $tmpnid = db_result(db_query("SELECT value FROM {draggableviews_structure} WHERE delta=1 AND view_name='elms_schedule' AND nid=%d", $last_nid));
    $depth++;
}
//make it a link if we have to
if (strip_tags($ref_nid) != '') {
  $title = '<span class="event_link">'. $title .'</span>';
  //$title = l($title,'node/'. $ref_nid,array('html' => true,'attributes'=>array('alt'=>$title,'title'=>$title)));
}
//ref node takes priority over an external link
elseif (strip_tags($url) != '') {
  $title = '<span class="event_link">'. $title .'</span>';
  //$title = l($title,$url,array('html' => true, 'attributes'=>array('alt'=>$title,'title'=>$title)));
}
?>
<?php if (isset($points)): ?>
  <div class="schedule_points"><?php print $points; ?></div>
<?php endif; ?>
<div class="schedule_task_wrapper">
<?php 
  if (isset($edit)) {
    print $edit;
  }
  //this needs to store both possible link values, the url link in one and the node reference field in another
  //after click, display the clicktoedit for the one that's "selected", auto select the value which has been set but leave the ability to switch from one to the other
  //also need to unset the current link method and just make the interface appear to be linked (we'll actually link in a different theme file so that it's a cleaner render for the average user)
  /*print '<div title="Click to edit Link" alt="Click to edit Link" class="schedule_edit_link">'
  . str_replace(strip_tags($ref_nid),'',$ref_nid)
  . str_replace(strip_tags($url),'',$url)
  .'</div>';*/
  //only display widget on the top level items, can still be changed on others but no need for a shortcut
  if (isset($color_widget) && $depth == 0) {
    print $color_widget;
  }
  //if depth is 0 and this has a to date value
  if($depth == 0 && strip_tags($date2) == '') {
    $date.= '<div class="schedule_spacer">&nbsp;</div>'. $date2;
  }
  print $event_type;
?>
  <div class="schedule_task event_type_<?php print $event_icon;?> schedule_depth_<?php print $depth;?> schedule_check_<?php print $nid; ?>_row" <?php print $style; ?>>
    <div class="schedule_checkbox_wrapper">
      <div class="schedule_flag"><?php print $flag; ?></div>
      <input class="schedule_checkbox" type="checkbox" id="schedule_check_<?php print $nid; ?>"/>
    </div>
    <div class="schedule_content_wrapper">
    <h<?php print ($depth+2); ?> class="schedule_title"><?php print $title; ?>
    <?php print '</h'. ($depth+2) .'>'; ?>
    <?php if (isset($details)): ?>
    <div class="schedule_details"><?php print $details; ?></div>
    <?php endif; ?>
    </div>
    <?php if (isset($date)): ?>
      <div class="schedule_due_date"><?php print str_replace(',', '', $date); ?></div>
      <?php endif; ?>
  </div>
</div>