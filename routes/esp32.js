import express from "express";
import Db from "../models/db.js";  // Asegúrate de que la ruta sea correcta

const router = express.Router();

router.post("/send-decibel", async (req, res) => {
  const { decibel } = req.body;

  if (typeof decibel === 'undefined' || decibel < 0) {
    return res.status(400).send({ error: "Invalid decibel level" });
  }

  try {
    const newDb = new Db({ DB: decibel });
    await newDb.save();
    res.status(201).send({ message: "Decibel level saved successfully" });
  } catch (error) {
    res.status(500).send({ error: "Error saving decibel level" });
  }
});
router.get("/latest", async (req, res) => {
    try {
      const latestDb = await Db.findOne().sort({ _id: -1 }).exec();
      if (latestDb) {
        res.status(200).send({ decibel: latestDb.DB });
      } else {
        res.status(404).send({ error: "No records found" });
      }
    } catch (error) {
      res.status(500).send({ error: "Error retrieving the latest decibel level" });
    }
  });
export default router;
