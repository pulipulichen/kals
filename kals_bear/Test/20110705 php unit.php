<?php

require_once 'PHPUnit/Extensions/SeleniumTestCase.php';

class Example extends PHPUnit_Extensions_SeleniumTestCase
{
  function setUp()
  {
      $this->setHost("140.119.61.148");
      $this->setPort(44444);
    //$this->setBrowser("*firefox");
      $this->setBrowser("*chrome");
    $this->setBrowserUrl("http://www.google.com/");
  }

  function testMyTestCase()
  {
    $this->open("/");
    $this->type("q", "selenium rc");
    $this->click("btnG");
    $this->waitForPageToLoad("30000");
    $this->assertTrue($this->isTextPresent("Results * for selenium rc"));
  }
}
?>