module.exports = (app) => {
    const {
        register,
        findAll,
        login,
        findOne,
        update
    } = require("../controllers/deliverPesonsData");
  
    // Create a new Product
    app.post("/delivers/register", register);

    app.get('/delivers/alldata', findAll);

    app.post('/delivers/login', login);

    app.get('/delivers/:email', findOne);

    app.post("/delivers/update/:_Id", update);

}