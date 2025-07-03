import {dbConnect} from '@/app/api/lib/dbconnect'
const userhelper = require('../../../../client/userhelper/Userhelper')
import { NextResponse } from 'next/server';

export async function POST(req) {
    await dbConnect();

    const body = await req.json();
    await userhelper.addproduct(body)
    

    return NextResponse.json({data: 'success'})
}

export async function GET() {
    await dbConnect();

    const datas =await userhelper.getproduct()

    return NextResponse.json({product: datas})
}

export async function DELETE(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    await userhelper.deleteproduct(id)
    return NextResponse.json('success')
}

export async function PUT(req) {
    await  dbConnect()

    const body = await req.json();

    await userhelper.editedproduct(body)
    return NextResponse.json('success')

}