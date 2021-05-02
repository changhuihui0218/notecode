let db = require('../models/db')
module.exports= {
    getByNameAndPwd: function(username,password) {
        return db.query(`select * from passwor where name=? and pass=?`,[username,password])
    }
}