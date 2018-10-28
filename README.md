# ahocorasick

Implementation of the Aho-Corasick string searching algorithm, as described in the paper
"Efficient string matching: an aid to bibliographic search".

## Installing / Running

`npm install ahocorasick`

for nodejs:

    var AhoCorasick = require('ahocorasick');
    var ac = new AhoCorasick(['keyword1', 'keyword2', 'etc']);
    var results = ac.search('should find keyword1 at position 19 and keyword2 at position 47.');
    // [ [ 19, [ 'keyword1' ] ], [ 47, [ 'keyword2' ] ] ]

or for browsers:

    <script src="/src/main.js"><script>`
    <script>
    var ac = new AhoCorasick(['keyword1', 'keyword2', 'etc']);
    ...
    </script>

check [test/basic.js](test/basic.js) for more examples.

PS. Note that what's returned is the index of the **last characters** of the found keywords.

## Visualization

See [https://brunorb.github.io/ahocorasick/visualization.html](https://brunorb.github.io/ahocorasick/visualization.html) for an interactive visualization of the algorithm.

## License

[The MIT License](LICENSE)
