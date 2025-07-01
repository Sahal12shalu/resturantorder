const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:{
        type : String,
        require: true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    seperation:{
        type:String,
        require:true
    },
    vegornon:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    addons:[
        {
            name:String,
            price:Number
        }
    ]
})

const productModel = mongoose.model('productdetails',ProductSchema)

module.exports = productModel