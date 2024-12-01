import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const PaypalReturn = () => {

    const { token, backendUrl } = useContext(AppContext)

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const paymentId = params.get("paymentId")
    const payerId = params.get("PayerID")

    useEffect(() => {
        if (paymentId && payerId) {
            async function capturePayment() {
                const appointmentId = JSON.parse(sessionStorage.getItem("appointmentId"))

                const { data } = await axios.post(backendUrl + "/api/user/capture-payment", { paymentId, payerId, appointmentId }, { headers: { token } })

                if (data?.success) {
                    sessionStorage.removeItem("appointmentId")
                    window.location.href = "/my-appointments"
                }

            }
            capturePayment()
        }
    }, [paymentId, payerId]);


    return (
        <h1 className="font-bold">
            Payment Processing... Dont't relooad. Please wait
        </h1>
    )
}

export default PaypalReturn