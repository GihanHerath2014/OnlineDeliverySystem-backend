const electronic = require('../models/electronicProducts');






exports.create = (req, res, next) => {

    // Create a Product
    const electronic = new Electronic({
        productName: req.body.productName,
        uniPrice: req.body.uniPrice,
        availableQuantity: req.body.availableQuantity,
        category:req.body.category,
    });

    // Save Product in the database
    electronic.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the seller."
            });
        });
};


// Retrieve and return all sellers from the database.
exports.findAll = (req, res) => {
    electronic.find()
        .then(seller => {
            res.send(seller);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving seller."
            });
        });
};