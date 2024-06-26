import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";



const app = express();
app.use(express.json());
app.use(express.static('public'));

const mongoURI = 'mongodb+srv://hugo:aaa@cluster0.agnal7m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a la base de datos MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err);
});

app.use(cookieParser());

export { app };