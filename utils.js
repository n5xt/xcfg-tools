import { v4 } from 'uuid'
import nacl from 'tweetnacl'

export const genUUID = () => {
  const uuid = v4()
  return uuid
}

export const genX25519 = () => {
  const keyPair = nacl.box.keyPair()

  const publicKey = Buffer.from(keyPair.publicKey)
    .toString('base64')
    .replace(/=+$/, '')
  const privateKey = Buffer.from(keyPair.secretKey)
    .toString('base64')
    .replace(/=+$/, '')

  return { publicKey, privateKey }
}
