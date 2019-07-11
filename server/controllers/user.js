'use strict';

const common = require('../common');
const sql = require('../sqlMap'); // sql语句集

// 用户登录接口
exports.admin_login = (req, res, fields) => {
	let table = 'admin';
	let where = [
		[{
			name: 'account',
			value: req.body.ac,
		}]
	];
	let sqlstr = sql.find(table, null, where);
	common.getLink(sqlstr, [], (err, result) => {
		if(err) {
			res.send(err);
		} else {
			let result_info = {};
			if(common.md5(req.body.pd) === result[0]['password']) {
				let user = result[0];
				req.session.user = user;
				req.session.save();
				res.cookie('NODESESSIONID', req.sessionID, {
					maxAge: 1000 * 10000
				});
				console.log(req.session.user);
				console.log('success login');
				result_info = {
					code: 1,
					info: result[0]['name'],
					msg: "登录成功！"
				}
			} else {
				result_info = {
					code: 2,
					info: null,
					a: [],
					msg: "登录失败！"
				}
				console.log('error login');
			}
			common.responseJSON(res, result_info);
		}
	});
};

// 查询用户列表
exports.user_list = (req, res, fields) => {
	let name = req.body.name;
	let phone = req.body.phone;
	let account = req.body.ac;
	let where = [];
	
	let sqlstr = sql.join('user_detail','user_account',[],['power','type','account','status'],'uid','id');
	if(!common.empty(name) && (!common.empty(phone) || !common.empty(account))){
		where.push({
			name: 'A.name',
			value: name,
			symbols: 'like',
			link: 'or'
		})
	}else if(!common.empty(name)){
		where.push({
			name: 'A.name',
			value: name,
			symbols: 'like',
		})
	}
	
	if(!common.empty(phone) && !common.empty(account)){
		where.push({
			name: 'A.phone',
			value: phone,
			symbols: 'like',
			link: 'or'
		});
	}else if(!common.empty(phone)){
		where.push({
			name: 'A.phone',
			value: phone,
			symbols: 'like',
		});
	}
	
	if(!common.empty(account)){
		where.push({
		    name: 'B.account',
		    value: account,
		    symbols: 'like'
	   });
	}
	sqlstr = sql.mapWhere(sqlstr,where);
	common.getLink(sqlstr, [], (err, result) => {
		if(err) {
			res.send(err);
		} else {
			let result_info = {
				code: 1,
				msg: '获取成功！',
				info: result
			};
			common.responseJSON(res, result_info);
		}
	});
}

// 获取管理员用户列表
exports.admin_user_list = (req, res, fields) => {
	
}
// 用户注册接口
exports.user_register = (req, res, fields) => {
	
}
