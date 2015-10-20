[iOS Storyboard unwind segues使用小结​]( http://blog.csdn.net/kid_devil/article/details/23218195	"iOS Storyboard unwind segues使用小结")

参考上面的文章可知, 使用unwind segue可以返回前一个viewcontroller, 甚至是更加前面的viewcontroller.

不过我在UINavigationController中使用的时候发现有问题.

假设我们有这样3个viewcontroller,包含一样名字的unwind方法, vc1包含在UINavigationController中.

- vc1
  
  unwind()
  
  buttonFrom1To2按钮跳转到vc2
  
- vc2
  
  unwind()
  
  buttonFrom2To3按钮跳转到vc3
  
  buttonFrom2To1按钮绑定vc1的unwind(),跳转到vc1
  
- vc3
  
  buttonFrom3To1按钮绑定vc1的unwind(),跳转到vc1
  
  buttonFrom3To2按钮绑定vc2的unwind(),跳转到vc2

运行后你会发现不能从vc3跳转到vc1

苹果官方的技术文章是说要override 方法viewControllerForUnwindSegueAction, 不过这个方法在ios9中废弃了`@available(iOS, introduced=6.0, deprecated=9.0)`

[Using Unwind Segues​]( https://developer.apple.com/library/ios/technotes/tn2298/_index.html	"Using Unwind Segues")

目前我的做法是定义多个unwind方法,如下

- vc1
  
  unwindFrom2To1()
  
  unwindFrom3To1()
  
  buttonFrom1To2按钮跳转到vc2
  
- vc2
  
  unwindFrom3To2()()
  
  buttonFrom2To3按钮跳转到vc3
  
  buttonFrom2To1按钮绑定vc1的unwindFrom2To1(),跳转到vc1
  
- vc3
  
  buttonFrom3To1按钮绑定vc1的unwindFrom3To1(),跳转到vc1
  
  buttonFrom3To2按钮绑定vc2的unwindFrom3To2(),跳转到vc2

这样可以正确地从vc3跳转到vc1.



demo代码放在同级目录下, 有兴趣的可以下载看看

运行环境是xcode7.0.1, deploy target是9.0, 语言是swift
