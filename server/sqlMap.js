const comm = require('./common.js');

const transf_str = {
  'egt' : '>=',
  'elt' : '<=',
  'neq' : '<>',
  'eq'  : '=',
  'gt'  : '>',
  'lt'  : '<',
  'in' : 'IN',
  'between' : 'BETWEEN',
  'notbetween' : 'NOT BETWEEN',
  'like' : 'LIKE',
  'notlike' : 'NOT LIKE',
  'and' : 'AND',
  'or' : 'OR',
  'is not' : 'IS NOT',
  'not in' : 'IS NOT IN',
  'distinct' : 'DISTINCT',
  'group by' : 'GROUP BY',
  'order by' : 'ORDER BY',
  'limit' : 'LIMIT',
}

const special_transf = ['between','notbetween','like','notlike'];

const sqlMap = {
    mapWhere : (sqlstr, where) => {
      if(comm.isArrayFn(where)){
        if(where.length > 0){
          sqlstr += ' WHERE ';
          for(let key in where){
            if(comm.isArrayFn(where[key])){
              sqlstr += ' ( ';
              for(let key2 in where[key]){
                let symbols = transf_str[where[key][key2]['symbols']];
                let link = transf_str[where[key][key2]['link']];
                let value = where[key][key2].value;
                let name = where[key][key2].name;
                //默认symbols为等于
                if(comm.empty(symbols)){
                	symbols = '=';
                }
                
                if(typeof value === 'string' && special_transf.indexOf(where[key][key2]['symbols']) == -1){
                  value = "'"+value+"'";
                }else if(where[key][key2]['symbols'] === 'like' || where[key][key2]['symbols'] === 'notlike'){
                  value = "'%"+value+"%'";
                }else if(comm.isArrayFn(value) && special_transf.indexOf(where[key][key2]['symbols']) == -1){
                  value = '( '+ value.join(',') + ')';
                }else if(where[key][key2]['symbols'] == 'between' || where[key][key2]['symbols'] == 'notbetween'){
                  value = value[0] + ' AND ' + value[1];
                }
                if(!comm.empty(link)){
                  sqlstr += ` ${name} ${symbols} ${value} ${link} `;
                }else{
                  sqlstr += ` ${name} ${symbols} ${value} `;
                }
              }
              sqlstr += ' ) ';
            }else{
              let symbols = transf_str[where[key]['symbols']];
              let link = transf_str[where[key]['link']];
              let value = where[key].value;
              let name = where[key].name;
              if(typeof value === 'string' && special_transf.indexOf(where[key]['symbols']) == -1){
                value = "'"+value+"'";
              }else if(where[key]['symbols'] === 'like' || where[key]['symbols'] === 'notlike'){
                value = "'%"+value+"%'";
              }
              if(!comm.empty(name) && !comm.empty(value) && !comm.empty(symbols)){
                if(comm.isArrayFn(value) && special_transf.indexOf(where[key]['symbols']) == -1){
                  value = '( '+ value.join(',') + ')';
                }else if(where[key]['symbols'] == 'between' || where[key]['symbols'] == 'notbetween'){
                  value = value[0] + ' AND ' + value[1];
                }
                if(!comm.empty(link)){
                  sqlstr += ` ${name} ${symbols} ${value} ${link} `;
                }else{
                  sqlstr += ` ${name} ${symbols} ${value} `;
                }
              }else if(!comm.empty(name) && comm.empty(value) && !comm.empty(symbols)){
                sqlstr += ` ${symbols}  ${name} `;
              }else if(comm.empty(name) && !comm.empty(value) && !comm.empty(symbols)){
                if(comm.isArrayFn(value)){
                  value = value.join(',');
                }
                sqlstr += ` ${symbols}  ${value} `;
              }
            }
          }
        }
      }
      return sqlstr;
    },
    mapData: (sqlstr, data, model) => {
      let countData = 0;
      let tempKey = '';
      let tempValue = '';
      if(comm.isArrayFn(data)){
        if(data.length > 0){
          for(let key in data){
            countData++;
            let value = data[key].value;
            let name = data[key].name;
            if(typeof value === 'string'){
              value = "'"+value+"'";
            }
            if(model == 1){
              if(value == undefined){
                continue;
              }
              if(countData >= data.length){
                sqlstr += ` ${name} = ${value} `;
              }else{
                sqlstr += ` ${name} = ${value} , `;
              }
            }else if(model == 2){
              if(value == undefined){
                continue;
              }
              if(countData >= data.length){
                tempKey += ` ${name} `;
                tempValue += ` ${value} `;
              }else{
                tempKey += ` ${name}, `;
                tempValue += ` ${value}, `;
              }
            }
          }
          if(model == 2){
            sqlstr += ` (${tempKey}) VALUES (${tempValue}) `;
          }
        }
      }
      return sqlstr;
    },
    find : (table, field, where) => {
      let result = {};
      let sqlstr = '';
      if(comm.empty(field)){
        field = ' * ';
      }
      if(comm.empty(table)){
        result.code = -1;
        result.msg = '表名不能为空！';
        return result;
      }
      sqlstr = `SELECT ${field} FROM \`${table}\` `;
      sqlstr = sqlMap.mapWhere(sqlstr, where);
      return sqlstr + ' LIMIT 1;';
//    if(typeof(where) == "object" && Object.prototype.toString.call(where).toLowerCase() == "[object object]" && !where.length){ 
//      sqlstr += ' WHERE ';
//      for(let key in where){
//        if(where[key].symbols !== undefined && where[key].symbols !== null && where[key].symbols !== ""){
//          let symbols = transf_str[where[key].symbols];
//          let value = where[key].value;
//          sqlstr += ` ${key} ${symbols} ${value} ,`;
//        }else{
//          sqlstr += `${key}`;
//        }
//      }
//    }
    },
    select : (table, field, where) => {
      let result = {};
      let sqlstr = '';
      if(comm.empty(field)){
        field = ' * ';
      }
      if(comm.empty(table)){
        result.code = -1;
        result.msg = '表名不能为空！';
        return result;
      }
      sqlstr = `SELECT ${field} FROM \`${table}\` `;
      sqlstr = sqlMap.mapWhere(sqlstr, where);
      return sqlstr + ';';
    },
    save : (table, data, where) => {
      let result = {};
      let sqlstr = '';
      
      if(comm.empty(table)){
        result.code = -1;
        result.msg = '表名不能为空！';
        return result;
      }
      if(comm.emptyArray(data)){
        result.code = -1;
        result.msg = '更新的数据不能为空！';
        return result;
      }
      sqlstr = `UPDATE \`${table}\` SET `;
      sqlstr = sqlMap.mapData(sqlstr, data, 1);
      sqlstr = sqlMap.mapWhere(sqlstr, where);
      return sqlstr + ';';
    },
    delete: (table, where) => {
      let result = {};
      let sqlstr = '';
      
      if(comm.empty(table)){
        result.code = -1;
        result.msg = '表名不能为空！';
        return result;
      }
      sqlstr = `DELETE FROM \`${table}\` `;
      sqlstr = sqlMap.mapWhere(sqlstr, where);
      return sqlstr + ';';
    },
    add: (table, data) => {
      let result = {};
      let sqlstr = '';
      
      if(comm.empty(table)){
        result.code = -1;
        result.msg = '表名不能为空！';
        return result;
      }
      sqlstr = `INSERT INTO \`${table}\` `
      sqlstr = sqlMap.mapData(sqlstr, data, 2);
      return sqlstr + ';';
    },
    count: (table, where) => {
    	let result = {};
      let sqlstr = '';
      
    	if(comm.empty(table)){
        result.code = -1;
        result.msg = '表名不能为空！';
        return result;
      }
    	
    	sqlstr = `SELECT COUNT(*) as count FROM \`${table}\` `;
    	sqlstr = sqlMap.mapWhere(sqlstr, where);
    	return sqlstr + ' LIMIT 1;';
    },
    sum: (table, name) => {
    	let result = {};
      let sqlstr = '';
      
    	if(comm.empty(table)){
        result.code = -1;
        result.msg = '表名不能为空！';
        return result;
      }
    	if(comm.empty(name)){
        result.code = -1;
        result.msg = '字段名不能为空！';
        return result;
      }
    	sqlstr = `SELECT SUM(${name}) as count FROM \`${table}\`  LIMIT 1;`;
    	return sqlstr;
    	
    },
    join: (table_a, table_b, fields_a, fields_b, bind_key_a, bind_key_b, type = 1) => {
    	let result = {};
    	let temp_fa = '';
    	let temp_fb = '';
    	if(comm.empty(table_a) || comm.empty(table_b) || comm.empty(bind_key_a) || comm.empty(bind_key_b)){
    		result.code = -1;
    		result.msg = '参数有误';
    		return result;
    	}
    	
    	if(comm.isArrayAndEmpty(fields_a)){
    		temp_fa = ' A.* ,';
    	}else{
    		for(let key in fields_a){
    				temp_fa += " A." + fields_a[key] + ",";
    		}
    	}
    	
    	if(comm.isArrayAndEmpty(fields_b)){
    		temp_fb = 'B.*';
    	}else{
    		for(let key in fields_b){
    			if(key == fields_b.length - 1){
    				temp_fb += " B." + fields_b[key];
    			}else{
    				temp_fb += " B." + fields_b[key] + ",";
    			}
    		}
    	}
    	let sqlstr = '';
    	if(type == 1){
    	  sqlstr = 'SELECT ' + temp_fa + temp_fb + ' FROM ' + table_a + ' AS A LEFT JOIN ' + table_b + ' AS B ON A.' + bind_key_a + ' = B.' + bind_key_b;
    	}else if(type == 2){
    	  sqlstr = 'SELECT COUNT(*) as count FROM ' + table_a + ' AS A LEFT JOIN ' + table_b + ' AS B ON A.' + bind_key_a + ' = B.' + bind_key_b + ' LIMIT 1';
    	}

    	return sqlstr;
    },
    common: {
        select_all_page: 'SELECT * FROM ?? limit ?, ?;',
        select_all: 'SELECT * FROM ?? WHERE ??;',
        count: 'select count(*) as sum from ??;',
        check_exist: 'SELECT COUNT(1) AS num FROM ?? WHERE ?? = ?;'
    },
    user: {
        all_user: 'SELECT * FROM user_account;',
        query_username: 'SELECT * FROM admin WHERE username = ?;',
        add_user: 'INSERT INTO admin(username,password) values(?,?);',
        updata_pd: 'UPDATE admin SET password = ? WHERE username = ?;',
        query_user: 'SELECT * FROM admin WHERE username = ? and password = ?;',
        delete_user: 'DELETE FROM admin WHERE username =?;',
        set_user_detail: 'UPDATE user_detail SET nickname = ?,sex = ?,phone = ?,qq = ?,wechat = ?,email = ?,introduce = ?,province = ?,city = ?,county = ?,address = ?,brith_day = ? WHERE uid = ?;',
        login: 'SELECT * FROM admin WHERE account = ?;',
        register: 'INSERT INTO user_account (account, password, power, type) values (?, ?, ?, ?);',
        add_user_detail: 'INSERT INTO user_detail (name, email, province, city, register_time, register_ip) values (?, ?, ?, ?, ?, ?);',
        get_user_list: 'SELECT '
    },
    admin: {
      getInfo: 'SELECT * FROM (SELECT * FROM admin WHERE id = ?) AS admin LEFT JOIN admin_detail ON admin.id = admin_detail.uid;',
      insertInfo: 'INSERT INTO admin_detail(name,phone,headimg,register_time,register_ip,email,wechat,qq,status,nickname,introduce,province,city,county,sex,birth_day,address,uid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,);',
      setInfo: 'UPDATE admin_detail SET nickname = ?,sex = ?,phone = ?,qq = ?,wechat = ?,email = ?,introduce = ?,province = ?,city = ?,county = ?,address = ?,brith_day = ? WHERE uid = ?;',
      checkLogin: 'SELECT account,password FROM admin WHERE account = ?',
      login: 'SELECT password, id FROM admin WHERE account = ?;',
    },
    article: {
        add: 'INSERT INTO article (uid, title, kind, status, content, disc, imgurl, time) values (?, ?, ?, ?, ?, ?, ?, ?);',
        edit: 'UPDATE article WHERE id = ?, uid = ? SET title = ?, kind = ?, status = ?, content = ?, disc = ?, imgurl = ?, time = ?;',
        delete: 'UPDATE article WHERE id = ?, uid = ? SET status = 2, time = ?;',
        add_kind: 'INSERT INTO article (uid, name, time) values (?, ?, ?);',
        edit_kind: 'UPDATE article_kind WHERE uid = ?, id = ? SET name = ?, status = ?;',
        delete_kind: 'UPDATE article_kind WHERE uid = ?, id = ? SET status = 2, time = ?;',
        delete: 'DELETE FROM article '
    }
}

module.exports = sqlMap;