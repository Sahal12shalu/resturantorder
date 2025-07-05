'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '../../../../../../components/Navbar/Navbar'
import { useParams } from 'next/navigation'
import { IoRadioButtonOnSharp } from "react-icons/io5";
import axios from 'axios'

function Viewpage() {

  const params = useParams()
  const pageid = params['viewproid']
  const proId = params['viewpageid']
  const [product, Setproduct] = useState([])

  useEffect(() => {
    axios.get(`/api/checkout/allcheckout?id=${proId}`)
      .then((res) => {
        Setproduct(res?.data.data)
      })
  }, [])

  
  return (
    <div className='bg-white'>
      <Navbar id={pageid} proId={proId} />
     
          <h1 className='lg:mx-[200px] mt-[60px] text-[20px] max-lg:pl-3 font-semibold text-black'>CarId - {product._id} </h1>
          <h1 className='lg:mx-[200px] mt-[20px] text-[20px] max-lg:pl-3 font-semibold text-black'>Grand Total - {product.grandtotal} </h1>
          <h1 className='lg:mx-[200px] mt-[20px] text-[20px] max-lg:pl-3 font-semibold text-black'>Time - {product.time} | {product.day}</h1>
      {
        product?.items?.map((value, index) => (

          <div key={index} className='lg:mx-[200px] my-[20px] rounded-md shadow-[0px_1px_32px_16px_rgba(0,_0,_0,_0.1)]'>
            <div className='flex w-[100%]'>
              <div className='w-[50%] lg:w-[25%]'>
                <img src={value.image} alt='image' className='text-black max-lg:h-[220px] lg:h-[160px] w-[100%] rounded-tl-md rounded-bl-md' />
                <div className='lg:hidden w-[200%] text-[15px] m-2 pb-3 text-black'>{value.description}</div>
              </div>
              <div className='lg:flex w-[50%] max-lg:pl-3 lg:w-[75%] '>
                <div className='lg:py-4 lg:px-8 w-[100%] lg:w-[50%]'>
                  <h1 className='max-lg:text-start max-lg:w-[100%] text-[20px] font-semibold pt-2 text-black'>{value.name}</h1>
                  <p className='text-[16px] max-lg:hidden text-black'>{value.description}</p>
                  {
                    value.addons.map((item, index) => (
                      <p key={index} className='text-black pt-2 font-semibold text-[18px] max-lg:text-start max-lg:w-[100%]'>{item.name ? item.name : 'Full'} : {item.price}</p>
                    ))
                  }

                </div>
                <div className='lg:p-4 w-[100%] lg:w-[50%]'>
                  <h1 className='pt-1 text-[16px] max-lg:pt-2 max-lg:text-start max-lg:w-[100%] text-black'>Category - <span className='font-semibold text-[16px] text-black'> {value.category} </span></h1>
                  <h1 className='pt-2 flex text-[16px] max-lg:pt-2 max-lg:text-start max-lg:w-[100%] text-black'>Veg/non-veg - <span className='font-semibold text-[16px] text-black'><IoRadioButtonOnSharp className={`${value.vegornon === 'veg' ? 'text-green-500' : 'text-red-500'} ml-2 mt-1`} /></span> </h1>
                  <h1 className='pt-2 text-[16px] max-lg:pt-3 text-black'>Quantity - <span className='font-semibold text-[16px] text-black'>{value.quantity}</span></h1>
                  <h1 className='pt-1 text-[16px] max-lg:pt-3 text-black'>Totalamount - <span className='font-semibold text-[16px] text-black'>{value.totalamount}</span></h1>
                </div>
              </div>
            </div>
          </div>


        ))
      }

    </div>
  )
}

export default Viewpage