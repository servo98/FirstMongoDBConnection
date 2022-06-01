import http from 'http';
import api from './api/api.js';
import config from './api/config/serverConfig.js';
import dbInitialize from './api/config/database.js';

const { server: serverConfig } = config;

const server = http.createServer(api);

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error('La aplicación no tiene permisos');
      process.exit();
      break;
    case 'EADDRINUSE':
      console.error(`El puerto ${serverConfig.PORT} está en uso`);
      break;
    default:
      throw error;
  }
};

const onListen = () => {
  console.log(`Servidor ejecutándose en el puerto ${serverConfig.PORT}`);
};

server.on('listening', onListen);
server.on('error', onError);

dbInitialize();
server.listen(serverConfig.PORT);
