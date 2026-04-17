import express from "express";
import * as surahController from "./surah.controller"


const router = express.Router();

router.get('/surah', surahController.getAllSurah);
router.get('/surah/:id', surahController.getSurahById);
router.get("/search", surahController.searchAyahs);
    



export default router;