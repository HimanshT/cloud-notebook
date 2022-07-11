const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const JWT_SECRET = "systemerroritwontrun";

//create a user using:POST "/api/auth/createUser" . no login required
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    //if there are errors return bad request
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //check if the user with same email exits
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already requests" })
        }
        //create a new user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json(authToken);
    } catch (err) {
        console.log(err.message);
    }
    // .then(user => res.json(user))
    //     .catch(err => {
    //         console.log(err)
    //         res.json({ error: "This email is already registerd", message: err.message })
    //     })
})

module.exports = router;