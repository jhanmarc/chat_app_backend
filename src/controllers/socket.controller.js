const User = require('../models/user.model')


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

// module.exports = {
//     userConnect,
//     userConnect
// }