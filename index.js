import { app } from "./app.js";
import mainRouter from "./routes/main.js";
import UserRouter from "./routes/users.js";
import Esp32Router from "./routes/esp32.js"; // Asegúrate de importar correctamente

import cors from "cors";
const port = 2000;

app.use(cors());
app.use("", mainRouter);
app.use("/user", UserRouter);
app.use("/", Esp32Router);

app.get("/", (req, res) => {
    res.render("home", {
        style: 'styles.css',
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get("/hi", (req, res) => {
    res.send("Hello World!");
});
