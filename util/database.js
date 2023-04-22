const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'earth4800', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'earth4800',
//     database: 'node-complete'
// })

// module.exports = pool.promise();