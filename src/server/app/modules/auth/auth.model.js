import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import timestamp from 'mongoose-timestamp';
import { genSaltSync, hashSync } from 'bcryptjs';
import { Crud } from '@utl';

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  acc_status: {
    type: String,
    default: 'new'
  },
  acc_type: {
    type: String,
    default: 'client'
  },
  role: {
    type: String,
    default: null
  },
  social: {
    facebook: {
      id: String,
      token: String
    },
    google: {
      id: String,
      token: String
    },
    twitter: {
      id: String,
      token: String
    },
    linkedin: {
      id: String,
      token: String
    },
    github: {
      id: String,
      token: String
    }
  }
});

authSchema.pre('save', function hashPass(next) {
  const account = this;
  let hash;
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = genSaltSync();
      hash = hashSync(account.password, salt);
    } catch (e) {
      return next(e);
    } finally {
      account.password = hash;
    }
  }
  return next();
});

authSchema.plugin(uniqueValidator);
authSchema.plugin(timestamp);

const authModel = mongoose.model('authModel', authSchema);
const authCrud = new Crud(authModel);

export {
  authCrud,
  authModel
};
