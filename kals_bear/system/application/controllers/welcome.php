<?php

class Welcome extends Controller {

    function Welcome()
    {
            parent::Controller();
    }

    function index()
    {
        header('location: help/');
        
        //$this->load->view('welcome_message');
        //phpinfo();

        //$this->load->database();
        //echo get_class($this->db);

        //$this->load->library('fuzzy/Output_language_variable_collection');

        //$output = new Output_language_variable_collection();
        //echo serialize($output);
    }
}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */