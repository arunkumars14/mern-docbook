import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext'
import {toast} from "react-toastify"
import axios from "axios"
import { Link } from 'react-router-dom';


const AddDoctor = () => {

    const [doctorImg, setDoctorImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const {atoken, backendUrl} = useContext(AdminContext)

    const onSubmitHandler = async (event) =>{
        event.preventDefault()
        try {
            if(!doctorImg){
                return toast.error("Please select a image")
            }
            const formData = new FormData()
            formData.append("image", doctorImg)
            formData.append("name", name)
            formData.append("email", email)
            formData.append("password", password)
            formData.append("experience", experience)
            formData.append("fees", Number(fees))
            formData.append("about", about)
            formData.append("speciality", speciality)
            formData.append("degree", degree)
            formData.append("address", JSON.stringify({line1: address1, line2: address2}))

            const {data} = await axios.post(backendUrl+"/api/admin/add-doctor", formData, {headers: {atoken}})

            if(data?.success){
                toast.success(data?.message)
                setDoctorImg(false)
                setName('')
                setEmail('')
                setPassword('')
                setAddress1('')
                setAddress2('')
                setAbout('')
                setDegree('')
                setFees('')
            }else{
                toast.error(data?.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    return atoken ? (
        <form className='m-5 w-full' onSubmit={onSubmitHandler}>
            <p className="mb-3 text-lg font-medium">Add Doctor</p>

            <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
                <div className="flex items-center gap-4 mb-8 text-gray-500">
                    <label htmlFor="doc-img" className="">
                        <img src={doctorImg ? URL.createObjectURL(doctorImg) : assets.upload_area} alt="" className="w-16 bg-gray-100 rounded-full cursor-pointer" />
                    </label>
                    <input type="file" className="" id='doc-img' hidden onChange={(e)=> setDoctorImg(e.target.files[0])}/>
                    <p className="">Upload doctor <br className="" />picture</p>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600 ">
                    <div className="w-full lg:flex-1 gap-4 flex flex-col ">
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="">Doctor Name</p>
                            <input type="text" placeholder='Name' required className="" onChange={(e)=> setName(e.target.value)} value={name}/>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="">Doctor Email</p>
                            <input type="email" placeholder='Email' required className="border rounded px-3 py-2" onChange={(e)=> setEmail(e.target.value)} value={email}/>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="">Doctor Password</p>
                            <input type="password" placeholder='Password' required className="border rounded px-3 py-2" onChange={(e)=> setPassword(e.target.value)} value={password}/>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="">Experience</p>
                            <select name="" className="border rounded px-3 py-2" onChange={(e)=> setExperience(e.target.value)} value={experience}>
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 Year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                                <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                <option value="10+ Years">10+ Years</option>
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="">Fees</p>
                            <input type="number" placeholder='Fees' required className="border rounded px-3 py-2" onChange={(e)=> setFees(e.target.value)} value={fees}/>
                        </div>
                    </div>

                    <div className="w-full lg:flex-1 flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="">Speciality</p>
                            <select name="" className="border rounded px-3 py-2" onChange={(e)=> setSpeciality(e.target.value)} value={speciality}>
                                <option value="General physician" className="">
                                    General physician
                                </option>
                                <option value="Gynecologist" className="">
                                    Gynecologist
                                </option>
                                <option value="Dermatologist" className="">
                                    Dermatologist
                                </option>
                                <option value="Pediatricians" className="">
                                    Pediatricians
                                </option>
                                <option value="Neurologist" className="">
                                    Neurologist
                                </option>
                                <option value="Gastroenterologist" className="">
                                    Gastroenterologist
                                </option>
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p className="">Education</p>
                            <input type="text" placeholder='Education' required className="border rounded px-3 py-2" onChange={(e)=> setDegree(e.target.value)} value={degree}/>
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p className="">Address</p>
                            <input type="text" className="border rounded px-3 py-2" placeholder='Address 1' required onChange={(e)=> setAddress1(e.target.value)} value={address1}/>
                            <input type="text" className="border rounded px-3 py-2" placeholder='Address 2' required onChange={(e)=> setAddress2(e.target.value)} value={address2}/>
                        </div>
                    </div>
                </div>

                <div className="">
                    <p className="mt-4 mb-2">About</p>
                    <textarea placeholder='Write about doctor' required className="w-full px-4 pt-2 border rounded" rows={5} onChange={(e)=> setAbout(e.target.value)} value={about}/>
                </div>

                <button className="bg-primary px-10 py-3 text-white rounded-full" type="submit">Add Doctor</button>
            </div>

        </form>
    ) : (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-5xl text-red-600">You are not an admin</h1>
            <Link className='underline text-blue-600' to="/doctor-dashboard">Click here to go Dashboard Page</Link>  
        </div>
    )
}

export default AddDoctor