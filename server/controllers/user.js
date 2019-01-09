'use strict';

const common = require('../common');
const sql = require('../sqlMap'); // sql语句集

exports.check_login = (req, res, fields) => {
  common.getLink(sql.admin.checkLogin, [req.body.ac], (err, result) => {
    if(err) {
      res.send(err);
    } else {
      let result_info;
      if(Object.keys(result).length == 0) {
        result_info = {
          code: 0,
          info: null,
          msg: "无该用户"
        };
      } else {
        if(result[0].password === common.md5(req.body.pd)){
          result_info = {
            code: 1,
            info: null,
            msg: "登录成功"
          }
        }else{
          result_info = {
            code: -1,
            info: null,
            msg: "帐号密码错误"
          }
        }
      }
      common.responseJSON(res, result_info);
    }
  });
};