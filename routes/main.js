import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import jwtAuthenticated from "../helpers/jwtAuthenticated.js";

router.get("/home", (req, res) => {
    res.render("home",{
        style: 'styles.css',
    });
});


/*
router.get("/admin",jwtAuthenticated, async (req, res) => {
    const currentUser=await getCurrentUser(req);
    res.json({user:currentUser});
});
*/



export default router;