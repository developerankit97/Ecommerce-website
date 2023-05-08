const ObjectId = 'mongodb'.ObjectId;
const { getDb } = require('../util/database');

class User {
	constructor(username, email) {
		this.username = username;
		this.email = email;
	}

	save() {
		const db = getDb();
		return db
			.collection('users')
			.insertOne(this)
			.then((user) => user)
			.catch((err) => console.log(err));
	}

	static findById(userId) {
		const db = getDb();
		return db
			.collection('users')
			.findOne({ _id: new ObjectId(userId) })
			.then((user) => user)
			.catch((err) => console.log(err));
	}
}

module.exports = User;