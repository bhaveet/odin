'use strict'

import MONGO from './MongoDB'
import POSTGRES from './Postgresql'
import KAFKA from './Kafka'
import REDIS from './REDIS'

const CONNECTORS = {
  MONGO,
  POSTGRES,
  KAFKA,
  REDIS
}

export default CONNECTORS
