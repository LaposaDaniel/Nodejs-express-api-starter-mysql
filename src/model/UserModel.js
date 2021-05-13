const defaultMySQLModel = require('../model/DefaultMySQLModel');

class userModel extends defaultMySQLModel {
    constructor() {
        super("user");
    }

    myFunction(id, cb) {
        console.log(`SELECT * FROM user WHERE id > ${id} AND name = 'sapka'`);
        console.log(`SELECT * FROM user WHERE id > ${this.db.escape(id)} AND name = 'sapka'`);
        this.db.query(`SELECT * FROM user WHERE id > ${this.db.escape(id)} AND name = 'sapka'`, function (err, result) {
            if (err) throw err;
            cb(result);
        })
    }
}

module.exports = new userModel();
