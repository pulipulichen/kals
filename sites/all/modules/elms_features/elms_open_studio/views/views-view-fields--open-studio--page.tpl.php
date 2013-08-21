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
 
// try to grab the first photo that's referenced to this node
$query = "
  SELECT n.nid
  FROM {node} n
  JOIN {content_field_exhibit_reference} ctei ON n.vid = ctei.vid
  LEFT JOIN {draggableviews_structure} ds ON n.nid = ds.nid
  WHERE ctei.field_exhibit_reference_nid = %s
  ORDER BY ds.value ASC";
// get the nid on top for display
$result = db_query($query,$row->nid);
$img = db_fetch_array($result);
$img = node_load($img['nid']);
// start counting comments by iterating
$tmpnode = node_load($row->nid);
$comment_count = $tmpnode->comment_count;
$query = "
  SELECT n.nid
  FROM {node} n 
  JOIN {content_field_exhibit_reference} cfer ON n.vid = cfer.vid
  WHERE n.type='exhibit_image' 
  AND cfer.field_exhibit_reference_nid = %s";
$result = db_query($query,$row->nid);
$count = 0;

while ($temp = db_fetch_array($result)) {
  $tmpnode = node_load($temp['nid']);
  $comment_count+= $tmpnode->comment_count;
  $count++;
}
  if ($img->created % 3) {
    $thumb = 'overview_thumb_gray';
  }
  else {
    $thumb = 'overview_thumb';
  }
  if (isset($img->nid)) {
    if ($img->type == 'exhibit_image') {
      print l('<img src="'. base_path() . str_replace('/files/','/files/imagecache/'. $thumb .'/',$img->field_exhibit_uimage[0]['filepath']) .'" />','node/'. $row->nid,array('html' => TRUE));
    }
    else {
      $src = NULL;
      // account for youtube or vimeo based on data
      if (isset($img->field_video_url[0]['data']['thumbnail']['url'])) {
        $src = $img->field_video_url[0]['data']['thumbnail']['url'];
      }
      else {
        $src = $img->field_video_url[0]['data']['THUMBNAIL_URL']['0'];
      }
      // null case if it had no screenshot
      if (is_null($src)) {
        // TODO: add a generic screenshot image
      }
      print l('<img src="'. $src .'" width="125px" height="125px" />','node/'. $row->nid, array('html' => TRUE));
    }
  }
  else {
    print l('','node/'. $row->nid);
  }
?>
<?php foreach ($fields as $id => $field): ?>
  <?php if (!empty($field->separator)): ?>
    <?php print $field->separator; ?>
  <?php endif; ?>

  <<?php print $field->inline_html;?> class="views-field-<?php print $field->class; ?>">
    <?php if ($field->label): ?>
      <label class="views-label-<?php print $field->class; ?>">
        <?php print $field->label; ?>:
      </label>
    <?php endif; ?>
      <<?php print $field->element_type; ?> class="field-content"><?php print $field->content; ?></<?php print $field->element_type; ?>>
  </<?php print $field->inline_html;?>>
<?php endforeach; ?>
<?php 
  print '<div class="field-content counter-stat">'. format_plural($comment_count, '1 comment', '@count comments') .'</div>';
  if ($count) {
    print '<div class="field-content thumb-image">'. format_plural($count, '1 media piece', '@count media pieces') .'</div>';
  }
?>
