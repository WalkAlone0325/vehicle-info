"use strict";
var Arcfour = (
  /** @class */
  function() {
    function Arcfour2() {
      this.i = 0;
      this.j = 0;
      this.S = [];
    }
    Arcfour2.prototype.init = function(key) {
      var i;
      var j;
      var t;
      for (i = 0; i < 256; ++i) {
        this.S[i] = i;
      }
      j = 0;
      for (i = 0; i < 256; ++i) {
        j = j + this.S[i] + key[i % key.length] & 255;
        t = this.S[i];
        this.S[i] = this.S[j];
        this.S[j] = t;
      }
      this.i = 0;
      this.j = 0;
    };
    Arcfour2.prototype.next = function() {
      var t;
      this.i = this.i + 1 & 255;
      this.j = this.j + this.S[this.i] & 255;
      t = this.S[this.i];
      this.S[this.i] = this.S[this.j];
      this.S[this.j] = t;
      return this.S[t + this.S[this.i] & 255];
    };
    return Arcfour2;
  }()
);
function prng_newstate() {
  return new Arcfour();
}
var rng_psize = 256;
exports.prng_newstate = prng_newstate;
exports.rng_psize = rng_psize;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/jsencrypt/lib/lib/jsbn/prng4.js.map
