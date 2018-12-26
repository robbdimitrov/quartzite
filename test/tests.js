'use strict';

const assert = require('assert');
const quartzite = require('../dist/quartzite');

describe('Quartzite', function() {
    describe('#formatDate()', function() {
        it('should return "Just now" for dates within 5 seconds', function() {
            assert.equal(quartzite.formatDate(new Date()), 'Just now');
        });
        it('should contain "Yesterday"', function() {
            let date = quartzite.dateByAdding('hours', new Date(), -25);
            assert.equal(quartzite.formatDate(date).includes('Yesterday'), true);
        });
        it('should contain "Tomorrow"', function() {
            let date = quartzite.dateByAdding('hours', new Date(), 25);
            assert.equal(quartzite.formatDate(date).includes('Tomorrow'), true);
        });
    });
});
