'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import logo from '../../public/logo/logo.jpeg'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import { FaBars } from "react-icons/fa6";
import {useCart} from '../../components/context/Cartcontext'

function Navbar({ id, proId}) {

  const path = usePathname()
  const number = id
  const [sidebarvisible, Setsidebarvisible] = useState(false)
  const { cartValue  } = useCart()

  const showSidebar = ()=>{
    Setsidebarvisible(!sidebarvisible)
  }

  return (
    <>
    <div className={`flex justify-between w-full h-[60px] sm:h-[80px] items-center sm:px-10 opacity-100 ${path === `/frontpage/${number}` ? 'bg-black/92' : 'bg-black'}`}>
       <div className='flex items-center  text-amber-200 text-[19px]'>
        <Image  className='sm:w-[70px] w-[50px] sm:h-[60px] h-[45px] rounded-3xl' src={logo} alt='logo' />
        <Link href='/frontpage' className='sm:pl-2 max-sm:text-[14px] font-bold font-sans'>Highway castle</Link>
       </div>
       <div className={`${sidebarvisible ? 'max-sm:flex-col' : 'max-sm:hidden'} max-sm:top-0 max-sm:right-0 max-sm:w-[200px] max-sm:h-[100vh] max-sm:z-999 max-sm:shadow-2xl max-sm:fixed max-sm:bg-black  max-sm:text-white`}>
        <ul className='max-sm:flex max-sm:flex-col max-sm:gap-6 max-sm:p-3 sm:gap-7 flex font-sans font-semibold max-sm:pr-2 text-[12px] sm:text-[16px] text-amber-50 max-sm:absolute max-sm:top-0'>
            <FaBars className='text-white sm:hidden w-[30px] h-[25px] pr-3' onClick={showSidebar} />
            
            <Link href={`/frontpage/${number}`}><li className={`transition delay-150 duration-300 ease-in-out hover:-translate-y-1 max-sm:hover:scale-90
             hover:scale-110 hover:text-amber-300 ${path === `/frontpage/${number}` ? 'text-amber-300 font-bold' : ''} `}>Home</li></Link>

            <Link href={`/about/${number}`}><li className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 max-sm:hover:scale-90 hover:scale-110 hover:text-amber-300'>About</li>
            </Link>
           
            {
              path === `/pages/${number}` || path === `/history/historymain/${number}` || path === `/pages/showpage/${number}` || path === `/pages/editpage/${proId}/${number}` || path === `/history/viewpage/${proId}/${number}` || path === `/about/${number}`  ? ''  :
            <div className={`${path === `/cart/${number}` ? 'hidden' : 'flex justify-around'}`}>
            <Link href={`/cart/${number}`} className={`transition delay-150 duration-300 ease-in-out hover:-translate-y-1 max-sm:hover:scale-90 hover:scale-110
             ${path === `/cart/${number}` ? 'hidden' : ''}  hover:text-amber-300`}>Cart</Link>
              <p className={`${path === `/cart/${number}` ? 'hidden' : 'ml-1 mt-[-1] w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] rounded-4xl text-[14px] bg-amber-600 flex justify-center items-center'} `}>{cartValue ? cartValue : 0}</p>         
             </div>           
              }
           
           {
            path === `/pages/${number}` ? <Link href={`/pages/showpage/${number}`}><li className={`transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 max-sm:hover:scale-90
             hover:text-amber-300 ${path === '/pages/add-product' ? 'text-amber-300 font-bold' : ''}`}>Edit product</li></Link> : ''
           }
              {
                path === `/pages/${number}` ? '' :
            <Link href={`/pages/${number}`}><li className={`transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 max-sm:hover:scale-90
             hover:text-amber-300 ${path === '/pages/add-product' ? 'text-amber-300 font-bold' : ''}`}>Add product</li></Link>
            }
            
        </ul>
       </div>
       <div className={`${sidebarvisible ? 'max-sm:hidden' : 'max-sm:flex-col'} sm:hidden`}>
      <FaBars className='text-white w-[30px] h-[25px] pr-3' onClick={showSidebar} />
      </div>
    </div>
    </>
  )
}

export default Navbar