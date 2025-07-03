import {dbConnect} from '@/app/api/lib/dbconnect'
import { NextResponse } from 'next/server';
const userhelper = require('../../../../../client/userhelper/Userhelper')

export async function DELETE(req) {
    await  dbConnect()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    await userhelper.deleteallcart(id)
    return NextResponse.json('success')
}