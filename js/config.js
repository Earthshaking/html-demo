/**================================================================
 * 名称：config.js
 * 描述：Router路由 页面配置
 ================================================================*/

var content = "main";  // 页面显示容器

// 配置默认访问路径
Router.route('/', function () {
    var data = datas.data;
    Router.loadTemplate("pages/view/made_ticket_main.html", data, content, function () {
        initTableCheck();
        initDbClick();
        initdisbelad();
        setCurrentBg();
    });
});

// 制票发票
Router.route('/tpsroundlist', function () {
    
    var datas = dataSource.getTpsroundList();
    var data = datas.data;
    
    console.log(data);
    
    Router.loadTemplate("pages/view/made_ticket_main.html", data, content, function () {
        initTableCheck();
        initDbClick();
        initdisbelad();
        setCurrentBg();
    });
    
});
