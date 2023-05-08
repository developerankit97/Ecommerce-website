const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product({
		title: title,
		price: price,
		description: description,
		imageUrl: imageUrl,
		userId: req.user,
	});
	product
		.save()
		.then(() => res.redirect('/admin/products'))
		.catch((err) => {
			console.error(err);
		});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/');
	}
	const prodId = req.params.productId;
	Product.findById(prodId)
		.then((product) => {
			res.render('admin/edit-product', {
				pageTitle: 'Edit Product',
				path: '/admin/edit-product',
				editing: editMode,
				product: product,
			});
		})
		.catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	Product.findById(prodId)
		.then((product) => {
			product.title = title;
			product.description = description;
			product.price = price;
			product.imageUrl = imageUrl;
			return product.save();
		})
		.then(() => res.redirect('/admin/products'))
		.catch((err) => console.error(err));
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findByIdAndRemove(prodId)
		.then(() => res.redirect('/admin/products'))
		.catch((err) => console.error(err));
};

exports.getProducts = (req, res, next) => {
	Product.find()
		.then((products) => {
			console.log(products);
			res.render('admin/products', {
				prods: products,
				pageTitle: 'Admin Products',
				path: '/admin/products',
			});
		})
		.catch((err) => console.log(err));
};
