const Players = require('./players.controller');
module.exports = (router) => {
    router.post('/updatePlayers', Players.updatePlayers);
    router.post('/getPlayers', Players.getPlayers);
}