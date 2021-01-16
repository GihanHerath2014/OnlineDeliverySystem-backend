module.exports = (app) => {
    const {
        register,
        findAll,
        login
    } = require("../controllers/deliverPesonsData");
  
    // Create a new Product
    app.post("/delivers/register", register);

    app.get('/delivers/alldata', findAll);

    app.post('/delivers/login', login);

}