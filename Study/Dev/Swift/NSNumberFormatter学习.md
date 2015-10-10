``` swift
//: Playground - noun: a place where people can play

import UIKit

var str = "Hello, playground"

var numberFormatter: NSNumberFormatter = NSNumberFormatter()

// 1. localizedStringFromNumber

// 无样式 "1234567890"
NSNumberFormatter.localizedStringFromNumber(NSNumber(double: 1234567890.1234567890), numberStyle: NSNumberFormatterStyle.NoStyle)
// 小数样式 "1,234,567,890.123"
NSNumberFormatter.localizedStringFromNumber(NSNumber(double: 1234567890.1234567890), numberStyle: NSNumberFormatterStyle.DecimalStyle)
// 货币样式 "$1,234,567,890.12"
NSNumberFormatter.localizedStringFromNumber(NSNumber(double: 1234567890.1234567890), numberStyle: NSNumberFormatterStyle.CurrencyStyle)
// 百分比样式 "14%"
NSNumberFormatter.localizedStringFromNumber(NSNumber(double: 0.1415), numberStyle: NSNumberFormatterStyle.PercentStyle)
// 科学计数样式 "1.23456789012346E9"
NSNumberFormatter.localizedStringFromNumber(NSNumber(double: 1234567890.1234567890), numberStyle: NSNumberFormatterStyle.ScientificStyle)
// 英文拼写样式 "one billion two hundred thirty..."
NSNumberFormatter.localizedStringFromNumber(NSNumber(double: 1234567890.1234567890), numberStyle: NSNumberFormatterStyle.SpellOutStyle)
// ios 9 次序样式 "1st"
NSNumberFormatter.localizedStringFromNumber(NSNumber(integer: 1), numberStyle: NSNumberFormatterStyle.OrdinalStyle)
// ios 9 货币ISO码样式 "USD1,234,567,890.12"
NSNumberFormatter.localizedStringFromNumber(NSNumber(double: 1234567890.1234567890), numberStyle: NSNumberFormatterStyle.CurrencyISOCodeStyle)
// ios 9 货币复数样式 "1,234,567,890.12 US dollars"
NSNumberFormatter.localizedStringFromNumber(NSNumber(double: 1234567890.1234567890), numberStyle: NSNumberFormatterStyle.CurrencyPluralStyle)
// ios 9 货币会计样式 "$1,234,567,890.12"
NSNumberFormatter.localizedStringFromNumber(NSNumber(double: 1234567890.1234567890), numberStyle: NSNumberFormatterStyle.CurrencyAccountingStyle)

// 2. 实例变量

numberFormatter.numberStyle.rawValue // numberStyle 0
numberFormatter.locale.localeIdentifier // 语言环境 语言环境
numberFormatter.generatesDecimalNumbers // 是否生成小数 false
numberFormatter.formatterBehavior.rawValue // formatterBehavior 1,040
numberFormatter.negativeFormat // 负格式 "#"
numberFormatter.textAttributesForNegativeValues // textAttributesForNegativeValues nil
numberFormatter.positiveFormat // 正格式 "#"
numberFormatter.textAttributesForPositiveValues // textAttributesForPositiveValues nil
numberFormatter.allowsFloats // 是否允许浮点值 true
numberFormatter.decimalSeparator // 小数分隔符 "."
numberFormatter.alwaysShowsDecimalSeparator // 是否始终显示小数分隔符 false
numberFormatter.currencyDecimalSeparator // 货币小数分隔符 "."
numberFormatter.usesGroupingSeparator // 是否采用分组分隔符 false
numberFormatter.groupingSeparator // 分组分隔符 ","
numberFormatter.zeroSymbol // 零符号 nil
numberFormatter.textAttributesForZero // 文本属性 nil
numberFormatter.nilSymbol // nil符号 ""
numberFormatter.textAttributesForNil // 文本属性 nil
numberFormatter.notANumberSymbol // 非数字符号 "NaN"
numberFormatter.textAttributesForNotANumber // 文本属性 nil
numberFormatter.positiveInfinitySymbol // 正无穷大符号 "+∞"
numberFormatter.textAttributesForPositiveInfinity // 文本属性 nil
numberFormatter.negativeInfinitySymbol // 负无穷大符号 "+∞"
numberFormatter.textAttributesForNegativeInfinity // 文本属性 nil
numberFormatter.positivePrefix // 正前缀 ""
numberFormatter.positiveSuffix // 正后缀 ""
numberFormatter.negativePrefix // 负前缀 "-"
numberFormatter.negativeSuffix // 负后缀 ""
numberFormatter.currencyCode // 货币代码 "USD"
numberFormatter.currencySymbol // 货币符号 "$"
numberFormatter.internationalCurrencySymbol // 国际货币符号 "USD"
numberFormatter.percentSymbol // 百分号符号 "%"
numberFormatter.perMillSymbol // 千分号符号 "‰"
numberFormatter.minusSign // 减号 "-"
numberFormatter.plusSign //加号 "+"
numberFormatter.exponentSymbol // 指数符号 "E"
numberFormatter.groupingSize // 分组大小 0
numberFormatter.secondaryGroupingSize // 第二分组大小 0
numberFormatter.multiplier // 乘数 nil
numberFormatter.formatWidth // 格式宽度 0
numberFormatter.paddingCharacter // 填充字符 "*"
numberFormatter.paddingPosition.rawValue // 填充位置 0
numberFormatter.roundingIncrement // 舍入增量 0
numberFormatter.minimumIntegerDigits // 最小的整数位 0
numberFormatter.maximumIntegerDigits // 最大的整数位 42
numberFormatter.minimumFractionDigits // 最小的小数位数 0
numberFormatter.maximumFractionDigits // 最大的小数位数 0
numberFormatter.minimum // 最小值 nil
numberFormatter.maximum // 最大值 nil
numberFormatter.currencyGroupingSeparator // 货币分组符号 ","
numberFormatter.lenient // false
numberFormatter.usesSignificantDigits // 是否使用有效数字 false
numberFormatter.minimumSignificantDigits // 最小有效数字 1
numberFormatter.maximumSignificantDigits // 最大有效数字 6
numberFormatter.partialStringValidationEnabled // 是否部分字符串验证启用 false

// 3. demo 格式化银行卡 4个数字一组

numberFormatter.groupingSize = 4
numberFormatter.usesGroupingSeparator = true
numberFormatter.groupingSeparator = " "

let number: NSNumber = NSNumber(double: 1234567890)

numberFormatter.stringFromNumber(number) // "12 3456 7890"
numberFormatter.numberFromString("2345 6789") // 23,456,789
```
