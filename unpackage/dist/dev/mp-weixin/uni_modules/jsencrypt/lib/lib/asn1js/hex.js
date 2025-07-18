"use strict";
var decoder;
var Hex = {
  decode: function(a) {
    var i;
    if (decoder === void 0) {
      var hex = "0123456789ABCDEF";
      var ignore = " \f\n\r	 \u2028\u2029";
      decoder = {};
      for (i = 0; i < 16; ++i) {
        decoder[hex.charAt(i)] = i;
      }
      hex = hex.toLowerCase();
      for (i = 10; i < 16; ++i) {
        decoder[hex.charAt(i)] = i;
      }
      for (i = 0; i < ignore.length; ++i) {
        decoder[ignore.charAt(i)] = -1;
      }
    }
    var out = [];
    var bits = 0;
    var char_count = 0;
    for (i = 0; i < a.length; ++i) {
      var c = a.charAt(i);
      if (c == "=") {
        break;
      }
      c = decoder[c];
      if (c == -1) {
        continue;
      }
      if (c === void 0) {
        throw new Error("Illegal character at offset " + i);
      }
      bits |= c;
      if (++char_count >= 2) {
        out[out.length] = bits;
        bits = 0;
        char_count = 0;
      } else {
        bits <<= 4;
      }
    }
    if (char_count) {
      throw new Error("Hex encoding incomplete: 4 bits missing");
    }
    return out;
  }
};
exports.Hex = Hex;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/jsencrypt/lib/lib/asn1js/hex.js.map
