'use strict';

const assert = require('assert');
const quartzite = require('../dist/quartzite');

describe('Quartzite', function() {
  describe('#formatDate()', function() {
    it('should return "Just now"', function() {
      assert.equal(quartzite.formatDate(new Date()), 'Just now');
    });

    it('should return "Yesterday"', function() {
      let date = quartzite.dateByAdding('hours', new Date(), -24);
      assert.equal(quartzite.formatDate(date), 'Yesterday');
    });

    it('should return "Tomorrow"', function() {
      let date = quartzite.dateByAdding('hours', new Date(), 24);
      assert.equal(quartzite.formatDate(date), 'Tomorrow');
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
