[TOC]

# Dispatch Queue类型

| No.  | name                        | info                                     |
| ---- | --------------------------- | ---------------------------------------- |
| 1    | `Serial Dispatch Queue`     | 线性执行的线程队列，遵循**FIFO(First In First Out)**原则 |
| 2    | `Concurrent Dispatch Queue` | 并发执行的线程队列，并发执行的处理数取决于当前状态                |

``` swift
// 自定义队列, 默认优先级, 参考下面
let serialDispatchQueue = dispatch_queue_create("serialDispatchQueue", DISPATCH_QUEUE_SERIAL)
let concurrentDispatchQueue = dispatch_queue_create("serialDispatchQueue", DISPATCH_QUEUE_CONCURRENT)
```



# 系统的Dispatch Queue

| No.  | name                  | info                                   |
| ---- | --------------------- | -------------------------------------- |
| 1    | Main Dispatch Queue   | `DISPATCH_QUEUE_SERIAL`, 顺序执行, 可用于UI更新 |
| 2    | Global Dispatch Queue | `DISPATCH_QUEUE_CONCURRENT`, 并行        |

``` swift
// 1. 获取Main Dispatch Queue
let mainDispatchQueue             = dispatch_get_main_queue() // 可以用于更新UI
// 2. 获取Global Dispatch Queue
let globalDispatchQueueHigh       = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0) // 高优先级
let globalDispatchQueueDefault    = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0) // 默认优先级
let globalDispatchQueueLow        = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_LOW, 0) // 低优先级
let globalDispatchQueueBackground = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_BACKGROUND, 0) // 后台执行优先级
```



# 延迟输出`dispatch_after`

``` swift
let seconds: Int64 = 1
let delayTime = dispatch_time(DISPATCH_TIME_NOW, seconds * Int64(NSEC_PER_SEC))
dispatch_after(delayTime, mainDispatchQueue) { () -> Void in
    print("延迟输出")
}
```

# Dispatch Group分组

``` swift
// 当分组任务完成时候, 得到通知
dispatch_group_notify(dispatchGroup, globalDispatchQueueHigh) { () -> Void in
    print("group finish")
}

// 分组也可以判断是否超时
let waitSeconds: Int64 = 1
let waitTime           = dispatch_time(DISPATCH_TIME_NOW, waitSeconds * Int64(NSEC_PER_SEC))
let waitResult         = dispatch_group_wait(dispatchGroup, waitTime)

if waitResult == 0 {
    print("mission completed") // group中的任务全部执行完毕
} else {
    print("out of time") // group中有任务超时
}
```

# Dispatch Barrier分界

``` swift
dispatch_async(queue1) { () -> Void in
    let r = Double(random() % 10)
    NSThread.sleepForTimeInterval(0.02 * r)
    print("read 3")
}
// 关于读写的数据同步操作，为处理数据而作
// 等待前面的任务完成后, 优先执行dispatch_barrier_async的任务
// 就像名字barrier一样, [屏障; 障碍; 栅栏; 分界线;]
dispatch_barrier_async(queue1) { () -> Void in
    let r = Double(random() % 10)
    NSThread.sleepForTimeInterval(0.02 * r)
    print("write 1")
}
dispatch_async(queue1) { () -> Void in
    let r = Double(random() % 10)
    NSThread.sleepForTimeInterval(0.02 * r)
    print("read 4")
}
```

# Dispatch Apply执行次数

``` swift
// 执行相应次数, 会阻塞
dispatch_apply(3, globalDispatchQueueHigh) { (index) -> Void in
    print("dispatch_apply : \(index)")
}
```

# Dispatch suspend and resume挂起与恢复队列

``` swift
    // 挂起队列
    dispatch_suspend(queue2)
    
    // 恢复队列
    dispatch_resume(queue2)
```

# Dispatch Once执行一次

``` swift
struct Static {
    static var pred: dispatch_once_t = 0
}
func testOnce() {
    dispatch_once(&Static.pred) { () -> Void in
        print("dispatch once") // 这里只会执行一次
    }
    print("dispatch more")
}	
```

# dispatch_semaphore细粒度控制

用到再学吧

# Dispatch I/O：并发读取文件数据，高效率读取文件

`dispatch_io_read`

用到再学吧

# playground完整代码

``` swift
//: Playground - noun: a place where people can play

import UIKit
import XCPlayground

//// 自定义队列, 默认优先级, 参考下面
let serialDispatchQueue = dispatch_queue_create("serialDispatchQueue", DISPATCH_QUEUE_SERIAL)
let concurrentDispatchQueue = dispatch_queue_create("serialDispatchQueue", DISPATCH_QUEUE_CONCURRENT)

srandom(UInt32(time(nil))) // 随机数种子
func foo(name: String, queue: dispatch_queue_t) {
    for i in 1...10 {
        dispatch_async(queue) { () -> Void in
            let r = Double(random() % 10)
            NSThread.sleepForTimeInterval(0.02 * r)
            print("\(name) \(i) wait for : \(r)")
        }
    }
}

//// 顺序执行
//foo("serial", queue: serialDispatchQueue)
//// 并行执行
//foo("concurrent", queue: concurrentDispatchQueue)

// ------------------------------我是分界线-----------------------------------------

// 系统的Dispatch Queue

// 1. 获取Main Dispatch Queue
let mainDispatchQueue             = dispatch_get_main_queue() // 可以用于更新UI
// 2. 获取Global Dispatch Queue
let globalDispatchQueueHigh       = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0) // 高优先级
let globalDispatchQueueDefault    = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0) // 默认优先级
let globalDispatchQueueLow        = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_LOW, 0) // 低优先级
let globalDispatchQueueBackground = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_BACKGROUND, 0) // 后台执行优先级

//foo("mainDispatchQueue", queue: mainDispatchQueue) // 测试发现是DISPATCH_QUEUE_SERIAL队列, 顺序
//foo("globalDispatchQueueHigh", queue: globalDispatchQueueHigh) // 测试发现是DISPATCH_QUEUE_CONCURRENT队列, 并行
//foo("globalDispatchQueueDefault", queue: globalDispatchQueueDefault) // 测试发现是DISPATCH_QUEUE_CONCURRENT队列, 并行
//foo("globalDispatchQueueLow", queue: globalDispatchQueueLow) // 测试发现是DISPATCH_QUEUE_CONCURRENT队列, 并行
//foo("globalDispatchQueueBackground", queue: globalDispatchQueueBackground) // 测试发现是DISPATCH_QUEUE_CONCURRENT队列, 并行

// ------------------------------我是分界线-----------------------------------------

// 延迟执行
//print("立马输出")
//
//let seconds: Int64 = 1
//let delayTime = dispatch_time(DISPATCH_TIME_NOW, seconds * Int64(NSEC_PER_SEC))
//dispatch_after(delayTime, mainDispatchQueue) { () -> Void in
//    print("延迟输出")
//}

// ------------------------------我是分界线-----------------------------------------

//// 分组
//let dispatchGroup = dispatch_group_create()
//
//dispatch_group_async(dispatchGroup, globalDispatchQueueHigh) { () -> Void in
//    let r = Double(random() % 60)
//    NSThread.sleepForTimeInterval(0.02 * r)
//    print("group 1")
//}
//dispatch_group_async(dispatchGroup, globalDispatchQueueHigh) { () -> Void in
//    let r = Double(random() % 60)
//    NSThread.sleepForTimeInterval(0.02 * r)
//    print("group 2")
//}
//dispatch_group_async(dispatchGroup, globalDispatchQueueHigh) { () -> Void in
//    let r = Double(random() % 60)
//    NSThread.sleepForTimeInterval(0.02 * r)
//    print("group 3")
//}
//
//// 当分组任务完成时候, 得到通知
//dispatch_group_notify(dispatchGroup, globalDispatchQueueHigh) { () -> Void in
//    print("group finish")
//}
//
//// 分组也可以判断是否超时
//let waitSeconds: Int64 = 1
//let waitTime           = dispatch_time(DISPATCH_TIME_NOW, waitSeconds * Int64(NSEC_PER_SEC))
//let waitResult         = dispatch_group_wait(dispatchGroup, waitTime)
//
//if waitResult == 0 {
//    print("mission completed") // group中的任务全部执行完毕
//} else {
//    print("out of time") // group中有任务超时
//}

// ------------------------------我是分界线-----------------------------------------

//let queue1 = dispatch_queue_create("queue1", DISPATCH_QUEUE_CONCURRENT)
//dispatch_async(queue1) { () -> Void in
//    let r = Double(random() % 10)
//    NSThread.sleepForTimeInterval(0.02 * r)
//    print("read 1")
//}
//dispatch_async(queue1) { () -> Void in
//    let r = Double(random() % 10)
//    NSThread.sleepForTimeInterval(0.02 * r)
//    print("read 2")
//}
//dispatch_async(queue1) { () -> Void in
//    let r = Double(random() % 10)
//    NSThread.sleepForTimeInterval(0.02 * r)
//    print("read 3")
//}
//// 关于读写的数据同步操作，为处理数据而作
//// 等待前面的任务完成后, 优先执行dispatch_barrier_async的任务
//// 就像名字barrier一样, [屏障; 障碍; 栅栏; 分界线;]
//dispatch_barrier_async(queue1) { () -> Void in
//    let r = Double(random() % 10)
//    NSThread.sleepForTimeInterval(0.02 * r)
//    print("write 1")
//}
//dispatch_async(queue1) { () -> Void in
//    let r = Double(random() % 10)
//    NSThread.sleepForTimeInterval(0.02 * r)
//    print("read 4")
//}
//dispatch_async(queue1) { () -> Void in
//    let r = Double(random() % 10)
//    NSThread.sleepForTimeInterval(0.02 * r)
//    print("read 5")
//}
//dispatch_async(queue1) { () -> Void in
//    let r = Double(random() % 10)
//    NSThread.sleepForTimeInterval(0.02 * r)
//    print("read 6")
//}

// ------------------------------我是分界线-----------------------------------------

//// 执行相应次数, 会阻塞
//dispatch_apply(3, globalDispatchQueueHigh) { (index) -> Void in
//    print("dispatch_apply : \(index)")
//}

// ------------------------------我是分界线-----------------------------------------

//let queue2 = dispatch_queue_create("queue2", DISPATCH_QUEUE_CONCURRENT)
//
//dispatch_async(queue2) { () -> Void in
//    let r : Double = 1
//    NSThread.sleepForTimeInterval(r)
//    // 挂起队列
//    dispatch_suspend(queue2)
//    print("queue2 1")
//    
//    NSThread.sleepForTimeInterval(2)
//    
//    // 恢复队列
//    dispatch_resume(queue2)
//    print("queue2 2")
//}

// ------------------------------我是分界线-----------------------------------------

struct Static {
    static var pred: dispatch_once_t = 0
}
func testOnce() {
    dispatch_once(&Static.pred) { () -> Void in
        print("dispatch once") // 这里只会执行一次
    }
    print("dispatch more")
}

testOnce()
testOnce()

// ------------------------------我是分界线-----------------------------------------

// ------------------------------我是分界线-----------------------------------------

// 标识等待循环, import XCPlayground
XCPlaygroundPage.currentPage.needsIndefiniteExecution = true
```

# Learn From

[GCD(Grand Central Dispatch)](http://www.cnblogs.com/SnailFish/articles/3199863.html)

[并发编程：API 及挑战](http://wiki.jikexueyuan.com/project/objc/concurrent-programming/2-1.html)

