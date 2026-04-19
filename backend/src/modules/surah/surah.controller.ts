import { Request, Response } from "express";
import * as surahService from "./surah.service";

// Implementation for getting all surahs
export const getAllSurah = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await surahService.getAllSurah();

    const formatted = data.map((s: any) => ({
      id: s.id,
      name: s.name,
      translation: s.translation,
      transliteration: s.transliteration,
      total_verses: s.verses?.length,
    }));

    res.status(200).json({
      status: true,
      message: "Surah list fetched successfully",
      data: formatted,
    });

  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};



// Implementation for getting a surah by ID
export const getSurahById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Invalid Surah ID",
      });
    }

    const data = await surahService.getSurahById(id);

    res.status(200).json({
      status: true,
      message: "Surah fetched successfully",
      data,
    });
  } catch (error: any) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};



export const searchAyahs = async (
  req: Request,
  res: Response
) => {
  try {
    const query = req.query.q as string;

    const data = await surahService.searchAyahs(query);

    res.status(200).json({
      success: true,
      message: "Search successful",
      count: data.length,
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


