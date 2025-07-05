'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'
import { IoCheckmarkDoneCircle } from "react-icons/io5";

function Successpage() {

  const params = useParams()
  const pageid = params['successpage']

  return (
    <div className='w-full bg-white'>
      <div className='xl:h-[80vh] h-[60vh]  my-[180px] md:my-[80px] flex flex-col items-center mx-[20px] sm:mx-[90px] lg:mx-[250px] xl:mx-[400px] shadow-[0px_-2px_34px_10px_rgba(0,_0,_0,_0.1)]'>
        <IoCheckmarkDoneCircle className='mt-[100px] w-[80px] xl:w-[150px] h-[80px] xl:h-[150px] text-amber-500' />
        <h1 className='text-[16px] xl:text-[24px] font-semibold pt-6'>Order is Successfully Completed</h1>
        <p className='max-xl:px-6 pt-3 text-[12px]'>Order is added to history page you can see order details on history page</p>
        <div className='flex gap-6 pt-8'>
          <Link href={`/history/historymain/${pageid}`}><button className='border-1 hover:bg-gray-100 border-black w-[100px] xl:w-[180px] text-[10px] xl:text-[15px] h-[40px]'>VIEW ORDER</button></Link>
          <Link href={`/frontpage/${pageid}`}><button className='text-white hover:bg-orange-400 bg-orange-500 text-[12px] xl:text-[15px] w-[150px] xl:w-[220px] h-[40px]'>CONTINUE SHOPPING</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Successpage