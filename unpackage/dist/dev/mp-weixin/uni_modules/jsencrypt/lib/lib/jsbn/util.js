"use strict";
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
function int2char(n) {
  return BI_RM.charAt(n);
}
function op_and(x, y) {
  return x & y;
}
function op_or(x, y) {
  return x | y;
}
function op_xor(x, y) {
  return x ^ y;
}
function op_andnot(x, y) {
  return x & ~y;
}
function lbit(x) {
  if (x == 0) {
    return -1;
  }
  var r = 0;
  if ((x & 65535) == 0) {
    x >>= 16;
    r += 16;
  }
  if ((x & 255) == 0) {
    x >>= 8;
    r += 8;
  }
  if ((x & 15) == 0) {
    x >>= 4;
    r += 4;
  }
  if ((x & 3) == 0) {
    x >>= 2;
    r += 2;
  }
  if ((x & 1) == 0) {
    ++r;
  }
  return r;
}
function cbit(x) {
  var r = 0;
  while (x != 0) {
    x &= x - 1;
    ++r;
  }
  return r;
}
exports.cbit = cbit;
exports.int2char = int2char;
exports.lbit = lbit;
exports.op_and = op_and;
exports.op_andnot = op_andnot;
exports.op_or = op_or;
exports.op_xor = op_xor;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/jsencrypt/lib/lib/jsbn/util.js.map
