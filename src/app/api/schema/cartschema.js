const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    _id:{
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    seperation:{
        type:String,
        require:true
    },
    vegornon: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    totalamount:{
        type:Number,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    addons: [
        {
            name: String,
            price: Number,
        }
    ]
})

const CartSchema = new mongoose.Schema({
    pageId:{
        type:String,
        require:true
    },
    grandtotal:{
        type:Number,
        require:true
    },
    items:[itemSchema]
})

const CartModel = mongoose.model('cartproduct', CartSchema)

module.exports = CartModel