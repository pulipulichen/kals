/**
 * Title:CKEditor在线编辑器的代码插入插件
 * Author:铁木箱子(http://www.mzone.cc)
 * Date:2010-07-21
 */
CKEDITOR.dialog.add('hellworld', function(editor) {
    //var _escape = function(value){
    //    return value;
    //};
    return {
        title: editor.lang.dlgTitle,
        resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
        minWidth: 360,
        minHeight: 150,
        contents: [{
            id: 'cb1',
            //name: 'cb',
            label: 'cb2',
            //title: 'cb',
            elements: [{
                    type: 'textarea',
                    required: true,
                    label: editor.lang.mytxt,
                    style: 'width:350px;height:100px',
                    rows: 6,
                    id: 'mytxt',
                    'default': 'Hello World'
            }]
        }],
        onOk: function(){
            var mytxt = this.getValueOf('cb', 'mytxt');
            editor.insertHtml(mytxt);
        }
    };
});