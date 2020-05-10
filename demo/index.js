import $ from 'jquery'
import DSelect from 'input-dynamic-select'
// 第二个数组参数的每个元素都可以为空，如为空使用默认的样式  
let dSelect = new DSelect('inputId',
    [
        // ul元素上的类iuds-selectPanel-n的样式（n是当时创建的DSelect实例序列）
        {
            'display': 'none',
            'list-style-type': 'none',
            'margin': '0',
            'padding': '0',
            'border': '1px solid #d9d9d9',
            'background-color': '#ceffff',
            'width': '160px',
            'height': '200px',
            'overflow-y': 'auto'
        },
        // li元素上的样式
        {
            'padding-left': '5px',
            'line-height': '30px'
        },
        // 悬浮在li元素上的样式
        {
            'background-color': '#d9d9d9',
            'cursor': 'pointer'
        },
        // li元素下面span元素上的样式
        {
            'color': 'red',
            'font-weight': 'bolder'
        }
    ]
)
// 第二个参数传空，整个下拉框使用默认的样式
// let dSelect = new DSelect('inputId',null)
function ajaxFn(keywords){
    $.ajax({
        type: 'GET',
        url: `/mock?keywords=${keywords}`,
        async: true,
        contentType: 'application/json;charset=utf-8',
        success: function(data){
            if(data && data.length > 0){
                dSelect.setDataList(data)
            }
        },
        error:function(e){
            console.log(e)
        }
    })
}
let inputNode = document.querySelector('#inputId')
// 监听input输入框的input事件，动态从后台获取数据
inputNode.addEventListener('input', (e) => {
    let keywords = e.currentTarget.value
    ajaxFn(keywords)
})
//当敲击动态下拉框元素之外的元素时，隐藏下拉框
document.body.addEventListener('click',function(e){
    e.stopPropagation()
    let inputPanel = document.querySelector('.inputPanel')
    if(!inputPanel.contains(e.target)){
        dSelect.getOptions().selectNode.style.display = 'none'
    }
})

    