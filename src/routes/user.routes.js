const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({
            user,
            token
        })
    }
    catch (error) {
        const errorMessage = error.message.slice(0, 6);
        if (errorMessage === "E11000") {
            return res.status(400).send({ error: 'Email already exists'});    
        }

        res.status(400).send({ error: error.message });
    }
})


module.exports = router;