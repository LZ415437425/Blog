**步骤**

1. 引入`MessageUI.framework`框架
2. `import MessageUI`
3. 实现`MFMessageComposeViewControllerDelegate`协议的`messageComposeViewController`方法, 用来查看短信发送状态
4. 打开`MFMessageComposeViewController`



**完整代码**

``` swift
import UIKit
import MessageUI

class ViewController: UIViewController, MFMessageComposeViewControllerDelegate {
    
    @IBOutlet weak var toTextField: UITextField!
    @IBOutlet weak var bodyTextField: UITextField!
    @IBOutlet weak var bodySegmentedControl: UISegmentedControl!
    @IBOutlet weak var resultLabel: UILabel!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func onSendButtonClick(sender: UIButton) {
        sendMsg()
    }
    
    /**
     发送短信
     */
    func sendMsg() {
        if MFMessageComposeViewController.canSendText() {
            let controller = MFMessageComposeViewController()
            
            // 如果bodyTextField不为空, 就用bodyTextField的内容
            // 否则用bodySegmentedControl的选中的内容
            if let body = bodyTextField.text {
                if body == "" {
                    let index = bodySegmentedControl.selectedSegmentIndex
                    let body = bodySegmentedControl.titleForSegmentAtIndex(index)
                    controller.body = body
                } else {
                    controller.body = body
                }
            } else {
                let index = bodySegmentedControl.selectedSegmentIndex
                let body = bodySegmentedControl.titleForSegmentAtIndex(index)
                controller.body = body
            }
            
            if let to = toTextField.text {
                // 收信人, 这里用","分割多个收信人
                controller.recipients = to.componentsSeparatedByString(",")
                // 设置代理
                controller.messageComposeDelegate = self
                // 调用系统消息app
                self.presentViewController(controller, animated: true, completion: nil)
            } else {
                resultLabel.text = "toTextField can not be nil"
            }
        } else {
            resultLabel.text = "can not send text"
        }
    }

    func messageComposeViewController(controller: MFMessageComposeViewController, didFinishWithResult result: MessageComposeResult) {
        controller.dismissViewControllerAnimated(true) { () -> Void in
            print("dismiss finish")
        }
        
        switch result {
        case MessageComposeResultSent:
            resultLabel.text = "send success"
        case MessageComposeResultCancelled:
            resultLabel.text = "send cancelled"
        case MessageComposeResultFailed:
            resultLabel.text = "send failed"
        default:
            resultLabel.text = "send result unknown"
        }
    }
}


```