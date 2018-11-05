import { compareSync } from 'bcryptjs';
import { sign as jwtSign } from 'jsonwebtoken';
import config from 'config';
import { authCrud } from './auth.model';


let auths;
let auth;
let authNew;
const { 0: secret } = config.get('secret');

const authAll = async (ctx) => {
  try {
    auths = await authCrud.get();
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    ctx.body = {
      body: auths
    };
  }
};

const authSingle = async (ctx) => {
  try {
    auth = await authCrud.single({ _id: ctx.params.id });
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    ctx.body = {
      body: auth
    };
  }
};

const authCreate = async (ctx) => {
  try {
    authNew = await authCrud.create(ctx.request.body);
  } catch (e) {
    ctx.throw(422, e.message);
  } finally {
    ctx.body = {
      body: authNew
    };
  }
};

const authUpdate = async (ctx) => {
  try {
    auth = await authCrud.put({
      params: {
        _id: ctx.params.id
      },
      body: ctx.request.body
    });
  } catch (e) {
    ctx.throw(422, e.message);
  } finally {
    ctx.body = {
      body: auth
    };
  }
};

const authDelete = async (ctx) => {
  try {
    auth = await authCrud.delete({ _id: ctx.params.id });
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    ctx.body = {
      body: auth
    };
  }
};

const authLocal = async (ctx) => {
  const {
    username,
    password,
    email,
    signup
  } = ctx.request.body;
  auth = await authCrud.single({
    $or: [{
      username
    }, {
      email: username
    }]
  });
  if (signup && !auth) {
    try {
      auth = await authCrud.create({
        username,
        password,
        email
      });
    } catch (e) {
      ctx.throw(422, e.message);
    }
  } else if (signup && auth) {
    ctx.throw(409, { message: 'Email or username already registered!!' });
  } else if (!auth) {
    ctx.throw(401, { message: 'No user found' });
  } else if (auth && !compareSync(password, auth.password)) {
    ctx.throw(401, { message: 'Password given is wrong' });
  }
  const token = jwtSign({
    data: {
      uid: auth._id,
      acc_type: auth.acc_type
    },
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 21600
  }, secret);
  ctx.session.token = token;
  ctx.body = {
    data: {
      token
    },
    message: 'Loggedin successfully'
  };
};

export {
  authAll,
  authSingle,
  authCreate,
  authUpdate,
  authDelete,
  authLocal
};
