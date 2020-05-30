// table :report内tbody
import globalFn from './globalFn'
import condition from './condition.json'
// import table from './table.js' //选择内容部分

var _InquiryItem = [{
        name: "Customer",
        chooseType: "itemSelect",
        data1: condition,
        data2: condition,
    },
    {
        name: "Region",
        chooseType: "itemSelect",
        data1: condition,
        data2: condition,
    },
    {
        name: "Staff",
        chooseType: "itemSelect",
        data1: condition,
        data2: condition,
    },
    {
        name: "Series",
        chooseType: "itemSelect",
        data1: condition,
        data2: condition,
    },
    {
        name: "Product Code",
        chooseType: "itemSelect",
        data1: condition,
        data2: condition,
    },
    {
        name: "Customer Part No.",
        chooseType: "itemSelect",
        data1: condition,
        data2: condition,
    },
    {
        name: "Sales Quotation Date",
        chooseType: "dateSelect",
        // data1: [1, 2, 3, 4, 5],
        // data2: [6, 7, 8, 9, 10]
    },
]

// 下拉框组件
function chooseInput(objItemData, dataGroup, conditionNum) {

    var liList = "";
    for (var i = 0; i < objItemData.length; i++) {
        liList += `<li><a data-group="${dataGroup}-${conditionNum}" href="#" data-id="${objItemData[i].id}">${objItemData[i].name}</a></li>`;
    }
    var chooseInputItem = `
        <div class="dropdown">
        <button id="${dataGroup}-${conditionNum}" data-id="${objItemData[0].id}" class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        ${objItemData[0].name}
        <span class="caret"></span>
        </button>
        <ul class="condition-dropdown-menu dropdown-menu">
            ${liList}
        </ul>
        </div>
    `;
    return chooseInputItem;
}

var reportBodyHtml = ""

function formProcessing(item, index) {
    var leftChoose = "";
    var rightChoose = "";
    var groupName = "condition-row" + index;
    // 下拉框形式
    if (item.chooseType === "itemSelect") {
        leftChoose = chooseInput(item.data1, groupName, 0)
        rightChoose = chooseInput(item.data2, groupName, 1)
    }

    // 日期选择形式
    if (item.chooseType === "dateSelect") {
        leftChoose = `<input type="text" id="condition-row${index}-0" readonly="readonly">`
        rightChoose = `<input type="text" id="condition-row${index}-1" readonly="readonly">`
    }

    var getHtml = `
        <tr id="${groupName}" class="condition-row">
            <td class="condition-name">${item.name}</td>
            <td>From</td>
            <td class="condition-btn from-condition">${leftChoose}</td>
            <td>To</td>
            <td class="condition-btn to-condition">${rightChoose}</td>
        </tr>
    `
    return getHtml
}

for (var i = 0; i < _InquiryItem.length; i++) {
    reportBodyHtml += formProcessing(_InquiryItem[i], i);
}
$("#report-select").html(reportBodyHtml)


// 复选框html生成 s
var dropdownMenuHtml = ""
var isCheckedColor = "skyblue"
var disCheckedColor = "white"

// 请求显示的字段数据
var selectDateItem = ['status', 'res_company', 'expiry_date', 'id', 'billing', 'shipping_fax', 'customer_contact_person_list', 'discount', 'confirmation_date', 'contact_person', 'write_uid', 'actual_total_amount', 'billing_tel', 'billing_email', 'order_discount', 'billing_fax', 'total_amount_text_ft', 'shipping_email', 'shipping_address', 'create_uid', 'display_name', 'total_amount', 'price_list', 'billing_address', '__last_update', 'billing_name', 'create_date', 'remarks', 'digit_display', 'issue_index', 'order_line', 'remarks_template', 'payment_terms', 'total_amount_text', 'searchs', 'ref_num', 'handler', 'total_amount_text_jt', 'shipping', 'customer_fax', 'order_date', 'shipping_name', 'shipping_phone', 'quotation_down_payment', 'customer_telephone_no', 'related_orders', 'write_date', 'customer'];

function dropdownMenuForm(selArr) {
    var isChecked = true
    for (var i = 0; i < selArr.length; i++) {
        dropdownMenuHtml += `
        <label class="dropdown-item" for="${selArr[i]}"  style="background-color:${isChecked?isCheckedColor:disCheckedColor};" >
            <input type="checkbox" id="${selArr[i]}" data-field="id" value="${selArr[i]}" checked="${isChecked}" class="table-field-checkbox">
            ${selArr[i]}
        </label>
        `
    }
    return dropdownMenuHtml
}

$("#select-menu").html(dropdownMenuForm(selectDateItem))

// 阻止下拉菜单点击选项后直接退出选择框 搭配元素中的data-stopPropagation="true"这一属性使用
$("#select-menu").on("click", function(e) {
    e.stopPropagation();
    var target = e.target || e.srcElement;
    var targetParent = $(target).parent()
    if (target.checked) {
        targetParent.css({
            "background-color": isCheckedColor
        })
    } else {
        targetParent.css({
            "background-color": disCheckedColor
        })
    }
})

// 复选框html生成 e

// $('#myDropdown').on('show.bs.dropdown', function() {
// })
// $('#myDropdown').on('shown.bs.dropdown', function() {
// })
// $('#myDropdown').on('hide.bs.dropdown	', function() {
// })
// $('#myDropdown').on('hidden.bs.dropdown	', function() {
// })


// 条件选择时下拉框内选项的事件委托
$(".condition-dropdown-menu").on('click', function(e) {
    var target = e.target || e.srcElement;
    var $target = $(target)
    var groupName = $target.data().group;
    var targetId = $target.data().id;
    var targetName = $target.text();
    $(`#${groupName}`).text(targetName).attr("data-id", targetId)
})

var tableFieldList = globalFn.getTableField([])
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
    globalFn.getTableField(infoJson.tableFieldList)

    // 搜索框的内容
    infoJson.searchInfo = $("#search-report-info").val()
    console.log(infoJson)
    return infoJson
}
var searchCondition;
searchCondition = getSearchCondition();


export default { searchCondition }