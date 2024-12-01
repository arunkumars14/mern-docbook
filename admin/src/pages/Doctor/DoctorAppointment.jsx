import React from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const DoctorAppointment = () => {
    const { appointments, setAppointments, getAppointments, dtoken, cancelAppointment, completeAppointment, docdate, setDocDate, oDocdate, setODocDate, getAppointmentByDateForDoctor} = useContext(DoctorContext)

    const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

    const formatDate = (event) => {
        const originalDate = event.target.value
        setODocDate(originalDate)
        if (originalDate === "") {
            setDocDate("")
            return;
        } else {
            const stringDate = new Date(originalDate)
            const day = stringDate.getDate()
            const month = stringDate.getMonth() + 1
            const year = stringDate.getFullYear()

            setDocDate(`${day}_${month}_${year}`)
        }

    }

    console.log(oDocdate)
    console.log(docdate)

    useEffect(() => {
        if (dtoken && docdate === "") {
            getAppointments()
        }
    }, [dtoken, docdate])

    useEffect(() => {
        if (dtoken && docdate !== "") {
            getAppointmentByDateForDoctor()
        }
    }, [dtoken, docdate])

    return (
        <div className='w-full max-w-6xl m-5'>
            <div className="flex justify-between mb-2">
                <p className="mb-3 text-lg font-medium">All Appointments</p>
                <input type="date" className="p-2 shadow-md rounded-md" onChange={formatDate} value={oDocdate} id='datepicker' />
            </div>

            <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[50vh]">

                <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
                    <p className="">#</p>
                    <p className="">Patient</p>
                    <p className="">Payment</p>
                    <p className="">Age</p>
                    <p className="">Date & Time</p>
                    <p className="">Fees</p>
                    <p className="">Action</p>
                </div>

                {
                    appointments.map((item, index) => (
                        <div className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50" key={index}>
                            <p className="max-sm:hidden">{index + 1}</p>
                            <div className="flex items-center gap-2">
                                <img src={item?.userData?.image} alt="" className="w-8 rounded-full" />
                                <p className="">{item?.userData?.name}</p>
                            </div>
                            <div className="">
                                <p className="text-xs inline border border-primary px-2 rounded-full">{item?.payment ? "Online" : "Cash"}</p>
                            </div>
                            <p className="max-sm:hidden">{calculateAge(item?.userData?.dob)}</p>

                            <p className="">{slotDateFormat(item?.slotDate)} | {item?.slotTime}</p>

                            <p className="">{currency} {item?.amount}</p>

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
    )
}

export default DoctorAppointment