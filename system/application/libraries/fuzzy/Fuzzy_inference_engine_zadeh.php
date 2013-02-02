<?php
include_once 'Fuzzy_inference_engine.php';
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
class Fuzzy_inference_engine_zadeh {

    public function get_inference_result(Language_variable_collection $langvar_coll)
    {
        $output_coll = new Output_language_variable_collection();

        $weight_array = $langvar_coll->get_weight_array();
        $membership_matrix = $langvar_coll->get_membership_matrix();

        for ($x = 0; $x < $output_coll->get_number(); $x++)
        {
            $min_array = array();
            for ($y = 0; $y < count($weight_array); $y++)
            {
                $min_array[] = min(array($weight_array[$y], $membership_matrix[$y][$x]));
            }
            $max = max($min_array);
            $output_coll->set_membership($x, $max);
        }

        return $output_coll;
    }
}


/* End of file Fuzzy_inference_engine.php */
/* Location: ./system/application/libraries/fuzzy/Fuzzy_inference_engine.php */