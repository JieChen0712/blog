const api = require('./api');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const history = require('connect-history-api-fallback');
const ueditor = require('ueditor');
//var morgan = require('morgan');
//const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;
//const flash = require('connect-flash');
const app = express();
const log = require('./logs').logger;

// configure app
//app.use(morgan('dev')); // log requests to the console

app.set('views', path.join(__dirname, '../dist'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser('keyboard cat'));



app.use(session({
    name: 'user',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 1000 // 有效期，单位是毫秒
    }
}));

//app.use(passport.initialize());
//app.use(flash());
//app.use(passport.session());

// 配置允许跨域设置
app.all('*', function(req, res, next) {
    let html = fs.readFileSync(path.resolve(__dirname,'../dist/index.html'),"utf-8");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, x_requested_with, yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//  console.log(req.originalUrl.indexOf('/api'))
    if (req.method == 'OPTIONS' && req.originalUrl.indexOf('/api')!=0) {
        res.send(html);
        /make the require of options turn back quickly/
    } else {
        next();
    }
});

//app.get('/api/login*',function(req, res, next) {
//  if(req.session.user){
//      var user=req.session.user;
//      var name=user.name;
//      console.log(name)
//      next();
//  }else{
//      console.log('req')
////      res.redirect('/blog/login');
//      res.send('你还没有登录，先登录下再试试！');
//  }
//});
//app.get('/blog',function(req, res, next) {
//      res.redirect('/blog/home');
////      res.send('你还没有登录，先登录下再试试！');
//  
//});
//app.get('/blog/home*',function(req, res, next) {
//  if(req.session.user){
//      var user=req.session.user;
//      var name=user.name;
//      console.log(name)
//      next();
//  }else{
//      console.log('req')
//      res.redirect('/blog/login');
////      res.send('你还没有登录，先登录下再试试！');
//  }
//});
// ueditor使用模块
app.use("/UE", ueditor(path.resolve(__dirname, '../uploads'), function (req, res, next) {
    let ActionType = req.query.action
    let result = ''
    let upload_arr = {
      uploadimage: "/ueditor/image/",
      uploadfile: "/ueditor/file/",
      uploadvideo: "/ueditor/video/",
      listimage: "/ueditor/image/"
    }
    if(ActionType == "config"){
      var _callback = req.query.callback;
      var _data;
      var file = path.resolve(__dirname, '../static/ueditor/jsp/config.json'); 
      fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            _data = data;
            res.type('application/json');
            res.jsonp(_data);
        }
      });
      
    } else if (ActionType == "uploadimage" || ActionType == "uploadfile" ||  ActionType == "uploadvideo") {
      var foo = req.ueditor;
      var imgname = req.ueditor.filename;
      res.setHeader('Content-Type', 'text/html');
      res.ue_up(upload_arr[ActionType]); //你只要输入要保存的地址 。保存操作交给ueditor来做
    } else if (ActionType == "listimage") {
      res.ue_list(upload_arr[ActionType]);
    }
}));


app.use(api);
app.use(history());
// 访问静态项目文件
app.use(express.static(path.resolve(__dirname,'../dist')));
// 访问静态资源文件
app.use('/static', express.static('/static'));
app.use('/uploads', express.static(path.resolve(__dirname,'../uploads')));
app.use('/ueditor', express.static(path.resolve(__dirname,'../uploads/ueditor')));
//app.use(express.static(path.resolve(__dirname,'../dist')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        log.error("Something went wrong:", err.stack);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            title: 'error msg',
            name: err.name,
        	stack: err.stack,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    log.error(err.stack);
    res.render('error', {
        message: err.message,
        title: 'error msg',
        name: err.name,
        stack: err.stack,
        error: {}
    });
});

//app.get('/',function(req,res){
//  const html = fs.readFileSync(path.resolve(__dirname,'../dist/test.html'),"utf-8")
//  res.send(html)
//})

app.listen(8085, '0.0.0.0');
console.log('success to listen....');


//deal (cookie,session)
(() => {
    app.use(cookieParser());
    let keyArr = [];
    for (let i = 0; i < 100000; i++) {
        keyArr[i] = "xsa_" + Math.random() * 100 + i;
    }
    app.use(cookieSession({
        name: "hc",
        keys: keyArr,
        maxAge: 30 * 60 * 1000
    }));
})();