import 'babel-polyfill';
import Koa from 'koa';
import config from 'config';
import http from 'http';
import socket from 'socket.io';
import baseConfig from './serverConfig';
import appLogger from './loggerConfig';
import connectDatabase from './databaseConfig';

const app = new Koa();
const server = http.createServer(app.callback());
const io = socket(server);
baseConfig(app, io);
appLogger(app);

(async () => {
  try {
    const info = await connectDatabase();
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`); // eslint-disable-line no-console
  } catch (error) {
    console.error('Unable to connect to database'); // eslint-disable-line no-console
  }

  await server.listen(config.get('server.port'));
  console.log(`Server started on port ${config.get('server.port')}`); // eslint-disable-line no-console
})();

export default app;
