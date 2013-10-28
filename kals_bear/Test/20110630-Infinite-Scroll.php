<?php

require_once 'PHPUnit/Extensions/SeleniumTestCase.php';

class Example extends PHPUnit_Extensions_SeleniumTestCase
{
  protected function setUp()
  {
      $this->setHost("140.119.61.148");
    //$this->setBrowser("*chrome D:\\Program Files\\Firefox4Portable\\FirefoxPortable.exe");
    //$this->setBrowser("*googlechrome D:\\Program Files\\GoogleChromePortable\\GoogleChromePortable.exe");
    //$this->setBrowser("*googlechrome D:\\Program Files\\GoogleChromePortable\\App\\Chrome-bin\\chrome.exe");
    //$this->setBrowser("*iexplore");
    $this->setBrowser("*googlechrome");
    $this->setBrowserUrl("http://pulipuli.blogspot.com/2011/06/blogger-image-lazy-load.html");
  }

  public function testMyTestCase()
  {
    // 測試準備初始化
    $this->setTimeout(60000);
    $this->open("http://pulipuli.blogspot.com/");
    // 計算目前文章的數量
    $postOuterBefore = $this->getXpathCount("//*[@class=\"post-outer\"]");
    print("postOuterBefore的數量：" + $postOuterBefore + "篇文章" . "\n");
    // 開始測試無限捲頁是否生效
    $this->runScript("window.scrollTo(0, $(\"#footer-wrapper\").offset().top);");
    for ($second = 0; ; $second++) {
        if ($second >= 60) $this->fail("timeout");
        try {
            if ($this->isVisible("css=#infscr-loading")) break;
        } catch (Exception $e) {}
        sleep(1);
    }

    for ($second = 0; ; $second++) {
        if ($second >= 60) $this->fail("timeout");
        try {
            if (!$this->isVisible("css=#infscr-loading")) break;
        } catch (Exception $e) {}
        sleep(1);
    }

    // 驗證無限捲頁是否生效
    $postOuterAfter = $this->getXpathCount("//*[@class=\"post-outer\"]");
    print("postOuterAfter的數量：" + $postOuterAfter + "篇文章" . "\n");
    $this->assertEquals("true", $this->getExpression($this->getEval("'" + $postOuterAfter + "' > '" + $postOuterBefore + "'")));
    print("無限捲頁測試完畢" . "\n");
  }
}
?>