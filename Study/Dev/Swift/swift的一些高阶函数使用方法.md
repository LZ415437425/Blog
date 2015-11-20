#### 闭包





**Learn from**

* [Swift高阶函数：Map，Filter，Reduce等-Part 1](http://candeladiao.github.io//2015/06/Swift%E9%AB%98%E9%98%B6%E5%87%BD%E6%95%B0%EF%BC%9AMap%EF%BC%8CFilter%EF%BC%8CReduce%E7%AD%89-Part-1/)


* [Higher Order Functions: Map, Filter, Reduce and more – Part 1](http://www.weheartswift.com/higher-order-functions-map-filter-reduce-and-more/)



**code**

可以在`Playground`运行

``` swift
//: Playground - noun: a place where people can play

func square(a:Float) -> Float {
    return a * a
}

func cube(a:Float) -> Float {
    return a * a * a
}

func averageSumOfSquares(a:Float,b:Float) -> Float {
    return (square(a) + square(b)) / 2.0
}

func averageSumOfCubes(a:Float,b:Float) -> Float {
    return (cube(a) + cube(b)) / 2.0
}

// 我们注意到averageSumOfSquares和averageSumOfCubes的惟一不同只是分别调用平方函数或立方函数。
// 如果我能够定义一个通用函数，这个函数以两个数和一个使用这两个数的函数作为参数，
// 来计算平均值而不是重复调用的话将会更好，我们可以使用闭包作为函数参数。

func averageOfFunction(a:Float,b:Float,f:(Float -> Float)) -> Float {
    return (f(a) + f(b)) / 2
}

var r : Float = 0
r = averageOfFunction(3, b: 4, f: square)
r
r = averageOfFunction(3, b: 4, f: cube)
r

// 上面的写法是命名闭包, 也有内联闭包
// 内联闭包的几种写法, 从繁到简

// (x: Float) -> Float 是闭包的类型（接收一个float参数，返回一个float值），
// return x * x 为实现，关键字in为代码头，实现跟在in后面。
r = averageOfFunction(3, b: 4, f: {(x: Float) -> Float in return x * x})
r

// 首先可以忽略类型声明，因为类型能够从averageOfFunction声明中推断出来
//（编译器能够推断出作为averageOfFunction的参数传入的函数需要接收一个float值，然后返回另一个float值）。
r = averageOfFunction(3, b: 4, f: {x in return x * x})
r

// 接着我们可以忽略return语句。（译者注：Swift规定-单行表达式闭包可省略return）。
r = averageOfFunction(3, b: 4, f: {x in x * x})
r

// 最后可以忽略指定参数名，使用默认参数名$0
//（如果函数接收多个参数，使用$K作为第K-1个参数，如$0，$1，$2......）。
r = averageOfFunction(3, b: 4, f: {$0 * $0})
r

// 数组操作

// Swift的数组支持三个高阶函数：map，filter和reduce。


// 1. map
// map用于将每个数组元素通过某个方法进行转换。
// func map<U>(transform: (T) -> U) -> U[]

// 比如想转换 [10,20,45,32] -> ["10€","20€","45€","32€"]
let arr1 = [10,20,45,32]

let arr2 = arr1.map({"\($0)€"})
arr2

// 2. filter
// filter用于选择数组元素中满足某种条件的元素。
// filter(includeElement: (T) -> Bool) -> T[]

// 使用前面金额的例子，筛选出金额大于30元素

let arr3 = arr1.filter({$0 > 30})
arr3

// 3. reduce
// reduce把数组元素组合计算为一个值。
// reduce(initial: U, combine: (U, T) -> U) -> U

let arr4 = arr1.reduce(0, combine: {$0 + $1})
arr4

let arr5 = arr1.reduce(1, combine: {$0 * $1})
arr5

// 操作符也是函数, 可以简写成
let arr6 = arr1.reduce(0, combine: +)
arr6

let arr7 = arr1.reduce(1, combine: *)
arr7
```

