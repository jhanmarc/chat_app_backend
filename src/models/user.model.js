const { Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name:{ type:String, required: true },
    email:{ type:String, required: true, unique:true },
    password:{ type:String, required: true,},
    online:{ type:Boolean, default: false },
    createdAt: { type:Date, select:false},
    updatedAt: { type:Date, select:false}
},{
    timestamps:true,
    versionKey:false
})

UserSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
    const resp = await bcrypt.compare(password, receivedPassword)
    return resp
}

UserSchema.method('toJSON', function () {
    const { _id, password, createdAt, updatedAt, ...object} = this.toObject()
    object.uid = _id;
    return object;
})

module.exports = model('User', UserSchema)