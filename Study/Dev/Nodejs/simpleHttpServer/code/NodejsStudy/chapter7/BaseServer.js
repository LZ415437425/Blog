// 加载http模块
var httpModule = require('http');
var urlModule = require('url');

// 定义导出模块
function startServer(port, route, handleDict) {
    // 回调函数
    function onRequest(request, response) {

        var postData = "";
        var pathname = urlModule.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        request.setEncoding("utf8");

        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '"+
                postDataChunk + "'.");
        });

        request.addListener("end", function() {
            route(handleDict, pathname, response, postData);
        });
    }

    // 创建服务
    var server = httpModule.createServer(onRequest);

    // 开始监听
    server.listen(port);

    console.log('server started. http://localhost:'+port)
}

// 导出模块
exports.startServer = startServer;