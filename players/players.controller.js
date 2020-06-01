const Players = require('./players.dao');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.updatePlayers = (req, res) => {
    //console.log('> Entered method update players')
    const accessToken = req.body.accessToken;
    //console.log('> ACCESS TOKEN ' + accessToken)
    const decodedToken = jwt.decode(accessToken);
    //console.log('> DECODED TOKEN' + decodedToken)
    const player_id = decodedToken.id;
    //console.log('> PLAYER ID = ' + player_id)

    //Check if player is already in db
    Players.getPlayer(player_id, (err, player) => {
        //if error return server error
        if(err) return res.status(500).send('Server error 1');

        //check if player comes empty
        if(player.length === 0){
            //player doesn't exist in database
            //console.log("> PLAYER NOT FOUND");
            const newPlayer = {
                player_id: player_id,
                dodgePlayers: req.body.dodgePlayers
            }

            Players.createPlayer(newPlayer, (err) => {
                //console.log(err);
                if(err) return res.status(500).send('Server error 2');
                const updatePlayerResponse = {
                    code: 200,
                    message: 'Player created successfully.'
                }
                //console.log("> PLAYER CREATED SUCCESSFULLY")
                return res.send(updatePlayerResponse)
            })
        }else{
            const newPlayer = {
                player_id: player_id,
                dodgePlayers: req.body.dodgePlayers
            }

            //console.log(player[0]._id);
            //if player already exists in database
            //console.log("> PLAYER FOUND")

            Players.updatePlayer(player[0]._id, newPlayer, (err) => {
                if(err) return res.status(500).send('Server error 3');

                const updatePlayerResponse = {
                    code: 200,
                    message: 'Player updated successfully.'
                }

                //console.log("> PLAYER UPDATED SUCCESSFULLY")
                return res.send(updatePlayerResponse)
            })
        }
    });
}

exports.getPlayers = (req, res) => {
    //console.log('Entered method get players')
    const accessToken = req.body.accessToken;
    //console.log('ACCESS TOKEN = ' + accessToken)
    const decodedToken = jwt.decode(accessToken);
    //console.log('DECODED TOKEN = ' + decodedToken)
    const player_id = decodedToken.id;
    //console.log('PLAYER ID = ' + decodedToken)

    //Check if player is already in db
    Players.getPlayer(player_id, (err, player) => {
        //if error return server error
        if(err) return res.status(500).send('Server error');

        //check if player comes empty
        if(player.length === 0){
            //console.log("PLAYER NOT FOUND. CREATING A NEW ONE...")
            //player doesn't exist in database
            const newPlayer = {
                player_id: player_id,
                dodgePlayers: []
            }
            //console.log(newPlayer)
            Players.createPlayer(newPlayer, (err) => {
                if(err) return res.status(500).send('Server error 2');

                const getPlayerResponse = {
                    dodgePlayers: []
                }
                //console.log("PLAYER CREATED SUCCESFULLY.")
                return res.send(getPlayerResponse)
            })
        }else{
            //console.log("PLAYER FOUND.")
            const getPlayerResponse = {
                dodgePlayers: player[0].dodgePlayers
            }
            //console.log("PLAYER SEND SUCCESSFULLY.")
            res.send({getPlayerResponse});
        }
    });
}