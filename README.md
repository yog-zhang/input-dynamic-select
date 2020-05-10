# input-dynamic-select简介

## 概述

在做项目的时候，经常会用到动态搜索下拉框的需求，
网上也没有找到很好的插件来达到这个目的，于是自己开发了一个这样的插件。
该插件将更多的配置权给用户，用户可以根据自己的需求进行配置这个动态下拉框

## 使用

### 下载安装
1. 下载node包<br>
`npm install input-dynamic-select --save`
在需要使用的代码中导入该插件
`import DSelect from 'input-dynamic-select'`

2. 或全局引入 <br>
`<script src='./dSelect.js'></script>`

### 创建插件对象

`let dSelect = new DSelect(id, classArray)`

说明 <br>
id: 绑定的input输入框的id选择器名称，如下面的'inputId'<br>
classArray: 下拉框的类配置数组，每个元素都是JSON对象，将整个下拉框显示样式完全交给用户配置<br>
classArray[0]：配置下拉框最外层节点（即ul元素）的类样式，对应下面的ul元素的类选择器'iuds-selectPanel-0'的样式<br>
classArray[1]：配置下拉框最外层节点的直接子代节点（即li元素）的类样式，对应下面的li元素的样式<br>
classArray[2]：配置鼠标悬浮在下拉框最外层节点的直接子代节点（即li元素）的类样式，对应下面悬浮在li元素上时的样式<br>
classArray[3]：配置下拉框最外层节点的直接子代节点包含的输入框关键字（即span）的类样式，对应下面span元素的样式<br>

动态下拉框的html结构如下：
```
<div style="width: 200px;">
    <input type="text" id="inputId">
    <ul class="iuds-selectPanel-0 iuds-selectPanel-common">
        <li><span>男子</span>单打羽毛球</li>
        <li><span>男子</span>双打乒乓球</li>
        <li><span>男子</span>单打网球</li>
    </ul>
</div>
```
备注：可以看到ul元素有两个类选择器，第一个类选择器是根据该下拉框是第几个被创建的实例，
如'iuds-selectPanel-0'则表示是第一个被创建的下拉框实例，所以后面是索引'0',前面部分的名字是固定的；
第二个类选择器名字是固定的，所有的下拉框实例共同的类选择器都是'iuds-selectPanel-common'，
所以可以通过这个类选择器对所有的下拉框设置共同的样式<br>
例如：
```
let dSelect = new DSelect('inputNode',
        [
            {
                'list-style-type': 'none',
                'margin': '0',
                'padding': '0',
                'border': '1px solid #d9d9d9',
                'background-color': '#fff',
                'width': '160px',
                'height': '200px',
            },
            {
                'padding-left': '5px',
                'line-height': '30px'
            },
            {
                'background-color': '#d9d9d9',
                'cursor': 'pointer'
            },
            {
                'color': 'red',
                'font-weight': 'bolder'
            }
        ]
    )
```
### 设置数据列表
`dSelect.setDataList(dataList)`

<br>说明：<br>
dataList: 数组类型，传入从后台返回的数据<br>

例如：
```
$.ajax({ 
    url: "xxxx", 
    success: function(data){
        dSelect.setDataList(data)
      }
    })
```
当然这是要配合input框的的输入进行动态查询，所以需要将请求封装成一个方法，
然后每当input框输入关键字查询，就会调用该方法，动态获取请求数据列表

### 获取下拉框的一些选项
`dSelect.getOptions()`

<br>说明：<br>
返回的是一个对象：
```
{
    inputId: 绑定的input输入框id选择器名称
    instanceSeq: 下拉框实例化时的序号
    selectClass: 动态下拉框类选择器名称
    inputNode: 绑定的input输入框节点
    selectNode: 动态下拉框节点
    dataList: 查询的数据列表
}
```
