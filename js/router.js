/**================================================================
 * 名称：Router.js
 * 描述：javascript前端路由，实现单页面跳转，
 * 作者：Earthshaking
 ================================================================*/

/**
 * @name Router
 * @description 前端路由控制
 * @constructor
 */
function Router() {
    
    this.routes = {};
    this.currentUrl = '';
    
    /**
     * 通过 jquery 的 $.load 直接加载要显示的页面
     * @param element 页面容器，显示的区域
     * @param url     页面文件的路径
     * @param callback     回调函数
     */
    this.loadPage = function (element, url, callback) {
        $(element).empty().load(url);
        if (typeof callback == "function") {
            callback();
        }
    };
    
    /**
     * 通过 artTemplate.js 前端模版引擎根据后台来的 json 数据渲染页面
     * @param url        模版文件路径
     * @param json       后台数据
     * @param element    页面容器，显示的区域
     * @param callback   回调函数
     */
    this.loadTemplate = function (url, json, element, callback) {
        $.get(url, function (data) {
            var render = template.compile(data),
                html = render({list: json});
            $(element).html("");
            $(element).html(html);
            if (typeof callback == "function") {
                callback();
            }
        });
    }
}

/**
 * @name route
 * @description 存储路由更新时的回调到回调数组routes中，回调函数将负责对页面的更新
 * @param path      需要显示的页面路径
 * @param callback  回调函数
 */
Router.prototype.route = function (path, callback) {
    this.routes[path] = callback || function () {
    };
};

/**
 * @name refresh
 * @description 执行当前url对应的回调函数，更新页面
 */
Router.prototype.refresh = function () {
    this.currentUrl = location.hash.slice(1) || '/';
    this.routes[this.currentUrl]();
};

/**
 * @name init
 * @description 初始化 监听浏览器 url、hash 更新事件
 */
Router.prototype.init = function () {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
};

window.Router = new Router();
window.Router.init();
