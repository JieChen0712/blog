'use strict';

const common = require('../common');
const sql = require('../sqlMap'); // sql语句集
const tb_admin = 'admin';
const tb_admin_detail = 'admin_detail';


/********************************   管理员接口     ***************************/
// 用户登录接口
exports.admin_login = async (req, res, fields) => {
  let result_info = {};
	let where = [{
		name: 'account',
		value: req.body.ac,
	}];
	let sqlstr = sql.find(tb_admin, null, where);
//	console.log(sqlstr);
	
	let userInfo = await common.findSql(sqlstr).catch(err => {res.json(err)});
	
	if(userInfo.status !== 1){
	  result_info = {
	    code: -1,
	    msg: "该账号已被禁用",
	    info: []
	  }
	  return common.responseJSON(res, result_info);
	}
	
	if(userInfo && common.md5(req.body.pd) === userInfo['password']){
    req.session.user = userInfo;
    req.session.save();
    res.cookie('NODESESSIONID', req.sessionID, {
      maxAge: 1000 * 10000
    });
//  console.log(req.session.user);
//  console.log('success login');
    result_info = {
      code: 1,
      info: userInfo['name'],
      msg: "登录成功！"
    }
	}else{
	  result_info = {
      code: 2,
      info: null,
      a: [],
      msg: "登录失败！"
    }
//  console.log('error login');
	}
	common.responseJSON(res, result_info);
	
};

// 管理员登录接口
exports.register = async (req, res, fields) => {
  let sqlstr,findstr,result_info,where,data;
  let account = req.body.ac,
  status = common.empty(req.body.status)?3:req.body.status,
  type = common.empty(req.body.type)?2:req.body.type;
  
  if(type == 1 || status == 1){
    if(common.empty(req.session.user) || req.session.user.type != 1 || req.session.user.status != 1){
      result_info = {
        code: -3,
        msg: "注册该管理员权限不足",
        info: []
      }
      return common.responseJSON(res, result_info);
    }
  }
  
  if(common.empty(account)){
    result_info = {
      code: -1,
      msg: "账号不能为空",
      info: []
    }
    return common.responseJSON(res, result_info);
  }
  
  where = [{
    name: 'account',
    value: account
  }];
  
  findstr = sql.find(tb_admin, '', where);
  
  let is_exsit = await common.findSql(findstr).catch(err => {res.json(err)});
  
  if(is_exsit){
    result_info = {
      code: -2,
      msg: "该账号已存在",
      info: []
    }
    return common.responseJSON(res, result_info);
  }
  
  data = [
    {name: 'account',value: account},
    {name: 'password',value: common.md5(req.body.pd)},
    {name: 'name',value: req.body.name},
    {name: 'type',value: type},
    {name: 'status',value: status}
  ];
  
  sqlstr = sql.add(tb_admin, data);
  
  let res_add = await common.excSql(sqlstr).catch(err => {res.json(err)});
  
  if(res_add){
    data = [
      {name: 'qq',value: req.body.qq},
      {name: 'wechat',value: req.body.wechat},
      {name: 'phone',value: req.body.phone},
      {name: 'name',value: req.body.name},
      {name: 'email', value: req.body.email},
      {name: 'nickname', value: req.body.name},
      {name: 'uid', value: res_add['insertId']},
      {name: 'register_time', value: common.getTime()}
    ]
    sqlstr = sql.add(tb_admin_detail, data);
    let res_add_detail = common.excSql(sqlstr).catch(err => {res.json(err)})
  }
  result_info = {
    code: 1,
    msg: "注册成功",
    info: res_add
  }
  common.responseJSON(res, result_info);
}

// 获取管理员用户列表
exports.admin_user_list = async (req, res, fields) => {
	let name = req.body.name;
	let page_list_num = req.body.page_list_num;
	let time_around = req.body.time_around;
	let page = req.body.page;
	let where = [];
	let result_info;
	
	let sqlstr = sql.join('admin_detail','admin',[],['power','type','account','status','name'],'uid','id');
	if(common.empty(page)){
	  page = 1;
	}
	if(common.empty(page_list_num)){
    page_list_num = 20;
  }
	if(!common.empty(name)){
		where.push({
			name: 'A.name',
			value: name,
			symbols: 'like',
			link: 'or'
		},{
      name: 'A.phone',
      value: name,
      symbols: 'like',
      link: 'or'
    },{
      name: 'B.account',
      value: name,
      symbols: 'like',
    })
	}
	if(common.isArrayFn(time_around) && !common.emptyArray(time_around)){
	  time_around[0] = common.strToTime(time_around[0]);
	  time_around[1] = Number(common.strToTime(time_around[1])) + 86400;
	  where = [where];
		where.unshift({
			name: 'A.register_time',
			value: time_around,
			symbols: 'between',
			link: 'and'
		});
	}
	sqlstr = sql.mapWhere(sqlstr,where);
	
	let count_sqlstr = sql.join('admin_detail','admin',[],['power','type','account','status','name'],'uid','id',2);
	let count = await common.fieldSql(count_sqlstr).catch(err => {res.json(err)});
	
	sqlstr += " LIMIT " + ((page - 1) * page_list_num) + ','+ (page * page_list_num);
	let list = await common.excSql(sqlstr).catch(err => {res.json(err)});
	
	if(list){
	  for(let i in list){
      list[i]['register_time'] = common.formatDate(list[i]['register_time'],"YYYY-MM-dd");
      list[i]['brith_day'] = common.formatDate(list[i]['brith_day'],"YYYY-MM-dd");
    }
	  result_info = {
      code: 1,
      msg: '获取成功！',
      info: list,
      total: count
    };
	}else{
	  result_info = {
      code: -1,
      msg: '获取失败！',
      info: list,
      total: count
    };
	}
	common.responseJSON(res, result_info);
	
}

// 获取管理员用户详情
exports.admin_user_info = async (req, res, fields) => {
	let where = [{
	  name: 'uid',
	  value: req.session.user.id,
	  symbols: 'eq'
	}];
	let sqlstr = sql.find(tb_admin_detail, null, where);
	let info = await common.findSql(sqlstr).catch(err => {res.json(err)});
	let result_info = {
    code: 1,
    msg: '获取成功！',
    info: info
  };
  common.responseJSON(res, result_info);
	
}

exports.admin_set_detail = async (req, res, fields) => {
  let where = [{
      name: 'uid',
      value: req.session.user.id,
      symbols: 'eq'
  }];
  let data = [{
    name: 'name',
    value: req.body.name
  },{
    name:'phone',
    value: req.body.phone
  },{
    name: 'headimg',
    value:req.body.headimg
  },{
    name: 'email',
    value:req.body.email
  },{
    name: 'wechat',
    value: req.body.wechat
  },{
    name: 'qq',
    value: req.body.qq
  },{
    name: 'nickname',
    value: req.body.nickname
  },{
    name: 'introduce',
    value: req.body.introduce
  },{
    name: 'province',
    value: req.body.province
  },{
    name: 'city',
    value: req.body.city
  },{
    name: 'county',
    value: req.body.county
  },{
    name: 'sex',
    value: req.body.sex
  },{
    name: 'birth_day',
    value: req.body.birth_day
  },{
    name: 'province',
    value: req.body.province
  },{
    name: 'address',
    value: req.body.address
  },{
    name: 'avatar',
    value: req.body.avatar
  }];
  let sqlstr = sql.save(tb_admin_detail, data, where);
//return false;
  let res_save = await common.excSql(sqlstr).catch(err => {res.json(err)});
  let result_info;
  if(res_save){
    result_info = {
      code: 1,
      msg: '修改成功！',
      info: res_save
    };
  }else{
    result_info = {
      code: -1,
      msg: '修改失败！',
      info: res_save
    };
  }
  common.responseJSON(res, result_info);
  
}
