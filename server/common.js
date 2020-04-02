'use strict';
const pool = require('./db'); // 引用mysql的配置连接数据库
// const express = require('express'); // 使用express框架
const sql = require('./sqlMap'); // sql语句集
const md5 = require('js-md5'); // md5加密验证
// const upload = require('./upload');
const fs = require('fs');

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
  excSql(strsql, ...param) {  // 查询全部
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        if(err){
          reject({code: -1, msg: 'error',info: err});
          return;
        }else{
          conn.query(strsql, param, (errs, result, fields) => {
            conn.release();
            if(errs){
              reject({code: -1, msg: 'error',info: errs});
              return;
            }
            resolve(result);
          })
        }
      })
    });
  },
  findSql(strsql, ...param) { // 查询单一对象
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        if(err){
          reject({code: -1, msg: 'error',info: err});
          return;
        }else{
          conn.query(strsql, param, (errs, result, fields) => {
            conn.release();
            if(errs){
              reject({code: -1, msg: 'error',info: errs});
              return;
            }
            resolve(result[0] || null);
          })
        }
      })
    });
  },
  fieldSql(strsql, ...param) {  // 查询某个字段的值
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        if(err){
          reject({code: -1, msg: 'error',info: err});
          return;
        }else{
          conn.query(strsql, param, (errs, result, fields) => {
            conn.release();
            if(errs){
              reject({code: -1, msg: 'error',info: errs});
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
  responseJSON(res, ret) {  // 统一返回
    if(typeof ret === 'undefined') {
      res.json({
        code: '-200',
        msg: '请求失败！'
      });
    } else {
      res.json(ret);
    }
  },
  md5(param) {  // md5 加密
    return md5(param);
  },
  isArrayFn(value) {  // 是否为数组
    if(typeof Array.isArray === "function") {
      return Array.isArray(value);
    } else {
      return Object.prototype.toString.call(value) === "[object Array]";
    }
  },
  isArrayAndEmpty(value) {  //是否为数组和空数组
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
  empty(value){ // 是否为空值
    if(value == "" || value == null || value == undefined || !value){
      return true;
    }else{
      return false;
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
  emptyArray(value){  // 是否为空数组
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
  getTime(){  // 获取时间戳
    return Math.round(new Date() / 1000);
  },
  addChar (str, len, repeat_str, type) {  // 自定义长度填充字符
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
  addZero (str){  // 不够则加0
    return ('00' + str).substr(str.length)
  },
  formatDate (time, fmt) {  // 时间戳转日期
    if(common.empty(time)){
      return time;
    }
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
  },
  randomCode (randomFlag, min, max) { // 生成随机码
    let str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 随机产生
    if(randomFlag){
      range = Math.round(Math.random() * (max-min)) + min;
    }
    for(let i=0; i<range; i++){
      let pos = Math.round(Math.random() * (arr.length-1));
      str += arr[pos];
    }
    return str;
  },
  specialToEscape (str) {
    str = str.trim();
    str = str.replace(/&/g,"&amp;");
    str = str.replace(/</g,"&lt;");
    str = str.replace(/>/g,"&gt;");
    str = str.replace(/ /g,"&nbsp;");
    str = str.replace(/"/g,'&quot;');
    return str;
  },
  specialEscape (str) {
    str = str.trim();
    str = str.replace(/&amp;/g,"&");
    str = str.replace(/&lt;/g,"<");
    str = str.replace(/&gt;/g,">");
    str = str.replace(/&nbsp;/g," ");
    str = str.replace(/&quot;/g,'"');
    return str;
  },
  deleteFile (filePath) {
    filePath = '..' + filePath;
    let files = [];
    if (fs.existsSync(filePath)) {
      if (fs.statSync(filePath).isDirectory()) {
        files = fs.readdirSync(filePath);
        files.forEach((file, index) => {
          let curPath = filePath + "/" + file;
          if (fs.statSync(curPath).isDirectory()) {
            common.deleteFile(curPath);
          } else {
            fs.unlinkSync(curPath);
          }
        });
      }else{
        fs.unlinkSync(filePath);
      }
    }
  }
  
}

module.exports = common;