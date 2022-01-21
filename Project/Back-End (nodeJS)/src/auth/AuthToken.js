const JWT = require('jsonwebtoken');
const secret = '123'
class Token {
    constructor(){
    }
     async validarToken(req, res, next){
        console.log(req)
        console.log(req.headers.authorizantion)
        let token = req.headers.authorizantion 
       try {
           console.log(token)
           JWT.verify(token, secret)
           next()
       } catch (error) {
           console.log(error)
           res.status(400).json({erro : error, msg : 'erro, token invalido'})           
       } 
    }
}

module.exports = new Token