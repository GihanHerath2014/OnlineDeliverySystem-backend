const Income = require("../models/incomeOfDelivers");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");
// Create and Save a new Product
exports.create = (req, res, next) => {
  // Create a Product
  const income = new Income({
    u_id :req.body.u_id,
    orderId:req.body.orderId,
        payment : req.body.payment,
        address:req.body.address,
        totalCollected: req.body.totalCollected,
        income:req.body.income
  });

  // Save Product in the database
  income
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
exports.findu_id = (req, res) => {
    Income.find({
        u_id:req.params.u_id,
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

// Find a single seller with a _Id
exports.findOne = (req, res) => {
    Income.findOne({
        u_id: req.params.u_id
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.u_id
                });
            }
            res.status(200).send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.u_id
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.u_id
            });
        });
};

exports.findAll = (req, res) => {
    Income.find()
      .then((seller) => {
        res.send(seller);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving seller.",
        });
      });
  };
