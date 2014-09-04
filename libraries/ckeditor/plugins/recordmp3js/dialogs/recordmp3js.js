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
            var _link = this.getValueOf('recordmp3js', 'audio_link');
            //<audio controls="" src=""></audio>
            _link = '<audio controls="" src="' + _link + '"></audio>';
            editor.insertHtml(_link);
        },
        contents: [{
            label:editor.lang.common.generalTab,
            id:'recordmp3js',
            elements:[
                {
                    type: 'html',
                    id: 'recorder',
                    html: '<button onclick="startRecording(this);">' + editor.lang.record + '</button>'
                },
//                {
//                    type:'html',
//                    id:'content',
//                    style:'width:340px;height:90px',html:'<input size="25" style="'+'border:1px solid black;'+'background:white;width: 100%;">',
//                    focus:function(){
//                        this.getElement().focus()
//                    }
//                },
                {
                    type: 'text',
                    label: editor.lang.audio_link,
                    required: true,
                    id: 'audio_link',
                    default: "http://pc-pudding-2013.dlll.nccu.edu.tw/php-file-host/get/y/audio_recording_1409735858691.mp3"
                }
            ]
        }
    ]
}
})})();