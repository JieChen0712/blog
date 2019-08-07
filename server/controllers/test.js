'use strict';

const comm = require('../common');
const sql = require('../sqlMap'); // sql语句集

exports.test_sql_find = (req, res, fields) => {
  let table = 'admin';
  let where = [
    [{
        name: 'id',
        value: 2,
        link: 'or',
        symbols: 'eq'
      },
      {
        name: 'name',
        value: 'Kim',
        symbols: 'eq'
      }
    ]
  ];
  let sqlstr = sql.find(table, null, where);
  let result_info = {
    code: 1,
    info: sqlstr,
    msg: "登录成功！"
  }
  comm.responseJSON(res, result_info);
}

exports.test_sql_delete = (req, res, fields) => {
  let table = 'admin';
  let where = [
    [{
        name: 'id',
        value: 2,
        link: 'or',
        symbols: 'eq'
      },
      {
        name: 'name',
        value: 'Kim',
        symbols: 'eq'
      }
    ]
  ];
  let sqlstr = sql.delete(table, where);
  let result_info = {
    code: 1,
    info: sqlstr,
    msg: "登录成功！"
  }
  comm.responseJSON(res, result_info);
}

exports.test_sql_save = (req, res, fields) => {
  let table = 'order';
  let where = [
    [{
        name: 'p_id',
        value: 1318,
        link: 'or',
        symbols: 'eq'
      },
      {
        name: 'status',
        value: '1',
        symbols: 'eq'
      }
    ]
  ];
let data = [{
    name: 'account',
    value: 123456
}];
  let sqlstr = sql.save(table, data, where);
  let result_info = {
    code: 1,
    info: sqlstr,
    msg: "登录成功！"
  }
  comm.responseJSON(res, result_info);
}


exports.test_sql_select = ( req, res, fields) => {
  let table = 'order';
  let where = [
    [{
        name: 'p_id',
        value: 1318,
        link: 'or',
        symbols: 'eq'
      },
      {
        name: 's_name',
        value: '测试',
        symbols: 'like'
      }
    ],
    {
      name: 'time',
      symbols: 'group by'
    },
    {
      value: [1,20],
      symbols: 'limit'
    }
  ];
  let sqlstr = sql.select(table, null, where);
  let result_info = {
    code: 1,
    info: sqlstr,
    msg: "登录成功！"
  }
  comm.responseJSON(res, result_info);
}

exports.test_sql_add = (req, res, fields) => {
  let table = 'admin';
  let where = [
    [{
        name: 'id',
        value: 2,
        link: 'or',
        symbols: 'eq'
      },
      {
        name: 'name',
        value: 'Kim',
        symbols: 'eq'
      }
    ]
  ];
  let data = [{
    name: 'account',
    value: 123456
  }];
  let sqlstr = sql.add(table, data);
  let result_info = {
    code: 1,
    info: sqlstr,
    msg: "登录成功！"
  }
  comm.responseJSON(res, result_info);
}

exports.test_sql_count = (req, res, fields) => {
  let table = 'admin';
  let where = [
    [{
        name: 'id',
        value: null,
        symbols: 'is not'
    }]
  ];
  let sqlstr = sql.count(table, where);
  let result_info = {
    code: 1,
    info: sqlstr,
    msg: "登录成功！"
  }
  comm.responseJSON(res, result_info);
}