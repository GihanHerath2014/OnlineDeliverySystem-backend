module.exports = (app) => {
    const {
        register,
        findAll
    } = require("../controllers/deliverPesonsData");
  
    // Create a new Product
    app.post("/delivers/register", register);

    app.get('/delivers/alldata', findAll);

}