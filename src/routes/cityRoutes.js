import express from "express";
import {
    createCity,
    getAllCities,
    getCityById,
    getSchoolsByCityId,
    updateCity,
    deleteCity
} from "../controller/cityController.js";

const router = express.Router();

router.post("/", createCity);
router.get("/", getAllCities);
router.get("/:id", getCityById);
router.get("/:id/schools", getSchoolsByCityId);
router.put('/:id', updateCity);
router.delete('/:id', deleteCity);

export default router;