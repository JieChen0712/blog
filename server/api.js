'use strict';
const models = require('./db'); // 引用mysql的配置连接数据库
const express = require('express'); // 使用express框架
const router = express.Router(); // 开启路由
const sql = require('./sqlMap'); // sql语句集
const md5 = require('js-md5'); // md5加密验证
//const upload = require('./upload');
const fs = require('fs');
const common = require('./common');

//controllers
// 测试接口
const Test = require('./controllers/test');
// 普通用户接口
const User = require('./controllers/user');
// 管理员接口
const Admin = require('./controllers/admin');
// 上传接口
const Upload = require('./controllers/upload');
// 文章接口
const Article = require('./controllers/article');

// 响应请求的json数据模板
const responseJSON = (res, ret) => {
  if(typeof ret === 'undefined') {
    res.json({
      code: '-200',
      msg: '请求失败！'
    });
  } else {
    res.json(ret);
  }
};


router.get('/api/blog/test/test_sql',Test.test_sql_count);
// 用户登录接口
//router.post('/api/login/check_login', User.check_login);
// 用户登录接口
router.post('/api/blog/admin/login',Admin.admin_login);

// 上传文件接口
router.post('/api/img/upload',Upload.upload_img);

// 文章添加
router.post('/api/blog/admin/save_article', requireLogin, Article.add);

// 获取用户列表
router.post('/api/blog/getAccount', Admin.admin_user_list);

// 获取管理员列表
router.get('/api/blog/admin/getAdminInfo', requireLogin, Admin.admin_user_info);

// 管理员信息修改
router.post('/api/blog/admin/set_user_detail', requireLogin, Admin.admin_set_detail);

// 获取管理员列表
router.post('/api/blog/admin/get_user_list', requireLogin, Admin.admin_user_list);
//router.post('/api/img/upload', function(req, res, next) {
//console.log(req.files)
//upload.uploadFolder = '../uploads/avatar'; // 自定义路径
//upload.createFolder(upload.uploadFolder); // 创建自定义路径文件
//var up = upload.mult.single('avatar'); // 创建上传的multer对象
//up(req, res, function(err) { // 上传实例
//  if(err) {
//    throw err;
//    return;
//  } else {
//    if(req.file) {
//      res.send(req.file);
//      console.log(req.file);
//      console.log(req.body);
//    }
//  }
//});
//});

// 查询所有用户接口
//router.get('/api/blog/getAccount', (req, res, fields) => {
//// 通过模型去查找数据库
//models.getConnection((err, conn) => {
//  let param = req.query || req.params;
//  let pageNum = parseInt(param.pageNum || 1); // 页码
//  let end = parseInt(param.pageSize || 20); // 默认页数
//  let start = (pageNum - 1) * end;
//  //      console.log(param)
//  conn.query(sql.common.select_all + sql.common.count, ['user_account', start, end, 'user_account'], (err, result) => {
//    if(err) {
//      res.send(err);
//    } else {
//      let result_info = {
//        code: 1,
//        info: {
//          list: result[0],
//          currertPage: pageNum,
//          count: result[1][0]['sum']
//        },
//        msg: "获取成功"
//      }
//      responseJSON(res, result_info);
//      //              res.send(result);
//    }
//    conn.release();
//  });
//});
//});

// 查询管理员信息接口
//router.get('/api/blog/admin/getAdminInfo', requireLogin, (req, res, fields) => {
//// 通过模型去查找数据库
//models.getConnection((err, conn) => {
//  let uid = req.session.user.id;
//  console.log(uid);
//  conn.query(sql.admin.getInfo, [uid], (err, result) => {
//    if(err) {
//      res.send(err);
//    } else {
//      let result_info = {
//        code: 1,
//        info: result[0],
//        msg: "获取成功"
//      }
//      responseJSON(res, result_info);
//      //              res.send(result);
//    }
//    conn.release();
//  });
//});
//});

// 用户信息修改接口
router.post('/api/user/set_user_detail', requireLogin, (req, res, fields) => {
  //  console.log(req);
  //  res.send(req.body.address);
  //  console.log([
  //              req.body.nickname, 
  //              req.body.sex, 
  //              req.body.phone, 
  //              req.body.qq, 
  //              req.body.wechat, 
  //              req.body.email, 
  //              req.body.introduct, 
  //              req.body.province, 
  //              req.body.city, 
  //              req.body.county, 
  //              req.body.address, 
  //              req.body.brith_day, 
  //              md5(req.body.uid)
  //          ]);
  models.getConnection((err, conn) => {
    conn.query(sql.user.set_user_detail, [
      req.body.nickname,
      req.body.sex,
      req.body.phone,
      req.body.qq,
      req.body.wechat,
      req.body.email,
      req.body.introduct,
      req.body.province,
      req.body.city,
      req.body.county,
      req.body.address,
      req.body.brith_day,
      req.body.uid
    ], (err, result) => {
      if(err) {
        res.send(err);
      } else {
        if(Object.keys(result).length == 0) {
          result_info = {
            code: 0,
            info: null,
            msg: "修改失败"
          };
        } else {
          result_info = {
            code: 1,
            info: result,
            msg: "修改成功"
          }
        }
        responseJSON(res, result_info);
        //              res.send(result_info);
      }
      conn.release();
    });
  });
});


//router.post('/api/blog/admin/login', (req, res, fields) => {
//models.getConnection((err, conn) => {
//  conn.query(sql.admin.login, [req.body.ac], (err, result) => {
//    if(err) {
//      res.send(err);
//    } else {
//      if(md5(req.body.pd) == md5(result[0]['password'])) {
//        let user = result[0];
//        req.session.user = user;
//        req.session.save();
//        res.cookie('NODESESSIONID', req.sessionID, {
//          maxAge: 1000 * 10000
//        });
//        console.log(req.session.user);
//        console.log('success login');
//        result_info = {
//          code: 1,
//          info: result[0]['name'],
//          msg: "登录成功！"
//        }
//      } else {
//        result_info = {
//          code: 2,
//          info: null,
//          a: [],
//          msg: "登录失败！"
//        }
//        console.log('error login');
//      }
//      responseJSON(res, result_info);
//    }
//    conn.release();
//  });
//});
//});

router.post('/api/blog/user/register', (req, res, fields) => {
  let power = 1;
  let type = 1;
  let name = req.body.name;
  let password = req.body.pd;
  let account = req.body.ac;
  let result_info = null;
  common.getLink(sql.common.check_exist, ["user_account", "account", account], function(err, result) {
    if(err) {
      res.send(err);
    } else if(result != null && result[0]['num'] > 0) {
      result_info = {
        code: -1,
        info: null,
        msg: '该账号已存在！'
      }
      responseJSON(res, result_info);
    } else {
      password = md5(password);
      common.getLink(sql.user.register, [account, password, power, type], function(err, results) {
        console.log(results);
        if(err) {
          res.send(err);
        } else if (results) {
//        let user = {
//          'account': account,
//          'name': account,
//          'password': password
//        };
//        req.session.user = user;
//        req.session.save();
//        res.cookie('NODESESSIONID', req.sessionID, {
//          maxAge: 1000 * 10000
//        });
          let time = new Date().valueOf();
          let clientIp = getClientIP(req);
          let superagent = require('superagent');
          let ipurl = 'http://ip.taobao.com/service/getIpInfo.php?ip='+ clientIp;
          superagent.get(ipurl)
            .withCredentials()
            .end((err, data) => {
              if (data.ok) {
                const address_info = JSON.parse(data.text);
                common.getLink(sql.user.add_user_detail, [name, account, address_info.data.province, address_info.data.city, time, clientIp],function(errors, datas){});
              } else {
                console.log('获取地址信息失败！');
              }
            });
          console.log('register login');
          result_info = {
            code: 1,
            info: results,
            msg: '注册成功！请等待管理员审核！'
          }
        } else {
          result_info = {
            code: -2,
            info: null,
            msg: '注册失败！'
          }
        }
        responseJSON(res, result_info);
      })
    }
  })
})

router.post('/api/add_article', requireLogin, (req, res, field) => {
  models.getConnection((err, conn) => {
    conn.query(sql.article.add, [req.body.title, req.body.content, req.body.time, req.body.author, req.body.status], (err, result) => {
      if(err){
        res.send(err);
      }else{
        let result_info;
        if(Object.keys(result).length == 0) {
          result_info = {
            code: 0,
            info: null,
            msg: "文章发布失败！"
          };
        } else {
          result_info = {
            code: 1,
            info: result,
            msg: "文章发布成功！"
          }
        }
        responseJSON(res, result_info);
        //              res.send(result_info);
      }
      conn.release();
    })
  })
});



/**
 * Middleware 用户权限校验
 */
function requireLogin(req, res, next) {
  if(req.session.user) {
    next();
  } else {
    res.cookie('NODESESSIONID', '', {
      maxAge: -1
    });
    res.send('用户登录后才能访问');
  }
}

/**
 * @getClientIP
 * @desc 获取用户 ip 地址
 * @param {Object} req - 请求
 */
function getClientIP(req) {
  return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    req.connection.remoteAddress || // 判断 connection 的远程 IP
    req.socket.remoteAddress || // 判断后端的 socket 的 IP
    req.connection.socket.remoteAddress;
};

module.exports = router;

//router.post('/api/blog/register', (req, res, fields) => {
//let power = 1;
//let type = 1;
//let password = '';
//let result_info = null;
//models.getConnection((err, conn) => {
//  conn.query(sql.common.check_exist, ["user_account", "account", req.body.ac], (err, datas) => {
//    if(err) {
//      res.send(err);
//    } else {
//      console.log(datas);
//      if(datas.length > 0) {
//        result_info = {
//          code: -1,
//          info: null,
//          msg: "该帐号已被注册！"
//        }
//        responseJSON(res, result_info);
//      } 
//      else {
//        password = md5(req.body.pd)
//        conn.query(sql.user.register, [req.body.ac, password, power, type], (e, data) => {
//          if(e) {
//            res.send(e);
//          } else {
//            console.log(data);
////            if(results.length > 0) {
////              console.log(1);
//////              let time = new Date().valueOf();
//////              let clientIp = getClientIP(req);
//////              let superagent = require('superagent');
//////              let ipurl = 'http://ip.taobao.com/service/getIpInfo.php?ip='+ clientIp;
//////              let sreq = superagent.get(ipurl);
//////              sreq.pipe(res);
//////              sreq.on('end', function(){
//////                  console.log('done');
//////              });
//////              conn.query(sql.user.add_user_detail,[req.body.ac, ,time, clientIp])
////              result_info = {
////                code: 1,
////                info: results,
////                msg: "注册成功！"
////              }
////              responseJSON(res, result_info);
////            } else {
////              console.log(2);
////              result_info = {
////                code: -2,
////                info: results,
////                msg: "注册失败！"
////              }
////              responseJSON(res, result_info);
////            }
//          }
//        })
//      }
//    }
//    conn.release();
//  })
//})
//})