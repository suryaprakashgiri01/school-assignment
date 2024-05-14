import { Router } from "express";

import schoolRouter from "./schoolRoutes.js";
import countryRouter from "./countryRoutes.js";
import cityRouter from "./cityRoutes.js";

const router = Router();

router.use("/countries", countryRouter);
router.use("/cities", cityRouter);
router.use("/schools", schoolRouter);

export default router;
