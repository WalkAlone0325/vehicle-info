"use strict";
const uni_modules_jsencrypt_lib_lib_jsbn_util = require("./util.js");
var dbits;
var canary = 244837814094590;
var j_lm = (canary & 16777215) == 15715070;
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
var BigInteger = (
  /** @class */
  function() {
    function BigInteger2(a, b, c) {
      if (a != null) {
        if ("number" == typeof a) {
          this.fromNumber(a, b, c);
        } else if (b == null && "string" != typeof a) {
          this.fromString(a, 256);
        } else {
          this.fromString(a, b);
        }
      }
    }
    BigInteger2.prototype.toString = function(b) {
      if (this.s < 0) {
        return "-" + this.negate().toString(b);
      }
      var k;
      if (b == 16) {
        k = 4;
      } else if (b == 8) {
        k = 3;
      } else if (b == 2) {
        k = 1;
      } else if (b == 32) {
        k = 5;
      } else if (b == 4) {
        k = 2;
      } else {
        return this.toRadix(b);
      }
      var km = (1 << k) - 1;
      var d;
      var m = false;
      var r = "";
      var i = this.t;
      var p = this.DB - i * this.DB % k;
      if (i-- > 0) {
        if (p < this.DB && (d = this[i] >> p) > 0) {
          m = true;
          r = uni_modules_jsencrypt_lib_lib_jsbn_util.int2char(d);
        }
        while (i >= 0) {
          if (p < k) {
            d = (this[i] & (1 << p) - 1) << k - p;
            d |= this[--i] >> (p += this.DB - k);
          } else {
            d = this[i] >> (p -= k) & km;
            if (p <= 0) {
              p += this.DB;
              --i;
            }
          }
          if (d > 0) {
            m = true;
          }
          if (m) {
            r += uni_modules_jsencrypt_lib_lib_jsbn_util.int2char(d);
          }
        }
      }
      return m ? r : "0";
    };
    BigInteger2.prototype.negate = function() {
      var r = nbi();
      BigInteger2.ZERO.subTo(this, r);
      return r;
    };
    BigInteger2.prototype.abs = function() {
      return this.s < 0 ? this.negate() : this;
    };
    BigInteger2.prototype.compareTo = function(a) {
      var r = this.s - a.s;
      if (r != 0) {
        return r;
      }
      var i = this.t;
      r = i - a.t;
      if (r != 0) {
        return this.s < 0 ? -r : r;
      }
      while (--i >= 0) {
        if ((r = this[i] - a[i]) != 0) {
          return r;
        }
      }
      return 0;
    };
    BigInteger2.prototype.bitLength = function() {
      if (this.t <= 0) {
        return 0;
      }
      return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
    };
    BigInteger2.prototype.mod = function(a) {
      var r = nbi();
      this.abs().divRemTo(a, null, r);
      if (this.s < 0 && r.compareTo(BigInteger2.ZERO) > 0) {
        a.subTo(r, r);
      }
      return r;
    };
    BigInteger2.prototype.modPowInt = function(e, m) {
      var z;
      if (e < 256 || m.isEven()) {
        z = new Classic(m);
      } else {
        z = new Montgomery(m);
      }
      return this.exp(e, z);
    };
    BigInteger2.prototype.clone = function() {
      var r = nbi();
      this.copyTo(r);
      return r;
    };
    BigInteger2.prototype.intValue = function() {
      if (this.s < 0) {
        if (this.t == 1) {
          return this[0] - this.DV;
        } else if (this.t == 0) {
          return -1;
        }
      } else if (this.t == 1) {
        return this[0];
      } else if (this.t == 0) {
        return 0;
      }
      return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
    };
    BigInteger2.prototype.byteValue = function() {
      return this.t == 0 ? this.s : this[0] << 24 >> 24;
    };
    BigInteger2.prototype.shortValue = function() {
      return this.t == 0 ? this.s : this[0] << 16 >> 16;
    };
    BigInteger2.prototype.signum = function() {
      if (this.s < 0) {
        return -1;
      } else if (this.t <= 0 || this.t == 1 && this[0] <= 0) {
        return 0;
      } else {
        return 1;
      }
    };
    BigInteger2.prototype.toByteArray = function() {
      var i = this.t;
      var r = [];
      r[0] = this.s;
      var p = this.DB - i * this.DB % 8;
      var d;
      var k = 0;
      if (i-- > 0) {
        if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) {
          r[k++] = d | this.s << this.DB - p;
        }
        while (i >= 0) {
          if (p < 8) {
            d = (this[i] & (1 << p) - 1) << 8 - p;
            d |= this[--i] >> (p += this.DB - 8);
          } else {
            d = this[i] >> (p -= 8) & 255;
            if (p <= 0) {
              p += this.DB;
              --i;
            }
          }
          if ((d & 128) != 0) {
            d |= -256;
          }
          if (k == 0 && (this.s & 128) != (d & 128)) {
            ++k;
          }
          if (k > 0 || d != this.s) {
            r[k++] = d;
          }
        }
      }
      return r;
    };
    BigInteger2.prototype.equals = function(a) {
      return this.compareTo(a) == 0;
    };
    BigInteger2.prototype.min = function(a) {
      return this.compareTo(a) < 0 ? this : a;
    };
    BigInteger2.prototype.max = function(a) {
      return this.compareTo(a) > 0 ? this : a;
    };
    BigInteger2.prototype.and = function(a) {
      var r = nbi();
      this.bitwiseTo(a, uni_modules_jsencrypt_lib_lib_jsbn_util.op_and, r);
      return r;
    };
    BigInteger2.prototype.or = function(a) {
      var r = nbi();
      this.bitwiseTo(a, uni_modules_jsencrypt_lib_lib_jsbn_util.op_or, r);
      return r;
    };
    BigInteger2.prototype.xor = function(a) {
      var r = nbi();
      this.bitwiseTo(a, uni_modules_jsencrypt_lib_lib_jsbn_util.op_xor, r);
      return r;
    };
    BigInteger2.prototype.andNot = function(a) {
      var r = nbi();
      this.bitwiseTo(a, uni_modules_jsencrypt_lib_lib_jsbn_util.op_andnot, r);
      return r;
    };
    BigInteger2.prototype.not = function() {
      var r = nbi();
      for (var i = 0; i < this.t; ++i) {
        r[i] = this.DM & ~this[i];
      }
      r.t = this.t;
      r.s = ~this.s;
      return r;
    };
    BigInteger2.prototype.shiftLeft = function(n) {
      var r = nbi();
      if (n < 0) {
        this.rShiftTo(-n, r);
      } else {
        this.lShiftTo(n, r);
      }
      return r;
    };
    BigInteger2.prototype.shiftRight = function(n) {
      var r = nbi();
      if (n < 0) {
        this.lShiftTo(-n, r);
      } else {
        this.rShiftTo(n, r);
      }
      return r;
    };
    BigInteger2.prototype.getLowestSetBit = function() {
      for (var i = 0; i < this.t; ++i) {
        if (this[i] != 0) {
          return i * this.DB + uni_modules_jsencrypt_lib_lib_jsbn_util.lbit(this[i]);
        }
      }
      if (this.s < 0) {
        return this.t * this.DB;
      }
      return -1;
    };
    BigInteger2.prototype.bitCount = function() {
      var r = 0;
      var x = this.s & this.DM;
      for (var i = 0; i < this.t; ++i) {
        r += uni_modules_jsencrypt_lib_lib_jsbn_util.cbit(this[i] ^ x);
      }
      return r;
    };
    BigInteger2.prototype.testBit = function(n) {
      var j = Math.floor(n / this.DB);
      if (j >= this.t) {
        return this.s != 0;
      }
      return (this[j] & 1 << n % this.DB) != 0;
    };
    BigInteger2.prototype.setBit = function(n) {
      return this.changeBit(n, uni_modules_jsencrypt_lib_lib_jsbn_util.op_or);
    };
    BigInteger2.prototype.clearBit = function(n) {
      return this.changeBit(n, uni_modules_jsencrypt_lib_lib_jsbn_util.op_andnot);
    };
    BigInteger2.prototype.flipBit = function(n) {
      return this.changeBit(n, uni_modules_jsencrypt_lib_lib_jsbn_util.op_xor);
    };
    BigInteger2.prototype.add = function(a) {
      var r = nbi();
      this.addTo(a, r);
      return r;
    };
    BigInteger2.prototype.subtract = function(a) {
      var r = nbi();
      this.subTo(a, r);
      return r;
    };
    BigInteger2.prototype.multiply = function(a) {
      var r = nbi();
      this.multiplyTo(a, r);
      return r;
    };
    BigInteger2.prototype.divide = function(a) {
      var r = nbi();
      this.divRemTo(a, r, null);
      return r;
    };
    BigInteger2.prototype.remainder = function(a) {
      var r = nbi();
      this.divRemTo(a, null, r);
      return r;
    };
    BigInteger2.prototype.divideAndRemainder = function(a) {
      var q = nbi();
      var r = nbi();
      this.divRemTo(a, q, r);
      return [q, r];
    };
    BigInteger2.prototype.modPow = function(e, m) {
      var i = e.bitLength();
      var k;
      var r = nbv(1);
      var z;
      if (i <= 0) {
        return r;
      } else if (i < 18) {
        k = 1;
      } else if (i < 48) {
        k = 3;
      } else if (i < 144) {
        k = 4;
      } else if (i < 768) {
        k = 5;
      } else {
        k = 6;
      }
      if (i < 8) {
        z = new Classic(m);
      } else if (m.isEven()) {
        z = new Barrett(m);
      } else {
        z = new Montgomery(m);
      }
      var g = [];
      var n = 3;
      var k1 = k - 1;
      var km = (1 << k) - 1;
      g[1] = z.convert(this);
      if (k > 1) {
        var g2 = nbi();
        z.sqrTo(g[1], g2);
        while (n <= km) {
          g[n] = nbi();
          z.mulTo(g2, g[n - 2], g[n]);
          n += 2;
        }
      }
      var j = e.t - 1;
      var w;
      var is1 = true;
      var r2 = nbi();
      var t;
      i = nbits(e[j]) - 1;
      while (j >= 0) {
        if (i >= k1) {
          w = e[j] >> i - k1 & km;
        } else {
          w = (e[j] & (1 << i + 1) - 1) << k1 - i;
          if (j > 0) {
            w |= e[j - 1] >> this.DB + i - k1;
          }
        }
        n = k;
        while ((w & 1) == 0) {
          w >>= 1;
          --n;
        }
        if ((i -= n) < 0) {
          i += this.DB;
          --j;
        }
        if (is1) {
          g[w].copyTo(r);
          is1 = false;
        } else {
          while (n > 1) {
            z.sqrTo(r, r2);
            z.sqrTo(r2, r);
            n -= 2;
          }
          if (n > 0) {
            z.sqrTo(r, r2);
          } else {
            t = r;
            r = r2;
            r2 = t;
          }
          z.mulTo(r2, g[w], r);
        }
        while (j >= 0 && (e[j] & 1 << i) == 0) {
          z.sqrTo(r, r2);
          t = r;
          r = r2;
          r2 = t;
          if (--i < 0) {
            i = this.DB - 1;
            --j;
          }
        }
      }
      return z.revert(r);
    };
    BigInteger2.prototype.modInverse = function(m) {
      var ac = m.isEven();
      if (this.isEven() && ac || m.signum() == 0) {
        return BigInteger2.ZERO;
      }
      var u = m.clone();
      var v = this.clone();
      var a = nbv(1);
      var b = nbv(0);
      var c = nbv(0);
      var d = nbv(1);
      while (u.signum() != 0) {
        while (u.isEven()) {
          u.rShiftTo(1, u);
          if (ac) {
            if (!a.isEven() || !b.isEven()) {
              a.addTo(this, a);
              b.subTo(m, b);
            }
            a.rShiftTo(1, a);
          } else if (!b.isEven()) {
            b.subTo(m, b);
          }
          b.rShiftTo(1, b);
        }
        while (v.isEven()) {
          v.rShiftTo(1, v);
          if (ac) {
            if (!c.isEven() || !d.isEven()) {
              c.addTo(this, c);
              d.subTo(m, d);
            }
            c.rShiftTo(1, c);
          } else if (!d.isEven()) {
            d.subTo(m, d);
          }
          d.rShiftTo(1, d);
        }
        if (u.compareTo(v) >= 0) {
          u.subTo(v, u);
          if (ac) {
            a.subTo(c, a);
          }
          b.subTo(d, b);
        } else {
          v.subTo(u, v);
          if (ac) {
            c.subTo(a, c);
          }
          d.subTo(b, d);
        }
      }
      if (v.compareTo(BigInteger2.ONE) != 0) {
        return BigInteger2.ZERO;
      }
      if (d.compareTo(m) >= 0) {
        return d.subtract(m);
      }
      if (d.signum() < 0) {
        d.addTo(m, d);
      } else {
        return d;
      }
      if (d.signum() < 0) {
        return d.add(m);
      } else {
        return d;
      }
    };
    BigInteger2.prototype.pow = function(e) {
      return this.exp(e, new NullExp());
    };
    BigInteger2.prototype.gcd = function(a) {
      var x = this.s < 0 ? this.negate() : this.clone();
      var y = a.s < 0 ? a.negate() : a.clone();
      if (x.compareTo(y) < 0) {
        var t = x;
        x = y;
        y = t;
      }
      var i = x.getLowestSetBit();
      var g = y.getLowestSetBit();
      if (g < 0) {
        return x;
      }
      if (i < g) {
        g = i;
      }
      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      }
      while (x.signum() > 0) {
        if ((i = x.getLowestSetBit()) > 0) {
          x.rShiftTo(i, x);
        }
        if ((i = y.getLowestSetBit()) > 0) {
          y.rShiftTo(i, y);
        }
        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }
      }
      if (g > 0) {
        y.lShiftTo(g, y);
      }
      return y;
    };
    BigInteger2.prototype.isProbablePrime = function(t) {
      var i;
      var x = this.abs();
      if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
        for (i = 0; i < lowprimes.length; ++i) {
          if (x[0] == lowprimes[i]) {
            return true;
          }
        }
        return false;
      }
      if (x.isEven()) {
        return false;
      }
      i = 1;
      while (i < lowprimes.length) {
        var m = lowprimes[i];
        var j = i + 1;
        while (j < lowprimes.length && m < lplim) {
          m *= lowprimes[j++];
        }
        m = x.modInt(m);
        while (i < j) {
          if (m % lowprimes[i++] == 0) {
            return false;
          }
        }
      }
      return x.millerRabin(t);
    };
    BigInteger2.prototype.copyTo = function(r) {
      for (var i = this.t - 1; i >= 0; --i) {
        r[i] = this[i];
      }
      r.t = this.t;
      r.s = this.s;
    };
    BigInteger2.prototype.fromInt = function(x) {
      this.t = 1;
      this.s = x < 0 ? -1 : 0;
      if (x > 0) {
        this[0] = x;
      } else if (x < -1) {
        this[0] = x + this.DV;
      } else {
        this.t = 0;
      }
    };
    BigInteger2.prototype.fromString = function(s, b) {
      var k;
      if (b == 16) {
        k = 4;
      } else if (b == 8) {
        k = 3;
      } else if (b == 256) {
        k = 8;
      } else if (b == 2) {
        k = 1;
      } else if (b == 32) {
        k = 5;
      } else if (b == 4) {
        k = 2;
      } else {
        this.fromRadix(s, b);
        return;
      }
      this.t = 0;
      this.s = 0;
      var i = s.length;
      var mi = false;
      var sh = 0;
      while (--i >= 0) {
        var x = k == 8 ? +s[i] & 255 : intAt(s, i);
        if (x < 0) {
          if (s.charAt(i) == "-") {
            mi = true;
          }
          continue;
        }
        mi = false;
        if (sh == 0) {
          this[this.t++] = x;
        } else if (sh + k > this.DB) {
          this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
          this[this.t++] = x >> this.DB - sh;
        } else {
          this[this.t - 1] |= x << sh;
        }
        sh += k;
        if (sh >= this.DB) {
          sh -= this.DB;
        }
      }
      if (k == 8 && (+s[0] & 128) != 0) {
        this.s = -1;
        if (sh > 0) {
          this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
        }
      }
      this.clamp();
      if (mi) {
        BigInteger2.ZERO.subTo(this, this);
      }
    };
    BigInteger2.prototype.clamp = function() {
      var c = this.s & this.DM;
      while (this.t > 0 && this[this.t - 1] == c) {
        --this.t;
      }
    };
    BigInteger2.prototype.dlShiftTo = function(n, r) {
      var i;
      for (i = this.t - 1; i >= 0; --i) {
        r[i + n] = this[i];
      }
      for (i = n - 1; i >= 0; --i) {
        r[i] = 0;
      }
      r.t = this.t + n;
      r.s = this.s;
    };
    BigInteger2.prototype.drShiftTo = function(n, r) {
      for (var i = n; i < this.t; ++i) {
        r[i - n] = this[i];
      }
      r.t = Math.max(this.t - n, 0);
      r.s = this.s;
    };
    BigInteger2.prototype.lShiftTo = function(n, r) {
      var bs = n % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << cbs) - 1;
      var ds = Math.floor(n / this.DB);
      var c = this.s << bs & this.DM;
      for (var i = this.t - 1; i >= 0; --i) {
        r[i + ds + 1] = this[i] >> cbs | c;
        c = (this[i] & bm) << bs;
      }
      for (var i = ds - 1; i >= 0; --i) {
        r[i] = 0;
      }
      r[ds] = c;
      r.t = this.t + ds + 1;
      r.s = this.s;
      r.clamp();
    };
    BigInteger2.prototype.rShiftTo = function(n, r) {
      r.s = this.s;
      var ds = Math.floor(n / this.DB);
      if (ds >= this.t) {
        r.t = 0;
        return;
      }
      var bs = n % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << bs) - 1;
      r[0] = this[ds] >> bs;
      for (var i = ds + 1; i < this.t; ++i) {
        r[i - ds - 1] |= (this[i] & bm) << cbs;
        r[i - ds] = this[i] >> bs;
      }
      if (bs > 0) {
        r[this.t - ds - 1] |= (this.s & bm) << cbs;
      }
      r.t = this.t - ds;
      r.clamp();
    };
    BigInteger2.prototype.subTo = function(a, r) {
      var i = 0;
      var c = 0;
      var m = Math.min(a.t, this.t);
      while (i < m) {
        c += this[i] - a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      if (a.t < this.t) {
        c -= a.s;
        while (i < this.t) {
          c += this[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += this.s;
      } else {
        c += this.s;
        while (i < a.t) {
          c -= a[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        c -= a.s;
      }
      r.s = c < 0 ? -1 : 0;
      if (c < -1) {
        r[i++] = this.DV + c;
      } else if (c > 0) {
        r[i++] = c;
      }
      r.t = i;
      r.clamp();
    };
    BigInteger2.prototype.multiplyTo = function(a, r) {
      var x = this.abs();
      var y = a.abs();
      var i = x.t;
      r.t = i + y.t;
      while (--i >= 0) {
        r[i] = 0;
      }
      for (i = 0; i < y.t; ++i) {
        r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
      }
      r.s = 0;
      r.clamp();
      if (this.s != a.s) {
        BigInteger2.ZERO.subTo(r, r);
      }
    };
    BigInteger2.prototype.squareTo = function(r) {
      var x = this.abs();
      var i = r.t = 2 * x.t;
      while (--i >= 0) {
        r[i] = 0;
      }
      for (i = 0; i < x.t - 1; ++i) {
        var c = x.am(i, x[i], r, 2 * i, 0, 1);
        if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
          r[i + x.t] -= x.DV;
          r[i + x.t + 1] = 1;
        }
      }
      if (r.t > 0) {
        r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
      }
      r.s = 0;
      r.clamp();
    };
    BigInteger2.prototype.divRemTo = function(m, q, r) {
      var pm = m.abs();
      if (pm.t <= 0) {
        return;
      }
      var pt = this.abs();
      if (pt.t < pm.t) {
        if (q != null) {
          q.fromInt(0);
        }
        if (r != null) {
          this.copyTo(r);
        }
        return;
      }
      if (r == null) {
        r = nbi();
      }
      var y = nbi();
      var ts = this.s;
      var ms = m.s;
      var nsh = this.DB - nbits(pm[pm.t - 1]);
      if (nsh > 0) {
        pm.lShiftTo(nsh, y);
        pt.lShiftTo(nsh, r);
      } else {
        pm.copyTo(y);
        pt.copyTo(r);
      }
      var ys = y.t;
      var y0 = y[ys - 1];
      if (y0 == 0) {
        return;
      }
      var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
      var d1 = this.FV / yt;
      var d2 = (1 << this.F1) / yt;
      var e = 1 << this.F2;
      var i = r.t;
      var j = i - ys;
      var t = q == null ? nbi() : q;
      y.dlShiftTo(j, t);
      if (r.compareTo(t) >= 0) {
        r[r.t++] = 1;
        r.subTo(t, r);
      }
      BigInteger2.ONE.dlShiftTo(ys, t);
      t.subTo(y, y);
      while (y.t < ys) {
        y[y.t++] = 0;
      }
      while (--j >= 0) {
        var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
        if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
          y.dlShiftTo(j, t);
          r.subTo(t, r);
          while (r[i] < --qd) {
            r.subTo(t, r);
          }
        }
      }
      if (q != null) {
        r.drShiftTo(ys, q);
        if (ts != ms) {
          BigInteger2.ZERO.subTo(q, q);
        }
      }
      r.t = ys;
      r.clamp();
      if (nsh > 0) {
        r.rShiftTo(nsh, r);
      }
      if (ts < 0) {
        BigInteger2.ZERO.subTo(r, r);
      }
    };
    BigInteger2.prototype.invDigit = function() {
      if (this.t < 1) {
        return 0;
      }
      var x = this[0];
      if ((x & 1) == 0) {
        return 0;
      }
      var y = x & 3;
      y = y * (2 - (x & 15) * y) & 15;
      y = y * (2 - (x & 255) * y) & 255;
      y = y * (2 - ((x & 65535) * y & 65535)) & 65535;
      y = y * (2 - x * y % this.DV) % this.DV;
      return y > 0 ? this.DV - y : -y;
    };
    BigInteger2.prototype.isEven = function() {
      return (this.t > 0 ? this[0] & 1 : this.s) == 0;
    };
    BigInteger2.prototype.exp = function(e, z) {
      if (e > 4294967295 || e < 1) {
        return BigInteger2.ONE;
      }
      var r = nbi();
      var r2 = nbi();
      var g = z.convert(this);
      var i = nbits(e) - 1;
      g.copyTo(r);
      while (--i >= 0) {
        z.sqrTo(r, r2);
        if ((e & 1 << i) > 0) {
          z.mulTo(r2, g, r);
        } else {
          var t = r;
          r = r2;
          r2 = t;
        }
      }
      return z.revert(r);
    };
    BigInteger2.prototype.chunkSize = function(r) {
      return Math.floor(Math.LN2 * this.DB / Math.log(r));
    };
    BigInteger2.prototype.toRadix = function(b) {
      if (b == null) {
        b = 10;
      }
      if (this.signum() == 0 || b < 2 || b > 36) {
        return "0";
      }
      var cs = this.chunkSize(b);
      var a = Math.pow(b, cs);
      var d = nbv(a);
      var y = nbi();
      var z = nbi();
      var r = "";
      this.divRemTo(d, y, z);
      while (y.signum() > 0) {
        r = (a + z.intValue()).toString(b).substr(1) + r;
        y.divRemTo(d, y, z);
      }
      return z.intValue().toString(b) + r;
    };
    BigInteger2.prototype.fromRadix = function(s, b) {
      this.fromInt(0);
      if (b == null) {
        b = 10;
      }
      var cs = this.chunkSize(b);
      var d = Math.pow(b, cs);
      var mi = false;
      var j = 0;
      var w = 0;
      for (var i = 0; i < s.length; ++i) {
        var x = intAt(s, i);
        if (x < 0) {
          if (s.charAt(i) == "-" && this.signum() == 0) {
            mi = true;
          }
          continue;
        }
        w = b * w + x;
        if (++j >= cs) {
          this.dMultiply(d);
          this.dAddOffset(w, 0);
          j = 0;
          w = 0;
        }
      }
      if (j > 0) {
        this.dMultiply(Math.pow(b, j));
        this.dAddOffset(w, 0);
      }
      if (mi) {
        BigInteger2.ZERO.subTo(this, this);
      }
    };
    BigInteger2.prototype.fromNumber = function(a, b, c) {
      if ("number" == typeof b) {
        if (a < 2) {
          this.fromInt(1);
        } else {
          this.fromNumber(a, c);
          if (!this.testBit(a - 1)) {
            this.bitwiseTo(BigInteger2.ONE.shiftLeft(a - 1), uni_modules_jsencrypt_lib_lib_jsbn_util.op_or, this);
          }
          if (this.isEven()) {
            this.dAddOffset(1, 0);
          }
          while (!this.isProbablePrime(b)) {
            this.dAddOffset(2, 0);
            if (this.bitLength() > a) {
              this.subTo(BigInteger2.ONE.shiftLeft(a - 1), this);
            }
          }
        }
      } else {
        var x = [];
        var t = a & 7;
        x.length = (a >> 3) + 1;
        b.nextBytes(x);
        if (t > 0) {
          x[0] &= (1 << t) - 1;
        } else {
          x[0] = 0;
        }
        this.fromString(x, 256);
      }
    };
    BigInteger2.prototype.bitwiseTo = function(a, op, r) {
      var i;
      var f;
      var m = Math.min(a.t, this.t);
      for (i = 0; i < m; ++i) {
        r[i] = op(this[i], a[i]);
      }
      if (a.t < this.t) {
        f = a.s & this.DM;
        for (i = m; i < this.t; ++i) {
          r[i] = op(this[i], f);
        }
        r.t = this.t;
      } else {
        f = this.s & this.DM;
        for (i = m; i < a.t; ++i) {
          r[i] = op(f, a[i]);
        }
        r.t = a.t;
      }
      r.s = op(this.s, a.s);
      r.clamp();
    };
    BigInteger2.prototype.changeBit = function(n, op) {
      var r = BigInteger2.ONE.shiftLeft(n);
      this.bitwiseTo(r, op, r);
      return r;
    };
    BigInteger2.prototype.addTo = function(a, r) {
      var i = 0;
      var c = 0;
      var m = Math.min(a.t, this.t);
      while (i < m) {
        c += this[i] + a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      if (a.t < this.t) {
        c += a.s;
        while (i < this.t) {
          c += this[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += this.s;
      } else {
        c += this.s;
        while (i < a.t) {
          c += a[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += a.s;
      }
      r.s = c < 0 ? -1 : 0;
      if (c > 0) {
        r[i++] = c;
      } else if (c < -1) {
        r[i++] = this.DV + c;
      }
      r.t = i;
      r.clamp();
    };
    BigInteger2.prototype.dMultiply = function(n) {
      this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
      ++this.t;
      this.clamp();
    };
    BigInteger2.prototype.dAddOffset = function(n, w) {
      if (n == 0) {
        return;
      }
      while (this.t <= w) {
        this[this.t++] = 0;
      }
      this[w] += n;
      while (this[w] >= this.DV) {
        this[w] -= this.DV;
        if (++w >= this.t) {
          this[this.t++] = 0;
        }
        ++this[w];
      }
    };
    BigInteger2.prototype.multiplyLowerTo = function(a, n, r) {
      var i = Math.min(this.t + a.t, n);
      r.s = 0;
      r.t = i;
      while (i > 0) {
        r[--i] = 0;
      }
      for (var j = r.t - this.t; i < j; ++i) {
        r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
      }
      for (var j = Math.min(a.t, n); i < j; ++i) {
        this.am(0, a[i], r, i, 0, n - i);
      }
      r.clamp();
    };
    BigInteger2.prototype.multiplyUpperTo = function(a, n, r) {
      --n;
      var i = r.t = this.t + a.t - n;
      r.s = 0;
      while (--i >= 0) {
        r[i] = 0;
      }
      for (i = Math.max(n - this.t, 0); i < a.t; ++i) {
        r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
      }
      r.clamp();
      r.drShiftTo(1, r);
    };
    BigInteger2.prototype.modInt = function(n) {
      if (n <= 0) {
        return 0;
      }
      var d = this.DV % n;
      var r = this.s < 0 ? n - 1 : 0;
      if (this.t > 0) {
        if (d == 0) {
          r = this[0] % n;
        } else {
          for (var i = this.t - 1; i >= 0; --i) {
            r = (d * r + this[i]) % n;
          }
        }
      }
      return r;
    };
    BigInteger2.prototype.millerRabin = function(t) {
      var n1 = this.subtract(BigInteger2.ONE);
      var k = n1.getLowestSetBit();
      if (k <= 0) {
        return false;
      }
      var r = n1.shiftRight(k);
      t = t + 1 >> 1;
      if (t > lowprimes.length) {
        t = lowprimes.length;
      }
      var a = nbi();
      for (var i = 0; i < t; ++i) {
        a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var y = a.modPow(r, this);
        if (y.compareTo(BigInteger2.ONE) != 0 && y.compareTo(n1) != 0) {
          var j = 1;
          while (j++ < k && y.compareTo(n1) != 0) {
            y = y.modPowInt(2, this);
            if (y.compareTo(BigInteger2.ONE) == 0) {
              return false;
            }
          }
          if (y.compareTo(n1) != 0) {
            return false;
          }
        }
      }
      return true;
    };
    BigInteger2.prototype.square = function() {
      var r = nbi();
      this.squareTo(r);
      return r;
    };
    BigInteger2.prototype.gcda = function(a, callback) {
      var x = this.s < 0 ? this.negate() : this.clone();
      var y = a.s < 0 ? a.negate() : a.clone();
      if (x.compareTo(y) < 0) {
        var t = x;
        x = y;
        y = t;
      }
      var i = x.getLowestSetBit();
      var g = y.getLowestSetBit();
      if (g < 0) {
        callback(x);
        return;
      }
      if (i < g) {
        g = i;
      }
      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      }
      var gcda1 = function() {
        if ((i = x.getLowestSetBit()) > 0) {
          x.rShiftTo(i, x);
        }
        if ((i = y.getLowestSetBit()) > 0) {
          y.rShiftTo(i, y);
        }
        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }
        if (!(x.signum() > 0)) {
          if (g > 0) {
            y.lShiftTo(g, y);
          }
          setTimeout(function() {
            callback(y);
          }, 0);
        } else {
          setTimeout(gcda1, 0);
        }
      };
      setTimeout(gcda1, 10);
    };
    BigInteger2.prototype.fromNumberAsync = function(a, b, c, callback) {
      if ("number" == typeof b) {
        if (a < 2) {
          this.fromInt(1);
        } else {
          this.fromNumber(a, c);
          if (!this.testBit(a - 1)) {
            this.bitwiseTo(BigInteger2.ONE.shiftLeft(a - 1), uni_modules_jsencrypt_lib_lib_jsbn_util.op_or, this);
          }
          if (this.isEven()) {
            this.dAddOffset(1, 0);
          }
          var bnp_1 = this;
          var bnpfn1_1 = function() {
            bnp_1.dAddOffset(2, 0);
            if (bnp_1.bitLength() > a) {
              bnp_1.subTo(BigInteger2.ONE.shiftLeft(a - 1), bnp_1);
            }
            if (bnp_1.isProbablePrime(b)) {
              setTimeout(function() {
                callback();
              }, 0);
            } else {
              setTimeout(bnpfn1_1, 0);
            }
          };
          setTimeout(bnpfn1_1, 0);
        }
      } else {
        var x = [];
        var t = a & 7;
        x.length = (a >> 3) + 1;
        b.nextBytes(x);
        if (t > 0) {
          x[0] &= (1 << t) - 1;
        } else {
          x[0] = 0;
        }
        this.fromString(x, 256);
      }
    };
    return BigInteger2;
  }()
);
var NullExp = (
  /** @class */
  function() {
    function NullExp2() {
    }
    NullExp2.prototype.convert = function(x) {
      return x;
    };
    NullExp2.prototype.revert = function(x) {
      return x;
    };
    NullExp2.prototype.mulTo = function(x, y, r) {
      x.multiplyTo(y, r);
    };
    NullExp2.prototype.sqrTo = function(x, r) {
      x.squareTo(r);
    };
    return NullExp2;
  }()
);
var Classic = (
  /** @class */
  function() {
    function Classic2(m) {
      this.m = m;
    }
    Classic2.prototype.convert = function(x) {
      if (x.s < 0 || x.compareTo(this.m) >= 0) {
        return x.mod(this.m);
      } else {
        return x;
      }
    };
    Classic2.prototype.revert = function(x) {
      return x;
    };
    Classic2.prototype.reduce = function(x) {
      x.divRemTo(this.m, null, x);
    };
    Classic2.prototype.mulTo = function(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    };
    Classic2.prototype.sqrTo = function(x, r) {
      x.squareTo(r);
      this.reduce(r);
    };
    return Classic2;
  }()
);
var Montgomery = (
  /** @class */
  function() {
    function Montgomery2(m) {
      this.m = m;
      this.mp = m.invDigit();
      this.mpl = this.mp & 32767;
      this.mph = this.mp >> 15;
      this.um = (1 << m.DB - 15) - 1;
      this.mt2 = 2 * m.t;
    }
    Montgomery2.prototype.convert = function(x) {
      var r = nbi();
      x.abs().dlShiftTo(this.m.t, r);
      r.divRemTo(this.m, null, r);
      if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
        this.m.subTo(r, r);
      }
      return r;
    };
    Montgomery2.prototype.revert = function(x) {
      var r = nbi();
      x.copyTo(r);
      this.reduce(r);
      return r;
    };
    Montgomery2.prototype.reduce = function(x) {
      while (x.t <= this.mt2) {
        x[x.t++] = 0;
      }
      for (var i = 0; i < this.m.t; ++i) {
        var j = x[i] & 32767;
        var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
        j = i + this.m.t;
        x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
        while (x[j] >= x.DV) {
          x[j] -= x.DV;
          x[++j]++;
        }
      }
      x.clamp();
      x.drShiftTo(this.m.t, x);
      if (x.compareTo(this.m) >= 0) {
        x.subTo(this.m, x);
      }
    };
    Montgomery2.prototype.mulTo = function(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    };
    Montgomery2.prototype.sqrTo = function(x, r) {
      x.squareTo(r);
      this.reduce(r);
    };
    return Montgomery2;
  }()
);
var Barrett = (
  /** @class */
  function() {
    function Barrett2(m) {
      this.m = m;
      this.r2 = nbi();
      this.q3 = nbi();
      BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
      this.mu = this.r2.divide(m);
    }
    Barrett2.prototype.convert = function(x) {
      if (x.s < 0 || x.t > 2 * this.m.t) {
        return x.mod(this.m);
      } else if (x.compareTo(this.m) < 0) {
        return x;
      } else {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
      }
    };
    Barrett2.prototype.revert = function(x) {
      return x;
    };
    Barrett2.prototype.reduce = function(x) {
      x.drShiftTo(this.m.t - 1, this.r2);
      if (x.t > this.m.t + 1) {
        x.t = this.m.t + 1;
        x.clamp();
      }
      this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
      this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
      while (x.compareTo(this.r2) < 0) {
        x.dAddOffset(1, this.m.t + 1);
      }
      x.subTo(this.r2, x);
      while (x.compareTo(this.m) >= 0) {
        x.subTo(this.m, x);
      }
    };
    Barrett2.prototype.mulTo = function(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    };
    Barrett2.prototype.sqrTo = function(x, r) {
      x.squareTo(r);
      this.reduce(r);
    };
    return Barrett2;
  }()
);
function nbi() {
  return new BigInteger(null);
}
function parseBigInt(str, r) {
  return new BigInteger(str, r);
}
var inBrowser = typeof navigator !== "undefined";
if (inBrowser && j_lm && navigator.appName == "Microsoft Internet Explorer") {
  BigInteger.prototype.am = function am2(i, x, w, j, c, n) {
    var xl = x & 32767;
    var xh = x >> 15;
    while (--n >= 0) {
      var l = this[i] & 32767;
      var h = this[i++] >> 15;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 32767) << 15) + w[j] + (c & 1073741823);
      c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
      w[j++] = l & 1073741823;
    }
    return c;
  };
  dbits = 30;
} else if (inBrowser && j_lm && navigator.appName != "Netscape") {
  BigInteger.prototype.am = function am1(i, x, w, j, c, n) {
    while (--n >= 0) {
      var v = x * this[i++] + w[j] + c;
      c = Math.floor(v / 67108864);
      w[j++] = v & 67108863;
    }
    return c;
  };
  dbits = 26;
} else {
  BigInteger.prototype.am = function am3(i, x, w, j, c, n) {
    var xl = x & 16383;
    var xh = x >> 14;
    while (--n >= 0) {
      var l = this[i] & 16383;
      var h = this[i++] >> 14;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 16383) << 14) + w[j] + c;
      c = (l >> 28) + (m >> 14) + xh * h;
      w[j++] = l & 268435455;
    }
    return c;
  };
  dbits = 28;
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RC = [];
var rr;
var vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
  BI_RC[rr++] = vv;
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
function intAt(s, i) {
  var c = BI_RC[s.charCodeAt(i)];
  return c == null ? -1 : c;
}
function nbv(i) {
  var r = nbi();
  r.fromInt(i);
  return r;
}
function nbits(x) {
  var r = 1;
  var t;
  if ((t = x >>> 16) != 0) {
    x = t;
    r += 16;
  }
  if ((t = x >> 8) != 0) {
    x = t;
    r += 8;
  }
  if ((t = x >> 4) != 0) {
    x = t;
    r += 4;
  }
  if ((t = x >> 2) != 0) {
    x = t;
    r += 2;
  }
  if ((t = x >> 1) != 0) {
    x = t;
    r += 1;
  }
  return r;
}
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
exports.BigInteger = BigInteger;
exports.nbi = nbi;
exports.parseBigInt = parseBigInt;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/jsencrypt/lib/lib/jsbn/jsbn.js.map
