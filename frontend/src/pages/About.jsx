import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div className=''>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p className="">About <span className="text-gray-700 font-medium">Us</span></p>

      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img src={assets.about_image} alt="" className="w-full md:max-w-[360px]" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi molestiae officia aspernatur, pariatur adipisci numquam explicabo porro eius officiis quos similique nihil? Eaque ut minima voluptatem nobis harum laborum blanditiis qui vitae ab a. At, quos veniam pariatur quasi, facilis porro quo error ipsam animi modi odit unde laudantium dolor.</p>

          <p className="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident tenetur voluptas nemo nesciunt aut, fugit quam quaerat sint ab necessitatibus omnis exercitationem placeat, molestias praesentium corrupti accusamus facere atque. Repellendus labore eius error voluptatem illo.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita labore necessitatibus et ducimus autem aliquam itaque blanditiis doloremque provident velit eius rerum veritatis, nemo voluptate!</p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p className=''>Why <span className="text-gray-700 font-semibold">choose us</span> </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 sm:py-16 py-8 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b className="">Efficiency:</b>
          <p className="">Streamlined Appointmnet scheduling that fits into your busy lifestyle</p>
        </div>
        <div className="border px-10 md:px-16 sm:py-16 py-8 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b className="">Convenience</b>
          <p className="">Access to a network of trusted healthcare professionals in your area</p>
        </div>
        <div className="border px-10 md:px-16 sm:py-16 py-8 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b className="">Personalization</b>
          <p className="">Tailored recommendations and reminders to help you stay on top of your health</p>
        </div>
      </div>

    </div>
  )
}

export default About