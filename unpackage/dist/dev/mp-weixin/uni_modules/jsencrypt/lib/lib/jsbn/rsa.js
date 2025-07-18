"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_jsencrypt_lib_lib_jsbn_jsbn = require("./jsbn.js");
const uni_modules_jsencrypt_lib_lib_jsbn_rng = require("./rng.js");
function pkcs1pad1(s, n) {
  if (n < s.length + 22) {
    common_vendor.index.__f__("error", "at uni_modules/jsencrypt/lib/lib/jsbn/rsa.js:23", "Message too long for RSA");
    return null;
  }
  var len = n - s.length - 6;
  var filler = "";
  for (var f = 0; f < len; f += 2) {
    filler += "ff";
  }
  var m = "0001" + filler + "00" + s;
  return uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(m, 16);
}
function pkcs1pad2(s, n) {
  if (n < s.length + 11) {
    common_vendor.index.__f__("error", "at uni_modules/jsencrypt/lib/lib/jsbn/rsa.js:37", "Message too long for RSA");
    return null;
  }
  var ba = [];
  var i = s.length - 1;
  while (i >= 0 && n > 0) {
    var c = s.charCodeAt(i--);
    if (c < 128) {
      ba[--n] = c;
    } else if (c > 127 && c < 2048) {
      ba[--n] = c & 63 | 128;
      ba[--n] = c >> 6 | 192;
    } else {
      ba[--n] = c & 63 | 128;
      ba[--n] = c >> 6 & 63 | 128;
      ba[--n] = c >> 12 | 224;
    }
  }
  ba[--n] = 0;
  var rng = new uni_modules_jsencrypt_lib_lib_jsbn_rng.SecureRandom();
  var x = [];
  while (n > 2) {
    x[0] = 0;
    while (x[0] == 0) {
      rng.nextBytes(x);
    }
    ba[--n] = x[0];
  }
  ba[--n] = 2;
  ba[--n] = 0;
  return new uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger(ba);
}
var RSAKey = (
  /** @class */
  function() {
    function RSAKey2() {
      this.n = null;
      this.e = 0;
      this.d = null;
      this.p = null;
      this.q = null;
      this.dmp1 = null;
      this.dmq1 = null;
      this.coeff = null;
    }
    RSAKey2.prototype.doPublic = function(x) {
      return x.modPowInt(this.e, this.n);
    };
    RSAKey2.prototype.doPrivate = function(x) {
      if (this.p == null || this.q == null) {
        return x.modPow(this.d, this.n);
      }
      var xp = x.mod(this.p).modPow(this.dmp1, this.p);
      var xq = x.mod(this.q).modPow(this.dmq1, this.q);
      while (xp.compareTo(xq) < 0) {
        xp = xp.add(this.p);
      }
      return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
    };
    RSAKey2.prototype.setPublic = function(N, E) {
      if (N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(N, 16);
        this.e = parseInt(E, 16);
      } else {
        common_vendor.index.__f__("error", "at uni_modules/jsencrypt/lib/lib/jsbn/rsa.js:114", "Invalid RSA public key");
      }
    };
    RSAKey2.prototype.encrypt = function(text) {
      var maxLength = this.n.bitLength() + 7 >> 3;
      var m = pkcs1pad2(text, maxLength);
      if (m == null) {
        return null;
      }
      var c = this.doPublic(m);
      if (c == null) {
        return null;
      }
      var h = c.toString(16);
      var length = h.length;
      for (var i = 0; i < maxLength * 2 - length; i++) {
        h = "0" + h;
      }
      return h;
    };
    RSAKey2.prototype.setPrivate = function(N, E, D) {
      if (N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(N, 16);
        this.e = parseInt(E, 16);
        this.d = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(D, 16);
      } else {
        common_vendor.index.__f__("error", "at uni_modules/jsencrypt/lib/lib/jsbn/rsa.js:146", "Invalid RSA private key");
      }
    };
    RSAKey2.prototype.setPrivateEx = function(N, E, D, P, Q, DP, DQ, C) {
      if (N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(N, 16);
        this.e = parseInt(E, 16);
        this.d = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(D, 16);
        this.p = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(P, 16);
        this.q = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(Q, 16);
        this.dmp1 = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(DP, 16);
        this.dmq1 = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(DQ, 16);
        this.coeff = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(C, 16);
      } else {
        common_vendor.index.__f__("error", "at uni_modules/jsencrypt/lib/lib/jsbn/rsa.js:163", "Invalid RSA private key");
      }
    };
    RSAKey2.prototype.generate = function(B, E) {
      var rng = new uni_modules_jsencrypt_lib_lib_jsbn_rng.SecureRandom();
      var qs = B >> 1;
      this.e = parseInt(E, 16);
      var ee = new uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger(E, 16);
      for (; ; ) {
        for (; ; ) {
          this.p = new uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger(B - qs, 1, rng);
          if (this.p.subtract(uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger.ONE).gcd(ee).compareTo(uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
            break;
          }
        }
        for (; ; ) {
          this.q = new uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger(qs, 1, rng);
          if (this.q.subtract(uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger.ONE).gcd(ee).compareTo(uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
            break;
          }
        }
        if (this.p.compareTo(this.q) <= 0) {
          var t = this.p;
          this.p = this.q;
          this.q = t;
        }
        var p1 = this.p.subtract(uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger.ONE);
        var q1 = this.q.subtract(uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger.ONE);
        var phi = p1.multiply(q1);
        if (phi.gcd(ee).compareTo(uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger.ONE) == 0) {
          this.n = this.p.multiply(this.q);
          this.d = ee.modInverse(phi);
          this.dmp1 = this.d.mod(p1);
          this.dmq1 = this.d.mod(q1);
          this.coeff = this.q.modInverse(this.p);
          break;
        }
      }
    };
    RSAKey2.prototype.decrypt = function(ctext) {
      var c = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(ctext, 16);
      var m = this.doPrivate(c);
      if (m == null) {
        return null;
      }
      return pkcs1unpad2(m, this.n.bitLength() + 7 >> 3);
    };
    RSAKey2.prototype.generateAsync = function(B, E, callback) {
      var rng = new uni_modules_jsencrypt_lib_lib_jsbn_rng.SecureRandom();
      var qs = B >> 1;
      this.e = parseInt(E, 16);
      var ee = new uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger(E, 16);
      var rsa = this;
      var loop1 = function() {
        var loop4 = function() {
          if (rsa.p.compareTo(rsa.q) <= 0) {
            var t = rsa.p;
            rsa.p = rsa.q;
            rsa.q = t;
          }
          var p1 = rsa.p.subtract(uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger.ONE);
          var q1 = rsa.q.subtract(uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger.ONE);
          var phi = p1.multiply(q1);
          if (phi.gcd(ee).compareTo(uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger.ONE) == 0) {
            rsa.n = rsa.p.multiply(rsa.q);
            rsa.d = ee.modInverse(phi);
            rsa.dmp1 = rsa.d.mod(p1);
            rsa.dmq1 = rsa.d.mod(q1);
            rsa.coeff = rsa.q.modInverse(rsa.p);
            setTimeout(function() {
              callback();
            }, 0);
          } else {
            setTimeout(loop1, 0);
          }
        };
        var loop3 = function() {
          rsa.q = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.nbi();
          rsa.q.fromNumberAsync(qs, 1, rng, function() {
            rsa.q.subtract(uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger.ONE).gcda(ee, function(r) {
              if (r.compareTo(uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                setTimeout(loop4, 0);
              } else {
                setTimeout(loop3, 0);
              }
            });
          });
        };
        var loop2 = function() {
          rsa.p = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.nbi();
          rsa.p.fromNumberAsync(B - qs, 1, rng, function() {
            rsa.p.subtract(uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger.ONE).gcda(ee, function(r) {
              if (r.compareTo(uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
                setTimeout(loop3, 0);
              } else {
                setTimeout(loop2, 0);
              }
            });
          });
        };
        setTimeout(loop2, 0);
      };
      setTimeout(loop1, 0);
    };
    RSAKey2.prototype.sign = function(text, digestMethod, digestName) {
      var header = getDigestHeader(digestName);
      var digest = header + digestMethod(text).toString();
      var m = pkcs1pad1(digest, this.n.bitLength() / 4);
      if (m == null) {
        return null;
      }
      var c = this.doPrivate(m);
      if (c == null) {
        return null;
      }
      var h = c.toString(16);
      if ((h.length & 1) == 0) {
        return h;
      } else {
        return "0" + h;
      }
    };
    RSAKey2.prototype.verify = function(text, signature, digestMethod) {
      var c = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(signature, 16);
      var m = this.doPublic(c);
      if (m == null) {
        return null;
      }
      var unpadded = m.toString(16).replace(/^1f+00/, "");
      var digest = removeDigestHeader(unpadded);
      return digest == digestMethod(text).toString();
    };
    return RSAKey2;
  }()
);
function pkcs1unpad2(d, n) {
  var b = d.toByteArray();
  var i = 0;
  while (i < b.length && b[i] == 0) {
    ++i;
  }
  if (b.length - i != n - 1 || b[i] != 2) {
    return null;
  }
  ++i;
  while (b[i] != 0) {
    if (++i >= b.length) {
      return null;
    }
  }
  var ret = "";
  while (++i < b.length) {
    var c = b[i] & 255;
    if (c < 128) {
      ret += String.fromCharCode(c);
    } else if (c > 191 && c < 224) {
      ret += String.fromCharCode((c & 31) << 6 | b[i + 1] & 63);
      ++i;
    } else {
      ret += String.fromCharCode((c & 15) << 12 | (b[i + 1] & 63) << 6 | b[i + 2] & 63);
      i += 2;
    }
  }
  return ret;
}
var DIGEST_HEADERS = {
  md2: "3020300c06082a864886f70d020205000410",
  md5: "3020300c06082a864886f70d020505000410",
  sha1: "3021300906052b0e03021a05000414",
  sha224: "302d300d06096086480165030402040500041c",
  sha256: "3031300d060960864801650304020105000420",
  sha384: "3041300d060960864801650304020205000430",
  sha512: "3051300d060960864801650304020305000440",
  ripemd160: "3021300906052b2403020105000414"
};
function getDigestHeader(name) {
  return DIGEST_HEADERS[name] || "";
}
function removeDigestHeader(str) {
  for (var name_1 in DIGEST_HEADERS) {
    if (DIGEST_HEADERS.hasOwnProperty(name_1)) {
      var header = DIGEST_HEADERS[name_1];
      var len = header.length;
      if (str.substr(0, len) == header) {
        return str.substr(len);
      }
    }
  }
  return str;
}
exports.RSAKey = RSAKey;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/jsencrypt/lib/lib/jsbn/rsa.js.map
