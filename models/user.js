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

	getCart() {
		const db = getDb();
		const productIds = this.cart.items.map((id) => id.productId);
		return db
			.collection('products')
			.find({ _id: { $in: productIds } })
			.toArray()
			.then((products) => {
				return products.map((product) => {
					return {
						...product,
						quantity: this.cart.items.find((i) => {
							return (
								i.productId.toString() ===
								product._id.toString()
							);
						}).quantity,
					};
				});
			})
			.catch((err) => console.log(err));
	}

	deleteItemFromCart(prodId) {
		const updatedCart = this.cart.items.filter(
			(p) => p.productId.toString() !== prodId.toString()
		);
		const db = getDb();
		return db.collection('users').updateOne(
			{ _id: new ObjectId(this._id) },
			{
				$set: { cart: { items: updatedCart } },
			}
		);
	}

	addOrder() {
		const db = getDb();
		return this.getCart()
			.then((products) => {
				const order = {
					items: products,
					user: {
						_id: new ObjectId(this._id),
						name: this.name,
					},
				};
				return db.collection('orders').insertOne(order);
			})
			.then((result) => {
				this.cart = { items: [] };
				return db.collection('users').updateOne(
					{ _id: new ObjectId(this._id) },
					{
						$set: { cart: { items: [] } },
					}
				);
			});
	}

	getOrders() {
		const db = getDb();
		return db
			.collection('orders')
			.find({ 'user._id': new ObjectId(this._id) })
			.toArray();
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
