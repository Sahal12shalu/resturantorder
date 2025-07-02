export default function Server() {
    const express = require('express')
    const cors = require('cors')
    const mongoose = require('mongoose')
    const userhelper = require('../userhelper/Userhelper')
    const fileupload = require('express-fileupload')
    require('dotenv').config()

    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(fileupload())

    mongoose.connect("mongodb+srv://sahalstart1:ERH1HhPs2EZ78sLL@cluster0.62fpwom.mongodb.net/hotel2").then(()=>{
        console.log('mongodb connected')
    })

    app.post('/productdetails', (async(req, res) => {
        req.body.addons = JSON.parse(req.body.addons)
        userhelper.addproduct(req.body).then(() => {
            res.json('success')
        })
    })),

        app.get('/getproductdetail', ((req, res) => {
            userhelper.getproduct(req.body).then((data) => {
                res.json(data)
            })
        })),

        app.get('/getsingleproductdetail/:id', ((req, res) => {
            const id = req.params.id
            userhelper.getsingleproduct(id).then((response) => {
                res.json(response)
            })
        })),

        app.post('/addcartproduct/:id/:quantity/:pageId', (async (req, res) => {
            const addons = req.body
            const data = await userhelper.getsingleproduct(req.params.id).then();
            const CartItems = {
                pageId: req.params.pageId,
                items: [{
                    _id: data._id,
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    seperation: data.seperation,
                    vegornon: data.vegornon,
                    addons: addons,
                    image:data.image,
                    quantity: Number(req.params.quantity),
                    totalamount: Number(req.params.quantity) * addons.price
                }]
            }
            userhelper.addcartproduct(CartItems).then(() => {
                res.json('success')
            })
        })),

        app.post('/getcartproductbyId/:number', ((req, res) => {
            const id = req.params.number
            userhelper.getcartproductbynumber(id).then((response) => {
                res.json(response)
            })
        })),

        app.post('/deletecartsingleproduct/:id/:pageid', ((req, res) => {
            const id = req.params.id
            const pageid = req.params.pageid
            userhelper.deletecartsingleproduct(id, pageid).then(async () => {
                const data = await userhelper.getcartproductbynumber(pageid).then()
                res.json(data)
            })
        })),

        app.post('/quantitychange/:id/:pageid/:quantity/:totalamount', ((req, res) => {
            const id = req.params.id
            const pageid = req.params.pageid
            const quantity = req.params.quantity
            const totalamount = req.params.totalamount
            userhelper.quantitychange(id, pageid, quantity, totalamount).then(() => {
                res.json('success')
            })
        })),

        app.post('/deleteallcart/:id', ((req, res) => {
            const id = req.params.id
            userhelper.deleteallcart(id).then(() => {
                res.json('success')
            })
        })),

        app.post('/deletecartandstore/:id', ((req, res) => {
            userhelper.addsuccessproduct(req.params.id).then(() => {
                res.json('success')
            })
        })),

        app.post('/getsuccessproduct/:pageid', ((req, res) => {
            const pageid = req.params.pageid
            userhelper.getsuccessproduct(pageid).then((response) => {
                res.json(response)
            })
        })),

        app.post('/deleteproduct/:proId', ((req, res) => {
            const id = req.params.proId
            userhelper.deleteproduct(id).then(() => {
                res.json('success')
            })
        })),

        app.post('/editedproduct/:proId', ((req, res) => {
            req.body.addons = JSON.parse(req.body.addons)
            const id = req.params.proId
            userhelper.editedproduct(req.body, id).then(() => {
                        res.json('success')    
            })
        })),

        app.post('/getviewproduct/:id',((req,res)=>{
            const proId = req.params.id
            userhelper.getviewproduct(proId).then((response)=>{
                res.json(response)
            })
        })),

    app.listen(3001, () => {
        console.log('server is running')
    })
}