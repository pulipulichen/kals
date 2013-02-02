<?php
/**
 * Segmentor
 *
 * Segmentor full description.
 *
 * @package		KALS
 * @category		Library
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/7/1 下午 03:00:27
 * @property CI_DB_active_record $db
 * @property CI_Base $CI
 * @property CI_Language $lang
 */
class Segmentor extends KALS_object {

    #Memver Varibles

    public $name;
    public $ignore_stopword;

    static public $speech_separator = '/';

    #Methods
    public function get_name()
    {
        return $this->name;
    }

    public function set_ignore_stopword($ignore)
    {
        $this->ignore_stopword = $ignore;
    }

    public function text_to_segment($text, $with_speech = NULL) {
        $outputText = NULL;
        $outputSpeech = NULL;
        if (is_null($with_speech))
        {
            return array(
                'text' => $outputText,
                'speech' => $outputSpeech
            );
        }
        else if (TRUE === $with_speech)
            return $outputText;
        else
            return $outputSpeech;
    }

    public function text_to_query($text) {
        $seg = $this->text_to_segment($text, FALSE);
        return self::segment_to_query($seg);
    }

    /**
     * 斷詞結果換成搜尋時查詢語句
     * @param String $seg 斷詞結果
     */
    static public function  segment_to_query($seg)
    {
        $text = trim($seg);

	$text = str_replace(" & ", "&", $text);
	$text = str_replace(" | ", "|", $text);

	$spaceAry = explode(" ", $text);
	$finalOutput = "";

	for ($l = 0; $l < count($spaceAry); $l++)
	{
		$s = trim($spaceAry[$l]);
		if ($s == "")
			continue;

		if ($l > 0) $finalOutput .= " | ";

		$andAry = explode("&", $s);

		$output = "";
		for ($i = 0; $i < count($andAry); $i++)
		{
			$o = trim($andAry[$i]);
			if ($o == "")
				continue;

			if ($i > 0)
				$output .= " & ";

			$orAry = explode("|", $o);
			$o = "";
			for ($j = 0; $j < count($orAry); $j++)
			{
				$token = trim($orAry[$j]);

				if ($token == "")
					continue;

				if ($j > 0)
					$o .= " | ";

				//$token = scws_token($token);

				$temp = explode(" ", $token);
				$t = "";
				for ($k = 0; $k < count($temp); $k++)
				{
					if ($k > 0) $t .= " & ";
					$t .= trim($temp[$k]);
				}

				if (count($orAry) > 1)
					$t = "( ".$t." )";
				$o .= $t;
			}	//for ($j = 0; $j < count($orAry); $j++)

			if (count($andAry) > 1)
				$o = "( ".$o." )";
			$output .= $o;
		}	//for ($i = 0; $i < count($andAry); $i++)
		$s = $output;

		if (count($spaceAry) > 1)
			$s = "( ". $s. " )";

		$finalOutput .= $s;
	}	//for ($l = 0; $l < count($spaceAry); $l++)
	$finalOutput = trim($finalOutput);
	return $finalOutput;
    }

    static public function utf8_str_split($str, $split_len = 1)
    {
        if (!preg_match('/^[0-9]+$/', $split_len) || $split_len < 1)
            return FALSE;

        $len = mb_strlen($str, 'UTF-8');
        if ($len <= $split_len)
            return array($str);

        preg_match_all('/.{'.$split_len.'}|[^\x00]{1,'.$split_len.'}$/us', $str, $ar);

        return $ar[0];
    }

    private function _speech_filter($speech)
    {
        return $speech;
    }

    public function text_to_index($text)
    {
        $seg = $this->text_to_segment($text, FALSE);
        return "to_tsvector('english', '".$seg."')";
    }
}


/* End of file Segmentor.php */
/* Location: ./system/application/libraries/annotation/Segmentor.php */