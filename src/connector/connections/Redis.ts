'use strict'

import { createClient } from 'redis'

class REDIS {
  configs: any
  clientOptions: any
  KEY_PREFIX: string
  client: any

  constructor(configs: any){
    this.configs = configs
    this.clientOptions = {
      port: this.configs.PORT,
      host: this.configs.HOST || '',
      password: this.configs.AUTH || '',
      tls: { checkServerIdentity: () => undefined }
    }

    this.KEY_PREFIX = this.configs.KEY_PREFIX
    this.client = asyncWrapper(createClient(this.clientOptions).connect())
    console.log(this.client);

  }

  prefix (key: string) {
    const prefixPattern = `${this.KEY_PREFIX}_`
    const hasPrefix = key.indexOf(prefixPattern) === 0
    const keyPrefixed = (!hasPrefix && `${prefixPattern}${key}`) || key
    return keyPrefixed
  }

  async get (key = '', options: any = {}) {
    return new Promise((resolve, reject) => {
      const { ttlInSecs, refreshTtlOnGet } = options
      const keyPrefixed = this.prefix(key)

      this.client.get(keyPrefixed, async (error: any, value: any) => {
        if (ttlInSecs && refreshTtlOnGet) {
          this.client.expire(key, ttlInSecs)
        }

        if (error) { return reject(error) }
        resolve(value)
      })
    })
  }

  async set (key: any, value: any, options: any = {}) {
    return new Promise((resolve, reject) => {
      const { ttlInSecs } = options
      const keyPrefixed = this.prefix(key)

      this.client.set(keyPrefixed, value, async (error: any) => {
        if (ttlInSecs) {
          this.client.expire(key, ttlInSecs)
        }

        if (error) { return reject(error) }

        resolve({})
      })
    })
  }

  async del (key = '') {
    return new Promise((resolve, reject) => {
      const keyPrefixed = this.prefix(key)
      this.client.del(keyPrefixed, async (error: any, value: any) => {
        if (error) { return reject(error) }

        resolve(value)
      })
    })
  }

  async keys (pattern = '') {
    return new Promise((resolve, reject) => {
      const searchPatten = this.prefix(pattern)
      this.client.keys(searchPatten, async (error: any, values: any) => {
        if (error) { return reject(error) }

        resolve(values)
      })
    })
  }

 }

export default REDIS
