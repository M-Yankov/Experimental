/*globals describe, it, require, before, global, $*/
var expect = require('chai').expect,
	solution = require('../tasks/script');

describe('Test if solution works fine', function () {
	"use strict";

    it('expect to exist', function () {
       expect(solution).to.exist;
    });

	it('expect to be a function', function () {
		expect(solution.returns).to.be.a('Function');
	});

	it('expect to have right result', function () {
		var result = solution.returns('example');
		expect(result).to.equal('example');
	});

	it('expect to return a proper object', function () {
		var obj = {
			value: '2',
			index: '33',
			opacity: '0'
		};

		var result = solution.returns(obj);
		expect(result).to.equal(obj);
		expect(result.value).to.exist;
		expect(result.index).to.exist;
		expect(result.opacity).to.exist;
	});

	it('test with number', function() {
		var result = solution.returns(3);
		expect(result).to.equal(3);
	});
});
