const pool = require('./db'); // 引用mysql的配置连接数据库
// const express = require('express'); // 使用express框架
const sql = require('./sqlMap'); // sql语句集
const md5 = require('js-md5'); // md5加密验证
// const upload = require('./upload');
// const fs = require('fs');

const common = {
  getLink(strsql, param, callback) {
    pool.getConnection( (err, conn) => {
      if (err) throw err; // not connected!
      conn.query(strsql, param, (errs, result, fields) => {
        // Handle error after the release.
        if (errs) throw errs;
        
        conn.release();
        callback(errs, result);
      })
    })
  },
  responseJSON(res, ret) {
    if(typeof ret === 'undefined') {
      res.json({
        code: '-200',
        msg: '请求失败！'
      });
    } else {
      res.json(ret);
    }
  },
  md5(param) {
    return md5(param);
  }
}

module.exports = common;
