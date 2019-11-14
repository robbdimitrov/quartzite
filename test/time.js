'use strict';

const assert = require('assert');

const quartzite = require('../dist/quartzite');

describe('Quartzite', function() {
  describe('#timeString()', function() {
    it('should return "01:25"', function() {
      const date = new Date('Nov 10, 2018 01:25:00');
      assert.equal(quartzite.timeString(date, '24h'), '01:25');
    });

    it('should return "15:30"', function() {
      const date = new Date('Nov 10, 2018 15:30:00');
      assert.equal(quartzite.timeString(date), '15:30');
    });

    it('should return "01:25 AM"', function() {
      const date = new Date('Nov 10, 2018 01:25:00');
      assert.equal(quartzite.timeString(date, '12h'), '01:25 AM');
    });

    it('should return "03:30 PM"', function() {
      const date = new Date('Nov 10, 2018 15:30:00');
      assert.equal(quartzite.timeString(date, '12h'), '03:30 PM');
    });
  });
});
