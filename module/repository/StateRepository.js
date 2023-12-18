module.exports = class StateRepository {
    constructor(db) {
        this._db = db;
    }

    async save(applicationId, state) {
        let collection = this._db.collection("application_states");

        let query = { applicationId: applicationId };
        let update = { $set: { applicationId: applicationId, state: state }};
        let options = { upsert: true };
        await collection.updateOne(query, update, options);
    }

    async get(applicationId) {
        let collection = this._db.collection("application_states");
        let result = await collection.findOne({applicationId: applicationId});
        return result !== null ? result.state : null;
    }
}