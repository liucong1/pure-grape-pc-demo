<!doctype html>
{% html lang="en" framework="common:static/js/mod.js" %}
    {% head %}
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        {# 360 浏览器就会在读取到这个标签后，立即切换对应的极速核 #}
        <meta name="renderer" content="webkit">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {% block block_head_content %}
            <meta name="keywords" content="">
            <meta name="description" content="">
            <title>My Site</title>
        {% endblock %}
        <link rel="shortcut icon" type="image/x-icon" href="/client/static/img/favicon.ico" />

        <link rel="stylesheet" type="text/css" href="/client/static/css/base.scss">

        {% block block_head_css %}
        {% endblock %}

        {% block block_layout_js %}
        {% script %}
            require(["common:page/layout.js"]);
        {% endscript %}
        {% endblock %}

        {% block block_head_js %}
        {% endblock %}

    {% endhead %}

    {% body %}

        <!--[if lt IE 9]>
        <div style='border: 4px solid #FFF500; background: #FDFDC8; text-align: center; clear: both; height: 75px; position: fixed; z-index:999999999; right: 2px; bottom: 2px; left: 2px; padding:0 8px;'>
            <div style='position: absolute; right: 3px; top: 3px; font-weight: bold;z-index:999999999'><a href='#' onclick='javascript:this.parentNode.parentNode.style.display="none"; return false;'>关闭</a></div>
            <div style='width: 740px; margin: 0 auto; text-align: left; padding: 0; overflow: hidden; color: black;'>
                <div style='width: 675px; float: left;'>
                    <div style='font-size: 16px; font-weight: bold; margin-top: 12px;'>您使用的是已经过时的IE浏览器</div>
                    <div style='font-size: 13px; margin-top: 6px; line-height: 16px;'>为了让您在人人贷有最佳的使用体验，请升级到 <a href="http://windows.microsoft.com/en-US/internet-explorer/download-ie">最新版本IE浏览器</a>, 或者使用其他高级浏览器如 <a href="https://www.google.com/intl/en/chrome/browser/">Chrome(谷歌浏览器)</a> 或 <a href="http://www.mozilla.org/en-US/firefox/new">Firefox(火狐浏览器)</a></div>
                </div>
            </div>
        </div>
        <![endif]-->

        {# 请求java接口, 确保cookie中 JSESSIONID 存在 #}

        {% block block_header %}
        {% endblock %}

        <div class="main-content">

            {% block block_body %}
            {% endblock %}

        </div>

        {% block block_footer %}

        {% endblock %}

        {# 页面的JS,放在body结束的入口 #}
        {% block block_body_js %}

        {% endblock %}

    {% endbody %}

{% endhtml %}
