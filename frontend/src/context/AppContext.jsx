import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";
import { HeartCrack, HeartHandshake, HeartPulseIcon, Loader, LoaderCircleIcon } from "lucide-react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = "$"

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors] = useState([])

    const [token, setToken] = useState(localStorage.getItem("token") || "")

    const [userData, setUserData] = useState(false)

    const getDoctorsData = async() => {
        try {
            const {data} = await axios.get(backendUrl + "/api/doctor/list")
            if(data?.success){
                setDoctors(data.doctors)
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async() => {
        try {

            const {data} = await axios.get(backendUrl+'/api/user/get-profile', {headers: {token}})

            if(data?.success){
                setUserData(data?.userData)
            }else{
                toast.error(data?.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        doctors, currencySymbol, token, backendUrl, setToken, userData, setUserData, loadUserProfileData, getDoctorsData
    }

    useEffect(()=> {
        getDoctorsData()
    }, [])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }else{
            setUserData(false)
        }
    }, [token])

    if(!userData || doctors.length == 0){
        return (
            <div className="flex flex-col justify-center items-center h-[100vh] w-full">
                <div className=""></div>
                <HeartPulseIcon className="animate-pulse" size={100} color="rgb(95,111,255)"/>
                <h1 className="text-[rgb(95,111,255)] mt-5 mb-10 font-bold text-6xl">Prescripto</h1>
            </div>
        )
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider