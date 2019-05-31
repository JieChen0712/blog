const log4js = require("log4js");
const log4js_config = require("./log4js/logConf_test.json");
log4js.configure(log4js_config);

const logger = log4js.getLogger('app');
exports.logger = logger;
exports.use = function (app) {
    //页面请求日志,用auto的话,默认级别是WARN
    //这样会自动记录每次请求信息，放在其他use上面
//  app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
    app.use(log4js.connectLogger(logger, {level: 'debug', format: ':method :url'}));
}

//app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}));