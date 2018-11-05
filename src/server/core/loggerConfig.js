import isDev from 'isdev';
import kLogger from 'koa-logger';
import log4js from 'log4js';
import convert from 'koa-convert';

export default function appLogger(app) {
  if (isDev) {
    log4js.configure({
      appenders: {
        console: {
          type: 'console',
          layout: {
            type: 'coloured'
          }
        }
      },
      categories: {
        default: {
          appenders: ['console'],
          level: ['all']
        }
      }
    });
    app.use(convert(kLogger()));
  }
}
