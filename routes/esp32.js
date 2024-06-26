import express from 'express';
import fetch from 'node-fetch'; // Asegúrate de tener esta importación

const router = express.Router();

router.post("/data", (req, res) => {
    const { sensorData } = req.body;
    console.log(`Datos recibidos del ESP32: ${sensorData}`);
    res.status(200).send('Datos recibidos');
});
router.post("/send-decibel", async (req, res) => {
    const { decibel } = req.body;
    console.log(`Nivel de decibelios recibido: ${decibel}`);

    try {
        const esp32Response = await fetch('http://<ESP32_IP_ADDRESS>/receive-decibel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ decibel }),
        });

        if (esp32Response.ok) {
            console.log('Nivel de decibelios enviado al ESP32 con éxito');
            res.status(200).send('Nivel de decibelios enviado al ESP32');
        } else {
            console.error('Error al enviar el nivel de decibelios al ESP32');
            res.status(500).send('Error al enviar el nivel de decibelios al ESP32');
        }
    } catch (error) {
        console.error('Error al enviar el nivel de decibelios al ESP32:', error);
        res.status(500).send('Error al enviar el nivel de decibelios al ESP32');
    }
});


export default router;