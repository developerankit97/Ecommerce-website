const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

module.exports = mongoose.model('Product', productSchema);

// const { getDb } = require('../util/database');
// const mongodb = require('mongodb');

// class Product {
// 	constructor(title, price, description, imageUrl, id, userId) {
// 		this.title = title;
// 		this.price = price;
// 		this.description = description;
// 		this.imageUrl = imageUrl;
// 		this._id = id ? new mongodb.ObjectId(id) : null;
// 		this.userId = userId;
// 	}

// 	save() {
// 		const db = getDb();
// 		let dbOp;
// 		if (this._id) {
// 			dbOp = db.collection('products').updateOne(
// 				{ _id: this._id },
// 				{
// 					$set: this,
// 				}
// 			);
// 		} else {
// 			dbOp = db.collection('products').insertOne(this);
// 		}
// 		return dbOp
// 			.then((result) => {
// 				console.log(result);
// 			})
// 			.catch((err) => console.log(err));
// 	}

// 	static fetchAll() {
// 		const db = getDb();
// 		return db
// 			.collection('products')
// 			.find()
// 			.toArray()
// 			.then((products) => products)
// 			.catch((err) => console.log(err));
// 	}

// 	static findById(prodId) {
// 		const db = getDb();
// 		return db
// 			.collection('products')
// 			.find({ _id: new mongodb.ObjectId(prodId) })
// 			.next()
// 			.then((product) => product)
// 			.catch((err) => console.log(err));
// 	}

// 	static deleteById(prodId) {
// 		const db = getDb();
// 		return db
// 			.collection('products')
// 			.deleteOne({ _id: new mongodb.ObjectId(prodId) })
// 			.then((result) => result)
// 			.catch((err) => console.log(err));
// 	}
// }

// module.exports = Product;

// // const Product = sequelize.define('product', {
// //   id: {
// //     type: Sequelize.INTEGER,
// //     primaryKey: true,
// //     autoIncrement: true,
// //     unique: true,
// //     allowNull: false
// //   },
// //   title: {
// //     type: Sequelize.STRING,
// //     allowNull: false
// //   },
// //   price: {
// //     type: Sequelize.DOUBLE,
// //     allowNull: false
// //   },
// //   imageUrl: {
// //     type: Sequelize.STRING,
// //     allowNull: false
// //   },
// //   description: {
// //     type: Sequelize.STRING,
// //     allowNull: false
// //   }
// // })

// // module.exports = Product;

// // // const db = require('../util/database');

// // // module.exports = class Product {
// // //   constructor(i, title, imageUrl, description, price) {
// // //     this.title = title;
// // //     this.imageUrl = imageUrl;
// // //     this.description = description;
// // //     this.price = price;
// // //   }

// // //   save() {
// // //     return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)', [
// // //       this.title,
// // //       this.price,
// // //       this.description,
// // //       this.imageUrl
// // //     ]);
// // //   }

// // //   static fetchAll(cb) {
// // //     return db.execute('SELECT * FROM products')
// // //   }

// // //   static findById(id) {
// // //     return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
// // //   }

// // //   static deleteById(id) {
// // //     return db.execute('DELETE FROM products WHERE products.id = ?', [id]);
// // //   }
// // // };
