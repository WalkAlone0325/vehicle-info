"use strict";
const uni_modules_jsencrypt_lib_lib_jsbn_util = require("./util.js");
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
function hex2b64(h) {
  var i;
  var c;
  var ret = "";
  for (i = 0; i + 3 <= h.length; i += 3) {
    c = parseInt(h.substring(i, i + 3), 16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if (i + 1 == h.length) {
    c = parseInt(h.substring(i, i + 1), 16);
    ret += b64map.charAt(c << 2);
  } else if (i + 2 == h.length) {
    c = parseInt(h.substring(i, i + 2), 16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while ((ret.length & 3) > 0) {
    ret += b64pad;
  }
  return ret;
}
function b64tohex(s) {
  var ret = "";
  var i;
  var k = 0;
  var slop = 0;
  for (i = 0; i < s.length; ++i) {
    if (s.charAt(i) == b64pad) {
      break;
    }
    var v = b64map.indexOf(s.charAt(i));
    if (v < 0) {
      continue;
    }
    if (k == 0) {
      ret += uni_modules_jsencrypt_lib_lib_jsbn_util.int2char(v >> 2);
      slop = v & 3;
      k = 1;
    } else if (k == 1) {
      ret += uni_modules_jsencrypt_lib_lib_jsbn_util.int2char(slop << 2 | v >> 4);
      slop = v & 15;
      k = 2;
    } else if (k == 2) {
      ret += uni_modules_jsencrypt_lib_lib_jsbn_util.int2char(slop);
      ret += uni_modules_jsencrypt_lib_lib_jsbn_util.int2char(v >> 2);
      slop = v & 3;
      k = 3;
    } else {
      ret += uni_modules_jsencrypt_lib_lib_jsbn_util.int2char(slop << 2 | v >> 4);
      ret += uni_modules_jsencrypt_lib_lib_jsbn_util.int2char(v & 15);
      k = 0;
    }
  }
  if (k == 1) {
    ret += uni_modules_jsencrypt_lib_lib_jsbn_util.int2char(slop << 2);
  }
  return ret;
}
exports.b64tohex = b64tohex;
exports.hex2b64 = hex2b64;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/jsencrypt/lib/lib/jsbn/base64.js.map
