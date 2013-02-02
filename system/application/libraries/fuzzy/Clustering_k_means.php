<?php
include_once 'Clustering.php';
/**
 * Clustering_k_means
 *
 * 分群方法: k-means
 *
 * @package		KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/17 上午 12:21:12
 */
class Clustering_k_means extends Clustering {

    protected function process()
    {
        $data = $this->data;
        $k = $this->clusters_number;

        $process_result = self::kmeans($data, $k);
        $this->result = $process_result['result'];
        $this->result_positions = $process_result['result_positions'];
        for ($i = 0; $i < count($this->result); $i++)
        {
            if (FALSE === isset($this->result[$i])
                OR is_null($this->result[$i]))
                $this->result[$i] = array();
        }
        return $this;
    }


    /**
    * This code was created by Jose Fonseca (josefonseca@blip.pt)
    *
    * Please feel free to use it in either commercial or non-comercial applications,
    * and if you enjoy using it feel free to let us know or to comment on our
    * technical blog at http://code.blip.pt
    * @copyright 以下的計算式來自於http://code.blip.pt/2009/04/06/k-means-clustering-in-php/
    * @example print_r(kmeans(array(1, 3, 2, 5, 6, 2, 3, 1, 30, 36, 45, 3, 15, 17), 3));
    * Array
     * (
     *     [0] => Array
     *         (
     *             [0] => 1
     *             [1] => 3
     *             [2] => 2
     *             [3] => 5
     *             [4] => 6
     *             [5] => 2
     *             [6] => 3
     *             [7] => 1
     *             [8] => 3
     *         )
     *
     *     [2] => Array
     *
     *        (
     *
     *             [0] => 30
     *             [1] => 36
     *             [2] => 45
     *        )
     *
     *     [1] => Array
     *         (
     *             [0] => 15
     *             [1] => 17
     *         )
     *
     * )
     *
     * 但是某些情況之下會出錯，像是：
     * 1,1,1,1,1,2,10,10,10,10
     * 這會造成只取得兩組分群，並且
     * 因此我在取得result那邊做了一些偷吃步的
     */

    /**
    * This function takes a array of integers and the number of clusters to create.
    * It returns a multidimensional array containing the original data organized
    * in clusters.
    *
    * @param array $data
    * @param int $k
    *
    * @return array
    */
    static private function kmeans($data, $k)
    {
            $cPositions = self::assign_initial_positions($data, $k);
            $clusters = array();

            while(true)
            {
                    $changes = self::kmeans_clustering($data, $cPositions, $clusters);
                    if(!$changes)
                    {
                            return array(
                                'result' => self::kmeans_get_cluster_values($clusters, $data),
                                'result_positions' => $cPositions
                            );
                    }
                    $cPositions = self::kmeans_recalculate_cpositions($cPositions, $data, $clusters);
            }
    }

    /**
    *
    */
    static private function kmeans_clustering($data, $cPositions, &$clusters)
    {
            $nChanges = 0;
            foreach($data as $dataKey => $value)
            {
                    $minDistance = null;
                    $cluster = null;
                    foreach($cPositions as $k => $position)
                    {
                            $distance = self::distance($value, $position);
                            if(is_null($minDistance) || $minDistance > $distance)
                            {
                                    $minDistance = $distance;
                                    $cluster = $k;
                            }
                    }
                    if(!isset($clusters[$dataKey]) || $clusters[$dataKey] != $cluster)
                    {
                            $nChanges++;
                    }
                    $clusters[$dataKey] = $cluster;
            }

            return $nChanges;
    }




//    static private  function kmeans_recalculate_cpositions($cPositions, $data, $clusters)
//    {
//            $kValues = self::kmeans_get_cluster_values($clusters, $data);
//            foreach($cPositions as $k => $position)
//            {
//                    $cPositions[$k] = empty($kValues[$k]) ? 0 : self::kmeans_avg($kValues[$k]);
//            }
//            return $cPositions;
//    }
    static  function kmeans_recalculate_cpositions($cPositions, $data, $clusters)
    {
            $kValues = self::kmeans_get_cluster_values($clusters, $data);
            foreach($cPositions as $k => $position)
            {
                    $cPositions[$k] = empty($kValues[$k]) ? 0 : self::kmeans_avg($kValues[$k]);
            }
            return $cPositions;
    }

    static private function kmeans_get_cluster_values($clusters, $data)
    {
            $values = array();
            foreach($clusters as $dataKey => $cluster)
            {
                    $values[$cluster][] = $data[$dataKey];
            }
            return $values;
    }


    static private  function kmeans_avg($values)
    {
            $n = count($values);
            $sum = array_sum($values);
            return ($n == 0) ? 0 : $sum / $n;
    }

    /**
    * Calculates the distance (or similarity) between two values. The closer
    * the return value is to ZERO, the more similar the two values are.
    *
    * @param int $v1
    * @param int $v2
    *
    * @return int
    */
    static private  function distance($v1, $v2)
    {
      return abs($v1-$v2);
    }

    /**
    * Creates the initial positions for the given
    * number of clusters and data.
    * @param array $data
    * @param int $k
    *
    * @return array
    */
    static private function assign_initial_positions($data, $k)
    {
            $min = min($data);
            $max = max($data);
            $int = ceil(abs($max - $min) / $k);
            while($k-- > 0)
            {
                    $cPositions[$k] = $min + $int * $k;
            }
            return $cPositions;
    }

}


/* End of file Clustering_k_means.php */
/* Location: ./system/application/libraries/fuzzy/Clustering_k_means.php */