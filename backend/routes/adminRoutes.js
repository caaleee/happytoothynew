// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");
const serviceController = require("../controllers/serviceController");
const doctorScheduleController = require("../controllers/doctorScheduleController");
const clinicSettingsController = require("../controllers/clinicSettingsController");

// Nonaktifkan dulu untuk testing, bisa diaktifkan lagi nanti
// router.use(protect, authorizeRoles(1));

console.log("Isi dari serviceController:", serviceController);
console.log("Isi dari doctorScheduleController:", doctorScheduleController);

router.get("/register", (req, res) => {
  res.render("admin/register");
});
router.post("/register", authController.register);

router.get("/dashboard-data", userController.getAdminDashboardData);

// Rute untuk manajemen User
router.get("/users", userController.getAllUsers);
router.post("/users", userController.addUser);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.put("/users/:id/activate", userController.activateUserAccount);
router.put("/users/:id/verify", userController.verifyUserAccount);

// Rute untuk manajemen Dokter
router.get("/doctors", userController.getAllDoctors);
router.post("/doctors", userController.createDoctor);
router.get("/doctors/:id", userController.getDoctorByIdForEdit);
router.put("/doctors/:id", userController.updateDoctor);
router.put("/doctors/:id/deactivate", userController.deactivateDoctorAccount);

// Rute untuk manajemen Layanan (Services)
router.get("/services", serviceController.getAllServices);
router.post("/services", serviceController.createService);
router.get("/services/:id", serviceController.getServiceById);
router.put("/services/:id", serviceController.updateService);
router.put("/services/:id/deactivate", serviceController.deactivateService);
router.put("/services/:id/activate", serviceController.activateService);

// --- BAGIAN MANAJEMEN JADWAL DOKTER ---
// Rute baru untuk menampilkan halaman "Manajemen Jadwal"
router.get("/schedules", doctorScheduleController.listSchedules);

// Rute Anda yang sudah ada untuk menambah, menghapus, dan lainnya
router.post("/schedules", doctorScheduleController.createSchedule);
router.delete("/schedules/:scheduleId", doctorScheduleController.deleteSchedule);
router.get("/doctors/:doctorId/schedules", doctorScheduleController.getSchedulesByDoctorId);
router.get("/schedules/:scheduleId", doctorScheduleController.getScheduleById);
router.put("/schedules/:scheduleId", doctorScheduleController.updateSchedule);
// -----------------------------------------

// Rute untuk pengaturan klinik
router.get("/settings", clinicSettingsController.getClinicSettings);
router.put("/settings", clinicSettingsController.updateClinicSettings);

// Rute lain-lain
router.get("/booking/form-data", userController.getBookingFormData);
router.get("/booking/available-slots", userController.getAvailableDoctorSlots);
router.post("/booking/create", userController.bookAppointment);
router.get("/pasien/dashboard-data", userController.getPatientDashboardData);

module.exports = router;