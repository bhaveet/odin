'use strict'

import mongoose from 'mongoose'
import fs from 'fs'

//const MONGO_CREDENTIALS = encodeURIComponent(MONGO_USERNAME) + ':' + encodeURIComponent(MONGO_PASSWORD)
// const CONNECTION_URI = `mongodb://${MONGO_HOSTS}/${MONGO_DBNAME}`
mongoose.connection.on('connected', () => {
  console.log('[Info] Mongo Connection Established')
})

mongoose.connection.on('reconnected', () => {
  console.log('[Info] Mongo Connection Re-established')
})

mongoose.connection.on('disconnected', () => {
  console.log('[Error] Mongo Connection Disconnected')
})

mongoose.connection.on('close', () => {
  console.log('[Info] Mongo Connection Closed')
})

mongoose.connection.on('error', (error) => {
  console.log('[Error] Mongo Connection ERROR: ', error)
  throw error
})

if (process.env.APP_ENVIROMENT === 'dev') {
  mongoose.set('debug', true)
}

const mongoConnect = async (configs: any) => {
  const {
      CONNECTION_URI = '',
      MONGO_DBNAME = '',
      MONGO_HOSTS = '',
      // MONGO_USERNAME = '',
      // MONGO_PASSWORD = '',
      MONGO_REPLICASET,
      MONGO_READ_PREFERENCE,
      MONGO_PEM_PATH = '',
      MONGO_SERVER_IDENTITY_CHECK = 'true'
  } = configs

  // console.log(`Connecting to MongoDB ' ${CONNECTION_URI} || ${MONGO_HOSTS}/${MONGO_DBNAME}'`, CONFIG)
  console.log(`Connecting to MongoDB ' ${CONNECTION_URI}`)
  const sslCA = MONGO_PEM_PATH && [fs.readFileSync(MONGO_PEM_PATH)]
  const SSL_CONFIG = MONGO_PEM_PATH ? {
    ssl: true,
    sslValidate: true,
    checkServerIdentity: MONGO_SERVER_IDENTITY_CHECK === 'true',
    sslCA
  } : {}

  // await mongoose.connect(CONNECTION_URI, CONFIG.OPTIONS)
  await mongoose.connect(CONNECTION_URI)
}

// const CONFIG = {
//   DBNAME: MONGO_DBNAME,
//   OPTIONS: {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     promiseLibrary: Promise,
//     poolSize: 5,
//
//     // replicaSet: MONGO_REPLICASET,
//     readPreference: MONGO_READ_PREFERENCE,
//     ...SSL_CONFIG
//   }
// }

const MONGO = {
  // CONFIG,
  connect: mongoConnect
}

export default MONGO
