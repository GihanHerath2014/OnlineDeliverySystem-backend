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
        productId: req.body.productId,
        productName: req.body.productName,
        uniPrice: req.body.uniPrice,
        quantity: req.body.quantity

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

  exports.findUserCart = (req, res) => {
    CartDetails.find({
      u_id: req.params.u_id,
    })
      .then((cartDetails) => {
        if (!cartDetails) {
          return res.status(404).send({
            message: "Cart not found with UserData " + req.params.u_id,
          });
        }
        res.send(cartDetails);
      })
      .catch((err) => {
        if (err.kind === "String") {
          return res.status(404).send({
            message: "Cart not found with UserData " + req.params.u_id,
          });
        }
        return res.status(500).send({
          message: "Error retrieving cart with userData " + req.params.u_id,
        });
      });
  };

  exports.removeUserCart = (req, res) => {
    CartDetails.findByIdAndRemove(req.params.u_id)
      .then((cartDetails) => {
        if (!cartDetails) {
          return res.status(404).send({
            message: "Data not found with UserId " + req.params.u_id,
          });
        }
        res.send({ message: "Data deleted successfully!" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: "Data not found with UserId " + req.params.u_id,
          });
        }
        return res.status(500).send({
          message: "Could not delete data with User Id " + req.params.u_id,
        });
      });
  };

  exports.removeCartItems = (req, res) => {
    CartDetails.findByIdAndRemove(req.params._id)
      .then((cartDetails) => {
        if (!cartDetails) {
          return res.status(404).send({
            message: "Data not found with Id " + req.params._id,
          });
        }
        res.send({ message: "Data deleted successfully!" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: "Data not found with Id " + req.params._id,
          });
        }
        return res.status(500).send({
          message: "Could not delete data with  Id " + req.params._id,
        });
      });
  };