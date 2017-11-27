const assert = require('assert');
const AhoCorasick = require(__dirname + '/../src/main.js');

var _s = AhoCorasick.prototype.search;
AhoCorasick.prototype.search = function(string) {
	var results = _s.call(this, string).map(function(result) {
		result[1] = result[1].sort();
		return result;
	});
	return results;
};

var testCases = [
	{
		keywords: ['he', 'she', 'his', 'hers'],
		text: 'she was expecting his visit',
		expected: [
			[2, ['he', 'she']],
			[20, ['his']]
		]
	},
	{
		keywords: ['çp?', 'éâà'],
		text: 'éâàqwfwéâéeqfwéâàqef àéçp?ẃ wqqryht cp?',
		expected: [
			[2, ['éâà']],
			[16, ['éâà']],
			[25, ['çp?']]
		]
	},
	{
		keywords: ['**', '666', 'his', 'n', '\\', '\n'],
		text: '\n & 666 ==! \n',
		expected: [
			[0, ['\n']],
			// [20, ['his']]
			[6, ['666']],
			[12, ['\n']]
		]
	},
	{
		keywords: ['Федеральной', 'ной', 'idea'],
		text: '! Федеральной I have no idea what this means.',
		expected: [
			[12, ['Федеральной', 'ной']],
			[27, ['idea']]
		]
	},
	{
		keywords: ['bla', '😁', '😀', '😀😁😀'],
		text: 'Bla 😁 bla 😀 1 😀 - 😀😁😀-',
		expected: [
			[5, ['😁']],
			[9, ['bla']],
			[12, ['😀']],
			[17, ['😀']],
			[22, ['😀']],
			[24, ['😁']],
			[26, ['😀', '😀😁😀']],
		]
	},
	{
		keywords: ['bla', '😁', '😀', '°□°', 'w', '┻━┻'],
		text: "-  (╯°□°）╯︵ ┻━┻ ",
		expected: [
			[7, ['°□°']],
			[14, ['┻━┻']],
		]
	}
].map(function(ts) {
	ts.expected = ts.expected.map(function(expected) {
		expected[1] = expected[1].sort();
		return expected;
	});
	return ts;
});

describe('Aho corasick search', function() {
	testCases.forEach(function(ts) {
		var keys = ts.keywords;
		var text = ts.text;
		var expected = ts.expected;
		it('should test: ' + keys.join(', '), function() {
			var aho = new AhoCorasick(keys);
			assert.deepEqual(expected, aho.search(text));
	    });
	});
});
