const { response, request } = require('express');
const User = require('../models/user.model')

exports.getUsers = async( req = request, res = response) => {
    try {

        const last = Number( req.query.desde ) || 0;

        const users = await User
            .find({ _id: { $ne: req.uid } })
            .sort('-online')
            .skip(last)
            .limit(20)
        return res.json({ ok:true, users})
    } catch (error) {
        
    }
}