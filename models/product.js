const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema(
    {
      name: {type: String, required: true},
      description: String,
      img: String,
      price: {type: Number, minimum: 0},
      qty: {type: Number, minimum: 0}
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product