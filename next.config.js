require('dotenv').config()

module.exports = {
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        PORT: process.env.PORT
    }
}