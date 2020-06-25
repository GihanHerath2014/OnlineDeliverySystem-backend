module.exports = (app) => {
    const products = require('../controllers/productDetails');

    // Create a new Product
    app.post('/products/register', products.create);

    // Retrieve all Product
    app.get('/products/list', products.findAll);

    // Retrieve a single Product with category
    app.get('/products/:category', products.findaaa);

    // Update a Product with _Id
    app.put('/products/:_Id', products.update);

    // Delete a Product with _Id
    app.delete('/products/:_Id', products.deleteProduct);

    // Retrieve a single Product with category
    // app.get('/products/:category?:shopname', products.findaaa);
}