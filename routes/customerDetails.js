module.exports = (app) => {
    const customer = require('../controllers/customerDetails');

    // Create a new Customer
    app.post('/customers/register', customer.register);

    //get acess to login by email and user type
    app.post('/customers/login', customer.login);

    //view customer profile
    app.post('/customers/profile', customer.profile);

    // get all customer details for table
    app.post('/customersDetails', customer.getDetails);

    app.get('/customers/alldata', customer.findAll);


}
