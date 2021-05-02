const db = require('./db');
module.exports = {
    getUser: function(name,password) {
        return db.query(`select * from root where name=? and password=? `,[name,password])   
    }
}