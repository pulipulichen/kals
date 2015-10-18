function create_menu(basepath)
{
   if (basepath == 'http://codeigniter.org.cn/user_guide/')
      basepath = '';
      
   var l = location.href;
   basepath = l.substring(0, l.lastIndexOf('user_guide')+11);
   

	var base = (basepath == 'null') ? '' : basepath;

	document.write(
		'<table cellpadding="0" cellspaceing="0" border="0" style="width:98%"><tr>' +
		'<td class="td" valign="top">' +

		'<ul>' +
		'<li><a href="'+base+'index.html">用户指南首页</a></li>' +	
		'<li><a href="'+base+'toc.html">目录页</a></li>' +
		'</ul>' +	

		'<h3>基本信息</h3>' +
		'<ul>' +
			'<li><a href="'+base+'general/requirements.html">服务器要求</a></li>' +
			'<li><a href="'+base+'license.html">许可协议</a></li>' +
			'<li><a href="'+base+'changelog.html">变更记录</a></li>' +
			'<li><a href="'+base+'general/credits.html">关于 CodeIgniter</a></li>' +
		'</ul>' +	

		'<h3>安装</h3>' +
		'<ul>' +
			'<li><a href="'+base+'installation/downloads.html">下载 CodeIgniter</a></li>' +
			'<li><a href="'+base+'installation/index.html">安装指导</a></li>' +
			'<li><a href="'+base+'installation/upgrading.html">从老版本升级</a></li>' +
			'<li><a href="'+base+'installation/troubleshooting.html">疑难解答</a></li>' +
		'</ul>' +

		'<h3>介绍</h3>' +
		'<ul>' +
			'<li><a href="'+base+'overview/getting_started.html">开始</a></li>' +
			'<li><a href="'+base+'overview/at_a_glance.html">CodeIgniter 是什么？</a></li>' +
			'<li><a href="'+base+'overview/cheatsheets.html">CodeIgniter 速记表</a></li>' +
			'<li><a href="'+base+'overview/features.html">支持特性</a></li>' +
			'<li><a href="'+base+'overview/appflow.html">应用程序流程图</a></li>' +
			'<li><a href="'+base+'overview/mvc.html">模型-视图-控制器</a></li>' +
			'<li><a href="'+base+'overview/goals.html">架构目标</a></li>' +
		'</ul>' +

		'</td><td class="td_sep" valign="top">' +

		'<h3>常规主题</h3>' +
		'<ul>' +
			'<li><a href="'+base+'general/urls.html">CodeIgniter URL</a></li>' +
			'<li><a href="'+base+'general/controllers.html">控制器</a></li>' +
            '<li><a href="'+base+'general/reserved_names.html">保留字</a></li>' +
			'<li><a href="'+base+'general/views.html">视图</a></li>' +
			'<li><a href="'+base+'general/models.html">模型</a></li>' +
			'<li><a href="'+base+'general/helpers.html">辅助函数</a></li>' +
			'<li><a href="'+base+'general/plugins.html">插件</a></li>' +
			'<li><a href="'+base+'general/libraries.html">使用 CodeIgniter 类库</a></li>' +
			'<li><a href="'+base+'general/creating_libraries.html">创建你自己的类库</a></li>' +
			'<li><a href="'+base+'general/core_classes.html">创建核心类</a></li>' +
			'<li><a href="'+base+'general/hooks.html">钩子 - 扩展核心</a></li>' +
			'<li><a href="'+base+'general/autoloader.html">自动装载资源</a></li>' +
            '<li><a href="'+base+'general/common_functions.html">公共函数</a></li>' +
			'<li><a href="'+base+'general/scaffolding.html">脚手架(Scaffolding)</a></li>' +
			'<li><a href="'+base+'general/routing.html">URI 路由</a></li>' +
			'<li><a href="'+base+'general/errors.html">错误处理</a></li>' +
			'<li><a href="'+base+'general/caching.html">缓存</a></li>' +
			'<li><a href="'+base+'general/profiling.html">评测你的应用程序</a></li>' +
			'<li><a href="'+base+'general/managing_apps.html">管理应用程序</a></li>' +
			'<li><a href="'+base+'general/alternative_php.html">PHP 替代语法</a></li>' +
			'<li><a href="'+base+'general/security.html">安全</a></li>' +
			'<li><a href="'+base+'general/styleguide.html">开发规范</a></li>' +
		'</ul>' +

		'</td><td class="td_sep" valign="top">' +


		'<h3>类库参考</h3>' +
		'<ul>' +
		'<li><a href="'+base+'libraries/benchmark.html">基准测试类</a></li>' +
		'<li><a href="'+base+'libraries/calendar.html">日历类</a></li>' +
		'<li><a href="'+base+'libraries/cart.html">购物车类</a></li>' +
		'<li><a href="'+base+'libraries/config.html">配置类</a></li>' +
		'<li><a href="'+base+'database/index.html">数据库类</a></li>' +
		'<li><a href="'+base+'libraries/email.html">Email 类</a></li>' +
		'<li><a href="'+base+'libraries/encryption.html">加密类</a></li>' +
		'<li><a href="'+base+'libraries/file_uploading.html">文件上传类</a></li>' +
		'<li><a href="'+base+'libraries/form_validation.html">表单验证类</a></li>' +
		'<li><a href="'+base+'libraries/ftp.html">FTP 类</a></li>' +
		'<li><a href="'+base+'libraries/table.html">HTML 表格类</a></li>' +
		'<li><a href="'+base+'libraries/image_lib.html">图像处理类</a></li>' +
		'<li><a href="'+base+'libraries/input.html">输入和安全类</a></li>' +
		'<li><a href="'+base+'libraries/loader.html">装载器类</a></li>' +
		'<li><a href="'+base+'libraries/language.html">语言类</a></li>' +
		'<li><a href="'+base+'libraries/output.html">输出类</a></li>' +
		'<li><a href="'+base+'libraries/pagination.html">分页类</a></li>' +
		'<li><a href="'+base+'libraries/sessions.html">Session 类</a></li>' +
		'<li><a href="'+base+'libraries/trackback.html">Trackback 类</a></li>' +
		'<li><a href="'+base+'libraries/parser.html">模板解析器类</a></li>' +
		'<li><a href="'+base+'libraries/typography.html">排版类</a></li>' +
		'<li><a href="'+base+'libraries/unit_testing.html">单元测试类</a></li>' +
		'<li><a href="'+base+'libraries/uri.html">URI 类</a></li>' +
		'<li><a href="'+base+'libraries/user_agent.html">User-Agent 类</a></li>' +
		'<li><a href="'+base+'libraries/xmlrpc.html">XML-RPC 类</a></li>' +
		'<li><a href="'+base+'libraries/zip.html">Zip 编码类</a></li>' +
		'</ul>' +

		'</td><td class="td_sep" valign="top">' +

		'<h3>辅助函数参考</h3>' +
		'<ul>' +
		'<li><a href="'+base+'helpers/array_helper.html">数组辅助函数</a></li>' +
        '<li><a href="'+base+'helpers/compatibility_helper.html">兼容性辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/cookie_helper.html">Cookie 辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/date_helper.html">日期辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/directory_helper.html">目录辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/download_helper.html">下载辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/email_helper.html">Email 辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/file_helper.html">文件辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/form_helper.html">表单辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/html_helper.html">HTML 辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/inflector_helper.html">Inflector 辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/language_helper.html">语言辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/number_helper.html">数字辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/path_helper.html">路径辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/security_helper.html">安全辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/smiley_helper.html">表情辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/string_helper.html">字符串辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/text_helper.html">文本辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/typography_helper.html">排版辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/url_helper.html">URL 辅助函数</a></li>' +
		'<li><a href="'+base+'helpers/xml_helper.html">XML 辅助函数</a></li>' +
		'</ul>' +


		'<h3>附加资源</h3>' +
		'<ul>' +
		'<li><a href="'+base+'general/quick_reference.html">快速参考图</a></li>' +
		'<li><a href="http://search.codeigniter.org.cn" target="_blank">搜索引擎</a></li>' +
		'<li><a href="http://codeigniter.org.cn/forums/" target="_blank">中文社区</a></li>' +
		'<li><a href="http://codeigniter.com/forums/" target="_blank">英文社区</a></li>' +
		'<li><a href="http://www.codeigniter.com/wiki/" target="_blank">社区 Wiki</a></li>' +
		'</ul>' +

		'</td></tr></table>');
}