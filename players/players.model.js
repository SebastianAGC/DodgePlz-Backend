const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const playerSchema = new Schema ({
    player_id: {
        type: String,
        required: true,
        trim: true
    },
    dodgePlayers: []
},{
    timestamps: true
})

module.exports = playerSchema;