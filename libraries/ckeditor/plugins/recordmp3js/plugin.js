/**
 * 
 * @version 20140903 Pulipuli Chen
 */
﻿(function(){
    var recordmp3jsCmd = {
        exec:function (editor) {
            editor.openDialog('recordmp3js');
            return
        }
    };
    
    CKEDITOR.plugins.add('recordmp3js'
        , {
            lang:['en','zh'],
            requires:['dialog'],
            init:function(editor){
                var commandName='recordmp3js';
                //alert(typeof(editor.config.recordmp3js));
                //console.log(editor);
                editor.addCommand(commandName,recordmp3jsCmd);
                editor.ui.addButton('recordmp3js',{
                    label:editor.lang.youtube.button,
                    command:commandName,
                    icon:this.path+"images/mic.png"
                });
                CKEDITOR.dialog.add(commandName
                    ,CKEDITOR.getUrl(this.path+'dialogs/recordmp3js.js'));
                
                // 以下插入預設的內容
                
            }
    })
})();