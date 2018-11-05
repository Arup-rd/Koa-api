// Do not touch the auto loader function
import compose from 'koa-compose';
import glob from 'glob';
import { basename } from 'path';

export default function () {
  const allMids = [];
  glob(`${__dirname}/*.js`, { ignore: '**/index.js' }, (err, matches) => {
    if (err) {
      throw err;
    }
    if (matches) {
      matches.forEach((mod) => {
        const reqMid = require(`./${basename(mod, '.js')}`); // eslint-disable-line
        allMids.push(reqMid.default);
      });
    }
  });
  return compose(allMids);
}
