const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    image: {type: String}
}, {
    timestamps: true,
})

const Image = mongoose.model('Image', ImageSchema)

module.exports = Image