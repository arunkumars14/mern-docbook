import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'
import { useState } from 'react'

const AllAppointments = () => {
  const { getAllApppointments, appointments, setAppointments, atoken, cancelAppointment, date, setDate, odate, setODate, getAppointmentByDate } = useContext(AdminContext)

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  const formatDate = (event) => {
    const originalDate = event.target.value
    setODate(originalDate)
    if (originalDate === "") {
      setDate("")
      return;
    } else {
      const stringDate = new Date(originalDate)
      const day = stringDate.getDate()
      const month = stringDate.getMonth() + 1
      const year = stringDate.getFullYear()

      setDate(`${day}_${month}_${year}`)
    }

  }

  const handleLabelClick = () => {
    const dateInput = document.getElementById("datepicker");
    dateInput.click();
  };

  useEffect(() => {
    if (atoken && date === "") {
      getAllApppointments()
    }
  }, [atoken, date])

  useEffect(() => {
    if (atoken && date !== "") {
      getAppointmentByDate()
    }
  }, [atoken, date])


  return (
    <div className='w-full max-w-6xl m-5'>

      <div className="flex justify-between mb-2">
        <p className="mb-3 text-lg font-medium">All Appointments</p>
        <input type="date" className="p-2 shadow-md rounded-md" onChange={formatDate} value={odate} id='datepicker' />
      </div>

      <div className="bg-white rounded border text-sm max-h-[80vh] overflow-y-auto min-h-[60vh]">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p className="">#</p>
          <p className="">Patient</p>
          <p className="">Age</p>
          <p className="">Date & Time</p>
          <p className="">Doctor</p>
          <p className="">Fees</p>
          <p className="">Actions</p>
        </div>
        {
          appointments?.map((item, index) => (
            <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50" key={index}>
              <p className="max-sm:hidden">{index + 1}</p>

              <div className="flex items-center gap-2">
                <img src={item?.userData?.image} alt="" className="w-8 rounded-full" />
                <p className="">{item?.userData?.name}</p>
              </div>

              <p className="max-sm:hidden">{calculateAge(item?.userData?.dob)}</p>
              <p className="">{slotDateFormat(item?.slotDate)}, {item?.slotTime}</p>

              <div className="flex items-center gap-2">
                <img src={item?.docData?.image} alt="" className="w-8 rounded-full bg-gray-200" />
                <p className="">{item?.docData?.name}</p>
              </div>

              <p className="">{currency} {item?.amount}</p>

              {item?.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : item?.cancelled && item?.cancelledByAdminOrDcotor === "" ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item?.cancelled && item?.cancelledByAdminOrDcotor !== "" ? <p className='text-red-400 text-xs font-medium'>Cancelled by admin or doctor</p> : <img src={assets?.cancel_icon} alt="" className="w-10 cursor-pointer" onClick={() => cancelAppointment(item?._id)} />}

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default AllAppointments