var mysql = require('mysql');
const { createConnection } = require('../config.json');

module.exports = class defaultMySQLModel {
    constructor(table) {
        this.table = table;
        this.db = mysql.createConnection(createConnection);
    }

    /**
     * @param {JSON} data {columNames: string[], where: object[]}
     * @param {Function} cb
     * select data by object details. {columNames: string[], where: object[]}
    */
    select(rouls, cb) {
        let data;
        if (rouls.columNames) {
            data = rouls.columNames.join(', ');
        } else {
            data = '*';
        }

        let sql = `SELECT ${data} FROM ${this.table}`;
        if (rouls.where) {
            sql += ` WHERE ` + this.#where(rouls.where);
        }

        this.db.query(sql, cb);
    }

    /**
     * @param {object} data 
     * @param {Function} cb
     * Inser data by object names.
     */
    insert(data, cb) {
        this.db.query(`INSERT INTO ${this.table} (${Object.keys(data).join(', ')}) VALUES (${Object.values(data)
            .map((value) => {
                if (typeof value == 'object') {
                    return this.db.escape(
                        `${value.getFullYear()}-${value.getMonth()}-${value.getDate()} ${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`
                    );
                } else {
                    return this.db.escape(value);
                }
            }).join(', ')})`,
            cb
        );
    }

    /**
     * @param {object} data
     * @param {Function} cb
     * Update data by object names.
     */
    update(data, cb) {
        const keys = Object.keys(data.updateData);
        this.db.query(`
            UPDATE ${this.table} SET 
                ${keys
                .map((key) => {
                    if (typeof data.updateData[key] == 'object') {
                        return `${key} = ${this.db.escape(
                            `${data.updateData[key].getFullYear()}-${data.updateData[key].getMonth()}-${data.updateData[key].getDate()} ${data.updateData[key].getHours()}:${data.updateData[key].getMinutes()}:${data.updateData[key].getSeconds()}`
                        )}`;
                    } else {
                        return `${key} = ${this.db.escape(data.updateData[key])}`;
                    }
                })
                .join(', ')}
            WHERE 
                ${this.#where(data.where)}`,
            cb
        );
    }

    /**
     * @param {object[]} rouls
     * @param {Function} cb
     * Delete data by object names.
     */
    delete(rouls, cb) {
        this.db.query(`
            DELETE
                FROM ${this.table}
            WHERE 
                ${this.#where(rouls)}`,
            cb
        );
    }

    /**
     * @param {Object} prams
     *  
     */
    #where(prams) {
        return prams
            .map((item) => {
                return Object.keys(item)
                    .map((key) => {
                        if (typeof item[key] == 'object') {
                            return `${key} = ${this.db.escape(
                                `${item[key].getFullYear()}-${item[key].getMonth()}-${item[key].getDate()} ${item[key].getHours()}:${item[key].getMinutes()}:${item[key].getSeconds()}`
                            )}`;
                        } else {
                            return `${key} = ${this.db.escape(item[key])}`;
                        }
                    })
                    .join(' AND ')
            })
            .join(' OR ');
    }
}
