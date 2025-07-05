'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '../../../../components/Navbar/Navbar'
import axios from 'axios'

function About() {

  const params = useParams()
  const pageid = params['about']
  const [data, Setdata] = useState([])
  const [month, setMonth] = useState('');
  const [length, Setlength] = useState('');
  const [totalamount, Settotalamount] = useState('')
  const [orderofmonth, Setorderofmonth] = useState('')
  const [totalofmonth, Settotalofmonth] = useState('')
  const [loading, Setloading] = useState(false)

  const datesubmit = (month) => {
    Setloading(true)
    setTimeout(()=>{
      const filterorders = data.filter(order =>
      order.day.startsWith(month)
    );

    const totalorderofMonth = filterorders.length
    const totalamountofmonth = filterorders.reduce((sum, order) => sum + order.grandtotal, 0)

    Setorderofmonth(totalorderofMonth)
    Settotalofmonth(totalamountofmonth)
    Setloading(false)
    },1000)

  }

  useEffect(() => {
    axios.get(`/api/checkout?id=${pageid}`)
      .then((res) => {
        Setlength(res.data.data.length)
        const data = res.data.data
        Setdata(res.data.data)

        const total = data.reduce((acc, curr) => acc + curr.grandtotal, 0)
        Settotalamount(total)

        const filterorders = data.filter(order =>
          order.day.startsWith(month)
        );

        const totalorderofMonth = filterorders.length
        const totalamountofmonth = filterorders.reduce((sum, order) => sum + order.grandtotal, 0)

        Setorderofmonth(totalorderofMonth)
        Settotalofmonth(totalamountofmonth)
      })
  }, [])


  return (
    <div className='bg-white'>
      <Navbar id={pageid} />
      <div className='lg:mt-[150px] mt-[100px] flex flex-col justify-center items-center'>
        <h1 className='text-[26px] font-semibold'>Table Number - {pageid}</h1>
        <h1 className='text-[22px] font-semibold pt-5'>Total orders - {length} </h1>
        <h1 className='text-[22px] font-semibold pt-5'>Total Amount - {totalamount} </h1>
      </div>
      <div className='mt-[30px] flex flex-col justify-center items-center' >
        <div className='flex gap-4'>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder='choose month'
            className="w-[70%] lg:w-[60%] border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button onClick={() => datesubmit(month)} className='w-[100px] h-[40px] bg-orange-500 hover:bg-orange-600 rounded-xl text-white'>Click</button>
        </div>
        <h1 className='text-[20px] font-semibold pt-8'>Total orders of Month - {orderofmonth} </h1>
        <h1 className='text-[20px] font-semibold pt-5'>Total Amount of Month - {totalofmonth} </h1>
      </div>
      {loading && (
        <div className='fixed inset-0 bg-black/20 bg-opacity-30 z-50 flex items-center justify-center'>
          <div className='w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
        </div>
      )}
    </div>
  )
}

export default About