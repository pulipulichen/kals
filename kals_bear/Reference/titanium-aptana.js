/**
 * (Class) The top level Titanium module.
 * @since android, iphone 0.1
 */
Titanium = function() { };

/**
 * (Property) the user-agent string used by Titanium
 * @type string
 */
Titanium.userAgent = '';

/**
 * (Property) the version of Titanium that is executing
 * @type string
 */
Titanium.version = '';

/**
 * (Method) one or more filenames to include as if the Javascript code was written in place. This is similar to a C `#include` function.
 * @param {string} name filename to include
 */
Titanium.include = function(name) {  };

/**
 * (Class) The top level API module. The API module is mainly used for logging.
 * @since android, iphone 0.1
 */
Titanium.API = function() { };

/**
 * (Method) function for logging informational messages
 * @param {string} message the message to log
 */
Titanium.API.info = function(message) {  };

/**
 * (Method) function for logging debug messages
 * @param {string} message the message to log
 */
Titanium.API.debug = function(message) {  };

/**
 * (Method) function for logging warning messages
 * @param {string} message the message to log
 */
Titanium.API.warn = function(message) {  };

/**
 * (Method) function for logging error messages
 * @param {string} message the message to log
 */
Titanium.API.error = function(message) {  };

/**
 * (Method) function for logging custom severity messages
 * @param {string} level the log level
 * @param {} message the message to log
 */
Titanium.API.log = function(level, message) {  };

/**
 * (Class) The top level Accelerometer module. The Accelerometer modules contains methods and properties for using the device accelerometer.
 * @since android, iphone 0.1
 * @example
 * Basic Accelerometer Event
 * 
 * Adds an accelerometer update event listener which prints out the x, y and z axis as the \
 * device is moved. You should generally remove the event when not used to conserve device \
 * resources. If you do not have an active event listener, the accelerometer is turned off to \
 * conserve device resources.
 * 
 * <code>
 * Titanium.Accelerometer.addEventListener('update',function(e)
 * {
 * 	Ti.API.debug("accelerometer - x:"+e.x+",y:"+e.y+",z:"+e.z);
 * });
 * </code>
 */
Titanium.Accelerometer = function() { };

/**
 * (Event) fired when the accelerometer changes
 */
Titanium.Accelerometer.update = function() { };

/**
 * (Class) The top level Analytics module. The Analytics module is used for transmitting developer-defined Analytics event for your application to the Appcelerator Analytics product. It can be used to augment additional context or application-specific information which can then be accessed during analysis using Analytics.
 * @since android, iphone 0.1
 */
Titanium.Analytics = function() { };

/**
 * (Method) send an analytics feature event for the application session
 * @param {string} name the event name
 * @param {} data event data or null if not specified. the object must be serializable as JSON
 */
Titanium.Analytics.featureEvent = function(name, data) {  };

/**
 * (Method) send a analytics settings event for the application session
 * @param {string} name the event name
 * @param {} data event data or null if not specified. the object must be serializable as JSON
 */
Titanium.Analytics.settingsEvent = function(name, data) {  };

/**
 * (Method) send an analytics user event for the application session
 * @param {string} name the event name
 * @param {} data event data or null if not specified. the object must be serializable as JSON
 */
Titanium.Analytics.userEvent = function(name, data) {  };

/**
 * (Method) send an analytics timed event for the application session
 * @param {string} name the event name
 * @param {} start the event start as a Date object
 * @param {date} stop the event end as a Date object
 * @param {} duration the event duration
 * @param {date} data event data or null if not specified. the object must be serializable as JSON
 */
Titanium.Analytics.timedEvent = function(name, start, stop, duration, data) {  };

/**
 * (Method) send an analytics nav event for the application session
 * @param {string} from the `from` location in the nav event
 * @param {} to the `to` location in the nav event
 * @param {string} name the event name
 * @param {} data event data or null if not specified. the object must be serializable as JSON
 */
Titanium.Analytics.navEvent = function(from, to, name, data) {  };

/**
 * (Method) send a generic event for the application session
 * @param {string} type the event type
 * @param {} name the event name
 * @param {string} data event data or null if not specified. the object must be serializable as JSON
 */
Titanium.Analytics.addEvent = function(type, name, data) {  };

/**
 * (Class) The top level App module. The App module is mainly used for accessing information about the application at runtime.
 * @since android, iphone 0.1
 */
Titanium.App = function() { };

/**
 * (Property) the application's app id as specified in Titanium Developer
 * @type string
 */
Titanium.App.id = '';

/**
 * (Property) the application url
 * @type string
 */
Titanium.App.url = '';

/**
 * (Property) the application's globally unique id (this is system generated and consistent through all versions)
 * @type string
 */
Titanium.App.guid = '';

/**
 * (Property) the application's name
 * @type string
 */
Titanium.App.name = '';

/**
 * (Property) the application's version
 * @type string
 */
Titanium.App.version = '';

/**
 * (Property) the application's publisher
 * @type string
 */
Titanium.App.publisher = '';

/**
 * (Property) the application's description
 * @type string
 */
Titanium.App.description = '';

/**
 * (Property) the application's copyright
 * @type string
 */
Titanium.App.copyright = '';

/**
 * (Property) property for controlling whether the phone screen will be locked on idle time. Can be set to true to disable the timer
 * @type boolean
 */
Titanium.App.idleTimerDisabled = false;

/**
 * (Property) the state of the device's proximity detector
 * @type int
 */
Titanium.App.proximityState = 0;

/**
 * (Property) a boolean to indicate whether proximity detection is enabled
 * @type boolean
 */
Titanium.App.proximityDetection = false;

/**
 * (Event) fired when a proximity state changes
 */
Titanium.App.proximity = function() { };

/**
 * (Method) return the arguments passed to the application on startup as a dictionary
 * @return object
 */
Titanium.App.getArguments = function() {  };

/**
 * (Method) fire a cross-context application event. listeners in any Javascript context can receive these events if they have added themselves as a listener with the event name. NOTE: you can only pass JSON serializable data in the data payload of the event object since the data must be transportable between contexts.
 * @param {string} name the event name
 * @param {} data optional data payload for the event. NOTE: you can only pass JSON serializable data since the data must be transportable between contexts.
 */
Titanium.App.fireEvent = function(name, data) {  };

/**
 * (Class) The top level Contacts module. The Contacts module is used accessing the device Address Book.
 * @since android, iphone 0.8
 */
Titanium.Contacts = function() { };

/**
 * (Class) The Database instance returned by `Titanium.Database.open` or `Titanium.Database.install`. 
 * @since android, iphone 0.1
 */
Titanium.Database.DB = function() { };

/**
 * (Property) the last row identifier by the last INSERT query
 * @type int
 */
Titanium.Database.DB.lastInsertRowId = 0;

/**
 * (Property) the number of rows affected by the last query
 * @type int
 */
Titanium.Database.DB.rowsAffected = 0;

/**
 * (Property) the name of the database
 * @type string
 */
Titanium.Database.DB.name = '';

/**
 * (Method) execute a SQL statement against the database and returns a ResultSet
 * @param {string} sql the SQL to execute
 * @param {} vararg one or more optional variable arguments passed to this function or an array of objects to be replaced in the query using `?` substitution.
 * @return object
 */
Titanium.Database.DB.execute = function(sql, vararg) {  };

/**
 * (Method) close the database and release resources from memory. once closed, this instance is no longer valid and must no longer be used.
 */
Titanium.Database.DB.close = function() {  };

/**
 * (Method) remove the database files for this instance from disk. WARNING: this is a destructive operation and cannot be reversed. All data in the database will be lost upon calling this function. Use with caution.
 */
Titanium.Database.DB.remove = function() {  };

/**
 * (Class) The top level Database module. The Database module is used for creating and accessing the in-application Database.
 * @since android, iphone 0.1
 */
Titanium.Database = function() { };

/**
 * (Method) open a database. if it doesn't yet exist, create it.
 * @param {string} name the name of the database
 * @return object
 */
Titanium.Database.open = function(name) {  };

/**
 * (Method) install a database from the application Resources folder (at build time) and return a reference to the opened database. it is safe to call this method multiple times since this method will only install once if it doesn't already exist on the device.
 * @param {string} path the path (relative to the main application Resources folder at build time) to the db to install. this file must be in the SQLite 3 file format.
 * @param {} name the name of the database
 * @return object
 */
Titanium.Database.install = function(path, name) {  };

/**
 * (Class) The ResultSet instance returned by invoking a database SQL `execute`.
 * @since android, iphone 0.1
 */
Titanium.Database.ResultSet = function() { };

/**
 * (Property) the number of rows in the result set
 * @type int
 */
Titanium.Database.ResultSet.rowCount = 0;

/**
 * (Property) returns true if the current row is still valid
 * @type boolean
 */
Titanium.Database.ResultSet.validRow = false;

/**
 * (Method) close the result set and release resources. once closed, this result set must no longer be used
 */
Titanium.Database.ResultSet.close = function() {  };

/**
 * (Method) iterate to the next row in the result set. returns false if no more results are available
 * @return boolean
 */
Titanium.Database.ResultSet.next = function() {  };

/**
 * (Method) retrieve a row value by field index
 * @param {int} index column index (which is zero based)
 * @return object
 */
Titanium.Database.ResultSet.field = function(index) {  };

/**
 * (Method) retrieve a row value by field name
 * @param {string} name column name from SQL query
 * @return object
 */
Titanium.Database.ResultSet.fieldByName = function(name) {  };

/**
 * (Method) return the number of columns in the result set
 * @return int
 */
Titanium.Database.ResultSet.fieldCount = function() {  };

/**
 * (Method) return true if the row is a valid row
 * @return boolean
 */
Titanium.Database.ResultSet.isValidRow = function() {  };

/**
 * (Class) The top level Facebook module. The Facebook module is used for connecting your application with Facebook through Facebook Connect.
 * @since android, iphone 0.8
 */
Titanium.Facebook = function() { };

/**
 * (Property) return true if the user has logged in
 * @type boolean
 */
Titanium.Facebook.loggedIn = false;

/**
 * (Property) the unique user id returned from Facebook. returns 0 if not logged in
 * @type long
 */
Titanium.Facebook.userId = 0;

/**
 * (Property) return a dictionary of permissions with the keys being the name of the permission and the value being a boolean of true if granted, false if not granted
 * @type object
 */
Titanium.Facebook.permissions = new Object();

/**
 * (Property) return the special properties of the session
 * @type object
 */
Titanium.Facebook.session = new Object();

/**
 * (Event) fired at session login
 */
Titanium.Facebook.login = function() { };

/**
 * (Event) fired at session logout
 */
Titanium.Facebook.logout = function() { };

/**
 * (Method) return true if the user has logged in
 */
Titanium.Facebook.isLoggedIn = function() {  };

/**
 * (Method) execute a FQL query against the FB API
 * @param {string} fql the FQL query to execute
 * @param {} callback the callback to execute with results once the query is completed. the result object will contain a `success` boolean to indicate the result.  if `success` is false, the `error` property will give the error message.  the `data` property will contain the result if successfully executed.
 */
Titanium.Facebook.query = function(fql, callback) {  };

/**
 * (Method) execute a FB API execute request
 * @param {string} method method to execute
 * @param {} params JSON serializable object or null (if no parameters) to send with the request
 * @param {object} callback the callback function to execute upon receiving a response. the result object will contain a `success` boolean to indicate the result.  if `success` is false, the `error` property will give the error message.  the `data` property will contain the result if successfully executed.
 * @param {} data the data payload for the request. Must either null, a string or a Blob object.
 */
Titanium.Facebook.execute = function(method, params, callback, data) {  };

/**
 * (Method) execute a stream request to FB
 * @param {string} title the title of the stream post
 * @param {} data the data to include in the post. Must be JSON serializable or null.
 * @param {object} target the target user id to publish the stream or null if the logged in users account
 * @param {} callback the callback function to execute upon receiving a response. the result object will contain a `success` boolean to indicate the result.  if `success` is false, the `error` property will give the error message.  the `data` property will contain the result if successfully executed. the `cancel` property will be set to true if the user cancelled the dialog.
 */
Titanium.Facebook.publishStream = function(title, data, target, callback) {  };

/**
 * (Method) create a FB login button instance
 * @param {object} params the parameters for the request. the following keys are valid: `apikey` (the application API key), `secret` (the application API secret or null if using a session proxy), `sessionProxy` (the URL to the application session proxy), `style` (the button style - which is either `normal` or `wide`).
 * @return object
 */
Titanium.Facebook.createLoginButton = function(params) {  };

/**
 * (Method) request a special permission from the user
 * @param {string} permission name of the permission
 * @param {} callback the callback function to execute upon receiving a response. the result object will contain a `success` boolean to indicate the result.  if `success` is false, the `error` property will give the error message.  the `data` property will contain the result if successfully executed. the `cancel` property will be set to true if the user cancelled the dialog.
 */
Titanium.Facebook.requestPermission = function(permission, callback) {  };

/**
 * (Method) checks the existing permission and returns true if the user has granted the requested permission
 * @param {string} permission the permission to check
 * @return boolean
 */
Titanium.Facebook.hasPermission = function(permission) {  };

/**
 * (Class) The Login Button created by `Titanium.Facebook.createLoginButton`.
 * @since android, iphone 0.8
 */
Titanium.Facebook.LoginButton = function() { };

/**
 * (Event) fired at session login
 */
Titanium.Facebook.LoginButton.login = function() { };

/**
 * (Event) fired at session logout
 */
Titanium.Facebook.LoginButton.logout = function() { };

/**
 * (Event) fired when the login is cancelled
 */
Titanium.Facebook.LoginButton.cancel = function() { };

/**
 * (Class) The top level Filesystem module. The Filesystem module is used for reading and saving files and directories on the device.
 * @since android, iphone 0.1
 */
Titanium.Filesystem = function() { };

/**
 * (Class) The top level Geolocation module. The Geolocation module is used for accessing device location based information.
 * @since android, iphone 0.1
 */
Titanium.Geolocation = function() { };

/**
 * (Property) accuracy constant
 * @type int
 */
Titanium.Geolocation.ACCURACY_BEST = 0;

/**
 * (Property) accuracy constant
 * @type int
 */
Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS = 0;

/**
 * (Property) accuracy constant
 * @type int
 */
Titanium.Geolocation.ACCURACY_HUNDRED_METERS = 0;

/**
 * (Property) accuracy constant
 * @type int
 */
Titanium.Geolocation.ACCURACY_KILOMETER = 0;

/**
 * (Property) accuracy constant
 * @type int
 */
Titanium.Geolocation.ACCURACY_THREE_KILOMETERS = 0;

/**
 * (Property) returns true if the user has enabled or disable location services for the device (not the application). This is an iPhone only property.
 * @type boolean
 */
Titanium.Geolocation.locationServicesEnabled = false;

/**
 * (Property) returns true if the calibration UI can show
 * @type boolean
 */
Titanium.Geolocation.showCalibration = false;

/**
 * (Method) configure the calibration UI. set the false to disable the calibration display.
 */
Titanium.Geolocation.setShowCalibration = function() {  };

/**
 * (Class) The top level Gestures module. The Gesture module is responsible for high level device gestures that are device-wide.
 * @since android, iphone 0.8
 */
Titanium.Gesture = function() { };

/**
 * (Event) fired when the device is shaken
 */
Titanium.Gesture.shake = function() { };

/**
 * (Event) fired when the device orientation changes
 */
Titanium.Gesture.orientationchange = function() { };

/**
 * (Class) An Annotation object that is created by the method `Titanium.Map.createAnnotation`. This object gives you low level control over annotations that can be added to a Map View.
 * @since android, iphone 0.9
 */
Titanium.Map.Annotation = function() { };

/**
 * (Property) the primary title of the annotation view
 * @type string
 */
Titanium.Map.Annotation.title = '';

/**
 * (Property) the secondary title of the annotation view
 * @type string
 */
Titanium.Map.Annotation.subtitle = '';

/**
 * (Property) the pin color as one of `Titanium.Map.ANNOTATION_RED`, `Titanium.Map.ANNOTATION_GREEN` or `Titanium.Map.ANNOTATION_PURPLE`.
 * @type int
 */
Titanium.Map.Annotation.pincolor = 0;

/**
 * (Property) boolean to indicate whether the pin should animate when dropped
 * @type boolean
 */
Titanium.Map.Annotation.animate = false;

/**
 * (Property) the left button image on the annotation. must either be a button type constant or url
 * @type int,string
 */
Titanium.Map.Annotation.leftButton = '';

/**
 * (Property) the right button image on the annotation. must either be a button type constant or url
 * @type int,string
 */
Titanium.Map.Annotation.rightButton = '';

/**
 * (Property) a left view that is displayed on the annotation
 * @type object
 */
Titanium.Map.Annotation.leftView = new Object();

/**
 * (Property) a right view that is displayed on the annotation
 * @type object
 */
Titanium.Map.Annotation.rightView = new Object();

/**
 * (Class) The top level Map module. The Map module is used for creating in-application native maps.
 * @since android, iphone 0.8
 */
Titanium.Map = function() { };

/**
 * (Property) Displays a street map that shows the position of all roads and some road names.
 * @type int
 */
Titanium.Map.STANDARD_TYPE = 0;

/**
 * (Property) Displays satellite imagery of the area.
 * @type int
 */
Titanium.Map.SATELLITE_TYPE = 0;

/**
 * (Property) Displays a satellite image of the area with road and road name information layered on top.
 * @type int
 */
Titanium.Map.HYBRID_TYPE = 0;

/**
 * (Property) The head of the pin is red. Red pins indicate destination points on the map.
 * @type int
 */
Titanium.Map.ANNOTATION_RED = 0;

/**
 * (Property) The head of the pin is green. Green pins indicate starting points on the map.
 * @type int
 */
Titanium.Map.ANNOTATION_GREEN = 0;

/**
 * (Property) The head of the pin is purple. Purple pins indicate user-specified points on the map.
 * @type int
 */
Titanium.Map.ANNOTATION_PURPLE = 0;

/**
 * (Class) The MapView is an object created by [Titanium.Map.createView](Titanium.Map.createView) and is used for embedding native mapping capabilities as a view in your application. With native maps, you can control the mapping location, the type of map, the zoom level and you can add custom annotations directly to the map.
 * @since android, iphone 0.8
 */
Titanium.Map.MapView = function() { };

/**
 * (Property) the map type constant of either `Titanium.Map.STANDARD_TYPE`, `Titanium.Map.SATELLITE_TYPE` or `Titanium.Map.HYBRID_TYPE`.
 * @type int
 */
Titanium.Map.MapView.mapType = 0;

/**
 * (Property) a dictionary that specifies the following properties specifying the region location to set the map: `latitudeDelta`, `longitudeDelta`, `latitude`, `longitude`.
 * @type object
 */
Titanium.Map.MapView.region = new Object();

/**
 * (Property) boolean is mapping actions should be animated
 * @type boolean
 */
Titanium.Map.MapView.animate = false;

/**
 * (Property) boolean to indicate if the map should attempt to fit the map view into the region in the visible view
 * @type boolean
 */
Titanium.Map.MapView.regionFit = false;

/**
 * (Property) boolean to indicate if the map should show the user's current device location as a pin on the map
 * @type boolean
 */
Titanium.Map.MapView.userLocation = false;

/**
 * (Property) a dictionary that specifies the following properties specifying the region location to set the map: `latitudeDelta`, `longitudeDelta`, `latitude`, `longitude`.
 * @type object
 */
Titanium.Map.MapView.location = new Object();

/**
 * (Property) an array of annotations to add to the map
 * @type array
 */
Titanium.Map.MapView.annotations = new Array();

/**
 * (Event) fired when the mapping region changes
 */
Titanium.Map.MapView.regionChanged = function() { };

/**
 * (Event) fired when the map begins loading
 */
Titanium.Map.MapView.loading = function() { };

/**
 * (Event) fired when the map completes loading
 */
Titanium.Map.MapView.complete = function() { };

/**
 * (Event) fired when the map receives a mapping error
 */
Titanium.Map.MapView.error = function() { };

/**
 * (Event) fired when a map view or annotation is touched
 */
Titanium.Map.MapView.click = function() { };

/**
 * (Method) zoom in or out of the map
 * @param {double} level zoom level (can be positive or negative)
 */
Titanium.Map.MapView.zoom = function(level) {  };

/**
 * (Method) cause the annotation to be selected (shown)
 * @param {string,object} annotation either a string of the annotation title or a [Titanium.Map.Annotation](Titanium.Map.Annotation) reference.
 */
Titanium.Map.MapView.selectAnnotation = function(annotation) {  };

/**
 * (Method) cause the annotation to be deselected (hidden)
 * @param {string,object} annotation either a string of the annotation title or a [Titanium.Map.Annotation](Titanium.Map.Annotation) reference.
 */
Titanium.Map.MapView.deselectAnnotation = function(annotation) {  };

/**
 * (Method) add a new annotation to the map
 * @param {object} annotation either a dictionary of properties for the annotation or a [Titanium.Map.Annotation](Titanium.Map.Annotation) instance.
 */
Titanium.Map.MapView.addAnnotation = function(annotation) {  };

/**
 * (Method) add one or more new annotation to the map
 * @param {array} annotations an array of either a dictionary of properties for the annotation or a [Titanium.Map.Annotation](Titanium.Map.Annotation) instance.
 */
Titanium.Map.MapView.addAnnotations = function(annotations) {  };

/**
 * (Method) remove an existing annotation from the map
 * @param {string,object} annotation either a string of the annotation title or a [Titanium.Map.Annotation](Titanium.Map.Annotation) reference.
 */
Titanium.Map.MapView.removeAnnotation = function(annotation) {  };

/**
 * (Method) remove one or more existing annotations from the map
 * @param {array} annotation an array of either a string of the annotation title or a [Titanium.Map.Annotation](Titanium.Map.Annotation) reference.
 */
Titanium.Map.MapView.removeAnnotations = function(annotation) {  };

/**
 * (Class) The top level Media module. The Media module is used accessing the device's media related functionality such as playing audio or recording video.
 * @since android, iphone 0.1
 */
Titanium.Media = function() { };

/**
 * (Property) constant for unknown media error
 * @type int
 */
Titanium.Media.UNKNOWN_ERROR = 0;

/**
 * (Property) constant for media device busy error
 * @type int
 */
Titanium.Media.DEVICE_BUSY = 0;

/**
 * (Property) constant for media no camera error
 * @type int
 */
Titanium.Media.NO_CAMERA = 0;

/**
 * (Property) constant for media no video error
 * @type int
 */
Titanium.Media.NO_VIDEO = 0;

/**
 * (Property) constant for video controls default
 * @type int
 */
Titanium.Media.VIDEO_CONTROL_DEFAULT = 0;

/**
 * (Property) constant for video controls volume only
 * @type int
 */
Titanium.Media.VIDEO_CONTROL_VOLUME_ONLY = 0;

/**
 * (Property) constant for video controls hidden
 * @type int
 */
Titanium.Media.VIDEO_CONTROL_HIDDEN = 0;

/**
 * (Property) constant for video scaling where the scaling is turn off. The movie will not be scaled.
 * @type int
 */
Titanium.Media.VIDEO_SCALING_NONE = 0;

/**
 * (Property) constant for video aspect fit where the movie will be scaled until one dimension fits on the screen exactly. In the other dimension, the region between the edge of the movie and the edge of the screen is filled with a black bar. The aspect ratio of the movie is preserved.
 * @type int
 */
Titanium.Media.VIDEO_SCALING_ASPECT_FIT = 0;

/**
 * (Property) constant for video aspect where the movie will be scaled until the movie fills the entire screen. Content at the edges of the larger of the two dimensions is clipped so that the other dimension fits the screen exactly. The aspect ratio of the movie is preserved.
 * @type int
 */
Titanium.Media.VIDEO_SCALING_ASPECT_FILL = 0;

/**
 * (Property) constant for video aspect where the movie will be scaled until both dimensions fit the screen exactly. The aspect ratio of the movie is not preserved.
 * @type int
 */
Titanium.Media.VIDEO_SCALING_MODE_FILL = 0;

/**
 * (Property) media type constant to signify video
 * @type int
 */
Titanium.Media.MEDIA_TYPE_VIDEO = 0;

/**
 * (Property) media type constant to signify photo
 * @type int
 */
Titanium.Media.MEDIA_TYPE_PHOTO = 0;

/**
 * (Property) media type constant to use high-quality video recording. Recorded files are suitable for on-device playback and for wired transfer to the Desktop using Image Capture; they are likely to be too large for transfer using Wi-Fi.
 * @type int
 */
Titanium.Media.QUALITY_HIGH = 0;

/**
 * (Property) media type constant to use medium-quality video recording. Recorded files can usually be transferred using Wi-Fi. This is the default video quality setting.
 * @type int
 */
Titanium.Media.QUALITY_MEDIUM = 0;

/**
 * (Property) media type constant to use use low-quality video recording. Recorded files can usually be transferred over the cellular network.
 * @type int
 */
Titanium.Media.QUALITY_LOW = 0;

/**
 * (Property) constant for line type headphones
 * @type int
 */
Titanium.Media.AUDIO_HEADPHONES = 0;

/**
 * (Property) constant line type headset in/out
 * @type int
 */
Titanium.Media.AUDIO_HEADSET_INOUT = 0;

/**
 * (Property) constant line type receiver and microphone
 * @type int
 */
Titanium.Media.AUDIO_RECEIVER_AND_MIC = 0;

/**
 * (Property) constant line type headphones and microphone
 * @type int
 */
Titanium.Media.AUDIO_HEADPHONES_AND_MIC = 0;

/**
 * (Property) constant line type line out
 * @type int
 */
Titanium.Media.AUDIO_LINEOUT = 0;

/**
 * (Property) constant line type speaker
 * @type int
 */
Titanium.Media.AUDIO_SPEAKER = 0;

/**
 * (Property) constant line type microphone
 * @type int
 */
Titanium.Media.AUDIO_MICROPHONE = 0;

/**
 * (Property) constant line type muted switch is on
 * @type int
 */
Titanium.Media.AUDIO_MUTED = 0;

/**
 * (Property) constant line type unavailable
 * @type int
 */
Titanium.Media.AUDIO_UNAVAILABLE = 0;

/**
 * (Property) constant line type unknown or not determined
 * @type int
 */
Titanium.Media.AUDIO_UNKNOWN = 0;

/**
 * (Property) audio format Linear 16-bit, PCM encoding
 * @type int
 */
Titanium.Media.AUDIO_FORMAT_LINEAR_PCM = 0;

/**
 * (Property) audio format 8-bit muLaw encoding
 * @type int
 */
Titanium.Media.AUDIO_FORMAT_ULAW = 0;

/**
 * (Property) audio format 8-bit aLaw encoding
 * @type int
 */
Titanium.Media.AUDIO_FORMAT_ALAW = 0;

/**
 * (Property) audio format Apple IMA4 encoding
 * @type int
 */
Titanium.Media.AUDIO_FORMAT_IMA4 = 0;

/**
 * (Property) audio format iLBC encoding
 * @type int
 */
Titanium.Media.AUDIO_FORMAT_ILBC = 0;

/**
 * (Property) audio format apple lossless encoding
 * @type int
 */
Titanium.Media.AUDIO_FORMAT_APPLE_LOSSLESS = 0;

/**
 * (Property) audio format MPEG4 AAC encoding
 * @type int
 */
Titanium.Media.AUDIO_FORMAT_AAC = 0;

/**
 * (Property) audio file format WAVE
 * @type int
 */
Titanium.Media.AUDIO_FILEFORMAT_WAVE = 0;

/**
 * (Property) audio file format AIFF
 * @type int
 */
Titanium.Media.AUDIO_FILEFORMAT_AIFF = 0;

/**
 * (Property) audio file format MP3
 * @type int
 */
Titanium.Media.AUDIO_FILEFORMAT_MP3 = 0;

/**
 * (Property) audio file format MP4
 * @type int
 */
Titanium.Media.AUDIO_FILEFORMAT_MP4 = 0;

/**
 * (Property) audio file format MP4A
 * @type int
 */
Titanium.Media.AUDIO_FILEFORMAT_MP4A = 0;

/**
 * (Property) audio file format Apple Compressed Audio Format (CAF)
 * @type int
 */
Titanium.Media.AUDIO_FILEFORMAT_CAF = 0;

/**
 * (Property) audio file format 3GPP
 * @type int
 */
Titanium.Media.AUDIO_FILEFORMAT_3GPP = 0;

/**
 * (Property) audio file format 3GPP-2
 * @type int
 */
Titanium.Media.AUDIO_FILEFORMAT_3GP2 = 0;

/**
 * (Property) audio file format AMR
 * @type int
 */
Titanium.Media.AUDIO_FILEFORMAT_AMR = 0;

/**
 * (Property) the current volume of the playback device
 * @type float
 */
Titanium.Media.volume = 0.0;

/**
 * (Property) returns true if the device is playing audio
 * @type boolean
 */
Titanium.Media.audioPlaying = false;

/**
 * (Property) returns the line type constant for the current line type
 * @type int
 */
Titanium.Media.audioLineType = 0;

/**
 * (Property) return an array of media type constants supported for the camera
 * @type array
 */
Titanium.Media.availableCameraMediaTypes = new Array();

/**
 * (Property) return an array of media type constants supported for the photo
 * @type array
 */
Titanium.Media.availablePhotoMediaTypes = new Array();

/**
 * (Property) return an array of media type constants supported for saving to the photo gallery
 * @type array
 */
Titanium.Media.availablePhotoGalleryMediaTypes = new Array();

/**
 * (Property) return the current microphone level peak power in dB or -1 if microphone monitoring is disabled
 * @type float
 */
Titanium.Media.peakMicrophonePower = 0.0;

/**
 * (Property) return the current average microphone level in dB or -1 if microphone monitoring is disabled
 * @type float
 */
Titanium.Media.averageMicrophonePower = 0.0;

/**
 * (Event) fired when a audio line type change is detected
 */
Titanium.Media.linechange = function() { };

/**
 * (Event) fired when the volume output changes
 */
Titanium.Media.volume = function() { };

/**
 * (Method) return boolean to indicate if the media type is supported
 * @param {string} media media type as a string of either `camera`, `photo` or `photogallery`.
 * @param {} type the type of media to check
 * @return boolean
 */
Titanium.Media.isMediaTypeSupported = function(media, type) {  };

/**
 * (Method) return boolean to indicate if the device has camera support
 * @return boolean
 */
Titanium.Media.isCameraSupported = function() {  };

/**
 * (Method) show the camera
 * @param {object} options pass a dictionary with the following supported keys: `success` a function that will be called when the camera is completed, `error` a function that will be called upon receiving an error, `cancel` a function that will be called if the user presses the cancel button, `autohide` boolean if the camera should auto hide after the media capture is completed (defaults to true), `animated` boolean if the dialog should be animated (defaults to true) upon showing and hiding, `saveToPhotoGallery` boolean if the media should be saved to the photo gallery upon successful capture, `allowEditing` boolean if the media should be editable after capture in the UI interface, `mediaTypes` an array of media type constants supported by the capture device UI, `videoMaximumDuration` float duration on how long in milliseconds to allow capture before completing, `videoQuality` constant to indicate the video quality during capture, `showControls` boolean to indicate if the built-in UI controls should be displayed, `overlay` view which is added as an overlay to the camera UI (on top), `transform` an transformation matrix that applies to the camera UI transform.
 */
Titanium.Media.showCamera = function(options) {  };

/**
 * (Method) open the photo gallery picker
 * @param {object} options pass a dictionary with the following supported keys: `success` a function that will be called when the camera is completed, `error` a function that will be called upon receiving an error, `cancel` a function that will be called if the user presses the cancel button, `autohide` boolean if the camera should auto hide after the media capture is completed (defaults to true), `animated` boolean if the dialog should be animated (defaults to true) upon showing and hiding, `saveToPhotoGallery` boolean if the media should be saved to the photo gallery upon successful capture, `allowEditing` boolean if the media should be editable after capture in the UI interface, `mediaTypes` an array of media type constants supported by the capture device UI, `showControls` boolean to indicate if the built-in UI controls should be displayed, `overlay` view which is added as an overlay to the UI (on top), `transform` an transformation matrix that applies to the UI transform.
 */
Titanium.Media.openPhotoGallery = function(options) {  };

/**
 * (Method) take a screen shot of the visible UI on the device
 * @param {function} callback function that will be called upon capture. the event property `media` will contain an image Blob object of the screenshot
 */
Titanium.Media.takeScreenshot = function(callback) {  };

/**
 * (Method) save media to photo gallery / camera roll
 * @param {object} media save the media passed to the cameras photo roll/media gallery. must be one of Blob object or File object or an error will be generated.
 */
Titanium.Media.saveToPhotoGallery = function(media) {  };

/**
 * (Method) play a device beep notification
 */
Titanium.Media.beep = function() {  };

/**
 * (Method) play a device vibration
 */
Titanium.Media.vibrate = function() {  };

/**
 * (Method) use the device camera to capture a photo. this must be called after calling `showCamera` and only when `autohide` is set to false. this method will cause the media capture device to capture a photo and call the `success` callback.
 */
Titanium.Media.takePicture = function() {  };

/**
 * (Method) hide the device camera UI. this must be called after calling `showCamera` and only when `autohide` is set to false. this method will cause the media capture device be hidden.
 */
Titanium.Media.hideCamera = function() {  };

/**
 * (Method) start the monitoring of microphone sound level
 */
Titanium.Media.startMicrophoneMonitor = function() {  };

/**
 * (Method) stop the monitoring of microphone sound level
 */
Titanium.Media.stopMicrophoneMonitor = function() {  };

/**
 * (Class) The Sound object is returned by `Titanum.Media.createSound` and is useful for playing basic sounds. The Sound object loads the entire media resource in memory before playing. If you need to support streaming, use the `Titanium.Media.createSoundPlayer` API.
 * @since android, iphone 0.8
 * @example
 * Simple Example
 * 
 * Simple example of playing a WAVE file from the Resources directory.
 * 
 * <code>
 * var player = Ti.UI.createSound({url:"sound.wav"});
 * player.play();
 * </code>
 */
Titanium.Media.Sound = function() { };

/**
 * (Property) the volume of the audio. this volume only affects the media, not the device audio.
 * @type float
 */
Titanium.Media.Sound.volume = 0.0;

/**
 * (Property) the duration of the audio.
 * @type float
 */
Titanium.Media.Sound.duration = 0.0;

/**
 * (Property) the time position of the audio.
 * @type float
 */
Titanium.Media.Sound.time = 0.0;

/**
 * (Property) boolean to indicate if the audio is playing
 * @type boolean
 */
Titanium.Media.Sound.playing = false;

/**
 * (Property) boolean to indicate if the audio is paused
 * @type boolean
 */
Titanium.Media.Sound.paused = false;

/**
 * (Property) boolean to indicate if the audio should loop upon completion
 * @type boolean
 */
Titanium.Media.Sound.looping = false;

/**
 * (Property) url to the audio
 * @type string
 */
Titanium.Media.Sound.url = '';

/**
 * (Event) fired when the audio has completed
 */
Titanium.Media.Sound.complete = function() { };

/**
 * (Event) called when the audio is interrupted by the device. this is typically called during an interruption due to an incoming phone call.
 */
Titanium.Media.Sound.interrupted = function() { };

/**
 * (Event) called when the audio is resumed after an interruption.
 */
Titanium.Media.Sound.resume = function() { };

/**
 * (Event) called when an error is received playing the audio.
 */
Titanium.Media.Sound.error = function() { };

/**
 * (Method) starting playing the source. if paused, will resume.
 */
Titanium.Media.Sound.play = function() {  };

/**
 * (Method) stop playing the audio and reset it to the beginning.
 */
Titanium.Media.Sound.stop = function() {  };

/**
 * (Method) temporarily pause the audio. to resume, invoke `play`.
 */
Titanium.Media.Sound.pause = function() {  };

/**
 * (Method) reset the audio to the beginning.
 */
Titanium.Media.Sound.reset = function() {  };

/**
 * (Method) release all internal resources. this is typically unnecessary but can be useful if you load a large audio file in `app.js` and play it only once and you would like to release all releases after your final play to reduce memory.
 */
Titanium.Media.Sound.release = function() {  };

/**
 * (Method) set the volume of the audio
 */
Titanium.Media.Sound.setVolume = function() {  };

/**
 * (Method) return the value of the audio
 * @return float
 */
Titanium.Media.Sound.getVolume = function() {  };

/**
 * (Method) set the time position of the audio
 */
Titanium.Media.Sound.setTime = function() {  };

/**
 * (Method) return the current time position of the audio
 * @return double
 */
Titanium.Media.Sound.getTime = function() {  };

/**
 * (Method) returns true if the audio is paused
 * @return boolean
 */
Titanium.Media.Sound.isPaused = function() {  };

/**
 * (Method) control whether the audio is paused
 */
Titanium.Media.Sound.setPaused = function() {  };

/**
 * (Method) control whether the audio should loop
 */
Titanium.Media.Sound.setLooping = function() {  };

/**
 * (Method) returns true if the audio will loop
 * @return boolean
 */
Titanium.Media.Sound.isLooping = function() {  };

/**
 * (Method) returns true if the audio is playing
 * @return boolean
 */
Titanium.Media.Sound.isPlaying = function() {  };

/**
 * (Class) The HttpClient instance returned from `Titanium.Network.createHTTPClient`. This object (mostly) implements the XMLHttpRequest specification.
 * @since android, iphone 0.1
 */
Titanium.Network.HTTPClient = function() { };

/**
 * (Property) the response HTTP status code
 * @type int
 */
Titanium.Network.HTTPClient.status = 0;

/**
 * (Property) the readyState value
 * @type int
 */
Titanium.Network.HTTPClient.readyState = 0;

/**
 * (Property) boolean to indicate that the response was successful
 * @type boolean
 */
Titanium.Network.HTTPClient.connected = false;

/**
 * (Property) the response as text or null if an error was received or no data was returned
 * @type string
 */
Titanium.Network.HTTPClient.responseText = '';

/**
 * (Property) the response object as an XML DOMDocument object. returns null if the content type returned by the server was not XML or the content could not be parsed
 * @type object
 */
Titanium.Network.HTTPClient.responseXML = new Object();

/**
 * (Property) the response data as a Blob object.
 * @type object
 */
Titanium.Network.HTTPClient.responseData = new Object();

/**
 * (Property) the connection type, normally either `GET` or `POST`.
 * @type string
 */
Titanium.Network.HTTPClient.connectionType = '';

/**
 * (Property) the absolute URL of the request
 * @type string
 */
Titanium.Network.HTTPClient.location = '';

/**
 * (Property) the UNSET readyState constant
 * @type int
 */
Titanium.Network.HTTPClient.UNSENT = 0;

/**
 * (Property) the OPENED readyState constant
 * @type int
 */
Titanium.Network.HTTPClient.OPENED = 0;

/**
 * (Property) the HEADERS_RECEIVED readyState constant
 * @type int
 */
Titanium.Network.HTTPClient.HEADERS_RECEIVED = 0;

/**
 * (Property) the LOADING readyState constant
 * @type int
 */
Titanium.Network.HTTPClient.LOADING = 0;

/**
 * (Property) the DONE readyState constant
 * @type int
 */
Titanium.Network.HTTPClient.DONE = 0;

/**
 * (Property) set this to a function before calling open to cause the function to be called for each readyState change
 * @type function
 */
Titanium.Network.HTTPClient.onreadystatechange = function() { };

/**
 * (Property) set this to a function before calling open to cause the function to be called upon a successful response
 * @type function
 */
Titanium.Network.HTTPClient.onload = function() { };

/**
 * (Property) set this to a function before calling open to cause the function to be called upon a error response
 * @type function
 */
Titanium.Network.HTTPClient.onerror = function() { };

/**
 * (Property) set this to a function before calling open to cause the function to be called at regular intervals as the request data is being transmitted. the `progress` property of the event will contain a value from 0.0-1.0 with the progress.
 * @type function
 */
Titanium.Network.HTTPClient.onsendstream = function() { };

/**
 * (Property) set this to a function before calling open to cause the function to be called at regular intervals as the request data is being received. the `progress` property of the event will contain a value from 0.0-1.0 with the progress.
 * @type function
 */
Titanium.Network.HTTPClient.ondatastream = function() { };

/**
 * (Method) open the request and ready the connection
 * @param {string} method the HTTP method
 * @param {} url the URL for the request
 * @param {string} async optional property to indicate if asynchronous (default) or not
 */
Titanium.Network.HTTPClient.open = function(method, url, async) {  };

/**
 * (Method) send the request
 * @param {object} data the data to send in the request. can either be null, dictionary, string, File object or Blob.
 */
Titanium.Network.HTTPClient.send = function(data) {  };

/**
 * (Method) abort a pending request
 */
Titanium.Network.HTTPClient.abort = function() {  };

/**
 * (Method) set the request header. Must be called after `open` but before `send`.
 * @param {string} name name of the header
 * @param {} value value of the header
 */
Titanium.Network.HTTPClient.setRequestHeader = function(name, value) {  };

/**
 * (Method) set the request timeout
 * @param {double} timeout the timeout in milliseconds
 */
Titanium.Network.HTTPClient.setTimeout = function(timeout) {  };

/**
 * (Method) return the response header.
 * @param {string} name the header name
 * @return string
 */
Titanium.Network.HTTPClient.getResponseHeader = function(name) {  };

/**
 * (Class) The top level Network module. The Network module is used accessing Networking related functionality.
 * @since android, iphone 0.1
 */
Titanium.Network = function() { };

/**
 * (Property) constant value to indicate that the network is not available
 * @type int
 */
Titanium.Network.NETWORK_NONE = 0;

/**
 * (Property) constant value to indicate that the network is WIFI
 * @type int
 */
Titanium.Network.NETWORK_WIFI = 0;

/**
 * (Property) constant value to indicate that the network is MOBILE
 * @type int
 */
Titanium.Network.NETWORK_MOBILE = 0;

/**
 * (Property) constant value to indicate that the network is LAN
 * @type int
 */
Titanium.Network.NETWORK_LAN = 0;

/**
 * (Property) constant value to indicate that the network is not known
 * @type int
 */
Titanium.Network.NETWORK_UNKNOWN = 0;

/**
 * (Property) constant value for the push notification badge type
 * @type int
 */
Titanium.Network.NOTIFICATION_TYPE_BADGE = 0;

/**
 * (Property) constant value for the push notification alert type
 * @type int
 */
Titanium.Network.NOTIFICATION_TYPE_ALERT = 0;

/**
 * (Property) constant value for the push notification sound type
 * @type int
 */
Titanium.Network.NOTIFICATION_TYPE_SOUND = 0;

/**
 * (Property) readonly boolean value that indicates if the network is reachable to the Internet either via WIFI or Carrier network
 * @type boolean
 */
Titanium.Network.online = false;

/**
 * (Property) the network type name constant. Returns one of `NONE`, `WIFI`, `LAN` or `MOBILE`.
 * @type string
 */
Titanium.Network.networkTypeName = '';

/**
 * (Property) the network type value as a constant.
 * @type int
 */
Titanium.Network.networkType = 0;

/**
 * (Property) the remote device UUID if the device was registered with the Apple Push Notification Service or null if not set. Only available on iPhone.
 * @type string
 */
Titanium.Network.remoteDeviceUUID = '';

/**
 * (Property) returns true if remote notifications have been enabled. Only available on iPhone.
 * @type boolean
 */
Titanium.Network.remoteNotificationsEnabled = false;

/**
 * (Property) returns an array of network type constants enabled for the application. Only available on iPhone.
 * @type array
 */
Titanium.Network.remoteNotificationTypes = new Array();

/**
 * (Event) fired upon a network connectivity change
 */
Titanium.Network.change = function() { };

/**
 * (Method) returns an HttpClient instance
 * @return object
 */
Titanium.Network.createHTTPClient = function() {  };

/**
 * (Method) register for push notifications with the Apple Push Notification Service. Only available on iPhone.
 * @param {object} config dictionary of the following: `types` is an array of type constants that the application would like to receive, `success` is a callback function that is called when the push registration is successfully completed, `error` is a callback function that is called when an error is received during registration and `callback` is a callback function that is invoked upon receiving a new push notification. This method should be called at application startup.
 */
Titanium.Network.registerForPushNotifications = function(config) {  };

/**
 * (Method) encode a URI component part using URI encoding
 * @param {string} value input value to be encoded
 * @return string
 */
Titanium.Network.encodeURIComponent = function(value) {  };

/**
 * (Method) decode a URI component part using URI encoding
 * @param {string} value input value to be decoded
 * @return string
 */
Titanium.Network.decodeURIComponent = function(value) {  };

/**
 * (Method) adds a connectivity listener to listen for network changes. This method has been deprecated in favor of listening for a `change` event.
 * @param {function} callback callback function to invoke upon network connectivity changes
 */
Titanium.Network.addConnectivityListener = function(callback) {  };

/**
 * (Method) removes a connectivity listener. This method has been deprecated in favor of listening for a `change` event.
 * @param {function} callback callback function to remove
 */
Titanium.Network.removeConnectivityListener = function(callback) {  };

/**
 * (Class) The Display Caps object returned by the `Titanium.Platform.displayCaps` property.
 * @since android, iphone 0.8
 */
Titanium.Platform.DisplayCaps = function() { };

/**
 * (Property) returns the density property of the display device.
 * @type string
 */
Titanium.Platform.DisplayCaps.density = '';

/**
 * (Property) the DPI of the display device.
 * @type int
 */
Titanium.Platform.DisplayCaps.dpi = 0;

/**
 * (Property) the width of the device screen
 * @type float
 */
Titanium.Platform.DisplayCaps.platformWidth = 0.0;

/**
 * (Property) the height of the device screen
 * @type float
 */
Titanium.Platform.DisplayCaps.platformHeight = 0.0;

/**
 * (Class) The top level Platform module. The Platform module is used accessing the device's platform related functionality.
 * @since android, iphone 0.1
 */
Titanium.Platform = function() { };

/**
 * (Property) the unique id of the device
 * @type string
 */
Titanium.Platform.id = '';

/**
 * (Property) the name of the platform returned by the device
 * @type string
 */
Titanium.Platform.name = '';

/**
 * (Property) the version of the platform returned by the device
 * @type string
 */
Titanium.Platform.version = '';

/**
 * (Property) the number of processors the device reports
 * @type int
 */
Titanium.Platform.processorCount = 0;

/**
 * (Property) the username of the device, if set
 * @type string
 */
Titanium.Platform.username = '';

/**
 * (Property) the OS architecture, such as 32 bit
 * @type string
 */
Titanium.Platform.ostype = '';

/**
 * (Property) the shortname of the operating system. for example, on an iPhone, will return `iphone`, iPad will return `ipad` and Android will return `android`.
 * @type string
 */
Titanium.Platform.osname = '';

/**
 * (Property) the ip address that the device reports
 * @type string
 */
Titanium.Platform.address = '';

/**
 * (Property) the mac address that the device reports
 * @type string
 */
Titanium.Platform.macaddress = '';

/**
 * (Property) the processor architecture that the device reports
 * @type string
 */
Titanium.Platform.architecture = '';

/**
 * (Property) the model of the phone that the device reports
 * @type string
 */
Titanium.Platform.model = '';

/**
 * (Property) the primary language of the device that the user has enabled
 * @type string
 */
Titanium.Platform.locale = '';

/**
 * (Property) return the DisplayCaps object for platform
 * @type object
 */
Titanium.Platform.displayCaps = new Object();

/**
 * (Property) return the amount of memory available on the device in bytes
 * @type double
 */
Titanium.Platform.availableMemory = 0.0;

/**
 * (Property) boolean to indicate if battery monitoring is enabled
 * @type boolean
 */
Titanium.Platform.batteryMonitoring = false;

/**
 * (Property) constant that represents the state of the battery. this property is only accessible if `batteryMonitoring` is enabled
 * @type int
 */
Titanium.Platform.batteryState = 0;

/**
 * (Property) the current device battery level. this property is only accessible if `batteryMonitoring` is enabled. on iPhone, this level only changes at 5% intervals.
 * @type float
 */
Titanium.Platform.batteryLevel = 0.0;

/**
 * (Property) the battery state is unknown or not monitoring is not enabled
 * @type int
 */
Titanium.Platform.BATTERY_STATE_UNKNOWN = 0;

/**
 * (Property) the device is unplugged
 * @type int
 */
Titanium.Platform.BATTERY_STATE_UNPLUGGED = 0;

/**
 * (Property) the device is plugged in and currently being charged
 * @type int
 */
Titanium.Platform.BATTERY_STATE_CHARGING = 0;

/**
 * (Property) the battery is fully charged
 * @type int
 */
Titanium.Platform.BATTERY_STATE_FULL = 0;

/**
 * (Event) fired when the battery state changes. the battery state changes are only tracked on iPhone at 5% increments.
 */
Titanium.Platform.battery = function() { };

/**
 * (Method) open a URL in the system default manner
 * @param {string} url the url to open
 */
Titanium.Platform.openURL = function(url) {  };

/**
 * (Method) create a globally unique identifier
 * @return string
 */
Titanium.Platform.createUUID = function() {  };

/**
 * (Class) The 2DMatrix is created by `Titanium.UI.create2DMatrix`. The 2D Matrix is an object for holding values for an affine transformation matrix. A 2D matrix is used to rotate, scale, translate, or skew the objects in a two-dimensional space. A 2D matrix is represented by a 3 by 3 matrix. Because the third column is always (0,0,1), the data structure contains values for only the first two columns.
 * @since android, iphone 0.9
 */
Titanium.UI.2DMatrix = function() { };

/**
 * (Property) The entry at position [1,1] in the matrix.
 * @type float
 */
Titanium.UI.2DMatrix.a = 0.0;

/**
 * (Property) The entry at position [1,2] in the matrix.
 * @type float
 */
Titanium.UI.2DMatrix.b = 0.0;

/**
 * (Property) The entry at position [2,1] in the matrix.
 * @type float
 */
Titanium.UI.2DMatrix.c = 0.0;

/**
 * (Property) The entry at position [2,2] in the matrix.
 * @type float
 */
Titanium.UI.2DMatrix.d = 0.0;

/**
 * (Property) The entry at position [3,1] in the matrix.
 * @type float
 */
Titanium.UI.2DMatrix.tx = 0.0;

/**
 * (Property) The entry at position [3,2] in the matrix.
 * @type float
 */
Titanium.UI.2DMatrix.ty = 0.0;

/**
 * (Method) Returns a matrix constructed by translating an existing matrix
 * @param {float} tx The value by which to move x values with the matrix
 * @param {} ty The value by which to move y values with the matrix
 * @return object
 */
Titanium.UI.2DMatrix.translate = function(tx, ty) {  };

/**
 * (Method) Returns a matrix constructed by scaling an existing matrix
 * @param {float} sx The value by which to scale x values of the matrix
 * @param {} sy The value by which to scale y values of the matrix
 * @return object
 */
Titanium.UI.2DMatrix.scale = function(sx, sy) {  };

/**
 * (Method) Returns a matrix constructed by rotating an existing matrix
 * @param {float} angle The angle, in degrees, by which to rotate the matrix. A positive value specifies counterclockwise rotation and a negative value specifies clockwise rotation.
 * @return object
 */
Titanium.UI.2DMatrix.rotate = function(angle) {  };

/**
 * (Method) Returns a matrix constructed by inverting an existing matrix
 */
Titanium.UI.2DMatrix.invert = function() {  };

/**
 * (Method) Returns a matrix constructed by combining two existing matrix.
 * @param {object} t2 The second matrix. This matrix is concatenated to the matrix instance against which the function is invoked.  The result of this function is the first matrix multiplied by the second matrix. You might perform several multiplications in order to create a single matrix that contains the cumulative effects of several transformations. Note that matrix operations are not commutative - the order in which you concatenate matrices is important. That is, the result of multiplying matrix t1 by matrix t2 does not necessarily equal the result of multiplying matrix t2 by matrix t1.
 * @return object
 */
Titanium.UI.2DMatrix.multiply = function(t2) {  };

/**
 * (Class) The 2DMatrix is created by `Titanium.UI.create2DMatrix`. The 2D Matrix is an object for holding values for an affine transformation matrix. A 2D matrix is used to rotate, scale, translate, or skew the objects in a three-dimensional space. A 3D matrix is represented by a 4 by 4 matrix. Because the forth column is always (0,0,1), the data structure contains values for only the first three columns.
 * @since android, iphone 0.9
 */
Titanium.UI.3DMatrix = function() { };

/**
 * (Property) The entry at position [1,1] in the matrix.
 * @type float
 */
Titanium.UI.3DMatrix.m11 = 0.0;

/**
 * (Property) The entry at position [1,2] in the matrix.
 * @type float
 */
Titanium.UI.3DMatrix.m12 = 0.0;

/**
 * (Property) The entry at position [1,3] in the matrix.
 * @type float
 */
Titanium.UI.3DMatrix.m13 = 0.0;

/**
 * (Property) The entry at position [1,4] in the matrix.
 * @type float
 */
Titanium.UI.3DMatrix.m14 = 0.0;

/**
 * (Property) The entry at position [2,1] in the matrix.
 * @type float
 */
Titanium.UI.3DMatrix.m21 = 0.0;

/**
 * (Property) The entry at position [2,2] in the matrix.
 * @type float
 */
Titanium.UI.3DMatrix.m22 = 0.0;

/**
 * (Property) The entry at position [2,3] in the matrix.
 * @type float
 */
Titanium.UI.3DMatrix.m23 = 0.0;

/**
 * (Property) The entry at position [2,4] in the matrix.
 * @type float
 */
Titanium.UI.3DMatrix.m24 = 0.0;

/**
 * (Property) The entry at position [3,1] in the matrix.
 * @type float
 */
Titanium.UI.3DMatrix.m31 = 0.0;

/**
 * (Property) The entry at position [3,2] in the matrix.
 * @type float
 */
Titanium.UI.3DMatrix.m32 = 0.0;

/**
 * (Property) The entry at position [3,3] in the matrix.
 * @type float
 */
Titanium.UI.3DMatrix.m33 = 0.0;

/**
 * (Property) The entry at position [3,4] in the matrix.
 * @type float
 */
Titanium.UI.3DMatrix.m34 = 0.0;

/**
 * (Property) The entry at position [4,1] in the matrix.
 * @type float
 */
Titanium.UI.3DMatrix.m41 = 0.0;

/**
 * (Property) The entry at position [4,2] in the matrix.
 * @type float
 */
Titanium.UI.3DMatrix.m42 = 0.0;

/**
 * (Property) The entry at position [4,3] in the matrix.
 * @type float
 */
Titanium.UI.3DMatrix.m43 = 0.0;

/**
 * (Property) The entry at position [4,4] in the matrix.
 * @type float
 */
Titanium.UI.3DMatrix.m44 = 0.0;

/**
 * (Method) Returns a matrix constructed by translating an existing matrix
 * @param {float} tx The value by which to move x values with the matrix
 * @param {} ty The value by which to move y values with the matrix
 * @param {float} tz The value by which to move z values with the matrix
 * @return object
 */
Titanium.UI.3DMatrix.translate = function(tx, ty, tz) {  };

/**
 * (Method) Returns a matrix constructed by scaling an existing matrix
 * @param {float} sx The value by which to scale x values of the matrix
 * @param {} sy The value by which to scale y values of the matrix
 * @param {float} sz The value by which to scale z values of the matrix
 * @return object
 */
Titanium.UI.3DMatrix.scale = function(sx, sy, sz) {  };

/**
 * (Method) Returns a matrix constructed by rotating an existing matrix
 * @param {float} angle The angle, in degrees, by which to rotate the matrix. A positive value specifies counterclockwise rotation and a negative value specifies clockwise rotation.
 * @param {} x The x part of the vector about which to rotate
 * @param {float} y The y part of the vector about which to rotate
 * @param {} z The z part of the vector about which to rotate
 * @return object
 */
Titanium.UI.3DMatrix.rotate = function(angle, x, y, z) {  };

/**
 * (Method) Returns a matrix constructed by inverting an existing matrix
 */
Titanium.UI.3DMatrix.invert = function() {  };

/**
 * (Method) Returns a matrix constructed by combining two existing matrix.
 * @param {object} t2 The second matrix. This matrix is concatenated to the matrix instance against which the function is invoked.  The result of this function is the first matrix multiplied by the second matrix. You might perform several multiplications in order to create a single matrix that contains the cumulative effects of several transformations. Note that matrix operations are not commutative - the order in which you concatenate matrices is important. That is, the result of multiplying matrix t1 by matrix t2 does not necessarily equal the result of multiplying matrix t2 by matrix t1.
 * @return object
 */
Titanium.UI.3DMatrix.multiply = function(t2) {  };

/**
 * (Class) An Activity Indicator is created by the method `Titanium.UI.createActivityIndicator`. An activity indicator can be used to show the progress of an operation in the UI to let the user know some action is taking place.
 * @since android, iphone 0.8
 * @example
 * Simple Activity Indicator
 * 
 * In this example, we create a basic activity indicator and start it.
 * 
 * <code>
 * var actInd = Titanium.UI.createActivityIndicator({
 * 	height:50,
 * 	width:10
 * });
 * actInd.show();
 * </code>
 */
Titanium.UI.ActivityIndicator = function() { };

/**
 * (Property) the font object for the activity message label
 * @type object
 */
Titanium.UI.ActivityIndicator.font = new Object();

/**
 * (Property) the color of the message label
 * @type string
 */
Titanium.UI.ActivityIndicator.color = '';

/**
 * (Property) the activity message label text
 * @type string
 */
Titanium.UI.ActivityIndicator.message = '';

/**
 * (Property) the style constant of the activity indicator
 * @type int
 */
Titanium.UI.ActivityIndicator.style = 0;

/**
 * (Method) call show to make the activity indicator visible and start spinning
 */
Titanium.UI.ActivityIndicator.show = function() {  };

/**
 * (Method) call hide to make the activity indicator hidden and stop spinning
 */
Titanium.UI.ActivityIndicator.hide = function() {  };

/**
 * (Class) The Alert Dialog is created by `Titanium.UI.createAlertDialog` and allows you to show a modal application dialog.
 * @since android, iphone 0.8
 * @example
 * Simple Alert Dialog
 * 
 * In this example, we show a simple alert dialog.
 * 
 * <code>
 * var alertDialog = Titanium.UI.createAlertDialog({
 * 	title: 'Hello',
 * 	message: 'You got mail',
 * 	buttonNames: ['OK','Doh!']
 * });
 * alertDialog.show();
 * </code>
 */
Titanium.UI.AlertDialog = function() { };

/**
 * (Property) array of button names as strings
 * @type array
 */
Titanium.UI.AlertDialog.buttonNames = new Array();

/**
 * (Property) the title of the dialog
 * @type string
 */
Titanium.UI.AlertDialog.title = '';

/**
 * (Property) the message of the dialog
 * @type string
 */
Titanium.UI.AlertDialog.message = '';

/**
 * (Property) an index to indicate which button should be the cancel button.
 * @type int
 */
Titanium.UI.AlertDialog.cancel = 0;

/**
 * (Event) fired when a button in the dialog is clicked
 */
Titanium.UI.AlertDialog.click = function() { };

/**
 * (Method) cause the dialog to become visible
 */
Titanium.UI.AlertDialog.show = function() {  };

/**
 * (Class) The Animation object is used for specifying lower-level animation properties and more low-level control of events during an animation. The Animation is created by the method `Titanium.UI.createAnimation`.
 * @since android, iphone 0.9
 * @example
 * Animation applied to a view
 * 
 * Create a simple animation and apply it to the view. In this example, the view will animate from red to black to orange over 2 seconds.
 * 
 * <code>
 * var view = Titanium.UI.createView({
 *   backgroundColor:'red'
 * });
 * var animation = Titanium.UI.createAnimation();
 * animation.backgroundColor = 'black';
 * animation.duration = 1000;
 * animation.addEventListener('complete',function()
 * {
 *   animation.removeEventListener('complete',this);
 *   animation.backgroundColor = 'orange';
 *   view.animate(animation);
 * });
 * view.animate(animation);
 * </code>
 */
Titanium.UI.Animation = function() { };

/**
 * (Property) value of the zIndex property to change during animation
 * @type int
 */
Titanium.UI.Animation.zIndex = 0;

/**
 * (Property) value of the left property to change during animation
 * @type float
 */
Titanium.UI.Animation.left = 0.0;

/**
 * (Property) value of the right property to change during animation
 * @type float
 */
Titanium.UI.Animation.right = 0.0;

/**
 * (Property) value of the top property to change during animation
 * @type float
 */
Titanium.UI.Animation.top = 0.0;

/**
 * (Property) value of the bottom property to change during animation
 * @type float
 */
Titanium.UI.Animation.bottom = 0.0;

/**
 * (Property) value of the width property to change during animation
 * @type float
 */
Titanium.UI.Animation.width = 0.0;

/**
 * (Property) value of the height property to change during animation
 * @type float
 */
Titanium.UI.Animation.height = 0.0;

/**
 * (Property) value of the center property to change during animation
 * @type object
 */
Titanium.UI.Animation.center = new Object();

/**
 * (Property) value of the backgroundColor property to change during animation
 * @type string
 */
Titanium.UI.Animation.backgroundColor = '';

/**
 * (Property) value of the color property to change during animation
 * @type string
 */
Titanium.UI.Animation.color = '';

/**
 * (Property) value of the opacity property to change during animation
 * @type float
 */
Titanium.UI.Animation.opacity = 0.0;

/**
 * (Property) value of the opaque property to change during animation
 * @type boolean
 */
Titanium.UI.Animation.opaque = false;

/**
 * (Property) value of the visible property to change during animation
 * @type boolean
 */
Titanium.UI.Animation.visible = false;

/**
 * (Property) value of the transform property to change during animation
 * @type object
 */
Titanium.UI.Animation.transform = new Object();

/**
 * (Property) the duration of time in milliseconds to perform the animation
 * @type float
 */
Titanium.UI.Animation.duration = 0.0;

/**
 * (Property) the curve of the animation
 * @type int
 */
Titanium.UI.Animation.curve = 0;

/**
 * (Property) the number of times the animation should be performed
 * @type int
 */
Titanium.UI.Animation.repeat = 0;

/**
 * (Property) the property specifies if the animation should be replayed in reverse upon completion
 * @type boolean
 */
Titanium.UI.Animation.autoreverse = false;

/**
 * (Property) the duration of time in milliseconds before starting the animation
 * @type float
 */
Titanium.UI.Animation.delay = 0.0;

/**
 * (Property) during a transition animation, this is the constant to the type of transition to use
 * @type int
 */
Titanium.UI.Animation.transition = 0;

/**
 * (Event) fired when the animation starts
 */
Titanium.UI.Animation.start = function() { };

/**
 * (Event) fired when the animation completes
 */
Titanium.UI.Animation.complete = function() { };

/**
 * (Class) A Button is created by the method `Titanium.UI.createButton`.
 * @since android, iphone 0.8
 * @example
 * Simple Button Example
 * 
 * <code>
 * var button = Titanium.UI.createButton({
 *   title: 'Hello'
 * });
 * button.addEventListener('click',function(e)
 * {
 *   Titanium.API.info("You clicked the button");
 * });
 * </code>
 */
Titanium.UI.Button = function() { };

/**
 * (Property) button title
 * @type string
 */
Titanium.UI.Button.title = '';

/**
 * (Property) boolean that indicates if the button is enabled or not
 * @type boolean
 */
Titanium.UI.Button.enabled = false;

/**
 * (Property) the buttons background color
 * @type string
 */
Titanium.UI.Button.backgroundColor = '';

/**
 * (Property) the foreground color of the button text
 * @type string
 */
Titanium.UI.Button.color = '';

/**
 * (Property) the selected color of the button text when the button is in the selected state
 * @type string
 */
Titanium.UI.Button.selectedColor = '';

/**
 * (Property) the font properties of the button
 * @type object
 */
Titanium.UI.Button.font = new Object();

/**
 * (Property) url to a button image that is drawn as the background of the button
 * @type string
 */
Titanium.UI.Button.backgroundImage = '';

/**
 * (Property) url to a button image that is drawn as the background of the button when the button is in the selected state
 * @type string
 */
Titanium.UI.Button.backgroundSelectedImage = '';

/**
 * (Property) url to a button image that is drawn as the background of the button when the button is in the disabled state
 * @type string
 */
Titanium.UI.Button.backgroundDisabledImage = '';

/**
 * (Property) style constant for the type of button
 * @type int
 */
Titanium.UI.Button.style = 0;

/**
 * (Property) the image to display on the button to the left of the title
 * @type string
 */
Titanium.UI.Button.image = '';

/**
 * (Event) fired when the user presses the button
 */
Titanium.UI.Button.click = function() { };

/**
 * (Class) A Button Bar is created by the method `Titanium.UI.createButtonBar`.
 * @since iphone 0.8
 * @example
 * Simple 3 button button bar
 * 
 * <code>
 * var bb1 = Titanium.UI.createButtonBar({
 * 	labels:['One', 'Two', 'Three'],
 * 	backgroundColor:'#336699',
 * 	top:50,
 * 	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
 * 	height:25,
 * 	width:200
 * });
 * win.add(bb1);
 * </code>
 */
Titanium.UI.ButtonBar = function() { };

/**
 * (Property) the background color of the button bar
 * @type string
 */
Titanium.UI.ButtonBar.backgroundColor = '';

/**
 * (Property) the selected index
 * @type int
 */
Titanium.UI.ButtonBar.index = 0;

/**
 * (Property) the style of the button bar
 * @type int
 */
Titanium.UI.ButtonBar.style = 0;

/**
 * (Property) the array of labels for the button bar. each object should have the properties `title`, `image`, `width` and `enabled`.
 * @type array
 */
Titanium.UI.ButtonBar.labels = new Array();

/**
 * (Event) fired when a button on the button bar is clicked
 * @param {int} index the index of the button that was clicked
 */
Titanium.UI.ButtonBar.click = function(index) { };

/**
 * (Class) The Cover Flow view is container for showing animated, three dimensional images in a nice UI. The Cover Flow view is created by the method `Titanium.UI.createCoverFlowView`.
 * @since android, iphone 0.8
 * @example
 * Simple 3 image cover flow example
 * 
 * Create a rounded view.
 * 
 * <code>
 * var view = Titanium.UI.createCoverFlowView({
 * 	images:['a.png','b.png','c.png'],
 * 	backgroundColor:'#000'
 * });
 * window.add(view);
 * </code>
 */
Titanium.UI.CoverFlowView = function() { };

/**
 * (Property) array of images to display in the view
 * @type array
 */
Titanium.UI.CoverFlowView.images = new Array();

/**
 * (Property) index to make selected
 * @type int
 */
Titanium.UI.CoverFlowView.selected = 0;

/**
 * (Event) fired when the user changes the image using a gesture
 */
Titanium.UI.CoverFlowView.change = function() { };

/**
 * (Event) fired when the user clicks on an image
 */
Titanium.UI.CoverFlowView.click = function() { };

/**
 * (Method) change an image for a index
 * @param {int} index index to change
 * @param {} url url to the new image
 */
Titanium.UI.CoverFlowView.setURL = function(index, url) {  };

/**
 * (Class) The Email Dialog is created by `Titanium.UI.createEmailDialog` and allows you to send in application emails on behalf of the application user.
 * @since android, iphone 0.8
 * @example
 * Simple Email Dialog with Attachment
 * 
 * In this example, we send an email with a file attachment.
 * 
 * <code>
 * var emailDialog = Titanium.UI.createEmailDialog()
 * emailDialog.subject = "Hello from Titanium";
 * emailDialog.toRecipients = ['foo@yahoo.com'];
 * emailDialog.messageBody = '<b>Appcelerator Titanium Rocks!</b>';
 * var f = Ti.Filesystem.getFile('cricket.wav');
 * emailDialog.addAttachment(f);
 * emailDialog.open();
 * </code>
 */
Titanium.UI.EmailDialog = function() { };

/**
 * (Property) the subject line for the email
 * @type string
 */
Titanium.UI.EmailDialog.subject = '';

/**
 * (Property) the email message body
 * @type string
 */
Titanium.UI.EmailDialog.messageBody = '';

/**
 * (Property) array of email recipients
 * @type array
 */
Titanium.UI.EmailDialog.toRecipients = new Array();

/**
 * (Property) array of email BCC: recipients
 * @type array
 */
Titanium.UI.EmailDialog.bccRecipients = new Array();

/**
 * (Property) array of email CC: recipients
 * @type array
 */
Titanium.UI.EmailDialog.ccRecipients = new Array();

/**
 * (Property) boolean to indicate whether the email messageBody should be sent as HTML content type. defaults to false
 * @type boolean
 */
Titanium.UI.EmailDialog.html = false;

/**
 * (Property) the bar color of the email dialog window when opened
 * @type string
 */
Titanium.UI.EmailDialog.barColor = '';

/**
 * (Property) constant for the SENT status result
 * @type int
 */
Titanium.UI.EmailDialog.SENT = 0;

/**
 * (Property) constant for the SAVED status result
 * @type int
 */
Titanium.UI.EmailDialog.SAVED = 0;

/**
 * (Property) constant for the CANCELLED status result
 * @type int
 */
Titanium.UI.EmailDialog.CANCELLED = 0;

/**
 * (Property) constant for the FAILED status result
 * @type int
 */
Titanium.UI.EmailDialog.FAILED = 0;

/**
 * (Event) fired when the email dialog has completed sending the email
 */
Titanium.UI.EmailDialog.complete = function() { };

/**
 * (Method) open the email dialog. the email dialog itself is a modal window
 * @param {object} properties object of animation properties. pass `animated` property (as boolean) to indicate if the dialog should be animated on open.
 */
Titanium.UI.EmailDialog.open = function(properties) {  };

/**
 * (Method) add an attachment to the email. the attachment can either be a Blob or File object.
 * @param {object} attachment attachment object as either a Blob or File object
 */
Titanium.UI.EmailDialog.addAttachment = function(attachment) {  };

/**
 * (Class) An Image View is used to display an image or a series of images in an animation. The Image View is created by the method `Titanium.UI.createImageView`.
 * @since android, iphone 0.9
 * @example
 * Basic Image View
 * 
 * In this example, we create a simple image view:
 * 
 * <code>
 * var image = Titanium.UI.createImageView({url:'myimage.png'});
 * view.add(image);
 * </code>
 */
Titanium.UI.ImageView = function() { };

/**
 * (Property) url to the default image to display while loading a remote image
 * @type string
 */
Titanium.UI.ImageView.defaultImage = '';

/**
 * (Property) boolean to indicate if the default image should be displaying while loading a remote image
 * @type boolean
 */
Titanium.UI.ImageView.preventDefaultImage = false;

/**
 * (Property) amount of time in milliseconds to animate one cycle
 * @type float
 */
Titanium.UI.ImageView.duration = 0.0;

/**
 * (Property) number of times to repeat the image animation
 * @type int
 */
Titanium.UI.ImageView.repeatCount = 0;

/**
 * (Property) boolean to indicate if the animation should happen in reverse (from last to first)
 * @type boolean
 */
Titanium.UI.ImageView.reverse = false;

/**
 * (Property) url to the image to display
 * @type string
 */
Titanium.UI.ImageView.url = '';

/**
 * (Property) array of images (either as string url, Blob or File) to display in an animation
 * @type array
 */
Titanium.UI.ImageView.images = new Array();

/**
 * (Property) image to display either as string url, Blob or File
 * @type object
 */
Titanium.UI.ImageView.image = new Object();

/**
 * (Property) width of the image display
 * @type float
 */
Titanium.UI.ImageView.width = 0.0;

/**
 * (Property) height of the image display
 * @type float
 */
Titanium.UI.ImageView.height = 0.0;

/**
 * (Property) readonly boolean to indicate if the animation is paused
 * @type boolean
 */
Titanium.UI.ImageView.paused = false;

/**
 * (Property) readonly boolean to indicate if the animation is animating
 * @type boolean
 */
Titanium.UI.ImageView.animating = false;

/**
 * (Event) fired when either the initial image and/or all of the images in an animation are loaded
 */
Titanium.UI.ImageView.load = function() { };

/**
 * (Event) fired when the animation starts
 */
Titanium.UI.ImageView.start = function() { };

/**
 * (Event) fired for each frame changed during an animation
 */
Titanium.UI.ImageView.change = function() { };

/**
 * (Event) fired when the animation stops
 */
Titanium.UI.ImageView.stop = function() { };

/**
 * (Method) start the image animation. this method only works if you set multiple images
 */
Titanium.UI.ImageView.start = function() {  };

/**
 * (Method) pause a started animation.
 */
Titanium.UI.ImageView.pause = function() {  };

/**
 * (Method) stop a started animation and reset the index to the first image
 */
Titanium.UI.ImageView.stop = function() {  };

/**
 * (Method) return the image as a Blob object
 */
Titanium.UI.ImageView.toBlob = function() {  };

/**
 * (Class) A Label is created by the method `Titanium.UI.createLabel`.
 * @since android, iphone 0.8
 * @example
 * Basic Label
 * 
 * Create a label with a nice text shadow, 48px font that's aligned `center` and height `auto`.
 * 
 * <code>
 * var l2 = Titanium.UI.createLabel({
 * 	text:'Appcelerator',
 * 	height:'auto',
 * 	width:'auto',
 * 	shadowColor:'#aaa',
 * 	shadowOffset:{x:5,y:5},
 * 	color:'#900',
 * 	font:{fontSize:48},
 * 	textAlign:'center'
 * });
 * </code>
 */
Titanium.UI.Label = function() { };

/**
 * (Property) the label font object properties
 * @type object
 */
Titanium.UI.Label.font = new Object();

/**
 * (Property) the text of the label
 * @type string
 */
Titanium.UI.Label.text = '';

/**
 * (Property) the color of the label
 * @type string
 */
Titanium.UI.Label.color = '';

/**
 * (Property) the color of the label when in the highlighted state
 * @type string
 */
Titanium.UI.Label.highlightedColor = '';

/**
 * (Property) the alignment constant or string value such as `left`, `center` or `right`
 * @type string,int
 */
Titanium.UI.Label.textAlign = '';

/**
 * (Property) the text shadow color
 * @type string
 */
Titanium.UI.Label.shadowColor = '';

/**
 * (Property) the shadow offset as a dictionary with the properties `x` and `y`
 * @type object
 */
Titanium.UI.Label.shadowOffset = new Object();

/**
 * (Class) The Option Dialog is created by `Titanium.UI.createOptionDialog` and allows you to show a modal dialog of one or more options to the user.
 * @since android, iphone 0.8
 */
Titanium.UI.OptionDialog = function() { };

/**
 * (Property) array of button names as strings
 * @type array
 */
Titanium.UI.OptionDialog.options = new Array();

/**
 * (Property) the title of the dialog
 * @type string
 */
Titanium.UI.OptionDialog.title = '';

/**
 * (Property) the destructive button (indicated by a visual clue in the UI)
 * @type int
 */
Titanium.UI.OptionDialog.destructive = 0;

/**
 * (Property) an index to indicate which button should be the cancel button
 * @type int
 */
Titanium.UI.OptionDialog.cancel = 0;

/**
 * (Event) fired when a button in the dialog is clicked
 */
Titanium.UI.OptionDialog.click = function() { };

/**
 * (Method) cause the dialog to become visible
 */
Titanium.UI.OptionDialog.show = function() {  };

/**
 * (Class) A Picker is created by the method [Titanium.UI.createPicker](Titanium.UI.createPicker). A Picker can be used to select one or more fixed values.
 * @since android, iphone 0.8
 * @example
 * Basic Single Column Picker
 * 
 * In this basic picker example, we create a one column picker with 4 rows. 
 * 
 * <code>
 * var picker = Titanium.UI.createPicker();
 * var data = [];
 * data[0]=Titanium.UI.createPickerRow({title:'Bananas'});
 * data[1]=Titanium.UI.createPickerRow({title:'Strawberries'});
 * data[2]=Titanium.UI.createPickerRow({title:'Mangos'});
 * data[3]=Titanium.UI.createPickerRow({title:'Grapes'});
 * picker.add(data);
 * </code>
 * 
 * - example : Custom View for Row
 * 
 * In this example, we use a custom label for each row in a column.
 * 
 * <code>
 * var picker = Titanium.UI.createPicker();
 * var row = Titanium.UI.createPickerRow();
 * var label = Titanium.UI.createLabel({
 * 	text:text,
 * 	font:{fontSize:24,fontWeight:'bold'},
 * 	color:text,
 * 	width:'auto',
 * 	height:'auto'
 * });
 * row.add(label);
 * picker.add(row);
 * </code>
 */
Titanium.UI.Picker = function() { };

/**
 * (Property) array of column values
 * @type array
 */
Titanium.UI.Picker.columns = new Array();

/**
 * (Property) the type constant for the picker. One of `Titanium.UI.PICKER_TYPE_PLAIN` (default), `Titanium.UI.PICKER_TYPE_DATE_AND_TIME`, `Titanium.UI.PICKER_TYPE_DATE`, `Titanium.UI.PICKER_TYPE_TIME` or `Titanium.UI.PICKER_TYPE_COUNT_DOWN_TIMER`.
 * @type int
 */
Titanium.UI.Picker.type = 0;

/**
 * (Property) for basic picker, boolean value to indicate whether the visual selection style is shown. On the iPhone, this is a blue selected bar.
 * @type boolean
 */
Titanium.UI.Picker.selectionIndicator = false;

/**
 * (Property) the minimum Date/Time for value for date pickers
 * @type date
 */
Titanium.UI.Picker.minDate = new Date();

/**
 * (Property) the maximum Date/Time for value for date pickers
 * @type date
 */
Titanium.UI.Picker.maxDate = new Date();

/**
 * (Property) the Date/Time value for date pickers
 * @type date
 */
Titanium.UI.Picker.value = new Date();

/**
 * (Property) the duration value in milliseconds for count down timer pickers
 * @type double
 */
Titanium.UI.Picker.countDownDuration = 0.0;

/**
 * (Property) the locale used for displaying Date/Time pickers values
 * @type string
 */
Titanium.UI.Picker.locale = '';

/**
 * (Property) property to set the interval displayed by the minutes wheel (for example, 15 minutes). The interval value must be evenly divided into 60; if it is not, the default value is used. The default and minimum values are 1; the maximum value is 30.
 * @type int
 */
Titanium.UI.Picker.minuteInterval = 0;

/**
 * (Event) fired when the value of a picker row and/or column changes
 */
Titanium.UI.Picker.change = function() { };

/**
 * (Method) add an array of rows, a single row or a column to the picker
 * @param {array,object} data add an array of rows, a single row or a column to the picker
 */
Titanium.UI.Picker.add = function(data) {  };

/**
 * (Method) causes the picker to reload the values from the new column
 * @param {object} column new column to load
 */
Titanium.UI.Picker.reloadColumn = function(column) {  };

/**
 * (Method) get the selected row object for column
 * @param {int} index for the column index, return the row object or nil if not found
 * @return object
 */
Titanium.UI.Picker.getSelectedRow = function(index) {  };

/**
 * (Method) set the column's row to the selected state
 * @param {int} column the column index
 * @param {} row the row index
 * @param {int} animated boolean to indicate if the selection should be animated (default)
 */
Titanium.UI.Picker.setSelectedRow = function(column, row, animated) {  };

/**
 * (Class) The picker row object created by [Titanium.UI.createPickerColumn](Titanium.UI.createPickerColumn).
 * @since android, iphone 0.9
 */
Titanium.UI.PickerColumn = function() { };

/**
 * (Property) number of rows in the column (readonly)
 * @type int
 */
Titanium.UI.PickerColumn.rowCount = 0;

/**
 * (Property) an array of rows
 * @type array
 */
Titanium.UI.PickerColumn.rows = new Array();

/**
 * (Method) a [Titanium.UI.PickerRow](Titanium.UI.PickerRow) object to add to the column
 */
Titanium.UI.PickerColumn.addRow[object] = function() {  };

/**
 * (Method) a [Titanium.UI.PickerRow](Titanium.UI.PickerRow) object to remove
 */
Titanium.UI.PickerColumn.removeRow[object] = function() {  };

/**
 * (Class) The picker row object created by [Titanium.UI.createPickerRow](Titanium.UI.createPickerRow).
 * @since android, iphone 0.9
 */
Titanium.UI.PickerRow = function() { };

/**
 * (Property) when used in the constructor, set the row to selected on initial display
 * @type boolean
 */
Titanium.UI.PickerRow.selected = false;

/**
 * (Property) the display text
 * @type string
 */
Titanium.UI.PickerRow.title = '';

/**
 * (Property) the font size when displaying the text. ignored when using a custom view
 * @type int
 */
Titanium.UI.PickerRow.fontSize = 0;

/**
 * (Class) A Progress Bar is created by the method `Titanium.UI.createProgressBar`.
 * @since android, iphone 0.8
 * @example
 * Simple Progress Bar
 * 
 * In this example we create a progress bar with the min value of `0` and the max value of `10` and the current value of `0`. The change the value of the progress bar to cause it to move, we would set the `value` property to a value between `min` and `max`.
 * 
 * <code>
 * var pb=Titanium.UI.createProgressBar({
 * 	width:250,
 * 	min:0,
 * 	max:10,
 * 	value:0,
 * 	color:'#fff',
 * 	message:'Downloading 0 of 10',
 * 	font:{fontSize:14, fontWeight:'bold'},
 * 	style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
 * });
 * </code>
 */
Titanium.UI.ProgressBar = function() { };

/**
 * (Property) the style of the progress bar
 * @type int
 */
Titanium.UI.ProgressBar.style = 0;

/**
 * (Property) the minimum value of the progress bar
 * @type float
 */
Titanium.UI.ProgressBar.min = 0.0;

/**
 * (Property) the maximum value of the progress bar
 * @type float
 */
Titanium.UI.ProgressBar.max = 0.0;

/**
 * (Property) the current value of the progress bar
 * @type float
 */
Titanium.UI.ProgressBar.value = 0.0;

/**
 * (Property) the font object for the progress bar text
 * @type object
 */
Titanium.UI.ProgressBar.font = new Object();

/**
 * (Property) the color of the progress bar text
 * @type string
 */
Titanium.UI.ProgressBar.color = '';

/**
 * (Property) the progress bar message
 * @type string
 */
Titanium.UI.ProgressBar.message = '';

/**
 * (Class) A Scroll View is used to create a scrollable region of content. Views added to the Scroll View will be scrolled based on the content size of the Scroll View. The Scroll View is created by the method `Titanium.UI.createScrollView`.
 * @since android, iphone 0.9
 * @example
 * Simple Scroll View
 * 
 * Create a scroll view with content.
 * 
 * <code>
 * var scrollView = Titanium.UI.createScrollView({
 * 	contentWidth:'auto',
 * 	contentHeight:'auto',
 * 	top:0,
 * 	showVerticalScrollIndicator:true,
 * 	showHorizontalScrollIndicator:true
 * });
 * var view = Ti.UI.createView({
 * 	backgroundColor:'#336699',
 * 	borderRadius:10,
 * 	width:300,
 * 	height:2000,
 * 	top:10
 * });
 * scrollView.add(view);
 * Titanium.UI.currentWindow.add(scrollView);
 * </code>
 */
Titanium.UI.ScrollView = function() { };

/**
 * (Property) the width of the scrollable area
 * @type float
 */
Titanium.UI.ScrollView.contentWidth = 0.0;

/**
 * (Property) the height of the scrollable area
 * @type float
 */
Titanium.UI.ScrollView.contentHeight = 0.0;

/**
 * (Property) boolean to indicate whether the horizontal scroll indicator is visible
 * @type boolean
 */
Titanium.UI.ScrollView.showHorizontalScrollIndicator = false;

/**
 * (Property) boolean to indicate whether the vertical scroll indicator is visible
 * @type boolean
 */
Titanium.UI.ScrollView.showVerticalScrollIndicator = false;

/**
 * (Property) boolean to control bounce during scrolling
 * @type boolean
 */
Titanium.UI.ScrollView.disableBounce = false;

/**
 * (Property) boolean to control the horizontal bounce during scrolling
 * @type boolean
 */
Titanium.UI.ScrollView.horizontalBounce = false;

/**
 * (Property) boolean to control the vertical bounce during scrolling
 * @type boolean
 */
Titanium.UI.ScrollView.verticalBounce = false;

/**
 * (Property) an object (with x and y properties) to indicate the offset of the content area
 * @type object
 */
Titanium.UI.ScrollView.contentOffset = new Object();

/**
 * (Property) set the zoom scale for the current content area
 * @type float
 */
Titanium.UI.ScrollView.zoomScale = 0.0;

/**
 * (Property) the maximum scale of the content
 * @type float
 */
Titanium.UI.ScrollView.maxZoomScale = 0.0;

/**
 * (Property) the minimum scale of the content
 * @type float
 */
Titanium.UI.ScrollView.minZoomScale = 0.0;

/**
 * (Event) fired when the zoom scale factor changes
 */
Titanium.UI.ScrollView.scale = function() { };

/**
 * (Event) fired when the view is scrolled
 */
Titanium.UI.ScrollView.scroll = function() { };

/**
 * (Method) scrollTo a particular point
 * @param {float} x the x point within the view
 * @param {} y the y point within the view
 */
Titanium.UI.ScrollView.scrollTo = function(x, y) {  };

/**
 * (Class) The Scrollable View provides a view that supports horizontal scrolling on one or more views in a gesture motion. The Scrollable View also optionally supports a visual paging control to indicate the page that the view is visible. The Scrollable View is created by the method `Titanium.UI.createScrollableView`.
 * @since android, iphone 0.8
 */
Titanium.UI.ScrollableView = function() { };

/**
 * (Property) array of view objects to place in the view
 * @type array
 */
Titanium.UI.ScrollableView.views = new Array();

/**
 * (Property) boolean to indicate whether the paging control UI is visible
 * @type boolean
 */
Titanium.UI.ScrollableView.showPagingControl = false;

/**
 * (Property) the height in pixels of the paging control, if visible. defaults to 20
 * @type float
 */
Titanium.UI.ScrollableView.pagingControlHeight = 0.0;

/**
 * (Property) the color of the paging control. defaults to black.
 * @type string
 */
Titanium.UI.ScrollableView.pagingControlColor = '';

/**
 * (Property) the current page visible in the view
 * @type int
 */
Titanium.UI.ScrollableView.currentPage = 0;

/**
 * (Property) the maximum zoom scale for the view
 * @type float
 */
Titanium.UI.ScrollableView.maxZoomScale = 0.0;

/**
 * (Property) the minimum zoom scale for the view
 * @type float
 */
Titanium.UI.ScrollableView.minZoomScale = 0.0;

/**
 * (Event) fired when the page control is touched
 */
Titanium.UI.ScrollableView.click = function() { };

/**
 * (Event) fired when the scroll view is scrolled
 */
Titanium.UI.ScrollableView.scroll = function() { };

/**
 * (Method) scroll to a specific view
 * @param {int,object} view either an integer index or the view object to bring into view as the currentPage
 */
Titanium.UI.ScrollableView.scrollToView = function(view) {  };

/**
 * (Method) add a new view to the Scrollable View
 * @param {object} view the view to add
 */
Titanium.UI.ScrollableView.addView = function(view) {  };

/**
 * (Method) remove an existing view from the Scrollable View
 * @param {object} view the view to remove
 */
Titanium.UI.ScrollableView.removeView = function(view) {  };

/**
 * (Class) A Search Bar is created by the method `Titanium.UI.createSearchBar`.
 * @since android, iphone 0.8
 * @example
 * Simple Search Bar
 * 
 * <code>
 * var search = Titanium.UI.createSearchBar({
 * 	barColor:'#000', 
 * 	showCancel:true,
 * 	height:43,
 * 	top:0,
 * });
 * </code>
 */
Titanium.UI.SearchBar = function() { };

/**
 * (Property) the value of the search bar
 * @type string
 */
Titanium.UI.SearchBar.value = '';

/**
 * (Property) boolean indicates whether the cancel button is displayed
 * @type boolean
 */
Titanium.UI.SearchBar.showCancel = false;

/**
 * (Property) the bar color of the search bar view
 * @type string
 */
Titanium.UI.SearchBar.barColor = '';

/**
 * (Event) fired when the search bar gains focus
 */
Titanium.UI.SearchBar.focus = function() { };

/**
 * (Event) fired when the search bar loses focus
 */
Titanium.UI.SearchBar.blur = function() { };

/**
 * (Event) fired when the value of the search bar changes
 */
Titanium.UI.SearchBar.change = function() { };

/**
 * (Event) fired when keyboard search button is pressed
 */
Titanium.UI.SearchBar.return = function() { };

/**
 * (Event) fired when the cancel button is pressed
 */
Titanium.UI.SearchBar.cancel = function() { };

/**
 * (Method) called to force the search bar to focus
 */
Titanium.UI.SearchBar.focus = function() {  };

/**
 * (Method) called to force the search bar to lose focus
 */
Titanium.UI.SearchBar.blur = function() {  };

/**
 * (Class) A Slider is created by the method `Titanium.UI.createSlider`.
 * @since android, iphone 0.8
 */
Titanium.UI.Slider = function() { };

/**
 * (Property) the value of the slider
 * @type string
 */
Titanium.UI.Slider.value = '';

/**
 * (Property) boolean to indicate the enabled state of the slider
 * @type boolean
 */
Titanium.UI.Slider.enabled = false;

/**
 * (Property) the minimum slider value
 * @type float
 */
Titanium.UI.Slider.min = 0.0;

/**
 * (Property) the maximum slider value
 * @type float
 */
Titanium.UI.Slider.max = 0.0;

/**
 * (Property) the image url to the slider thumb
 * @type string
 */
Titanium.UI.Slider.thumbImage = '';

/**
 * (Property) the image url of the slider thumb when in the selected state
 * @type string
 */
Titanium.UI.Slider.selectedThumbImage = '';

/**
 * (Property) the image url of the slider thumb when in the highlighted state
 * @type string
 */
Titanium.UI.Slider.highlightedThumbImage = '';

/**
 * (Property) the image url of the slider thumb when in the disabled state
 * @type string
 */
Titanium.UI.Slider.disabledThumbImage = '';

/**
 * (Property) the image url of the slider left track
 * @type string
 */
Titanium.UI.Slider.leftTrackImage = '';

/**
 * (Property) the image url of the slider left track when in the selected state
 * @type string
 */
Titanium.UI.Slider.selectedLeftTrackImage = '';

/**
 * (Property) the image url of the slider left track when in the highlighted state
 * @type string
 */
Titanium.UI.Slider.highlightedLeftTrackImage = '';

/**
 * (Property) the image url of the slider left track when in the disabled state
 * @type string
 */
Titanium.UI.Slider.disabledLeftTrackImage = '';

/**
 * (Property) the image url of the slider right track
 * @type string
 */
Titanium.UI.Slider.rightTrackImage = '';

/**
 * (Property) the image url of the slider right track when in the selected state
 * @type string
 */
Titanium.UI.Slider.selectedRightTrackImage = '';

/**
 * (Property) the image url of the slider right track when in the highlighted state
 * @type string
 */
Titanium.UI.Slider.highlightedRightTrackImage = '';

/**
 * (Property) the image url of the slider right track when in the disabled state
 * @type string
 */
Titanium.UI.Slider.disabledRightTrackImage = '';

/**
 * (Event) fired when the value of the slider changes
 * @param {string} value the new value of the slider
 */
Titanium.UI.Slider.change = function(value) { };

/**
 * (Class) A Switch is created by the method `Titanium.UI.createSwitch`.
 * @since android, iphone 0.8
 * @example
 * Simple Switch Example
 * 
 * The following is a simple example of a switch and receiving `change` events.
 * 
 * <code>
 * var basicSwitch = Titanium.UI.createSwitch({
 * 	value:false
 * });
 * basicSwitch.addEventListener('change',function(e)
 * {
 * 	Titanium.API.info('Basic Switch value = ' + e.value + ' act val ' + basicSwitch.value);
 * });
 * </code>
 */
Titanium.UI.Switch = function() { };

/**
 * (Property) boolean for the state of the switch
 * @type boolean
 */
Titanium.UI.Switch.enabled = false;

/**
 * (Property) boolean value of the switch where true is the switch is `on` and false the switch if `off`
 * @type boolean
 */
Titanium.UI.Switch.value = false;

/**
 * (Event) fired when the switch value is changed
 * @param {boolean} value the new value of the switch
 */
Titanium.UI.Switch.change = function(value) { };

/**
 * (Class) A TabGroup Tab instance. Each Tab instance maintains a stack of tab windows. Only one window within in the Tab can be visible at a time. When a window is closed, either by the user or by code, the window is removed from the stack, make the previous window visible. The root tab window cannot be removed. The Tab Group is created by the method `Titanium.UI.createTab`.
 * @since android, iphone 0.8
 * @example
 * Simple Tab Example
 * 
 * In this example, we create a simple tab and add it to a tab group.
 * 
 * <code>
 * var tab = Titanium.UI.createTab({
 * 	window:mywin,
 * 	title:'Hello',
 * 	icon:'myicon.png'
 * });
 * tabGroup.addTab(tab);
 * </code>
 */
Titanium.UI.Tab = function() { };

/**
 * (Property) the root level tab window. all tabs must have at least one root level tab window.
 * @type object
 */
Titanium.UI.Tab.window = new Object();

/**
 * (Property) the title for the tab group for this tab
 * @type string
 */
Titanium.UI.Tab.title = '';

/**
 * (Property) the icon url for the tab group for this tab
 * @type string
 */
Titanium.UI.Tab.icon = '';

/**
 * (Property) the badge value for the tab group for this tab. null indicates no badge is value
 * @type string
 */
Titanium.UI.Tab.badge = '';

/**
 * (Class) The Tab Group allows you to manage a tabbed UI of one or more windows. The Tab Group is created by the method `Titanium.UI.createTabGroup`.
 * @since android, iphone 0.9
 */
Titanium.UI.TabGroup = function() { };

/**
 * (Property) array of tab objects that are managed by the tab group
 * @type array
 */
Titanium.UI.TabGroup.tabs = new Array();

/**
 * (Property) the active tab
 * @type object
 */
Titanium.UI.TabGroup.activeTab = new Object();

/**
 * (Event) fired when the tab group is opened
 */
Titanium.UI.TabGroup.open = function() { };

/**
 * (Event) fired when the tab group is closed
 */
Titanium.UI.TabGroup.close = function() { };

/**
 * (Event) fired when the tab group loses focus
 */
Titanium.UI.TabGroup.blur = function() { };

/**
 * (Event) fired when the tab group gains focus
 */
Titanium.UI.TabGroup.focus = function() { };

/**
 * (Method) add a tab to the tab group
 */
Titanium.UI.TabGroup.addTab = function() {  };

/**
 * (Method) remove a tab from the tab group
 */
Titanium.UI.TabGroup.removeTab = function() {  };

/**
 * (Method) open the tab group and make it visible
 */
Titanium.UI.TabGroup.open = function() {  };

/**
 * (Method) close the tab group and remove it from the UI
 */
Titanium.UI.TabGroup.close = function() {  };

/**
 * (Class) A Tabbed Bar is created by the method `Titanium.UI.createTabbedBar`. The difference between the Tabbed Bar and the Button Bar is that the tabbed bar visually maintains a state (visually distinguished as a pressed or selected look).
 * @since iphone 0.8
 * @example
 * Simple Tabbed Bar with 3 items
 * 
 * <code>
 * var bb1 = Titanium.UI.createTabbedBar({
 * 	labels:['One', 'Two', 'Three'],
 * 	backgroundColor:'#336699',
 * 	top:50,
 * 	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
 * 	height:25,
 * 	width:200
 * });
 * win.add(bb1);
 * </code>
 */
Titanium.UI.TabbedBar = function() { };

/**
 * (Property) the background color of the tabbed bar
 * @type string
 */
Titanium.UI.TabbedBar.backgroundColor = '';

/**
 * (Property) the selected index
 * @type int
 */
Titanium.UI.TabbedBar.index = 0;

/**
 * (Property) the style of the tabbed bar
 * @type int
 */
Titanium.UI.TabbedBar.style = 0;

/**
 * (Property) the array of labels for the tabbed bar. each object should have the properties `title`, `image`, `width` and `enabled`.
 * @type array
 */
Titanium.UI.TabbedBar.labels = new Array();

/**
 * (Event) fired when a button on the tabbed bar is clicked
 * @param {int} index the index of the button that was clicked
 */
Titanium.UI.TabbedBar.click = function(index) { };

/**
 * (Class) A Table View allows you to create a scrollable table of content in a list-based fashion. The Table View is created by the method `Titanium.UI.createTableView`.
 * @since android, iphone 0.8
 */
Titanium.UI.TableView = function() { };

/**
 * (Property) the background color of the table view
 * @type string
 */
Titanium.UI.TableView.backgroundColor = '';

/**
 * (Property) the background image to render in the background of the table view
 * @type string
 */
Titanium.UI.TableView.backgroundImage = '';

/**
 * (Property) the separator style constant. For iPhone, Titanium.UI.iPhone.TableViewSeparatorStyle
 * @type int
 */
Titanium.UI.TableView.separatorStyle = 0;

/**
 * (Property) the separator color color as a hex or named value
 * @type string
 */
Titanium.UI.TableView.separatorColor = '';

/**
 * (Property) the table view header title
 * @type string
 */
Titanium.UI.TableView.headerTitle = '';

/**
 * (Property) the table view footer title
 * @type string
 */
Titanium.UI.TableView.footerTitle = '';

/**
 * (Property) the table view header as a view that will be rendered instead of a label
 * @type object
 */
Titanium.UI.TableView.headerView = new Object();

/**
 * (Property) the table view footer as a view that will be rendered instead of a label
 * @type object
 */
Titanium.UI.TableView.footerView = new Object();

/**
 * (Property) the search field to use for the table view
 * @type object
 */
Titanium.UI.TableView.search = new Object();

/**
 * (Property) boolean to indicate if the table view should autohide the search field
 * @type boolean
 */
Titanium.UI.TableView.autoHideSearch = false;

/**
 * (Property) boolean to control the visibility of the search field
 * @type boolean
 */
Titanium.UI.TableView.searchHidden = false;

/**
 * (Property) the filter attribute to be used when searching. this property maps to your data object or a property on the row object
 * @type string
 */
Titanium.UI.TableView.filterAttribute = '';

/**
 * (Property) boolean to indicate if the search should be case sensitive or case insensitive (default)
 * @type boolean
 */
Titanium.UI.TableView.filterCaseInsensitive = false;

/**
 * (Property) an array of objects (with title and index properties) to control the table view index
 * @type array
 */
Titanium.UI.TableView.index = new Array();

/**
 * (Property) allow the table view to be editable (this must be true for swipe-to-delete)
 * @type boolean
 */
Titanium.UI.TableView.editable = false;

/**
 * (Property) boolean to control the editing state of the table view
 * @type boolean
 */
Titanium.UI.TableView.editing = false;

/**
 * (Property) boolean to control the moveable state of the table view
 * @type boolean
 */
Titanium.UI.TableView.moving = false;

/**
 * (Property) default row height for table view rows
 * @type float
 */
Titanium.UI.TableView.rowHeight = 0.0;

/**
 * (Property) min row height for table view rows
 * @type float
 */
Titanium.UI.TableView.minRowHeight = 0.0;

/**
 * (Property) max row height for table view rows
 * @type float
 */
Titanium.UI.TableView.maxRowHeight = 0.0;

/**
 * (Property) the data array of objects to be used for the rows of the table view
 * @type array
 */
Titanium.UI.TableView.data = new Array();

/**
 * (Property) iPhone only. the style of the table view. constant from [Titanium.UI.iPhone.TableViewStyle](Titanium.UI.iPhone.TableViewStyle)
 * @type int
 */
Titanium.UI.TableView.style = 0;

/**
 * (Event) fired when a table row is delete by the user
 */
Titanium.UI.TableView.delete = function() { };

/**
 * (Event) fired when a table row is moved by the user
 */
Titanium.UI.TableView.move = function() { };

/**
 * (Event) fired when a table row is clicked
 */
Titanium.UI.TableView.click = function() { };

/**
 * (Method) set the data in the table, optionally with animation
 * @param {array} data data array of rows either as objects or row objects
 * @param {} properties animation properties
 */
Titanium.UI.TableView.setData = function(data, properties) {  };

/**
 * (Method) append a row to the table, optionally with animation
 * @param {object} row row to append
 * @param {} properties animation properties
 */
Titanium.UI.TableView.appendRow = function(row, properties) {  };

/**
 * (Method) update an existing row, optionally with animation
 * @param {object} row row data to update
 * @param {} properties animation properties
 */
Titanium.UI.TableView.updateRow = function(row, properties) {  };

/**
 * (Method) delete an existing row, optionally with animation
 * @param {object} row row to delete
 * @param {} properties animation properties
 */
Titanium.UI.TableView.deleteRow = function(row, properties) {  };

/**
 * (Method) insert a row before another row, optionally with animation
 * @param {int} index index
 * @param {} row row to insert
 * @param {object} properties animation properties
 */
Titanium.UI.TableView.insertRowAfter = function(index, row, properties) {  };

/**
 * (Method) insert a row after another row, optionally with animation
 * @param {int} index index
 * @param {} row row to insert
 * @param {object} properties animation properties
 */
Titanium.UI.TableView.insertRowBefore = function(index, row, properties) {  };

/**
 * (Method) scroll to a specific row index and ensure that that row is on screen
 * @param {int} index index
 * @param {} properties animation properties. `position` property controls the position constant to use for position (on iPhone, use constants from Titanium.UI.iPhone.TableViewScrollPosition).
 */
Titanium.UI.TableView.scrollToIndex = function(index, properties) {  };

/**
 * (Class) A TableView row object created by the method `Titanium.UI.createTableViewRow`.
 * @since android, iphone 0.9
 * @example
 * Simple Table View Row example
 * 
 * In this simple example, we create a table view row with a red square in the cell.
 * 
 * <code>
 * var row = Titanium.UI.createTableViewRow();
 * var view = Titanium.UI.createView({backgroundColor:'red',width:20,height:20});
 * row.height = 'auto';
 * row.add(view);
 * </code>
 */
Titanium.UI.TableViewRow = function() { };

/**
 * (Property) the height of the row. specify `auto` to calculate the row height based on the size of the child views of the row
 * @type float
 */
Titanium.UI.TableViewRow.height = 0.0;

/**
 * (Property) the class name of the table. each table view cell must have a unique class name if the cell layout is different. however, use the same name for rows that have the same structural layout (even if the content is different) to provide maximum rendering performance.
 * @type string
 */
Titanium.UI.TableViewRow.className = '';

/**
 * (Property) the layout algorithm to use for the layout. either absolute (default) or vertical.
 * @type string
 */
Titanium.UI.TableViewRow.layout = '';

/**
 * (Property) the title cell value. do not specify if using views as children of the row
 * @type string
 */
Titanium.UI.TableViewRow.title = '';

/**
 * (Property) the background cell color
 * @type string
 */
Titanium.UI.TableViewRow.backgroundColor = '';

/**
 * (Property) the background cell image
 * @type string
 */
Titanium.UI.TableViewRow.backgroundImage = '';

/**
 * (Property) the background image to render when the row cell is selected
 * @type string
 */
Titanium.UI.TableViewRow.selectedBackgroundImage = '';

/**
 * (Property) the background color to render when the row cell is selected
 * @type string
 */
Titanium.UI.TableViewRow.selectedBackgroundColor = '';

/**
 * (Property) image url to render in the left image area of the row cell
 * @type string
 */
Titanium.UI.TableViewRow.leftImage = '';

/**
 * (Property) image url to render in the right image area of the row cell
 * @type string
 */
Titanium.UI.TableViewRow.rightImage = '';

/**
 * (Property) render a system provided right arrow in the right image area of the row cell
 * @type boolean
 */
Titanium.UI.TableViewRow.hasChild = false;

/**
 * (Property) render a system provided check mark in the right image area of the row cell
 * @type boolean
 */
Titanium.UI.TableViewRow.hasCheck = false;

/**
 * (Property) render a system provided blue indicator icon in the right image area of the row cell
 * @type boolean
 */
Titanium.UI.TableViewRow.hasDetail = false;

/**
 * (Property) the indention level for the cell (defaults to 0)
 * @type int
 */
Titanium.UI.TableViewRow.indentionLevel = 0;

/**
 * (Property) a selection style constant to control the selection color. For iPhone, use the constants from Titanium.UI.iPhone.TableViewCellSelectionStyle
 * @type int
 */
Titanium.UI.TableViewRow.selectionStyle = 0;

/**
 * (Event) fired when the row is clicked. row events automatically propagate to the section and table view if an event listener is not added directly to the cell.
 */
Titanium.UI.TableViewRow.click = function() { };

/**
 * (Class) A TableView section object created by the method `Titanium.UI.createTableViewSection`.
 * @since android, iphone 0.9
 */
Titanium.UI.TableViewSection = function() { };

/**
 * (Property) the title of the section header
 * @type string
 */
Titanium.UI.TableViewSection.headerTitle = '';

/**
 * (Property) a view to use instead of the default label when rendering the section header
 * @type object
 */
Titanium.UI.TableViewSection.headerView = new Object();

/**
 * (Property) the title of the section footer
 * @type string
 */
Titanium.UI.TableViewSection.footerTitle = '';

/**
 * (Property) a view to use instead of the default label when rendering the section footer
 * @type object
 */
Titanium.UI.TableViewSection.footerView = new Object();

/**
 * (Property) the (readonly) number of rows in the section
 * @type int
 */
Titanium.UI.TableViewSection.rowCount = 0;

/**
 * (Method) retrieve the row object at a specific index
 */
Titanium.UI.TableViewSection.rowAtIndex = function() {  };

/**
 * (Method) add a row to the section
 * @param {object} row the row object to add to the section
 */
Titanium.UI.TableViewSection.add = function(row) {  };

/**
 * (Method) remove a remove from the section
 * @param {object} row the row object to remove from the section
 */
Titanium.UI.TableViewSection.remove = function(row) {  };

/**
 * (Class) A Text Area is created by the method `Titanium.UI.createTextArea`. The Text Area is a multiline field.
 * @since android, iphone 0.8
 * @example
 * Basic Text Area with Customizations
 * 
 * This example created a highly customized text area.
 * 
 * <code>
 * var ta1 = Titanium.UI.createTextArea({
 * 	value:'I am a textarea',
 * 	height:70,
 * 	width:300,
 * 	top:60,
 * 	font:{fontSize:20,fontFamily:'Marker Felt', fontWeight:'bold'},
 * 	color:'#888',
 * 	textAlign:'left',
 * 	appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,	
 * 	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
 * 	returnKeyType:Titanium.UI.RETURNKEY_EMERGENCY_CALL,
 * 	borderWidth:2,
 * 	borderColor:'#bbb',
 * 	borderRadius:5
 * });
 * </code>
 */
Titanium.UI.TextArea = function() { };

/**
 * (Property) boolean indicating the enabled state of the field
 * @type boolean
 */
Titanium.UI.TextArea.enabled = false;

/**
 * (Property) boolean indicating if the field is editable
 * @type boolean
 */
Titanium.UI.TextArea.editable = false;

/**
 * (Property) value of the background color of the field
 * @type string
 */
Titanium.UI.TextArea.backgroundColor = '';

/**
 * (Property) value of the field
 * @type string
 */
Titanium.UI.TextArea.value = '';

/**
 * (Property) array of toolbar button objects to be used when the keyboard is displayed
 * @type array
 */
Titanium.UI.TextArea.keyboardToolbar = new Array();

/**
 * (Property) the color of the keyboard toolbar
 * @type string
 */
Titanium.UI.TextArea.keyboardToolbarColor = '';

/**
 * (Property) the height of the keyboard toolbar
 * @type float
 */
Titanium.UI.TextArea.keyboardToolbarHeight = 0.0;

/**
 * (Event) fired when the field gains focus
 */
Titanium.UI.TextArea.focus = function() { };

/**
 * (Event) fired when the field loses focus
 */
Titanium.UI.TextArea.blur = function() { };

/**
 * (Event) fired when the field return key is pressed on the keyboard
 */
Titanium.UI.TextArea.return = function() { };

/**
 * (Event) fired when the field value changes
 */
Titanium.UI.TextArea.change = function() { };

/**
 * (Event) fired when the text in the field is selected
 */
Titanium.UI.TextArea.selected = function() { };

/**
 * (Method) force the field to gain focus
 */
Titanium.UI.TextArea.focus = function() {  };

/**
 * (Method) force the field to lose focus
 */
Titanium.UI.TextArea.blur = function() {  };

/**
 * (Method) return boolean (true) if the field has text
 */
Titanium.UI.TextArea.hasText = function() {  };

/**
 * (Class) A Text Area is created by the method `Titanium.UI.createTextField`. The Text Field is a single line field.
 * @since android, iphone 0.8
 * @example
 * Basic Text Field with rounded border
 * 
 * Create a simple text field with a round border style.
 * 
 * <code>
 * var tf1 = Titanium.UI.createTextField({
 * 	color:'#336699',
 * 	height:35,
 * 	top:10,
 * 	left:10,
 * 	width:250,
 * 	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
 * });
 * </code>
 */
Titanium.UI.TextField = function() { };

/**
 * (Property) the left padding of the text field
 * @type float
 */
Titanium.UI.TextField.paddingLeft = 0.0;

/**
 * (Property) the left padding of the space between the button and the edge of the field
 * @type float
 */
Titanium.UI.TextField.leftButtonPadding = 0.0;

/**
 * (Property) the right padding of the text field
 * @type float
 */
Titanium.UI.TextField.paddingRight = 0.0;

/**
 * (Property) the right padding of the space between the button and the edge of the field
 * @type float
 */
Titanium.UI.TextField.rightButtonPadding = 0.0;

/**
 * (Property) the image url to the background image of the field
 * @type string
 */
Titanium.UI.TextField.backgroundImage = '';

/**
 * (Property) the image url to the background image of the field when in the disabled state
 * @type string
 */
Titanium.UI.TextField.backgroundDisabledImage = '';

/**
 * (Property) the hint text to display when the field is unfocused
 * @type string
 */
Titanium.UI.TextField.hintText = '';

/**
 * (Property) boolean that indicates if the value of the field is cleared upon editing
 * @type boolean
 */
Titanium.UI.TextField.clearOnEdit = false;

/**
 * (Property) the border style constant for the field
 * @type int
 */
Titanium.UI.TextField.borderStyle = 0;

/**
 * (Property) the mode constant for how to handle displaying the clear button
 * @type int
 */
Titanium.UI.TextField.clearButtonMode = 0;

/**
 * (Property) the left button view
 * @type object
 */
Titanium.UI.TextField.leftButton = new Object();

/**
 * (Property) the mode of the left button view
 * @type int
 */
Titanium.UI.TextField.leftButtonMode = 0;

/**
 * (Property) the right button view
 * @type object
 */
Titanium.UI.TextField.rightButton = new Object();

/**
 * (Property) the mode of the right button view
 * @type int
 */
Titanium.UI.TextField.rightButtonMode = 0;

/**
 * (Property) the constant or string value for the fields vertical alignment.
 * @type int,string
 */
Titanium.UI.TextField.verticalAlign = '';

/**
 * (Property) boolean indicating the enabled state of the field
 * @type boolean
 */
Titanium.UI.TextField.enabled = false;

/**
 * (Property) boolean indicating if the field is editable
 * @type boolean
 */
Titanium.UI.TextField.editable = false;

/**
 * (Property) value of the background color of the field
 * @type string
 */
Titanium.UI.TextField.backgroundColor = '';

/**
 * (Property) value of the field
 * @type string
 */
Titanium.UI.TextField.value = '';

/**
 * (Property) array of toolbar button objects to be used when the keyboard is displayed
 * @type array
 */
Titanium.UI.TextField.keyboardToolbar = new Array();

/**
 * (Property) the color of the keyboard toolbar
 * @type string
 */
Titanium.UI.TextField.keyboardToolbarColor = '';

/**
 * (Property) the height of the keyboard toolbar
 * @type float
 */
Titanium.UI.TextField.keyboardToolbarHeight = 0.0;

/**
 * (Event) fired when the field gains focus
 */
Titanium.UI.TextField.focus = function() { };

/**
 * (Event) fired when the field loses focus
 */
Titanium.UI.TextField.blur = function() { };

/**
 * (Event) fired when the field return key is pressed on the keyboard
 */
Titanium.UI.TextField.return = function() { };

/**
 * (Event) fired when the field value changes
 */
Titanium.UI.TextField.change = function() { };

/**
 * (Method) force the field to gain focus
 */
Titanium.UI.TextField.focus = function() {  };

/**
 * (Method) force the field to lose focus
 */
Titanium.UI.TextField.blur = function() {  };

/**
 * (Method) return boolean (true) if the field has text
 */
Titanium.UI.TextField.hasText = function() {  };

/**
 * (Class) A Toolbar is created by the method `Titanium.UI.createToolbar`. A Toolbar can be placed at the bottom of a window and contain buttons.
 * @since iphone 0.8
 */
Titanium.UI.Toolbar = function() { };

/**
 * (Class) The main `Titanium.UI` module. The UI module is responsible for native user-interface components and interaction inside Titanium. The goal of the UI module is to provide a native experience along with native performance by compiling Javascript code into their native counterparts as part of the build process. 
 * @since android, iphone 0.4
 */
Titanium.UI = function() { };

/**
 * (Property) animation curve constant
 * @type int
 */
Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT = 0;

/**
 * (Property) animation curve constant
 * @type int
 */
Titanium.UI.ANIMATION_CURVE_EASE_IN = 0;

/**
 * (Property) animation curve constant
 * @type int
 */
Titanium.UI.ANIMATION_CURVE_EASE_OUT = 0;

/**
 * (Property) animation curve constant
 * @type int
 */
Titanium.UI.ANIMATION_CURVE_LINEAR = 0;

/**
 * (Property) text align constant
 * @type int
 */
Titanium.UI.TEXT_ALIGNMENT_LEFT = 0;

/**
 * (Property) text align constant
 * @type int
 */
Titanium.UI.TEXT_ALIGNMENT_CENTER = 0;

/**
 * (Property) text align constant
 * @type int
 */
Titanium.UI.TEXT_ALIGNMENT_RIGHT = 0;

/**
 * (Property) text vertical align constant
 * @type int
 */
Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP = 0;

/**
 * (Property) text vertical align constant
 * @type int
 */
Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER = 0;

/**
 * (Property) text vertical align constant
 * @type int
 */
Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM = 0;

/**
 * (Property) textfield return key constant
 * @type int
 */
Titanium.UI.RETURNKEY_DEFAULT = 0;

/**
 * (Property) textfield return key constant
 * @type int
 */
Titanium.UI.RETURNKEY_GO = 0;

/**
 * (Property) textfield return key constant
 * @type int
 */
Titanium.UI.RETURNKEY_GOOGLE = 0;

/**
 * (Property) textfield return key constant
 * @type int
 */
Titanium.UI.RETURNKEY_JOIN = 0;

/**
 * (Property) textfield return key constant
 * @type int
 */
Titanium.UI.RETURNKEY_NEXT = 0;

/**
 * (Property) textfield return key constant
 * @type int
 */
Titanium.UI.RETURNKEY_ROUTE = 0;

/**
 * (Property) textfield return key constant
 * @type int
 */
Titanium.UI.RETURNKEY_SEARCH = 0;

/**
 * (Property) textfield return key constant
 * @type int
 */
Titanium.UI.RETURNKEY_SEND = 0;

/**
 * (Property) textfield return key constant
 * @type int
 */
Titanium.UI.RETURNKEY_YAHOO = 0;

/**
 * (Property) textfield return key constant
 * @type int
 */
Titanium.UI.RETURNKEY_DONE = 0;

/**
 * (Property) textfield return key constant
 * @type int
 */
Titanium.UI.RETURNKEY_EMERGENCY_CALL = 0;

/**
 * (Property) textfield keyboard constant
 * @type int
 */
Titanium.UI.KEYBOARD_DEFAULT = 0;

/**
 * (Property) textfield keyboard constant
 * @type int
 */
Titanium.UI.KEYBOARD_ASCII = 0;

/**
 * (Property) textfield keyboard constant
 * @type int
 */
Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION = 0;

/**
 * (Property) textfield keyboard constant
 * @type int
 */
Titanium.UI.KEYBOARD_URL = 0;

/**
 * (Property) textfield keyboard constant
 * @type int
 */
Titanium.UI.KEYBOARD_NUMBER_PAD = 0;

/**
 * (Property) textfield keyboard constant
 * @type int
 */
Titanium.UI.KEYBOARD_PHONE_PAD = 0;

/**
 * (Property) textfield keyboard constant
 * @type int
 */
Titanium.UI.KEYBOARD_NAMEPHONE_PAD = 0;

/**
 * (Property) textfield keyboard constant
 * @type int
 */
Titanium.UI.KEYBOARD_EMAIL = 0;

/**
 * (Property) textfield keyboard appearance constant
 * @type int
 */
Titanium.UI.KEYBOARD_APPEARANCE_DEFAULT = 0;

/**
 * (Property) textfield keyboard appearance constant
 * @type int
 */
Titanium.UI.KEYBOARD_APPEARANCE_ALERT = 0;

/**
 * (Property) text capitalization constant
 * @type int
 */
Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE = 0;

/**
 * (Property) text capitalization constant
 * @type int
 */
Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS = 0;

/**
 * (Property) text capitalization constant
 * @type int
 */
Titanium.UI.TEXT_AUTOCAPITALIZATION_SENTENCES = 0;

/**
 * (Property) text capitalization constant
 * @type int
 */
Titanium.UI.TEXT_AUTOCAPITALIZATION_ALL = 0;

/**
 * (Property) input button mode constant
 * @type int
 */
Titanium.UI.INPUT_BUTTONMODE_NEVER = 0;

/**
 * (Property) input button mode constant
 * @type int
 */
Titanium.UI.INPUT_BUTTONMODE_ALWAYS = 0;

/**
 * (Property) input button mode constant
 * @type int
 */
Titanium.UI.INPUT_BUTTONMODE_ONFOCUS = 0;

/**
 * (Property) input button mode constant
 * @type int
 */
Titanium.UI.INPUT_BUTTONMODE_ONBLUR = 0;

/**
 * (Property) input border style constant
 * @type int
 */
Titanium.UI.INPUT_BORDERSTYLE_NONE = 0;

/**
 * (Property) input border style constant
 * @type int
 */
Titanium.UI.INPUT_BORDERSTYLE_LINE = 0;

/**
 * (Property) input border style constant
 * @type int
 */
Titanium.UI.INPUT_BORDERSTYLE_BEZEL = 0;

/**
 * (Property) input border style constant
 * @type int
 */
Titanium.UI.INPUT_BORDERSTYLE_ROUNDED = 0;

/**
 * (Property) orientation constant
 * @type int
 */
Titanium.UI.PORTRAIT = 0;

/**
 * (Property) orientation constant
 * @type int
 */
Titanium.UI.LANDSCAPE_LEFT = 0;

/**
 * (Property) orientation constant
 * @type int
 */
Titanium.UI.LANDSCAPE_RIGHT = 0;

/**
 * (Property) orientation constant
 * @type int
 */
Titanium.UI.UPSIDE_PORTRAIT = 0;

/**
 * (Property) orientation constant
 * @type int
 */
Titanium.UI.UNKNOWN = 0;

/**
 * (Property) orientation constant
 * @type int
 */
Titanium.UI.FACE_UP = 0;

/**
 * (Property) orientation constant
 * @type int
 */
Titanium.UI.FACE_DOWN = 0;

/**
 * (Property) picker type constant
 * @type int
 */
Titanium.UI.PICKER_TYPE_PLAIN = 0;

/**
 * (Property) picker type constant
 * @type int
 */
Titanium.UI.PICKER_TYPE_DATE_AND_TIME = 0;

/**
 * (Property) picker type constant
 * @type int
 */
Titanium.UI.PICKER_TYPE_DATE = 0;

/**
 * (Property) picker type constant
 * @type int
 */
Titanium.UI.PICKER_TYPE_TIME = 0;

/**
 * (Property) picker type constant
 * @type int
 */
Titanium.UI.PICKER_TYPE_COUNT_DOWN_TIMER = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_NORMAL = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_MULTIPLY = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_SCREEN = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_OVERLAY = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_DARKEN = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_LIGHTEN = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_COLOR_DODGE = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_COLOR_BURN = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_SOFT_LIGHT = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_HARD_LIGHT = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_DIFFERENCE = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_EXCLUSION = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_HUE = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_SATURATION = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_COLOR = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_LUMINOSITY = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_CLEAR = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_COPY = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_SOURCE_IN = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_SOURCE_OUT = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_SOURCE_ATOP = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_DESTINATION_OVER = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_DESTINATION_IN = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_DESTINATION_OUT = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_DESTINATION_ATOP = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_XOR = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_PLUS_DARKER = 0;

/**
 * (Property) image mode constant
 * @type int
 */
Titanium.UI.BLEND_MODE_PLUS_LIGHTER = 0;

/**
 * (Class) The View is an empty drawing surface or container. The View is created by the method `Titanium.UI.createView`.
 * @since android, iphone 0.9
 * @example
 * Round View Example
 * 
 * Create a rounded view.
 * 
 * <code>
 * var view = Titanium.UI.createView({
 *   borderRadius:10,
 *   backgroundColor:'red',
 *   width:50,
 *   height:50
 * });
 * window.add(view);
 * </code>
 */
Titanium.UI.View = function() { };

/**
 * (Class) The Web View allows you to open an HTML5 based view which can load either local or remote content. The content can be any valid web content such as HTML, PDF, SVG or other WebKit supported content types. The Web View is created by the method `Titanium.UI.createWebView`.
 * @since android, iphone 0.8
 * @example
 * Basic Web View to external URL example
 * 
 * Create a web view to a remote URL and open the window as modal.
 * 
 * <code>
 * 	var webview = Titanium.UI.createWebView({url:'http://www.appcelerator.com'});
 * 	var window = Titanium.UI.createWindow();
 * 	window.add(webview);
 * 	window.open({modal:true});
 * </code>
 */
Titanium.UI.WebView = function() { };

/**
 * (Property) the url to the web document
 * @type string
 */
Titanium.UI.WebView.url = '';

/**
 * (Property) the background color for the webview
 * @type string
 */
Titanium.UI.WebView.backgroundColor = '';

/**
 * (Property) the html content of the web document
 * @type string
 */
Titanium.UI.WebView.html = '';

/**
 * (Property) a data blob or file that is used to load the web document
 * @type object
 */
Titanium.UI.WebView.data = new Object();

/**
 * (Property) whether the webview should scale it's contents or not
 * @type boolean
 */
Titanium.UI.WebView.scalesPageToFit = false;

/**
 * (Event) fired before the webview starts loading its content
 */
Titanium.UI.WebView.beforeload = function() { };

/**
 * (Event) fired when the webview is loaded
 */
Titanium.UI.WebView.load = function() { };

/**
 * (Event) fired when the webview cannot load the content
 */
Titanium.UI.WebView.error = function() { };

/**
 * (Method) invoke JavaScript inside the context of the webview and optionally, return a result
 * @param {string} content JavaScript code as a string. The code will be evaluated inside the webview context.
 * @return string
 */
Titanium.UI.WebView.evalJS = function(content) {  };

/**
 * (Class) The Window is an empty drawing surface or container. The Window is created by the method `Titanium.UI.createWindow`. Unlike [Views](Titanium.UI.View), Windows can be opened and closed and can have special display properties such as `fullscreen` or `modal`.
 * @since android, iphone 0.9
 * @example
 * Full Screen Window example
 * 
 * Create a fullscreen window with a red background.
 * 
 * <code>
 * var window = Titanium.UI.createWindow({
 *   backgroundColor:'red'
 * });
 * window.open({fullscreen:true});
 * </code>
 */
Titanium.UI.Window = function() { };

/**
 * (Property) boolean indicates if the window is fullscreen (no device chrome)
 * @type boolean
 */
Titanium.UI.Window.fullscreen = false;

/**
 * (Property) boolean to indicate if the window should be opened modal in front of other windows
 * @type boolean
 */
Titanium.UI.Window.modal = false;

/**
 * (Property) url to a JavaScript file with the windows instructions. this window will create a new JavaScript sub-context that will run in its own thread and global variable space.
 * @type string
 */
Titanium.UI.Window.url = '';

/**
 * (Property) boolean to indicate if the nav bar should be hidden. this is only valid when the window is a child of a tab.
 * @type boolean
 */
Titanium.UI.Window.navBarHidden = false;

/**
 * (Property) array of orientation mode constants defined in [Titanium.UI]
 * @type array
 */
Titanium.UI.Window.orientationModes = new Array();

/**
 * (Property) boolean to indicate if the tab bar should be hidden. this is only valid when the window is a child of a tab.
 * @type boolean
 */
Titanium.UI.Window.tabBarHidden = false;

/**
 * (Property) title of the window.
 * @type string
 */
Titanium.UI.Window.title = '';

/**
 * (Property) title prompt for the window. only available in iPhone.
 * @type string
 */
Titanium.UI.Window.titlePrompt = '';

/**
 * (Property) url to a image that show in the title area. only available in iPhone.
 * @type string
 */
Titanium.UI.Window.titleImage = '';

/**
 * (Property) view to show in the title area. only available in iPhone.
 * @type object
 */
Titanium.UI.Window.titleControl = new Object();

/**
 * (Property) web named color or hex value for the color of the nav bar. only available in iPhone.
 * @type string
 */
Titanium.UI.Window.barColor = '';

/**
 * (Property) boolean to indicate if the nav bar is translucent. only available in iPhone.
 * @type boolean
 */
Titanium.UI.Window.translucent = false;

/**
 * (Property) view to show in the left nav bar area. only available in iPhone.
 * @type object
 */
Titanium.UI.Window.leftNavButton = new Object();

/**
 * (Property) view to show in the right nav bar area. only available in iPhone.
 * @type object
 */
Titanium.UI.Window.rightNavButton = new Object();

/**
 * (Property) array of button objects to show in the toolbar of the window. only available in iPhone. this is only valid when the window is a child of a tab.
 * @type array
 */
Titanium.UI.Window.toolbar = new Array();

/**
 * (Property) url to an image to show as the back button. only available in iPhone. this is only valid when the window is a child of a tab.
 * @type string
 */
Titanium.UI.Window.backButtonTitleImage = '';

/**
 * (Property) title for the back button. only available in iPhone. this is only valid when the window is a child of a tab.
 * @type string
 */
Titanium.UI.Window.backButtonTitle = '';

/**
 * (Event) fired when the window is opened
 */
Titanium.UI.Window.open = function() { };

/**
 * (Event) fired when the window is closed
 */
Titanium.UI.Window.close = function() { };

/**
 * (Event) fired when the window gains focus
 */
Titanium.UI.Window.focus = function() { };

/**
 * (Event) fired when the window loses focus
 */
Titanium.UI.Window.blur = function() { };

/**
 * (Method) open the window
 * @param {object} options open the window with optional animation or display properties
 */
Titanium.UI.Window.open = function(options) {  };

/**
 * (Method) close the window
 * @param {object} options close the window with optional animation or display properties
 */
Titanium.UI.Window.close = function(options) {  };

/**
 * (Class) The top level Utils module. The Utils module is a set of common JavaScript functions that are useful for applications.
 * @since android, iphone 0.9
 */
Titanium.Utils = function() { };

/**
 * (Method) compute a MD5 hash algorithm against the input and return a hex-based string
 * @param {string} str the string to use for the input
 * @return string
 */
Titanium.Utils.md5HexDigest = function(str) {  };

/**
 * (Method) encode a string into Base64
 * @param {string} str the string to use for the input
 * @return string
 */
Titanium.Utils.base64encode = function(str) {  };

/**
 * (Method) decode a Base64 string
 * @param {string} str the string to use for the input
 * @return string
 */
Titanium.Utils.base64decode = function(str) {  };

/**
 * (Class) The DOMDocument returned from `Titanium.XML.parseString`. The result is an object that implementes the DOM Level 2 API.
 * @since  0.9
 */
Titanium.XML.DOMDocument = function() { };

/**
 * (Class) The top level XML module. The XML module is used parsing and processing XML-based content.
 * @since android, iphone 0.9
 */
Titanium.XML = function() { };

/**
 * (Method) parse an XML string into a DOMDocument
 * @param {string} xml the XML content as a string
 * @return object
 */
Titanium.XML.parseString = function(xml) {  };

/**
 * (Class) The top level Yahoo module. The Yahoo module is used for accessing Yahoo related API services.
 * @since android, iphone 0.8
 */
Titanium.Yahoo = function() { };

/**
 * (Method) invoke a Yahoo YQL query
 * @param {string} yql the YQL query to execute
 * @param {} callback the function to execute when the query completes. The event will contain the boolean property `success` if successful. If `success` is false, the `message` property will contain the error message. If `success` is true, the `data` property will contain the data payload received from the YQL.
 */
Titanium.Yahoo.yql = function(yql, callback) {  };

/**
 * (Class) The App Properties module is used for storing application related property/value pairs which persist beyond application sessions.
 * @since iphone, android 0.5
 */
Titanium.App.Properties = function() { };

/**
 * (Method) return a boolean value
 * @param {string} property return a boolean value for property
 * @param {} default optional default value if property is not found
 * @return boolean
 */
Titanium.App.Properties.getBool = function(property, default) {  };

/**
 * (Method) return a double value
 * @param {string} property return a double value for property
 * @param {} default optional default value if property is not found
 * @return double
 */
Titanium.App.Properties.getDouble = function(property, default) {  };

/**
 * (Method) return an integer value
 * @param {string} property return a integer value for property
 * @param {} default optional default value if property is not found
 * @return int
 */
Titanium.App.Properties.getInt = function(property, default) {  };

/**
 * (Method) return a string value
 * @param {string} property return a string value for property
 * @param {} default optional default value if property is not found
 * @return string
 */
Titanium.App.Properties.getString = function(property, default) {  };

/**
 * (Method) return a value as an array
 * @param {string} property return an array value for property
 * @param {} default optional default value if property is not found
 * @return array
 */
Titanium.App.Properties.getList = function(property, default) {  };

/**
 * (Method) set a property as a boolean value
 * @param {string} property property name
 * @param {} value value
 */
Titanium.App.Properties.setBool = function(property, value) {  };

/**
 * (Method) set a property as a double value
 * @param {string} property property name
 * @param {} value value
 */
Titanium.App.Properties.setDouble = function(property, value) {  };

/**
 * (Method) set a property as an integer value
 * @param {string} property property name
 * @param {} value value
 */
Titanium.App.Properties.setInt = function(property, value) {  };

/**
 * (Method) set a property as a string value
 * @param {string} property property name
 * @param {} value value
 */
Titanium.App.Properties.setString = function(property, value) {  };

/**
 * (Method) set a property as an array value
 * @param {string} property property name
 * @param {} value value
 */
Titanium.App.Properties.setList = function(property, value) {  };

/**
 * (Method) remove an existing property
 * @param {string} property property name to remove
 */
Titanium.App.Properties.removeProperty = function(property) {  };

/**
 * (Method) returns true if the property exists
 * @param {string} property property name to check
 * @return boolean
 */
Titanium.App.Properties.hasProperty = function(property) {  };

/**
 * (Method) return an array of property propertys
 * @return array
 */
Titanium.App.Properties.listProperties = function() {  };

/**
 * (Class) A set of constants for the styles available for [Titanium.UI.ActivityIndicator](Titanium.UI.ActivityIndicator) objects.
 * @since iphone 0.9
 */
Titanium.UI.iPhone.ActivityIndicatorStyle = function() { };

/**
 * (Property) The standard white style of indicator (the default).
 * @type int
 */
Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN = 0;

/**
 * (Property) The large white style of indicator.
 * @type int
 */
Titanium.UI.iPhone.ActivityIndicatorStyle.BIG = 0;

/**
 * (Class) A set of constants for the Animation Styles used for transitions.
 * @since iphone 0.9
 */
Titanium.UI.iPhone.AnimationStyle = function() { };

/**
 * (Property) No animation
 * @type int
 */
Titanium.UI.iPhone.AnimationStyle.NONE = 0;

/**
 * (Property) Curl upwards during a transition animation
 * @type int
 */
Titanium.UI.iPhone.AnimationStyle.CURL_UP = 0;

/**
 * (Property) Curl downwards during a transition animation
 * @type int
 */
Titanium.UI.iPhone.AnimationStyle.CURL_DOWN = 0;

/**
 * (Property) Flip from left to right during a transition animation
 * @type int
 */
Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT = 0;

/**
 * (Property) Flip from right to left during a transition animation
 * @type int
 */
Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT = 0;

/**
 * (Class) A set of constants for the bar styles used on the `style` property of [Titanium.UI.ProgressBar](Titanium.UI.ProgressBar).
 * @since iphone 0.8
 */
Titanium.UI.iPhone.ProgressBarStyle = function() { };

/**
 * (Property) The standard progress-view style. Same as `DEFAULT`.
 * @type int
 */
Titanium.UI.iPhone.ProgressBarStyle.PLAIN = 0;

/**
 * (Property) he standard progress-view style. This is the default.
 * @type int
 */
Titanium.UI.iPhone.ProgressBarStyle.DEFAULT = 0;

/**
 * (Property) The style of progress view that is used in a toolbar.
 * @type int
 */
Titanium.UI.iPhone.ProgressBarStyle.BAR = 0;

/**
 * (Class) A set of constants for the Animation Styles used for transition on table view rows.
 * @since iphone 0.9
 */
Titanium.UI.iPhone.RowAnimationStyle = function() { };

/**
 * (Property) No animation is performed. The new cell value appears as if the cell had just been reloaded.
 * @type int
 */
Titanium.UI.iPhone.RowAnimationStyle.NONE = 0;

/**
 * (Property) The inserted row or rows slides in from the left; the deleted row or rows slides out to the left.
 * @type int
 */
Titanium.UI.iPhone.RowAnimationStyle.LEFT = 0;

/**
 * (Property) The inserted row or rows slides in from the right; the deleted row or rows slides out to the right.
 * @type int
 */
Titanium.UI.iPhone.RowAnimationStyle.RIGHT = 0;

/**
 * (Property) The inserted row or rows slides in from the top; the deleted row or rows slides out toward the top.
 * @type int
 */
Titanium.UI.iPhone.RowAnimationStyle.TOP = 0;

/**
 * (Property) The inserted row or rows slides in from the bottom; the deleted row or rows slides out toward the bottom.
 * @type int
 */
Titanium.UI.iPhone.RowAnimationStyle.BOTTOM = 0;

/**
 * (Property) The inserted or deleted row or rows fades into or out of the table view.
 * @type int
 */
Titanium.UI.iPhone.RowAnimationStyle.FADE = 0;

/**
 * (Class) A set of constants for the styles available for [Titanium.UI.ActivityIndicator](Titanium.UI.ActivityIndicator) objects.
 * @since iphone 0.9
 */
Titanium.UI.iPhone.ScrollIndicatorStyle = function() { };

/**
 * (Property) The default style of scroll indicator, which is black with a white border. This style is good against any content background.
 * @type int
 */
Titanium.UI.iPhone.ScrollIndicatorStyle.DEFAULT = 0;

/**
 * (Property) A style of indicator which is black smaller than the default style. This style is good against a white content background.
 * @type int
 */
Titanium.UI.iPhone.ScrollIndicatorStyle.BLACK = 0;

/**
 * (Class) A set of constants for the status bar style.
 * @since iphone 0.9
 */
Titanium.UI.iPhone.StatusBar = function() { };

/**
 * (Property) The default status bar style
 * @type int
 */
Titanium.UI.iPhone.StatusBar.DEFAULT = 0;

/**
 * (Property) The gray colored status bar style
 * @type int
 */
Titanium.UI.iPhone.StatusBar.GRAY = 0;

/**
 * (Property) The opaque black status bar style.
 * @type int
 */
Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK = 0;

/**
 * (Property) The translucent black status bar style. This style provides some level of transparency to the device background.
 * @type int
 */
Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK = 0;

/**
 * (Class) A set of constants for the system button style for buttons.  A set of constants for the system icon styles that can be used on a tab group tab.
 * @since iphone

iphone 0.8

0.8
 */
Titanium.UI.iPhone.SystemIcon = function() { };

/**
 * (Property) action icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.ACTION = 0;

/**
 * (Property) camera icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.CAMERA = 0;

/**
 * (Property) compose icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.COMPOSE = 0;

/**
 * (Property) bookmarks icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.BOOKMARKS = 0;

/**
 * (Property) add icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.ADD = 0;

/**
 * (Property) trash icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.TRASH = 0;

/**
 * (Property) reply icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.REPLY = 0;

/**
 * (Property) stop icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.STOP = 0;

/**
 * (Property) refresh icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.REFRESH = 0;

/**
 * (Property) play icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.PLAY = 0;

/**
 * (Property) pause icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.PAUSE = 0;

/**
 * (Property) fast forward icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.FAST_FORWARD = 0;

/**
 * (Property) rewind icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.REWIND = 0;

/**
 * (Property) edit icon. localized.
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.EDIT = 0;

/**
 * (Property) cancel icon. localized.
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.CANCEL = 0;

/**
 * (Property) save icon. localized.
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.SAVE = 0;

/**
 * (Property) organize icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.ORGANIZE = 0;

/**
 * (Property) done icon. localized.
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.DONE = 0;

/**
 * (Property) Blank space to add between other items. The space is distributed equally between the other items. Other item properties are ignored when this value is set.
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.FLEXIBLE_SPACE = 0;

/**
 * (Property) Blank space to add between other items. Only the `width` property is used when this value is set.
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.FIXED_SPACE = 0;

/**
 * (Property) special style that shows an activity indicator. when visible, the activity indicator is already started.
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.ACTIVITY = 0;

/**
 * (Property) a light style info circle icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.INFO_LIGHT = 0;

/**
 * (Property) a dark style info circle icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.INFO_DARK = 0;

/**
 * (Property) disclosure style icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.DISCLOSURE = 0;

/**
 * (Property) green style plus (+) icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.CONTACT_ADD = 0;

/**
 * (Property) Bookmark style icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.BOOKMARKS = 0;

/**
 * (Property) Contacts style icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.CONTACTS = 0;

/**
 * (Property) Downloads style icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.DOWNLOADS = 0;

/**
 * (Property) Favorites style icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.FAVORITES = 0;

/**
 * (Property) Featured style icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.FEATURED = 0;

/**
 * (Property) History style icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.HISTORY = 0;

/**
 * (Property) More style icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.MORE = 0;

/**
 * (Property) Most recent style icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.MOST_RECENT = 0;

/**
 * (Property) Most viewed style icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.MOST_VIEWED = 0;

/**
 * (Property) Recents style icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.RECENTS = 0;

/**
 * (Property) Search style icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.SEARCH = 0;

/**
 * (Property) Top rated style icon
 * @type int
 */
Titanium.UI.iPhone.SystemIcon.TOP_RATED = 0;

/**
 * (Class) A set of constants for the system button styles that can be used for the button `style` property.
 * @since iphone 0.8
 */
Titanium.UI.iPhone.SystemButtonStyle = function() { };

/**
 * (Property) The style for a done button - for example, a button that completes some task and returns to the previous view.
 * @type int
 */
Titanium.UI.iPhone.SystemButtonStyle.DONE = 0;

/**
 * (Property) A simple button style with a border.
 * @type int
 */
Titanium.UI.iPhone.SystemButtonStyle.BORDERED = 0;

/**
 * (Property) Glows when tapped. The default item style.
 * @type int
 */
Titanium.UI.iPhone.SystemButtonStyle.PLAIN = 0;

/**
 * (Class) A set of constants for the style that can be used for the `selectionStyle` property of [Titanium.UI.TableViewRow](Titanium.UI.TableViewRow).
 * @since iphone 0.9
 */
Titanium.UI.iPhone.TableViewCellSelectionStyle = function() { };

/**
 * (Property) The cell has no distinct style for when it is selected.
 * @type int
 */
Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE = 0;

/**
 * (Property) The cell when selected has a blue background. This is the default value.
 * @type int
 */
Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE = 0;

/**
 * (Property) Then cell when selected has a gray background.
 * @type int
 */
Titanium.UI.iPhone.TableViewCellSelectionStyle.GRAY = 0;

/**
 * (Class) A set of constants for the position value that can be used for the `position` property of `Titanium.UI.TableView` when invoking `scrollToIndex`.
 * @since iphone 0.9
 */
Titanium.UI.iPhone.TableViewScrollPosition = function() { };

/**
 * (Property) The table view scrolls the row of interest to be fully visible with a minimum of movement. If the row is already fully visible, no scrolling occurs. For example, if the row is above the visible area, the behavior is identical to that specified by `TOP`. This is the default.
 * @type int
 */
Titanium.UI.iPhone.TableViewScrollPosition.NONE = 0;

/**
 * (Property) The table view scrolls the row of interest to the top of the visible table view.
 * @type int
 */
Titanium.UI.iPhone.TableViewScrollPosition.TOP = 0;

/**
 * (Property) The table view scrolls the row of interest to the middle of the visible table view.
 * @type int
 */
Titanium.UI.iPhone.TableViewScrollPosition.MIDDLE = 0;

/**
 * (Property) The table view scrolls the row of interest to the bottom of the visible table view.
 * @type int
 */
Titanium.UI.iPhone.TableViewScrollPosition.BOTTOM = 0;

/**
 * (Class) A set of constants for the style that can be used for the `separatorStyle` property of [Titanium.UI.TableView](Titanium.UI.TableView).
 * @since iphone 0.9
 */
Titanium.UI.iPhone.TableViewSeparatorStyle = function() { };

/**
 * (Property) The separator cell has no distinct style.
 * @type int
 */
Titanium.UI.iPhone.TableViewSeparatorStyle.NONE = 0;

/**
 * (Property) The separator cell has a single line running across its width. This is the default value.
 * @type int
 */
Titanium.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE = 0;

/**
 * (Class) A set of constants for the style that can be used for the button `style` property of [Titanium.UI.TableView](Titanium.UI.TableView).
 * @since iphone 0.9
 */
Titanium.UI.iPhone.TableViewStyle = function() { };

/**
 * (Property) A plain table view. Any section headers or footers are displayed as inline separators and float when the table view is scrolled.
 * @type int
 */
Titanium.UI.iPhone.TableViewStyle.PLAIN = 0;

/**
 * (Property) A table view whose sections present distinct groups of rows. The section headers and footers do not float.
 * @type int
 */
Titanium.UI.iPhone.TableViewStyle.GROUPED = 0;

/**
 * (Class) The iPhone specific UI capabilities. All properties, methods and events in this namespace will only work on the Apple iPhone or iPad related devices.
 * @since iphone 0.5
 */
Titanium.UI.iPhone = function() { };

/**
 * (Property) control the status bar visibility
 * @type boolean
 */
Titanium.UI.iPhone.statusBarHidden = false;

/**
 * (Property) constant that controls the status bar color style
 * @type int
 */
Titanium.UI.iPhone.statusBarStyle = 0;

/**
 * (Property) set the application badge for the application's icon in the springboard
 * @type string
 */
Titanium.UI.iPhone.appBadge = '';

/**
 * (Property) control whether the shake to edit system wide capability is enabled
 * @type boolean
 */
Titanium.UI.iPhone.appSupportsShakeToEdit = false;

/**
 * (Method) convenience method to hide the status bar
 */
Titanium.UI.iPhone.hideStatusBar = function() {  };

/**
 * (Method) convenience method to show the status bar
 */
Titanium.UI.iPhone.showStatusBar = function() {  };

