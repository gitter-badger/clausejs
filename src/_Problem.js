'use strict';

function Problem(val, failsPredicate, msg) {
  this.val = val;
  this.name = 'Problem';
  this.falsePredicate = val;
  this.problemMessage = msg;
  this.stack = (new Error()).stack;
  this.message = msg + '; val: ' + val;
};

Problem.prototype = new Error;

module.exports = Problem;
