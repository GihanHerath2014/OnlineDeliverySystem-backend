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
        quantity: req.body.quantity,
        total:req.body.total,
        shopID:req.body.shopID

    });
  
    // Save Product in the database
    cartDetails
      .save()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(401).send({
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
          return res.status(401).send({
            message: "Cart not found with UserData " + req.params.u_id,
          });
        }
        res.status(200).send(cartDetails);
      })
      .catch((err) => {
        if (err.kind === "String") {
          return res.status(401).send({
            message: "Cart not found with UserData " + req.params.u_id,
          });
        }
        return res.status(401).send({
          message: "Error retrieving cart with userData " + req.params.u_id,
        });
      });
  };

  exports.removeUserCart = (req, res) => {
    CartDetails.deleteMany({u_id:req.params.u_id}, function(err, result) {
      if (err) {
        return res.status(401).send({
                message: "Data not found with UserId " + req.params.u_id,
              })
      } else {
        return res.status(200).send({ message: "Data deleted successfully!" });
      
      }

      // .then((cartDetails) => {

      //   if (!cartDetails) {
      //     return res.status(404).send({
      //       message: "Data not found with UserId " + req.params.u_id,
      //     });
      //   }
      //   res.send({ message: "Data deleted successfully!" });
      // })
      // .catch((err) => {
      //   if (err.kind === "ObjectId" || err.name === "NotFound") {
      //     return res.status(404).send({
      //       message: "Data not found with UserId " + req.params.u_id,
      //     });
      //   }
      //   return res.status(500).send({
      //     message: "Could not delete data with User Id " + req.params.u_id,
      //   });
      });
  };

  exports.removeCartItems = (req, res) => {
    CartDetails.findByIdAndRemove(req.params._id)
      .then((cartDetails) => {
        if (!cartDetails) {
          return res.status(401).send({
            message: "Data not found with Id " + req.params._id,
          });
        }
        res.status(200).send({ message: "Data deleted successfully!" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(401).send({
            message: "Data not found with Id " + req.params._id,
          });
        }
        return res.status(401).send({
          message: "Could not delete data with  Id " + req.params._id,
        });
      });
  };