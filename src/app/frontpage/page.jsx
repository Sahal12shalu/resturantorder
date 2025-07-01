'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import table1 from '../../../public/table/table1.jpeg'
import table2 from '../../../public/table/table2.jpeg'
import table3 from '../../../public/table/table3.jpeg'
import table4 from '../../../public/table/table4.jpeg'
import table5 from '../../../public/table/image5.jpeg'
import { useRouter } from 'next/navigation'

function Frontpage() {

  const [data,Setdata] = useState([])
  const router = useRouter()

  const information = [{
    id:1,
    table:1,
    seat:4,
    image:table1
  },{
    id:2,
    table:2,
    seat:2,
    image:table2
  },{
    id:3,
    table:3,
    seat:8,
    image:table3
  },{
    id:4,
    table:4,
    seat:2,
    image:table4
  },{
    id:5,
    table:5,
    seat:4,
    image:table5
  }
]

  useEffect(() => {
    Setdata(information)
  }, [])
  

  return (
    <div>
      <div className='relative h-screen overflow-hidden'>
      <video autoPlay loop muted className='w-full h-full object-cover z-1'>
        <source src='/background.mp4' type='video/mp4' />
      </video>
      </div>
      <div className='mainpage absolute left-0 top-0 bg-black opacity-60 w-screen h-screen'></div>
      <div className='mainpage absolute left-0 top-0 text-white w-screen h-screen overflow-y-scroll'>
        <h1 className='m-5 text-[35px] md:text-[50px] text-center pt-[70px] opacity-80' style={{fontFamily:'cursive'}}>Book a table for yourself at a time <br/> convenient  for you </h1>
        <div className='px-1 xl:px-[250px] flex flex-wrap gap-x-5 sm:gap-x-24 justify-center'>
          {
            data.map((value)=>(
              <div key={value.id} className='max-sm:pb-3 max-sm:w-[180px] w-[200px] sm:w-[250px] h-[220px] sm:h-[300px] mt-15 mb-3 bg-white rounded-md md:rounded-md text-black text-center'>
            <Image src={value.image} alt='table' className='w-full h-[55%] rounded-tr-2xl rounded-tl-2xl' />
            <h1 className='font-bold text-[17px] sm:text-[24px] mt-2'>Table no - {value.table}</h1>
            <p className='sm:font-semibold text-[14px] sm:text-[16px]'>Seats - {value.seat}</p>
            <button onClick={()=> router.push(`/frontpage/${value.id}`)} className='w-[120px] hover:bg-amber-600 sm:w-[150px] h-[25px] sm:h-[40px] max-sm:text-[13px] rounded-lg bg-amber-500 text-white mt-1.5'>Go to Menu</button>
             </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Frontpage