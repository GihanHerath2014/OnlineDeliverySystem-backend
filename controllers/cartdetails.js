const CartDetails = require('../models/cartDetails');
const bcrypt = require("bcrypt");

const cors = require("cors")
//const jwt = require("jsonwebtoken")

//secret key for password (token type)
//process.env.SECRET_KEY = 'secret'

//Create and Save a new Customer
exports.create = (req, res, next) => {
    // Create a Product
    const cartDetails = new CartDetails({
        u_id: req.body.u_id,
        productId: req.body.productId
    });
  
    // Save Product in the database
    cartDetails
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
  };