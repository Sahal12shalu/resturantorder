import {dbConnect} from '@/app/api/lib/dbconnect'
import { NextResponse } from 'next/server';
const userhelper = require('../../../../client/userhelper/Userhelper')

export async function POST(req) {
    await  dbConnect()
    
    const body =await req.json();
    const {id,quantity,pageId,addon} = body
    const data = await userhelper.getsingleproduct(id)
            const CartItems = {
                pageId: pageId,
                items: [{
                    _id: data._id,
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    seperation: data.seperation,
                    vegornon: data.vegornon,
                    addons: addon,
                    image:data.image,
                    quantity: Number(quantity),
                    totalamount: Number(quantity) * addon.price
                }]
            }

            userhelper.addcartproduct(CartItems)
            return NextResponse.json({data: 'success'})
   }

   export async function GET(req) {
    await  dbConnect()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('pageId')
    
    const data = await userhelper.getcartproductbynumber(id)

    return NextResponse.json({data})
        
   }

   export async function DELETE(req) {
    await  dbConnect()

    const body =await req.json();
    const {id, pageid} = body
    
    userhelper.deletecartsingleproduct(id,pageid)
    const data = await userhelper.getcartproductbynumber(pageid)
    return NextResponse.json({data: data})
   }

   export async function PATCH(req) {
    await  dbConnect()

    const body =await req.json();
    const {id,pageid,quantity,totalamount} = body
    
    await userhelper.quantitychange(id,pageid,quantity,totalamount)
    return NextResponse.json({data: 'success'})
   }