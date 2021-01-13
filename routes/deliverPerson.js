module.exports = (app) => {
    const {
        register
    } = require("../controllers/deliverPesonsData");
  
    // Create a new Product
    app.post("/delivers/register", register);

}