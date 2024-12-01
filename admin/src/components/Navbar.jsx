import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from "react-router-dom"
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
    const { atoken, setAtoken } = useContext(AdminContext)
    const { dtoken, setDToken } = useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = () => {
        if(atoken){
            localStorage.removeItem("aToken")
            setAtoken("")
            navigate("/")
        }else{
            localStorage.removeItem("dToken")
            setDToken("")
            navigate("/") 
        }
    }
    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className="flex items-center gap-2 text-xs">
                <img src={assets.admin_logo} alt="" className="w-36 sm:w-40 cursor-pointer" />
                <p className="border px-2 py-0.5 rounded-full border-gray-500 text-gray-600">{atoken ? "Admin" : "Doctor"}</p>
            </div>
            <button className="bg-primary text-white text-sm px-10 py-2 rounded-full" onClick={logout}>Logout</button>
        </div>
    )
}

export default Navbar