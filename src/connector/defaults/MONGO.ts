'use strict'

const MONGO_DEFAULTS = {
  SSL: true,
  SSL_VALIDATE: true,
  USE_NEW_URL_PARSER: true,
  USE_UNIFIED_TOPOLOGY: true,
  USE_CREATE_INDEX: true,
  USE_FIND_AND_MODIFY: false,
  PROMISE_LIBRARY: Promise,
  POOL_SIZE: 5,
}

export default MONGO_DEFAULTS
