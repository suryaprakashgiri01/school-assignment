import express from "express";
import {
    createCountry,
    onboardCountry,
    getAllcountries,
    getCountryById,
    getCitiesByCountryId,
    updateCountry,
    deleteCountry
} from "../controller/countryController.js";

const router = express.Router();

router.post("/", createCountry);
router.post("/onboard", onboardCountry);
router.get("/", getAllcountries);
router.get("/:id", getCountryById);
router.get("/:id/cities", getCitiesByCountryId);
router.put('/:id', updateCountry);
router.delete('/:id', deleteCountry);

export default router;