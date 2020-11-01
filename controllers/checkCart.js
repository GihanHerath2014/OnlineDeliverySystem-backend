const CheckCart = require('../models/checkCart');
const bcrypt = require("bcrypt");

const cors = require("cors")
//const jwt = require("jsonwebtoken")

//secret key for password (token type)
//process.env.SECRET_KEY = 'secret'

//Create and Save a new Customer
exports.create = (req, res, next) => {
    // Create a Product
    const checkCart = new CheckCart({
        u_id: req.body.u_id,
        productId: req.body.productId,
        productName: req.body.productName,
        uniPrice: req.body.uniPrice,
        quantity: req.body.quantity,
        address: req.body.address,
        mobileNumber: req.body.mobileNumber,
        customerName: req.body.customerName,

    });
  
    // Save Product in the database
    checkCart
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the seller.",
        });
    });
}

     