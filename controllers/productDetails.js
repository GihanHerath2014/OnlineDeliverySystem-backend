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
    imgName: req.body.imgName
  });

  // Save Product in the database
  product
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


// // Retrieve and return all sellers from the database.
exports.findAll = (req, res) => {
  Product.find()
    .then((seller) => {
      res.send(seller);
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
      res.send(product);
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
     // imgPath: req.body.imgPath,
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

// Delete a seller with the specified _Id in the request
exports.deleteProduct = (req, res) => {
  Product.findByIdAndRemove(req.params._Id)
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

exports.findProduct = (req, res) => {
    Product.find({
        u_id:req.params.u_id,
        // shopname:req.params.shopname,
    })
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Seller not found with id " + req.params.category
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'String') {
                return res.status(404).send({
                    message: "Seller not found with id " + req.params.category
                });
            }
            return res.status(500).send({
                message: "Error retrieving seller with id " + req.params.category
            });
        });
}



exports.findProductShop = (req, res) => {
  Product.find({
    u_id: req.params.u_id,
  })
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Cart not found with UserData " + req.params.u_id,
        });
      }
      res.send(product);
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
// @desc      upload photo for product
// @route     upload
// @access    Private
/*
exports.uploadProductPhotoUpload = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params._id);

  if (!product) {
    return next(
      new ErrorResponse(`procuct not found with id of ${req.params._id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse("Please upload a file", 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }
  // Create custom filename
  file.name = `photo_${product._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Product.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});

// @desc      Get single product
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getproduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params._id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params._id}`, 401)
    );
  }
  res.status(200).json({ success: true, data: product });
});



/////////////////////////////////////////////////////////////////////////////////////////////////////

exports.createProductPhotoPath = asyncHandler(async(req, res, next) => {
 // const product = await Product.findById(req.params._id);

  // if (!product) {
  //   return next(
  //     new ErrorResponse(`procuct not found with id of ${req.params._id}`, 404)
  //   );
  // }

  if (!req.files) {
    return next(new ErrorResponse("Please upload a file", 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }
  // Create custom filename
  file.name = `photo_${"fgd"}${path.parse(file.name).ext}`;
  var imgPath = 'd/public/upload/'+file.name ;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    const productImg = new ProductImg ({
      // _Id: req.body.id,
      productName: req.body.productName,
      imagePath: imgPath,
    });

    productImg
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
  
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

   // await Product.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });

  // Create a Product
  // Save Product in the database

 
});   */

