import minimist from 'minimist'
import { genUUID, genX25519 } from './utils.js'

const gen = (options) => {
  const { configName } = options || {}
  const uuid = genUUID()
  // console.log('uuid', uuid)

  const { publicKey, privateKey } = genX25519()

  // console.log('Public Key (Base64):', publicKey)
  // console.log('Private Key (Base64):', privateKey)

  // config
  const cfg = {
    "name": configName,
    "settings": {
      "clients": [
        {
          "id": uuid,
        }
      ],
    },
    "stream": {
      "settings": {
        "network": "tcp",
        "security": {
          publicKey,
          privateKey
        }
      },
    }
  }

  return cfg
}

(() => {
  // cli args
  const args = minimist(process.argv.slice(2))
  const configName = args?.['name'] || 'default'

  // generate
  const config = gen({ configName })

  // print result
  console.log(JSON.stringify(config))
})()