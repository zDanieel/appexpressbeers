import { Request, Response } from "express";
import { poolPromise } from "../config/database";
import { Beer } from "../types/beer.interface";

export const getAllBeers = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query<Beer>("SELECT * FROM Catalog.Beers WHERE IsActive = 1");

    return res.json(result.recordset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
