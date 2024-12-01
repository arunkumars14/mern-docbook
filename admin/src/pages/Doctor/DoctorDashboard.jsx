import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
  const { getDashData, dashData, setDashData, dtoken, cancelAppointment, completeAppointment, appointments } = useContext(DoctorContext)

  const { currency, slotDateFormat, } = useContext(AppContext)


  useEffect(() => {
    if (dtoken) {
      getDashData()
    }
  }, [dtoken, appointments])



  return dashData && (
    <div className='m-5'>

      <div className="flex flex-wrap gap-3">

        <div className="flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img src={assets?.earning_icon} alt="" className="w-14" />
          <div className="">
            <p className="text-xl font-semibold text-gray-600">{currency} {dashData?.earnings}</p>
            <p className="text-gray-400">Earnings</p>
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
                <img src={item?.userData?.image} alt="" className="rounded-full w-10" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item?.userData.name}</p>
                  <p className="text-gray-600">{slotDateFormat(item?.slotDate)}</p>
                </div>

                {
                  item?.cancelled && item?.cancelledByAdminOrDcotor === "" ? <p className="text-red-400 text-xs">Cancelled</p> : item?.cancelled && item?.cancelledByAdminOrDcotor !== "" ? <p className='text-red-400 text-xs'>{item?.cancelledByAdminOrDcotor}</p> : item?.isCompleted ? <p className="text-green-500 text-xs font-medium">Completed</p> : <div className="flex">
                    <img onClick={() => cancelAppointment(item?._id)} src={assets.cancel_icon} alt="" className="w-10 cursor-pointer" />
                    <img onClick={() => completeAppointment(item?._id)} src={assets.tick_icon} alt="" className="w-10 cursor-pointer" />
                  </div>
                }

              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard