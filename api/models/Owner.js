import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  edad: Number,
  nombre: String,
  raza: String,
  tipo: String,
});

const ownerSchema = new mongoose.Schema({
  nacimiento: Date,
  nombre: {
    type: String,
    required: true,
  },
  phone: String,
  correo: {
    type: String,
    unique: true,
    required: [true, 'Correo es obligatorio'],
    trim: true,
  },
  mascotas: [petSchema],
});

export default mongoose.model('Owner', ownerSchema);
