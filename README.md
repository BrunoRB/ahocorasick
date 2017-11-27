# ahocorasick

Implementation of the Aho-Corasick string searching algorithm described in the paper
"Efficient string matching: an aid to bibliographic search".

## Installing / Running

`npm install ahocorasick`

for nodejs:

    var AhoCorasick = require('ahocorasick');
    var ac = new AhoCorasick(['keyword1', 'keyword2', 'etc');
    var results = ac->search('should find keyword1 at position 19 and keyword2 at position 30.');

or for browsers:

    <script src="/src/main.js"><script>`
    <script>
    var ac = new AhoCorasick(['keyword1', 'keyword2', 'etc');
    ...
    </script>

## License

[The MIT License](LICENSE)
