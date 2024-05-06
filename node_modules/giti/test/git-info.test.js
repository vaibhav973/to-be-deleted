'use strict';

var assert = require('assert');
var gi = require('../');
describe('Testing libary', function () {
  it('first argument as a function will print all commands', function (done) {
    // first argument as a function will print all commands
    gi(function (err, result) {
      assert(!err);
      assert('name' in result);
      assert(!Array.isArray(result.name));
      assert.equal(result.name.includes('git-info'), true);
    });
    done();
  });

  it('First argument as a string', function (done) {
    gi('name', function (err, result) {
      assert(!err);
      assert('name' in result);
      assert(!Array.isArray(result.name));
      assert.equal(result.name.includes('git-info'), true);
    });
    done();
  });

  it('First argument as an Array', function (done) {
    /* First argument as an Array*/
    gi(['name', 'repository'], function (err, result) {
      assert(!err);
      assert('name' in result);
      assert('repository' in result);
      assert.equal(result.name.includes('git-info'), true);
    });
    done();
  });

  it('multiple answer', function (done) {
    // Multiline answer
    gi('authors', function (err, result) {
      assert(!err);
      assert('authors' in result);
      assert(Array.isArray(result.authors));
      assert(~result.authors.indexOf('Michal Budzynski <michal@virtualdesign.pl>'));
      assert(~result.authors.indexOf('Thorsten Scherler <scherler@gmail.com>'));
    });
    done();
  });

  it('Strip the star from the current branch name', function (done) {
    // Strip the star from the current branch name
    gi('branch', function (err, result) {
      assert(!err);
      assert('branch' in result);
      assert.equal(result.branch.indexOf('* '), -1);
    });
    done();
  });

  it('shaShort testing, should be less then 7 characters', function (done) {
    gi('shaShort', function (err, result) {
      assert(!err);
      assert('shaShort' in result);
      assert.equal(result.shaShort.length, 7);
    });
    done();
  });

  it('sha testing, should be more then 7 characters', function (done) {
    gi('sha', function (err, result) {
      assert(!err);
      assert('sha' in result);
      assert.equal(result.sha.length > 7, true);
    });
    done();
  });

  it('should output an error if nonsense is passed', function (done) {
    gi('xxx', function (err, result) {
      assert(err);
    });
    done();
  });

  it('should output 2 errors if 2* nonsense is passed, but still should show the "sha"', function (done) {
    gi(['xxx', 'xxx', 'sha'], function (err, result) {
      assert(!err);
      assert(result);
      assert.equal(result.sha.length > 7, true);
      assert.equal(result.errors.length === 2, true);
    });
    done();
  });

  it('should return authorDateRelative', function (done) {
    gi(['authorDateRelative'], function (err, result) {
      assert(!err);
      assert(result);
      assert(result.authorDateRelative);
    });
    done();
  });
});
