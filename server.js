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
var multer = require('multer');
var fileExtension = require("file-extension");

dotenv.config({ path: "./config/config.env" });
//app.use(fileupload());
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));
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
require("./routes/cartdetails")(app);
require("./routes/checkCart")(app);
require("./routes/deliverPerson")(app);
require("./routes/deliveryCartData")(app);

/* ----------------------------------------- image upload ---------------------------------- */

// Configure Storage
var storage = multer.diskStorage({

  // Setting directory on disk to save uploaded files
  destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
  },

  // Setting name of file saved
  filename: function (req, file, cb) {
      //cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
      cb(null, file.originalname)
  }
})

var upload = multer({
  storage: storage,
  limits: {
      // Setting Image Size Limit to 2MBs
      fileSize: 2000000
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          //Error 
          cb(new Error('Please upload JPG and PNG images only!'))
      }
      //Success 
      cb(undefined, true)
  }
})

app.post('/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
  const file = req.file
  console.log(req);
  if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
  }
  res.status(200).send({
      statusCode: 200,
      status: 'success',
      uploadedFile: file
  })

}, (error, req, res, next) => {
  res.status(400).send({
      error: error.message
  })
});

/*------------------------------------------------------------------------------------------*/

app.listen(port, function () {
  console.log("Server is running on port: " + port);
});



