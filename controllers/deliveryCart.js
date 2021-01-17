const DeliverCart = require('../models/deliveryCartData');
const bcrypt = require("bcrypt");

const cors = require("cors");

//Create and Save a new Deliver person
exports.create = (req, res, next) => {
  // res.json({ status: 'Registered' })
    //get today date
    const today = new Date();

    const deliverCartData = new DeliverCart({
        u_id: req.body.u_id,
        productId: req.body.productId,
        productName: req.body.productName,
        uniPrice: req.body.uniPrice,
        quantity: req.body.quantity,
        address: req.body.address,
        mobileNumber: req.body.mobileNumber,
        customerName: req.body.customerName,
        email:req.body.email,
        total:req.body.total,
        payment:req.body.payment,
        state:req.body.state,
        shopID:req.body.shopId,
        deliverPersonId:'null',
        orderId:req.body.orderId,

    })

    deliverCartData
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


exports.findAll = (req, res) => {
    DeliverCart.find()
      .then((seller) => {
        res.send(seller);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving seller.",
        });
      });
  };

  exports.update = (req, res, next) => {
    DeliverCart.update(
      {"orderId": req.params.orderId}, // filter
      { $set: { 
          "deliverPersonId" : req.body.deliverPersonId,
          "state":req.body.state,
        }
      }, // update values
      { multi: true} )// options
      .then((product) => {
        if (!product) {
          return res.status(404).send({
            message: "Product not found with id " + req.params._Id,
          });
        }
        res.status(200).send(product);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Product not found with id " + req.params._Id,
          });
        }
        return res.status(500).send({
          message: "Error updating product with id " + err,
        });
      });
    };

  exports.deleteProduct = (req, res) => {
    DeliverCart.findByIdAndRemove(req.params._Id)
      .then((product) => {
        if (!product) {
          return res.status(404).send({
            message: "Product not found with id " + req.params._Id,
          });
        }
        res.send({ message: "Product deleted successfully!" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: "Product not found with id " + req.params._Id,
          });
        }
        return res.status(500).send({
          message: "Could not delete product with id " + req.params._Id,
        });
      });
  };

  exports.findOrderbyOrderId = (req, res) => {
    DeliverCart.find({
      orderId:req.params.orderId,
    })
    .then(product => {
      if (product) {
          res.json(product)
      } else {
          res.send("User does not exist")
      }
  })
  .catch(err => {
      res.send('error' + err)
  })
}

exports.findorderByD_Id = (req, res) => {
  DeliverCart.find({
    deliverPersonId: req.params.deliverPersonId,
  })
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "deliver not found with id " + req.params.deliverPersonId,
        });
      }
      res.send(product);
    })
    .catch((err) => {
      if (err.kind === "String") {
        return res.status(404).send({
          message: "deliver not found with id " + req.params.deliverPersonId,
        });
      }
      return res.status(500).send({
        message: "deliver retrieving seller with id " + req.params.deliverPersonId,
      });
    });
};


exports.updateState = (req, res, next) => {
  DeliverCart.update(
    {"orderId": req.params.orderId}, // filter
    { $set: { 
        "state":req.body.state,
      }
    }, // update values
    { multi: true} )// options
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params._Id,
        });
      }
      res.status(200).send(product);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params._Id,
        });
      }
      return res.status(500).send({
        message: "Error updating product with id " + err,
      });
    });
  };