
# 简介

在实际的项目开发过程中，基于对象或者数组而开发是特别常见的，所以整理了下能操作数组的一些js方法。（包括ES6的）

## reduce()

### 定义

[Array.prototype.reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。reduce() 可以作为一个高阶函数，用于函数的 compose。

### 语法

> array.reduce(function(total, currentValue, currentIndex, arr), initialValue)

```javascript
total: 必需。初始值, 或者计算结束后的返回值。
currentValue: 必需。当前元素
currentIndex: 可选。当前元素的索引
arr: 可选。当前元素所属的数组对象。
initialValue: 可选。传递给函数的初始值
```

### 实例

#### 计算所有count值的总和

```javascript
//数组求和
var sum = [0, 1, 2, 3].reduce((total, item)=> {
  return total + item;
}, 0);
// sum is 6
```

```javascript
//二维数组变成一维数组
var flattened = [[0, 1], [2, 3], [4, 5]].reduce((total, item) => {
    return total.concat(item);
},
    []
);
//or
var flattened = [[0, 1], [2, 3], [4, 5]].reduce((total, item) => {
    return [...total, ...item];
},
    []
);
// flattened is [0, 1, 2, 3, 4, 5]
```

```javascript
//计算数组中每个元素出现的次数
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) {
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

## Object.keys()

### 定义

[Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。

### 语法

> Object.keys(obj)

```javascript
// simple array
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// array like object with random key ordering
var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']
```

### 实例

## ES6 (for in) (for of) (forEach)

### for in

- for...in语句以任意顺序遍历一个对象的可枚举属性。对于每个不同的属性，语句都会被执行。

#### 语法

> for (variable in object) {...}

> 提示：for...in不应该用于迭代一个 Array，其中索引顺序很重要。

#### 实例

```javascript
var obj = {a:1, b:2, c:3};

for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}

// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"
```

```javascript
for (let index in arr) {
    console.log("for in:" + arr[index]);
}
```

- 1.index索引为字符串型数字，不能直接进行几何运算(for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值。)
- 2.遍历顺序有可能不是按照实际数组的内部顺序
- 3.使用for in会遍历数组所有的可枚举属性，包括原型。例如上栗的原型方法method和name属性.所以for in更适合遍历对象，不要使用for in遍历数组。

### for of

> for...of语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句。

```javascript
//迭代 array
let iterable = [10, 20, 30];

for (let value of iterable) {
    value += 1;
    console.log(value);
}
// 11
// 21
// 31
```

```javascript
//迭代 string
let iterable = "boo";

for (let value of iterable) {
  console.log(value);
}
// "b"
// "o"
// "o"
```

### forEach

- [Array.prototype.forEach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)性能方面都很好，只能遍历数组，不可遍历字符串等！不能使用break，return等

```javascript
const arr = ['a', 'b', 'c'];

arr.forEach(function (element, index, array) {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    console.log(element + ',' + index + ',' + typeof (array));
});
```

## Map/Set

> Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

- Set对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set中的元素只会出现一次，即 Set 中的元素是唯一的。

```javascript
//所以可以用Set做数组去重
[...new Set([1,1,2,2,3,3])]  // [1,2,3]
 Array.from(new Set([1,1,2,2,3,3])) // [1,2,3]
```

## find()/findIndex()

> find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

```javascript
let arr = [1, 2, 3, 4];
//find方法的回调函数可以接受4个参数，依次为当前的值、当前的位置和原数组,thisValue
let find = arr.find((item, index, arrs) => {
    return item === 3;
});
找不到返回undefined
```

> findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

```javascript
//findIndex方法的回调函数可以接受4个参数，依次为当前的值、当前的位置和原数组,thisValue
let arr = [1, 2, 3, 4];
let findIndex = arr.findIndex((item, index, arrs) => {
    return item === 3;
})
```

## map()

[Array.prototype.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

### 语法

> array.map(function(currentValue,index,arr), thisValue)

```json
currentValue: 必须。当前元素的值
currentValue: 可选。当期元素的索引值
currentValue: 可选。当期元素属于的数组对象
currentValue: 可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
如果省略了 thisValue ，"this" 的值为 "undefined"
```

### 实例

jsx语法中，遍历循环的话使用map的情况特别多。

```javascript
//普通用法
let arr = [1, 2, 3, 4, 5];
let mapArr = arr.map((item, index) => {
    return item * item;
});
```

```javascript
//数组的数字转化为字符串
[1, 2, 3, 4, 5, 6, 7, 8, 9].map(String);
//["1", "2", "3", "4", "5", "6", "7", "8", "9"]
```

## 数组拼接的一些方法

### concat()

#### 定义

[concat()](http://www.w3school.com.cn/jsref/jsref_concat_array.asp) 方法用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。

#### 语法

> arrayObject.concat(arrayX,arrayX,......,arrayX)

```
arrayX: 必需。该参数可以是具体的值，也可以是数组对象。可以是任意多个。
```

#### 实例

```javascript
const a = [1,2,3];
let b = a.concat(4,5); //[1,2,3,4,5]
```

### join()

#### 定义

> join() 方法用于把数组中的所有元素转换一个字符串。

#### 语法

```javascript
array.join(separator)//指定要使用的分隔符
```

### [...]

> es6 扩展运算符

```javascript
const arr1 = [1,2,3];
const arr2 = [4,5];
const arr3 = [...arr1, ...arr2];
```

## 数组截取的一些方法

### splice()

> splice() 方法通过删除现有元素和/或添加新元素来更改一个数组的内容。

#### 语法

```javascript
array.splice(start)

array.splice(start, deleteCount)

array.splice(start, deleteCount, item1, item2, ...)
```

> **start:** 指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容.

> **deleteCount?:** 整数，表示要移除的数组元素的个数。如果 deleteCount 是 0，则不移除元素。

> **item1, item2, ...** 要添加进数组的元素,从start 位置开始。

```javascript
var myFish = ["angel", "clown", "mandarin", "surgeon"];
//从第 2 位开始删除 0 个元素，插入 "drum"
var removed = myFish.splice(2, 0, "drum");
//运算后的 myFish:["angel", "clown", "drum", "mandarin", "surgeon"]
//被删除元素数组：[]，没有元素被删除
```

### slice()

> slice(start,end)，返回选定元素

从某个已有的数组返回选定的元素，从start位开始返回到end（包括start不包括end）如果是负数，表示从数组尾部进行计算

```javascript
let arr = [1, 2, 3, 4];
arr.slice(1, 3); //[2,3]
// 不会改变原数组
```

## fill() 方法

### 定义

[Array.prototype.fill()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。

### 语法

> array.fill(value, start, end)

```
value: 必需。填充的值。
start: 可选。开始填充位置。(下标从1开始)
end: 可选。停止填充位置 (默认为 array.length)
```

### 实例

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.fill("Runoob", 2, 4); //Banana,Orange,Runoob,Runoob
```

```javascript
new Array(5).fill(0);  //[0, 0, 0, 0, 0]
new Array(5).fill(false); // [false, false, false, false, false]
```

## 改变原数组的一些方法

```javascript
shift： //将第一个元素删除并且返回删除元素，空即为undefined
unshift： //向数组开头添加元素，并返回新的长度
pop： //删除最后一个并返回删除的元素
push： //向数组末尾添加元素，并返回新的长度
reverse： //颠倒数组顺序
sort： //对数组排序
splice:splice(start,length,item) //删，增，替换数组元素，返回被删除数组，无删除则不返回
```
