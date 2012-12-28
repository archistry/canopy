module.exports = (function(){
  /*
   * Generated by PEG.js 0.7.0.
   *
   * http://pegjs.majda.cz/
   */

  function quote(s) {
    /*
     * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a
     * string literal except for the closing quote character, backslash,
     * carriage return, line separator, paragraph separator, and line feed.
     * Any character may appear in the form of an escape sequence.
     *
     * For portability, we also escape escape all control and non-ASCII
     * characters. Note that "\0" and "\v" escape sequences are not used
     * because JSHint does not like the first and IE the second.
     */
     return '"' + s
      .replace(/\\/g, '\\\\')  // backslash
      .replace(/"/g, '\\"')    // closing quote character
      .replace(/\x08/g, '\\b') // backspace
      .replace(/\t/g, '\\t')   // horizontal tab
      .replace(/\n/g, '\\n')   // line feed
      .replace(/\f/g, '\\f')   // form feed
      .replace(/\r/g, '\\r')   // carriage return
      .replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape)
      + '"';
  }

  var result = {
    /*
     * Parses the input with a generated parser. If the parsing is successfull,
     * returns a value explicitly or implicitly specified by the grammar from
     * which the parser was generated (see |PEG.buildParser|). If the parsing is
     * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
     */
    parse: function(input, startRule) {
      var parseFunctions = {
        "program": parse_program,
        "cell": parse_cell,
        "list": parse_list,
        "atom": parse_atom,
        "boolean": parse_boolean,
        "integer": parse_integer,
        "string": parse_string,
        "symbol": parse_symbol,
        "space": parse_space,
        "paren": parse_paren,
        "delimiter": parse_delimiter
      };

      if (startRule !== undefined) {
        if (parseFunctions[startRule] === undefined) {
          throw new Error("Invalid rule name: " + quote(startRule) + ".");
        }
      } else {
        startRule = "program";
      }

      var pos = 0;
      var reportFailures = 0;
      var rightmostFailuresPos = 0;
      var rightmostFailuresExpected = [];
      var cache = {};

      function padLeft(input, padding, length) {
        var result = input;

        var padLength = length - input.length;
        for (var i = 0; i < padLength; i++) {
          result = padding + result;
        }

        return result;
      }

      function escape(ch) {
        var charCode = ch.charCodeAt(0);
        var escapeChar;
        var length;

        if (charCode <= 0xFF) {
          escapeChar = 'x';
          length = 2;
        } else {
          escapeChar = 'u';
          length = 4;
        }

        return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
      }

      function matchFailed(failure) {
        if (pos < rightmostFailuresPos) {
          return;
        }

        if (pos > rightmostFailuresPos) {
          rightmostFailuresPos = pos;
          rightmostFailuresExpected = [];
        }

        rightmostFailuresExpected.push(failure);
      }

      function parse_program() {
        var cacheKey = "program@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }

        var result0, result1;

        result1 = parse_cell();
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_cell();
          }
        } else {
          result0 = null;
        }

        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_cell() {
        var cacheKey = "cell@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }

        var result0, result1, result2, result3;
        var pos0;

        pos0 = pos;
        result0 = [];
        result1 = parse_space();
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_space();
        }
        if (result0 !== null) {
          result1 = parse_list();
          if (result1 === null) {
            result1 = parse_atom();
          }
          if (result1 !== null) {
            result2 = [];
            result3 = parse_space();
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse_space();
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }

        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_list() {
        var cacheKey = "list@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }

        var result0, result1, result2;
        var pos0;

        pos0 = pos;
        if (input.charCodeAt(pos) === 40) {
          result0 = "(";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"(\"");
          }
        }
        if (result0 !== null) {
          result2 = parse_cell();
          if (result2 !== null) {
            result1 = [];
            while (result2 !== null) {
              result1.push(result2);
              result2 = parse_cell();
            }
          } else {
            result1 = null;
          }
          if (result1 !== null) {
            if (input.charCodeAt(pos) === 41) {
              result2 = ")";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\")\"");
              }
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }

        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_atom() {
        var cacheKey = "atom@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }

        var result0;

        result0 = parse_boolean();
        if (result0 === null) {
          result0 = parse_integer();
          if (result0 === null) {
            result0 = parse_string();
            if (result0 === null) {
              result0 = parse_symbol();
            }
          }
        }

        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_boolean() {
        var cacheKey = "boolean@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }

        var result0;

        if (input.substr(pos, 2) === "#t") {
          result0 = "#t";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"#t\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 2) === "#f") {
            result0 = "#f";
            pos += 2;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"#f\"");
            }
          }
        }

        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_integer() {
        var cacheKey = "integer@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }

        var result0, result1, result2;
        var pos0;

        pos0 = pos;
        if (/^[1-9]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[1-9]");
          }
        }
        if (result0 !== null) {
          result1 = [];
          if (/^[0-9]/.test(input.charAt(pos))) {
            result2 = input.charAt(pos);
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("[0-9]");
            }
          }
          while (result2 !== null) {
            result1.push(result2);
            if (/^[0-9]/.test(input.charAt(pos))) {
              result2 = input.charAt(pos);
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("[0-9]");
              }
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }

        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_string() {
        var cacheKey = "string@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }

        var result0, result1, result2, result3;
        var pos0, pos1;

        pos0 = pos;
        if (input.charCodeAt(pos) === 34) {
          result0 = "\"";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\\"\"");
          }
        }
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          if (input.charCodeAt(pos) === 92) {
            result2 = "\\";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\"\\\\\"");
            }
          }
          if (result2 !== null) {
            if (input.length > pos) {
              result3 = input.charAt(pos);
              pos++;
            } else {
              result3 = null;
              if (reportFailures === 0) {
                matchFailed("any character");
              }
            }
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          if (result2 === null) {
            if (/^[^"]/.test(input.charAt(pos))) {
              result2 = input.charAt(pos);
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("[^\"]");
              }
            }
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            if (input.charCodeAt(pos) === 92) {
              result2 = "\\";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"\\\\\"");
              }
            }
            if (result2 !== null) {
              if (input.length > pos) {
                result3 = input.charAt(pos);
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("any character");
                }
              }
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
            if (result2 === null) {
              if (/^[^"]/.test(input.charAt(pos))) {
                result2 = input.charAt(pos);
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("[^\"]");
                }
              }
            }
          }
          if (result1 !== null) {
            if (input.charCodeAt(pos) === 34) {
              result2 = "\"";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"\\\"\"");
              }
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }

        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_symbol() {
        var cacheKey = "symbol@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }

        var result0, result1, result2;
        var pos0, pos1;

        pos0 = pos;
        pos1 = pos;
        reportFailures++;
        result1 = parse_delimiter();
        reportFailures--;
        if (result1 === null) {
          result1 = "";
        } else {
          result1 = null;
          pos = pos1;
        }
        if (result1 !== null) {
          if (input.length > pos) {
            result2 = input.charAt(pos);
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("any character");
            }
          }
          if (result2 !== null) {
            result1 = [result1, result2];
          } else {
            result1 = null;
            pos = pos0;
          }
        } else {
          result1 = null;
          pos = pos0;
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            pos0 = pos;
            pos1 = pos;
            reportFailures++;
            result1 = parse_delimiter();
            reportFailures--;
            if (result1 === null) {
              result1 = "";
            } else {
              result1 = null;
              pos = pos1;
            }
            if (result1 !== null) {
              if (input.length > pos) {
                result2 = input.charAt(pos);
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("any character");
                }
              }
              if (result2 !== null) {
                result1 = [result1, result2];
              } else {
                result1 = null;
                pos = pos0;
              }
            } else {
              result1 = null;
              pos = pos0;
            }
          }
        } else {
          result0 = null;
        }

        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_space() {
        var cacheKey = "space@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }

        var result0;

        if (/^[s\n\r\t]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[s\\n\\r\\t]");
          }
        }

        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_paren() {
        var cacheKey = "paren@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }

        var result0;

        if (input.charCodeAt(pos) === 40) {
          result0 = "(";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"(\"");
          }
        }
        if (result0 === null) {
          if (input.charCodeAt(pos) === 41) {
            result0 = ")";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\")\"");
            }
          }
        }

        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_delimiter() {
        var cacheKey = "delimiter@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }

        var result0;

        result0 = parse_paren();
        if (result0 === null) {
          result0 = parse_space();
        }

        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }


      function cleanupExpected(expected) {
        expected.sort();

        var lastExpected = null;
        var cleanExpected = [];
        for (var i = 0; i < expected.length; i++) {
          if (expected[i] !== lastExpected) {
            cleanExpected.push(expected[i]);
            lastExpected = expected[i];
          }
        }
        return cleanExpected;
      }

      function computeErrorPosition() {
        /*
         * The first idea was to use |String.split| to break the input up to the
         * error position along newlines and derive the line and column from
         * there. However IE's |split| implementation is so broken that it was
         * enough to prevent it.
         */

        var line = 1;
        var column = 1;
        var seenCR = false;

        for (var i = 0; i < Math.max(pos, rightmostFailuresPos); i++) {
          var ch = input.charAt(i);
          if (ch === "\n") {
            if (!seenCR) { line++; }
            column = 1;
            seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            line++;
            column = 1;
            seenCR = true;
          } else {
            column++;
            seenCR = false;
          }
        }

        return { line: line, column: column };
      }


      var result = parseFunctions[startRule]();

      /*
       * The parser is now in one of the following three states:
       *
       * 1. The parser successfully parsed the whole input.
       *
       *    - |result !== null|
       *    - |pos === input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 2. The parser successfully parsed only a part of the input.
       *
       *    - |result !== null|
       *    - |pos < input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 3. The parser did not successfully parse any part of the input.
       *
       *   - |result === null|
       *   - |pos === 0|
       *   - |rightmostFailuresExpected| contains at least one failure
       *
       * All code following this comment (including called functions) must
       * handle these states.
       */
      if (result === null || pos !== input.length) {
        var offset = Math.max(pos, rightmostFailuresPos);
        var found = offset < input.length ? input.charAt(offset) : null;
        var errorPosition = computeErrorPosition();

        throw new this.SyntaxError(
          cleanupExpected(rightmostFailuresExpected),
          found,
          offset,
          errorPosition.line,
          errorPosition.column
        );
      }

      return result;
    },

    /* Returns the parser source code. */
    toSource: function() { return this._source; }
  };

  /* Thrown when a parser encounters a syntax error. */

  result.SyntaxError = function(expected, found, offset, line, column) {
    function buildMessage(expected, found) {
      var expectedHumanized, foundHumanized;

      switch (expected.length) {
        case 0:
          expectedHumanized = "end of input";
          break;
        case 1:
          expectedHumanized = expected[0];
          break;
        default:
          expectedHumanized = expected.slice(0, expected.length - 1).join(", ")
            + " or "
            + expected[expected.length - 1];
      }

      foundHumanized = found ? quote(found) : "end of input";

      return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";
    }

    this.name = "SyntaxError";
    this.expected = expected;
    this.found = found;
    this.message = buildMessage(expected, found);
    this.offset = offset;
    this.line = line;
    this.column = column;
  };

  result.SyntaxError.prototype = Error.prototype;

  return result;
})();
