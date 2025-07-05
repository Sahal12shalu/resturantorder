'use client'

import React, { use, useEffect, useState } from 'react'
import Navbar from '../../../../components/Navbar/Navbar'
import Image from 'next/image'
import background from '../../../../public/logo/background1.jpg'
import axios from 'axios'
import { IoIosRadioButtonOn } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import Popup from '../../../../components/popup/Popup'
import { ToastContainer, toast } from 'react-toastify';
import { FaSearch } from "react-icons/fa";
import Link from 'next/link'
import { useCart } from '../../../../components/context/Cartcontext'

function Menu({ params }) {

  const { menu } = use(params)
  const id = menu ;

  const [special, Setspecial] = useState([])
  const [filterspecial, Setfilterspecial] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [vegornon, Setvegornon] = useState([])
  const [categorytitle, Setcategorytitle] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [productid, Setproductid] = useState('')
  const [activebutton, Setactivebutton] = useState('all')
  const [pageid, Setpageid] = useState('')
  const [opendown, Setopendown] = useState(false)
  const { cartValue } = useCart()
  const [search,Setsearch] = useState('')

  const searchproduct = filterspecial.filter(product =>
  product.name.toLowerCase().includes(search.toLowerCase())
  )

  const searchfiltered = filteredProducts.filter(product =>
  product.name.toLowerCase().includes(search.toLowerCase())
  ) 


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

  useEffect(() => {
    axios.get('/api/productdeails')
      .then((res) => {
        const all = res.data.product
        setAllProducts(all)
        const Normal = all.filter(item => item.seperation === 'Normal')
        setFilteredProducts(Normal)
        const Special = all.filter(item => item.seperation === 'Special')
        Setfilterspecial(Special)
      })
  }, [])

  const filterProducts = (category) => {
    if (category === 'All') {
      Setvegornon('')
      const Normal = allProducts.filter(item => item.seperation === 'Normal')
      const Special = allProducts.filter(item => item.seperation === 'Special')
      setFilteredProducts(Normal);
      Setfilterspecial(Special)
    } else if (category === 'veg' || category === 'non-veg') {
      const filtered = allProducts.filter(item => item.vegornon === category);
      Setvegornon(filtered);
      const title = category === 'veg' ? 'VEG ITEMS' : 'NON-VEG ITEMS'
      Setcategorytitle(title)
    } else {
      Setvegornon('')
      const filtered = allProducts.filter(item => item.category === category);
      const specials = special.filter(item => item.category === category)
      setFilteredProducts(filtered);
      Setfilterspecial(specials)
    }
  };

  const showToast = () => {
    toast("Products Added to Cart")
  }

  return (
    <div className='bg-white'>
      <Navbar id={id} />
      <div className='bg-amber-200'>
        <div className='w-full h-[500px] relative'>
          <Image className='absolute top-0 w-full h-full' src={background} alt='' />
          <div className='absolute left-0 w-full h-[500px] top-0 bg-black opacity-30'></div>
          <div className='absolute w-full lg:w-[750px] h-full lg:h-[500px] text-white flex flex-col justify-center px-[40px] sm:px-[80px]'>
            <h1 className='text-[32px] font-sans font-semibold'>Delicious Recepies</h1>
            <p className='pt-5 text-[12px] font-light'>Food is the key element for every human being for the survival on the earth but not every food is that much tasty or applicable for all ages of people. Besides, preparation of the foods is also another issue for consideration. In my city, Mumbai, I have a favourite restaurant that offers different types of prepared food.</p>
            <button className='flex justify-center items-center mt-4 font-semibold bg-orange-600 w-[150px] h-[40px] rounded-md 
         transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:font-semibold'>Book a Table</button>
          </div>
        </div>
      </div>


      {
        opendown ?
          <div className='fixed z-50 flex flex-wrap shadow-[0px_2px_35px_12px_rgba(0,_0,_0,_0.1)] justify-center items-center text-center
       bottom-1 lg:w-[60%] 2xl:w-[60%] w-[90%] h-[50px] rounded-4xl lg:mx-[290px] 2xl:mx-[350px] mx-6 bg-white'>
            <div className='w-[33%] h-[100%] hover:bg-gray-300 rounded-4xl flex justify-center items-center gap-0.5' >
              <div><IoMdHome className='text-black' /></div>
              <div className='pt-0.5 font-semibold text-black'>Home</div>
            </div>
            <Link href={`/cart/${id}`} className='w-[33%] h-[100%] hover:bg-gray-300 rounded-4xl flex justify-center items-center gap-0.5'>
              <div><FaCartShopping className='text-black' /></div>
              <div className='pt-0.5 font-semibold text-black'>Cart</div>
              <p className='ml-1 mt-[-1] w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] rounded-4xl text-[14px] text-white font-semibold bg-amber-600 flex justify-center items-center'>{cartValue ? cartValue : 0}</p>
            </Link>
            <Link href={`/history/historymain/${id}`} className='w-[34%] h-[100%] hover:bg-gray-300 rounded-4xl flex justify-center items-center gap-0.5' >
              <div><FaBook className='text-black' /></div>
              <div className=' font-semibold text-black'>History</div>
            </Link>
          </div> : ''
      }


      <div className='xl:mx-[220px]'>
        <ToastContainer className='w-[400px] h-[70px]' />
        <div className='flex gap-2 sm:gap-7 justify-start xl:justify-center items-start overflow-scroll md:overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
       text-white mt-[40px] pb-[15px] mb-[15px] pl-2 shadow-[0px_5px_4px_0px_rgba(0,_0,_0,_0.1)] '>
          <button onClick={() => { filterProducts('All'), Setactivebutton('all') }} className={`hover:scale-105 duration-300 px-[45px] justify-items-start 
          whitespace-nowrap w-auto h-[35px] ${activebutton === 'all' ? 'bg-amber-800' : 'bg-orange-600'} flex items-center justify-center rounded-3xl font-sans font-medium`}>
            All Items
          </button>
          <button onClick={() => { filterProducts('veg'), Setactivebutton('veg') }} className={`hover:scale-105 duration-300 px-[45px] w-auto h-[35px] 
          ${activebutton === 'veg' ? 'bg-amber-800' : 'bg-orange-600'} flex flex-wrap items-center justify-center rounded-3xl font-sans font-medium`}>
            Veg
          </button>
          <button onClick={() => { filterProducts('non-veg'), Setactivebutton('non-veg') }} className={`hover:scale-105 duration-300 px-[45px] 
          whitespace-nowrap w-auto h-[35px] ${activebutton === 'non-veg' ? 'bg-amber-800' : 'bg-orange-600'} flex items-center justify-center rounded-3xl font-sans font-medium`}>
            Non-veg
          </button>
          <button onClick={() => { filterProducts('Biriyani'), Setactivebutton('Biriyani') }} className={`hover:scale-105 duration-300 px-[45px] 
          w-auto h-[35px] ${activebutton === 'Biriyani' ? 'bg-amber-800' : 'bg-orange-600'} flex flex-wrap items-center justify-center rounded-3xl font-sans font-medium`}>
            Biriyani
          </button>
          <button onClick={() => { filterProducts('Chicken'), Setactivebutton('Chicken') }} className={`hover:scale-105 duration-300 px-[45px] 
          w-auto h-[35px] ${activebutton === 'Chicken' ? 'bg-amber-800' : 'bg-orange-600'} flex flex-wrap items-center justify-center rounded-3xl font-sans font-medium`}>
            Chicken
          </button>
          <button onClick={() => { filterProducts('Shake'), Setactivebutton('Shake') }} className={`hover:scale-105 duration-300 px-[45px] w-auto h-[35px] 
          ${activebutton === 'Shake' ? 'bg-amber-800' : 'bg-orange-600'} flex flex-wrap items-center justify-center rounded-3xl font-sans font-medium`}>
            Shakes
          </button>
        </div>
        <div className='flex justify-between items-center rounded-4xl shadow-[0px_2px_11px_9px_rgba(0,_0,_0,_0.1)] mt-4 max-lg:w-[98%] h-[40px] relative'>
          <input value={search} onChange={(e)=> Setsearch(e.target.value)}
           className='rounded-4xl w-full h-full pl-3' type='text' placeholder='Search food ' />
          <button className='pr-2 absolute right-0'><FaSearch /></button>
        </div>
        
        
        {
          vegornon.length === 0 ?
            <div className='flex flex-col'>
              {
                searchproduct.length === 0 ? '' :

                  <div>
                    {
                  search ? '' :
                    <h1 className='text-[24px] font-sans max-xl:pl-3 font-semibold max-md:pl-2 pt-2 text-black'>TODAY SPECIALS -</h1>
                    }
                    <div className='flex flex-wrap justify-center items-center gap-2 xl:gap-12  my-2'>
                      {
                        searchproduct.map((data, index) => (
                          <div key={index} className='h-auto hover:scale-105 duration-500 w-[190px] xl:w-[230px] pb-3.5 text-black gap-2 rounded-tl-xl rounded-tr-xlrounded-tl-xl rounded-tr-xl
                           shadow-[-1px_1px_7px_8px_rgba(0,_0,_0,_0.1)] flex flex-col items-center relative'>

                            <img src={data.image} style={{ width: '100%', height: '170px', objectFit: 'fill' }} className='rounded-t-xl' alt='none' />
                            <div className='flex flex-wrap items-center justify-center text-[14px] xl:text-[18px] font-serif font-semibold'>
                              {data.name}
                              <IoIosRadioButtonOn className={`${data.vegornon === 'veg' ? 'text-green-500' : 'text-red-500'} ml-3 text-md`} />
                            </div>
                            <p className='text-[11px] xl:text-[13px] h-[40px] w-[90%] text-center font-medium'>{data.description}</p>
                            {data.addons.map((value, index) => (
                              <div key={index}>
                                <p className='text-[14px] mt-[-5px] font-semibold'>
                                  {value.name ? `₹${value.price}` : `₹ ${value.price}`}</p></div>
                            ))}
                            <button onClick={() => { setIsPopupOpen(true), Setproductid(data._id), Setpageid(params.value.menu) }} className='w-[70%] h-[28px] xl:h-[35px] bottom-2 max-xl:text-[12px] max-xl:font-semibold text-white bg-orange-500 rounded-2xl font-semibold'>Add Product</button>
                          </div>
                        ))
                      }

                    </div>
                  </div>
              }

              <div>
                 {
                  search ? '' :
                <h1 className='text-[24px] max-xl:pl-3 font-sans font-semibold pt-3 pl-1 text-black'>TASTE OUR FOOD :</h1>
                 }
                <div className='flex flex-wrap justify-center items-center xl:gap-12 gap-2 my-2'>
                  {
                    searchfiltered.map((value, index) => (
                      <div key={index} className='h-auto w-[190px] xl:w-[230px] duration-500 pb-3.5 mb-10 text-black gap-4 hover:scale-105 rounded-tl-xl rounded-tr-xlrounded-tl-xl rounded-tr-xl shadow-[-1px_1px_7px_8px_rgba(0,_0,_0,_0.1)]
                      flex flex-col items-center relative'>
                        <img src={value.image} alt='none' className='rounded-tl-xl rounded-tr-xl w-[100%] h-[170px] object-fill' />
                        <div className='flex flex-wrap items-center justify-center text-[14px] xl:text-[18px] font-serif font-semibold'>
                          {value.name}
                          <IoIosRadioButtonOn className={`${value.vegornon === 'veg' ? 'text-green-500' : 'text-red-500'} ml-3 text-md`} />
                        </div>
                        <p className='text-[13px] mt-[-15px] w-[90%] h-[40px] text-center font-medium'>{value.description}</p>
                        <div className='flex flex-wrap gap-3 w-full justify-center'>
                          {value.addons.map((value, index) => (
                            <div key={index}>
                              <p className='text-[14px] mt-[-5px] font-semibold'>
                                {value.name ? `₹ ${value.price}` : `₹ ${value.price}`}</p></div>
                          ))}
                        </div>
                        <button onClick={() => { setIsPopupOpen(true), Setproductid(value._id), Setpageid(params.value.menu) }} className='w-[70%] h-[28px] xl:h-[35px] bottom-2 max-xl:text-[12px] max-xl:font-semibold text-white bg-orange-500 rounded-2xl font-semibold'>Add Product</button>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            :

            <div>
              <h1 className='text-[24px] font-sans font-semibold pt-3 max-xl:pl-3 pl-1 text-black'>{categorytitle}</h1>
              <div className='flex flex-wrap justify-center items-center xl:gap-12 gap-2 my-2'>
                {
                  vegornon.map((value, index) => (
                    <div key={index} className='h-auto w-[190px] xl:w-[230px] pb-3.5 mb-10 text-black gap-4 hover:scale-105 duration-500 rounded-tl-xl rounded-tr-xlrounded-tl-xl rounded-tr-xl shadow-[-1px_1px_7px_8px_rgba(0,_0,_0,_0.1)]
                      flex flex-col items-center relative'>
                      <img src={value.image} alt='none' className='rounded-tl-xl rounded-tr-xl w-[100%] h-[170px] object-fill' />
                      <div className='flex flex-wrap items-center justify-center text-[14px] xl:text-[18px] font-serif font-semibold'>
                        {value.name}
                        <IoIosRadioButtonOn className={`${value.vegornon === 'veg' ? 'text-green-500' : 'text-red-500'} ml-3 text-md`} />
                      </div>
                      <p className='text-[13px] mt-[-15px] w-[90%] h-[40px] text-center font-medium'>{value.description}</p>
                      <div className='flex flex-wrap gap-3 w-full justify-center'>
                        {value.addons.map((value, index) => (
                          <div key={index}>
                            <p className='text-[14px] mt-[-5px] font-semibold'>
                              {value.name ? `₹${value.price}` : `₹ ${value.price}`}</p></div>
                        ))}
                      </div>
                      <button onClick={() => { setIsPopupOpen(true), Setproductid(value._id), Setpageid(params.value.menu) }} className='w-[70%] h-[28px] xl:h-[35px] bottom-2 max-xl:text-[12px] max-xl:font-semibold text-white bg-orange-500 rounded-2xl font-semibold'>Add Product</button>
                    </div>
                  ))
                }
              </div>
            </div>
        }
        
        <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} id={productid} onSuccess={showToast} pageId={pageid} />
      </div>
    </div>
  )
}

export default Menu