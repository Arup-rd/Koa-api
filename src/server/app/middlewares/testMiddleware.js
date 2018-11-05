// import { Buffer } from 'buffer';

export default async function (ctx, next) {
  // const { token } = JSON.parse(Buffer.from(ctx.cookies.get('koa:sess'), 'base64').toString('ascii'));
  // console.log(token);
  await next();
}
