'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '../../../../../components/Navbar/Navbar'
import { FaWallet } from "react-icons/fa6";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IoMdHome } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import Table from 'react-bootstrap/Table';
import { useParams } from 'next/navigation';
import { MdHistory } from "react-icons/md";
import axios from 'axios';
import Link from 'next/link';

function History() {

  const [fromDate, setFromDate] = useState(dayjs('2025-06-01'));
  const [toDate, setToDate] = useState(dayjs());
  const params = useParams()
  const pageid = params['historypage']
  const [product, Setproduct] = useState([])
  const [opendown, Setopendown] = useState(false)
  const [cartvalue, Setcartvalue] = useState()
  const [length, Setlength] = useState('')

  const filteredData = product.filter(item => {
    const itemDate = dayjs(item.day); // Convert item date
    return itemDate.isAfter(fromDate) && itemDate.isBefore(toDate);
  });

  useEffect(() => {
    axios.get(`/api/cartproduct?pageId=${pageid}`)
      .then((res) => {
        if (res.data.data.length === 0) {
          Setcartvalue(0)
        } else {
          Setcartvalue(res.data.data[0].items.length)
        }
      })
  }, [])

  useEffect(() => {
    function changeBG() {
      var scrollvalue = window.scrollY;
      if (scrollvalue < 50) {
        Setopendown(false)
      } else {
        Setopendown(true)
      }
    }
    window.addEventListener('scroll', changeBG)

  }, [])

  useEffect(() => {
    axios.get(`/api/checkout?id=${pageid}`)
      .then((res) => {
        Setproduct(res.data.data)
        Setlength(res.data.data.length)
      })
  }, [])

  return (
    <>

      {
        opendown ?
          <div className='fixed z-50 flex flex-wrap shadow-[0px_2px_35px_12px_rgba(0,_0,_0,_0.1)] justify-center items-center text-center
                        bottom-2 lg:w-[60%] 2xl:w-[60%] w-[90%] h-[50px] rounded-4xl lg:mx-[290px] 2xl:mx-[350px] mx-6 bg-white'>
            <Link href={`/frontpage/${pageid}`} className='w-[33%] h-[100%] hover:bg-gray-300 rounded-4xl flex justify-center items-center gap-0.5'>
              <div><IoMdHome /></div>
              <div className='pt-0.5 font-semibold'>Home</div>
            </Link>
            <Link href={`/cart/${pageid}`} className='w-[33%] h-[100%] hover:bg-gray-300 rounded-4xl flex justify-center items-center gap-0.5'>
              <div><FaCartShopping /></div>
              <div className='pt-0.5 font-semibold'>Cart</div>
              <p className='ml-1 mt-[-1] w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] rounded-4xl text-[14px] text-white font-semibold bg-amber-600 flex justify-center items-center'>{cartvalue ? cartvalue : 0}</p>
            </Link>
            <div className='w-[34%] h-[100%] hover:bg-gray-300 rounded-4xl flex justify-center items-center gap-0.5' >
              <div><FaBook /></div>
              <div className=' font-semibold'>History</div>
            </div>
          </div> : ''
      }

      {
        length === 0 ?

          <div className='bg-white'>
            <Navbar id={pageid} />
            <div className='flex flex-col pt-[150px] items-center'>
              <MdHistory className='text-orange-500 h-[100px] w-[100px]' />
              <h1 className='font-semibold text-[28px] pt-3'>No Orders Yet</h1>
              <p className='text-center text-black/70 pt-4'>Browse products and order with us<br /> share your experience with us</p>
              <Link href={`/frontpage/${pageid}`}><button className='mt-4 hover:bg-orange-600 bg-orange-500 rounded-md text-white w-[150px] h-[40px] '>Order Now</button></Link>
            </div>
          </div>

          :

          <div className='w-full bg-white'>
            <Navbar id={pageid} />
            <div className='mx-[10px] xl:mx-[100px] my-[30px] h-auto'>
              <FaWallet className='w-[40px] h-[40px] ' />
              <h1 className='text-[32px] font-semibold font-sans pb-1'>Historypage</h1>
              <div className='flex flex-col lg:flex lg:flex-wrap w-[100%] pt-4 pb-8 border-t-2 border-b-2 border-orange-500 lg:justify-between lg:items-center'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      label="From Date"
                      value={fromDate}
                      onChange={(newValue) => setFromDate(newValue)}
                      defaultValue={dayjs('2025-07-26')}
                    />

                    <DatePicker
                      label="To Date"
                      value={toDate}
                      onChange={(newValue) => setToDate(newValue)}
                      defaultValue={dayjs('2022-04-17')}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <Table className='w-full max-md:hidden'>
                <thead className='h-[50px] bg-gray-200 border-b-2 border-orange-500'>
                  <tr>
                    <th className='w-[5%]'>No</th>
                    <th className='w-[30%]'>
                      <div className='flex w-[100%]'>
                        <h1 className='w-[70%]'>CartID</h1>
                        <h1 className='w-[30%]'>Date</h1>
                      </div>
                    </th>
                    <th className='w-[30%]'>Product Name</th>
                    <th className='w-[10%]'>Quantity</th>
                    <th className='w-[15%]'>GrandTotal</th>
                    <th className='w-[10%]'>Action</th>
                  </tr>
                </thead>

                {
                  filteredData.map((item, index) => (
                    <tbody key={index} className='text-center border-b-2 border-orange-500'>
                      <tr>
                        <td className='py-7 max-md:w-[10%] max-md:hidden'>{index + 1}</td>
                        <td className='py-7 max-md:hidden'>
                          <div className='flex justify-around '>
                            <h1 className='pl-6'>{item._id}</h1>
                            <div>
                              <p >{item.time}</p>
                              <p>{item.day}</p>
                            </div>
                          </div>
                        </td>

                        <td className='py-7 max-md:pl-2 max-md:w-[25%] '>
                          {
                            item?.items?.map((data, index) => (
                              <div key={index} className='pt-3 font-semibold'>{data.name}</div>
                            ))
                          }

                        </td>
                        <td className='py-7 max-md:w-[5%]'>
                          {
                            item?.items?.map((data, index) => (
                              <div key={index} className='pt-3 md:hidden'>- {data.quantity}</div>
                            ))
                          }
                          {
                            item?.items?.map((data, index) => (
                              <div key={index} className='pt-3 max-md:hidden'>{data.quantity}</div>
                            ))
                          }

                        </td>
                        <td className='py-7 max-md:w-[18%] font-semibold max-md:hidden'>{item.grandtotal}</td>
                        <td className='md:hidden max-md:w-[30px]'></td>
                        <td className='py-7 pr-2 max-md:w-[16%]'>
                          <Link href={`/history/viewpage/${item._id}/${pageid}`}><button className='w-[100px] h-[35px] text-white rounded-3xl font-semibold hover:bg-orange-600 bg-orange-500'>View All</button></Link></td>
                      </tr>
                    </tbody>
                  ))
                }
              </Table>

              {
                filteredData.map((item, index) => (
                  <div key={index} className='md:hidden py-7 flex justify-between items-center px-2 border-b-2 shadow-[0px_2px_11px_9px_rgba(0,_0,_0,_0.1)] border-orange-500'>
                    <div>
                      <h1 className='font-semibold text-[13px]'>{item._id}</h1>
                      <div className='flex flex-col pl-3 pt-3'>
                        {
                          item?.items?.map((data, index) => (
                            <div key={index} className='flex' >
                              <h1 className='font-semibold'>{data.name}</h1>
                              <p> - {data.quantity}</p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <div className='flex-col '>
                      <div>
                        <h1 className='font-semibold'>Amount - {item.grandtotal}</h1>
                      </div>
                      <div className='flex justify-end items-end'>
                        <Link href={`/history/viewpage/${item._id}/${pageid}`}><button className='bg-orange-500 hover:bg-orange-600 mt-6 text-white w-[120px] rounded-md flex items-center px-4 h-[30px]'>View Details</button></Link>
                      </div>
                    </div>
                  </div>
                ))
              }

            </div>
          </div>
      }
    </>
  )
}

export default History