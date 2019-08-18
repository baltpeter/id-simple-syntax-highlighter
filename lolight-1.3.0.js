/*! Adapted after lolight v1.3.0 - https://larsjung.de/lolight/
 *
 * Unfortunately, we can't simply use the upstream version because that
 * requires various functions on the `document` object which are only
 * available in the browser but not in InDesign.
 * 
 * This version simply patches those out.
 */

/*
 * The MIT License (MIT)
 * 
 * Copyright (c) 2019 Lars Jung (https://larsjung.de)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var lolight = (function() {
    var KEYWORD_RE = /^(a(bstract|lias|nd|rguments|rray|s(m|sert)?|uto)|b(ase|egin|ool(ean)?|reak|yte)|c(ase|atch|har|hecked|lass|lone|ompl|onst|ontinue)|de(bugger|cimal|clare|f(ault|er)?|init|l(egate|ete)?)|do|double|e(cho|ls?if|lse(if)?|nd|nsure|num|vent|x(cept|ec|p(licit|ort)|te(nds|nsion|rn)))|f(allthrough|alse|inal(ly)?|ixed|loat|or(each)?|riend|rom|unc(tion)?)|global|goto|guard|i(f|mp(lements|licit|ort)|n(it|clude(_once)?|line|out|stanceof|t(erface|ernal)?)?|s)|l(ambda|et|ock|ong)|m(odule|utable)|NaN|n(amespace|ative|ext|ew|il|ot|ull)|o(bject|perator|r|ut|verride)|p(ackage|arams|rivate|rotected|rotocol|ublic)|r(aise|e(adonly|do|f|gister|peat|quire(_once)?|scue|strict|try|turn))|s(byte|ealed|elf|hort|igned|izeof|tatic|tring|truct|ubscript|uper|ynchronized|witch)|t(emplate|hen|his|hrows?|ransient|rue|ry|ype(alias|def|id|name|of))|u(n(checked|def(ined)?|ion|less|signed|til)|se|sing)|v(ar|irtual|oid|olatile)|w(char_t|hen|here|hile|ith)|xor|yield)$/;

    var COM = 'com';
    var KEY = 'key';
    var NAM = 'nam';
    var NUM = 'num';
    var PCT = 'pct';
    var REX = 'rex';
    var SPC = 'spc';
    var STR = 'str';
    var UNK = 'unk';

    var TOKEN_RES = [
        [NUM, /#([0-9a-f]{6}|[0-9a-f]{3})\b/],
        [COM, /(\/\/|#).*?(?=\n|$)/],
        [COM, /\/\*[\s\S]*?\*\//],
        [COM, /<!--[\s\S]*?-->/],
        [REX, /\/(\\\/|[^\n])*?\//],
        [STR, /(['"`])(\\\1|[\s\S])*?\1/],
        [NUM, /[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?/],
        [PCT, /[\\.,:;+\-*\/=<>()[\]{}|?!&@~]/],
        [SPC, /\s+/],
        [NAM, /[\w$]+/],
        [UNK, /./]
    ];

    var tokenize = function (text) {
        if (typeof text !== 'string') {
            throw new Error('tok: no string');
        }

        var tokens = [];
        var len = TOKEN_RES.length;
        var prefer_div_over_re = false;

        while (text) {
            for (var i = 0; i < len; i += 1) {
                var m = TOKEN_RES[i][1].exec(text);
                if (!m || m.index !== 0) {
                    continue;
                }

                var cls = TOKEN_RES[i][0];
                if (cls === REX && prefer_div_over_re) {
                    continue;
                }

                var tok = m[0];

                if (cls === NAM && KEYWORD_RE.test(tok)) {
                    cls = KEY;
                }
                if (cls === SPC) {
                    if (tok.indexOf('\n') >= 0) {
                        prefer_div_over_re = false;
                    }
                } else {
                    prefer_div_over_re = cls === NUM || cls === NAM;
                }

                text = text.slice(tok.length);
                tokens.push([cls, tok]);
                break;
            }
        }

        return tokens;
    };

    return { tok: tokenize };
})();