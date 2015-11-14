/**
 * @author flipbit.co.uk 2015
 * GitHub: https://github.com/flipbit/jquery-image-annotate
 * Demo: http://flipbit.co.uk/jquery-image-annotation.html
 */
/// <reference path="jquery-1.2.6-vsdoc.js" />
/*global KALS_CONFIG:false */ /*global KALS_context:false */ /*global KALS_util:false */ /*global KALS_text:false */ /*global KALS_toolbar:false */ /*global KALS_window:false */
(function($) {

    $.fn.annotateImage = function(options) {
        ///	<summary>
        ///		Creates annotations on the given image.
        ///     Images are loaded from the "getUrl" propety passed into the options.
        ///	</summary>
        
        if (this.length > 1) {
            for (var _i = 0; _i < this.length; _i++) {
                $(this[_i]).annotateImage(options);
            }
            return this;
        }
        
        var opts = $.extend({}, $.fn.annotateImage.defaults, options);
        var image = this;

        this.image = this;
        this.mode = 'view';

        // Assign defaults
        this.getUrl = opts.getUrl;
        this.scope = opts.scope;
        this.saveUrl = opts.saveUrl;
        this.editUrl = opts.editUrl;
        this.deleteUrl = opts.deleteUrl;
        this.editable = opts.editable;
        this.useAjax = opts.useAjax;
        this.notes = opts.notes;
        
        /**
         * @author Pudding 20151104
         */
        this.types = opts.types;
        this.user = opts.user;
        
        if (typeof(opts.lang) !== "object") {
            this.lang = opts.lang;
        }

        // Add the canvas
        this.canvas = $('<div class="KALS image-annotate-canvas"><div class="image-annotate-view"></div><div class="image-annotate-edit"><div class="image-annotate-edit-area"></div></div></div>');
        this.canvas.children('.image-annotate-edit').hide();
        this.canvas.children('.image-annotate-view').hide();
        this.image.after(this.canvas);
        
        // 設定KALS權限
        var _not_login_classname = "not-login";
        this.canvas.addClass(_not_login_classname);
        var _canvas = this.canvas;
        KALS_context.auth.add_instant_listener(function (_auth) {
            if (_auth.is_login()) {
                _canvas.removeClass(_not_login_classname);
            }
            else {
                _canvas.addClass(_not_login_classname);
            }
        });

        // Give the canvas and the container their size and background
        this.canvas.height(this.height());
        this.canvas.width(this.width());
        this.canvas.css('background-image', 'url("' + this.attr('src') + '")');
        this.canvas.children('.image-annotate-view, .image-annotate-edit').height(this.height());
        this.canvas.children('.image-annotate-view, .image-annotate-edit').width(this.width());

        // Add the behavior: hide/show the notes when hovering the picture
        //this.canvas.parent().hover(function() {
        this.canvas.hover(function() {
            if ($(this).find('.image-annotate-edit').css('display') === 'none') {
                $(this).find('.image-annotate-view').show();
            }
            $(this).find(".image-annotate-add-container:first").show();
            //console.log("開了");
        }, function() {
            //console.log("關了");
            $(this).find('.image-annotate-view').hide();
            $(this).find(".image-annotate-add-container:first").hide();
        });
        

//        this.canvas.children('.image-annotate-view').hover(function() {
//            $(this).show();
//        }, function() {
//            $(this).hide();
//        });

        // load the notes
        if (this.useAjax) {
            $.fn.annotateImage.ajaxLoad(this);
        } else {
            $.fn.annotateImage.load(this);
        }

        // Add the "Add a note" button
        if (this.editable) {
            this.button = $('<span class="image-annotate-add-container">'
                + '<a class="image-annotate-add ui brown mini button" href="#">' 
                    + $.fn.annotateImage.lang.addNote 
                + '</a>'
                + '</span>');
            this.button.click(function() {
                $.fn.annotateImage.add(image);
            });
            this.button.hide();
            this.canvas.append(this.button);
            
            /**
             * @author Pudding 20151104
             * 拖曳加上標註範圍
             */
//            var _mouse_down_lock = false;
//            this.canvas.mousedown(function (_event) {
//                _mouse_down_lock = true;
//            });
//            
//            this.canvas.mouseup(function () {
//                _mouse_down_lock = false;
//                _mouse_move_lock = false;
//            });
//            
            var _convert_client_to_offset = function (_event, _canvas) {
                var _canvas_offset = $(_canvas).offset();
                var _current_position = $.get_current_scroll_position();
                var _offset = {
                    "top": _current_position.scrollTop + _event.clientY - _canvas_offset.top,
                    "left": _current_position.scrollLeft + _event.clientX - _canvas_offset.left,
                    "event": true
                };
                //$.test_msg(_event.clientY, _offset);
                return _offset;
            };
//            
//            
//            var _mouse_move_lock = false;
//            this.canvas.mousemove(function (_event) {
//                if (_mouse_down_lock === true 
//                        && _mouse_move_lock === false) {
//                    _mouse_move_lock = true;
//                    
//                    var _offset = _convert_client_to_offset(_event, this);
//                    $.fn.annotateImage.add(image, _offset);
//                }
//            });
            
            this.canvas.dblclick(function (_event) {
                var _offset = _convert_client_to_offset(_event, this);
                $.fn.annotateImage.add(image, _offset);
            });
            
        }

        // Hide the original
        this.hide();
        
        return this;
    };

    /**
    * Plugin Defaults
    **/
    $.fn.annotateImage.defaults = {
        getUrl: 'your-get.rails',
        saveUrl: 'your-save.rails',
        deleteUrl: 'your-delete.rails',
        editable: true,
        useAjax: true,
        notes: new Array(),
        types: ["重要"],
        user: "test"
    };
    
    /**
    * Plugin Defaults
    **/
    $.fn.annotateImage.lang = {
        addNote: '<i class="add circle icon"></i>Add Note',
        ok: '<i class="check circle icon"></i>Save',
        delete: '<i class="minus circle icon"></i>Delete',
        cancel: '<i class="remove circle icon"></i>Cancel'
    };

    $.fn.annotateImage.clear = function(image) {
        ///	<summary>
        ///		Clears all existing annotations from the image.
        ///	</summary>    
        for (var i = 0; i < image.notes.length; i++) {
            image.notes[image.notes[i]].destroy();
        }
        image.notes = new Array();
    };

    $.fn.annotateImage.ajaxLoad = function(image) {
        ///	<summary>
        ///		Loads the annotations from the "getUrl" property passed in on the
        ///     options object.
        ///	</summary>
        //var _url = image.getUrl + '?ticks=' + $.fn.annotateImage.getTicks();
        
//        var _url = image.getUrl + '?ticks=' + $.fn.annotateImage.getTicks();
//        $.getJSON(_url, function(data) {
//            image.notes = data;
//            $.fn.annotateImage.load(image);
//        });
        
        KALS_util.ajax_get({
            "url": image.getUrl,
            "data": image.scope,
            "callback": function (_data) {
                image.notes = _data;
                $.fn.annotateImage.load(image);
            }
        });
        
    };

    $.fn.annotateImage.load = function(image) {
        ///	<summary>
        ///		Loads the annotations from the notes property passed in on the
        ///     options object.
        ///	</summary>
        for (var i = 0; i < image.notes.length; i++) {
            image.notes[image.notes[i]] = new $.fn.annotateView(image, image.notes[i]);
        }
    };

    $.fn.annotateImage.getTicks = function() {
        ///	<summary>
        ///		Gets a count og the ticks for the current date.
        ///     This is used to ensure that URLs are always unique and not cached by the browser.
        ///	</summary>        
        var now = new Date();
        return now.getTime();
    };

    $.fn.annotateImage.add = function(image, offset) {
        ///	<summary>
        ///		Adds a note to the image.
        ///	</summary>        
        $.lock_scoll();
        
        if (image.mode === 'view') {
            image.mode = 'edit';

            // Create/prepare the editable note elements
            var editable = new $.fn.annotateEdit(image, offset);

            $.fn.annotateImage.clearButton(editable);
            $.fn.annotateImage.createSaveButton(editable, image);
            //$.fn.annotateImage.createDeleteButton(editable, image);
            $.fn.annotateImage.createCancelButton(editable, image);
        }
        
        setTimeout(function () {
            $.unlock_scoll();
        }, 500);
    };

    $.fn.annotateImage.createSaveButton = function(editable, image, note) {
        ///	<summary>
        ///		Creates a Save button on the editable note.
        ///	</summary>
        
        if (editable.form.find(".controller .menu .image-annotate-edit-ok").length > 0) {
            //$.test_msg("createSaveButton");
            return this;
        }
        
        var ok = $('<a class="image-annotate-edit-ok item">' + $.fn.annotateImage.lang.ok + '</a>');

        ok.click(function() {
            var form = image.canvas.find('.image-annotate-edit-form form');
            var text = form.find('.image-annotate-text').val();
            $.fn.annotateImage.appendPosition(form, editable);
            image.mode = 'view';
            
            var _get_field = function(_name) {
                return form.find('[name="' + _name + '"]').val();
            };
            
            //alert(form.find("type").val());
            // Save via AJAX
            if (image.useAjax) {
                //console.log(form.serialize());
//                $.ajax({
//                    url: image.saveUrl,
//                    data: form.serialize(),
//                    error: function(e) { alert("An error occured saving that note."); },
//                    success: function(data) {
//                        if (data.annotation_id !== undefined) {
//                            editable.note.id = data.annotation_id;
//                        }
//		    },
//                    dataType: "json"
//                });

                

                var _data = {
                    "scope": _get_field("scope"),
                    "type": _get_field("type"),
                    "note": _get_field("text"),
                    "image_spot_position": {
                        top: _get_field("top"),
                        left: _get_field("left"),
                        width: _get_field("width"),
                        height: _get_field("height"),
                    }
                };
                
                var _url = image.saveUrl;
                //$.test_msg('id', form.find('[name="id"]').val() );
                if (form.find('[name="id"]').length > 0 
                        && form.find('[name="id"]').val() !== "new") {
                    _data["annotation_id"] = form.find('[name="id"]').val();
                    _url = image.editUrl;
                }
                
                KALS_util.ajax_post({
                    url: _url,
                    data: _data,
                    callback: function(data) {
                        if (data.annotation_id !== undefined) {
                            editable.note.id = data.annotation_id;
                        }
                        image.canvas.removeClass("editing");
		    },
                    exception_handle: function(e) { alert("An error occured saving that note."); }
                    //dataType: "json"
                });
            }

            // Add to canvas
            var create_view_annotation = function (_user, _type, _note, _timestamp) {
                
            };
            
            // 設定text
            //var _annotation = $.fn.annotateImage.create_view_annotation(_user, );
            
            var _new_note = {
                "user": KALS_context.user.get_name(),
                "text": text,
                "type": _get_field("type"),
                "timestamp": (new Date()).getTime()
            };
            
            if (note) {
                note.resetPosition(editable, _new_note);
            } else {
                editable.note.editable = true;
                note = new $.fn.annotateView(image, editable.note);
                note.resetPosition(editable, _new_note);
                image.notes.push(editable.note);
            }

            editable.destroy();
        }); //ok.click(function() {
        
        editable.form.find(".controller .menu").append(ok);
        return this;
    };
    
    $.fn.annotateImage.createDeleteButton = function(editable, annotation) {
        var _canvas = annotation.image.canvas
        var _form = _canvas.find('.image-annotate-edit-form form');
        
        //var editable = new $.fn.annotateEdit(this.image, this.note);
        
        if (_form.find(".controller .menu .image-annotate-edit-delete").length === 0) {

            var del = $('<a class="image-annotate-edit-delete item">' + $.fn.annotateImage.lang.delete + '</a>');
            del.click(function() {
                //var form = $('.image-annotate-edit-form form');
                //var form = ('.image-annotate-edit-form form');

                $.fn.annotateImage.appendPosition(_form, editable);

                if (annotation.image.useAjax) {
    //                    $.ajax({
    //                        url: annotation.image.deleteUrl,
    //                        data: form.serialize(),
    //                        error: function(e) { alert("An error occured deleting that note."); }
    //                    });

                    var _annotation_id = _form.find('[name="id"]').val();
                    KALS_util.ajax_get({
                        url: annotation.image.deleteUrl,
                        data: _annotation_id
                    });
                    //$.test_msg(_form.serialize());
                }

                annotation.image.mode = 'view';
                _canvas.removeClass("editing");
                editable.destroy();
                annotation.destroy();
            });
            editable.form.find(".controller .menu").append(del);
        }   //if (editable.form.find(".image-annotate-edit-delete").length > 0) {
                
        return this;
    };
    
    $.fn.annotateImage.clearButton = function(editable) {
        editable.form.find(".controller .menu").empty();
        return this;
    };

    $.fn.annotateImage.createCancelButton = function(editable, image) {
        ///	<summary>
        ///		Creates a Cancel button on the editable note.
        ///	</summary>
        
        if (editable.form.find(".controller .menu .image-annotate-edit-close").length > 0) {
            //$.test_msg("createCancelButton");
            return this;
        }
        
        var cancel = $('<a class="image-annotate-edit-close item">' + $.fn.annotateImage.lang.cancel + '</a>');
        cancel.click(function() {
            editable.destroy();
            image.mode = 'view';
            image.canvas.removeClass("editing");
        });
        editable.form.find(".controller .menu").append(cancel);
        return this;
    };

    $.fn.annotateImage.saveAsHtml = function(image, target) {
        var element = $(target);
        var html = "";
        for (var i = 0; i < image.notes.length; i++) {
            html += $.fn.annotateImage.createHiddenField("text_" + i, image.notes[i].text);
            html += $.fn.annotateImage.createHiddenField("top_" + i, image.notes[i].top);
            html += $.fn.annotateImage.createHiddenField("left_" + i, image.notes[i].left);
            html += $.fn.annotateImage.createHiddenField("height_" + i, image.notes[i].height);
            html += $.fn.annotateImage.createHiddenField("width_" + i, image.notes[i].width);
        }
        element.html(html);
        return this;
    };

    $.fn.annotateImage.createHiddenField = function(name, value) {
        return '&lt;input type="hidden" name="' + name + '" value="' + value + '" /&gt;<br />';
    };

    $.fn.annotateEdit = function(image, note) {
        ///	<summary>
        ///		Defines an editable annotation area.
        ///	</summary>
        this.image = image;
        
        //console.log(note);

        /**
         * @author Pudding 20151104
         */
        var _offset;
        if (note !== undefined 
                && typeof(note.event) !== "undefined" ) {
            _offset = note;
            note = undefined;
        }

        if (note) {
            this.note = note;
        } else {
            var newNote = new Object();
            newNote.id = "new";
            newNote.top = 30;
            newNote.left = 30;
            newNote.width = 30;
            newNote.height = 30;
            newNote.text = "";
            this.note = newNote;
        }

        // Set area
        var area = image.canvas.children('.image-annotate-edit').children('.image-annotate-edit-area');
        this.area = area;
        this.area.css('height', this.note.height + 'px');
        this.area.css('width', this.note.width + 'px');
        
        if (_offset === undefined) {
            this.area.css('left', this.note.left + 'px');
            this.area.css('top', this.note.top + 'px');
        }
        else {
            this.area.css('left', _offset.left + 'px');
            this.area.css('top', _offset.top + 'px');
        }

        // Show the edition canvas and hide the view canvas
        //image.canvas.children('.image-annotate-view').hide();
        image.canvas.children('.image-annotate-edit').show();

        // Add the note (which we'll load with the form afterwards)
        //var form = $(".KALS.image-annotate-edit-form");
        
        var form = image.canvas.find(".KALS.image-annotate-edit-form");
        if (form.length === 0) {
            form = $('<div class="KALS kals-modal image-annotate-edit-form  ui tertiary inverted yellow raised segment">'
                + '<form class="ui form">' 
                    + '<input class="scope" name="scope" type="hidden" value="' + image.scope + '" />'
                    + '<div class="field">'
                        + '<label class="user-name"></label>'
                        //+ '<input class="user-id" name="user_id" type="hidden" />'
                        + '<select name="type" class="type"></select>'
                    + '</div>'
                    + '<div class="field note-editor">'
                    + '<textarea class="image-annotate-text field" name="text">' 
                    + '</textarea>'
                    + '</div>'
                    + '<div class="controller field"><div class="ui compact brown inverted menu"></div></div>'
                    + '</div>'
                + '</form>');
            image.canvas.append(form);
            
            // @TODO #175
            try {
                //Note_editor_ckeditor.initialize_ckeditor(form.find("textarea.image-annotate-text"), KALS_CONFIG.ckeditor_config ) ;
            } catch (_e) {}
            
        }
        else {
            form.show();
            //form.css("z-index", 0);
        }
        this.form = form;
        
        form.find(".image-annotate-text").val(this.note.text);
        
        var _type_select = form.find(".type");
        //console.log(image.types);
        if (_type_select.children().length === 0) {
            for (var _t in image.types) {
                var _type = image.types[_t];
                var _option = $('<option value="' + _type.get_id() + '">' + _type.get_type_name_display() + '</option>');
                if (_type === this.note.type) {
                    _option.attr("selected", true);
                }
                _type_select.append(_option);
            }
        }
        
        //var _user = this.note.user;
        //var _user = KALS_context.user.get_name();
//        if (_user === undefined) {
//            //if (this.image.user) {
////            if (KALS_context.user.get_id()) {
////                //_user = this.image.user;
////                _user = KALS_context.user.get_id();
////            }
////            else {
////                _user = this.get_user_name();
////            }
//            _user = KALS_context.user.get_name();
//        }
        form.find(".user-name").html(KALS_context.user.get_name());
        //form.find(".user-id").html(KALS_context.user.get_id());
        //form.find(".type").attr("value", this.note.type);

        //$('body').append(this.form);
        
        image.canvas.addClass("editing");
        
//        //image.canvas.append(this.form);
//        //var _left = this.area.offset().left;
//        var _left = parseInt(this.area.offset().left, 10) - image.canvas.offset().left - 1;
//        this.form.css('left', _left + 'px');
//        //var _top = (parseInt(this.area.offset().top) + parseInt(this.area.height()) + 7);
//        var _top = (parseInt(this.area.offset().top, 10) - image.canvas.offset().top + 14);
//        this.form.css('top', _top + 'px');
        
        var _canvas = image.canvas;
        var _form_set_position = function () {
            var _left = parseInt(area.offset().left, 10) - _canvas.offset().left - 1;
            form.css('left', _left + 'px');
            var _top = (parseInt(area.offset().top, 10) + parseInt(area.height(), 10) - _canvas.offset().top - 14);
            //$.test_msg([_top, parseInt(area.offset().top, 10), parseInt(area.height(), 10), _canvas.offset().top]);
            form.css('top', _top + 'px');
        };
        
        _form_set_position();

        // Set the area as a draggable/resizable element contained in the image canvas.
        // Would be better to use the containment option for resizable but buggy
        
        area.resizable({
            handles: 'all',
            containment: image.canvas,
            scroll: false,
            stop: function(e, ui) {
                _form_set_position();
            }
        })
        .draggable({
            containment: image.canvas,
            scroll: false,
            drag: function(e, ui) {
                _form_set_position();
            },
            stop: function(e, ui) {
                _form_set_position();
            }
        });
        return this;
    };
    
    $.fn.annotateEdit.prototype.get_user_name = function () {
        //return $.fn.annotateImage;
    };

    $.fn.annotateEdit.prototype.destroy = function() {
        ///	<summary>
        ///		Destroys an editable annotation area.
        ///	</summary>        
        this.image.canvas.children('.image-annotate-edit').hide();
        this.area.resizable('destroy');
        this.area.draggable('destroy');
        this.area.css('height', '');
        this.area.css('width', '');
        this.area.css('left', '');
        this.area.css('top', '');
        //this.form.remove();
        this.form.hide();
        //this.form.css("top", "-10000px");
    };

    $.fn.annotateView = function(image, note) {
        ///	<summary>
        ///		Defines a annotation area.
        ///	</summary>
        this.image = image;

        this.note = note;

        this.editable = (note.editable && image.editable);

        // Add the area
        this.area = $('<div class="image-annotate-area' + (this.editable ? ' image-annotate-area-editable' : '') + '"><div></div></div>');
        image.canvas.children('.image-annotate-view').prepend(this.area);

        // Add the note
        this.form = $('<div class="image-annotate-note"></div>');
//        
//        this.form.append('<span class="user">' + note.user + '</span>');
//        //this.form.append('<span class="user-id">' + note.user_id + '</span>');
//        
//        var _type_display_name = new Annotation_type_param(note.type).get_type_name_display();
//        this.form.append('<span class="type">' + _type_display_name + '</span>');
//        this.form.append('<span class="text">' + note.text + '</span>');
//        
//        var _timestamp_message = KALS_context.lang.get_interval_message(note.timestamp);
//        $('<span class="timestamp"></span>').append(_timestamp_message)
//                .appendTo(this.form);
        $.fn.annotateView.prototype.setupForm(this.form, note);
        
        this.form.hide();
        image.canvas.children('.image-annotate-view').append(this.form);
        this.form.children('span.actions').hide();

        // Set the position and size of the note
        this.setPosition();

        // Add the behavior: hide/display the note when hovering the area
        var annotation = this;
        this.area.hover(function() {
            annotation.show();
        }, function() {
            annotation.hide();
        });

        // 做權限監控
        var _area = this.area;
        var _note_user_id = note.user_id;
        var _is_my_classname = "is-my";
        KALS_context.auth.add_instant_listener(function (_auth) {
            if (KALS_context.user.get_id() === _note_user_id) {
                _area.addClass(_is_my_classname);
            }
            else {
                _area.removeClass(_is_my_classname);
            } 
        });
        
        // Edit a note feature1
        if (this.editable) {
            var form = this;
            this.area.click(function() {
                if (KALS_context.user.get_id() === _note_user_id) {
                    form.edit();
                }
            });
        }
        
    };

    $.fn.annotateView.prototype.setPosition = function() {
        ///	<summary>
        ///		Sets the position of an annotation.
        ///	</summary>
        this.area.children('div').height((parseInt(this.note.height) - 2) + 'px');
        this.area.children('div').width((parseInt(this.note.width) - 2) + 'px');
        this.area.css('left', (this.note.left) + 'px');
        this.area.css('top', (this.note.top) + 'px');
        this.form.css('left', (this.note.left) + 'px');
        this.form.css('top', (parseInt(this.note.top) + parseInt(this.note.height) + 7) + 'px');
    };

    $.fn.annotateView.prototype.show = function() {
        ///	<summary>
        ///		Highlights the annotation
        ///	</summary>
        this.form.fadeIn(250);
        if (!this.editable) {
            this.area.addClass('image-annotate-area-hover');
        } else {
            this.area.addClass('image-annotate-area-editable-hover');
        }
    };

    $.fn.annotateView.prototype.hide = function() {
        ///	<summary>
        ///		Removes the highlight from the annotation.
        ///	</summary>      
        this.form.fadeOut(250);
        this.area.removeClass('image-annotate-area-hover');
        this.area.removeClass('image-annotate-area-editable-hover');
    };

    $.fn.annotateView.prototype.destroy = function() {
        ///	<summary>
        ///		Destroys the annotation.
        ///	</summary>      
        this.area.remove();
        this.form.remove();
    };

    $.fn.annotateView.prototype.edit = function() {
        ///	<summary>
        ///		Edits the annotation.
        ///	</summary>    
        
        $.save_scroll_position();
        $.lock_scoll();
        //alert(111);
        
        if (this.image.mode === 'view') {
            this.image.mode = 'edit';
            var annotation = this;
            //$.lock_scroll_once();

            // Create/prepare the editable note elements
            //var editable = new $.fn.annotateEdit(this.image, this.note);
            var editable = new $.fn.annotateEdit(this.image, this.note);

            $.fn.annotateImage.clearButton(editable);
            $.fn.annotateImage.createSaveButton(editable, this.image, annotation);
            var _form = this.image.canvas.find('.image-annotate-edit-form form');
            var _canvas = this.image.canvas;

            // Add the delete button
            //$.test_msg(_form.find(".controller .menu .image-annotate-edit-delete").length);
            $.fn.annotateImage.createDeleteButton(editable, annotation);
            $.fn.annotateImage.createCancelButton(editable, this.image);
            
        }   //if (this.image.mode === 'view') {
        //alert(1212);
        setTimeout(function () {
            $.unlock_scoll();
            $.load_scroll_position();
            //alert(33);
        }, 500);
    };

    $.fn.annotateImage.appendPosition = function(form, editable) {
        ///	<summary>
        ///		Appends the annotations coordinates to the given form that is posted to the server.
        ///	</summary>
        var areaFields = $('<input type="hidden" value="' + editable.area.height() + '" name="height"/>' +
                           '<input type="hidden" value="' + editable.area.width() + '" name="width"/>' +
                           '<input type="hidden" value="' + editable.area.position().top + '" name="top"/>' +
                           '<input type="hidden" value="' + editable.area.position().left + '" name="left"/>' +
                           '<input type="hidden" value="' + editable.note.id + '" name="id"/>');
        form.append(areaFields);
    };
    
    /**
     * @author Pudding 20151114
     * @param {type} _form
     * @param {type} _note
     * @returns {unresolved}
     */
    $.fn.annotateView.prototype.setupForm = function (_form, _note) {
        _form.html("");
        _form.append('<span class="user">' + _note.user + '</span>');
        //this.form.append('<span class="user-id">' + note.user_id + '</span>');
        
        var _type_display_name = new Annotation_type_param(_note.type).get_type_name_display();
        _form.append('<span class="type">' + _type_display_name + '</span>');
        _form.append('<span class="text">' + _note.text + '</span>');
        
        var _timestamp_message = KALS_context.lang.get_interval_message(_note.timestamp);
        $('<span class="timestamp"></span>').append(_timestamp_message)
                .appendTo(_form);
        return _form;
    };

    $.fn.annotateView.prototype.resetPosition = function(editable, note) {
        ///	<summary>
        ///		Sets the position of an annotation.
        ///	</summary>
        //$.test_msg("text", text);
        
        //this.form.html(_text);
        //$.test_msg("resetPosition", note);
        //this.form.empty();
        this.from = $.fn.annotateView.prototype.setupForm.call(this, this.form, note);
        //$.test_msg("this.form", this.form.html());
        //this.form.hide();

        // Resize
        this.area.children('div').height(editable.area.height() + 'px');
        this.area.children('div').width((editable.area.width() - 2) + 'px');
        this.area.css('left', (editable.area.position().left) + 'px');
        this.area.css('top', (editable.area.position().top) + 'px');
        this.form.css('left', (editable.area.position().left) + 'px');
        this.form.css('top', (parseInt(editable.area.position().top) + parseInt(editable.area.height()) + 7) + 'px');

        // Save new position to note
        this.note.top = editable.area.position().top;
        this.note.left = editable.area.position().left;
        this.note.height = editable.area.height();
        this.note.width = editable.area.width();
        
        this.note.text = note.text;
        this.note.id = editable.note.id;
        this.editable = true;
        
        //$.test_msg("設定完了");
    };

})(jQuery);