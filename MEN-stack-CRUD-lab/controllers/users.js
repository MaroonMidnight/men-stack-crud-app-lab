const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/user')

router.get('/sign-out', function(req, res){
    req.session.destroy()
    res.redirect('/')
})

router.get('/sign-up', function(req, res){
    res.render('games/sign-up.ejs')
})

router.post('/sign-up', async function(req, res){

    // find if the username in the req.body exists in the DB
    const userInTheDatabase = await UserModel.findOne({username: req.body.username})

    if(userInTheDatabase){
        return res.send('Username already taken')
    }

    if(req.body.password !== req.body.confirmPassword){
        return res.send('Passwords do not match')
    }

    const hashPassword = bcrypt.hashSync(req.body.password, 10)

    req.body.password = hashPassword
    
    const userDoc = await UserModel.create(req.body)
    
    res.send(`Thanks for signing up ${userDoc.username}`)
})

router.get('/sign-in', function(req, res){
    res.render('games/sign-in.ejs')
})

router.post('/sign-in', async function(req, res){
    const userInTheDatabase = await UserModel.findOne({username: req.body.username})
    if(!userInTheDatabase){
        return res.send("Login failed. Please Try Again")
    }

    const isValidPassword = bcrypt.compareSync(req.body.password, userInTheDatabase.password)
    if(!isValidPassword){
        return res.send("Login Failed. Pleas Try Again")
    }

    //(cookies) Stores their info for that session
    req.session.user = {
        username: userInTheDatabase.username,
        _id: userInTheDatabase._id
    }

    res.redirect('/')
})

module.exports = router