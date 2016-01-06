// 定义路由
function route(handleDict, pathname) {
    console.log("About to route a request for " + pathname);

    var handler = handleDict[pathname];
    if (typeof handler === 'function') {
        handler();
    } else {
        console.log("No request handler found for " + pathname);
    }
}

// 导出路由
exports.route = route;