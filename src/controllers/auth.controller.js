const { response, request } = require('express')
const { validationResult } = require('express-validator')
const jwt = require('../middleware/jwt')

const User = require('../models/user.model')

exports.login = async (req = request, res = response ) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if(!user) return res.status(400).json({ok:false, msg: 'User no found'})
        const validatePass = await User.comparePassword(req.body.password, user.password)
        if(!validatePass) return res.status(400).json({ok:false, msg: 'password incorrect'})
        const token = await jwt.createToken(user._id);
        res.json({ok: true, user, token})
    } catch (error) {
        res.status(500).json({ok:false, msg:'Error'+ error })
    }

}

exports.register = async(req = request, res = response ) => {
    try {
        const existUser = await User.findOne({ email : req.body.email })
        if(existUser){
            return res.status(400).json({ok: false, msg:'Elige otro usuario, este no esta disponible.'})
        }
        const user = new User(req.body)
        user.password = await User.encryptPassword(user.password)
        await user.save()
        const token = await jwt.createToken(user._id)
        res.json({ ok:true, user, token })
    } catch (error) {
        res.status(500).json({ok:false, msg:'Error'+ error })
    }
}

exports.renewToken = async(req = request, res = response ) => {
    try {
        const _id  = req.uid
        const user = await User.findById(_id).exec()
        const token = await jwt.createToken(user._id)
        res.json({ok:true, user, token})
    } catch (error) {
        
    }
}