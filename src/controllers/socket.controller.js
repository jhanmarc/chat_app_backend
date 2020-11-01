const User = require('../models/user.model')
const Message = require('../models/message.model')

exports.userConnect = async(uid = '') => {
    const user = await User.findById(uid)
    user.online = true;
    await user.save();
    return user
}

exports.userDisconnect = async(uid = '') => {
    const user = await User.findById(uid)
    user.online = false;
    await user.save();
    return user
}

exports.saveMessage = async (payload) => {
    try {
        const message = new Message(payload)
        await message.save()
    } catch (error) {
        return false
    }
}