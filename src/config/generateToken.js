const jwt = require('jsonwebtoken')

const generateToken = (id)=>{
    return jwt.sign({id}, "thisisasecretkey", {
        expiresIn: "30d"
    })
}

module.exports = generateToken;