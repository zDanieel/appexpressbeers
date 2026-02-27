import { Router } from "express";
import { getAllBeers } from "../controllers/beers.controller";

const router = Router();

router.get("/", getAllBeers);

export default router;
