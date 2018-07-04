const models = require('./db'); // 引用mysql的配置连接数据库
// const express = require('express'); // 使用express框架
const sql = require('./sqlMap'); // sql语句集
const md5 = require('js-md5'); // md5加密验证
// const upload = require('./upload');
// const fs = require('fs');

const common = {
  getLink(strsql, param, callback) {
    models.getConnection( (err, conn) => {
      conn.query(strsql, param, (errs, result) => {
        if(errs){
          console.log(errs);
          return;
        }
        conn.release();
        callback(errs, result);
      })
    })
  }
}

module.exports = common;
