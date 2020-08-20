require('dotenv').config()

module.exports = {
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        siteUrl: process.env.siteUrl,
        jwtSecret: process.env.jwtSecret
    }
}