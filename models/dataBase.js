import pgPromise from 'pg-promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const pgp = pgPromise({});
const __dirname = path.resolve();
dotenv.config();

const cn = {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
};


class DBController {
    constructor() {
        this.connectionParams = cn;
        this.db = pgp(this.connectionParams);

        this.tablesDescription = JSON.parse(
            fs.readFileSync(__dirname + '/tables-description.json'));
    }

    async directQuerry (querry, singleReturn=false) {
        // console.log(querry);
        try {
            let data;
            if (singleReturn) {
                data = await this.db.one(querry);
                return data;
            }
            else {
                data = await this.db.multi(querry);
                return data[0];
            }
        }
        catch (error) {
            return error;
        }
    }
}

class DBFinder {
    constructor(dbController) {
        let db = dbController;
        this.db = db;
        this.tablesDescription = db.tablesDescription;
    }

    async querry_with_cond (table, column, equal, singleReturn=false) {
        let querry = `select * from ${table} where ${column}='${equal}';`
        return this.db.directQuerry(querry, singleReturn);
    }

    async querryWithCond (options, singleReturn=false) {
        if (typeof options.select == 'undefined') {
            options.select = '*';
        }
        
        let select = 'SELECT ' + options.select + ' FROM ' + options.table + ' ';
        let conditional = '';

        if (Array.isArray(options.cond)) {
            conditional = 'WHERE '
            for (let cond of options.cond) {
                conditional += cond.column + 
                cond.comparisonSign + "'" + cond.comparisonValue + "'" + ' AND ';
            }
            conditional = conditional.slice(0, -5);
        }
        else {
            conditional = 'WHERE ' + options.cond.column + 
            options.cond.comparisonSign + "'" + options.cond.comparisonValue + "'";
        }

        let querry = select + conditional;
        return this.db.directQuerry(querry, singleReturn);
    }
}

const dbController = new DBController();
const dbFinder = new DBFinder(dbController)

export {dbFinder};