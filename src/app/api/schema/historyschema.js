const mongoose = require('mongoose')
const moment = require('moment-timezone')

const itemSchema = new mongoose.Schema({
    _id: {
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
    seperation: {
        type: String,
        require: true
    },
    vegornon: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    totalamount: {
        type: Number,
        require: true
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

const HistorySchema = new mongoose.Schema({
    pageId: {
        type: String,
        require: true
    },
    grandtotal: {
        type: Number,
        require: true
    },
    time: {
        type: String,
        default: () => moment().tz("Asia/Kolkata").format("HH:mm:ss")
    },
    day: {
        type: String,
        default: () => moment().tz("Asia/Kolkata").format("YYYY-MM-DD")
    },
    items: [itemSchema]
})

const HistoryModel = mongoose.model('history', HistorySchema)

module.exports = HistoryModel