 QUNIT_TITLE = 'QUnit example';

 $(document).ready(function(){
     var title = QUNIT_TITLE;

    if ($('#qunit-header').length == 0)
    {
        var qunit_area = $('<div></div>')
            .addClass('qunit-area')
            .prependTo($('body'));

        qunit_area.append($('<h1 id="qunit-header">'+title+'</h1>'))
            .append($('<h2 id="qunit-banner"></h2>'))
            .append($('<h2 id="qunit-userAgent"></h2>'))
            .append($('<ol id="qunit-tests"></ol>'));
    }

    
 });

function toggleDetails(thisObj)
{
    thisObj = $(thisObj);
    var detailTable = thisObj.nextAll('table:first');
    if (detailTable.length == 1)
        detailTable.toggle();
}