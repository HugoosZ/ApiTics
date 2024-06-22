import express from "express";
const router = express.Router();

import Opinions from "../models/votaciones.js";
router.get("/home", (req, res) => {
    res.render("home",{
        style: 'styles.css',
    });
});

router.get("/opinions", async (req, res) => {
    try{
        const allOpinions= await Opinions.find({});
        res.json({
            allOpinions,
        });
    }catch (err){
        console.log("error", err);
        res.json({message: "No se han encontrado opiniones."});
    }
});
router.post('/opinions', async (req, res) => {
    try {
      const { persona, correo, comentario } = req.body;
  
      // Crear una nueva instancia del modelo Opinions
      const newOpinion = new Opinions({
        persona,
        correo,
        comentario,
      });
  
      // Guardar la nueva opinión en la base de datos
      await newOpinion.save();
  
      res.status(201).json({ message: 'Opinión creada exitosamente', opinion: newOpinion });
    } catch (error) {
      // Manejar errores
      if (error.code === 11000) {
        // Error de duplicado (correo ya existe)
        res.status(400).json({ message: 'El correo ya está registrado' });
      } else {
        res.status(500).json({ message: 'Error al crear la opinión', error: error.message });
      }
    }
  });
/*
router.get("/admin",jwtAuthenticated, async (req, res) => {
    const currentUser=await getCurrentUser(req);
    res.json({user:currentUser});
});
*/



export default router;