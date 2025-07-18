"use strict";
const uni_modules_jsencrypt_lib_lib_jsbn_prng4 = require("./prng4.js");
var rng_state;
var rng_pool = null;
var rng_pptr;
if (rng_pool == null) {
  rng_pool = [];
  rng_pptr = 0;
  var t = void 0;
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    var z = new Uint32Array(256);
    window.crypto.getRandomValues(z);
    for (t = 0; t < z.length; ++t) {
      rng_pool[rng_pptr++] = z[t] & 255;
    }
  }
  var count = 0;
  var onMouseMoveListener_1 = function(ev) {
    count = count || 0;
    if (count >= 256 || rng_pptr >= uni_modules_jsencrypt_lib_lib_jsbn_prng4.rng_psize) {
      if (window.removeEventListener) {
        window.removeEventListener("mousemove", onMouseMoveListener_1, false);
      } else if (window.detachEvent) {
        window.detachEvent("onmousemove", onMouseMoveListener_1);
      }
      return;
    }
    try {
      var mouseCoordinates = ev.x + ev.y;
      rng_pool[rng_pptr++] = mouseCoordinates & 255;
      count += 1;
    } catch (e) {
    }
  };
  if (typeof window !== "undefined") {
    if (window.addEventListener) {
      window.addEventListener("mousemove", onMouseMoveListener_1, false);
    } else if (window.attachEvent) {
      window.attachEvent("onmousemove", onMouseMoveListener_1);
    }
  }
}
function rng_get_byte() {
  if (rng_state == null) {
    rng_state = uni_modules_jsencrypt_lib_lib_jsbn_prng4.prng_newstate();
    while (rng_pptr < uni_modules_jsencrypt_lib_lib_jsbn_prng4.rng_psize) {
      var random = Math.floor(65536 * Math.random());
      rng_pool[rng_pptr++] = random & 255;
    }
    rng_state.init(rng_pool);
    for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
      rng_pool[rng_pptr] = 0;
    }
    rng_pptr = 0;
  }
  return rng_state.next();
}
var SecureRandom = (
  /** @class */
  function() {
    function SecureRandom2() {
    }
    SecureRandom2.prototype.nextBytes = function(ba) {
      for (var i = 0; i < ba.length; ++i) {
        ba[i] = rng_get_byte();
      }
    };
    return SecureRandom2;
  }()
);
exports.SecureRandom = SecureRandom;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/jsencrypt/lib/lib/jsbn/rng.js.map
