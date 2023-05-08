const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const { mongoConnect } = require('./util/database');
require('dotenv').config();

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// app.use((req, res, next) => {
// 	User.findByPk(1)
// 		.then((user) => {
// 			req.user = user;
// 			console.log('************************************');
// 			user.getCart()
// 				.then((cart) => {
// 					return cart
// 						.getProducts()
// 						.then((products) => {
// 							console.log('**************************');
// 							console.log(products);
// 							console.log('**************************');
// 						})
// 						.catch((e) => console.log(err));
// 				})
// 				.catch((err) => console.log(err));
// 			next();
// 		})
// 		.catch((e) => console.error(e));
// });

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
// app.use(shopRoutes);

// app.use(errorController.get404);

mongoConnect(() => {
	app.listen(4000);
});
