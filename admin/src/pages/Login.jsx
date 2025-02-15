import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets_admin/assets.js"
import { AdminContext } from '../context/AdminContext.jsx'
import axios from "axios"
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext.jsx'


const Login = () => {

    const {setAtoken, backendUrl} = useContext(AdminContext)

    const {dtoken, setDToken} = useContext(DoctorContext)

    const [state, setState] = useState("Admin")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            if(state === "Admin"){
                const {data} = await axios.post(backendUrl+'/api/admin/login', {email, password})
                if(data?.success){
                    localStorage.setItem("aToken", data.token)
                    setAtoken(data?.token)
                }else{
                    toast.error(data?.message)
                }
            }else{
                const {data} = await axios.post(backendUrl+"/api/doctor/login", {email, password})
                if(data?.success){
                    localStorage.setItem("dToken", data.token)
                    setDToken(data?.token)
                    
                }else{
                    toast.error(data?.message)
                }
            }
        } catch (error) {
            
        }
    }


    return (
        <form action="" className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96  border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
                <p className="text-2xl font-semibold m-auto">
                    <span className="text-primary">{state}</span> Login
                </p>
                <div className="w-full">
                    <p className="">Email</p>
                    <input onChange={(e)=> setEmail(e.target.value)} type="email" required className='border border-[#DADADA] rounded w-full p-2 mt-1' value={email}/>
                </div>
                <div className="w-full">
                    <p className="">Password</p>
                    <input onChange={(e)=> setPassword(e.target.value)}  type="password" required className='border border-[#DADADA] rounded w-full p-2 mt-1' value={password}/>
                </div>
                <button className="bg-primary text-white w-full py-2 rounded-md text-base">Login</button>
                {
                    state === "Admin" ? <p className="">Doctor Login ? <span className="text-primary underline cursor-pointer" onClick={()=> setState("Doctor")}>Click here</span></p> : <p className="">
                        Admin Login ? <span className="text-primary underline cursor-pointer" onClick={()=> setState("Admin")}>Click here</span>
                    </p>
                }
            </div>

        </form>
    )
}

export default Login