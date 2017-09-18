module.exports = xRange;

console.log('xRange.js got called')


// Edge case increment === 0...
// Note that will not make infinite series on forEach/reduce
//  (since increment will be negative or zero)
function xRange(start,end,increment) {
  if (end === undefined) {
    this.start = 0;
    this.end = start;
    this.increment = 1;
  } else {
    this.start = start;
    this.end = end;
    this.increment = increment === undefined ? 1 : increment;
  }

  this.current = this.start;
  this.currentIndex = 0;
  var length = Math.ceil((this.end - this.start) / this.increment);
  this.length = length === Infinity || length < 0 ? 0 : length;
  this.maps = [];
}

// returns next value, note that calling next runs the maps...
xRange.prototype.next = function() {
  var toReturn = this.current;
  // call each lazy map
  for (var i = 0; i < this.maps.length; i++) {
    toReturn = this.maps[i](toReturn,this.currentIndex);
  }
  this.currentIndex ++;
  this.current += this.increment;
  return toReturn;
}


//cb(value,index)
xRange.prototype.forEach = function(cb) {
  this.current = this.start;
  this.currentIndex = 0;
  for (var i = 0; i < this.length; i++) {
    cb(this.next(),i);
  }
  this.maps = [];
}

// Adds to temporary list of maps that will be cleared when no longer lazy
xRange.prototype.xMap = function(cb) {
  this.maps.push(cb);
  return this;
}

xRange.prototype.map = function(cb) {
  var toReturn = new Array(this.length);
  this.forEach((val,index) => {
    toReturn[index] = cb(val,index);
  })
  return toReturn;
}

//cb(acc,val,index)
xRange.prototype.reduce = function(cb,acc) {
  this.current = this.start;
  var i = 0;
  if (acc === undefined) {
    i ++;
    acc = this.next();
  }
  while (i < this.length) {
    acc = cb(acc,this.next(),i);
    i++;
  }
  this.maps = [];
  return acc;
}

xRange.prototype.filter = function(cb) {
  var toReturn = [];
  this.forEach((val,index) => {
    if (cb(val,index)) {
      toReturn.push(val);
    }
  })
  return toReturn;
}

xRange.prototype.toArray = function() {
  return this.map(v => v);
}




// xRange.prototype.show = function(cb) {
//   var toShow = new Array(this.length);
//   this.forEach((v,i) => {
//     toShow[i] = v;
//   })
//   console.log(toShow);
//   return this;
// }


// var print = (v) => console.log(v);

// var r = new xRange(1,4,3);















