'use strict'

import { createConnection } from 'typeorm'
import * as PostgressConnectionStringParser from 'pg-connection-string'

const connectPostgres = async (configs: any)=> {
  const { CONNECTION_URL } = configs
  // const connectionOptions = PostgressConnectionStringParser.parse(CONNECTION_URI)
  //
  // const { host, port, username, password, database, synchronize, logging } = connectionOptions

  await createConnection({
      type: 'postgres',
      url: CONNECTION_URL,
      // host,
      // port,
      // username,
      // password,
      // database,
      synchronize: true,
      logging: false
  }).then(connection => {
      console.log('Postgres Connected Successfully');
  }).catch(error => console.log(error));
}

const POSTGRES = {
  connect: connectPostgres
}

console.log('POSTGRE OK');
export default POSTGRES

// OLD
// const pgPromise = require('pg-promise');
// const promise = require('bluebird');
// const config = require('config');
//
// const createConn = (databaseUrl) => {
//   const initOptions = {
//     promiseLib: promise,
//     error(error, e) {
//       console.error(e.query);
//       error.query = e.query;
//       error.DB_ERROR = true;
//       return { ...error, DB_ERROR: true };
//     },
//   };
//
//   const pgp = pgPromise(initOptions);
//   const db = pgp(databaseUrl);
//
//   return db;
// };
//
// const db = createConn(config.get('DATABASE_URL'));
//
// module.exports = db;
