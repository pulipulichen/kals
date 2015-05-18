<?php
require_once 'Segmentor.php';
/**
 * Segmentor_CKIP
 *
 * 以CKIP為主的斷詞工具
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/1 下午 03:12:10
 */
class Segmentor_CKIP extends Segmentor {

    #Memver Varibles
    public $name = 'segmentor.ckip';

    public $username;
    public $password;

    public $serverIP;
    public $serverPort;

    public $rawText;
    public $returnText;

    public $sentence = Array();
    public $term = Array();

    #Methods
    public function  __construct() {
        parent::__construct();
        $this->CI->config->load('kals');
        $this->username = $this->CI->config->item('ckip.username');
        $this->password = $this->CI->config->item('ckip.password');
        $this->serverIP = $this->CI->config->item('ckip.server_ip');
        $this->serverPort = $this->CI->config->item('ckip.server_port');
    }

    public function  text_to_segment($text, $with_speech = NULL) {
        //$this->rawText = $text;
        $this->_set_text($text);
        $this->send();

        //這會回傳整個XML
        //return $this->returnText;

//        $this->getSentence();
//
//        $output = '';
//        foreach ($this->sentence AS $s)
//        {
//            $output .= $s.'\n';
//        }
//        return $output;

        $this->getTerm();

        $outputText = '';
        $outputSpeech = '';
        foreach ($this->term AS $t)
        {
            $outputText .= $t['term'];
            $outputSpeech .= $t['term'];
                $outputSpeech .= Segmentor::$speech_separator.$this->_speech_filter ($t['tag']).'';
            $outputText .= ' ';
            $outputSpeech .= ' ';
        }
        $outputText = trim($outputText);
        $outputSpeech = trim($outputSpeech);

        if (is_null($with_speech))
        {
            return array(
                'text' => $outputText,
                'speech' => $outputSpeech
            );
        }
        else if (FALSE === $with_speech)
            return $outputText;
        else
            return $outputSpeech;
    }

    private function _set_text($text)
    {
        if ($this->rawText != $text)
        {
            $this->rawText = $text;
            $this->returnText = '';
            $this->sentence = array();
            $this->term = array();
        }
        return $this;
    }

    function send()
    {
        //test_msg('send ckip', $this->rawText);

        $xw = new xmlWriter();
        $xw->openMemory();

        $xw->startDocument('1.0');

        $xw->startElement('wordsegmentation');
        $xw->writeAttribute( 'version', '0.1');

        $xw->startElement('option');
        $xw->writeAttribute( 'showcategory', '1');
        $xw->endElement();

        $xw->startElement('authentication');
        $xw->writeAttribute( 'username', $this->username);
        $xw->writeAttribute( 'password', $this->password);
        $xw->endElement();

        $xw->startElement('text');
        $xw->writeRaw($this->rawText);
        $xw->endElement();

        $xw->endElement();

        @$message=iconv("utf-8","big5",$xw->outputMemory(true));

        //send message to CKIP server
        set_time_limit(60);
        try
        {
            $protocol = getprotobyname("tcp");
            $socket = socket_create(AF_INET, SOCK_STREAM, $protocol);
            @socket_connect($socket,$this->serverIP,$this->serverPort);
            @socket_write($socket,$message);
            //$this->returnText = socket_read($socket,strlen($message)*3);
            @$this->returnText = iconv("big5","utf-8",socket_read($socket,strlen($message)*3));

            @socket_shutdown($socket);
            @socket_close($socket);
        }
        catch (Exception $e) {
            //大不了就不斷詞嘛，跩什麼
        }
    }

    function getSentence()
    {
        if (count($this->sentence) == 0)
        {
            $reader = new XMLReader();
            //$reader->XML(iconv("utf-8","big5",$this->returnText));
            @$reader->XML($this->returnText);
            $this->sentence = array();
            while (@$reader->read()) {
                    if ($reader->name == "sentence" && $reader->nodeType == XMLReader::ELEMENT) {
                        $reader->read();
                        $this->sentence[] = $reader->value;
                    }
            }
            $reader->close();
        }
    }
    function getTerm()
    {
        $this->getSentence();

        if (count($this->term) == 0)
        {
            foreach($this->sentence as $t){
                    foreach(split("　",$t) as $s){
                            if($s!=""){
                                    preg_match("/(\S*)\((\S*)\)/",$s,$m);
                                    $t = array();
                                    $t['term'] = $m[1];
                                    $t['tag'] = $m[2];

                                    $this->term[] = $t;

                            }
                    }
            }
        }
    }

    private function _speech_filter($speech)
    {
        return $speech;
    }
}


/* End of file Segmentor_CKIP.php */
/* Location: ./system/application/libraries/annotation/Segmentor_CKIP.php */