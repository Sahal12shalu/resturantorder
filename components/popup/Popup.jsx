'use client'

import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { TiMinus } from "react-icons/ti";
import { TiPlus } from "react-icons/ti";
import { useCart } from '../../components/context/Cartcontext'

function Popup({ isOpen, onClose, id, onSuccess, pageId }) {

  const [data, Setdata] = useState([])
  const [quantity, Setquantity] = useState(1)
  const [loading, Setloading] = useState(false)
  const popupRef = useRef(null);
  const { SetcartValue } = useCart()

  const incrementbtn = () => {
    Setquantity(quantity + 1)
  }

  const decrementbtn = () => {
    Setquantity(quantity - 1)
  }

  const Addtocartbtn = async (id, quantity) => {
    const value = await document.getElementById('Myselect').value;
    const addon = await JSON.parse(value)
    if (!id) return;
    Setloading(true)
    axios.post(`/api/cartproduct`,{
      id,quantity,pageId,addon
    })
      .then((res) => {
        setTimeout(() => {
          Setloading(false)
          Setquantity(1)
          if (res.data.data === 'success') {
            onSuccess()
            onClose()
            axios.get(`/api/cartproduct?pageId=${pageId}`)
            .then((res) => {
                if (res.data.data.length === 0) {
                    SetcartValue(0)
                } else {
                    SetcartValue(res.data.data[0].items.length)
                }
            })
          }
        }, 500)
      })
  }

  useEffect(() => {
    const handleTouchOrClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
        Setquantity(1)
      }
    };

    document.addEventListener('mousedown', handleTouchOrClick);
    document.addEventListener('touchstart', handleTouchOrClick);

    return () => {
      document.removeEventListener('mousedown', handleTouchOrClick);
      document.removeEventListener('touchstart', handleTouchOrClick);
    };
  }, [onClose]);

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/productdeails/singleproduct?id=${id}`)
      .then((res) => {
        Setdata(res.data.product)
      })
  }, [id])

  if (!isOpen ) return null;

  return (
    <div className="fixed inset-0 h-full flex bg-black/50 items-center justify-center z-50 ">
      <div ref={popupRef} className="absolute bg-white p-6 rounded-lg shadow-lg w-96 items-center justify-center flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">{data.name}</h2>
        <p className='text-[14px] font-serif mb-4'>{data.description}</p>

        <select id='Myselect' className='mb-3 w-[130px] h-[30px] shadow-[0px_1px_24px_8px_rgba(0,_0,_0,_0.1)] rounded-lg font-semibold px-2'>
          {
            data?.addons?.map((value, index) => (
              <option value={[JSON.stringify({ name: value.name, price: value.price })]} key={index} >{value.name ? `${value.name} - ${value.price}` : `${value.price}`}</option>
            ))
          }
        </select>
        <div className='flex flex-wrap pb-5 pt-2'>
          {
            quantity === 1 ?
              <button className='w-[40px] h-[30px] shadow-[0px_1px_24px_8px_rgba(0,_0,_0,_0.1)] bg-gray-300 rounded-tl-2xl rounded-bl-2xl flex justify-center items-center font-bold'><TiMinus /></button> :
              <button onClick={decrementbtn} className='w-[40px] h-[30px] shadow-[0px_1px_24px_8px_rgba(0,_0,_0,_0.1)] rounded-tl-2xl rounded-bl-2xl flex justify-center items-center font-bold'><TiMinus /></button>
          }
          <h1 className='w-[40px] h-[30px] shadow-[0px_1px_24px_8px_rgba(0,_0,_0,_0.1)]  flex justify-center items-center'>{quantity}</h1>
          <button onClick={incrementbtn} className='w-[40px] h-[30px] shadow-[0px_1px_24px_8px_rgba(0,_0,_0,_0.1)] rounded-tr-2xl rounded-br-2xl flex justify-center items-center font-bold'><TiPlus /></button>
        </div>
        <button onClick={() => Addtocartbtn(data._id, quantity)} className='w-[200px] h-[40px] bg-blue-500 rounded-2xl text-white font-semibold'>Add to cart</button>
      </div>
      {loading && (
        <div className='fixed inset-0 bg-black/20 bg-opacity-30 z-50 flex items-center justify-center'>
          <div className='w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
        </div>
      )}
    </div>
  );
}

export default Popup
