<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * CodeIgniter
 *
 * An open source application development framework for PHP 4.3.2 or newer
 *
 * @package		CodeIgniter
 * @author		ExpressionEngine Dev Team
 * @copyright	Copyright (c) 2008 - 2009, EllisLab, Inc.
 * @license		http://codeigniter.com/user_guide/license.html
 * @link		http://codeigniter.com
 * @since		Version 1.3
 * @filesource
 */


// ------------------------------------------------------------------------

/**
 * CI_BASE - For PHP 5
 *
 * This file contains some code used only when CodeIgniter is being
 * run under PHP 5.  It allows us to manage the CI super object more
 * gracefully than what is possible with PHP 4.
 *
 * @package		CodeIgniter
 * @subpackage	codeigniter
 * @category	front-controller
 * @author		ExpressionEngine Dev Team
 * @link		http://codeigniter.com/user_guide/
 * @property CI_Loader $load
 * @property CI_Form_validation $form_validation
 * @property CI_Input $input
 * @property CI_Email $email
 * @property CI_DB_active_record $db
 * @property CI_DB_forge $dbforge
 * @property CI_Table $table
 * @property CI_Session $session
 * @property CI_FTP $ftp
 * @property CI_Unit_test $unit
 * @property CI_Benchmark $benchmark
 * @property CI_DB_active_record $db
 * @property CI_Language $lang
 * @property CI_Output $output
 *
 * @see 以下是KALS自定屬性
 * @property KALS_resource $kals_resource
 * @property Domain $domain
 * @property Webpage $webpage
 * @property Annotation $annotation
 * @property KALS_actor $kals_actor
 * @property User $user
 * @property Group $group
 * @property Policy $policy
 * @property Authorize_manager $authorize_manager
 * @property Annotation_scope $annotation_scope
 * @property Annotation_scope_collection $annotation_scope_collection
 * @property Annotation_score_calculator $annotation_score_calculator
 * @property Annotation_recommend $annotation_recommend
 * @property Output_language_variable_collection $output_language_variable_collection
 */

class CI_Base {

	private static $instance;

	public function CI_Base()
	{
		self::$instance =& $this;
	}

	public static function &get_instance()
	{
		return self::$instance;
	}
}
/**
 * @return CI_Base
 */
function &get_instance()
{
	return CI_Base::get_instance();
}



/* End of file Base5.php */
/* Location: ./system/codeigniter/Base5.php */