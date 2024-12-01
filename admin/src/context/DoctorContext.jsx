import { useState } from "react";
import { createContext } from "react";
import axios from "axios"
import {toast} from "react-toastify"

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dtoken, setDToken] = useState(localStorage.getItem("dToken") || "")
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)
    const [docdate, setDocDate] = useState("")
    const [oDocdate, setODocDate] = useState("")

    const getAppointments = async() => {
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/appointments', {headers: {dtoken}})
            if(data?.success){
                setAppointments(data?.appointments.reverse())
            }else{
               toast.error(data?.message) 
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.message)
        }
    }

    const getAppointmentByDateForDoctor = async() => {
        try {
            const {data} = await axios.post(backendUrl+'/api/doctor/appointment-by-date', {docdate}, {headers: {dtoken}})

        if(data?.success){
            setAppointments(data?.appointments.reverse())
        }else{
            toast.error(data?.message)
        }
        } catch (error) {
            console.log(error)
            toast.error(error?.message)
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {

            const {data} = await axios.post(backendUrl+ '/api/doctor/complete-appointment', {appointmentId}, {headers: {dtoken}})

            if(data?.success){
                toast.success(data?.message)
                docdate === "" ? getAppointments() : getAppointmentByDateForDoctor()
            }else{
                toast.error(data?.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error?.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {

            const {data} = await axios.post(backendUrl+ '/api/doctor/cancel-appointment', {appointmentId}, {headers: {dtoken}})

            if(data?.success){
                toast.success(data?.message)
                docdate === "" ? getAppointments() : getAppointmentByDateForDoctor()
            }else{
                toast.error(data?.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error?.message)
        }
    }

    const getDashData = async() => {
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/dashboard', {headers: {dtoken}})

            if(data?.success){
                setDashData(data?.dashData)
            }else{
                toast.error(data?.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error?.message)
        }
    }

    const getProfleData = async() =>{
        try {

            const {data} = await axios.get(backendUrl+'/api/doctor/profile', {headers: {dtoken}})

            if(data?.success){
                setProfileData(data?.profileData)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error?.message)
        }
    }

    

    const value ={dtoken, setDToken, backendUrl, appointments, setAppointments, getAppointments, completeAppointment, cancelAppointment, getDashData, dashData, setDashData, getProfleData, profileData, setProfileData, docdate, setDocDate, oDocdate, setODocDate, getAppointmentByDateForDoctor}


    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider