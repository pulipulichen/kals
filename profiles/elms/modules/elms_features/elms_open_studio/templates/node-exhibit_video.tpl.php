<?php // $Id: node.tpl.php,v 1.1 2010/03/10 16:06:51 btopro Exp $
/**
 * @file
 *  node.tpl.php
 *
 * Theme implementation to display a node.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 */
  if (arg(2) == '') {
  drupal_goto('node/'. $node->field_exhibit_reference[0]['nid']);
  }
?>
<div id="node-<?php print $node->nid; ?>" class="node <?php print $node_classes; ?>">
  <div class="node-inner-0"><div class="node-inner-1">
    <div class="node-inner-2"><div class="node-inner-3">

      <?php if ($page == 0): ?>
        <h2 class="title"><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
      <?php endif; ?>

      <?php if ($unpublished): ?>
        <div class="unpublished"><?php print t('Unpublished'); ?></div>
      <?php endif; ?>

      <?php if (!empty($submitted)): ?>
        <div class="submitted"><?php print $submitted; ?></div>
      <?php endif; ?>

      <div class="content clearfix">
        <?php print $content; ?>
      </div>

      <?php if ($links): ?>
        <div class="actions clearfix"><?php print $links; ?></div>
      <?php endif; ?>

    </div></div>
  </div></div>
</div> <!-- /node -->