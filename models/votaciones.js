import mongoose from 'mongoose';

const votacionesSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    unique:true,
  },
  candidato: {
    type: Array,
    required: true,
  },
  voto1: {
    type: Number,
    required: false,
    default: 0,
  },
  voto2: {
    type: Number,
    required: false,
    default: 0,
  },
  voto3: {
    type: Number,
    required: false,
    default: 0,
  },
  fecha_creacion: {
    type: Date,
    required: true,
    default: Date.now,
  },
  estado: {
    type: String,
    required: false,
    default: 'true',
    enum: ['true', 'false'],
  },
});
const Votacion = mongoose.model('votaciones', votacionesSchema);
export default Votacion;
