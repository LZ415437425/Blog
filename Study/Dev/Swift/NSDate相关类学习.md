**From**

[这是一篇写给新手的NSDate教程（Swift版）](http://www.cocoachina.com/swift/20151126/14430.html)

**Code**

``` swift
//: Playground - noun: a place where people can play

import UIKit

var str = "Hello, playground"

// ========== NSDate日期

let currentDate = NSDate()
let dateFormatter = NSDateFormatter()

dateFormatter.dateStyle = NSDateFormatterStyle.FullStyle

// 本地化local
dateFormatter.locale = NSLocale(localeIdentifier: "zh_Hans_CN")
dateFormatter.stringFromDate(currentDate)
dateFormatter.locale = NSLocale(localeIdentifier: "en_US")
dateFormatter.stringFromDate(currentDate)


// 样式style
// 1
dateFormatter.dateStyle = NSDateFormatterStyle.FullStyle
dateFormatter.stringFromDate(currentDate)
// 2
dateFormatter.dateStyle = NSDateFormatterStyle.LongStyle
dateFormatter.stringFromDate(currentDate)
// 3
dateFormatter.dateStyle = NSDateFormatterStyle.MediumStyle
dateFormatter.stringFromDate(currentDate)
// 4
dateFormatter.dateStyle = NSDateFormatterStyle.ShortStyle
dateFormatter.stringFromDate(currentDate)

// 自定义dateFormat
//EEEE：“星期”的全名（比如Monday）。如需缩写，指定1-3个字符（如E，EE，EEE代表Mon）。
//MMMM：“月份”的全名（比如October）。如需缩写，指定1-3个字符（如M，MM，MMM代表Oct）。
//dd：某月的第几天（例如，09或15）
//yyyy：四位字符串表示“年”（例如2015）
//HH：两位字符串表示“小时”（例如08或19）
//mm：两位字符串表示“分钟”（例如05或54）
//ss：两位字符串表示“秒”
//zzz：三位字符串表示“时区”（例如GMT）
//GGG：公元前BC或公元后AD
dateFormatter.dateFormat = "yyyy/MM/dd"
dateFormatter.stringFromDate(currentDate)

// 从字符串获取日期
if let d = dateFormatter.dateFromString("2000/01/01") {
    d
}

// ========== NSDateComponents日期组件
let calendar = NSCalendar.currentCalendar()
let unitFlags: NSCalendarUnit = [NSCalendarUnit.Era,
    NSCalendarUnit.Year,
    NSCalendarUnit.Month,
    NSCalendarUnit.Day,
    NSCalendarUnit.Hour,
    NSCalendarUnit.Minute,
    NSCalendarUnit.Second,
    NSCalendarUnit.Weekday,
    NSCalendarUnit.WeekOfMonth,
    NSCalendarUnit.WeekOfYear,
    NSCalendarUnit.YearForWeekOfYear,
    NSCalendarUnit.Nanosecond,
    NSCalendarUnit.Calendar,
    NSCalendarUnit.TimeZone]
let dateComponects = calendar.components(unitFlags, fromDate: currentDate)

dateComponects.era
dateComponects.year
dateComponects.month
dateComponects.day
dateComponects.hour
dateComponects.minute
dateComponects.second
dateComponects.weekday
dateComponects.weekOfMonth
dateComponects.weekOfYear
dateComponects.yearForWeekOfYear
dateComponects.nanosecond
dateComponects.calendar
dateComponects.timeZone


calendar.dateFromComponents(dateComponects)

// TimeZone时区
//GMT = Greenwich Mean Time（格林尼治标准时间）
//CST = China Standard Time（中国标准时间）
//CET = Central European Time(欧洲中部时间）
dateComponects.timeZone = NSTimeZone(abbreviation: "GMT")
calendar.dateFromComponents(dateComponects)
dateComponects.timeZone = NSTimeZone(abbreviation: "CST")
calendar.dateFromComponents(dateComponects)
dateComponects.timeZone = NSTimeZone(abbreviation: "CET")
calendar.dateFromComponents(dateComponects)

// ========== NSDate日期比较

let d1 = NSDate()
let d2 = NSDate()

//1. earlierDate返回早的日期, laterDate返回迟的日期
d1.earlierDate(d2)
d1.laterDate(d2)

//2. compare返回NSComparisonResult
switch d1.compare(d2) {
case NSComparisonResult.OrderedAscending:
    print("OrderedAscending")
case NSComparisonResult.OrderedDescending:
    print("OrderedDescending")
default:
    print("default")
}

//3.timeIntervalSinceReferenceDate
if d1.timeIntervalSinceReferenceDate > d2.timeIntervalSinceReferenceDate {
    print("Date1 is Later than Date2")
}
else if d1.timeIntervalSinceReferenceDate <  d2.timeIntervalSinceReferenceDate {
    print("Date1 is Earlier than Date2")
}
else {
    print("Same dates")
}

// ========== 计算未来和过去的日期
//1.更改某项
var calculatedDate = NSCalendar.currentCalendar().dateByAddingUnit(NSCalendarUnit.Month, value: 1, toDate: currentDate, options: NSCalendarOptions.init(rawValue: 0))

//2.更改多项
let newDateComponents = NSDateComponents()
newDateComponents.month = 1
newDateComponents.day = 2

calculatedDate = NSCalendar.currentCalendar().dateByAddingComponents(newDateComponents, toDate: currentDate, options: NSCalendarOptions.init(rawValue: 0))

// ========== 计算日期间隔
//1.
var diffDateComponents = NSCalendar.currentCalendar().components([NSCalendarUnit.Year, NSCalendarUnit.Month, NSCalendarUnit.Day, NSCalendarUnit.Hour, NSCalendarUnit.Minute, NSCalendarUnit.Second], fromDate: currentDate, toDate: calculatedDate!, options: NSCalendarOptions.init(rawValue: 0))

print("The difference between dates is: \(diffDateComponents.year) years, \(diffDateComponents.month) months, \(diffDateComponents.day) days, \(diffDateComponents.hour) hours, \(diffDateComponents.minute) minutes, \(diffDateComponents.second) seconds")

//2.
let dateComponentsFormatter = NSDateComponentsFormatter()
dateComponentsFormatter.unitsStyle = NSDateComponentsFormatterUnitsStyle.Full

let interval = calculatedDate!.timeIntervalSinceDate(currentDate)
dateComponentsFormatter.stringFromTimeInterval(interval)

//3.
dateComponentsFormatter.allowedUnits = [NSCalendarUnit.Year, NSCalendarUnit.Month, NSCalendarUnit.Day, NSCalendarUnit.Hour, NSCalendarUnit.Minute, NSCalendarUnit.Second]
let autoFormattedDifference = dateComponentsFormatter.stringFromDate(calculatedDate!, toDate: currentDate)
```

