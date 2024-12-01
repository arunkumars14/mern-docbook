import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Loader } from "lucide-react"

const MyAppointments = () => {
  const { token, backendUrl, getDoctorsData} = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  const [approvalUrl, setApprovalUrl] = useState('')
  const [isPayment, setIsPayment] = useState(false)

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_")
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + ", " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data?.success) {
        setAppointments(data?.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data?.success) {
        toast.success(data?.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const appointmentPaypalpay = async (appointmentId) => {
    try {
      setIsPayment(true)
      const {data} = await axios.post(backendUrl+ "/api/user/create-payment", {appointmentId}, {headers: {token}})

      if(data?.success){
        sessionStorage.setItem("appointmentId", JSON.stringify(appointmentId))
        setApprovalUrl(data?.approvalUrl)
        setIsPayment(false)
      }else{
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  if(approvalUrl !== ""){
    window.location.href = approvalUrl
}

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>
      <div className="">
        {
          appointments.map((item, index) => (
            <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
              <div className="">
                <img src={item?.docData?.image} alt="" className="w-32 bg-indigo-50" />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item?.docData?.name}</p>
                <p className="">{item?.docData?.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item?.docData.address?.line1}</p>
                <p className="text-xs">{item?.docData?.address?.line2}</p>
                <p className="text-sm mt-1"><span className="text-sm text-neutral-700 font-medium">Date & Time:</span> {item?.slotDate && slotDateFormat(item?.slotDate)} | {item?.slotTime}</p>
              </div>

              <div className=""></div>

              <div className={`${item?.cancelledByAdminOrDcotor === "" ? "flex flex-col gap-2 justify-end" : "sm:w-[190px] flex items-center"}`}>
                {!item.cancelled && item.payment && !item?.isCompleted &&  <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}

                {!item.cancelled && !item.payment && !item?.isCompleted && <button className="flex items-center justify-center text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300" onClick={()=> appointmentPaypalpay(item?._id)}>{isPayment ? <Loader className='animate-spin'/> : "Pay Online"}</button>}

                {!item.cancelled && !item?.isCompleted && <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300" onClick={() => cancelAppointment(item?._id)}>Cancel Appointment</button>}

                { item.cancelled && !item?.isCompleted && item?.cancelledByAdminOrDcotor === "" && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}

                {item?.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}

                {!item?.isCompleted && item?.cancelled && item?.cancelledByAdminOrDcotor !== "" && <p className='text-red-400 text-xs font-medium border border-red-500 p-1 rounded'>Appointment has been canceled by the doctor or admin. If the fees were paid, a refund will be issued</p>}

              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments