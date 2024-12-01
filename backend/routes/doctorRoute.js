import express from "express"
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorDashboard, doctorList, doctorProfle, getAAppointmentByDateForDoctor, loginDoctor, updateDocotrProfile } from "../controllers/doctorController.js"
import authDoctor from "../middleware/authDoctor.js"

const docotrRouter = express.Router()

docotrRouter.get("/list", doctorList)
docotrRouter.post("/login", loginDoctor)
docotrRouter.get("/appointments",authDoctor, appointmentsDoctor)
docotrRouter.post("/complete-appointment",authDoctor, appointmentComplete)
docotrRouter.post("/cancel-appointment",authDoctor, appointmentCancel)
docotrRouter.get("/dashboard",authDoctor, doctorDashboard)
docotrRouter.get("/profile",authDoctor, doctorProfle)
docotrRouter.post("/update-profile",authDoctor, updateDocotrProfile)
docotrRouter.post("/appointment-by-date",authDoctor, getAAppointmentByDateForDoctor)

export default docotrRouter