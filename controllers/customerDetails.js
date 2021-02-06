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

        full_name: req.body.full_name,
        conatct: req.body.conatct,
        address: req.body.address,
        postalcode: req.body.postalcode,
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
                        full_name: user.full_name,
                        // last_name: user.last_name,  
                        conatct : user.conatct,
                        address : user.address,
                        postalcode : user.postalcode,
                        email: user.email,
                        address: user.address,
                        conatct:user.conatct,
                        user_type: user.user_type
                    }

                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440,

                    })
                    res.status(200).json({ token: token })
                    res.status(200).json(payload)
                } else {
                    res.status(401).json({ error: "User does not exist" })
                }
            } else {
                res.status(401).json({ error: "User does not exist" })
            }
        })
        .catch(err => {
            res.status(401).send('error:' + err)
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
                res.status(200).json(user)
            } else {
                res.status(401).send("User does not exist")
            }
        })
        .catch(err => {
            res.status(401).send('error' + err)
        })
}


//get All customer details for customer table
exports.getDetails = (req, res, next) => {
    Customer.find({})
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(401).send("User does not exist")
            }
        })
        .catch(err => {
            res.status(401).send('error' + err)
        })
}



exports.findAll = (req, res) => {
    Customer.find()
        .then(user => {
            res.status(200).send(user);
        }).catch(err => {
            res.status(401).send({
                message: err.message || "Some error occurred while retrieving seller."
            });
        });
};



