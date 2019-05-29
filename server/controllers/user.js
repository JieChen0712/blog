'use strict';

const common = require('../common');
const sql = require('../sqlMap'); // sql语句集

//exports.check_login = (req, res, fields) => {
//common.getLink(sql.admin.checkLogin, [req.body.ac], (err, result) => {
//  if(err) {
//    res.send(err);
//  } else {
//    let result_info;
//    if(Object.keys(result).length == 0) {
//      result_info = {
//        code: 0,
//        info: null,
//        msg: "无该用户"
//      };
//    } else {
//      if(result[0].password === common.md5(req.body.pd)){
//        result_info = {
//          code: 1,
//          info: null,
//          msg: "登录成功"
//        }
//      }else{
//        result_info = {
//          code: -1,
//          info: null,
//          msg: "帐号密码错误"
//        }
//      }
//    }
//    common.responseJSON(res, result_info);
//  }
//});
//};

// 用户登录接口
exports.admin_login = (req, res, fields) => {
	let table = 'admin';
	let where = [
    [{
        name: 'account',
        value: req.body.ac,
    }]
	];
	let sqlstr = sql.find(table, null, where);
  common.getLink(sqlstr, [], (err, result) => {
    if(err) {
      res.send(err);
    } else {
      let result_info = [];
      if(common.md5(req.body.pd) === result[0]['password']) {
        let user = result[0];
        req.session.user = user;
        req.session.save();
        res.cookie('NODESESSIONID', req.sessionID, {
          maxAge: 1000 * 10000
        });
        console.log(req.session.user);
        console.log('success login');
        result_info = {
          code: 1,
          info: result[0]['name'],
          msg: "登录成功！"
        }
      } else {
        result_info = {
          code: 2,
          info: null,
          a: [],
          msg: "登录失败！"
        }
        console.log('error login');
      }
      common.responseJSON(res, result_info);
    }
  });
};