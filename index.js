import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { app } from "./app.js";
import mainRouter from "./routes/main.js";
import UserRouter from "./routes/users.js";
import Esp32Router from "./routes/esp32.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 2000;

// Configura Express para usar el motor de plantillas 'ejs'
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views')); // Establece la carpeta de vistas

app.use(cors());
app.use("", mainRouter);
app.use("/user", UserRouter);
app.use("/", Esp32Router);

// Ruta para renderizar la vista 'home.ejs'
app.get("/", (req, res) => {
    res.render("home", {
        style: 'styles.css',
    });
});

// Ruta de ejemplo
app.get("/hi", (req, res) => {
    res.send("Hello World!");
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});