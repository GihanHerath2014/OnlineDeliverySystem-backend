const Customer = require('../models/customerDetails');
const bcrypt = require("bcrypt");

const cors = require("cors")
const jwt = require("jsonwebtoken")

//secret key for password (token type)
process.env.SECRET_KEY = 'secret'

//Create and Save a new Customer
exports.register = (req, res, next) => {

    //get today date
    const today = new Date()

    //fix the usertype
    // const u_type = "customer";

    //Create a new customer 
    const customerData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        // personalPhone: req.body.personalPhone,
        // officePhone: req.body.officePhone,
        email: req.body.email,
        password: req.body.password,
        user_type: req.body.user_type,
        created: today
    }

    Customer.findOne({ //find the email
        email: req.body.email
    })
        .then(user => {
            if (!user) {   //if it is not a customer
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    customerData.password = hash  //password create hash marks
                    Customer.create(customerData)
                        .then(user => {
                            res.send(user);
                            res.json({ status: user.email + 'Registered' })
                        })
                        .catch(err => {
                            res.send( err)
                        })
                })
            } else {
                res.json({ error: "User already exists" })
            }
        })
        .catch(err => {
            res.send('error:' + err)
        })
}


//login part
exports.login = (req, res, next) => {
    Customer.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {//you can add any thing to token (same you can get the details by the token)
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        user_type: user.user_type
                    }

                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440,

                    })
                    res.json({ token: token })
                    res.json(payload)
                } else {
                    res.json({ error: "User does not exist" })
                }
            } else {
                res.json({ error: "User does not exist" })
            }
        })
        .catch(err => {
            res.send('error:' + err)
        })
}

//view customer profile
exports.profile = (req, res, next) => {

    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    Customer.findOne({
        _id: decoded._id
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send("User does not exist")
            }
        })
        .catch(err => {
            res.send('error' + err)
        })
}


//get All customer details for customer table
exports.getDetails = (req, res, next) => {
    Customer.find({})
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send("User does not exist")
            }
        })
        .catch(err => {
            res.send('error' + err)
        })
}



