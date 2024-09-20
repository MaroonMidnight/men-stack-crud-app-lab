const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    name: String,
    genre: String
});

const GameModel = mongoose.model('Game', gameSchema);

module.exports = GameModel;