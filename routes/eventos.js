import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import jwtAuthenticated from "../helpers/jwtAuthenticated.js";
import User from "../models/user.js";
import Votacion from "../models/votaciones.js";

router.get("", async (req, res) => {
    try{
        const allVotes= await Votacion.find({});
        res.json({
            allVotes,
        });
    }catch (err){
        console.log("error", err);
        res.json({message: "No se han encontrado votaciones."});
    }
});
router.get("/:id", async (req, res) => {
    try{
        const vote= await Votacion.findById(req.params.id);
        res.json({
            vote,
        });
    }catch (err){
        console.log("error", err);
        res.json({message: "No se ha encontrado la votacion."});
    }
    
});


router.post("/creareleccion", async (req, res) => {
    try{
        const newVote= await Votacion.create(req.body);
        res.json({
            success:true
        });
    }catch (err){
        console.log("error", err);
        res.json({ success: false });
    }
});

router.post("/crearelecciones", async (req, res) => {
    try {
        const { titulo, candidatos } = req.body;
        const candidatosArray = JSON.parse(candidatos);
        const newVote = await Votacion.create({
            titulo,
            candidato: candidatosArray,
        });

        res.json({
            success: true,
        });
    } catch (err) {
        console.log("error", err);
        res.json({ success: false });
    }
});



router.post("/:id/votar", async (req, res) => {
    try{
        const vote= await Votacion.findById(req.params.id);
        const votoCandidato = req.body.numCandidato;
        
        if(votoCandidato==1){
            vote.voto1 += 1;
        }else if(votoCandidato==2){
            vote.voto2 += 1;
        }
        else if(votoCandidato==3){
            vote.voto3 += 1;
        }else{
            res.json({success: false});
        }
        await vote.save();
        res.json({ success:true });
    }catch (err){
        console.log("error", err);
        res.json({message: "FALSE"});
    }
});
router.post("/:id/actualizarEstado",jwtAuthenticated, async (req, res) => {
    try
    {
        const vote= await Votacion.findById(req.params.id);
        vote.estado = req.body.estado;
        
        if(vote.estado=="true"){
            res.json({success: true});
        }
        else if(vote.estado=="false"){
            res.json({success: false});
        }
        await vote.save();
    }catch (err){
        console.log("error", err);
        res.json({message: "FALSE"});
    }
});
router.post("/actualizarEstado",jwtAuthenticated ,async (req, res) => {
    try{
        const vote= await Votacion.findById(req.body.id);
        vote.estado=req.body.estado;
        await vote.save();
        res.json({
            vote,
            success:true
        });
    }catch (err){
        console.log("error", err);
        res.json({message: "FALSE"});
    }
});
export default router;