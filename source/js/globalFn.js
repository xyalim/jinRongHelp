var globalFn = {

    getTableField: function getTableField(tableFieldList) {
        // 表格将要显示的数据字段
        $(".table-field-checkbox").each(function(index) {
            if ($(this)[0].checked === true) {
                tableFieldList.push($(this).val())
            }
        })
        return tableFieldList
    },

    // 获得搜索数据的条件信息
    getSearchCondition: function getSearchCondition() {

        var infoJson = {}
        $(".condition-row").each(function(index) {
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
        globalFn.getTableField(infoJson.tableFieldList)

        // 搜索框的内容
        infoJson.searchInfo = $("#search-report-info").val()
        console.log(infoJson)
        return infoJson
    },
    getReportData: function(data, fn) {
        // var tableJson;
        return $.ajax({
            url: './js/table.json',
            type: 'get',
            // 设置的是请求参数
            // data: { id: 1, name: '张三' },
            // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
            dataType: 'json',
            success: function(res) {
                fn(res)
            },
            error: function() {
                alert('数据获取失败！')
                fn([])
            }
        })

    },

    getConditionData: function(fn) {
        // var tableJson;
        return $.ajax({
            url: './js/condition.json',
            type: 'get',
            // 设置的是请求参数
            // data: { id: 1, name: '张三' },
            // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
            dataType: 'json',
            success: function(res) {
                fn(res)
            },
            error: function() {
                alert('条件选项数据获取失败！')
                fn([])
            }
        })

    },

    getTableFieldData: function(fn) {
        return $.ajax({
            url: './js/tableField.json',
            type: 'get',
            // 设置的是请求参数
            // data: { id: 1, name: '张三' },
            // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
            dataType: 'json',
            success: function(res) {
                fn(res)
            },
            error: function() {
                alert('表头数据获取失败！')
                fn([])
            }
        })
    }
}