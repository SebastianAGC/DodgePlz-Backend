'use strict'
const cors = require('cors');
const authRoutes = require('./auth/auth.routes');
const playerRoutes = require('./players/players.routes')
const express = require('express');
const properties = require('./config/properties');
const DB = require('./config/db');

//init db
DB();

const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParseURLEncoded = bodyParser.urlencoded({extended: true});

app.use(bodyParserJSON);
app.use(bodyParseURLEncoded);
app.use(cors());
app.use('/api', router);
authRoutes(router);
playerRoutes(router);
router.get('/', (req, res) => {
    res.send('Hello from home');
})
app.use(router);
app.listen(properties.PORT, () => console.log(`Server running on port ${properties.PORT}`));

