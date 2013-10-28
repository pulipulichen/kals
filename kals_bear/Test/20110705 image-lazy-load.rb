require "test/unit"
require "rubygems"
gem "selenium-client"
require "selenium/client"

class 20110705 image-lazy-load < Test::Unit::TestCase

  def setup
    @verification_errors = []
    @selenium = Selenium::Client::Driver.new \
      :host => "localhost",
      :port => 4444,
      :browser => "*chrome",
      :url => "http://pulipuli.blogspot.com/2011/06/blogger-image-lazy-load.html",
      :timeout_in_second => 60

    @selenium.start_new_browser_session
  end
  
  def teardown
    @selenium.close_current_browser_session
    assert_equal [], @verification_errors
  end
  
  def test_20110705 image-lazy-load
    # 初始化準備
    @selenium.set_timeout "60000"
    @selenium.open "http://pulipuli.blogspot.com/2011/06/blogger-image-lazy-load.html"
    assert !60.times{ break if (@selenium.is_element_present("css=img[title=\"2011-06-25_233326 設計 網頁元素\"][original=\"http://lh4.ggpht.com/-a6cwLWbFve8/Tgg8J05sfPI/AAAAAAAAIYE/lU7sCSU6L0o/Image.png\"]") rescue false); sleep 1 }
    # 範圍外圖片確認沒有讀取
    assert !@selenium.is_element_present("css=img[title=\"2011-06-25_233326 設計 網頁元素\"][src=\"http://lh4.ggpht.com/-a6cwLWbFve8/Tgg8J05sfPI/AAAAAAAAIYE/lU7sCSU6L0o/Image.png\"]")
    # 移至圖片位置
    @selenium.run_script "window.scrollTo(0, $(\"img[title='2011-06-25_233326 設計 網頁元素']\").offset().top);"
    # 確認圖片讀取
    assert !60.times{ break if (@selenium.is_element_present("css=img[title=\"2011-06-25_233326 設計 網頁元素\"][src=\"http://lh4.ggpht.com/-a6cwLWbFve8/Tgg8J05sfPI/AAAAAAAAIYE/lU7sCSU6L0o/Image.png\"]") rescue false); sleep 1 }
    p "圖片延緩載入測試完成"
  end
end
