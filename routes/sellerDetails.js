module.exports = (app) => {
    const sellers = require('../controllers/sellerDetails');

    // Create a new Seller
    app.post('/sellers', sellers.create);

    // Retrieve all Sellers
    app.get('/sellers', sellers.findAll);

    // Retrieve a single Seller with _Id
    app.get('/sellers/:_Id', sellers.findOne);

    // Update a Seller with _Id
    app.put('/sellers/:_Id', sellers.update);

    // Update a Seller with _Id
    app.put('/sellers/statuesUpdate/:_Id', sellers.updateStatues);


    // Delete a Seller with _Id
    app.delete('/sellers/:_Id', sellers.delete);
}
