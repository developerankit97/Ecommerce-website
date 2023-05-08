// const mongodb = require('mongodb');

// const MongoClient = mongodb.MongoClient;

// let _db;

// const mongoConnect = (callback) => {
// 	MongoClient.connect(
// 		`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.veoi4dk.mongodb.net/shop?retryWrites=true&w=majority`
// 	)
// 		.then((client) => {
// 			console.log('connected');
// 			_db = client.db();
// 			callback();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			throw err;
// 		});
// };

// const getDb = () => {
// 	if (_db) {
// 		return _db;
// 	}
// 	throw 'No database found';
// };

// exports.getDb = getDb;

// exports.mongoConnect = mongoConnect;
