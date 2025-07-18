"use strict";
const uni_modules_jsencrypt_lib_lib_jsbn_base64 = require("./lib/jsbn/base64.js");
const uni_modules_jsencrypt_lib_lib_asn1js_hex = require("./lib/asn1js/hex.js");
const uni_modules_jsencrypt_lib_lib_asn1js_base64 = require("./lib/asn1js/base64.js");
const uni_modules_jsencrypt_lib_lib_asn1js_asn1 = require("./lib/asn1js/asn1.js");
const uni_modules_jsencrypt_lib_lib_jsbn_rsa = require("./lib/jsbn/rsa.js");
const uni_modules_jsencrypt_lib_lib_jsbn_jsbn = require("./lib/jsbn/jsbn.js");
const uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0 = require("./lib/jsrsasign/asn1-1.0.js");
var __extends = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var JSEncryptRSAKey = (
  /** @class */
  function(_super) {
    __extends(JSEncryptRSAKey2, _super);
    function JSEncryptRSAKey2(key) {
      var _this = _super.call(this) || this;
      if (key) {
        if (typeof key === "string") {
          _this.parseKey(key);
        } else if (JSEncryptRSAKey2.hasPrivateKeyProperty(key) || JSEncryptRSAKey2.hasPublicKeyProperty(key)) {
          _this.parsePropertiesFrom(key);
        }
      }
      return _this;
    }
    JSEncryptRSAKey2.prototype.parseKey = function(pem) {
      try {
        var modulus = 0;
        var public_exponent = 0;
        var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
        var der = reHex.test(pem) ? uni_modules_jsencrypt_lib_lib_asn1js_hex.Hex.decode(pem) : uni_modules_jsencrypt_lib_lib_asn1js_base64.Base64.unarmor(pem);
        var asn1 = uni_modules_jsencrypt_lib_lib_asn1js_asn1.ASN1.decode(der);
        if (asn1.sub.length === 3) {
          asn1 = asn1.sub[2].sub[0];
        }
        if (asn1.sub.length === 9) {
          modulus = asn1.sub[1].getHexStringValue();
          this.n = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(modulus, 16);
          public_exponent = asn1.sub[2].getHexStringValue();
          this.e = parseInt(public_exponent, 16);
          var private_exponent = asn1.sub[3].getHexStringValue();
          this.d = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(private_exponent, 16);
          var prime1 = asn1.sub[4].getHexStringValue();
          this.p = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(prime1, 16);
          var prime2 = asn1.sub[5].getHexStringValue();
          this.q = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(prime2, 16);
          var exponent1 = asn1.sub[6].getHexStringValue();
          this.dmp1 = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(exponent1, 16);
          var exponent2 = asn1.sub[7].getHexStringValue();
          this.dmq1 = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(exponent2, 16);
          var coefficient = asn1.sub[8].getHexStringValue();
          this.coeff = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(coefficient, 16);
        } else if (asn1.sub.length === 2) {
          if (asn1.sub[0].sub) {
            var bit_string = asn1.sub[1];
            var sequence = bit_string.sub[0];
            modulus = sequence.sub[0].getHexStringValue();
            this.n = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(modulus, 16);
            public_exponent = sequence.sub[1].getHexStringValue();
            this.e = parseInt(public_exponent, 16);
          } else {
            modulus = asn1.sub[0].getHexStringValue();
            this.n = uni_modules_jsencrypt_lib_lib_jsbn_jsbn.parseBigInt(modulus, 16);
            public_exponent = asn1.sub[1].getHexStringValue();
            this.e = parseInt(public_exponent, 16);
          }
        } else {
          return false;
        }
        return true;
      } catch (ex) {
        return false;
      }
    };
    JSEncryptRSAKey2.prototype.getPrivateBaseKey = function() {
      var options = {
        array: [
          new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERInteger({ int: 0 }),
          new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERInteger({ bigint: this.n }),
          new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERInteger({ int: this.e }),
          new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERInteger({ bigint: this.d }),
          new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERInteger({ bigint: this.p }),
          new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERInteger({ bigint: this.q }),
          new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERInteger({ bigint: this.dmp1 }),
          new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERInteger({ bigint: this.dmq1 }),
          new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERInteger({ bigint: this.coeff })
        ]
      };
      var seq = new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERSequence(options);
      return seq.getEncodedHex();
    };
    JSEncryptRSAKey2.prototype.getPrivateBaseKeyB64 = function() {
      return uni_modules_jsencrypt_lib_lib_jsbn_base64.hex2b64(this.getPrivateBaseKey());
    };
    JSEncryptRSAKey2.prototype.getPublicBaseKey = function() {
      var first_sequence = new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERSequence({
        array: [
          new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }),
          new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERNull()
        ]
      });
      var second_sequence = new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERSequence({
        array: [
          new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERInteger({ bigint: this.n }),
          new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERInteger({ int: this.e })
        ]
      });
      var bit_string = new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERBitString({
        hex: "00" + second_sequence.getEncodedHex()
      });
      var seq = new uni_modules_jsencrypt_lib_lib_jsrsasign_asn11_0.KJUR.asn1.DERSequence({
        array: [first_sequence, bit_string]
      });
      return seq.getEncodedHex();
    };
    JSEncryptRSAKey2.prototype.getPublicBaseKeyB64 = function() {
      return uni_modules_jsencrypt_lib_lib_jsbn_base64.hex2b64(this.getPublicBaseKey());
    };
    JSEncryptRSAKey2.wordwrap = function(str, width) {
      width = width || 64;
      if (!str) {
        return str;
      }
      var regex = "(.{1," + width + "})( +|$\n?)|(.{1," + width + "})";
      return str.match(RegExp(regex, "g")).join("\n");
    };
    JSEncryptRSAKey2.prototype.getPrivateKey = function() {
      var key = "-----BEGIN RSA PRIVATE KEY-----\n";
      key += JSEncryptRSAKey2.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
      key += "-----END RSA PRIVATE KEY-----";
      return key;
    };
    JSEncryptRSAKey2.prototype.getPublicKey = function() {
      var key = "-----BEGIN PUBLIC KEY-----\n";
      key += JSEncryptRSAKey2.wordwrap(this.getPublicBaseKeyB64()) + "\n";
      key += "-----END PUBLIC KEY-----";
      return key;
    };
    JSEncryptRSAKey2.hasPublicKeyProperty = function(obj) {
      obj = obj || {};
      return obj.hasOwnProperty("n") && obj.hasOwnProperty("e");
    };
    JSEncryptRSAKey2.hasPrivateKeyProperty = function(obj) {
      obj = obj || {};
      return obj.hasOwnProperty("n") && obj.hasOwnProperty("e") && obj.hasOwnProperty("d") && obj.hasOwnProperty("p") && obj.hasOwnProperty("q") && obj.hasOwnProperty("dmp1") && obj.hasOwnProperty("dmq1") && obj.hasOwnProperty("coeff");
    };
    JSEncryptRSAKey2.prototype.parsePropertiesFrom = function(obj) {
      this.n = obj.n;
      this.e = obj.e;
      if (obj.hasOwnProperty("d")) {
        this.d = obj.d;
        this.p = obj.p;
        this.q = obj.q;
        this.dmp1 = obj.dmp1;
        this.dmq1 = obj.dmq1;
        this.coeff = obj.coeff;
      }
    };
    return JSEncryptRSAKey2;
  }(uni_modules_jsencrypt_lib_lib_jsbn_rsa.RSAKey)
);
exports.JSEncryptRSAKey = JSEncryptRSAKey;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/jsencrypt/lib/JSEncryptRSAKey.js.map
