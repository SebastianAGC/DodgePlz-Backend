const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.createUser = (req, res) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    }

    User.create(newUser, (err, user) => {
        if(err && err.code === 11000) return res.status(409).send('User already exists.');
        console.log(err);
        if(err) return res.status(500).send('Server error');
        const expiresIn = 24*60*60;
        const accessToken = jwt.sign({id: user.id},
            process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: expiresIn
        });
        const dataUser = {
            name: user.name,
            email: user.email,
            accessToken: accessToken,
            expiresIn: expiresIn
        }
        //response
        res.send({dataUser});
    });
}

exports.loginUser = (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }

    User.findOne({email: userData.email}, (err, user) => {
        if(err) return res.status(500).send('Server error!');
        if(!user) {
            //email doesn't exist
            res.status(409).send({message: 'Incorrect email or password.'});
        }else{
            const resultPassword = bcrypt.compareSync(userData.password, user.password);
            if(resultPassword) {
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: expiresIn});

                const dataUser = {
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }

                res.send({dataUser});
            }else{
                //incorrect password
                res.status(409).send({message: 'Incorrect email or password.'});
            }
        }
    });
}