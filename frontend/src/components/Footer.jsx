import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

            <div className="">
                <img src={assets.logo} alt="" className="mb-5 w-40" />
                <p className="w-full md:w-2/3 text-gray-600 leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ut incidunt ducimus numquam similique qui. Corporis, eligendi itaque et magni reprehenderit amet dicta eveniet dolor!</p>
            </div>

            <div className="">
                <p className="text-xl font-medium mb-5">
                    COMPANY
                </p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li className="">Home</li>
                    <li className="">About Us</li>
                    <li className="">Contact Us</li>
                    <li className="">Privacy policy</li>
                </ul>
            </div>

            <div className="">
                <p className="text-xl font-medium mb-5">Get in touch</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li className="">573828299</li>
                    <li className="">abcdefgh@gmail.com</li>
                </ul>
            </div>

        </div>

        <div className="">
            <hr className="" />
            <p className="py-5 text-sm text-center">Copyright 2024. All right reserved</p>
        </div>

    </div>
  )
}

export default Footer