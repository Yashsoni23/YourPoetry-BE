
const { Schema, model, models, default: mongoose } = require('mongoose');


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type:String,
        isNull:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    followers: Array,
    following: Array,
    liked: Array
});

const UserModel = models.UserSchema || model('UserSchema', UserSchema);

module.exports = UserModel;