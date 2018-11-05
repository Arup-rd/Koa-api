import { Nuxt, Builder } from 'nuxt';
import koaConnect from 'koa-connect';
import isDev from 'isdev';
import config from '../../../nuxt.config';

async function nuxtConfig(app) {
  const nuxt = new Nuxt(config);

  if (isDev) {
    await new Builder(nuxt).build();
  }
  const nuxtRender = koaConnect(nuxt.render);

  app.use(async (ctx, next) => {
    await next();
    ctx.status = 200;
    ctx.req.session = ctx.session;
    await nuxtRender(ctx);
  });
}

export default nuxtConfig;
