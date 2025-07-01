'use client'

import { useState, createContext, useContext, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios';

const CartContext = createContext();

export const Cartprovider = ({ children }) => {
    const [cartValue, SetcartValue] = useState(0)
    const pathname = usePathname()

    useEffect(() => {
        const parts = pathname.split('/')
        const pageId = parts[2]
        axios.post(`http://localhost:3001/getcartproductbyId/${pageId}`)
            .then((res) => {
                if (res.data.length === 0) {
                    SetcartValue(0)
                } else {
                    SetcartValue(res.data[0].items.length)
                }
            })
    }, [pathname])


    return (
        <CartContext.Provider value={{ cartValue, SetcartValue }}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => useContext(CartContext)