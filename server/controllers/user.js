'use strict';

const common = require('../common');
const sql = require('../sqlMap'); // sql语句集
/*************************  普通用户接口   ***********************************/
// 获取管理员用户列表
exports.admin_user_list = (req, res, fields) => {
  
}

// 用户注册接口
exports.user_register = (req, res, fields) => {
  console.log(req.session)
}