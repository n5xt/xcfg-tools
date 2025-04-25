import minimist from 'minimist'
import Ajv from 'ajv'
import { genUUID, genX25519 } from './utils.js'

const ajv = new Ajv()

const gen = (options) => {
  const { configName } = options || {}
  const uuid = genUUID()
  // console.log('uuid', uuid)

  const { publicKey, privateKey } = genX25519()

  // console.log('Public Key (Base64):', publicKey)
  // console.log('Private Key (Base64):', privateKey)

  // config
  const cfg = {
    name: configName,
    settings: {
      clients: [
        {
          id: uuid
        }
      ]
    },
    stream: {
      settings: {
        network: 'tcp',
        security: {
          publicKey,
          privateKey
        }
      }
    }
  }

  return cfg
}

// config schema
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    settings: {
      type: 'object',
      properties: {
        clients: { type: 'array' }
      }
    },
    stream: {
      type: 'object',
      properties: {
        settings: {
          type: 'object',
          properties: {
            network: { type: 'string' },
            security: {
              type: 'object',
              properties: {
                publicKey: { type: 'string' },
                privateKey: { type: 'string' }
              }
            }
          }
        }
      }
    }
  },
  required: ['name', 'settings', 'stream'],
  additionalProperties: false
}

const run = () => {
  // cli args
  const args = minimist(process.argv.slice(2))
  const configName = args?.['name'] || 'default'

  // generate
  const config = gen({ configName })

  const validate = ajv.compile(schema)
  const valid = validate(config)
  if (!valid) {
    // print errors
    console.error(validate.errors)
  } else {
    // print result
    console.log(JSON.stringify(config))
  }
}

run()
