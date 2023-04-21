const http = require('http');
const express = require('express');

const app = express();

app.use('/add-product', (req, res, next) => {
    res.send("<h1>This is a Add Product Page</h1>");
})

app.use('/', (req, res, next) => {
    res.send("<h1>This is a HomePage</h1>");
})

app.listen(4000);