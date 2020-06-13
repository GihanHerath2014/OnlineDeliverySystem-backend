const Seller = require('../models/sellerDetails');

// Create and Save a new Seller
exports.create = (req, res, next) => {

    // Validate request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Seller content can not be empty"
    //     });
    // }

     // Create a Seller
     const seller = new Seller({
        businessmodel: req.body.businessmodel,
        name: req.body.name, 
        shopName: req.body.shopName,
        businessID: req.body.businessID,
        address:req.body.address,
        personalPhone: req.body.personalPhone,
        officePhone: req.body.officePhone,
        email: req.body.email,
        password: req.body.password,
        repassword: req.body.repassword,
    });

    // Save Seller in the database
    seller.save()
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
    Seller.find()
    .then(seller => {
        res.send(seller);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving seller."
        });
    });
};


// Find a single seller with a _Id
exports.findOne = (req, res) => {
    Seller.findById(req.params._Id)
    .then(seller => {
        if(!seller) {
            return res.status(404).send({
                message: "Seller not found with id " + req.params._Id
            });            
        }
        res.send(seller);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Seller not found with id " + req.params._Id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving seller with id " + req.params._Id
        });
    });
};

// Update a seller identified by the _Id in the request
exports.update = (req, res, next) => {
    // Validate Request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Seller content can not be empty"
    //     });
    // }

    // Find seller and update it with the request body
    Seller.findByIdAndUpdate(req.params._Id, {
        businessmodel: req.body.businessmodel,
        name: req.body.name, 
        shopName: req.body.shopName,
        businessID: req.body.businessID,
        address:req.body.address,
        personalPhone: req.body.personalPhone,
        officePhone: req.body.officePhone,
        email: req.body.email,
        password: req.body.password,
        repassword: req.body.repassword,
    }, {new: true})
    .then(seller => {
        if(!seller) {
            return res.status(404).send({
                message: "Seller not found with id " + req.params._Id
            });
        }
        res.send(seller);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Seller not found with id " + req.params._Id
            });                
        }
        return res.status(500).send({
            message: "Error updating seller with id " + req.params._Id
        });
    });
};

// Delete a seller with the specified _Id in the request
exports.delete = (req, res) => {
    Seller.findByIdAndRemove(req.params._Id)
    .then(seller => {
        if(!seller) {
            return res.status(404).send({
                message: "Seller not found with id " + req.params._Id
            });
        }
        res.send({message: "Seller deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Seller not found with id " + req.params._Id
            });                
        }
        return res.status(500).send({
            message: "Could not delete seller with id " + req.params._Id
        });
    });
};
