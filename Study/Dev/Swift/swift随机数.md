``` swift
import UIKit

// 推荐使用random(), 返回的是Int

// 产生一个[0, 2^32)区间的随机数, 返回类型是UInt32
arc4random()

// 产生一个[0, n)区间的随机数
arc4random_uniform(10)

// 产生一个[min, max)区间的随机数
let max: UInt32 = 100
let min: UInt32 = 5

let r0 = arc4random_uniform(max - min) + min

arc4random_stir()

// 在Swift中也可以使用传统的C函数rand与random
// 这两个函数都需要初始种子，通常是以当前时间来确定。
srandom(UInt32(time(nil))) // 种子,random对应的是srandom
// 产生一个[0, n)区间的随机数, 返回类型是Int
random()

srand(UInt32(time(nil))) // 种子,random对应的是srandom
// 产生一个[0, n)区间的随机数, 返回类型是UInt32
rand() % 5

RAND_MAX // rand有上限
```
