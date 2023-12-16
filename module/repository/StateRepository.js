module.exports = class StateRepository {
    constructor(db) {
        this._db = db;
    }

    save(applicationId, state) {
        let sql = `INSERT
        OR REPLACE 
               INTO application_state(application_id, state) 
               VALUES(?, ?)`;

        this._db.run(sql, [applicationId, state], (err, row) => {});
    }

    get(applicationId, cb) {
        let sql = `SELECT state
                   FROM application_state
                   WHERE application_id = ?`;

        this._db.get(sql, [applicationId], (err, row) => {
            if (row) {
                return cb(row.state);
            } else {
                cb();
            }
        });
    }
}