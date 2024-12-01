import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {

  const { getProfleData, profileData, setProfileData, backendUrl, dtoken } = useContext(DoctorContext)

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {

      const updateData = {
        address: profileData?.address,
        fees: profileData?.fees,
        available: profileData?.available
      }

      const {data} = await axios.post(backendUrl+"/api/doctor/update-profile", updateData, {headers: {dtoken}})

      if(data?.success){
        toast.success(data?.message)
        setIsEdit(false)
        getProfleData()
      }else{
        toast.error(data?.message)
      }
      
    } catch (error) {
      toast.error(error?.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dtoken) {
      getProfleData()
    }

  }, [dtoken])


  return profileData && (
    <div>

      <div className="flex flex-col gap-4 m-5">

        <div className="">
          <img src={profileData?.image} alt="" className="bg-primary/80 w-full sm:max-w-64 rounded-lg" />
        </div>

        <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{profileData?.name}</p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p className="">{profileData?.degree} - {profileData?.speciality}</p>
            <button className='py-0.5 border text-xs rounded-full'>{profileData?.experience}</button>
          </div>

          <div className="">
            <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">About: </p>
            <p className="text-sm text-gray-600 mt-1 max-w-[700px]">{profileData?.about}</p>
          </div>

          <p className="text-gray-600 font-medium mt-4">Appointment Fee: <span className="text-gray-800">{currency} {isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} className="" value={profileData?.fees} /> : profileData?.fees}</span></p>

          <div className="flex gap-2 py-2">
            <p className="">Address:</p>
            <p className="text-sm">
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} className="" value={profileData?.address?.line1} /> : profileData?.address.line1}
              <br className="" />
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} className="" value={profileData?.address?.line2} /> : profileData?.address.line2}
            </p>
          </div>

          <div className="flex gap-1 pt-2">
            <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData?.available} type="checkbox" className="" id='available'/>
            <label htmlFor="available" className="">Available</label>
          </div>

          {
            isEdit ? <button onClick={updateProfile} className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:text-white hover:bg-primary transition-all">Save</button> : <button onClick={() => setIsEdit(true)} className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:text-white hover:bg-primary transition-all">Edit</button>
          }



        </div>

      </div>

    </div>
  )
}

export default DoctorProfile