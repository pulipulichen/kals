<?php

//require_once 'Testing/Selenium.php';
require_once 'PHPUnit/Extensions/SeleniumTestCase.php';

class Example extends PHPUnit_Framework_TestCase
{
  protected function setUp()
  {
      $this->setHost("140.119.61.148");
      $this->setPort(44444);

    $this = new Testing_Selenium("*chrome", "http://pulipuli.blogspot.com/2011/06/blogger-image-lazy-load.html");
    // 初始化準備
    $this->setTimeout("60000");
    
  }

  public function testMyTestCase()
  {
      $this->open("http://pulipuli.blogspot.com/2011/06/blogger-image-lazy-load.html");
    for ($second = 0; ; $second++) {
        if ($second >= 60) $this->fail("timeout");
        try {
            if ($this->isElementPresent("css=img[title=\"2011-06-25_233326 設計 網頁元素\"][original=\"http://lh4.ggpht.com/-a6cwLWbFve8/Tgg8J05sfPI/AAAAAAAAIYE/lU7sCSU6L0o/Image.png\"]")) break;
        } catch (Exception $e) {}
        sleep(1);
    }

    // 範圍外圖片確認沒有讀取
    $this->assertFalse($this->isElementPresent("css=img[title=\"2011-06-25_233326 設計 網頁元素\"][src=\"http://lh4.ggpht.com/-a6cwLWbFve8/Tgg8J05sfPI/AAAAAAAAIYE/lU7sCSU6L0o/Image.png\"]"));
    // 移至圖片位置
    $this->runScript("window.scrollTo(0, $(\"img[title='2011-06-25_233326 設計 網頁元素']\").offset().top);");
    // 確認圖片讀取
    for ($second = 0; ; $second++) {
        if ($second >= 60) $this->fail("timeout");
        try {
            if ($this->isElementPresent("css=img[title=\"2011-06-25_233326 設計 網頁元素\"][src=\"http://lh4.ggpht.com/-a6cwLWbFve8/Tgg8J05sfPI/AAAAAAAAIYE/lU7sCSU6L0o/Image.png\"]")) break;
        } catch (Exception $e) {}
        sleep(1);
    }

    print("圖片延緩載入測試完成" . "\n");
  }
}
?>