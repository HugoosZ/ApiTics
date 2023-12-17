import jwt from "jsonwebtoken";

const jwtAuthenticated = (req, res, next) => {
  const authJwt = req.headers.authorization;
  if (!authJwt) {
    res.json({success:false, message:"acceso denegado"});
    return;
  }

  try {
    const clave = jwt.verify(authJwt, "secretSign");
    req.usuario = clave;
    next();
  } catch (error) {
    console.log("error", error);
    res.json({success:false, message:"acceso denegado"});
  }
};

export default jwtAuthenticated;