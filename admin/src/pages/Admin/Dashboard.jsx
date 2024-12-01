import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const {getDashData, dashData, setDashData, atoken, cancelAppointment, appointments} = useContext(AdminContext)

  const {slotDateFormat} = useContext(AppContext)

  useEffect(() => {
    if(atoken){
      getDashData()
    }
  }, [appointments])

  return dashData && (
    <div className='m-5'>
      <div className="flex flex-wrap gap-3">

        <div className="flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img src={assets?.doctor_icon} alt="" className="w-14" />
          <div className="">
            <p className="text-xl font-semibold text-gray-600">{dashData?.doctors}</p>
            <p className="text-gray-400">Doctors</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img src={assets?.appointments_icon} alt="" className="w-14" />
          <div className="">
            <p className="text-xl font-semibold text-gray-600">{dashData?.appointments}</p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img src={assets?.patients_icon} alt="" className="w-14" />
          <div className="">
            <p className="text-xl font-semibold text-gray-600">{dashData?.patients}</p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>

      </div>

      <div className="bg-white">

        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded border">
          <img src={assets?.list_icon} alt="" className="" />
          <p className="font-semibold">Latest Booking</p>
        </div>

        <div className="pt-4 border border-t-0">
          {
            dashData?.latestAppointments?.map((item, index) => (
              <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
                <img src={item?.docData?.image} alt="" className="rounded-full w-10" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item?.docData.name}</p>
                  <p className="text-gray-600">{slotDateFormat(item?.slotDate)}</p>
                </div>

                {item?.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : item?.cancelled && item?.cancelledByAdminOrDcotor === "" ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item?.cancelled && item?.cancelledByAdminOrDcotor !== "" ? <p className='text-red-400 text-xs font-medium'>Cancelled by admin or doctor</p> : <img src={assets?.cancel_icon} alt="" className="w-10 cursor-pointer" onClick={() =>cancelAppointment(item?._id)}/>}

              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Dashboard