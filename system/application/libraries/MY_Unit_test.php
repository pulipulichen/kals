<?php
/**
 * MY_Unit_test
 *
 * 改良CI原始的Unit_test類別
 *
 * @package             KALS
 * @category		Libraries
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/19 下午 09:34:20
 */
class MY_Unit_test extends CI_Unit_test
{
    var $benchmark_index = 0;
    var $benchmark_title = 'Construct';
    var $benchmark;

    function  __construct()
    {
            parent::CI_Unit_test();

            $CI =& get_instance();
            $CI->output->enable_profiler(TRUE);
            $this->benchmark = $CI->benchmark;
            $this->benchmark->mark('Unit Test '.$this->benchmark_index.' [ '.$this->benchmark_title.' ]_start');
    }


        function run_false($test, $expected = TRUE, $test_name = 'undefined')
        {
		if ($this->active == FALSE)
		{
			return FALSE;
		}

		if (in_array($expected, array('is_string', 'is_bool', 'is_true', 'is_false', 'is_int', 'is_numeric', 'is_float', 'is_double', 'is_array', 'is_null'), TRUE))
		{
			$expected = str_replace('is_float', 'is_double', $expected);
			$result = ($expected($test)) ? TRUE : FALSE;
			$extype = str_replace(array('true', 'false'), 'bool', str_replace('is_', '', $expected));
		}
		else
		{
			if ($this->strict == TRUE)
				$result = ($test !== $expected && gettype($test) == gettype(($expected))) ? TRUE : FALSE;
			else
				$result = ($test != $expected && gettype($test) == gettype(($expected))) ? TRUE : FALSE;

			$extype = gettype($expected);
		}

		$back = $this->_backtrace();

                $test_output = $test;
                if (is_array($test))
                {
                    $t = '';
                    foreach ($test AS $value)
                    {
                        if ($t != '')
                            $t .= ', ';
                        $t .= $value;
                    }
                    $t = 'array('.$t.')';
                    $test_output = $t;
                }
                $expected_output = $expected;
                if (is_array($expected))
                {
                    $t = '';
                    foreach ($expected AS $value)
                    {
                        if ($t != '')
                            $t .= ', ';
                        $t .= $value;
                    }
                    $t = 'array('.$t.')';
                    $expected_output = $t;
                }


                    $report[] = array (
                                                            'test_name'			=> $test_name,
                                                            'test_datatype'		=> gettype($test),
                                                            'test_output'           => $test_output,
                                                            'res_datatype'		=> $extype,
                                                            'res_output'            => $expected_output,
                                                            'result'			=> ($result === TRUE) ? 'passed' : 'failed',
                                                            'file'				=> $back['file'],
                                                            'line'				=> $back['line'],
                                                            'benchmark_time'   => $this->benchmark_index
                                                    );


		$this->results[] = $report;

                $this->set_benchmark($test_name, $back['line']);

		return($this->report($this->result($report)));
        }

        function set_benchmark($test_name = NULL, $line = NULL)
        {
            $this->benchmark->mark('Unit Test '.$this->benchmark_index.' [ '.$this->benchmark_title.' ]_end');
            $this->benchmark_index++;
            if (isset($test_name))
            {
                $this->benchmark_title = $test_name;
                if (isset($line))
                    $this->benchmark_title .= ' ('.$line.')';
            }
            $this->benchmark->mark('Unit Test '.$this->benchmark_index.' [ '.$this->benchmark_title.' ]_start');
        }

        function run($test, $expected = TRUE, $test_name = 'undefined')
	{
		if ($this->active == FALSE)
		{
			return FALSE;
		}

		if (in_array($expected, array('is_string', 'is_bool', 'is_true', 'is_false', 'is_int', 'is_numeric', 'is_float', 'is_double', 'is_array', 'is_null'), TRUE))
		{
			$expected = str_replace('is_float', 'is_double', $expected);
			$result = ($expected($test)) ? TRUE : FALSE;
			$extype = str_replace(array('true', 'false'), 'bool', str_replace('is_', '', $expected));
		}
		else
		{
			if ($this->strict == TRUE)
				$result = ($test === $expected) ? TRUE : FALSE;
			else
				$result = ($test == $expected) ? TRUE : FALSE;

			$extype = gettype($expected);
		}

		$back = $this->_backtrace();

                $test_output = $test;
                if (is_array($test))
                {
                    $t = '';
                    foreach ($test AS $value)
                    {
                        if ($t != '')
                            $t .= ', ';
                        $t .= $value;
                    }
                    $t = 'array('.$t.')';
                    $test_output = $t;
                }
                $expected_output = $expected;
                if (is_array($expected))
                {
                    $t = '';
                    foreach ($expected AS $value)
                    {
                        if ($t != '')
                            $t .= ', ';
                        $t .= $value;
                    }
                    $t = 'array('.$t.')';
                    $expected_output = $t;
                }


                    $report[] = array (
                                                            'test_name'			=> $test_name,
                                                            'test_datatype'		=> gettype($test),
                                                            'test_output'           => $test_output,
                                                            'res_datatype'		=> $extype,
                                                            'res_output'            => $expected_output,
                                                            'result'			=> ($result === TRUE) ? 'passed' : 'failed',
                                                            'file'				=> $back['file'],
                                                            'line'				=> $back['line'],
                                                            'benchmark_time'   => $this->benchmark_index
                                                    );

		$this->results[] = $report;

                $this->set_benchmark($test_name, $back['line']);

		return($this->report($this->result($report)));
	}


        function result($results = array())
	{
            $this->benchmark->mark('Unit Test '.$this->benchmark_index.' [ '.$this->benchmark_title.' ]_end');

            return parent::result($results);
	}

        /**
	 * Get Default Template
	 *
	 * @access	private
	 * @return	string
	 */
	function _default_template()
	{
		$this->_template = "\n".'<table style="width:100%; font-size:small; margin:10px 0; border-collapse:collapse; border:1px solid #CCC;" class="unit-test-table">';
		$this->_template .= '{rows}';
		$this->_template .= "\n".'</table>';

		$this->_template_rows = "\n\t".'<tr>';
		$this->_template_rows .= "\n\t\t".'<th style="text-align: left; border-bottom:1px solid #CCC;">{item}</th>';
		$this->_template_rows .= "\n\t\t".'<td style="border-bottom:1px solid #CCC;">{result}</td>';
		$this->_template_rows .= "\n\t".'</tr>';
	}
}

/* End of file MY_Unit_test.php */
/* Location: ./system/application/libraries/MY_Unit_test.php */