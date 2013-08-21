/**
 * @file
 * Launch JSQRID TABLE.
 */
var export_path = new Array();

Drupal.behaviors.jqgrid = {
  attach: function (context) {
    jQuery.each(Drupal.settings.jqgrid, function (selector) {
      return_value = "";
      jQuery(selector).jqGrid({
        url:Drupal.settings.basePath + 'jqgrid/json/' + this.name + '/' + this.current_display + '/' + this.arguments,
        // Virtual scroll.
        scroll:this.scroll,
        // Column reordering.
        sortable:this.sortable,
        datatype: "json",
        colNames:this.colNames,
        // Load once.
        loadonce: this.loadonce,
        cellEdit:this.cellEdit,
        cellurl:'jqgrid/callback/update',
        afterEditCell: function (id,name,val,iRow,iCol){
          column = jQuery(selector).jqGrid('getGridParam', 'colModel');
          if('date_picker' == column[iCol].editplugin) {
            jQuery("#" + iRow + "_" + name,selector).datepicker({
            dateFormat:"yy-mm-dd",
              onSelect: function(dateText, inst) { jQuery(selector).saveCell(iRow,iCol);  }
            });
          }
        },
        afterSubmitCell: function(response, rowid, cellname, value, iRow, iCol) {
          var responseJSON = JSON.parse(response.responseText);
          return_value = responseJSON.value;
          if (responseJSON.status == true) {
            return [true, ''];
          } else {
            return [false, ''];
          }
        },
        gridComplete: function () {
          columns = jQuery(selector).jqGrid('getGridParam', 'colModel');
          columns.forEach(calculateTotal);
        },
        afterSaveCell : function(rowid,name,val,iRow,iCol) {
          if (return_value != '') jQuery(selector).jqGrid('setCell',rowid,name, return_value, {color:'green', weightfont:'bold'});
          return_value = "";
        },
        colModel:this.colModel,
        pager: '#pager-list',
        viewrecords: true,
        rowNum:this.rowNum,
        shrinkToFit:false,
        autowidth: true,
        height: this.height,
        width: this.width,
        sortname: this.sortname,
        sortorder: this.sortorder,
        footerrow: this.footerrow,
        userDataOnFooter:false,
        caption:this.human_name
      });
      // TODO add frozen when mature enough
      //jQuery(selector).jqGrid('setFrozenColumns');
      jQuery(selector).jqGrid('navGrid','#pager-list',{add:false,edit:false,del:false,search:false,refresh:true});
      if (this.filterToolbar) {
        jQuery(selector).jqGrid('filterToolbar',{stringResult: true,searchOnEnter : false});
      }

      jQuery(selector).jqGrid('navButtonAdd','#pager-list', {
        caption: "Columns",
        title: "Reorder Columns",
        onClickButton : function (perm){
          jQuery(selector).jqGrid('columnChooser');
        }
      });

      if (this.export_enable) {
        // TODO improve.
        for (var i = 0; i < this.export_path.length; i++) {
          export_path[i] = this.export_path[i];
          jQuery(selector).jqGrid('navButtonAdd','#pager-list',{
            caption: "Excel",
            title: "Excel",
            id: "export_" + i,
            onClickButton : function () {
              // Build arguments (nid selected).
              // TODO load every row before export.
              config = jQuery(selector).jqGrid('getGridParam');
              if (config.reccount == config.records) {
                ids = jQuery(selector).jqGrid('getDataIDs');
                ids = ids.join("+");
                window.open (export_path[0] + '/' + ids, "myexcel");
              }
              else {
                window.open (export_path[0], "myexcel");
              }
            }
          });
        }
      }
      function calculateTotal(element, index, array) {
        if (element.footerdata != '') {
          amount = jQuery(selector).jqGrid('getCol',element.name,false,element.footerdata);
          // TODO BUG IN JQGRID ?
          if (element.footerdata == 'count') {
            amount = amount - 1;
          }
          var sumarray = new Array();
          sumarray[ element.name ] = amount;
          jQuery(selector).jqGrid('footerData','set',sumarray);
        }
      }
    });
  }
};
