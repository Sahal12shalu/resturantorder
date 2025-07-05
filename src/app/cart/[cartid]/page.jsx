'use client'

import React, { use, useEffect, useState } from 'react'
import Navbar from '../../../../components/Navbar/Navbar'
import { TiMinus } from "react-icons/ti";
import { TiPlus } from "react-icons/ti";
import { GiConfirmed } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import axios from 'axios'
import emptycart from '../../../../public/logo/cartempty2.png'
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { useCart } from '../../../../components/context/Cartcontext'

function Cartpage({ params }) {
    const { cartid } = use(params)
    const id = cartid;

    const [cartproducts, Setcartproducts] = useState([])
    const [checkoutdetail, Setcheckoutdetail] = useState([])
    const [alldetails, Setalldetails] = useState([])
    const [showPopup, setShowPopup] = useState(false);
    const [checkoutshowPopup, setcheckoutShowPopup] = useState(false);
    const [opendown, Setopendown] = useState(false)
    const [checkoutid, Setcheckoutid] = useState('')
    const [loading, Setloading] = useState(false)
    const router = useRouter()
    const { cartValue, SetcartValue } = useCart()

    const confirmCheckout = () => {
        Setloading(true)
        axios.post(`/api/checkout?id=${checkoutid}`)
            .then((res) => {
                if (res.data === 'success') {
                    setcheckoutShowPopup(false)
                    setTimeout(() => {
                        router.push(`/history/${id}`)
                    }, 2000)
                }
            })
    }

    useEffect(() => {
        axios.get(`/api/cartproduct?pageId=${id}`)
            .then((res) => {
                if (res.data.data.length === 0) {
                    SetcartValue(0)
                } else {
                    SetcartValue(res.data.data[0].items.length)
                }
            })
    }, [])

    useEffect(() => {

        function changeBG() {
            var scrollvalue = window.scrollY;
            if (scrollvalue < 100) {
                Setopendown(false)
            } else {
                Setopendown(true)
            }
        }
        window.addEventListener('scroll', changeBG)

    }, [])

    const cartfulldelete = () => {
        setShowPopup(true);
    }
    const checkout = (pageid) => {
        Setcheckoutid(pageid)
        setcheckoutShowPopup(true)
    }

    const confirmDelete = () => {
        axios.delete(`/api/cartproduct/cartalledit?id=${id}`)
            .then((res) => {
                if (res.data === 'success') {
                    toast('delet all cart')
                    Setcartproducts([])
                }
            })
    }

    const editproductquantity = (id, pageid, quantity, totalamount) => {
        axios.patch(`/api/cartproduct`, {
            id, pageid, quantity, totalamount
        })
            .then((res) => {
                if (res.data.data === 'success') {
                    toast('quantity changed')
                }
            })
    }

    const Deleteproduct = (id, pageid) => {
        axios.delete(`/api/cartproduct`, {
            data: { id, pageid }
        })
            .then(async (res) => {
                toast('product delete from cart')
                if (res.data.data[0]) {
                    SetcartValue(res.data.data[0].items.length)
                    Setcartproducts(prevProduct => prevProduct.filter(item => item._id !== id))
                    Setcheckoutdetail(res.data.data)
                } else {
                    Setcartproducts([])
                }
            })
    }

    useEffect(() => {
        axios.get(`/api/cartproduct?pageId=${id}`)
            .then((res) => {
                Setalldetails(res.data.data[0])
                if (res.data.data[0]) {
                    Setcartproducts(res.data.data[0].items)
                    Setcheckoutdetail(res.data.data)
                } else {
                    Setcartproducts([])
                }
            })
    }, [])


    const incrementbutton = (index) => {
        const updated = [...cartproducts];
        console.log(updated)
        updated[index].quantity += 1;
        const price = Number(updated[index].addons[0]?.price)
        updated[index].totalamount = price * updated[index].quantity

        const newGrandtotal = updated.reduce((sum, item) => sum + item.totalamount, 0)
        const updatedCheckout = [{ ...checkoutdetail[0], grandtotal: newGrandtotal }]

        Setcheckoutdetail(updatedCheckout)
        Setcartproducts(updated);

    };

    const decrementbutton = (index) => {
        const updated = [...cartproducts];
        if (updated[index].quantity > 1) {
            updated[index].quantity -= 1;
        }
        const price = Number(updated[index].addons[0]?.price)
        updated[index].totalamount = price * updated[index].quantity
        const newGrandtotal = updated.reduce((sum, item) => sum + item.totalamount, 0)
        const updatedCheckout = [{ ...checkoutdetail[0], grandtotal: newGrandtotal }]

        Setcheckoutdetail(updatedCheckout)
        Setcartproducts(updated);
    };

    return (
        <>
            {
                opendown ?
                    <div className='fixed z-50 flex flex-wrap shadow-[0px_2px_35px_12px_rgba(0,_0,_0,_0.1)] justify-center items-center text-center
                        bottom-2 lg:w-[60%] 2xl:w-[60%] w-[90%] h-[50px] rounded-4xl lg:mx-[290px] 2xl:mx-[350px] mx-6 bg-white'>
                        <Link href={`/frontpage/${id}`} className='w-[33%] h-[100%] hover:bg-gray-300 rounded-4xl flex justify-center items-center gap-0.5'>
                            <div><IoMdHome /></div>
                            <div className='pt-0.5 font-semibold'>Home</div>
                        </Link>
                        <div className='w-[33%] h-[100%] hover:bg-gray-300 rounded-4xl flex justify-center items-center gap-0.5'>
                            <div><FaCartShopping /></div>
                            <div className='pt-0.5 font-semibold'>Cart</div>
                            <p className='ml-1 mt-[-1] w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] rounded-4xl text-[14px] text-white font-semibold bg-amber-600 flex justify-center items-center'>{cartValue ? cartValue : 0}</p>
                        </div>
                        <Link href={`/history/historymain/${id}`} className='w-[34%] h-[100%] hover:bg-gray-300 rounded-4xl flex justify-center items-center gap-0.5' >
                            <div><FaBook /></div>
                            <div className=' font-semibold'>History</div>
                        </Link>
                    </div> : ''
            }
            <div className='bg-white'>
                <Navbar id={id} />
                <ToastContainer className='w-[400px] h-[70px]' />
                <div className='flex justify-between'>
                    <h1 className={`${cartproducts.length === 0 ? 'hidden' : ' mx-2 md:pl-[100px] pt-[70px] font-semibold text-[25px] text-black'}`}>CART PAGE</h1>
                    <button onClick={cartfulldelete} className={`${cartproducts.length === 0 ? 'hidden' : 'md:mr-[100px] mr-2 mb-1 mt-[70px] w-[80px] lg:w-[130px] rounded-2xl bg-orange-500 font-semibold text-[16px] text-white hover:bg-red-500'}`}>Delete</button>
                </div>
                {
                    cartproducts.length === 0 ?

                        <div className='flex flex-col mt-[130px] items-center h-[90vh]'>
                            <Image src={emptycart} alt='empty' className='w-[400px] h-[300px]' />
                            <h1 className='text-[22px] opacity-60 text-black font-semibold'>There is no items here</h1>
                            <Link href={`/frontpage/${id}`} ><button className='bg-orange-500 text-white rounded-4xl w-[180px] h-[40px] mt-3'>Add products</button></Link>
                        </div>

                        :
                        <div className='flex px-3 max-2xl:items-center xl:px-[100px] flex-col xl:flex-wrap  w-[100%] h-[100vh]'>
                            <div className='scrollbar w-[100%] md:w-[70%] xl:h-[100vh] overflow-y-scroll' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                <table className="table-auto w-[100%]">
                                    <thead className='bg-orange-600 text-white w-[100%] h-[34px]'>
                                        <tr className='w-[100%]'>
                                            <th className='text-start max-md:w-[60%] max-md:text-[14px] pl-2 h-auto w-[40%] lg:w-[55%]'>items</th>
                                            <th className='text-start max-md:w-[25%] max-md:text-[14px] lg:pl-8 w-[20%]'>value</th>
                                            <th className='text-start max-md:w-[15%] max-md:text-[14px] xl:pr-6 pr-2 w-[10%]'>prize</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartproducts.map((value, index) => (

                                                <tr key={index} className='h-[70px] w-[100%]'>
                                                    <td className='w-[50%]'>
                                                        <div className='flex flex-wrap h-full'>
                                                            <div className='max-lg:w-[35%]'>
                                                                <img src={value.image} className='rounded-xl w-[90px] h-[90px] lg:w-[95px] lg:h-[120px] pl-2 pr-2 py-2' alt='image' />
                                                            </div>
                                                            <div className='max-lg:w-[65%] flex flex-col justify-center'>
                                                                <h1 className='text-[17px] inline-block font-sans font-bold'>{value.name}</h1>
                                                                {value?.addons?.map((data, index) => (
                                                                    <p key={index} className='text-[14px]'>₹ {data.price}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className=' md:w-[35%]'>
                                                        <div className='md:flex md:flex-wrap md:gap-5'>
                                                            <div className='flex flex-wrap pb-2 md:pb-5 pt-5 '>
                                                                {
                                                                    value.quantity === 1 ?
                                                                        <button className='w-[25px] h-[25px] max-sm:w-[20px] max-sm:h-[20px] lg:w-[40px] lg:h-[30px] shadow-[-6px_0px_12px_-9px_rgba(0,_0,_0,_0.8)] bg-gray-300 rounded-tl-2xl rounded-bl-2xl flex justify-center items-center font-bold'><TiMinus /></button>
                                                                        : <button onClick={() => decrementbutton(index)} className='hover:scale-105 hover:shadow-[0px_0px_9px_-5px_rgba(0,_0,_0,_0.8)] w-[25px] h-[25px] max-sm:w-[20px] max-sm:h-[20px] lg:w-[40px] lg:h-[30px] shadow-[-6px_0px_12px_-9px_rgba(0,_0,_0,_0.8)] rounded-tl-2xl rounded-bl-2xl flex justify-center items-center font-bold'><TiMinus /></button>
                                                                }
                                                                <h1 className='w-[25px] h-[25px] max-sm:w-[20px] max-sm:h-[20px] lg:w-[40px] lg:h-[30px] shadow-[0px_0px_9px_-5px_rgba(0,_0,_0,_0.8)] 
                                                                 flex justify-center items-center'>{value.quantity}</h1>

                                                                <button onClick={() => incrementbutton(index)} className='hover:scale-105 hover:shadow-[0px_0px_9px_-5px_rgba(0,_0,_0,_0.8)] w-[25px] h-[25px] max-sm:w-[20px] max-sm:h-[20px] lg:w-[40px] lg:h-[30px] shadow-[6px_0px_12px_-9px_rgba(0,_0,_0,_0.8)] rounded-tr-2xl rounded-br-2xl flex justify-center items-center font-bold'><TiPlus /></button>
                                                            </div>
                                                            <div className='flex flex-wrap gap-1 max-md:gap-3'>

                                                                <button ><GiConfirmed onClick={() => editproductquantity(value._id, alldetails.pageId, value.quantity, value.totalamount)} className='w-[25px] h-[25px] text-green-500' /></button>

                                                                <button><MdDelete onClick={() => Deleteproduct(value._id, alldetails.pageId)} className='w-[25px] h-[25px] text-red-500' /></button>
                                                            </div>
                                                        </div>
                                                    </td>


                                                    <td className='max-lg:text-[14px] w-[15%] font-semibold'>₹ {value.totalamount}</td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>

                            {showPopup && (
                                <div className="fixed inset-0 bg-black/50 flex items-center justify-center rounded-4xl z-50">
                                    <div className="bg-white p-6 rounded shadow-md text-center w-80">
                                        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                                        <p className="mb-6">Do you want to delete all items from the cart?</p>
                                        <div className="flex justify-between">
                                            <button
                                                onClick={() => setShowPopup(false)}
                                                className="px-4 py-2 bg-gray-300 rounded"
                                            >
                                                No
                                            </button>
                                            <button
                                                onClick={confirmDelete}
                                                className="px-4 py-2 bg-red-500 text-white rounded"
                                            >
                                                Yes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {checkoutshowPopup && (
                                <div className="fixed inset-0 bg-black/50 flex items-center justify-center rounded-4xl z-50">
                                    <div className="bg-white p-6 rounded shadow-md text-center w-80">
                                        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                                        <p className="mb-6">Confirm all products and Move to history page ?</p>
                                        <div className="flex justify-between">
                                            <button
                                                onClick={() => setcheckoutShowPopup(false)}
                                                className="px-4 py- w-[70px] bg-gray-300 rounded"
                                            >
                                                No
                                            </button>
                                            <button
                                                onClick={confirmCheckout}
                                                className="px-4 w-[70px] py-2 bg-red-500 text-white rounded"
                                            >
                                                Yes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {
                                checkoutdetail.map((value, index) => (
                                    <div key={index} className='w-[100%] md:w-[70%] xl:w-[30%] max-xl:pt-[80px]'>
                                        <div className='bg-orange-600 w-[100%] h-[34px]'></div>
                                        <div className='shadow-[0px_0px_84px_27px_rgba(149,_157,_165,_0.2)] mt-3 h-auto p-10 text-center'>
                                            <div className='flex justify-between'><h1 className='text-[18px] font-semibold '>Subtotal </h1>
                                                <h1 className='text-[18px] font-semibold '>₹ {value.grandtotal}</h1></div>
                                            <div className='flex justify-between my-2'><h1 className='text-[16px]  '>Tax </h1><h1 className='text-[16px] '>₹0</h1></div>
                                            <div className='border-b-4 border-orange-600 w-full'></div>
                                            <div className='flex justify-between py-4'><h1 className=' text-[18px] font-semibold '>Grand Total </h1>
                                                <h1 className='text-[18px] font-semibold '>₹ {value.grandtotal}</h1></div>
                                            <button onClick={() => checkout(value.pageId)} className='w-[150px] h-[35px] rounded-3xl bg-orange-600 text-white mt-4'>CheckOut</button>
                                        </div>
                                    </div>
                                ))}
                            {loading && (
                                <div className='fixed inset-0 bg-black/20 bg-opacity-30 z-50 flex items-center justify-center'>
                                    <div className='w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
                                </div>
                            )}
                        </div>
                }
            </div>
        </>

    )
}

export default Cartpage