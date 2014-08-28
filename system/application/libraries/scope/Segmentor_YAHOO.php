<?php
require_once 'Segmentor.php';
/**
 * Segmentor_YAHOO
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
class Segmentor_YAHOO extends Segmentor {

    #Memver Varibles
    public $name = 'segmentor.yahoo';

    #Methods
    public function  __construct() {
        parent::__construct();
        $this->CI->config->load('kals');
    }

    public function  text_to_segment($text, $with_speech = NULL) {
        error_reporting(E_ALL);
        $request_url = 'http://asia.search.yahooapis.com/cas/v1/ws';
        $appid = 'zno81EPV34FUKrAEs_Hn1pcuB1IQ4TBGLBXwLLRWwB2nyaBDnIZT94EESP2s39Xn2zKnfBo-';  //� 自己的Yahoo! APPID
        $ch = curl_init();
        $curl_opts = array(
            CURLOPT_URL  =>  $request_url,
            CURLOPT_POST  =>  true,
            CURLOPT_POSTFIELDS =>  array('appid'=>$appid, 'content'=>$text),
            CURLOPT_RETURNTRANSFER  =>  true
        );
        curl_setopt_array($ch, $curl_opts);
        $ret = curl_exec($ch);
        curl_close($ch);

        $xml = new simpleXMLElement($ret);

        $outputText = '';
        $outputSpeech = '';

        foreach ($xml->Segment as $k) {
            //test_msg('k', $k);
            //$output[] = array('keyword'=>$k->token, 'score'=>$k->score);
            $outputText .= $k->token;
            $outputSpeech .= $k->token;
            if (isset($k->pos))
                $outputSpeech .= Segmentor::$speech_separator.$this->_speech_filter ($k->pos).'';

            $outputText .= ' ';
            $outputSpeech .= ' ';
        }

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

    private function _speech_filter($speech)
    {
        return $speech;
    }
}


/* End of file Segmentor_YAHOO.php */
/* Location: ./system/application/libraries/annotation/Segmentor_YAHOO.php */