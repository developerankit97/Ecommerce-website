const path = require('path');
const fs = require('fs');

const getDataFromFile = (cb) => {
    fs.readFile(path.join(path.dirname(require.main.filename), 'data', 'products.json'), (err, data) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(data));
        }
    });
}

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getDataFromFile(products => {
            products.push(this);
            fs.writeFile(path.join(path.dirname(require.main.filename), 'data', 'products.json'), JSON.stringify(products), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        })
    }

    static fetchAll(cb) {
        getDataFromFile(cb);
    }
}