'use strict'

import MONGO from './MongoDB'
import POSTGRES from './Postgresql'
import KAFKA from './Kafka'

const CONNECTORS = {
  MONGO,
  POSTGRES,
  KAFKA
}

export default CONNECTORS
