import JSEncrypt from '@/uni_modules/jsencrypt/lib/index.js'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDvRzBCno54fBq+wr8IiOOB0y7N2MEaNtWSHR8ehayqXa/Z8NksELQbMaXmeU1LX4jMMw6xo4ypZdCIhESIuhyse/uVvYABO/ZNrqunnMRsdgun9PqRy5hZb91oqd41PmCdYTMqots70JY6aaR1LWKmU1IKwuf0O4mg099Zf5ojJwIDAQAB'


// const privateKey = ''

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
// export function decrypt(txt) {
//   const encryptor = new JSEncrypt()
//   encryptor.setPrivateKey(privateKey) // 设置私钥
//   return encryptor.decrypt(txt) // 对数据进行解密
// }

