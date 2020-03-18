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
        conn.release();
        // Handle error after the release.
        if(errs) throw errs;
        callback(errs, result);
      })
    })
  },
  excSql(strsql, ...param) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        if(err){
          reject(err);
          return;
        }else{
          conn.query(strsql, param, (errs, result, fields) => {
            conn.release();
            if(errs){
              reject(errs)
              return;
            }
            resolve(result);
          })
        }
      })
    });
  },
  findSql(strsql, ...param) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        if(err){
          reject(err);
          return;
        }else{
          conn.query(strsql, param, (errs, result, fields) => {
            conn.release();
            if(errs){
              reject(errs)
              return;
            }
            resolve(result[0] || null);
          })
        }
      })
    });
  },
  fieldSql(strsql, ...param) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        if(err){
          reject(err);
          return;
        }else{
          conn.query(strsql, param, (errs, result, fields) => {
            conn.release();
            if(errs){
              reject(errs)
              return
            }
            for( let i in result[0] ){
              resolve( result[0][i] || null );
              return;
            }
            resolve(null);
          })
        }
      })
    });
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
  strToTime(value){ // 日期转时间戳
    if(common.empty(value)){
      return value;
    }else{
      return Math.round(new Date(value) / 1000);
    }
  },
  getTime(){
    return Math.round(new Date() / 1000);
  },
  addChar (str, len, repeat_str, type) {
    if(typeof str !== "string" || str.length >= len){
      return str
    }
    if(type == 1){
      let temp = repeat_str.repeat((len - str.length)/repeat_str.length) + str;
      return (temp).substr(-len,temp.length);
    }else if(type == 2){
      let temp = str + repeat_str.repeat((len - str.length)/repeat_str.length);
      return temp.substr(0,len);
    }
  },
  addZero (str){
    return ('00' + str).substr(str.length)
  },
  formatDate (time, fmt) {  // 时间戳转日期
    if(typeof time === "number" && /^[0-9]+.?[0-9]*$/.test(time)){
      time = time.toString();
    }
    
    if(typeof time === "string"){
      if(/^[0-9]+.?[0-9]*$/.test(time)){
        if(time.length < 13){
          time = common.addChar(time,13,"0",2);
        }
        time = new Date(parseInt(time));
      }else{
        time = new Date(time);
      }
    }
    
    if (/(YY+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (time.getFullYear().toString()).substr(4 - RegExp.$1.length))
    }
    let r = {
      'M+': time.getMonth() + 1,
      'd+': time.getDate(),
      'h+': time.getHours(),
      'm+': time.getMinutes(),
      's+': time.getSeconds()
    }
    for (let i in r) {
      if (new RegExp(`(${i})`).test(fmt)) {
        let str = r[i].toString()
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : common.addZero(str))
      }
    }
    return fmt
  }
  
}

module.exports = common;