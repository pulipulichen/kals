/**
 * jQuery_kals_plugin_test.js
 *
 * jQuery_kals_plugin的單元測試
 *
 * @package    KALS
 * @category   Webpage Application Libraries
 * @author     Pudding Chen <pulipuli.chen@gmail.com>
 * @copyright  Copyright (c) 2014, Pudding Chen
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/pulipulichen/kals/
 * @version    1.0 2014/5/2 下午 03:36:17
 */

QUNIT_TITLE = "<?= $title ?>";

test("<?= $title ?>", function() {
    /**
     * 範例
     */
    
    equals( 1+1
        , 2
        , "1+1=2?" );
        
    equals(typeof($.substr)
        , "function");
        
    var _data = {
        "test": "test:data"
    };
    
    //var _data_string = $.json_encode(_data);
    //_data = $.json_decode(_data_string);
    //equals(_data_string,
    //        '{"test":"test:data"}');
    
    var _img_url = "http://localhost/image.jpg";
    equals($.is_image(_img_url),
           true);
           
    var _img_url = "http://localhost/image.JPG";
    equals($.is_image(_img_url),
           true);
           
    var _base64_url = "data:image/jpeg;base64,/9j/4AAQSk...";
    equals($.is_base64(_base64_url),
           true);       
    
    equals($.parse_base64_ext(_base64_url),
           "image/jpeg");  
           
    equals($.is_image(_base64_url),
           true);  
});