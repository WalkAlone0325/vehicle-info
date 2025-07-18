"use strict";
const uni_modules_jsencrypt_lib_lib_asn1js_int10 = require("./int10.js");
var ellipsis = "…";
var reTimeS = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
var reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
function stringCut(str, len) {
  if (str.length > len) {
    str = str.substring(0, len) + ellipsis;
  }
  return str;
}
var Stream = (
  /** @class */
  function() {
    function Stream2(enc, pos) {
      this.hexDigits = "0123456789ABCDEF";
      if (enc instanceof Stream2) {
        this.enc = enc.enc;
        this.pos = enc.pos;
      } else {
        this.enc = enc;
        this.pos = pos;
      }
    }
    Stream2.prototype.get = function(pos) {
      if (pos === void 0) {
        pos = this.pos++;
      }
      if (pos >= this.enc.length) {
        throw new Error("Requesting byte offset ".concat(pos, " on a stream of length ").concat(this.enc.length));
      }
      return "string" === typeof this.enc ? this.enc.charCodeAt(pos) : this.enc[pos];
    };
    Stream2.prototype.hexByte = function(b) {
      return this.hexDigits.charAt(b >> 4 & 15) + this.hexDigits.charAt(b & 15);
    };
    Stream2.prototype.hexDump = function(start, end, raw) {
      var s = "";
      for (var i = start; i < end; ++i) {
        s += this.hexByte(this.get(i));
        if (raw !== true) {
          switch (i & 15) {
            case 7:
              s += "  ";
              break;
            case 15:
              s += "\n";
              break;
            default:
              s += " ";
          }
        }
      }
      return s;
    };
    Stream2.prototype.isASCII = function(start, end) {
      for (var i = start; i < end; ++i) {
        var c = this.get(i);
        if (c < 32 || c > 176) {
          return false;
        }
      }
      return true;
    };
    Stream2.prototype.parseStringISO = function(start, end) {
      var s = "";
      for (var i = start; i < end; ++i) {
        s += String.fromCharCode(this.get(i));
      }
      return s;
    };
    Stream2.prototype.parseStringUTF = function(start, end) {
      var s = "";
      for (var i = start; i < end; ) {
        var c = this.get(i++);
        if (c < 128) {
          s += String.fromCharCode(c);
        } else if (c > 191 && c < 224) {
          s += String.fromCharCode((c & 31) << 6 | this.get(i++) & 63);
        } else {
          s += String.fromCharCode((c & 15) << 12 | (this.get(i++) & 63) << 6 | this.get(i++) & 63);
        }
      }
      return s;
    };
    Stream2.prototype.parseStringBMP = function(start, end) {
      var str = "";
      var hi;
      var lo;
      for (var i = start; i < end; ) {
        hi = this.get(i++);
        lo = this.get(i++);
        str += String.fromCharCode(hi << 8 | lo);
      }
      return str;
    };
    Stream2.prototype.parseTime = function(start, end, shortYear) {
      var s = this.parseStringISO(start, end);
      var m = (shortYear ? reTimeS : reTimeL).exec(s);
      if (!m) {
        return "Unrecognized time: " + s;
      }
      if (shortYear) {
        m[1] = +m[1];
        m[1] += +m[1] < 70 ? 2e3 : 1900;
      }
      s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
      if (m[5]) {
        s += ":" + m[5];
        if (m[6]) {
          s += ":" + m[6];
          if (m[7]) {
            s += "." + m[7];
          }
        }
      }
      if (m[8]) {
        s += " UTC";
        if (m[8] != "Z") {
          s += m[8];
          if (m[9]) {
            s += ":" + m[9];
          }
        }
      }
      return s;
    };
    Stream2.prototype.parseInteger = function(start, end) {
      var v = this.get(start);
      var neg = v > 127;
      var pad = neg ? 255 : 0;
      var len;
      var s = "";
      while (v == pad && ++start < end) {
        v = this.get(start);
      }
      len = end - start;
      if (len === 0) {
        return neg ? -1 : 0;
      }
      if (len > 4) {
        s = v;
        len <<= 3;
        while (((+s ^ pad) & 128) == 0) {
          s = +s << 1;
          --len;
        }
        s = "(" + len + " bit)\n";
      }
      if (neg) {
        v = v - 256;
      }
      var n = new uni_modules_jsencrypt_lib_lib_asn1js_int10.Int10(v);
      for (var i = start + 1; i < end; ++i) {
        n.mulAdd(256, this.get(i));
      }
      return s + n.toString();
    };
    Stream2.prototype.parseBitString = function(start, end, maxLength) {
      var unusedBit = this.get(start);
      var lenBit = (end - start - 1 << 3) - unusedBit;
      var intro = "(" + lenBit + " bit)\n";
      var s = "";
      for (var i = start + 1; i < end; ++i) {
        var b = this.get(i);
        var skip = i == end - 1 ? unusedBit : 0;
        for (var j = 7; j >= skip; --j) {
          s += b >> j & 1 ? "1" : "0";
        }
        if (s.length > maxLength) {
          return intro + stringCut(s, maxLength);
        }
      }
      return intro + s;
    };
    Stream2.prototype.parseOctetString = function(start, end, maxLength) {
      if (this.isASCII(start, end)) {
        return stringCut(this.parseStringISO(start, end), maxLength);
      }
      var len = end - start;
      var s = "(" + len + " byte)\n";
      maxLength /= 2;
      if (len > maxLength) {
        end = start + maxLength;
      }
      for (var i = start; i < end; ++i) {
        s += this.hexByte(this.get(i));
      }
      if (len > maxLength) {
        s += ellipsis;
      }
      return s;
    };
    Stream2.prototype.parseOID = function(start, end, maxLength) {
      var s = "";
      var n = new uni_modules_jsencrypt_lib_lib_asn1js_int10.Int10();
      var bits = 0;
      for (var i = start; i < end; ++i) {
        var v = this.get(i);
        n.mulAdd(128, v & 127);
        bits += 7;
        if (!(v & 128)) {
          if (s === "") {
            n = n.simplify();
            if (n instanceof uni_modules_jsencrypt_lib_lib_asn1js_int10.Int10) {
              n.sub(80);
              s = "2." + n.toString();
            } else {
              var m = n < 80 ? n < 40 ? 0 : 1 : 2;
              s = m + "." + (n - m * 40);
            }
          } else {
            s += "." + n.toString();
          }
          if (s.length > maxLength) {
            return stringCut(s, maxLength);
          }
          n = new uni_modules_jsencrypt_lib_lib_asn1js_int10.Int10();
          bits = 0;
        }
      }
      if (bits > 0) {
        s += ".incomplete";
      }
      return s;
    };
    return Stream2;
  }()
);
var ASN1 = (
  /** @class */
  function() {
    function ASN12(stream, header, length, tag, sub) {
      if (!(tag instanceof ASN1Tag)) {
        throw new Error("Invalid tag value.");
      }
      this.stream = stream;
      this.header = header;
      this.length = length;
      this.tag = tag;
      this.sub = sub;
    }
    ASN12.prototype.typeName = function() {
      switch (this.tag.tagClass) {
        case 0:
          switch (this.tag.tagNumber) {
            case 0:
              return "EOC";
            case 1:
              return "BOOLEAN";
            case 2:
              return "INTEGER";
            case 3:
              return "BIT_STRING";
            case 4:
              return "OCTET_STRING";
            case 5:
              return "NULL";
            case 6:
              return "OBJECT_IDENTIFIER";
            case 7:
              return "ObjectDescriptor";
            case 8:
              return "EXTERNAL";
            case 9:
              return "REAL";
            case 10:
              return "ENUMERATED";
            case 11:
              return "EMBEDDED_PDV";
            case 12:
              return "UTF8String";
            case 16:
              return "SEQUENCE";
            case 17:
              return "SET";
            case 18:
              return "NumericString";
            case 19:
              return "PrintableString";
            case 20:
              return "TeletexString";
            case 21:
              return "VideotexString";
            case 22:
              return "IA5String";
            case 23:
              return "UTCTime";
            case 24:
              return "GeneralizedTime";
            case 25:
              return "GraphicString";
            case 26:
              return "VisibleString";
            case 27:
              return "GeneralString";
            case 28:
              return "UniversalString";
            case 30:
              return "BMPString";
          }
          return "Universal_" + this.tag.tagNumber.toString();
        case 1:
          return "Application_" + this.tag.tagNumber.toString();
        case 2:
          return "[" + this.tag.tagNumber.toString() + "]";
        case 3:
          return "Private_" + this.tag.tagNumber.toString();
      }
    };
    ASN12.prototype.content = function(maxLength) {
      if (this.tag === void 0) {
        return null;
      }
      if (maxLength === void 0) {
        maxLength = Infinity;
      }
      var content = this.posContent();
      var len = Math.abs(this.length);
      if (!this.tag.isUniversal()) {
        if (this.sub !== null) {
          return "(" + this.sub.length + " elem)";
        }
        return this.stream.parseOctetString(content, content + len, maxLength);
      }
      switch (this.tag.tagNumber) {
        case 1:
          return this.stream.get(content) === 0 ? "false" : "true";
        case 2:
          return this.stream.parseInteger(content, content + len);
        case 3:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(content, content + len, maxLength);
        case 4:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(content, content + len, maxLength);
        case 6:
          return this.stream.parseOID(content, content + len, maxLength);
        case 16:
        case 17:
          if (this.sub !== null) {
            return "(" + this.sub.length + " elem)";
          } else {
            return "(no elem)";
          }
        case 12:
          return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 26:
          return stringCut(this.stream.parseStringISO(content, content + len), maxLength);
        case 30:
          return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);
        case 23:
        case 24:
          return this.stream.parseTime(content, content + len, this.tag.tagNumber == 23);
      }
      return null;
    };
    ASN12.prototype.toString = function() {
      return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]";
    };
    ASN12.prototype.toPrettyString = function(indent) {
      if (indent === void 0) {
        indent = "";
      }
      var s = indent + this.typeName() + " @" + this.stream.pos;
      if (this.length >= 0) {
        s += "+";
      }
      s += this.length;
      if (this.tag.tagConstructed) {
        s += " (constructed)";
      } else if (this.tag.isUniversal() && (this.tag.tagNumber == 3 || this.tag.tagNumber == 4) && this.sub !== null) {
        s += " (encapsulates)";
      }
      s += "\n";
      if (this.sub !== null) {
        indent += "  ";
        for (var i = 0, max = this.sub.length; i < max; ++i) {
          s += this.sub[i].toPrettyString(indent);
        }
      }
      return s;
    };
    ASN12.prototype.posStart = function() {
      return this.stream.pos;
    };
    ASN12.prototype.posContent = function() {
      return this.stream.pos + this.header;
    };
    ASN12.prototype.posEnd = function() {
      return this.stream.pos + this.header + Math.abs(this.length);
    };
    ASN12.prototype.toHexString = function() {
      return this.stream.hexDump(this.posStart(), this.posEnd(), true);
    };
    ASN12.decodeLength = function(stream) {
      var buf = stream.get();
      var len = buf & 127;
      if (len == buf) {
        return len;
      }
      if (len > 6) {
        throw new Error("Length over 48 bits not supported at position " + (stream.pos - 1));
      }
      if (len === 0) {
        return null;
      }
      buf = 0;
      for (var i = 0; i < len; ++i) {
        buf = buf * 256 + stream.get();
      }
      return buf;
    };
    ASN12.prototype.getHexStringValue = function() {
      var hexString = this.toHexString();
      var offset = this.header * 2;
      var length = this.length * 2;
      return hexString.substr(offset, length);
    };
    ASN12.decode = function(str) {
      var stream;
      if (!(str instanceof Stream)) {
        stream = new Stream(str, 0);
      } else {
        stream = str;
      }
      var streamStart = new Stream(stream);
      var tag = new ASN1Tag(stream);
      var len = ASN12.decodeLength(stream);
      var start = stream.pos;
      var header = start - streamStart.pos;
      var sub = null;
      var getSub = function() {
        var ret = [];
        if (len !== null) {
          var end = start + len;
          while (stream.pos < end) {
            ret[ret.length] = ASN12.decode(stream);
          }
          if (stream.pos != end) {
            throw new Error("Content size is not correct for container starting at offset " + start);
          }
        } else {
          try {
            for (; ; ) {
              var s = ASN12.decode(stream);
              if (s.tag.isEOC()) {
                break;
              }
              ret[ret.length] = s;
            }
            len = start - stream.pos;
          } catch (e) {
            throw new Error("Exception while decoding undefined length content: " + e);
          }
        }
        return ret;
      };
      if (tag.tagConstructed) {
        sub = getSub();
      } else if (tag.isUniversal() && (tag.tagNumber == 3 || tag.tagNumber == 4)) {
        try {
          if (tag.tagNumber == 3) {
            if (stream.get() != 0) {
              throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
            }
          }
          sub = getSub();
          for (var i = 0; i < sub.length; ++i) {
            if (sub[i].tag.isEOC()) {
              throw new Error("EOC is not supposed to be actual content.");
            }
          }
        } catch (e) {
          sub = null;
        }
      }
      if (sub === null) {
        if (len === null) {
          throw new Error("We can't skip over an invalid tag with undefined length at offset " + start);
        }
        stream.pos = start + Math.abs(len);
      }
      return new ASN12(streamStart, header, len, tag, sub);
    };
    return ASN12;
  }()
);
var ASN1Tag = (
  /** @class */
  function() {
    function ASN1Tag2(stream) {
      var buf = stream.get();
      this.tagClass = buf >> 6;
      this.tagConstructed = (buf & 32) !== 0;
      this.tagNumber = buf & 31;
      if (this.tagNumber == 31) {
        var n = new uni_modules_jsencrypt_lib_lib_asn1js_int10.Int10();
        do {
          buf = stream.get();
          n.mulAdd(128, buf & 127);
        } while (buf & 128);
        this.tagNumber = n.simplify();
      }
    }
    ASN1Tag2.prototype.isUniversal = function() {
      return this.tagClass === 0;
    };
    ASN1Tag2.prototype.isEOC = function() {
      return this.tagClass === 0 && this.tagNumber === 0;
    };
    return ASN1Tag2;
  }()
);
exports.ASN1 = ASN1;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/jsencrypt/lib/lib/asn1js/asn1.js.map
