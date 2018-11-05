// Do not touch the auto loader function
import glob from 'glob';
import Router from 'koa-router';
import fs from 'fs';

export default function (app, io) {
  glob(`${__dirname}/*`, { ignore: '**/index.js' }, (err, matches) => {
    if (err) { throw err; }

    matches.forEach((mod) => {
      const router = require(`${mod}/router`); // eslint-disable-line

      if (fs.existsSync(`${mod}/socket.js`)) {
        const socketLib = require(`${mod}/socket`); // eslint-disable-line
        socketLib.default(io);
      }

      const routes = router.default;
      const { baseUrl } = router;
      const instance = new Router({ prefix: baseUrl });

      routes.forEach((config) => {
        const {
          method = '',
          route = '',
          handlers = []
        } = config;

        const lastHandler = handlers.pop();

        instance[method.toLowerCase()](route, ...handlers, async (ctx) => {
          const hddd = await lastHandler(ctx);
          return hddd;
        });

        app
          .use(instance.routes())
          .use(instance.allowedMethods());
      });
    });
  });
}
