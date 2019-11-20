'use strict';
const pool = require('./db'); // 引用mysql的配置连接数据库
// const express = require('express'); // 使用express框架
const sql = require('./sqlMap'); // sql语句集
const md5 = require('js-md5'); // md5加密验证
// const upload = require('./upload');
// const fs = require('fs');

const common = {
  getLink(strsql, param, callback) {
    pool.getConnection((err, conn) => {
      if(err) throw err; // not connected!
      conn.query(strsql, param, (errs, result, fields) => {
        // Handle error after the release.
        if(errs) throw errs;

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
  },
  isArrayFn(value) {
    if(typeof Array.isArray === "function") {
      return Array.isArray(value);
    } else {
      return Object.prototype.toString.call(value) === "[object Array]";
    }
  },
  isArrayAndEmpty(value) {
  	let flag;
    if(typeof Array.isArray === "function") {
      flag = Array.isArray(value);
    } else {
      flag = Object.prototype.toString.call(value) === "[object Array]";
    }
    if(flag){
    	if(value.length <= 0){
    		flag = true;
    	}else{
    		flag = false;
    	}
    }
    
    return flag;
  },
  empty(value){
    if(value != "" && value != null && value != undefined){
      return false;
    }else{
      return true;
    }
  },
//emptyArray(value){
//  if(value != "" && value != null && value != undefined){
//    return false;
//  }else if(value.length == 0){
//    return true;
//  }else{
//    return true;
//  }
//},
  emptyArray(value){
    if(value[0] != "" && value[0] != null && value[0] != undefined){
      return false;
    }else if(value.length <= 0){
      return true;
    }else{
      return true;
    }
  },
  strToTime(value){
    if(common.empty(value)){
      return value;
    }else{
      return Math.round(new Date(value) / 1000);
    }
  }
  
}

module.exports = common;