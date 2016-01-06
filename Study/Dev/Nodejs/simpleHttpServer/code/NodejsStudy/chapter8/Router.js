// 定义路由
function route(handleDict, pathname, request, response) {
    console.log("处理路由 " + pathname);

    var handler = handleDict[pathname];
    if (typeof handler === 'function') {
        handler(request, response);
    } else {
        console.log("没有办法处理路径 " + pathname);

        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

// 导出路由
exports.route = route;