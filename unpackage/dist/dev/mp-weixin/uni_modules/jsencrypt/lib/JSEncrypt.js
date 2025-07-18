"use strict";
const common_vendor = require("../../../common/vendor.js");
const uni_modules_jsencrypt_lib_lib_jsbn_base64 = require("./lib/jsbn/base64.js");
const uni_modules_jsencrypt_lib_JSEncryptRSAKey = require("./JSEncryptRSAKey.js");
var _a;
var version = typeof process !== "undefined" ? (_a = process.env) === null || _a === void 0 ? void 0 : _a.npm_package_version : void 0;
var JSEncrypt = (
  /** @class */
  function() {
    function JSEncrypt2(options) {
      if (options === void 0) {
        options = {};
      }
      options = options || {};
      this.default_key_size = options.default_key_size ? parseInt(options.default_key_size, 10) : 1024;
      this.default_public_exponent = options.default_public_exponent || "010001";
      this.log = options.log || false;
      this.key = null;
    }
    JSEncrypt2.prototype.setKey = function(key) {
      if (this.log && this.key) {
        common_vendor.index.__f__("warn", "at uni_modules/jsencrypt/lib/JSEncrypt.js:37", "A key was already set, overriding existing.");
      }
      this.key = new uni_modules_jsencrypt_lib_JSEncryptRSAKey.JSEncryptRSAKey(key);
    };
    JSEncrypt2.prototype.setPrivateKey = function(privkey) {
      this.setKey(privkey);
    };
    JSEncrypt2.prototype.setPublicKey = function(pubkey) {
      this.setKey(pubkey);
    };
    JSEncrypt2.prototype.decrypt = function(str) {
      try {
        return this.getKey().decrypt(uni_modules_jsencrypt_lib_lib_jsbn_base64.b64tohex(str));
      } catch (ex) {
        return false;
      }
    };
    JSEncrypt2.prototype.encrypt = function(str) {
      try {
        return uni_modules_jsencrypt_lib_lib_jsbn_base64.hex2b64(this.getKey().encrypt(str));
      } catch (ex) {
        return false;
      }
    };
    JSEncrypt2.prototype.sign = function(str, digestMethod, digestName) {
      try {
        return uni_modules_jsencrypt_lib_lib_jsbn_base64.hex2b64(this.getKey().sign(str, digestMethod, digestName));
      } catch (ex) {
        return false;
      }
    };
    JSEncrypt2.prototype.verify = function(str, signature, digestMethod) {
      try {
        return this.getKey().verify(str, uni_modules_jsencrypt_lib_lib_jsbn_base64.b64tohex(signature), digestMethod);
      } catch (ex) {
        return false;
      }
    };
    JSEncrypt2.prototype.getKey = function(cb) {
      if (!this.key) {
        this.key = new uni_modules_jsencrypt_lib_JSEncryptRSAKey.JSEncryptRSAKey();
        if (cb && {}.toString.call(cb) === "[object Function]") {
          this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
          return;
        }
        this.key.generate(this.default_key_size, this.default_public_exponent);
      }
      return this.key;
    };
    JSEncrypt2.prototype.getPrivateKey = function() {
      return this.getKey().getPrivateKey();
    };
    JSEncrypt2.prototype.getPrivateKeyB64 = function() {
      return this.getKey().getPrivateBaseKeyB64();
    };
    JSEncrypt2.prototype.getPublicKey = function() {
      return this.getKey().getPublicKey();
    };
    JSEncrypt2.prototype.getPublicKeyB64 = function() {
      return this.getKey().getPublicBaseKeyB64();
    };
    JSEncrypt2.version = version;
    return JSEncrypt2;
  }()
);
exports.JSEncrypt = JSEncrypt;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/jsencrypt/lib/JSEncrypt.js.map
