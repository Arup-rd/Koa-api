import convert from 'koa-convert';
import cors from 'kcors';
import bodyParser from 'koa-body';
import session from 'koa-session';
import helmet from 'koa-helmet';
import config from 'config';
import serve from 'koa-static';
import mount from 'koa-mount';

import { cModules, cMiddleware } from '../app';
import { catchErr, statusMessage } from './errorConfig';
import nuxtConfig from './nuxtConfig';

function baseConfig(app, io) {
  app.keys = config.get('secret');
  app.proxy = true;

  app.use(mount('/static', serve(config.get('paths.static'))));

  if (config.get('nuxtBuild')) {
    nuxtConfig(app);
  }

  app.use(convert.compose(
    catchErr,
    cors({
      credentials: true,
      origin: true
    }),
    bodyParser({
      multipart: true,
      formLimit: '200mb'
    }),
    session({
      maxAge: 21600000
    }, app),
    helmet(),
    statusMessage
  ));

  cModules(app, io);
  app.use(cMiddleware());
}

export default baseConfig;
