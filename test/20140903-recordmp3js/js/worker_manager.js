WORKER_MANAGER = {
    embed_to_head: function (_id, _worker_func) {
        var _worker_str = _worker_func.toString();
        _worker_str = _worker_str.substring(_worker_str.indexOf("{") + 1 , _worker_str.lastIndexOf("}"));
        //alert(1212);
        var _script = document.createElement("script");
        _script.type = "text/js-worker";
        _script.id = _id;
        document.getElementsByTagName('head')[0].appendChild(_script);
        _script.appendChild(document.createTextNode(_worker_str));
    },
    load_worker: function (_id) {
        // In the past...:
        // blob builder existed
        // ...but now we use Blob...:
        var _blob = new Blob(Array.prototype.map.call(document.querySelectorAll("script[type=\"text\/js-worker\"][id=\""+_id+"\"]")
            , function (_oScript) { return _oScript.textContent; })
            ,{type: "text/javascript"});

        // Creating a new document.worker property containing all our "text/js-worker" scripts.
        var _worker = new Worker(window.URL.createObjectURL(_blob));
        return _worker;
    }
};