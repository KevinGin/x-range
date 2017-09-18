# x-range
Lazy range iterator for JavaScript, with a lazy version of map and other functional tools

---

### Usage

**xRange(start,end,increment)**  &nbsp; Lazy iterator with up to three parameters.

```javascript
var xRange = require('x-range');

var r = new xRange(0,4,1);   //=> 0,1,2,3
var r = new xRange(0,4);     //=> 0,1,2,3
var r = new xRange(4);       //=> 0,1,2,3
var r = new xRange(5,0,-2);  //=> 5,3,1

```

**xMap**  &nbsp; Lazy mapping function. Array not created until needed. cb(val,index)

```javascript
var r = new xRange(4);

//cb(val,index)
r.xMap(increment).xMap(increment);  //=> 2,3,4,5
r.xMap(increment).xMap(increment).toArray();  //=> returns [2,3,4,5]
```

**forEach, map, filter, reduce, toArray**  &nbsp; Each work as expected.

```javascript
var r = new xRange(4);

//cb(val,index)
r.xMap(increment).forEach(print);  //=> prints 1,2,3,4
r.xMap(increment).map(increment);  //=> returns [2,3,4,5]
r.xMap(increment).filter(isEven);  //=> returns [2,4]
//cb(acc,val,index)
r.xMap(increment).reduce(sum);     //=> returns 10
```