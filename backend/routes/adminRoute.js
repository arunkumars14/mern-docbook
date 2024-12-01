import express from "express"
import { addDoctor, adminDashboard, allDocotors, appointmentByDate, appointmentsAdmin, apponitmentCancel, loginAdmin } from "../controllers/adminController.js"
import upload from "../middleware/muter.js"
import authAdmin from "../middleware/authAdmin.js"
import { changeAvailability } from "../controllers/doctorController.js"

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single("image"), addDoctor)
adminRouter.post("/login", loginAdmin)
adminRouter.post("/all-doctors", authAdmin, allDocotors)
adminRouter.post("/change-availabilty", authAdmin, changeAvailability)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
adminRouter.post("/cancel-appointment", authAdmin, apponitmentCancel)
adminRouter.get("/dashboard", authAdmin, adminDashboard)
adminRouter.post("/appointment-by-date", authAdmin, appointmentByDate)

export default adminRouter
