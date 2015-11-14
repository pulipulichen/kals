Recordmp3js CKEditor plugin
===========

Record MP3 files CKEditor plugin directly from the browser using JS and HTML
You can install this plugin to record voice in CKEditor.

Installation
=======

**[CKEditor]** is your CKEditor root directory.

Put all of the files under this path: **[CKEditor]/plugin/recordmp3js/**

And then revise your CKEditor config, add "**recordmp3js**" to "**extraPlugins**". 

Like following code:
```JavaScript
var config = {
        "extraPlugins": "recordmp3js"
};
```
Configuration
=======

You can revise default configuration of this plugin.

Just add "**recordmp3js**" configuration your CKEditor config, like following code:

```JavaScript
var config = {
    "extraPlugins": "recordmp3js",
    "recordmp3js": {
        "record_limit": 5,
        "upload_url": "http://your-php-file-upload-server/upload",
        "get_link_url": "http://your-php-file-upload-server/get_link"
    }
};
```

- "**record_limit**" is the limitation of record time. Default is 15 seconds. Maximum is 60 seconds because of the recorder buffer of browser. Minimum is 3 seconds.
- "**upload_url**" and "**get_link_url**" is the API of PHP File Host application. You can read the details of [PHP File Host project at GitHub](https://github.com/pulipulichen/php-file-host).


Relating Works
=======

- [Recorderjs](https://github.com/mattdiamond/Recorderjs): The root project of HTML5 record library.
- [AudioRecorder](http://webaudiodemos.appspot.com/AudioRecorder/index.html): This project have beautiful wave display. Base on [Recorderjs](https://github.com/mattdiamond/Recorderjs).
- [Recordmp3js](https://github.com/nusofthq/Recordmp3js): Fork from [Recorderjs](https://github.com/mattdiamond/Recorderjs). Try this [demo](http://audior.ec/recordmp3js/).
- [Music Download Icon](http://findicons.com/icon/90399/music_down?id=343495): Converted to Base64 format by [Convert any image into a base64 string](http://webcodertools.com/imagetobase64converter).
- [PHP File Host](https://github.com/pulipulichen/php-file-host): You can use this project to save your recorded mp3 file.

----------------------------------

License
=======

The MIT License (MIT)

Copyright (c) 2014 Pulipuli Chen <pulipuli.chen@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


Disclaimer
==========

This plugin include MP3 encoding/decoding technology, which may be governed by MP3 patents in some countries.

