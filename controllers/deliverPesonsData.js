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
                            res.status(200).send(user);
                            res.json({ status: user.email + 'Registered' })
                        })
                        .catch(err => {
                            res.status(401).send( err)
                        })
                })
            } else {
                res.status(401).json({ error: "User already exists" })
            }
        })
        .catch(err => {
            res.status(401).send('error:' + err)
        })
}

exports.findAll = (req, res) => {
    DeliverPerson.find()
        .then(user => {
            res.status(200).send(user);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            });
        });
};

exports.login = (req, res, next) => {
    DeliverPerson.findOne({
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
                    res.json(payload)
                } else {
                    res.status(401).json({ message: "User does not exist..."  })
                    res.json( user.email)
                    // res.status(400)
                }
            } else {
                res.status(401).json("please check your email...")
                res.json( user.email)
                // res.status(400)
            }
        })
        .catch(err => {
            res.status(401).json("please check your password...")
            // res.status(400);
        })
}


// Find a single seller with a _Id
exports.findOne = (req, res) => {
    DeliverPerson.findOne({
        email: req.params.email
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.email
                });
            }
            res.status(200).send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.email
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.email
            });
        });
};

exports.update = (req, res, next) => {  
    DeliverPerson.findByIdAndUpdate(
      req.params._Id,
      {
        full_name: req.body.full_name,
        //email:req.body.email,
        conatct: req.body.conatct,
        address: req.body.address,
        drivingLicenceId: req.body.drivingLicenceId,
        vehicaleType:req.body.vehicaleType,
        vehicaleLicenceNumber: req.body.vehicaleLicenceNumber,
        //password: req.body.password,
        user_type: req.body.user_type
        // add new image 
       // imgPath: req.body.imgPath,
      },
      { new: true }
    )
      .then((product) => {
        if (!product) {
          return res.status(401).send({
            message: "User details update" + req.params._Id,
          });
        }
        res.status(200).send(product);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(401).send({
            message: "Product not found with id " + req.params._Id,
          });
        }
        return res.status(401).send({
          message: "Error updating product with id " + req.params._Id,
        });
      });
  };