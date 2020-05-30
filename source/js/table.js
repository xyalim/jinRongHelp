var table = {};

function newReportTable(reportData) {
    $("#report-body-container").attr("style", "")
        // 数据表格数据显示 s
    var dataBodyHtml = ""
    var getTableFieldList = globalFn.getTableField([])

    function dataForm(tableFieldList, jsonData) {
        var tdHtml = ""
        for (var i = 0; i < tableFieldList.length; i++) {
            tdHtml += `<td>${jsonData[tableFieldList[i]]}</td>`
        }
        var dataTrHtml = `
                            <tr class="data-td">
                                ${tdHtml}
                            </tr>
                        `;
        return dataTrHtml
    }

    for (var i = 0; i < reportData.length; i++) {
        dataBodyHtml += dataForm(getTableFieldList, reportData[i])
    }
    // 数据表头数据
    var dataHeaderHtml = ""
    for (var i = 0; i < getTableFieldList.length; i++) {
        dataHeaderHtml += `<th>${getTableFieldList[i]}</th>`
    }

    $("#data-body").html(dataBodyHtml)
    $("#hid-header").html(dataHeaderHtml)
    var hidHeight = $("#hid-header").height()
    var headerWidth = $("#report-body").width()
    var headerOuterWidth = $("#report-body").outerWidth()
    var scrollWidth = 20; //滚动条大致宽度 这里可优化动态获取数据
    var headerShowWidth = headerWidth + scrollWidth
    var thWidthList = []; //记录表头各表格宽度

    $("#report-body").css({
        "margin-top": -hidHeight + "px"
    })

    // 为解决overflow样式问题
    $("#report-body-container").css({
        // width: headerShowWidth + "px"
        width: headerWidth + "px"
    })
    $("#report-header").css({
        width: headerOuterWidth + "px"
    })
    $("#hid-header>th").each(function() {
        thWidthList.push($(this).outerWidth())
    })

    $("#header-over").html(dataHeaderHtml)

    $("#header-over>th").each(function(index) {
        $(this).css({
            width: thWidthList[index]
        })
    })

    // 数据表格数据显示 e

}

// 分页
function pageBreak(countPage, nowPage, ) {
    countPage = countPage || 1;
    nowPage = nowPage || 1;

    var demo1 = BootstrapPagination($("#page-break"), {
        // layoutScheme: "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
        layoutScheme: "firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
        //记录总数。
        total: countPage,
        //分页尺寸。指示每页最多显示的记录数量。
        pageSize: 20,
        //当前页索引编号。从其开始（从0开始）的整数。
        pageIndex: nowPage,
        //指示分页导航栏中最多显示的页索引数量。
        pageGroupSize: 5,
        //位于导航条左侧的输出信息格式化字符串
        // leftFormateString: "本页{count}条记录/共{total}条记录",
        //位于导航条右侧的输出信息格式化字符串
        rightFormateString: "第{pageNumber}页/共{totalPages}页",
        //页码文本格式化字符串。
        pageNumberFormateString: "{pageNumber}",
        //分页尺寸输出格式化字符串
        pageSizeListFormateString: "每页显示{pageSize}条记录",
        //上一页导航按钮文本。
        prevPageText: "上一页",
        //下一页导航按钮文本。
        nextPageText: "下一页",
        //上一组分页导航按钮文本。
        prevGroupPageText: "上一组",
        //下一组分页导航按钮文本。
        nextGroupPageText: "下一组",
        //首页导航按钮文本。
        firstPageText: "首页",
        //尾页导航按钮文本。
        lastPageText: "尾页",
        //设置页码输入框中显示的提示文本。
        pageInputPlaceholder: "Go",
        //接受用户输入内容的延迟时间。单位：毫秒
        pageInputTimeout: 1000,
        //分页尺寸列表。
        pageSizeList: [5, 10, 20, 50, 100, 200],
        //当分页更改后引发此事件。
        pageChanged: function(pageIndex, pageSize) {
            console.log("page changed. pageIndex:" + pageIndex + ",pageSize:" + pageSize)

        },
    });
}

table.newReportTable = newReportTable
table.pageBreak = pageBreak

function refreshBtn() {
    $("#refresh-btn").on('click', function() {
        var data;
        data = globalFn.getSearchCondition()
        globalFn.getReportData(data, function(res) {
            table.newReportTable(res);
        })
    })
}
refreshBtn();

pageBreak()