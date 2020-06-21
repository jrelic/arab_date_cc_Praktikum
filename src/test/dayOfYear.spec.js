var assert = require('assert');
const dayOfYear = require("../date_counter");

describe('Prebrojavanje dana u godini', function() {
    it('Dan u godini za datun 01.01.1900', function () {
        assert.equal(dayOfYear(1900, 1, 1), 1); 
    });
    it('Dan u godini za datun 01.03.2019', function () {
        assert.equal(dayOfYear(2019, 3, 1), 60); 
    });
    it('Dan u godini za prijestupnu godinu i datum 01.01.2020', function () {
        assert.equal(dayOfYear(2020, 1, 1), 1); 
    });
    it('Dan u godini za prijestupnu godinu i datum 31.03.2020', function () {
        assert.equal(dayOfYear(2020, 3, 31), 91); 
    });
});