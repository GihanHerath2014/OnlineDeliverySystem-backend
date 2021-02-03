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
        email:req.body.email,
        total:req.body.total,
        payment:req.body.payment,
        state:req.body.state,
        shopID:req.body.shopId,
        orderId:req.body.orderId

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
};



exports.findAll = (req, res) => {
    CheckCart.find()
        .then(user => {
            res.send(user);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving seller."
            });
        });
};
// exports.findHistory1 = (req, res) => {
//     CheckCart.find({u_id:req.params.u_id})
//     .then(checkCart => {
// if (!checkCart) {
// return res.status(404).send({
//  message: "Seller not found with id " + req.params.u_id
// });
// }
//           res.send(checkCart);
//       }).catch(err => {
//           if (err.kind === 'String') {
//               return res.status(404).send({
//                   message: "Seller not found with id " + req.params.u_id
//               });
//           }
//           return res.status(500).send({
//               message: "Error retrieving seller with id " + req.params.u_id
//           });
//       });
// };
exports.findHistory=(req,res)=>{
    CheckCart.find({u_id:req.params.u_id})
    .then(checkCart =>{
        if(!checkCart){
            return res.status(404).send({
                message:"User not found with id" +req.params.u_id
            })
        }

        res.send(checkCart);
    })
    .catch(err=>{
        
    })
}


exports.update = (req, res, next) => {  
    CheckCart.findByIdAndUpdate(
      req.params._Id,
      {
        state: req.body.state
      },
      { new: true }
    )
      .then((product) => {
        if (!product) {
          return res.status(404).send({
            message: "Product not found with id " + req.params._Id,
          });
        }
        res.send(product);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Product not found with id " + req.params._Id,
          });
        }
        return res.status(500).send({
          message: "Error updating product with id " + req.params._Id,
        });
      });
  };

  exports.findOrderbyOrderId = (req, res) => {
    CheckCart.find({
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
     


exports.updateState = (req, res, next) => {
  CheckCart.update(
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
