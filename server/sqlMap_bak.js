const sqlMap = {
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
        add_user_detail: 'INSERT INTO user_detail (name, email, province, city, register_time, register_ip) values (?, ?, ?, ?, ?, ?);'
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