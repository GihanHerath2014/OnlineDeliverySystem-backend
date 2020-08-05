var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
const dbConfig = require("./config/database.js");
var mongoose = require("mongoose");
var port = process.env.PORT || 3000;
const dotenv = require("dotenv");
const fileupload = require("express-fileupload");
const path = require("path");

dotenv.config({ path: "./config/config.env" });
app.use(fileupload());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Online Delivery System Backend API." });
});

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

require("./routes/customerDetails")(app);
require("./routes/sellerDetails")(app);
require("./routes/productDetails")(app);
require("./routes/electronic")(app);

app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
