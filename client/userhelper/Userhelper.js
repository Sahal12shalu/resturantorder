const productModel = require('../../src/app/api/schema/productschema')
const CartModel = require('../../src/app/api/schema/cartschema')
const HistoryModel = require('../../src/app/api/schema/historyschema')

module.exports = {

    addproduct: ((data) => {
        return new Promise((resolve, reject) => {
            productModel.insertOne(data).then((res) => {
                resolve(res)
            })
        })
    }),

    getproduct: (() => {
        return new Promise((resolve, reject) => {
            productModel.find().then((data) => {
                resolve(data)
            })
        })
    }),

    getsingleproduct: ((id) => {
        return new Promise((resolve, reject) => {
            productModel.findById({ _id: id }).then((res) => {
                resolve(res)
            })
        })
    }),

    addcartproduct: ((data) => {
        return new Promise(async (resolve, reject) => {
            delete data._id
            const cart = await CartModel.find().then()
            if (cart.length) {
                const pageId = await CartModel.find({ pageId: data.pageId }).then()
                if (pageId.length) {
                    const sameproduct = await CartModel.findOne({ pageId: data.pageId, 'items._id': data.items[0]._id }).then()
                    if (sameproduct) {
                        const oldCart = await CartModel.findOne({ pageId: data.pageId });

                        const previousGrandTotal = oldCart?.grandtotal;
                        const newGrandTotal = previousGrandTotal + data.items[0].totalamount;
                        await CartModel.findOneAndUpdate({ pageId: data.pageId, 'items._id': data.items[0]._id },
                            {
                                $inc: {
                                    'items.$.quantity': data.items[0].quantity,
                                    'items.$.totalamount': data.items[0].totalamount,
                                }
                            }
                        )
                        await CartModel.findOneAndUpdate({ pageId: data.pageId },
                            {
                                $set: {
                                    'grandtotal': newGrandTotal
                                }
                            }
                        )
                            .then(() => {
                                resolve()
                            })
                    } else {
                        await CartModel.findOneAndUpdate({ pageId: data.pageId },
                            { $push: { items: data.items } }
                        )
                    }
                    const updatedDoc = await CartModel.findOne({ pageId: data.pageId });
                    const newGrandTotal = updatedDoc.items.reduce((sum, item) => sum + item.totalamount, 0);
                    await CartModel.updateOne(
                        { pageId: data.pageId },
                        { $set: { grandtotal: newGrandTotal } }
                    );

                    resolve()
                } else {
                    data.grandtotal = data.items[0].totalamount
                    await CartModel.insertMany([data]).then(() => {
                        resolve()
                    })
                }
            } else {
                data.grandtotal = data.items[0].totalamount
                await CartModel.insertMany([data]).then(() => {
                    resolve()
                })
            }
        })
    }),

    getcartproductbynumber: ((number) => {
        return new Promise((resolve, reject) => {
            CartModel.find({ pageId: number }).then((res) => {
                resolve(res)
            })
        })
    }),

    deletecartsingleproduct: ((id, pageid) => {
        return new Promise(async (resolve, reject) => {
            CartModel.updateOne({ pageId: pageid }, { $pull: { items: { _id: id } } })
                .then(async () => {
                    const updatedDoc = await CartModel.findOne({ pageId: pageid });
                    const newGrandTotal = updatedDoc.items.reduce((sum, item) => sum + item.totalamount, 0);
                    await CartModel.findOneAndUpdate({ pageId: pageid },
                        {
                            $set: {
                                'grandtotal': newGrandTotal
                            }
                        })
                    CartModel.findOne({ pageId: pageid }).then((cart) => {
                        if (cart.items.length === 0) {
                            CartModel.deleteOne({ pageId: pageid }).then(() => {
                                resolve();
                            }).catch(reject);
                        } else {
                            resolve();
                        }
                    })
                })
        })
    }),

    quantitychange: ((id, pageid, quantity, totalamount) => {
        return new Promise(async (resolve, reject) => {
            await CartModel.findOneAndUpdate({ pageId: pageid, 'items._id': id },
                {
                    $set: {
                        'items.$.quantity': quantity,
                        'items.$.totalamount': totalamount,
                    }
                }
            )
            const updatedDoc = await CartModel.findOne({ pageId: pageid });
            const newGrandTotal = updatedDoc.items.reduce((sum, item) => sum + item.totalamount, 0);
            await CartModel.findOneAndUpdate({ pageId: pageid },
                {
                    $set: {
                        'grandtotal': newGrandTotal
                    }
                }
            )
                .then(() => {
                    resolve()
                })
        })
    }),

    deleteallcart: ((id) => {
        return new Promise((resolve, reject) => {
            CartModel.findOneAndDelete({ pageId: id }).then(() => {
                resolve()
            })
        })
    }),

    addsuccessproduct: ((id) => {
        return new Promise(async (resolve, reject) => {
            const data = await CartModel.findOne({ pageId: id }).then()
            delete data._id

            HistoryModel.insertMany([data]).then(() => {
                CartModel.findOneAndDelete({ pageId: id }).then(() => {
                    resolve()
                })
            })
        })
    }),

    getsuccessproduct: ((id) => {
        return new Promise((resolve, reject) => {
            HistoryModel.find({ pageId: id }).then((res) => {
                resolve(res)
            })
        })
    }),

    deleteproduct: ((id) => {
        return new Promise((resolve, reject) => {
            productModel.deleteOne({ _id: id }).then(() => {
                resolve()
            })
        })
    }),

    editedproduct: ((data) => {
        const updateAddons = data.data.map(addon => {
            if (addon._id) {
                return {
                    _id: addon._id,
                    name: addon.name,
                    price: addon.price
                }
            } else {
                return {
                    name: addon.name,
                    price: addon.price
                }
            }
        })
        return new Promise((resolve, reject) => {
            productModel.updateOne({ _id: data.proId }, {
                $set: {
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    vegornon: data.vegornon,
                    seperation: data.seperation,
                    addons: updateAddons,
                    image: data.image
                }
            }).then(() => {
                resolve()
            })
        })
    }),

    getviewproduct: ((id) => {
        return new Promise((resolve, reject) => {
            HistoryModel.findById({ _id: id }).then((res) => {
                resolve(res)
            })
        })
    }),
    
}