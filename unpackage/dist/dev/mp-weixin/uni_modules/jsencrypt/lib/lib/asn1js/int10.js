"use strict";
var max = 1e13;
var Int10 = (
  /** @class */
  function() {
    function Int102(value) {
      this.buf = [+value || 0];
    }
    Int102.prototype.mulAdd = function(m, c) {
      var b = this.buf;
      var l = b.length;
      var i;
      var t;
      for (i = 0; i < l; ++i) {
        t = b[i] * m + c;
        if (t < max) {
          c = 0;
        } else {
          c = 0 | t / max;
          t -= c * max;
        }
        b[i] = t;
      }
      if (c > 0) {
        b[i] = c;
      }
    };
    Int102.prototype.sub = function(c) {
      var b = this.buf;
      var l = b.length;
      var i;
      var t;
      for (i = 0; i < l; ++i) {
        t = b[i] - c;
        if (t < 0) {
          t += max;
          c = 1;
        } else {
          c = 0;
        }
        b[i] = t;
      }
      while (b[b.length - 1] === 0) {
        b.pop();
      }
    };
    Int102.prototype.toString = function(base) {
      if ((base || 10) != 10) {
        throw new Error("only base 10 is supported");
      }
      var b = this.buf;
      var s = b[b.length - 1].toString();
      for (var i = b.length - 2; i >= 0; --i) {
        s += (max + b[i]).toString().substring(1);
      }
      return s;
    };
    Int102.prototype.valueOf = function() {
      var b = this.buf;
      var v = 0;
      for (var i = b.length - 1; i >= 0; --i) {
        v = v * max + b[i];
      }
      return v;
    };
    Int102.prototype.simplify = function() {
      var b = this.buf;
      return b.length == 1 ? b[0] : this;
    };
    return Int102;
  }()
);
exports.Int10 = Int10;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/jsencrypt/lib/lib/asn1js/int10.js.map
