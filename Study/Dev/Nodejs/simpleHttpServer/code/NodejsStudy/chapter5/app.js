var baseServerModule = require('./BaseServer');
var routerModule = require('./Router');
var handleModule = require('./RequestHandlers');

var route = routerModule.route;
var handleDict = {};
handleDict["/"] = handleModule.start;
handleDict["/start"] = handleModule.start;
handleDict["/upload"] = handleModule.upload;

baseServerModule.startServer(8888, route, handleDict);