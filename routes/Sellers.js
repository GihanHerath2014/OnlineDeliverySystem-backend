const express = require("express")
const sellers = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Seller = require("../models/Seller")
sellers.use(cors())

process.env.SECRET_KEY = 'secret'

sellers.post('/register', (req, res) => {
    const today = new Date()
    const sellerData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    Seller.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    sellerData.password = hash
                    Seller.create(sellerData)
                        .then(user => {
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
})


module.exports = sellers