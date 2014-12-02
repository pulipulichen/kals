//$(function () {
//-------------------------------

    var images = [
        '/test/uploads/wPaint.png',
    ];

        function saveImg(image) {
          var _this = this;
          console.log(image);
          return;
          $.ajax({
            type: 'POST',
            url: '/test/upload.php',
            data: {image: image},
            success: function (resp) {

              // internal function for displaying status messages in the canvas
              _this._displayStatus('Image saved successfully');

              // doesn't have to be json, can be anything
              // returned from server after upload as long
              // as it contains the path to the image url
              // or a base64 encoded png, either will work
              resp = $.parseJSON(resp);

              // update images array / object or whatever
              // is being used to keep track of the images
              // can store path or base64 here (but path is better since it's much smaller)
              images.push(resp.img);

              // do something with the image
              $('#wPaint-img').attr('src', image);
            }
          });
        }

        function loadImgBg () {

          // internal function for displaying background images modal
          // where images is an array of images (base64 or url path)
          // NOTE: that if you can't see the bg image changing it's probably
          // becasue the foregroud image is not transparent.
          this._showFileModal('bg', images);
        }

        function loadImgFg () {

          // internal function for displaying foreground images modal
          // where images is an array of images (base64 or url path)
          this._showFileModal('fg', images);
        }

        // init wPaint
        $('#wPaint').wPaint({
          menuOffsetLeft: -35,
          menuOffsetTop: -50,
          saveImg: saveImg,
          loadImgBg: loadImgBg,
          loadImgFg: loadImgFg,
          path: "http://localhost/kals/test/20140908-wpaint/",
          menuHandle: false,
          imageStretch: true
        });
        
//-------------------------------
//}); //$(function () {