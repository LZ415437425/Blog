var baseServerModule = require('./BaseServer');
var routerModule = require('./Router');
var handleModule = require('./RequestHandlers');

var route = routerModule.route;
function initHandleDict() {
    var handleDict = {};
    handleDict["/"] = handleModule.start;
    handleDict["/start"] = handleModule.start;
    handleDict["/upload"] = handleModule.upload;
    handleDict["/show"] = handleModule.show;
    return handleDict;
}
var handleDict = initHandleDict();

var port = 8888;
baseServerModule.startServer(port, route, handleDict);