"use strict";
const uni_modules_jsencrypt_lib_JSEncrypt = require("../uni_modules/jsencrypt/lib/JSEncrypt.js");
const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDvRzBCno54fBq+wr8IiOOB0y7N2MEaNtWSHR8ehayqXa/Z8NksELQbMaXmeU1LX4jMMw6xo4ypZdCIhESIuhyse/uVvYABO/ZNrqunnMRsdgun9PqRy5hZb91oqd41PmCdYTMqots70JY6aaR1LWKmU1IKwuf0O4mg099Zf5ojJwIDAQAB";
function encrypt(txt) {
  const encryptor = new uni_modules_jsencrypt_lib_JSEncrypt.JSEncrypt();
  encryptor.setPublicKey(publicKey);
  return encryptor.encrypt(txt);
}
exports.encrypt = encrypt;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/jsencrypt.js.map
