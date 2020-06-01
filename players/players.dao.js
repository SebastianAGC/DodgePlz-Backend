const mongoose = require('mongoose');
const playerSchema = require('./players.model');

playerSchema.statics = {
    createPlayer: function (playerData, cb) {
        const player = new this(playerData);
        player.save(cb);
    },
    updatePlayer: function(id, playerData, cb){
        console.log('id: ' + id)
        this.findByIdAndUpdate(id, playerData, '', cb);
    },
    getPlayer: function (id, cb) {
        return this.find({ player_id: id}, cb);
    },
    deletePlayer: function (id, cb) {
        this.findByIdAndDelete(id, '', cb);
    }
}

const playersModel = mongoose.model('Players', playerSchema);
module.exports = playersModel;