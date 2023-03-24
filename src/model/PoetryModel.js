const { Schema, model, models } = require('mongoose');


const PoetrySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        unique: true

    },
    username: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    bio: String,
    likes:  Array, 
});

const PoetryModel = models.PoetrySchema || model('PoetrySchema', PoetrySchema);

module.exports = PoetryModel;