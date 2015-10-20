在storyboard界面中,有个First Responder的图标.

那么它是干什么用的呢? 实践出真知



我们新建个工程试试, 就叫TestFirstResponder

在默认的viewcontroller中拖入以下控件



| num  | type        | name      | description |
| ---- | ----------- | --------- | ----------- |
| 1    | UITextField | text1     | 文本框1        |
| 2    | UITextField | text2     | 文本框2        |
| 3    | UIButton    | select    | 选择按钮        |
| 4    | UIButton    | selectAll | 选择全部按钮      |
| 5    | UIButton    | copy      | 复制按钮        |
| 6    | UIButton    | cut       | 剪切按钮        |
| 7    | UIButton    | paste     | 黏贴按钮        |
| 8    | UIButton    | redo      | 前进按钮        |
| 9    | UIButton    | undo      | 后退按钮        |

然后右键点击各个按钮, 指向First Responder图标, 会出来个菜单, 选择按钮相应的事件(比如: copy按钮 ==> copy:事件).



运行app后, 在text1中写入hello world, 点击按钮selectAll, 点击按钮cut, 你会发现文字被剪切了.点击text2后, 点击paste按钮, 就会复制文字了.



其他按钮就不一一描述了.