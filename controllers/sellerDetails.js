const Seller = require('../models/sellerDetails');


//secret key for password (token type)
process.env.SECRET_KEY = 'secret'

//Create and Save a new seller
exports.create1 = (req, res, next) => {

    //get today date
    const today = new Date()

    //fix the usertype
    // const u_type = "customer";

    //Create a new customer 
    const sellerData = {
        businessModel: req.body.businessModel,
        name: req.body.name,
        shopName: req.body.shopName,
        businessID: req.body.businessID,
        address: req.body.address,
        personalPhone: req.body.personalPhone,
        officePhone: req.body.officePhone,
        email: req.body.email,
        password: req.body.password,
        repassword: req.body.repassword,
    }

    Seller.findOne({ //find the email
        email: req.body.email
    })
        .then(user => {
            if (!user) {   //if it is not a customer
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    sellerData.password = hash  //password create hash marks
                    Seller.create(sellerData)
                        .then(user => {
                            res.send(user);
                            res.json({ status: user.email + 'Registered' })
                        })
                        .catch(err => {
                            res.send('error:' + err)
                        })
                })
            } else {
                res.json({ error: "User already exists" })
                
            }
        })
        .catch(err => {
            res.send('error:' + err)
        })
}



exports.login = (req, res, next) => {
    Seller.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {//you can add any thing to token (same you can get the details by the token)
                        _id: user._id,
                        // businessModel: user.businessModel,
                        // last_name: user.last_name,
                        // email: user.email,
                        // user_type: user.user_type
                    }

                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440,

                    })
                    res.json({ token: token })
                    res.json(payload)
                } else {
                    res.json({ error: "User does not exist" })
                }
            } else {
                res.json({ error: "User does not exist" })
            }
        })
        .catch(err => {
            res.send('error:' + err)
        })
}


// exports.profile = (req, res, next) => {

//     var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

//     Seller.findOne({
//         _id: decoded._id
//     })
//         .then(user => {
//             if (user) {
//                 res.json(user)
//             } else {
//                 res.send("User does not exist")
//             }
//         })
//         .catch(err => {
//             res.send('error' + err)
//         })
// }




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
        businessModel: req.body.businessModel,
        name: req.body.name,
        shopName: req.body.shopName,
        businessID: req.body.businessID,
        address: req.body.address,
        personalPhone: req.body.personalPhone,
        officePhone: req.body.officePhone,
        email: req.body.email,
        password: req.body.password,
        repassword: req.body.repassword,
        statues:req.body.statues,
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
            if (!seller) {
                return res.status(404).send({
                    message: "Seller not found with id " + req.params._Id
                });
            }
            res.send(seller);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
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
        address: req.body.address,
        personalPhone: req.body.personalPhone,
        officePhone: req.body.officePhone,
        email: req.body.email,
        password: req.body.password,
        repassword: req.body.repassword,
    }, { new: true })
        .then(seller => {
            if (!seller) {
                return res.status(404).send({
                    message: "Seller not found with id " + req.params._Id
                });
            }
            res.send(seller);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
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
            if (!seller) {
                return res.status(404).send({
                    message: "Seller not found with id " + req.params._Id
                });
            }
            res.send({ message: "Seller deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Seller not found with id " + req.params._Id
                });
            }
            return res.status(500).send({
                message: "Could not delete seller with id " + req.params._Id
            });
        });
};


exports.updateStatues = (req, res, next) => {
    // Validate Request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Seller content can not be empty"
    //     });
    // }

    // Find seller and update it with the request body
    Seller.findByIdAndUpdate(req.params._Id, {
        statues: req.body.statues,
    }, { new: true })
        .then(seller => {
            if (!seller) {
                return res.status(404).send({
                    message: "Seller not found with id " + req.params._Id
                });
            }
            res.send(seller);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Seller not found with id " + req.params._Id
                });
            }
            return res.status(500).send({
                message: "Error updating seller with id " + req.params._Id
            });
        });
};
