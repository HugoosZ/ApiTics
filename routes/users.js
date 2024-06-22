import express from "express";
import User from "../models/user.js";

import jwt from "jsonwebtoken";
import jwtAuthenticated from "../helpers/jwtAuthenticated.js";
const router = express.Router();



router.get("/admin", jwtAuthenticated, (req, res) => {
    res.json({ success: true, message: "Página de administrador" });
});
router.get("/login", (req, res) => {
    
    res.json({ success: true, message: "Página de login" });
});
router.get("/register", (req, res) => {
    res.json({ success: true, message: "Página de register" });
});

router.post("/register", (req, res) => {
    User.create(req.body);
    res.json({success:true}); 
});
router.post("/login", async (req, res) => {
    const currentUser = await User.findOne({email: req.body.email});
    if(!currentUser || currentUser.password !== req.body.password) {
        res.json({success:false, message:"usuario o contraseña incorrecto"})
        return; 
    }

    const payload = currentUser["_doc"];
    delete payload.password;
    const signedJWT = jwt.sign(payload, "secretSign", {expiresIn: "1h"});
    
    res.json({ success: true, jwt: signedJWT, redirectURL: "/admin" });

});


router.get("/corriente", jwtAuthenticated, async (req, res) => {
    try {
        res.json({ nombreUsuario: req.usuario.nombre});
    } catch (error) {
        console.log("error", error);
    }
});

router.get("/desconectar", (req, res) => {
    res.json({ success: true, message: "Sesión cerrada exitosamente" });
});





export default router;