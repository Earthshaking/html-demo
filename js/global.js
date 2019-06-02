;(function ($) {
    
    "use strict";
    
    $.fn.sidebar = function (options,callback) {
        var $this = this;
        
        var defaults = {
            url: "component/sidebar.html",
            data: "data/sidebar.json"
        };
        var ops = $.extend(options,defaults);
        $.get(ops.data,function (json) {
            console.log(json);
            if (json) {
                $.get(ops.url, function (data) {
                    var render = template.compile(data),
                        html = render({list: json});
                    $this.html("");
                    $this.html(html);
                    initSidebarContrl();
                    if (typeof callback == "function") {
                        callback();
                    }
                });
            }
        });
    
        // 初始化侧边栏里的功能
        function initSidebarContrl() {
            $(".sidebar-nav").find("a").on("click", function () {
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active').siblings('a').removeClass('active');
                    window.location.hash = $(this).data('token');
                }
            });
        }
    
        
    }
    
    
})(jQuery);
