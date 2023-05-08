const ObjectId = require('mongodb').ObjectId;
const { getDb } = require('../util/database');

class User {
	constructor(username, email, cart, id) {
		this.username = username;
		this.email = email;
		this.cart = cart;
		this._id = id;
	}

	save() {
		const db = getDb();
		return db
			.collection('users')
			.insertOne(this)
			.then((user) => user)
			.catch((err) => console.log(err));
	}

	addToCart(product) {
		const cartProductIndex = this.cart.items.findIndex((cp) => {
			return cp.productId.toString() == product._id.toString();
		});
		const updatedCartItems = [...this.cart.items];
		if (cartProductIndex >= 0) {
			updatedCartItems[cartProductIndex].quantity += 1;
		} else {
			updatedCartItems.push({ productId: product._id, quantity: 1 });
		}
		const updatedCart = {
			items: updatedCartItems,
		};
		const db = getDb();
		console.log(updatedCart);
		return db
			.collection('users')
			.updateOne(
				{ _id: new ObjectId(this._id) },
				{ $set: { cart: updatedCart } }
			);
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
