const Product = require("../models/productDetails");
const ProductImg =require("../models/productImg");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");
// Create and Save a new Product
exports.create = (req, res, next) => {
  // Create a Product
  const product = new Product({
    productName: req.body.productName,
    uniPrice: req.body.uniPrice,
    availableQuantity: req.body.availableQuantity,
    category: req.body.category,
    imgName: req.body.imgName,
    shopName : req.body.shopName,
    shopID : req.body.shopID
  });

  // Save Product in the database
  product
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the seller.",
      });
    });
};


// // Retrieve and return all sellers from the database.
exports.findAll = (req, res) => {
  Product.find()
    .then((seller) => {
      res.status(200).send(seller);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seller.",
      });
    });
};

// Find a product by catogory
exports.findaaa = (req, res) => {
  Product.find({
    category: req.params.category,
  })
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Seller not found with id " + req.params.category,
        });
      }
      res.status(200).send(product);
    })
    .catch((err) => {
      if (err.kind === "String") {
        return res.status(404).send({
          message: "Seller not found with id " + req.params.category,
        });
      }
      return res.status(500).send({
        message: "Error retrieving seller with id " + req.params.category,
      });
    });
};

// Update a Product identified by the _Id in the request
exports.update = (req, res, next) => {  
  Product.findByIdAndUpdate(
    req.params._Id,
    {
      productName: req.body.productName,
      uniPrice: req.body.uniPrice,
      availableQuantity: req.body.availableQuantity,
      category: req.body.category,
      // add new image 
      imgName: req.body.imgName,
    },
    { new: true }
  )
    .then((product) => {
      if (!product) {
        return res.status(401).send({
          message: "Product not found with id " + req.params._Id,
        });
      }
      res.status(200).send({
        statusCode: 200,
        message:product});
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

// Delete a seller with the specified _Id in the request
exports.deleteProduct = (req, res) => {
  Product.findByIdAndRemove(req.params._Id)
    .then((product) => {
      if (!product) {
        return res.status(401).send({
          message: "Product not found with id " + req.params._Id,
        });
      }
      res.status(200).send({ message: "Product deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(401).send({
          message: "Product not found with id " + req.params._Id,
        });
      }
      return res.status(401).send({
        message: "Could not delete product with id " + req.params._Id,
      });
    });
};

exports.findProduct = (req, res) => {
    Product.find({
      _id:req.params._Id,
    })
    .then(product => {
      if (product) {
          res.status(200).json(product)
      } else {
          res.status(401).send("User does not exist")
      }
  })
  .catch(err => {
      res.status(401).send('error' + err)
  })
}



exports.findProductShop = (req, res) => {
  Product.find({
    shopID : req.params.shopID,
  })
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Cart not found with UserData " + req.params.shopID ,
        });
      }
      res.status(200).send(product);
    })
    .catch((err) => {
      if (err.kind === "String") {
        return res.status(404).send({
          message: "Cart not found with UserData " + req.params.shopID ,
        });
      }
      return res.status(500).send({
        message: "Error retrieving cart with userData " + req.params.shopID ,
      });
    });
};

exports.updateQData = (req, res, next) => {  
  Product.findByIdAndUpdate(
    req.params._Id,
    {
      availableQuantity: req.body.availableQuantity,
    },
    { new: true }
  )
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
        message: "Error updating product with id " + req.params._Id,
      });
    });
};