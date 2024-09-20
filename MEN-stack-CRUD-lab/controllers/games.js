const express = require('express')
const router = express.Router()

const GameModel = require('../models/games')

//Reads the new.ejs and shows the form to submit a game onto the page
router.get('/new', function(req, res){

    res.render('games/new.ejs')
})

//Submits the form after pressing the button and puts it into the database
router.post('/', async function(req, res){
    console.log(req.body)
    
    const createdGame = await GameModel.create(req.body)
    console.log(createdGame, '<-- created game')

    res.redirect('/games')
})

//Reads the index.ejs inside of the views/games folder and shows ALL of the games
router.get('/', async function(req, res){
    const allGames = await GameModel.find({})

    res.render('games/index.ejs', {allGames: allGames})
})

//Reads the show.ejs and puts it on screen (The details of the game) the link stores the games ID
router.get('/:gameId', async function(req, res){
        const gameDoc = await GameModel.findById(req.params.gameId)
        console.log(gameDoc), "<--gameDoc"

        res.render('games/show.ejs', {game: gameDoc})
})

//Reads the edit.ejs and puts it on screen, finds the ID inside of the params, and prefills the form with current game data
router.get('/:gameId/edit', async function(req, res){
    const updatedGame = await GameModel.findById(req.params.gameId)
    console.log(updatedGame, '<---updated game')
    res.render('games/edit.ejs', {game: updatedGame})
})

//Submit the new data by finding the id and updating it, shows the update, takes you back to games page
router.put('/:gameId', async function(req, res){
    const gamedoc = await GameModel.findByIdAndUpdate(req.params.gameId,req.body,{new: true})
    res.redirect('/games')
})

//Find the games id and deletes it
router.delete('/:gameId', async function(req, res){
    const deletedGame = await GameModel.findByIdAndDelete(req.params.gameId)
    res.redirect('/games')
})

module.exports = router