import mongoose from 'mongoose';
import config from 'config';


export default function connectDatabase() {
  let dbUri;

  if (config.get('db.options.userName')) {
    dbUri = `mongodb://${config.get('db.options.userName')}:${config.get('db.options.passWord')}@${config.get('db.host')}:${config.get('db.options.port')}/${config.get('db.dbName')}`;
  } else {
    dbUri = `mongodb://${config.get('db.host')}:${config.get('db.options.port')}/${config.get('db.dbName')}`;
  }

  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.')) // eslint-disable-line no-console
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(dbUri, {
      useMongoClient: true
    });
  });
}
