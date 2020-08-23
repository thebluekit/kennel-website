import {dbModifier} from './dataBase.js';

class Feedback {
    constructor(dbModifier) {
        this.dbModifier = dbModifier
        this.dbController = dbModifier.db;
        this.td = dbModifier.tablesDescription;
    }

    async addFeedback(userName, userEmail, userPhone, userQuestion) {
        let tableName = 'feedback'
        let values = [userName, userEmail, userPhone, userQuestion]
        let response = await this.dbModifier.addRow(tableName, values);
        return response;
    }
}

let feedback = new Feedback(dbModifier);

export {feedback};