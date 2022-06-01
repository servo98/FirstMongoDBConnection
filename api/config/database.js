import mongoose from 'mongoose';
import config from './serverConfig.js';

const { database } = config;

const db = mongoose.connection;

db.on('connecting', () => {
  console.log('Intentando conectarse a la base de datos');
});

db.on('error', (error) => {
  console.error('⭕ Error en mongoDB' + error);
});

db.on('connected', () => {
  console.log('✅ Conexiíon a la base de datos establecida ');
});

db.on('disconnected', () => {
  console.info('🥐 Se ha desconectado de la base de datos');
  setTimeout(init, 5000);
});

db.on('reconnected', () => {
  console.log('Reconectado a la base de datos');
});

export default function init() {
  mongoose.connect(
    `mongodb+srv://${database.USER}:${database.PASSWORD}@${database.HOST}/${database.NAME}?retryWrites=true&w=majority`
  );
}
