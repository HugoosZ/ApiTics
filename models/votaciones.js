import mongoose from 'mongoose';

const OpinionsSchema = new mongoose.Schema({
    persona: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique:true,
  },
  comentario: {
    type: String,
    required: true,
  },
  fecha_creacion: {
    type: Date,
    required: true,
    default: Date.now,
  },

});
const Opinions = mongoose.model('Opinions', OpinionsSchema);
export default Opinions;
