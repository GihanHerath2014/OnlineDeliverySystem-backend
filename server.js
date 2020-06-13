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
    .connect(dbConfig.onlineurl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

var Users = require('./routes/Users')
app.use('/users',Users)

require('./routes/sellerDetails')(app);

app.listen(port, function () {
    console.log("Server is running on port: " + port)
})



