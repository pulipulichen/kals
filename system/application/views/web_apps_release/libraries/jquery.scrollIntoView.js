jQuery.fn.scrollIntoView = function() {
    
    //記錄開頭與結尾
    var _view_top = window.pageYOffset;
    var _view_left = window.pageXOffset;
    
    var el = this.get(0);
    
    $.test_msg('$.fn.scrollIntoView()', el.tagName);
    
    if (el.scrollIntoView) {
        el.scrollIntoView();
    }
    
    //$.scroll_to({x: _view_left, y: _view_top}, 0);
    window.scrollTo(_view_left, _view_top);
    
    //為了避免被toolbar遮掉
    var _top_padding = KALS_toolbar.get_ui().height() + window.pageYOffset;
    if ($(el).offset().top < _top_padding)
    {
        //$.test_msg('jQuery.fn.scrollIntoView()', _top_padding);
        window.scrollTo(_view_left, _top_padding);
    }
    
    return this;
};
/*
jQuery.fn.disable = function() {
    return this.each(function() {
        $(this).attr('disabled','disabled');
    });
};

jQuery.fn.enable = function() {
    return this.each(function() {
        $(this).removeAttr('disabled');
    });
};

jQuery.fn.astound_draggable = function() {
    return this.each(function() {
        $(this).draggable(
        {
            'stop': function(event,ui) {
                        ui.helper.attr('style','position: relative;');
                        //$('#floatingTagsDivInner').css('overflow','auto');
                    },
            'start': function(event,ui) {
                        study.currentDropTarget = '';
                        if (ui.helper.parents('#thelist').length == 1) {
                            // Is there a way to know if the dialog is already visible?
                            $('#floatingTagsDivOuter').jqmShow(); 
                        }
                        //$('#floatingTagsDivInner').css('overflow','hidden');
                    },
            'helper': 'clone',
            'zIndex': 3001
        });
    });
};

jQuery.fn.astound_droppable = function(dropFunction) {
    return this.each(function() {
        $(this).droppable(
        {
            accept: '.draggable',
            over: function(event,ui) { 
                study.currentDropTarget = this;
                $(this).css('background-color', 'pink'); 
            },
            drop: function(event,ui) { 
                if ((this == study.currentDropTarget) || (study.currentDropTarget == '')) {
                    dropFunction(event,ui,$(this)); 
                }
                $(this).css('background-color',''); 
            },
            out: function(event,ui) { 
                study.currentDropTarget = '';
                $(this).css('background-color',''); 
            }
        });
    });
};

$.astound_ajax = function(args) {
    if (study.social) {
        args.attempts = 0;
        study.ajaxQueue.push(args);
    } else {
        $.ajax(args);
    }
};

$.astound_ajax_get = function(url,data,callback,type) {
    var args = {};
    args.url = url;
    if (typeof(data) != 'undefined') { args.data = data; }
    if (typeof(callback) != 'undefined') { args.success = callback; }
    if (typeof(type) != 'undefined') { args.type = type; }
    return $.astound_ajax(args);
};

$.astound_ajax_getJSON = function(url,data,callback) {
    var args = {};
    args.url = url;
    if (typeof(data) != 'undefined') { args.data = data; }
    if (typeof(callback) != 'undefined') { args.success = callback; }
    args.dataType = 'json';
    return $.astound_ajax(args);
};

jQuery.fn.astound_ajax_load = function(url,data,callback) {
    var args = {};
    args.url = url;
    args.dataType = 'html';
    var that = this;
    if (typeof(data) != 'undefined') { args.data = data; }
    args.success = function(data) {
        that.html(data);
        if (typeof(callback) != 'undefined') {
            callback();
        }
    }
    return $.astound_ajax(args);
};
*/
/* In social.js, we used to wack $.ajax, $.get, $.getJSON, and jQuery.fn.load.  In a shared environment, this might not be a good thing.
 * For example, opensocial containers may be using these functions, so we may be breaking container's functionalities.  We've attempted
 * to fix the issue: in our code we call $.astound_ajax instead of $.ajax, and in $.astound_ajax we check to see if it is running in an
 * opensocial environment, do something, and if it is not in opensocial environment, call $.ajax.  However, this attempt failed because
 * jquery.ui tabs use these functions too.  In order to get jquery.ui tabs to work, we must modify its source.  We decide not to do that.
 * We put back the code that wack these functions.  A possible future alternative is to see if we can setup a callback the would let us
 * know when an ajax call is about to happen, check to see if the ajax call is in an opensocial environment, and is to our server, if so, 
 * queue it and use makeRequest.*/