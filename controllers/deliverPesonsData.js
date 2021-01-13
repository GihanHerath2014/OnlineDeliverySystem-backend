const DeliverPerson = require('../models/deliverPesonData');
const bcrypt = require("bcrypt");

const cors = require("cors")
const jwt = require("jsonwebtoken")

process.env.SECRET_KEY = 'secret'

//Create and Save a new Deliver person
exports.register = (req, res, next) => {

    //get today date
    const today = new Date();

    const deliverPersonData = {

        full_name: req.body.full_name,
        email:req.body.email,
        conatct: req.body.conatct,
        address: req.body.address,
        drivingLicenceId: req.body.drivingLicenceId,
        vehicaleType:req.body.vehicaleType,
        vehicaleLicenceNumber: req.body.vehicaleLicenceNumber,
        password: req.body.password,
        user_type: req.body.user_type,
        created: today
    }

    DeliverPerson.findOne({ //find the email
        email: req.body.email
    })
        .then(user => {
            if (!user) {   //if it is not a customer
                // res.json({ status:deliverPersonData.full_name+ 'Registered' })
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    deliverPersonData.password = hash  //password create hash marks
                    DeliverPerson.create(deliverPersonData)
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