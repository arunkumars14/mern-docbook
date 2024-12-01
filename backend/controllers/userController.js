import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import paypal from "paypal-rest-sdk"

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "Missing details"
            })
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Invalid email"
            })
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Strong password needed"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userData = {
            name, email, password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({
            success: true,
            token
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user?.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({
                success: true,
                token
            })
        } else {
            res.json({
                success: false,
                message: "Incorrect passowrd"
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select("-password")
        res.json({
            success: true,
            userData
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const updateProfile = async (req, res) => {
    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({
                success: false,
                message: "Data Missing"
            })
        }
        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile?.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({
            success: true,
            message: "Profile Updated"
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const bookAppointment = async (req, res) => {
    try {

        const { userId, docId, slotDate, slotTime } = req.body;

        if (!slotDate || !slotTime) {
            return res.json({
                success: false,
                message: "Please select date and time for booking"
            })
        }

        const docData = await doctorModel.findById(docId).select("-password")

        if (!docData.available) {
            return res.json({
                success: false,
                message: "Doctor is not available for booking"
            })
        }
        let slots_booked = docData.slots_booked

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({
                    success: false,
                    message: "Slot is already booked"
                })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select("-password")

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)

        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId, {
            slots_booked
        })

        res.json({
            success: true,
            message: "Appointment booked"
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const listAppointment = async (req, res) => {
    try {

        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })

        res.json({
            success: true,
            appointments
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData.userId !== userId) {
            return res.json({
                success: false,
                message: "UnAuthorized Action"
            })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({
            success: true,
            message: "Appointment Cancelled"
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

paypal.configure({
    mode: "sandbox",
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_SECRET_KEY
})

const paymentPaypalPay = async (req, res) => {
    try {

        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentId || appointmentData.cancelled) {
            return res.json({
                success: false,
                message: "Appointment cancelled or not foound"
            })
        }

        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal"
            },
            redirect_urls: {
                return_url: `${process.env.CLIENT_URL}/payment-return`,
                cancel_url: `${process.env.CLIENT_URL}/payment-cancel`
            },
            transactions: [
                {
                    item_list: {
                        items: [
                            {
                                name: appointmentData?.userData?.name,
                                sku: appointmentId,
                                price: appointmentData?.amount,
                                currency: "USD",
                                quantity: 1
                            }
                        ]
                    },
                    amount: {
                        currency: "USD",
                        total: appointmentData?.amount.toFixed(2)
                    },
                    description: appointmentData?.docData?.name
                }
            ]
        }

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.log(error.response.details)
                return res.json({
                    success: false,
                    message: "Error while creating paypal payment"
                })
            } else {

                const approvalUrl = paymentInfo.links.find(link => link.rel == "approval_url").href

                res.status(201).json({
                    success: true,
                    approvalUrl,
                })
            }
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }


}

const verfiyPaypalPay = async (req, res) => {
    try {
        const { paymentId, payerId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentId || appointmentData.cancelled) {
            return res.json({
                success: false,
                message: "Appointment cancelled or not foound"
            })
        }
        if(paymentId && payerId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {payment: true})
            res.json({
                success: true,
                message: "Payment Successful"
            })
        }else{
            res.json({
                success: false,
                message: "Pyment Failed"
            })
        }


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentPaypalPay, verfiyPaypalPay}