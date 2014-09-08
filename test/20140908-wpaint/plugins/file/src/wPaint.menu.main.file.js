(function ($) {
  var img = 'plugins/file/img/icons-menu-main-file.png';
  //var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAASCAYAAAAQeC39AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8xNy8xMw2X2PUAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAACm0lEQVRIid2Wv0sbYRzGP1cFE65DDTTkcEqIk0NbHFrIInIg+QcU3Opg2yWjcZFaHBLXZOmUbAdm6CSEwEUc7SCKJDgYIna5W9RughCuwyVyd++bGLGxPx44uHu+7z3cc/d9vu8pjuPQDwsL714A+93LuVrt4Gffxf01NoHPAfpLrXawOUqdZwOEXuOaetU99rvcPwFlbe2D8Mlubm5otVp0Oh0fPzY2RjKZJBwOs739VfHWstmP0k9v2za2bfu4WCxGLBYDkOooio8CwLIsqY6maTiOI+iMAywtrdwRh4ff2d39JpgC6HQ6XFz8IBp9KfPg0+nBNKvYdtXHzcy8QdfT7OyUhPWKorC1VRB4wyhhGGUfNz+fZnl5hY2NjLBeaMXr6ytSqTni8aSwOB5PkkrNcXt7K7H1d2E8SOh6GgDThPPzlq+WSEyj62kuL62nebpHQDDWa49gPwM0m0d3pvplyqujKAqWJb6EZvOIqysbRVFYX/90p+M4DsF89dpMprO3V+X09BjApyM1Bm5WBmVDZiKIXlYGZSMIWVYAFhffP+h5KpWy3NjvgGVZGEaJk5MjoeZy7suQGQzqmGaVdvtMqLXbZ5imex402HcfeywmJiYwjDKNxrFQazSOMYwy0ag2lE69XhXyDu4MqNerTE5GhNrIjEUiEQqFEqqqCjVVVSkUStI2kulkMllCobBQC4XCZDJZZmffCrWRGQN3iuZyRd/WEY8nyeWKJBLTQ+to2hSrqxk0bWog58VIjYFrLp93zcXjSfL5h5nqwWvkPlPQnYqyqabr6aFaxQuvjndsq+pzisWy7BYBjuP0nY691hsG48P+892HoE5wX3lqnZG34p/Cf2tMukHLMvdQDMrKoHtkqFSGy6cXvwDrsxUWiLct+gAAAABJRU5ErkJggg==";

  // extend menu
  $.extend(true, $.fn.wPaint.menus.main.items, {
    save: {
      icon: 'generic',
      title: 'Save Image',
      img: img,
      index: 0,
      callback: function () {
        this.options.saveImg.apply(this, [this.getImage()]);
      }
    },
    loadBg: {
      icon: 'generic',
      group: 'loadImg',
      title: 'Load Image to Foreground',
      img: img,
      index: 2,
      callback: function () {
        this.options.loadImgFg.apply(this, []);
      }
    },
    loadFg: {
      icon: 'generic',
      group: 'loadImg',
      title: 'Load Image to Background',
      img: img,
      index: 1,
      callback: function () {
        this.options.loadImgBg.apply(this, []);
      }
    }  
  });

  // extend defaults
  $.extend($.fn.wPaint.defaults, {
    saveImg: null,   // callback triggerd on image save
    loadImgFg: null, // callback triggered on image fg
    loadImgBg: null  // callback triggerd on image bg
  });

  // extend functions
  $.fn.wPaint.extend({
    _showFileModal: function (type, images) {
      var _this = this,
          $content = $('<div></div>'),
          $img = null;

      function appendContent(type, image) {
        function imgClick(e) {

          // just in case to not draw on canvas
          e.stopPropagation();
          if (type === 'fg') { _this.setImage(image); }
          else if (type === 'bg') { _this.setBg(image, null, null, true); }
        }

        $img.on('click', imgClick);
      }

      for (var i = 0, ii = images.length; i < ii; i++) {
        //$img = $('<img class="wPaint-modal-img"/>').attr('src', images[i]);
        //console.log(images[i]);
        $img = $('<img class="wPaint-modal-img"/>').attr('src', images[i]);
        $img = $('<div class="wPaint-modal-img-holder"></div>').append($img);

        (appendContent)(type, images[i]);

        $content.append($img);
      }

      this._showModal($content);
    }
  });
})(jQuery);