import { genUUID, genX25519 } from './utils.js'

const uuid = genUUID()
console.log('uuid', uuid)

const { publicKey, privateKey } = genX25519()

console.log('Public Key (Base64):', publicKey)
console.log('Private Key (Base64):', privateKey)
