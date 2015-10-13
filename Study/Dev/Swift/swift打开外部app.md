### 1. 需要被打开的app设置

你的工程 -> TARGETS -> Info -> URL Types

追加一个url type,比如

* Identifier  : test.com
* Url Schemes : hello

### 2. 打算打开外部app的设置

Info.plist中追加一个选项(ios9开始需要追加这个设置)

LSApplicationQueriesSchemes 类型为array, 其下追加一个item, 值就是上面app的scheme: hello, 类型为String

打开外部app的代码为
``` swift
        let urlString = "hello://test.com"
        let url = NSURL(string: urlString)
        
        if let u = url {
            let canOpen = UIApplication.sharedApplication().canOpenURL(u)
            
            if canOpen {
                print("i can open it")
                
                UIApplication.sharedApplication().openURL(u)
            } else {
                print("i can not open it")
            }
        } else {
            print("url error")
        }
```
