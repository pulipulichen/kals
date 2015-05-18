/*
 * QUnit - A JavaScript Unit Testing Framework
 * 
 * http://docs.jquery.com/QUnit
 *
 * Copyright (c) 2009 John Resig, Jörn Zaefferer
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */

(function(window) {

var QUnit = {

	// Initialize the configuration options
	init: function() {
		extend(config, {
			stats: {all: 0, bad: 0},
			moduleStats: {all: 0, bad: 0},
			started: +new Date,
			updateRate: 1000,
			blocking: false,
			autostart: true,
			autorun: false,
			assertions: [],
			filters: [],
			queue: []
		});

		var tests = id("qunit-tests"),
			banner = id("qunit-banner"),
			result = id("qunit-testresult");

		if ( tests ) {
			tests.innerHTML = "";
		}

		if ( banner ) {
			banner.className = "";
		}

		if ( result ) {
			result.parentNode.removeChild( result );
		}
	},
	
	// call on start of module test to prepend name to all tests
	module: function(name, testEnvironment) {
		config.currentModule = name;

		synchronize(function() {
			if ( config.currentModule ) {
				QUnit.moduleDone( config.currentModule, config.moduleStats.bad, config.moduleStats.all );
			}

			config.currentModule = name;
			config.moduleTestEnvironment = testEnvironment;
			config.moduleStats = {all: 0, bad: 0};

			QUnit.moduleStart( name, testEnvironment );
		});
	},

	asyncTest: function(testName, expected, callback) {
		if ( arguments.length === 2 ) {
			callback = expected;
			expected = 0;
		}

		QUnit.test(testName, expected, callback, true);
	},
	
	test: function(testName, expected, callback, async) {
        QUNIT_TEST_NAME = testName;
		var name = '<span class="test-name">' + testName + '</span>', testEnvironment, testEnvironmentArg;

		if ( arguments.length === 2 ) {
			callback = expected;
			expected = null;
		}
		// is 2nd argument a testEnvironment?
		if ( expected && typeof expected === 'object') {
			testEnvironmentArg =  expected;
			expected = null;
		}

		if ( config.currentModule ) {
			name = '<span class="module-name">' + config.currentModule + "</span>: " + name;
		}

		if ( !validTest(config.currentModule + ": " + testName) ) {
			return;
		}
        
		synchronize(function() {

			testEnvironment = extend({
				setup: function() {},
				teardown: function() {}
			}, config.moduleTestEnvironment);
            
            
			if (testEnvironmentArg) {
				extend(testEnvironment,testEnvironmentArg);
			}

            
			QUnit.testStart( testName, testEnvironment );

			// allow utility functions to access the current test environment
			QUnit.current_testEnvironment = testEnvironment;
			
			config.assertions = [];
			config.expected = expected;
			
			var tests = id("qunit-tests");
			if (tests) {
				var b = document.createElement("strong");
					b.innerHTML = "Running " + name;
				var li = document.createElement("li");
					li.appendChild( b );
					li.id = "current-test-output";
                
                tests.appendChild( li );
                
                //if (testName == false)
                //{
                //    li.style.display = 'none';
                //}   
			}

			try {
				if ( !config.pollution ) {
					saveGlobal();
				}

				testEnvironment.setup.call(testEnvironment);
			} catch(e) {
				QUnit.ok( false, "Setup failed on " + name + ": " + e.message );
			}
            
    });

    synchronize(function() {
			if ( async ) {
				QUnit.stop();
			}
            
			try {
				callback.call(testEnvironment);
			} catch(e) {
                                var vDebug = "<pre>";
                                for (var prop in e)
                                {
                                    if (prop == "stack")
                                        continue;

                                    if (vDebug != "<pre>")
                                    {
                                        vDebug += "<br />"
                                        if (prop == 'stack')
                                            vDebug += "\n";
                                    }
                                    vDebug += "["+prop + "] "
                                    if (prop == 'stack')
                                        vDebug +=  "\n";

                                    var value = e[prop];
                                    if (prop == 'fileName')
                                    {
                                        value = '<a href="'+value+'" target="_blank">'+value+'</a>';
                                    }
                                    vDebug += value;
                                }
                                if (typeof(e["stack"]) != "undefined")
                                {
                                    if (vDebug != "<pre>")
                                    {
                                        vDebug += "<br />";
                                    }

                                    var stacks = e['stack'].split('http://');
                                    var stack = '';
                                    for (var i in stacks)
                                    {
                                        if (i == 0)
                                        {
                                            stack = stacks[i];
                                        }
                                        else
                                        {
                                            var end = stacks[i].indexOf(':');
                                            if (end > -1)
                                            {
                                                var url = 'http://' + stacks[i].substr(0, end);
                                                
                                                var end_number = stacks[i].indexOf("\n");
                                                
                                                var number = stacks[i].substring(end+1, end_number);

                                                var line = '<a href="'+url+'" target="_blank">'+url+'</a>';
                                                
                                                line += ' (<a href="view-source:'+url+'">view-source</a>)';
                                                
                                                line += stacks[i].substring(end, stacks[i].length);
                                                
                                                var line_end = line.indexOf("\n");
                                                stack += line.substring(0, line_end);
                                                
                                                stack += '<textarea class="view-source view-source-'+i+'" url="'+url+'" line="'+number+'" style="display:none;"></textarea>';
                                                
                                                stack += line.substring(line_end, line.length);
                                            }
                                            else
                                                stack += 'http://' +stacks[i];
                                        }
                                    }

                                    prop = "stack";
                                    vDebug += "\n["+ prop + "] \n"
                                        + stack;
                                }

                                vDebug += "</pre>";

				fail("Test " + name + " died, exception and test follows", e, callback);
                
                if (e.message == 'KALS_context is not defined')
                {
                    //location.reload();
                }
                
				QUnit.ok( false, "Died on test #" + (config.assertions.length + 1) + ": " + e.message + vDebug );
                                
				// else next test will carry the responsibility
				saveGlobal();

				// Restart the tests if they're blocking
				if ( config.blocking ) {
					start();
				}
                
                setTimeout(function () {
                    //去偵測所有需要讀取原始碼的位置
                    var views = $('.view-source');
                    TEXT_DATABASE = {};
                    var load_view = function (views, i)
                    {
                        if (i < views.length)
                        {
                            var v =  views.eq(i);
                        
                            var url = v.attr('url');
                            
                            var load_callback = function(data) {
                                
                                //var v = $(this); 
                                
                                var line = parseInt(v.attr('line'));
                                var line_start = 0, line_end = 5;
                                if (line > 2)
                                {
                                    line_start = line-2;
                                    line_end = line+2;
                                }
                                
                                var texts;
                                if (typeof(TEXT_DATABASE[url]) == 'undefined')
                                {
                                    var text = data;    //v.html();
                                    
                                    texts = text.split("\n");
                                    
                                    TEXT_DATABASE[url] = texts;
                                }
                                else
                                    texts = TEXT_DATABASE[url];
                                
                                var output = '';
                                for (var j = line_start; j < line_end+1; j++)
                                {
                                    output += j+': ' + texts[(j-1)];
                                    if (j < line_end)
                                        output += '\n';
                                }
                                
                                var pre = $('<pre style="margin:0;"></pre>').insertAfter(v);
                                pre.html(output);
                                v.remove();
                                
                                //v.html(output);
                                //v.show(); 
                                
                                i++;
                                load_view(views, i);
                            };
                            
                            if (typeof(TEXT_DATABASE[url]) == 'undefined')
                            {
                                //v.load(url, load_callback);
                                $.get(url, load_callback);
                            }
                            else
                            {
                                load_callback();
                            }
                        }
                    };
                    
                    load_view(views, 0);
                    
                }, 0);
			}
		});

		synchronize(function() {
			try {
				checkPollution();
				testEnvironment.teardown.call(testEnvironment);
			} catch(e) {
				QUnit.ok( false, "Teardown failed on " + name + ": " + e.message );
			}
    });

    synchronize(function() {
			try {
				QUnit.reset();
			} catch(e) {
				fail("reset() failed, following Test " + name + ", exception and reset fn follows", e, reset);
			}

			if ( config.expected && config.expected != config.assertions.length ) {
				QUnit.ok( false, "Expected " + config.expected + " assertions, but " + config.assertions.length + " were run" );
			}

			var good = 0, bad = 0,
				tests = id("qunit-tests");

            if (testName != false)
            {
                config.stats.all += config.assertions.length;
			    config.moduleStats.all += config.assertions.length;
            }   

			if ( tests ) {
                
				var ol  = document.createElement("ol");
				ol.style.display = "none";
                
                var exception = false;

                var exception_needle = 'Died on test';
				for ( var i = 0; i < config.assertions.length; i++ ) {
					var assertion = config.assertions[i];
                    
                    if (assertion.message.substring(0, exception_needle.length) == exception_needle)
                    {
                        //$.test_msg(assertion.message);
                        exception = true;
                    }

					var li = document.createElement("li");
                    
					li.className = assertion.result ? "pass" : "fail";
                    li.className = li.className + ' unit';
					li.innerHTML = assertion.message || "(no message)";

                    ol.appendChild( li );

					if ( assertion.result ) {
						good++;
					} else {
						bad++;
						config.stats.bad++;
						config.moduleStats.bad++;
					}
				}

				var b = document.createElement("strong");
				b.innerHTML = name + " <b style='color:black;'>(<b class='fail'>" + bad + "</b>, <b class='pass'>" + good + "</b>, " + config.assertions.length + ")</b>";
				
				addEvent(b, "click", function() {
					var next = b.nextSibling, display = next.style.display;
					next.style.display = display === "none" ? "block" : "none";
				});
				
				addEvent(b, "dblclick", function(e) {
					var target = e && e.target ? e.target : window.event.srcElement;
					if ( target.nodeName.toLowerCase() == "span" || target.nodeName.toLowerCase() == "b" ) {
						target = target.parentNode;
					}
					if ( window.location && target.nodeName.toLowerCase() === "strong" ) {
						window.location.href = window.location.href.match(/^(.+?)(\?.*)?(\#.*)?$/)[1] + "?" + encodeURIComponent(getText([target]).replace(/\(.+\)$/, "").replace(/(^\s*|\s*$)/g, ""));
					}
				});

				var li = id("current-test-output");
                
				li.id = "";
                
                li.className = bad ? "fail" : "pass";
                li.className = li.className + ' group';
                
                //$.test_msg('testName', testName);
                //$.test_msg('test', [bad, testName, exception]);
                //$.test_msg('test 2', [bad == 1, testName == false, exception == false]);
                
                if (testName == false)
                {
                    if (exception == false)
                    {
                        //$.test_msg('被設為none', testName);
                        li.style.display = 'none';
                    }
                    else
                    {
                        config.stats.all += config.assertions.length;    
                        config.moduleStats.all += config.assertions.length;
                        done();
                    }
                }
                
                //$.test_msg('name', [name, (name != '<span class="test-name">false</span>')]);
                //$.test_msg('other', [bad, li.style.display]);
                
                
                //if (bad && li.style.display == 'none'
                //    && name != '<span class="test-name">false</span>')
                //{
                //    li.style.display = 'list-item';
                //}				
                
                li.removeChild( li.firstChild );
				li.appendChild( b );
				li.appendChild( ol );
                
                //$(li).ready(function () {
                //    $.test_msg($(this).find('.test-name:first').length, $(this).find('.test-name:first').html());
                    //if ($(this).find('.test-name:first').html() == 'false')
                    //    $(this).hide();                    
                //});

                                //if (li.className == 'fail')
                                    ol.style.display = 'block';

				if ( bad ) {
					var toolbar = id("qunit-testrunner-toolbar");
					if ( toolbar ) {
						toolbar.style.display = "block";
						id("qunit-filter-pass").disabled = null;
						id("qunit-filter-missing").disabled = null;
					}
				}

			} else {
				for ( var i = 0; i < config.assertions.length; i++ ) {
					if ( !config.assertions[i].result ) {
						bad++;
						config.stats.bad++;
						config.moduleStats.bad++;
					}
				}
			}

			QUnit.testDone( testName, bad, config.assertions.length );


			if ( !window.setTimeout && !config.queue.length) {
				done(testName);
			}
		});
        
        if (testName == false)
            return;

		if ( window.setTimeout && !config.doneTimer ) {
			config.doneTimer = window.setTimeout(function(){
				if ( !config.queue.length ) {
					done(testName);
				} else {
					synchronize( done );
				}
			}, 13);
		}
	},
	
	/**
	 * Specify the number of expected assertions to gurantee that failed test (no assertions are run at all) don't slip through.
	 */
	expect: function(asserts) {
		config.expected = asserts;
	},

	/**
	 * Asserts true.
	 * @example ok( "asdfasdf".length > 5, "There must be at least 5 chars" );
	 */
	ok: function(a, msg) {
		QUnit.log(a, msg);

		config.assertions.push({
			result: !!a,
			message: msg
		});
	},

	/**
	 * Checks that the first two arguments are equal, with an optional message.
	 * Prints out both actual and expected values.
	 *
	 * Prefered to ok( actual == expected, message )
	 *
	 * @example equal( format("Received {0} bytes.", 2), "Received 2 bytes." );
	 *
	 * @param Object actual
	 * @param Object expected
	 * @param String message (optional)
	 */
	equal: function(actual, expected, message) {
            var result = (expected == actual);
            if (expected == 'is_string')
                result = (typeof(actual) == 'string');
            else if (expected == 'is_number')
                result = (typeof(actual) == 'number');
            else if (expected == 'is_object')
                result = (typeof(actual) == 'object');
            else if (expected == 'is_array')
                result = (typeof(actual) == 'object' && (actual instanceof Array));
            
		push(result, actual, expected, message);
	},
        testEquals: function(actual, expected, message) {
            
            config.autorun = true;
            
            test(message, function()
            {
                equals(actual, expected, message);    
            });
            
        },

        testEqual: function(actual, expected, message) {
            testEquals(actual, expected, message);
        },
        
        test_equal: function(actual, expected, message) {
            testEquals(actual, expected, message);
        },
        
        test_equals: function(actual, expected, message) {
            testEquals(actual, expected, message);
        },

	notEqual: function(actual, expected, message) {
		push(expected != actual, actual, expected, message, false);
	},

        notEquals: function(actual, expected, message) {
            notEqual(actual, expected, message)
        },
        
        not_equals: function(actual, expected, message) {
            notEqual(actual, expected, message)
        },
        
        not_equal: function(actual, expected, message) {
            notEqual(actual, expected, message)
        },

        testNotEquals: function(actual, expected, message) {
            
            config.autorun = true;
            
            test(message, function()
            {
                notEqual(actual, expected, message);
            });
        },

        testNotEqual: function(actual, expected, message) {
            testNotEquals(actual, expected, message);
        },
        
        test_not_equals: function(actual, expected, message) {
            testNotEquals(actual, expected, message);
        },
        
        test_not_equal: function(actual, expected, message) {
            testNotEquals(actual, expected, message);
        },
	
	deepEqual: function(actual, expected, message) {
		push(QUnit.equiv(actual, expected), actual, expected, message);
	},

	notDeepEqual: function(actual, expected, message) {
		push(!QUnit.equiv(actual, expected), actual, expected, message);
	},

	strictEqual: function(actual, expected, message) {
		push(expected === actual, actual, expected, message);
	},

	notStrictEqual: function(actual, expected, message) {
		push(expected !== actual, actual, expected, message);
	},
	
	start: function() {
		// A slight delay, to avoid any current callbacks
		if ( window.setTimeout ) {
			window.setTimeout(function() {
				if ( config.timeout ) {
					clearTimeout(config.timeout);
				}

				config.blocking = false;
				process();
			}, 13);
		} else {
			config.blocking = false;
			process();
		}
	},
	
	stop: function(timeout) {
		config.blocking = true;

		if ( timeout && window.setTimeout ) {
			config.timeout = window.setTimeout(function() {
				QUnit.ok( false, "Test timed out" );
				QUnit.start();
			}, timeout);
		}
	},
	
	/**
	 * Resets the test setup. Useful for tests that modify the DOM.
	 */
	reset: function() {
		if ( window.jQuery ) {
			jQuery("#main").html( config.fixture );
			jQuery.event.global = {};
			jQuery.ajaxSettings = extend({}, config.ajaxSettings);
		}
	},
	
	/**
	 * Trigger an event on an element.
	 *
	 * @example triggerEvent( document.body, "click" );
	 *
	 * @param DOMElement elem
	 * @param String type
	 */
	triggerEvent: function( elem, type, event ) {
		if ( document.createEvent ) {
			event = document.createEvent("MouseEvents");
			event.initMouseEvent(type, true, true, elem.ownerDocument.defaultView,
				0, 0, 0, 0, 0, false, false, false, false, 0, null);
			elem.dispatchEvent( event );

		} else if ( elem.fireEvent ) {
			elem.fireEvent("on"+type);
		}
	},
	
	// Safe object type checking
	is: function( type, obj ) {
		return Object.prototype.toString.call( obj ) === "[object "+ type +"]";
	},
	
	// Logging callbacks
	done: function(failures, total) {},
	log: function(result, message) {},
	testStart: function(name, testEnvironment) {},
	testDone: function(name, failures, total) {},
	moduleStart: function(name, testEnvironment) {},
	moduleDone: function(name, failures, total) {}
};

// Backwards compatibility, deprecated
QUnit.equals = QUnit.equal;
QUnit.same = QUnit.deepEqual;

// Maintain internal state
var config = {
	// The queue of tests to run
	queue: [],

	// block until document ready
	blocking: true,
    
    autorun: true
};

// Load paramaters
(function() {
	var location = window.location || {search: "", protocol: "file:"},
		GETParams = location.search.slice(1).split('&');

	for ( var i = 0; i < GETParams.length; i++ ) {
		GETParams[i] = decodeURIComponent( GETParams[i] );
		if ( GETParams[i] === "noglobals" ) {
			GETParams.splice( i, 1 );
			i--;
			config.noglobals = true;
		} else if ( GETParams[i].search('=') > -1 ) {
			GETParams.splice( i, 1 );
			i--;
		}
	}
	
	// restrict modules/tests by get parameters
	config.filters = GETParams;
	
	// Figure out if we're running the tests from a server or not
	QUnit.isLocal = !!(location.protocol === 'file:');
})();

// Expose the API as global variables, unless an 'exports'
// object exists, in that case we assume we're in CommonJS
if ( typeof exports === "undefined" || typeof require === "undefined" ) {
	extend(window, QUnit);
	window.QUnit = QUnit;
} else {
	extend(exports, QUnit);
	exports.QUnit = QUnit;
}

QUnit.config = config;

if ( typeof document === "undefined" || document.readyState === "complete" ) {
	config.autorun = true;
}

addEvent(window, "load", function() {
	// Initialize the config, saving the execution queue
	var oldconfig = extend({}, config);
	QUnit.init();
	extend(config, oldconfig);

	config.blocking = false;

	var userAgent = id("qunit-userAgent");
	if ( userAgent ) {
		userAgent.innerHTML = navigator.userAgent;
	}
	
	var toolbar = id("qunit-testrunner-toolbar");
	if ( toolbar ) {
		toolbar.style.display = "none";
		
		var filter = document.createElement("input");
		filter.type = "checkbox";
		filter.id = "qunit-filter-pass";
		filter.disabled = true;
		addEvent( filter, "click", function() {
			var li = document.getElementsByTagName("li");
			for ( var i = 0; i < li.length; i++ ) {
				if ( li[i].className.indexOf("pass") > -1 ) {
					li[i].style.display = filter.checked ? "none" : "";
				}
			}
		});
		toolbar.appendChild( filter );

		var label = document.createElement("label");
		label.setAttribute("for", "qunit-filter-pass");
		label.innerHTML = "Hide passed tests";
		toolbar.appendChild( label );

		var missing = document.createElement("input");
		missing.type = "checkbox";
		missing.id = "qunit-filter-missing";
		missing.disabled = true;
		addEvent( missing, "click", function() {
			var li = document.getElementsByTagName("li");
			for ( var i = 0; i < li.length; i++ ) {
				if ( li[i].className.indexOf("fail") > -1 && li[i].innerHTML.indexOf('missing test - untested code is broken code') > - 1 ) {
					li[i].parentNode.parentNode.style.display = missing.checked ? "none" : "block";
				}
			}
		});
		toolbar.appendChild( missing );

		label = document.createElement("label");
		label.setAttribute("for", "qunit-filter-missing");
		label.innerHTML = "Hide missing tests (untested code is broken code)";
		toolbar.appendChild( label );
	}

	var main = id('main');
	if ( main ) {
		config.fixture = main.innerHTML;
	}

	if ( window.jQuery ) {
		config.ajaxSettings = window.jQuery.ajaxSettings;
	}

	if (config.autostart) {
		QUnit.start();
	}
});

function done(testName) {
    
    //if (typeof(QUNIT_TEST_NAME) == 'boolean'
    //    && QUNIT_TEST_NAME == false)
    //    return;
    
    if ( config.doneTimer && window.clearTimeout ) {
		window.clearTimeout( config.doneTimer );
		config.doneTimer = null;
	}

	if ( config.queue.length ) {
		config.doneTimer = window.setTimeout(function(){
			if ( !config.queue.length ) {
				done();
			} else {
				synchronize( done );
			}
		}, 13);

		return;
	}
    
	config.autorun = true;

	// Log the last module results
	if ( config.currentModule ) {
		QUnit.moduleDone( config.currentModule, config.moduleStats.bad, config.moduleStats.all );
	}

        var no_bad = ' no-bad';
        if (config.stats.bad > 0)
            no_bad = '';

    assert_description = '';
    if (typeof(QUNIT_ASSERT) != 'undefined')
    {
        if (typeof(QUNIT_ASSERT_PLUS) == 'undefined')
            QUNIT_ASSERT_PLUS = 0;
        
        var test_unit = ' Tests';
        if (QUNIT_ASSERT < 2)
            test_unit = ' Test';
            
        var remain = QUNIT_ASSERT - config.stats.all + config.stats.bad;
        if (remain > 0)
            remain = '<strong style="color:red" class="remain-flag">'+remain+'</strong>';
        else if (remain < 1)
        {
            if (remain < 0)
            {
                QUNIT_ASSERT = QUNIT_ASSERT - remain;
                QUNIT_ASSERT_PLUS = QUNIT_ASSERT_PLUS - remain;
                remain = 0;
            }
            remain = '<strong style="color:green" class="remain-flag">'+remain+'</strong>';
        }
        
        var _assert_desc = QUNIT_ASSERT;
        if (QUNIT_ASSERT_PLUS > 0)
        {
            _assert_desc += '(+' + QUNIT_ASSERT_PLUS + ')';
        }
        
        assert_description = '<span>Assert '
            + '<strong style="color:green" class="assert-flag">' 
            + _assert_desc + '</strong>' + test_unit 
            + ', Remain ' + remain + test_unit + ' Uncompleted.'
            + ' <br /></span>';
    }

	var banner = id("qunit-banner"),
		tests = id("qunit-tests"),
		html = ['Tests completed in <span class="qunit-excute-time">',
		+new Date - config.started, '</span> milliseconds.<br />', 
        assert_description, 
        '<span class="passed">',
		config.stats.all - config.stats.bad, '</span> tests of <span class="total">', config.stats.all, '</span> passed, <span class="failed'+no_bad+'">', config.stats.bad,'</span> failed.'].join('');

	if ( banner ) {
		banner.className = (config.stats.bad ? "qunit-fail" : "qunit-pass");
	}

	if ( tests ) {	
		var result = id("qunit-testresult");

		if ( !result ) {
			result = document.createElement("p");
			result.id = "qunit-testresult";
			result.className = "result";

                        bottom = document.createElement("p");
			bottom.id = "qunit-testresult-bottom";
			bottom.className = "result";
			tests.parentNode.insertBefore( bottom, tests.nextSibling );
                        tests.parentNode.insertBefore( result, tests.previousSibling );
		}

		result.innerHTML = html;
	}

	QUnit.done( config.stats.bad, config.stats.all );
}

function validTest( name ) {
	var i = config.filters.length,
		run = false;

	if ( !i ) {
		return true;
	}
	
	while ( i-- ) {
		var filter = config.filters[i],
			not = filter.charAt(0) == '!';

		if ( not ) {
			filter = filter.slice(1);
		}

		if ( name.indexOf(filter) !== -1 ) {
			return !not;
		}

		if ( not ) {
			run = true;
		}
	}

	return run;
}

function push(result, actual, expected, message, not_expected) {
	message = message || (result ? "okay" : "failed");
	message = '<span class="test-message" onclick="toggleDetails(this)" style="cursor:pointer;">' + message + "</span>";
        var expectedDatatype = typeof(expected);
	//expected = '<span class="test-expected">' + QUnit.jsDump.parse(expected) + "</span>";
        var actualDatatype = typeof(actual);
	//actual = '<span class="test-actual">' + QUnit.jsDump.parse(actual) + "</span>";
	//QUnit.ok( result, message + ", expected: " + expected + " result: " + actual );

   
   
   var table = "<table><tbody>";
   var expected_desc = 'Expected:';
   if (not_expected == false)
       expected_desc = 'Not Expected:';    
   
   table = "<table style='display:none;'><tbody>";
   //     + "<tr><th align='left'>Result Datatype:</th><td>"+actualDatatype+"</td></tr>"
   table +=  "<tr><th align='left' style='padding-right:1em;'>Result:</th><td style='padding-right:1em;'><span class='test-actual'>"+actual+"</span></td><td style=''>("+actualDatatype+")</td></tr>"
   //     + "<tr><th align='left'>Expected Datatype:</th><td>"+expectedDatatype+"</td></tr>"
        + "<tr><th align='left' style='padding-right:1em;'>" + expected_desc + "</th><td style='padding-right:1em;'><span class='test-expected'>"+expected+"</span></td><td style=''>("+expectedDatatype+")</td></tr>"
        + "</tbody></table>";
    message = message + table;
    
    QUnit.ok( result, message);
}

function synchronize( callback ) {
    
	config.queue.push( callback );
	if ( config.autorun && !config.blocking ) {
		process();
	}
}

function process() {
	var start = (new Date()).getTime();

	while ( config.queue.length && !config.blocking ) {
		if ( config.updateRate <= 0 || (((new Date()).getTime() - start) < config.updateRate) ) {
			config.queue.shift()();

		} else {
			setTimeout( process, 13 );
			break;
		}
	}
}

function saveGlobal() {
	config.pollution = [];
	
	if ( config.noglobals ) {
		for ( var key in window ) {
			config.pollution.push( key );
		}
	}
}

function checkPollution( name ) {
	var old = config.pollution;
	saveGlobal();
	
	var newGlobals = diff( old, config.pollution );
	if ( newGlobals.length > 0 ) {
		ok( false, "Introduced global variable(s): " + newGlobals.join(", ") );
		config.expected++;
	}

	var deletedGlobals = diff( config.pollution, old );
	if ( deletedGlobals.length > 0 ) {
		ok( false, "Deleted global variable(s): " + deletedGlobals.join(", ") );
		config.expected++;
	}
}

// returns a new Array with the elements that are in a but not in b
function diff( a, b ) {
	var result = a.slice();
	for ( var i = 0; i < result.length; i++ ) {
		for ( var j = 0; j < b.length; j++ ) {
			if ( result[i] === b[j] ) {
				result.splice(i, 1);
				i--;
				break;
			}
		}
	}
	return result;
}

function fail(message, exception, callback) {
	if ( typeof console !== "undefined" && console.error && console.warn ) {
		console.error(message);
		console.error(exception);
		console.warn(callback.toString());

	} else if ( window.opera && opera.postError ) {
		opera.postError(message, exception, callback.toString);
	}
}

function extend(a, b) {
	for ( var prop in b ) {
		a[prop] = b[prop];
	}

	return a;
}

function addEvent(elem, type, fn) {
	if ( elem.addEventListener ) {
		elem.addEventListener( type, fn, false );
	} else if ( elem.attachEvent ) {
		elem.attachEvent( "on" + type, fn );
	} else {
		fn();
	}
}

function id(name) {
	return !!(typeof document !== "undefined" && document && document.getElementById) &&
		document.getElementById( name );
}

// Test for equality any JavaScript type.
// Discussions and reference: http://philrathe.com/articles/equiv
// Test suites: http://philrathe.com/tests/equiv
// Author: Philippe Rathé <prathe@gmail.com>
QUnit.equiv = function () {

    var innerEquiv; // the real equiv function
    var callers = []; // stack to decide between skip/abort functions
    var parents = []; // stack to avoiding loops from circular referencing


    // Determine what is o.
    function hoozit(o) {
        if (QUnit.is("String", o)) {
            return "string";
            
        } else if (QUnit.is("Boolean", o)) {
            return "boolean";

        } else if (QUnit.is("Number", o)) {

            if (isNaN(o)) {
                return "nan";
            } else {
                return "number";
            }

        } else if (typeof o === "undefined") {
            return "undefined";

        // consider: typeof null === object
        } else if (o === null) {
            return "null";

        // consider: typeof [] === object
        } else if (QUnit.is( "Array", o)) {
            return "array";
        
        // consider: typeof new Date() === object
        } else if (QUnit.is( "Date", o)) {
            return "date";

        // consider: /./ instanceof Object;
        //           /./ instanceof RegExp;
        //          typeof /./ === "function"; // => false in IE and Opera,
        //                                          true in FF and Safari
        } else if (QUnit.is( "RegExp", o)) {
            return "regexp";

        } else if (typeof o === "object") {
            return "object";

        } else if (QUnit.is( "Function", o)) {
            return "function";
        } else {
            return undefined;
        }
    }

    // Call the o related callback with the given arguments.
    function bindCallbacks(o, callbacks, args) {
        var prop = hoozit(o);
        if (prop) {
            if (hoozit(callbacks[prop]) === "function") {
                return callbacks[prop].apply(callbacks, args);
            } else {
                return callbacks[prop]; // or undefined
            }
        }
    }
    
    var callbacks = function () {

        // for string, boolean, number and null
        function useStrictEquality(b, a) {
            if (b instanceof a.constructor || a instanceof b.constructor) {
                // to catch short annotaion VS 'new' annotation of a declaration
                // e.g. var i = 1;
                //      var j = new Number(1);
                return a == b;
            } else {
                return a === b;
            }
        }

        return {
            "string": useStrictEquality,
            "boolean": useStrictEquality,
            "number": useStrictEquality,
            "null": useStrictEquality,
            "undefined": useStrictEquality,

            "nan": function (b) {
                return isNaN(b);
            },

            "date": function (b, a) {
                return hoozit(b) === "date" && a.valueOf() === b.valueOf();
            },

            "regexp": function (b, a) {
                return hoozit(b) === "regexp" &&
                    a.source === b.source && // the regex itself
                    a.global === b.global && // and its modifers (gmi) ...
                    a.ignoreCase === b.ignoreCase &&
                    a.multiline === b.multiline;
            },

            // - skip when the property is a method of an instance (OOP)
            // - abort otherwise,
            //   initial === would have catch identical references anyway
            "function": function () {
                var caller = callers[callers.length - 1];
                return caller !== Object &&
                        typeof caller !== "undefined";
            },

            "array": function (b, a) {
                var i, j, loop;
                var len;

                // b could be an object literal here
                if ( ! (hoozit(b) === "array")) {
                    return false;
                }   
                
                len = a.length;
                if (len !== b.length) { // safe and faster
                    return false;
                }
                
                //track reference to avoid circular references
                parents.push(a);
                for (i = 0; i < len; i++) {
                    loop = false;
                    for(j=0;j<parents.length;j++){
                        if(parents[j] === a[i]){
                            loop = true;//dont rewalk array
                        }
                    }
                    if (!loop && ! innerEquiv(a[i], b[i])) {
                        parents.pop();
                        return false;
                    }
                }
                parents.pop();
                return true;
            },

            "object": function (b, a) {
                var i, j, loop;
                var eq = true; // unless we can proove it
                var aProperties = [], bProperties = []; // collection of strings

                // comparing constructors is more strict than using instanceof
                if ( a.constructor !== b.constructor) {
                    return false;
                }

                // stack constructor before traversing properties
                callers.push(a.constructor);
                //track reference to avoid circular references
                parents.push(a);
                
                for (i in a) { // be strict: don't ensures hasOwnProperty and go deep
                    loop = false;
                    for(j=0;j<parents.length;j++){
                        if(parents[j] === a[i])
                            loop = true; //don't go down the same path twice
                    }
                    aProperties.push(i); // collect a's properties

                    if (!loop && ! innerEquiv(a[i], b[i])) {
                        eq = false;
                        break;
                    }
                }

                callers.pop(); // unstack, we are done
                parents.pop();

                for (i in b) {
                    bProperties.push(i); // collect b's properties
                }

                // Ensures identical properties name
                return eq && innerEquiv(aProperties.sort(), bProperties.sort());
            }
        };
    }();

    innerEquiv = function () { // can take multiple arguments
        var args = Array.prototype.slice.apply(arguments);
        if (args.length < 2) {
            return true; // end transition
        }

        return (function (a, b) {
            if (a === b) {
                return true; // catch the most you can
            } else if (a === null || b === null || typeof a === "undefined" || typeof b === "undefined" || hoozit(a) !== hoozit(b)) {
                return false; // don't lose time with error prone cases
            } else {
                return bindCallbacks(a, callbacks, [b, a]);
            }

        // apply transition with (1..n) arguments
        })(args[0], args[1]) && arguments.callee.apply(this, args.splice(1, args.length -1));
    };

    return innerEquiv;

}();

/**
 * jsDump
 * Copyright (c) 2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Licensed under BSD (http://www.opensource.org/licenses/bsd-license.php)
 * Date: 5/15/2008
 * @projectDescription Advanced and extensible data dumping for Javascript.
 * @version 1.0.0
 * @author Ariel Flesler
 * @link {http://flesler.blogspot.com/2008/05/jsdump-pretty-dump-of-any-javascript.html}
 */
QUnit.jsDump = (function() {
	function quote( str ) {
		return '"' + str.toString().replace(/"/g, '\\"') + '"';
	};
	function literal( o ) {
		return o + '';	
	};
	function join( pre, arr, post ) {
		var s = jsDump.separator(),
			base = jsDump.indent(),
			inner = jsDump.indent(1);
		if ( arr.join )
			arr = arr.join( ',' + s + inner );
		if ( !arr )
			return pre + post;
		return [ pre, inner + arr, base + post ].join(s);
	};
	function array( arr ) {
		var i = arr.length,	ret = Array(i);					
		this.up();
		while ( i-- )
			ret[i] = this.parse( arr[i] );				
		this.down();
		return join( '[', ret, ']' );
	};
	
	var reName = /^function (\w+)/;
	
	var jsDump = {
		parse:function( obj, type ) { //type is used mostly internally, you can fix a (custom)type in advance
			var	parser = this.parsers[ type || this.typeOf(obj) ];
			type = typeof parser;			
			
			return type == 'function' ? parser.call( this, obj ) :
				   type == 'string' ? parser :
				   this.parsers.error;
		},
		typeOf:function( obj ) {
			var type;
			if ( obj === null ) {
				type = "null";
			} else if (typeof obj === "undefined") {
				type = "undefined";
			} else if (QUnit.is("RegExp", obj)) {
				type = "regexp";
			} else if (QUnit.is("Date", obj)) {
				type = "date";
			} else if (QUnit.is("Function", obj)) {
				type = "function";
			} else if (obj.setInterval && obj.document && !obj.nodeType) {
				type = "window";
			} else if (obj.nodeType === 9) {
				type = "document";
			} else if (obj.nodeType) {
				type = "node";
			} else if (typeof obj === "object" && typeof obj.length === "number" && obj.length >= 0) {
				type = "array";
			} else {
				type = typeof obj;
			}
			return type;
		},
		separator:function() {
			return this.multiline ?	this.HTML ? '<br />' : '\n' : this.HTML ? '&nbsp;' : ' ';
		},
		indent:function( extra ) {// extra can be a number, shortcut for increasing-calling-decreasing
			if ( !this.multiline )
				return '';
			var chr = this.indentChar;
			if ( this.HTML )
				chr = chr.replace(/\t/g,'   ').replace(/ /g,'&nbsp;');
			return Array( this._depth_ + (extra||0) ).join(chr);
		},
		up:function( a ) {
			this._depth_ += a || 1;
		},
		down:function( a ) {
			this._depth_ -= a || 1;
		},
		setParser:function( name, parser ) {
			this.parsers[name] = parser;
		},
		// The next 3 are exposed so you can use them
		quote:quote, 
		literal:literal,
		join:join,
		//
		_depth_: 1,
		// This is the list of parsers, to modify them, use jsDump.setParser
		parsers:{
			window: '[Window]',
			document: '[Document]',
			error:'[ERROR]', //when no parser is found, shouldn't happen
			unknown: '[Unknown]',
			'null':'null',
			undefined:'undefined',
			'function':function( fn ) {
				var ret = 'function',
					name = 'name' in fn ? fn.name : (reName.exec(fn)||[])[1];//functions never have name in IE
				if ( name )
					ret += ' ' + name;
				ret += '(';
				
				ret = [ ret, this.parse( fn, 'functionArgs' ), '){'].join('');
				return join( ret, this.parse(fn,'functionCode'), '}' );
			},
			array: array,
			nodelist: array,
			arguments: array,
			object:function( map ) {
				var ret = [ ];
				this.up();
				for ( var key in map )
					ret.push( this.parse(key,'key') + ': ' + this.parse(map[key]) );
				this.down();
				return join( '{', ret, '}' );
			},
			node:function( node ) {
				var open = this.HTML ? '&lt;' : '<',
					close = this.HTML ? '&gt;' : '>';
					
				var tag = node.nodeName.toLowerCase(),
					ret = open + tag;
					
				for ( var a in this.DOMAttrs ) {
					var val = node[this.DOMAttrs[a]];
					if ( val )
						ret += ' ' + a + '=' + this.parse( val, 'attribute' );
				}
				return ret + close + open + '/' + tag + close;
			},
			functionArgs:function( fn ) {//function calls it internally, it's the arguments part of the function
				var l = fn.length;
				if ( !l ) return '';				
				
				var args = Array(l);
				while ( l-- )
					args[l] = String.fromCharCode(97+l);//97 is 'a'
				return ' ' + args.join(', ') + ' ';
			},
			key:quote, //object calls it internally, the key part of an item in a map
			functionCode:'[code]', //function calls it internally, it's the content of the function
			attribute:quote, //node calls it internally, it's an html attribute value
			string:quote,
			date:quote,
			regexp:literal, //regex
			number:literal,
			'boolean':literal
		},
		DOMAttrs:{//attributes to dump from nodes, name=>realName
			id:'id',
			name:'name',
			'class':'className'
		},
		HTML:false,//if true, entities are escaped ( <, >, \t, space and \n )
		indentChar:'   ',//indentation unit
		multiline:false //if true, items in a collection, are separated by a \n, else just a space.
	};

	return jsDump;
})();

// from Sizzle.js
function getText( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		// Get the text from text nodes and CDATA nodes
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		// Traverse everything else, except comment nodes
		} else if ( elem.nodeType !== 8 ) {
			ret += getText( elem.childNodes );
		}
	}

	return ret;
};



})(this);
