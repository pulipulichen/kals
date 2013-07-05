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
 ?>
<div class="media-stream-row" id="media-element-<?php print $row->nid; ?>">
<div class="media-stream-row-inner">
<div class="media-stream-container">
  <div class="media-stream-media">
  <?php
  // check for video or image
  if (isset($fields['field_video_url_embed'])) {
    print $fields['field_video_url_embed']->content;
  }
  else {
    print $fields['field_exhibit_uimage_fid_1']->content;
  }
  ?>
  <div class="add-comment-box-arrow"></div>
  <div class="add-comment-box"><div class="Acomment"><?php print t('ADD A COMMENT'); ?></div><div class="comment-add-image"></div></div>
  <?php if ($row->node_comment_statistics_comment_count != 0) { ?>
  <div class="show-comment-box"><div class="Scomment"><?php print t('SHOW COMMENTS'); ?> (<?php print $row->node_comment_statistics_comment_count; ?>)</div><div class="Hcomment"><?php print t('HIDE COMMENTS'); ?> (<?php print $row->node_comment_statistics_comment_count; ?>)</div><div class="comment-show-image"></div></div>
  <?php } ?>
  </div>
  <div class="media-stream-content">
    <div class="media-stream-content-title"><?php print $fields['title']->content; ?></div>
    <div class="media-stream-content-body"><?php print $fields['body']->content; ?></div>
  </div>
</div>


    
<div class="media-comments"><div class="media-comments-inner">
  <?php 
  $comment_render = comment_render(node_load(array('nid'=>$row->nid)));
  print str_replace('comment/reply/'. $row->nid,'comment/reply/'. $row->nid . '&destination=node/'. arg(1),$comment_render);
  ?>
</div>
</div>
</div>
</div>