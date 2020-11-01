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

exports.findHistory = (req, res) => {
    CheckCart.find({
      u_id:req.params.u_id,
      // shopname:req.params.shopname,
  })
      .then(checkCart => {
          if (!checkCart) {
              return res.status(404).send({
                  message: "Seller not found with id " + req.params.u_id
              });
          }
          res.send(checkCart);
      }).catch(err => {
          if (err.kind === 'String') {
              return res.status(404).send({
                  message: "Seller not found with id " + req.params.u_id
              });
          }
          return res.status(500).send({
              message: "Error retrieving seller with id " + req.params.u_id
          });
      });
}

     