'use client'

import React from 'react'
import Navbar from '../../../../components/Navbar/Navbar'
import { MdDelete } from "react-icons/md";
import { useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';

function Addproduct() {

  const params = useParams()
  const pageid = params['add-product']

  const router = useRouter()

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, Setname] = useState('')
  const [description, Setdescription] = useState('')
  const [category, Setcategory] = useState('')
  const [vegornon, Setvegornon] = useState('')
  const [seperation, Setseperation] = useState('')
  const [imagebase64,Setimagebase64] = useState('')
  const [addons, setAddons] = useState([
    { name: '', price: 0 }
  ]);
  const [prize, Setprize] = useState([])
  const [loading, Setloading] = useState(false)

  const formData = new FormData()

  formData.append('name', name)
  formData.append('description', description)
  formData.append('category', category)
  formData.append('vegornon', vegornon)
  formData.append('prize', prize)
  formData.append('seperation', seperation)
  formData.append('addons', JSON.stringify(addons))
  formData.append('image', imagebase64)

  const Handlesubmit = (e) => {
    e.preventDefault()
    Setprize(addons)
    Setloading(true)
    axios.post('http://localhost:3001/productdetails', formData)
      .then((res) => {
        if (res.data === 'success') {
          setTimeout(() => {
            Setloading(false)
            toast("Products Added")
            Setname('')
            Setdescription('')
            Setcategory('')
            Setvegornon('')
            Setseperation('')
            setSelectedImage('')
            setAddons([{ name: '', price: 0 }])
            router.push(`/pages/${pageid}`)
          }, 1000)
        }
      })
  }

  function convertTobase64(file){
        return new Promise((resolve,reject)=>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result)
        })
    }

   
  const handleImageChange =async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

       const base64 =await convertTobase64(file)
       Setimagebase64(base64)

    }
  };

  const handleChange = (i, field, value) => {
    const updated = [...addons];
    updated[i][field] = value;
    setAddons(updated);
  };

  const addAddon = () => {
    setAddons([...addons, { name: '', price: 0 }]);
  };

  const Deleteaddon = (indexToremove) => {
    const update = addons.filter((_, index) => index !== indexToremove)
    setAddons(update)
  }

  return (
    <div >
      <div className='absolute top-0 w-full'>
        <Navbar id={pageid} />
      </div>
      <ToastContainer className='w-[400px] h-[70px]' />
      <form onSubmit={Handlesubmit}>
        <div className='mx-[20px] lg:mx-[200px] 2xl:mx-[300px] flex flex-col items-center mt-[110px] mb-[40px] pb-[40px] shadow-[1px_0px_52px_13px_rgba(0,_0,_0,_0.1)]
           shadow-gray-300 opacity-95 h-auto rounded-2xl bg-black/20' >
          <div className='flex justify-end items-end max-md:w-[90%] w-[60%] pt-8'>
            <Link href={`/pages/showpage/${pageid}`}><button className='w-[140px] h-[35px] bg-blue-600 hover:bg-blue-500 text-white rounded-lg'>Edit Product</button></Link>
          </div>
          <div className='flex flex-col items-center opacity-100 w-full'>
            <label className='w-[90%] xl:w-[60%] text-start pl-1 text-[16px] font-bold'>Item Name :</label>
            <input value={name} onChange={(e) => Setname(e.target.value)} className='w-[90%] xl:w-[60%] h-[35px] pl-3 shadow-[0px_1px_17px_11px_rgba(0,_0,_0,_0.1)]
               bg-white mt-2 rounded-md' type='text' name='name' placeholder='Enter Name..' required />
          </div>
          <div className='flex flex-col items-center pt-6 opacity-100 w-full'>
            <label className='w-[90%] xl:w-[60%] text-start pl-1 text-[16px] font-bold'>Description :</label>
            <input value={description} onChange={(e) => Setdescription(e.target.value)} className='w-[90%] xl:w-[60%] h-[35px] pl-3 shadow-[0px_1px_17px_11px_rgba(0,_0,_0,_0.1)]
               bg-white mt-2 rounded-md' type='text' name='description' placeholder='About item..' />
          </div>
          <div className='flex items-center pt-6 opacity-100 w-[90%] xl:w-[60%]'>
            <div className='flex flex-col w-[80%]'>
              <label className='w-[90%] xl:w-[100%] text-start pl-1 text-[16px] font-bold'>category :</label>
              <select onChange={(e) => Setcategory(e.target.value)} value={category} className='w-[95%] xl:w-[95%] h-[35px] pl-3 shadow-[0px_1px_17px_11px_rgba(0,_0,_0,_0.1)]
               bg-white mt-2 rounded-md' name="category" >
                <option value="">select</option>
                <option value="Shake">Shake</option>
                <option value="Chicken">Chicken</option>
                <option value="Beef">Beef</option>
                <option value="Biriyani">Biriyani</option>
              </select>
            </div>
            <div className='flex flex-col w-[90%]'>
              <label className='w-[90%] xl:w-[100%] text-start pl-1 text-[16px] font-bold'>seperation :</label>
              <select onChange={(e) => Setseperation(e.target.value)} value={seperation} className='w-[100%] xl:w-[100%] h-[35px] pl-3 shadow-[0px_1px_17px_11px_rgba(0,_0,_0,_0.1)]
               bg-white mt-2 rounded-md' name="seperation" required>
                <option value="">Select</option>
                <option value="Normal">Normal</option>
                <option value="Special">Special</option>
              </select>
            </div>
          </div>
          <div className='flex flex-col items-center pt-6 opacity-100 w-full'>
            <label className='w-[90%] xl:w-[60%] text-start pl-1 text-[16px] font-bold'>Veg or Non-Veg :</label>
            <select onChange={(e) => Setvegornon(e.target.value)} value={vegornon} className='w-[90%] xl:w-[60%] h-[35px] pl-3 shadow-[0px_1px_17px_11px_rgba(0,_0,_0,_0.1)]
               bg-white mt-2 rounded-md' name="vegornon" required>
              <option value="">select</option>
              <option value="veg">vegeterian</option>
              <option value="non-veg">non vegeterian</option>
            </select>
          </div>
          <div className='flex flex-col items-center pt-6 opacity-100 w-full'>
            <div className='w-[90%] xl:w-[60%]'>
              <label className='w-[90%] xl:w-[60%] text-start pl-1 text-[16px] font-bold'>prize :</label>
            </div>
            {addons.map((a, i) => (
              <div key={i} className='flex flex-wrap w-[90%] xl:w-[60%] items-center justify-between'>
                <input value={a.name} onChange={(e) => handleChange(i, 'name', e.target.value)} name='name' className='w-[40%] xl:w-[46%] h-[35px] pl-3 shadow-[0px_1px_17px_11px_rgba(0,_0,_0,_0.1)] bg-white mt-2 rounded-md' type='text' placeholder='text..' />
                <input value={a.price} onChange={(e) => {
                  const value = e.target.value
                  handleChange(i, 'price', value === '' ? '' : value)
                }} name='price' className='w-[40%] xl:w-[46%] h-[35px] pl-3 shadow-[0px_1px_17px_11px_rgba(0,_0,_0,_0.1)] bg-white mt-2 rounded-md' type='tel' placeholder='prize..' required />
                <button onClick={() => Deleteaddon(i)} className='w-[8%] lg:w-[6%] h-[35px] mt-2 bg-black rounded-md flex items-center justify-center'><MdDelete className='text-red-700' /></button>
              </div>
            ))}
            <div className='w-[90%] lg:w-[60%]'>
              <button type='button' onClick={addAddon} className="bg-blue-600 mt-3 flex items-start justify-start text-white px-8 py-1.5 rounded">+ Add</button>
            </div>
          </div>
          <div className='w-[90%] lg:w-[60%] pt-6 flex justify-start items-start'>
            <input
              type="file"
              onChange={handleImageChange}
              name='image'
              className="block w-full text-sm text-gray-600 bg-gray-200
             file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-white file:text-black
             hover:file:bg-cyan-50"
            />
          </div>
          {selectedImage && (
            <div className='w-[60%] flex items-start justify-start pt-4'>
              <div className="w-[140px] h-[140px] border rounded-sm border-gray-300">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="h-full w-full rounded-sm"
                />
              </div>
            </div>
          )}
          <button className='w-[90%] lg:w-[60%] h-[40px] bg-cyan-950 mt-7 text-white rounded-md hover:bg-black font-semibold'>Submit</button>
        </div>
      </form>
      {loading && (
        <div className='fixed inset-0 bg-black/20 bg-opacity-30 z-50 flex items-center justify-center'>
          <div className='w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
        </div>
      )}
    </div>

  )
}


export default Addproduct