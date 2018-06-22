const api = require('./api');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const history = require('connect-history-api-fallback');
//const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;
//const flash = require('connect-flash');
const app = express();

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
    res.header('Access-Control-Allow-Origin', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
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
app.use(api);
app.use(history());
// 访问静态资源文件
app.use(express.static(path.resolve(__dirname,'../dist')));
//app.use(express.static(path.resolve(__dirname,'../dist')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//
//// production error handler
//// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//app.get('/',function(req,res){
//  const html = fs.readFileSync(path.resolve(__dirname,'../dist/test.html'),"utf-8")
//  res.send(html)
//})

app.listen(8085);
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