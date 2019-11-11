'use strict';

const assert = require('assert');

const quartzite = require('../dist/quartzite');

describe('Quartzite', function() {
  describe('#dateString()', function() {
    it('should return "Just now"', function() {
      assert.equal(quartzite.dateString(new Date()), 'Just now');
    });

    it('should return "Yesterday"', function() {
      const date = quartzite.dateByAdding('hours', new Date(), -24);
      assert.equal(quartzite.dateString(date), 'Yesterday');
    });

    it('should return "Tomorrow"', function() {
      const date = quartzite.dateByAdding('hours', new Date(), 24);
      assert.equal(quartzite.dateString(date), 'Tomorrow');
    });

    it('should return "30 seconds ago"', function() {
      const date = quartzite.dateByAdding('seconds', new Date(), -30);
      assert.equal(quartzite.dateString(date), '30 seconds ago');
    });

    it('should return "In 25 minutes"', function() {
      const date = quartzite.dateByAdding('minutes', new Date(), 25);
      assert.equal(quartzite.dateString(date), 'In 25 minutes');
    });
  });
});
