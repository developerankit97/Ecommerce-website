const { getDb } = require('../util/database');

class Product {
	constructor(title, price, description, imageUrl) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
	}

	save() {
		const db = getDb();
		return db
			.collection('products')
			.insertOne(this)
			.then((result) => {
				console.log(result);
			})
			.catch((err) => console.log(err));
	}
}

module.exports = Product;

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     unique: true,
//     allowNull: false
//   },
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// })

// module.exports = Product;

// // const db = require('../util/database');

// // module.exports = class Product {
// //   constructor(i, title, imageUrl, description, price) {
// //     this.title = title;
// //     this.imageUrl = imageUrl;
// //     this.description = description;
// //     this.price = price;
// //   }

// //   save() {
// //     return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)', [
// //       this.title,
// //       this.price,
// //       this.description,
// //       this.imageUrl
// //     ]);
// //   }

// //   static fetchAll(cb) {
// //     return db.execute('SELECT * FROM products')
// //   }

// //   static findById(id) {
// //     return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
// //   }

// //   static deleteById(id) {
// //     return db.execute('DELETE FROM products WHERE products.id = ?', [id]);
// //   }
// // };
