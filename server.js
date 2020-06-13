var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const dbConfig = require('./config/database.js');
var mongoose = require('mongoose')
var port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Online Delivery System Backend API."});
});

mongoose
   //localhost
.connect(dbConfig.url,{
 //online
    // .connect(dbConfig.onlineurl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

// var Users = require('./routes/Users')
// // <<<<<<< HEAD
// var Sellers=require('./routes/Sellers')
// // =======
// // >>>>>>> 10fa51c45f85246c1e7e0ef8a5a3def096af9601
// app.use('/users',Users)
// app.use('/sellers',Sellers)

require('./routes/customerDetails')(app);
require('./routes/sellerDetails')(app);

app.listen(port, function () {
    console.log("Server is running on port: " + port)
})



