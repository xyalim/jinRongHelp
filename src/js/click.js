import table from './table.js' //选择内容部分
import select from './select.js' //选择内容部分
import globalFn from './globalFn.js' //选择内容部分

import Calendar from '../lib/Calendar.js'

function getCalendar() {
    // 日历点击事件 s
    // 日期选择器初始化 参数列表如下 开始年(number) 结束年(number) 语言(number)中文[0,3] [1,2]英文 分隔符(string)具体看源码吧
    // http://www.jq22.com/jquery-info5732
    // Calendar(beginYear, endYear, language, patternDelimiter, date2StringPattern, string2DatePattern)
    var today = new Date();
    var nowYear = today.getFullYear();
    var calendar = new Calendar(1900, nowYear, 0, )
    $("#condition-row6-0").on("click", function(e) {
        calendar.show(this)
    })

    $("#condition-row6-1").on("click", function(e) {
        calendar.show(this)
    })

    // 日历点击事件 e

}
var searchCondition;

// function searchBtn() {

//     $("#search-report-btn ").on('click', function() {
//         searchCondition = globalFn.getSearchCondition();
//         // table.newReportTable(searchCondition)
//     })
//     return searchCondition;
// }
// searchBtn();

function refreshBtn() {
    $("#refresh-btn").on('click', function() {
        table.newReportTable(globalFn.getReportData());
    })
}

getCalendar();
refreshBtn();