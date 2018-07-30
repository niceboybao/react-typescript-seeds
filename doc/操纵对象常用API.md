# ES6 assign()

## 基本用法

Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

[JavaScript中的可枚举属性与不可枚举属性](https://www.cnblogs.com/kongxy/p/4618173.html)

`语法`Object.assign(target, ...sources)

`实例`

```javascript
var obj = { a: 1 };
var copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```

对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用`Object.assign`方法。

```javascript
// bad
const a = {};
a.x = 3;

// if reshape unavoidable
const a = {};
Object.assign(a, {x: 3});
```

在拷贝的过程中修改对象的某个属性

```javascript
var burryPoint = {
    "userName": "",
    "fullName": "",
    "school": "",
};
return Object.assign({}, burryPoint, {
    userName: res.username,
    fullName: res.givename,
    //fullName: null (删除属性)
    school: school.join(",") //将数组转成字符串
});
```

`注意` Object.assign() 克隆时，只会做赋值操作，嵌套对象直接传递引用，不是深拷贝。

## 关联

### 深拷贝(原理)

[浅拷贝和深拷贝的区别？](https://www.cnblogs.com/always-chang/p/6107437.html)

浅拷贝只是对指针的拷贝，拷贝后两个指针指向同一个内存空间，深拷贝不但对指针进行拷贝，而且对指针指向的内容进行拷贝，经深拷贝后的指针是指向两个不同地址的指针。

```javascript
//深度拷贝：（对于一个对象而言）深拷贝会拷贝它的地址，拷贝之后2个对象互不干扰，互不影响；
//浅拷贝：（对于一个对象而言）浅拷贝置灰拷贝对象本身，2个对象所指向的地址一致，改变其中一个，另外一个对象也会改变
```

### 深拷贝(实例)

1、在对象中不含有函数的时候，使用JSON解析反解析就可以得到一个深拷贝对象(`JSON.parse()`,`JSON.stringify()`)

```javascript
let arr = {
    "TimerDuration": [1, 2, 3],
    "IsPreview": false,
    "UserTimeSpent": 0,
    "AllowedAttempts": 1,
    "AttemptNo": 1,
    "AllowBack": false,
    "AllowSkip": false,
    "DisabledFeedback": false,
    "ResultType": 3,
    "CategoryIndex": 0,
    "GroupIndex": 0,
    "QuestionIndex": 0,
    "CultureId": 4,
    "ActiveIndex": 0,
    "SubjectId": 1,
    "UserId": 2,
    "SessionId": 2624,
    "IsAssessmentCompleted": false,
    "ShowSubTitle": true
};

let _arr = JSON.parse(JSON.stringify(arr));
_arr.IsPreview = true;
console.log(_arr);
console.log(arr);
```
2、递归操作
