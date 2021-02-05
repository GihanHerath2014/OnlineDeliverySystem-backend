module.exports = (app) => {
    const {
      create,
      findu_id,
      findAll
    } = require("../controllers/incomeOfDelivers");
  
    // Create a new Product
    app.post("/incomeOfDelivers/add", create);

    app.get("/incomeOfDelivers/:u_id", findu_id);

    app.get("/incomeOfDelivers/allincom/list", findAll);
}