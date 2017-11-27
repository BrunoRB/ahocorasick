(function() {
    'use strict';

    var AhoCorasick = function(keywords) {
        this._buildTables(keywords);
    };

    AhoCorasick.prototype._buildTables = function(keywords) {
        var goto = {
            0: {}
        };
        var output = {};

        var state = 0;
        keywords.forEach(function(word) {
            var curr = 0;
            for (var i=0; i<word.length; i++) {
                var l = word[i];
                if (goto[curr] && l in goto[curr]) {
                    curr = goto[curr][l];
                }
                else {
                    state++;
                    goto[curr][l] = state;
                    goto[state] = {};
                    curr = state;
                    output[state] = [];
                }
            }

            output[state].push(word);
        });

        var failure = {};
        var xs = [];

        // f(s) = 0 for all states of depth 1 (the ones just from which 0 can directly transition)
        for (var l in goto[0]) {
            var state = goto[0][l];
            failure[state] = 0;
            xs.push(state);
        }

        while (xs.length) {
            var r = xs.shift();
            // for each symbol a such that g(r, a) = s
            for (var l in goto[r]) {
                var s = goto[r][l];
                xs.push(s);

                // set state = f(r)
                var state = failure[r];
                while(state > 0 && !(l in goto[state])) {
                    state = failure[state];
                }

                if (l in goto[state]) {
                    var fs = goto[state][l];
                    failure[s] = fs;
                    output[s] = output[s].concat(output[fs]);
                }
                else {
                    failure[s] = 0;
                }
            }
        }

        this.goto = goto;
        this.output = output;
        this.failure = failure;
    };

    AhoCorasick.prototype.search = function(string) {
        var state = 0;
        var results = [];
        for (var i=0; i<string.length; i++) {
            var l = string[i];
            while (state > 0 && !(l in this.goto[state])) {
                state = this.failure[state];
            }
            if (!(l in this.goto[state])) {
                continue;
            }

            state = this.goto[state][l];

            if (this.output[state].length) {
                var foundStrs = this.output[state];
                results.push([i, foundStrs]);
            }
        }

        return results;
    };

    if (typeof module !== 'undefined') {
        module.exports = AhoCorasick;
    }
    else {
        window.AhoCorasick = AhoCorasick;
    }
})();
