import {dbConnect} from '@/app/api/lib/dbconnect'
const userhelper = require('../../../../../client/userhelper/Userhelper')
import { NextResponse } from 'next/server';

export async function GET(req ,{ params }) {
    const {id} = await params;
    console.log(id)
    await dbConnect();

    const datas =await userhelper.getsingleproduct(id)
    return NextResponse.json({product: datas})
}
