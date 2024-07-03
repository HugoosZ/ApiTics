import mongoose from 'mongoose';

const DbSchema = new mongoose.Schema({
    DB: {
    type: Number,
    required: true,
  },

});
const Db = mongoose.model('Db', DbSchema);
export default Db;
