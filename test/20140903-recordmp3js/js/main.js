  function __log(e, data) {
    log.innerHTML += "\n" + e + " " + (data || '');
  }

  var audio_context;
  var recorder;
  var analyserContext = null;
  RECORDING = false;

  function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    __log('Media stream created.' );
	__log("input sample rate " +input.context.sampleRate);
    
    /**
     * @version 20140903 Pulipuli Chen
     * 取消connect之後，就不會有迴音問題
     * 
     */
    //input.connect(audio_context.destination);
    __log('Input connected to audio context destination.');
    
    recorder = new Recorder(input);
    __log('Recorder initialised.');
    
    
    inputPoint = audio_context.createGain();
    realAudioInput = audio_context.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);
    
    analyserNode = audio_context.createAnalyser();
    analyserNode.fftSize = 2048;
    
    inputPoint.connect( analyserNode );
    
    zeroGain = audio_context.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
    zeroGain.connect( audio_context.destination );
    updateAnalysers();
  }

function gotStream(stream) {
    inputPoint = audio_context.createGain();

    // Create an AudioNode from the stream.
    realAudioInput = audio_context.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);

//    audioInput = convertToMono( input );

    analyserNode = audio_context.createAnalyser();
    analyserNode.fftSize = 2048;
    inputPoint.connect( analyserNode );

    audioRecorder = new Recorder( inputPoint );

    zeroGain = audio_context.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
    zeroGain.connect( audio_context.destination );
    updateAnalysers();
}

function toggleRecording(button) {
    var _recording_classname = "recording";
    var _wait_classname = "wait";
    var button = $(button);
    
    if (button.hasClass(_wait_classname)) {
        return this;
    }
    
    var _dashboard = DASHBOARD.get_dashboard(button);
    if (button.hasClass(_recording_classname) === false) {
        button.addClass(_recording_classname);
        
        //_dashboard.show();
        DASHBOARD.start_dashboard(button);
        
        recorder && recorder.record();
        __log('Recording...');
        //updateAnalysers();
        RECORDING = true;
    }
    else {
        button.removeClass(_recording_classname);
        button.addClass(_wait_classname);
        
        DASHBOARD.stop_dashboard(button);
        
        recorder && recorder.stop();
        __log('Stopped recording.');

        // create WAV download link using audio data blob
        createDownloadLink();

        recorder.clear();
        //cancelAnalyserUpdates();
        RECORDING = false;
    }
}

DASHBOARD = {
    timer: null,
    get_dashboard: function (_button) {
        return _button.parents(".controller:first").find(".dashboard");
    },
    get_canvas: function (_button) {
        return _button.parents(".recorder-panel:first").find(".analyser");
    },
    get_download: function (_button) {
        return _button.parents(".controller:first").find(".download");
    },
    start_dashboard: function (_button, _remain_sec) {
        var _dashboard = this.get_dashboard(_button);
        
        if (!_remain_sec) {
            //_remain_sec = 3;
            _remain_sec = 60;
        }
        
        this.set_remain_sec(_dashboard, _remain_sec);
        this.set_recorded_sec(_dashboard, 0);
        
        _dashboard.show();
        
        this.get_download(_button).empty();
        
        //this.get_canvas(_button).show();
        
        var _ = this;
        _.timer = setInterval(function () {
            var _secs = _.get_remain_sec(_dashboard);
            _secs = _secs - 1;
            _.set_remain_sec(_dashboard, _secs);
            
            _secs = _.get_recorded_sec(_dashboard);
            _secs = _secs + 1;
            _.set_recorded_sec(_dashboard, _secs);
            
            if (_secs === 0) {
                _button.click();
                clearInterval(_.timer);
            }
        }, 1000);
    },
    get_remain_sec: function (_dashboard) {
        var _secs = _dashboard.find(".remain_secs").text();
        _secs = parseInt(_secs, 10);
        return _secs;
    },
    set_remain_sec: function (_dashboard, _secs) {
        _dashboard.find(".remain_secs").text(_secs);
        return this;
    },
    get_recorded_sec: function (_dashboard) {
        var _secs = _dashboard.find(".recorded_secs").text();
        _secs = parseInt(_secs, 10);
        return _secs;
    },
    set_recorded_sec: function (_dashboard, _secs) {
        _dashboard.find(".recorded_secs").text(_secs);
        return this;
    },
    stop_dashboard: function (_button) {
        var _dashboard = this.get_dashboard(_button);
        _dashboard.hide();
        clearInterval(this.timer);
        //this.get_canvas(_button).hide();
    }
}

  function createDownloadLink() {
    recorder && recorder.exportWAV(function(blob) {
      /*var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var hf = document.createElement('a');
      
      au.controls = true;
      au.src = url;
      hf.href = url;
      hf.download = new Date().toISOString() + '.wav';
      hf.innerHTML = hf.download;
      li.appendChild(au);
      li.appendChild(hf);
      recordingslist.appendChild(li);*/
    });
  }
  
  function updateAnalysers(time) {
    if (!analyserContext) {
        //var canvas = document.getElementById("analyser");
        var canvas = document.getElementsByClassName("recordmp3js_analyser")[0];
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        analyserContext = canvas.getContext('2d');
    }

    // analyzer draw code here
    {
        var SPACING = 3;
        var BAR_WIDTH = 1;
        var numBars = Math.round(canvasWidth / SPACING);
        var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

        analyserNode.getByteFrequencyData(freqByteData); 

        analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
        analyserContext.fillStyle = '#F6D565';
        //analyserContext.fillStyle = '#CCCCCC';
        analyserContext.lineCap = 'round';
        var multiplier = analyserNode.frequencyBinCount / numBars;

        // Draw rectangle for each frequency bin.
        for (var i = 0; i < numBars; ++i) {
            var magnitude = 0;
            var offset = Math.floor( i * multiplier );
            // gotta sum/average the block, or we miss narrow-bandwidth spikes
            for (var j = 0; j< multiplier; j++)
                magnitude += freqByteData[offset + j];
            magnitude = magnitude / multiplier;
            var magnitude2 = freqByteData[i * multiplier];
            if (RECORDING === true) {
                analyserContext.fillStyle = "hsl( " + Math.round((i*360)/numBars) + ", 100%, 50%)";
            }
            else {
                analyserContext.fillStyle = '#CCCCCC';
            }
            analyserContext.fillRect(i * SPACING, canvasHeight, BAR_WIDTH, -magnitude);
        }
    }
    
    rafID = window.requestAnimationFrame( updateAnalysers );
}

function cancelAnalyserUpdates() {
    window.cancelAnimationFrame( rafID );
    rafID = null;
}
  
  // ----------------------------

  window.onload = function init() {
      
      // 停止運作
      //return;
      
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);
      window.URL = window.URL || window.webkitURL;
      
      audio_context = new AudioContext();
      __log('Audio context set up.');
      __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
      alert('No web audio support in this browser!');
    }
    
    navigator.getUserMedia({audio: true}
        //, gotStream
        , startUserMedia
        , function(e) {
      __log('No live audio input: ' + e);
    });
  };
  