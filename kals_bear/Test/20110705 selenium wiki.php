<?php

require_once 'PHPUnit/Extensions/SeleniumTestCase.php';


class Example extends PHPUnit_Extensions_SeleniumTestCase
{
    var $t;
  protected function setUp()
  {
      $this->setHost("140.119.61.148");
      $this->setPort(44444);

      //$this->setHost("192.168.11.11");

        $this->setBrowser("*chrome");

      //$this->setBrowser("*iexplore");
      //$this->setBrowser("*googlechrome D:\\Program Files\\GoogleChromePortable\\GoogleChromePortable.exe");

        $this->setBrowserUrl("http://www.google.com.tw");
        //$this = new Testing_Selenium("*chrome", "http://www.google.com.tw");
        //$this->t = getNewBrowserSession("*chrome", "http://www.google.co.uk/");
    // 初始化準備
        //$this->setTimeout("60000");
  }

  public function testMyTestCase()
  {
    $this->open("http://www.google.com.tw");
    $this->click("searchSubmit");
    /*
    $this->type("searchText", "selenium wiki");
    $this->click("searchSubmit");
    $this->waitForPageToLoad("30000");
    $this->click("link=Selenium - Wikipedia, the free encyclopedia");
    $this->waitForPageToLoad("30000");
    $this->verifyTextPresent("trigonal");
     * 
     */
  }
}
?>