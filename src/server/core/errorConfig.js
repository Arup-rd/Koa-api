import { has } from 'lodash/fp';

export const catchErr = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      message: err.toString()
    };
  }
};

const statusMsg = {
  400: 'Entity not found and will not proceed',
  401: 'Not authorized',
  403: 'Forbidden',
  404: 'Resource not found',
  405: 'Method not allowed',
  409: 'Record conflict',
  422: 'Unprocessable entity',
  429: 'Too many requests.'
};

export const statusMessage = async (ctx, next) => {
  await next();

  if (has(ctx.status, statusMsg)) {
    const { status } = ctx;
    ctx.body = {
      message: statusMsg[status]
    };
    ctx.status = status;
  }
};
