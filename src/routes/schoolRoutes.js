import express from "express";
import {
    createSchool,
    getAllSchools,
    getSchoolById,
    updateSchool,
    deleteSchool
} from "../controller/schoolController.js";

const router = express.Router();

router.post("/", createSchool);
router.get("/", getAllSchools);
router.get("/:id", getSchoolById);
router.put('/:id', updateSchool);
router.delete('/:id', deleteSchool);

export default router;