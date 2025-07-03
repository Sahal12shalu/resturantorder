import {dbConnect} from '@/app/api/lib/dbconnect'
import { NextResponse } from 'next/server';
const userhelper = require('../../../../../client/userhelper/Userhelper')

export async function GET(req) {
    await  dbConnect()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    const data = await userhelper.getviewproduct(id)
    return NextResponse.json({data})
}