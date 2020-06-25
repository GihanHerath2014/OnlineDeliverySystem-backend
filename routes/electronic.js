module.exports = (app) => {
    const electronic = require('../controllers/electronic');

    // Create a new Product
    app.post('/electronic/register', electronic.create);

    // Retrieve all Sellers
    app.get('/electronic', electronic.findAll);

    // Retrieve a single Seller with category
    // app.get('/electronic/:category', products.findOne);
}