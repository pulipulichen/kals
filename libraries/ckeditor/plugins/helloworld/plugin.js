/**
 * Title:CKEditor插件示范
 * Author:铁木箱子(http://www.mzone.cc)
 * Date:2010-08-02
 */
﻿(function(){
    var helloworldCmd = {
        exec:function (editor) {
            editor.openDialog('helloworld');
            return
        }
    };
    
    CKEDITOR.plugins.add('helloworld'
        , {
            lang:['en','zh-cn'],
            requires:['dialog'],
            init:function(editor){
                var commandName='helloworld';
                editor.addCommand(commandName,helloworldCmd);
                editor.ui.addButton('helloworld',{
                    label:editor.lang.youtube.button,
                    command:commandName,
                    icon:this.path+"images/mic.png"
                });
                CKEDITOR.dialog.add(commandName
                    ,CKEDITOR.getUrl(this.path+'dialogs/helloworld.js'))
            }
    })
})();