import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [atoken, setAtoken] = useState(localStorage.getItem("aToken") || "")
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState([])
    const [date, setDate] = useState("")
    const [odate, setODate] = useState("")


    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {

            const { data } = await axios.post(backendUrl + "/api/admin/all-doctors", {}, { headers: { atoken } })
            if (data?.success) {
                setDoctors(data?.doctors)

            } else {
                toast.error(data?.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const changeAvailabilty = async (docId) => {
        try {

            const { data } = await axios.post(backendUrl + "/api/admin/change-availabilty", { docId }, { headers: { atoken } })

            if (data?.success) {
                toast.success(data?.message)
                getAllDoctors()
            } else {
                toast.error(data?.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const getAllApppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/admin/appointments", { headers: { atoken } })
            if (data?.success) {
                setAppointments(data?.appointments.reverse())
            } else {
                toast.error(data?.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const getAppointmentByDate = async () => {
        try {
            const { data } = await axios.post(backendUrl + "/api/admin/appointment-by-date", { date }, { headers: { atoken } })

            if (data?.success) {
                setAppointments(data?.appointments.reverse())
            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { atoken } })
            if (data?.success) {
                toast.success(data.message)
                date === "" ? getAllApppointments() : getAppointmentByDate()
            } else {
                toast.error(data?.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { atoken } })

            if (data?.success) {
                setDashData(data?.dashData)
            } else {
                toast.error(data?.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }



    const value = { atoken, setAtoken, backendUrl, getAllDoctors, doctors, changeAvailabilty, getAllApppointments, appointments, setAppointments, cancelAppointment, getDashData, dashData, setDashData, date, setDate, odate, setODate, getAppointmentByDate }


    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider