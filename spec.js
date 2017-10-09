const chai = require('chai'); 
const expect = require('chai').expect;

const xRange = require('./index.js');

var increment = val => val + 1;
var same = (val) => val;
var double = (val) => 2 * val;
var isEven = val => val % 2 === 0;
var sum = (a, b) => a + b;
var sumWithIndex = (acc, val, index) => acc + val + index;


describe('xRange constructor', function() {
  
  it ('includes start but not end value', function() {
    var r = new xRange(0, 5, 1);
    var target = [0, 1, 2, 3, 4];
    expect(r.toArray()).to.deep.equal(target);    
  });

  it ('allows positive increments', function() {
    var r = new xRange(0, 5, 2);
    var target = [0, 2, 4];
    expect(r.toArray()).to.deep.equal(target);    
  });

  it ('allows negative increments', function() {
    var r = new xRange(5, -1, -2);
    var target = [5, 3, 1];
    expect(r.toArray()).to.deep.equal(target);    
  });

  it ('empty array when start = end', function() {
    var r = new xRange(5, 5);
    var target = [];
    expect(r.toArray()).to.deep.equal(target);    
  });

  it ('length is zero when increment is zero', function() {
    var r = new xRange(1, 10, 0);
    var target = [];
    expect(r.toArray()).to.deep.equal(target);    
  })

  it ('length is zero when increment would create ininite iterations', function() {
    var r = new xRange(1, 10, -1);
    var target = [];
    expect(r.toArray()).to.deep.equal(target);    
  });

  it ('allows for only 1 argument', function() {
    var r = new xRange(4);
    var target = [0, 1, 2, 3];
    expect(r.toArray()).to.deep.equal(target);    
  });

    it ('allows for only 2 arguments', function() {
    var r = new xRange(2, 4);
    var target = [2, 3];
    expect(r.toArray()).to.deep.equal(target);    
  });

});


describe('xMap', function() {
  
  it ('is lazy', function() {
    var r = new xRange(0, 5, 1);
    var result = r.xMap(same);
    expect(result).to.not.be.an('array');    
  });

  it ('maps cb(value,index)', function() {
    var r = new xRange(0, 5, 1);
    var result = r.xMap(increment).xMap(increment).xMap(same).toArray();
    var target = [2, 3, 4, 5, 6];
    expect(result).to.deep.equal(target);   
  });

  it ('calls lazy maps in order', function() {
    var r = new xRange(0, 3, 1);
    var result = r.xMap(increment).xMap(double).xMap(increment).toArray();
    var target = [3, 5, 7];
    expect(result).to.deep.equal(target);   
  });

});

describe('map', function() {
  
  it ('returns array', function() {
    var r = new xRange(0, 5, 1);
    var result = r.map(same);
    expect(result).to.be.an('array');    
  });

  it ('maps cb(value,index)', function() {
    var r = new xRange(0, 3, 1);
    var result = r.map(increment);
    var target = [1, 2, 3];
    expect(result).to.deep.equal(target);   
  });

  it ('calls lazy map first', function() {
    var r = new xRange(0, 3, 1);
    var result = r.xMap(double).map(increment);
    var target = [1, 3, 5];
    expect(result).to.deep.equal(target);   
  });

});

describe('filter', function() {

  it ('filters cb(value,index)', function() {
    var r = new xRange(0, 8, 1);
    var result = r.filter(isEven);
    var target = [0, 2, 4, 6];
    expect(result).to.deep.equal(target);   
  });

  it ('calls lazy map first', function() {
    var r = new xRange(0, 4, 1);
    var result = r.xMap(double).filter(isEven);
    var target = [0, 2, 4, 6];
    expect(result).to.deep.equal(target);   
  });

});

describe('reduce', function() {

  it ('reduces cb(acc,value,index)', function() {
    var r = new xRange(0, 5, 1);
    var result = r.reduce(sum);
    expect(result).to.equal(10);
    var result = r.reduce(sumWithIndex);
    expect(result).to.equal(20);  
  });

  it ('calls lazy map first', function() {
    var r = new xRange(0, 5, 1);
    var result = r.xMap(double).reduce(sum);
    expect(result).to.equal(20);
    var result = r.xMap(double).reduce(sumWithIndex);
    expect(result).to.equal(30);  
  });

});

