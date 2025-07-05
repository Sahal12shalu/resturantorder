'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '../../../../../components/Navbar/Navbar'
import { FaSearch } from "react-icons/fa";
import { useParams } from 'next/navigation'
import { IoRadioButtonOnSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Showpage() {

    const params = useParams()
    const pageid = params['showpage']
    const [data, Setdata] = useState([])
    const [proId, SetproId] = useState('')
    const router = useRouter()
    const [showpopup, Setshowpopup] = useState(false)
    const [search,Setsearch] = useState('')

    const searchproduct = data.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => {
        axios.get('/api/productdeails')
            .then((res) => {
                console.log(res)
                Setdata(res.data.product)
            })
    }, [])

    const deleteproduct = (proId) => {
        SetproId(proId)
        Setshowpopup(true)
    }

    const popupconfirm = () =>{
        axios.delete(`/api/productdeails?id=${proId}`)
        .then((res)=>{
            if(res.data === 'success'){
                SetproId('')
                Setshowpopup(false)
                 toast('product delete from your store')
                Setdata(prevData => prevData.filter(item => item._id !== proId))
            }
        })
    }

    const editproduct = (proId) =>{
       router.push(`/pages/editpage/${proId}/${pageid}`)
    }


    return (
        <div className='bg-white'>
            <Navbar id={pageid} />
            <div className='flex flex-col justify-center items-center'>
                <ToastContainer className='w-[400px] h-[70px]' />
                <div className='flex justify-between items-center rounded-4xl shadow-[0px_2px_11px_9px_rgba(0,_0,_0,_0.1)] mt-4 w-[98%] lg:w-[60%] h-[35px] relative'>
                    <input value={search} onChange={(e)=> Setsearch(e.target.value)} className='pl-2 rounded-4xl w-full h-full' type='text' />
                    <button className='pr-2 absolute right-0'><FaSearch /></button>
                </div>
                <div className='flex flex-col w-[100%] lg:w-[70%] items-center shadow-[0px_2px_11px_9px_rgba(0,_0,_0,_0.1)] mt-6 pb-6'>
                    {
                        searchproduct.map((item, index) => (

                            <div key={index} className='flex items-center w-[90%] h-auto mt-6 rounded-xl p-4 py-6 border-2 border-black/30'>
                                <h1 className='w-[5%] text-center max-lg:hidden'>{index + 1}</h1>
                                <img src={item.image} alt='image' className='h-[70px] w-[10%] max-lg:w-[20%] rounded-md pr-1' />
                                <h1 className='w-[20%] text-[18px] pl-1 text-center font-bold max-lg:text-[13px] max-lg:w-[30%] text-black'>{item.name}</h1>
                                <h1 className='text-center w-[12%] font-semibold max-lg:hidden text-black'>{item.seperation}</h1>
                                <h1 className={`${item.vegornon === 'veg' ? 'text-green-500' : 'text-red-500'} flex justify-center items-center w-[8%] max-lg:w-[10%] font-semibold`}><IoRadioButtonOnSharp /></h1>

                                <div className='text-center font-semibold w-[8%] max-lg:hidden'>
                                    {
                                        item?.addons?.map((value, index) => (
                                            <h1 className='text-black' key={index}>{value.name === '' ? 'full' : value.name}</h1>
                                        ))
                                    }
                                </div>


                                <div className='w-[2%] text-center max-lg:hidden'>
                                    {
                                        item?.addons?.map((value, index) => (
                                            <h1 className='text-black' key={index}> - </h1>
                                        ))
                                    }
                                </div>
                                <div className='text-center w-[10%] font-semibold max-lg:hidden'>
                                    {
                                        item?.addons?.map((value, index) => (
                                            <h1 className='text-black' key={index}>₹ {value.price} </h1>
                                        ))
                                    }
                                </div>
                                <h1 className='lg:hidden w-[16%] font-semibold'>1200</h1>
                                <div className='w-[25%] flex justify-between max-lg:flex max-lg:flex-col max-lg:w-[30%] gap-1 max-lg:h-[100%]'>
                                    <button onClick={() => editproduct(item._id)} className='w-[40%] max-lg:w-[100%] max-lg:h-[35%] hover:bg-blue-600 bg-blue-500 h-[35px] rounded-md text-white'>edit</button>
                                    <button onClick={() => deleteproduct(item._id)} className='w-[50%] max-lg:w-[100%] max-lg:h-[28px] hover:bg-orange-600 bg-orange-500 h-[35px] rounded-md text-white'>delete</button>
                                </div>
                            </div>
                        ))
                    }

                </div>

            </div>
            {showpopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center rounded-4xl z-50">
                    <div className="bg-white p-6 rounded shadow-md text-center w-80">
                        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                        <p className="mb-6">Confirm delete the product from web App ?</p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => Setshowpopup(false)}
                                className="px-4 py- w-[70px] bg-gray-300 rounded"
                            >
                                No
                            </button>
                            <button
                                onClick={popupconfirm}
                                className="px-4 w-[70px] py-2 bg-red-500 text-white rounded"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Showpage