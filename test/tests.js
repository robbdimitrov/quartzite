'use strict';

const assert = require('assert');
const quartzite = require('../dist/quartzite');

describe('Quartzite', function() {
    describe('#formatDate()', function() {
        it('should return "Just now"', function() {
            assert.equal(quartzite.formatDate(new Date()), 'Just now');
        });
        it('should contain "Yesterday at"', function() {
            let date = quartzite.dateByAdding('hours', new Date(), -25);
            assert.equal(quartzite.formatDate(date).includes('Yesterday at'), true);
        });
        it('should contain "Tomorrow at"', function() {
            let date = quartzite.dateByAdding('hours', new Date(), 25);
            assert.equal(quartzite.formatDate(date).includes('Tomorrow at'), true);
        });
        it('should return "30 seconds ago"', function() {
            let date = quartzite.dateByAdding('seconds', new Date(), -30);
            assert.equal(quartzite.formatDate(date), '30 seconds ago');
        });
        it('should return "In 25 minutes"', function() {
            let date = quartzite.dateByAdding('minutes', new Date(), 25);
            assert.equal(quartzite.formatDate(date), 'In 25 minutes');
        });
    });
});
