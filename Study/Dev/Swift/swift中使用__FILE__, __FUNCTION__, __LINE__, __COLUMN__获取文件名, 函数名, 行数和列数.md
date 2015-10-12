swift中可以使用以下变量获取相应的信息

1. __FILE__     方法名
2. __FUNCTION__ 函数名
3. __LINE__     行数
4. __COLUMN__   列数

但是, 如果要封装成通用方法使用的话, 只能获取封装文件的信息. 要获取原始文件信息, 可以使用方法的默认值

``` swift
    public func printLog(logLevel: LogLevel, msg: String, fileName: String = __FILE__, functionName: String = __FUNCTION__, lineNum: Int = __LINE__, columnNum: Int = __COLUMN__) {
        let date = dateFormatter.stringFromDate(NSDate())
        
        print("\(date) \(fileName) : \(functionName) : \(lineNum) : \(columnNum) \(logLevel) \(msg)")
    }
```

参考 [SwiftLog](https://github.com/aotian16/SwiftLog SwiftLog)
