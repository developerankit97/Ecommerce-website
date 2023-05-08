const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
require('dotenv').config();
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
	User.findById('645971da00381a9d191af8be')
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((e) => console.error(e));
});

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.use(errorController.get404);

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.veoi4dk.mongodb.net/shop?retryWrites=true&w=majority`
	)
	.then(() => {
		app.listen(4000);
	});
