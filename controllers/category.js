const Category = require("../models/category");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");

exports.create = (req, res, next) => {
    
  const category = new Category({
    category_name: req.body.category_name,
    category_id: req.body.category_id,
  });

  category
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category.",
      });
    });
};

exports.findAll = (req, res) => {
    Category.find()
      .then((category) => {
        res.send(category);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving category.",
        });
      });
  };


  exports.findByCategory_Id = (req, res) => {
    Category.find({
        category_id: req.params.category_id,
    })
    //   .then((category) => {
    //     if (!category) {
    //       return res.status(404).send({
    //         message: "category not found with id " + req.params.category_id,
    //       });
    //     }
    //     res.send(category);
    //   })
    //   .catch((err) => {
    //     if (err.kind === "String") {
    //       return res.status(404).send({
    //         message: "category not found with id " + req.params.category_id,
    //       });
    //     }
    //     return res.status(500).send({
    //       message: "category retrieving category with id " + req.params.category_id,
    //     });
    //   });

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
  };

  exports.deleteProduct = (req, res) => {
    Category.findByIdAndRemove(req.params._Id)
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: "category not found with id " + req.params._Id,
          });
        }
        res.send({ message: "category deleted successfully!" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: "category not found with id " + req.params._Id,
          });
        }
        return res.status(500).send({
          message: "Could not delete category with id " + req.params._Id,
        });
      });
  };