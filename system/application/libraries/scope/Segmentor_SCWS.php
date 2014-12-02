<?php
require_once 'Segmentor.php';
/**
 * Segmentor_SCWS
 *
 * 以SCWS為主的斷詞工具
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/1 下午 03:12:10
 */
class Segmentor_SCWS extends Segmentor {

    #Memver Varibles
    public $name = 'segmentor.scws';

    private $dict = 'dict_cht.utf8.xdb';
    private $rule = 'rules_cht.utf8.ini';
    private $charset = "utf-8";
    private $ignore = TRUE;
    

    #Methods
    public function  text_to_segment($text, $with_speech = NULL) {
        $ignore = $this->ignore;

        $charset = $this->charset;
	$dict = $this->dict;
	$rule = $this->rule;

	$cws = scws_new();
	$cws->set_charset($charset);
	$cws->set_dict($dict);
	$cws->set_rule($rule);

	//$cws->set_ignore(true);

	$cws->send_text($text);

	$outputText = "";
        $outputSpeech = "";
	while ($tmp = $cws->get_result())
	{
		$lineT = '';
                $lineS = '';
		foreach ($tmp as $w)
		{
                    $lS = $w['word'].Segmentor::$speech_separator.$this->_speech_filter ($w['attr']).' ';
                    $lT = $w["word"]." ";
                    $lineT .= $lT;
                    $lineS .= $lS;
		}
		$outputText .= $lineT;
                $outputSpeech .= $lineS;
	}
        
        $outputText = $this->_ignore_stopword($outputText);
        $outputSpeech = $this->_ignore_stopword($outputSpeech);

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

    private function _ignore_stopword($output)
    {
        $ignore = $this->ignore;

        $charset = $this->charset;
	$dict = $this->dict;
	$rule = $this->rule;

        //清理標點符號
	if ($ignore == true)
	{
		$lines = explode("\n", file_get_contents($rule));
		$start_record = false;
		$start_split = false;
		$stop_words = "";
		for ($i = 0; $i < count($lines); $i++)
		{
			$l = trim($lines[$i]);
			if ($l == "[nostats]")
			{
				$start_record = true;
				continue;
			}
			if ($l == "[noname]")
			{
				$start_split = true;
				continue;
			}
                        if ($l == '[symbol]')
                            continue;
			if (substr($l, 0, 1) == ":" || substr($l, 0, 1) == ";")
				continue;
                        if ($l == "[pubname]")
				break;
			if ($start_record == true)
			{
				$data = $lines[$i];
				if ($start_split == true)
				{
					$data_ary = Segmentor::utf8_str_split($data);
					$data = implode(" ", $data_ary);
				}
				$stop_words .= $data. " ";
			}
		}

		//把字串切割吧
		//$stop_words_ary = utf8_str_split($stop_words_ary);
		$stop_words_ary = explode(" ", $stop_words);
		//檢查每一個單一的字，是否有符合此字串
		$words_array = explode(" ", $output);
                $output = '';
		for ($i = 0; $i < count($words_array); $i++)
		{
			$match = false;
			for ($j = 0; $j < count($stop_words_ary); $j++)
			{
                            $word = $words_array[$i];
                            $index = strrpos($word, Segmentor::$speech_separator);
                            if (FALSE !== $index)
                            {
                                $word = substr($word, 0, $index);
                            }
                            
                            if ($word == $stop_words_ary[$j])
                            {
                                    $match = true;
                                    break;
                            }
			}
			if ($match == false)
			{
				$output .= $words_array[$i]." ";
			}
		}
	}

        $output = trim($output);
        return $output;
    }

    /**
     * 詞性權威檔轉換。
     * @param String $speech
     * @return String 權威檔中的詞性
     */
    private function _speech_filter($speech)
    {
        return $speech;
    }
}


/* End of file Segmentor_SCWS.php */
/* Location: ./system/application/libraries/annotation/Segmentor_SCWS.php */