const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const createToken = async( uid ) => {
    return new Promise( (resolve, reject) => {
        jwt.sign({ uid }, process.env.JWT_KEY, { 
            expiresIn: '24h'
            },(err, token) => {
                if(err){
                    reject('Not generate token')
                }else{
                    resolve(token)
                }
            }
        )
        
    })
}

const verifyToken = async(req = request, res = response, next) => {
    const bearerHeader = req.headers.authorization
    if(!bearerHeader) return res.status(401).json({ok:false, msg:'Not authorization'})
    const bearer = bearerHeader.split(' ')
    if(!bearer) return res.status(401).json({ok:false, msg:'Not authorization'})

    try {
        const { uid } = jwt.verify( bearer[1], process.env.JWT_KEY)
        req.uid = uid
        next()
    } catch (error) {
        return res.status(401).json({ ok: false, msg: 'Token invalid'})
    }
}

const verifySocketToken = ( token ) => {
    try {
        const { uid } = jwt.verify( token, process.env.JWT_KEY)
        return [ true, uid]
    } catch (error) {
        return [ false, null]
    }
}


module.exports = {
    createToken,
    verifyToken,
    verifySocketToken
}