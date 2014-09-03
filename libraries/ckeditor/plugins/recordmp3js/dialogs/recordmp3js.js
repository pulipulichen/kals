(function(){
CKEDITOR.dialog.add('recordmp3js',function(editor){
    return {
        title:editor.lang.dlgTitle,
        resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
        minWidth:360,
        minHeight:150,
        //onShow:function(){
        //    this.getContentElement('general','content').getInputElement().setValue('')
        //},
        onOk:function(){
//            var youtube_url = this.getContentElement('general','content').getInputElement().getValue(); 
//            if (youtube_url.indexOf('v=') > -1) {
//                youtube_url = youtube_url.substr(youtube_url.indexOf('v=') + 2, youtube_url.length);
//            }
//            if (youtube_url.indexOf('&') > -1) {
//                youtube_url = youtube_url.substr(0, youtube_url.indexOf('&'));
//            }
//            if (youtube_url.indexOf('#') > -1) {
//                youtube_url = youtube_url.substr(0, youtube_url.indexOf('#'));
//            }
//            var text='<object width="300" height="250">'
//                + '<param name="movie" value="http://www.youtube.com/v/'+youtube_url+'?fs=1&amp;hl=zh_TW"></param>'+
//                + '<param name="allowFullScreen" value="true"></param>' 
//                + '<param name="allowscriptaccess" value="always"></param>' 
//                + '<embed src="http://www.youtube.com/v/'+youtube_url+'?fs=1&amp;hl=zh_TW" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="300" height="250"></embed>'
//                + '</object>';
//            this.getParentEditor().insertHtml(text)
            
            var mytxt = this.getValueOf('recordmp3js', 'mytxt');
            editor.insertHtml(mytxt);
        },
        contents: [{
            label:editor.lang.common.generalTab,
            id:'recordmp3js',
            elements:[
//                {
//                    type:'html',
//                    id:'pasteMsg',
//                    html:'<div style="white-space:normal;width:300px;">' 
//                        + '<img style="margin:5px auto;" src="'+CKEDITOR.getUrl(CKEDITOR.plugins.getPath('youtube')+'images/youtube_large.png') + '">' 
//                        + '<br />'
//                        + editor.lang.youtube.pasteMsg 
//                        + '</div>'
//                },
//                {
//                    type:'html',
//                    id:'content',
//                    style:'width:340px;height:90px',html:'<input size="25" style="'+'border:1px solid black;'+'background:white;width: 100%;">',
//                    focus:function(){
//                        this.getElement().focus()
//                    }
//                },
                {
                    type: 'textarea',
                    required: true,
                    label: editor.lang.mytxt,
                    style: 'width:350px;height:100px',
                    rows: 6,
                    id: 'mytxt',
                    'default': '錄音啦'
                }
            ]
        }
    ]
}
})})();