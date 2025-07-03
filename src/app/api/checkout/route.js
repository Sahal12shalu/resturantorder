import {dbConnect} from '@/app/api/lib/dbconnect'
import { NextResponse } from 'next/server';
const userhelper = require('../../../../client/userhelper/Userhelper')

export async function POST(req) {
    await  dbConnect()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    await userhelper.addsuccessproduct(id)
    return NextResponse.json('success')
}

export async function GET(req) {
    await  dbConnect()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    const data = await userhelper.getsuccessproduct(id)
    return NextResponse.json({data})
}