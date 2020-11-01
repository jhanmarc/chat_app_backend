const { response, request } = require('express');
const Message = require('../models/message.model')

exports.getChat = async( req = request, res = response) => {
    try {

        const myUid = req.uid;
        const fromMessage = req.params.from

        const messages = await Message
            .find({ $or: [{ to: myUid, from: fromMessage }, { to: fromMessage, from: myUid }] })
            .sort({ createdAt: 'desc'})
            .limit(30)
        return res.json({ ok:true, messages})
    } catch (error) {
        console.log(error);
    }
}