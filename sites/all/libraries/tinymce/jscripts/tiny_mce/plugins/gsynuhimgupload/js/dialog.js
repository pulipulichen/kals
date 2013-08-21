tinyMCEPopup.requireLangPack();

var GsImUpDialog = {
	init : function(e) {

	},
	insert : function(url,thumburl) {
		tinyMCEPopup.editor.execCommand('mceInsertContent', false, '<a target="_blank" href="'+ url +'"><img src="'+ thumburl +'" /></a>');
		tinyMCEPopup.close();
	}
};

tinyMCEPopup.onInit.add(GsImUpDialog.init,GsImUpDialog);
