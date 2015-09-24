a UIAlertController demo

``` swift
//
//  ViewController.swift
//  TestUIAlertController
//
//  Created by 童进 on 15/9/24.
//  Copyright © 2015年 qefee. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    func show(style:UIAlertControllerStyle) {
        
        let title = "This is a alert!"
        let message = "A long long long long long long long long long long long long long long long long message to show."
        let style = style
        
        let alert = UIAlertController(title: title, message: message, preferredStyle: style)
        
        // 默认样式按钮
        let defaultTitle = "Default"
        let defaultStyle = UIAlertActionStyle.Default
        let defaultHandler:((UIAlertAction) -> Void)? = { (action) -> Void in
            print("defaultHandler")
        }
        let defaultAction = UIAlertAction(title: defaultTitle, style: defaultStyle, handler: defaultHandler)
        
        // 取消样式按钮(加粗)
        let cancelTitle = "Cancel"
        let cancelStyle = UIAlertActionStyle.Cancel
        let cancelHandler:((UIAlertAction) -> Void)? = { (action) -> Void in
            print("cancelHandler")
        }
        let cancelAction = UIAlertAction(title: cancelTitle, style: cancelStyle, handler: cancelHandler)
        
        // 销毁样式按钮(红色)
        let destructiveTitle = "Destructive"
        let destructiveStyle = UIAlertActionStyle.Destructive
        let destructiveHandler:((UIAlertAction) -> Void)? = { (action) -> Void in
            print("destructiveHandler")
        }
        let destructiveAction = UIAlertAction(title: destructiveTitle, style: destructiveStyle, handler: destructiveHandler)
        
        alert.addAction(destructiveAction)
        alert.addAction(defaultAction)
        alert.addAction(cancelAction)
        
        self.presentViewController(alert, animated: true) { () -> Void in
            print("show alert finish")
        }
    }

    /**
    显示alert
    
    - parameter sender: sender
    */
    @IBAction func onAlertButtonClick(sender: UIButton) {
        show(UIAlertControllerStyle.Alert)
    }
    
    /**
    显示actionsheet
    
    - parameter sender: sender
    */
    @IBAction func onActionSheetButtonClick(sender: UIButton) {
        show(UIAlertControllerStyle.ActionSheet)
    }
}
```
