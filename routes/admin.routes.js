import express from 'express'
import { protectRoute, adminCheck } from "../middlewares/auth.middleware.js";
import { getAdminDashboardData, createJobListing, deleteJobListing, updateJobListing } from "../controllers/admin.controller.js";
import { handleValidationError } from '../middlewares/validation/authValidator.middleware.js'
import { jobCreationValidationChecks } from '../middlewares/validation/jobValidator.middleware.js'


const router = express.Router();

// dashboard routes
router.get('/dashboard', protectRoute, adminCheck,
     getAdminDashboardData)

// job creation routes
router.post('/createjobs', protectRoute, adminCheck,
     jobCreationValidationChecks, handleValidationError,
     createJobListing);

// job deletion routes
router.delete('/deletejobs/:jobsId', protectRoute, adminCheck, deleteJobListing);     
   
// job update routes
router.patch('/updatejobs', protectRoute, adminCheck, updateJobListing);


export default router;