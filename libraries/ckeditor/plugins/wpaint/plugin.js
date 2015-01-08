(function() {
    var wpaintCmd = {exec: function(editor) {
            editor.openDialog('wpaint');
            return
        }};
    CKEDITOR.plugins.add('wpaint', {lang: ['en', 'zh'], requires: ['dialog'], init: function(editor) {
            var commandName = 'wpaint';
            editor.addCommand(commandName, wpaintCmd);
            editor.ui.addButton('wpaint', {label: editor.lang.youtube.button, command: commandName, icon: this.path + "images/wpaint.png"});
            CKEDITOR.dialog.add(commandName, CKEDITOR.getUrl(this.path + 'dialogs/wpaint.js'))
        }})
})();
