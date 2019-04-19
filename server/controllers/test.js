'use strict';

const comm = require('../common');
const sql = require('../sqlMap'); // sql语句集

exports.test_sql = (req, res, fields) => {
  let table = 'admin';
  let where = [
    [{name:'id',value:2,link:'or',symbols:'eq'},
    {name:'name',value:'Kim',symbols:'eq'}]
  ];
  let sqlstr = sql.find(table,null,where);
  let result_info = {
    code: 1,
    info: sqlstr,
    msg: "登录成功！"
  }
  comm.responseJSON(res, result_info);
}
