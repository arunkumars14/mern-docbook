import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className=''>

      <div className="text-center text-2xl pt-10 text-gray-500">
        <p className="">Contact <span className="text-gray-700 font-semibold">Us</span> </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img src={assets.contact_image} alt="" className="w-full md:max-w-[360px]" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">Our Office</p>
          <p className="text-gray-500">54709 Lorem ipsum <br/> dolor sit amet consectetur.</p>
          <p className="text-gray-500">Tel: (42) 345-678 <br /> Email: abcdefgh@gmail.com</p>
          <p className="font-semibold text-lg text-gray-600">Careers at Prescripto</p>
          <p className="text-gray-500">Learn about our teams and job openings.</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black  hover:text-white transition-all duration-500">Explore Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact