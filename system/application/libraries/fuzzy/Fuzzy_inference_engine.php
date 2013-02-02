<?php
include_once 'Output_language_variable_collection.php';
/**
 * Fuzzy_inference_engine
 *
 * 模糊推論引擎
 * 這是使用糢糊矩陣綜合運算的方法，運算子是Zadeh算子，簡記為M(^,v)
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/17 下午 08:04:07
 */
class Fuzzy_inference_engine {

    static private $engine;

    static public function get_inference_result(Language_variable_collection $langvar_coll, $method = 'closure_addition')
    {
        if (is_null(Fuzzy_inference_engine::$engine))
        {
            $class_name = 'Fuzzy_inference_engine_' . $method;

            require_once $class_name.'.php';
            Fuzzy_inference_engine::$engine = new $class_name();
        }

        return Fuzzy_inference_engine::$engine->get_inference_result($langvar_coll);
    }
}


/* End of file Fuzzy_inference_engine.php */
/* Location: ./system/application/libraries/fuzzy/Fuzzy_inference_engine.php */