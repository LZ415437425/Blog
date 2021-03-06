// 外观模式
// 百度百科：为子系统中的一组接口提供一个一致的界面，定义一个高层接口，这个接口使得这一子系统更加容易使用
// 设计模式分类：结构型模式

import Foundation

enum Eternal {
    
    static func setObj(value: AnyObject!, forKey defaultName: String!) {
        let defaults:NSUserDefaults = NSUserDefaults.standardUserDefaults()
        defaults.setObject(value, forKey:defaultName)
        defaults.synchronize()
    }
    
    static func getObj(defaultName: String!) -> AnyObject! {
        let defaults:NSUserDefaults = NSUserDefaults.standardUserDefaults()
        
        return defaults.objectForKey(defaultName)
    }
    
}

// *** 注意， 在playground中NSUserDefaults无法使用， 请在普通项目中测试
Eternal.setObj("Disconnect me. I’d rather be nothing", forKey:"Bishop")
Eternal.getObj("Bishop")