import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.static('public'));
const mongoURI = 'mongodb+srv://lauramontaner:FtKt7QCzUHAoEqxc@cluster0.jwwychd.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});
db.once('open', () => {
  console.log('Connected to Mongo Database');
});
app.use(cookieParser());
export { app };