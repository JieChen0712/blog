const sqlMap = {
    common: {
        select_all: 'SELECT * FROM ?? limit ?, ?',
        count: 'select count(*) as sum from ??'
    },
    user: {
        all_user: 'SELECT * FROM admin',
        query_username: 'SELECT * FROM admin WHERE username = ?',
        add_user: 'INSERT INTO admin(username,password) values(?,?)',
        updata_pd: 'UPDATE admin SET password = ? WHERE username = ?',
        query_user: 'SELECT * FROM admin WHERE username = ? and password = ?',
        delete_user: 'DELETE FROM admin WHERE username =?',
        set_user_detail: 'UPDATE user_detail SET nickname = ?,sex = ?,phone = ?,qq = ?,wechat = ?,email = ?,introduce = ?,province = ?,city = ?,county = ?,address = ?,brith_day = ? WHERE uid = ?',
        login: 'SELECT * FROM admin WHERE account = ?'
    }
}

module.exports = sqlMap;