import express from "express"
import { bookAppointment, cancelAppointment, getProfile, listAppointment, loginUser, paymentPaypalPay, registerUser, updateProfile, verfiyPaypalPay } from "../controllers/userController.js"
import authUser from "../middleware/authUser.js"
import upload from "../middleware/muter.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/get-profile",authUser, getProfile)
userRouter.post("/update-profile", upload.single("image"), authUser, updateProfile)
userRouter.post("/book-appointment", authUser, bookAppointment)
userRouter.get("/appointments", authUser, listAppointment)
userRouter.post("/cancel-appointment", authUser, cancelAppointment)
userRouter.post("/create-payment", authUser, paymentPaypalPay)
userRouter.post("/capture-payment", authUser, verfiyPaypalPay)

export default userRouter