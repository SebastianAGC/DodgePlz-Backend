require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    //DB:`mongodb+srv://${mongoUser}:${mongoPassword}@cluster0-69es5.mongodb.net/DodgePlz`
    DB:`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-69es5.mongodb.net/testLogin`
}