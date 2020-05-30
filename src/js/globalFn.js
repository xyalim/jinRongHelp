import tableJson from "./table.json"

function getTableField(tableFieldList) {
    // 表格将要显示的数据字段
    $(".table-field-checkbox").each(function(index, item) {
        if ($(this)[0].checked === true) {
            tableFieldList.push($(this).val())
        }
    })
    return tableFieldList
}

// 获得搜索数据的条件信息
function getSearchCondition() {

    var infoJson = {}
    $(".condition-row").each(function(index, item) {
        // var conditionName = $(item)(".condition-name").text()
        // console.log(index, this,item, conditionName)
        var conditionNameTd = $(this).children(".condition-name")[0]
        var conditionName = $(conditionNameTd).text()
        var fromVal, toVal;
        // 前6项取按钮内容
        if (index !== 6) {
            fromVal = $(`#condition-row${index}-0`).data().id
            toVal = $(`#condition-row${index}-1`).data().id
        } else {
            // 最后一项是取时间
            fromVal = $(`#condition-row${index}-0`).val()
            toVal = $(`#condition-row${index}-1`).val()
        }
        infoJson[conditionName] = [fromVal, toVal]

    })

    // 获得表头字段信息
    infoJson.tableFieldList = []
    getTableField(infoJson.tableFieldList)

    // 搜索框的内容
    infoJson.searchInfo = $("#search-report-info").val()
    console.log(infoJson)
    return infoJson
}

function getReportData() {
    return tableJson;
}
export default {
    getTableField,
    getSearchCondition,
    getReportData,
}