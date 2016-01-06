// 加载http模块
var httpModule = require('http');
var urlModule = require('url');

// 定义导出模块
function startServer(port, route, handleDict) {
    // 回调函数
    function onRequest(request, response) {

        var pathname = urlModule.parse(request.url).pathname;
        console.log("请求路径 " + pathname);
        route(handleDict, pathname, request, response);
    }

    // 创建服务
    var server = httpModule.createServer(onRequest);

    // 开始监听
    server.listen(port);

    console.log('服务开启. http://localhost:'+port)
}

// 导出模块
exports.startServer = startServer;