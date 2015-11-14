/*
 (function(){CKEDITOR.dialog.add('youtube',function(editor){return{title:editor.lang.youtube.title,minWidth:CKEDITOR.env.ie&&CKEDITOR.env.quirks?368:350,minHeight:240,onShow:function(){this.getContentElement('general','content').getInputElement().setValue('')},onOk:function(){var text='<iframe title="YouTube video player" class="youtube-player" type="text/html" width="480" height="390" src="http://www.youtube.com/embed/'+this.getContentElement('general','content').getInputElement().getValue()+'?rel=0" frameborder="0"></iframe>';this.getParentEditor().insertHtml(text)},contents:[{label:editor.lang.common.generalTab,id:'general',elements:[{type:'html',id:'pasteMsg',html:'<div style="white-space:normal;width:500px;"><img style="margin:5px auto;" src="'+CKEDITOR.getUrl(CKEDITOR.plugins.getPath('youtube')+'images/youtube_large.png')+'"><br />'+editor.lang.youtube.pasteMsg+'</div>'},{type:'html',id:'content',style:'width:340px;height:90px',html:'<input size="25" style="'+'border:1px solid black;'+'background:white">',focus:function(){this.getElement().focus()}}]}]}})})();
 */

        (function() {
            console.log(CKEDITOR.dialog.okButton)
            CKEDITOR.dialog.add('wpaint', function(editor) {
                return{title: editor.lang.youtube.title
                    , minWidth: CKEDITOR.env.ie && CKEDITOR.env.quirks ? 368 : 350
                    , minHeight: 240,
                    buttons: [
                        //CKEDITOR.dialog.okButton,
                        {
                           id: 'unique name',
                           type: 'button',
                           label: editor.lang.common.ok,
                           title: 'Button description',
                           class:'cke_dialog_ui_button_ok',
                           accessKey: 'C',
                           disabled: false,
                           onClick: function()
                              {
                                 // code on click
                                 alert("Custom button clicked!");
                              }
                        },
                        CKEDITOR.dialog.cancelButton,

                        
                     ]
                    , onShow: function() {
                        this.getContentElement('general', 'content').getInputElement().setValue('')
                    }, onOk: function() {
                        setTimeout(function () {
                            console.log($(CKEDITOR.dialog.getCurrent()).find(".cke_dialog_ui_button_ok").length);
                            CKEDITOR.dialog.getCurrent().hide()
                        }, 3000);
                        return false;
                        var youtube_url = this.getContentElement('general', 'content').getInputElement().getValue();
                        if (youtube_url.indexOf('v=') > -1)
                            youtube_url = youtube_url.substr(youtube_url.indexOf('v=') + 2, youtube_url.length);
                        if (youtube_url.indexOf('&') > -1)
                            youtube_url = youtube_url.substr(0, youtube_url.indexOf('&'));
                        if (youtube_url.indexOf('#') > -1)
                            youtube_url = youtube_url.substr(0, youtube_url.indexOf('#'));
                        var text = '<object width="300" height="250"><param name="movie" value="http://www.youtube.com/v/' + youtube_url + '?fs=1&amp;hl=zh_TW"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + youtube_url + '?fs=1&amp;hl=zh_TW" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="300" height="250"></embed></object>';
                        this.getParentEditor().insertHtml(text)
                    }, contents: [{
                            label: editor.lang.common.generalTab, 
                            id: 'general', 
                            elements: [{
                                    type: 'html', 
                                    id: 'pasteMsg', 
                                    html: '<div style="white-space:normal;width:300px;"><img style="margin:5px auto;" src="' + CKEDITOR.getUrl(CKEDITOR.plugins.getPath('youtube') + 'images/youtube_large.png') + '"><br />' + editor.lang.youtube.pasteMsg + '</div>'}, {type: 'html', id: 'content', style: 'width:340px;height:90px', html: '<input size="25" style="' + 'border:1px solid black;' + 'background:white;width: 100%;">', focus: function() {
                                        this.getElement().focus()
                                    }}]}]}
            })
        })();