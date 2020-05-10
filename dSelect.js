
function DSelect(id,StyleObjArr){
    this.id = id
    this.dataList = null
    this.StyleObjArr = StyleObjArr
    // this.keywords = ''
    // this.realDataList = []
    this.curItemIndex = -1
    this.instanceSeq = 0
    this.inputNode = document.querySelector('#' + id)
    this.updownSelectNode = null
    this.init()
}

// 创建的实例个数
DSelect.prototype.instanceCount = 0

/**
 * 初始化对象
 */
DSelect.prototype.init = function(){
    if(!this.inputNode){
        console.error(`id为${this.id}的input元素不存在！`)
        return
    }
    let self = this
    this.createSelectNode()
    this.inputNode.addEventListener('input',function(e){
        // 输入框改变时，索引值复位
        self.curItemIndex = -1
    })
    this.inputNode.addEventListener('keyup', function(e){
        let keyCodeArr = [9,16,17,18,20,27,33,34,35,36,37,38,39,40,45,144]
        if(e.keyCode === 38){
            self.arrowOper('up')
        } else if(e.keyCode === 40){
            self.arrowOper('down')
        } else if(e.keyCode === 13){
            self.updownSelectNode.style.display = 'none'
        }

        if(keyCodeArr.indexOf(e.keyCode) == -1){
            self.curItemIndex = -1
        }

    })
    this.updownSelectNode.addEventListener('click', function(e){
        self.selectItem(e.target.getAttribute('data-item'))
    })

}

/**
 * 设置下拉列表数据
 */
DSelect.prototype.setData = function(data){
    if(!Array.isArray(data)){
        console.error('setData方法传入的参数只能为数组类型!')
    }
    this.dataList = data
    this.updownSelectNode.style.display = data && data.length > 0 ? 'block' : 'none'
    let keywords = this.inputNode.value
    keywords ? this.renderSelectList(keywords, data) : ''
}

/**
 * 设置下拉列表数据
 */
DSelect.prototype.setDataList = function(data){
    if(!Array.isArray(data)){
        console.error('setData方法传入的参数只能为数组类型!')
    }
    this.dataList = data
    this.updownSelectNode.style.display = data && data.length > 0 ? 'block' : 'none'
    let keywords = this.inputNode.value
    keywords ? this.renderSelectList(keywords, data) : ''
}

/**
 * 获取下拉列表数据
 */
DSelect.prototype.getDataList = function(){
    return this.dataList
}

/**
 * 创建下拉列表元素并添加类样式
 */
DSelect.prototype.createSelectNode = function(){
    let count = Object.getPrototypeOf(this).instanceCount++
    this.instanceSeq = count
    if(this.updownSelectNode && this.updownSelectNode.parentNode && this.updownSelectNode.parentNode.querySelector(`.iuds-selectPanel-${count}`)){
        this.updownSelectNode.parentNode.removeChild(this.updownSelectNode)
    }
    this.updownSelectNode = document.createElement('ul')
    this.updownSelectNode.setAttribute('class', `iuds-selectPanel-${count} iuds-selectPanel-common`)
    let style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    document.head.appendChild(style) 

    let ulStyleString = this.parseStyle(this.StyleObjArr && this.StyleObjArr.length > 0 ? this.StyleObjArr[0] : '', `.iuds-selectPanel-${count}`, 0)
    let liStyleString = this.parseStyle(this.StyleObjArr && this.StyleObjArr.length > 1 ? this.StyleObjArr[1] : '', `.iuds-selectPanel-${count} > li`, 1)
    let liHoverStyleString = this.parseStyle(this.StyleObjArr && this.StyleObjArr.length > 2 ? this.StyleObjArr[2] : '', `.iuds-selectPanel-${count} > li:hover`, 2)
    let spanStyleString = this.parseStyle(this.StyleObjArr && this.StyleObjArr.length > 3 ? this.StyleObjArr[3] : '', `.iuds-selectPanel-${count} > li > span`, 3)
    
    style.sheet.insertRule(ulStyleString)
    style.sheet.insertRule(liStyleString)
    style.sheet.insertRule(liHoverStyleString)
    style.sheet.insertRule(spanStyleString)
    style.sheet.insertRule(`.iuds-li-active{background-color: #d9d9d9;}`)

    this.insertAfter(this.updownSelectNode, this.inputNode)
}

/**
 * 解析传入进来的styleObj对象为样式字符串；
 * @styObj:传入的样式对象, 非必填项，有默认样式；
 * @selector: 选择器，必填项；
 * @styleLevel: 需要解析样式对象所在的节点层级，
 * 0代表解析的是ul元素的样式，1代表解析的是li元素的样式，
 * 2代表解析的是悬浮在li元素上时的样式，3代表解析的是span元素的样式，
 * 必填项
 */
DSelect.prototype.parseStyle = function(styleObj, selector, styleLevel){
    if(styleObj && typeof styleObj !== 'object'){
        console.error('parseStyle方法的styleObj参数只能为object类型!')
        return
    }
    if(!selector || typeof selector !== 'string'){
        console.error('parseStyle方法的selector参数只能为字符串类型!')
        return
    }
    if((styleLevel !== 0 && !styleLevel) || typeof styleLevel !== 'number'){
        console.error('parseStyle方法的styleLevel参数只能为数字类型!')
        return
    }
    if(styleObj && Object.keys(styleObj).length > 0){
        let styleString = `${selector}{`
        for(let item in styleObj){
            styleString += `${item}:${styleObj[item]};`
        }
        return styleString + '}'
    } else {
        let defaultStyleStringArr = []
        let defaultStyleString = `${selector}{`
        switch(styleLevel){
            case 0:
                defaultStyleStringArr = [
                    `width: ${this.inputNode.offsetWidth - 2}px`,
                    'height: 200px',
                    'display: none',
                    'list-style-type: none',
                    'margin: 0',
                    'padding: 0',
                    'border: 1px solid #d9d9d9',
                    'background-color: #ffffff',
                    'overflow-y: auto'
                ]
                break
            case 1: 
                defaultStyleStringArr = [
                    'padding-left: 5px',
                    'height: 30px',
                    'line-height: 30px'
                ]
                break
            case 2:
                defaultStyleStringArr = [
                    'background-color: #d9d9d9',
                    'cursor: pointer'
                ]
                break
            case 3:
                defaultStyleStringArr = [
                    'color: blue'
                ]
                break
            default:
                break
            
        }
        
        defaultStyleString += defaultStyleStringArr.join(';') + '}'
        return defaultStyleString
    }
}

/**
 * 将新节点插入到父元素某子节点后面
 * @newNode:新节点
 * @existNode: 已存在的节点
 */
DSelect.prototype.insertAfter = function(newNode,existNode){
    if(!existNode) {
        return
    }
    let parentNode = existNode.parentNode
    if(parentNode.lastElementChild == existNode){
        parentNode.appendChild(newNode)
    } else {
        parentNode.insertBefore(newNode, existNode.nextElementSibling)
    }
}
/**
 * 渲染下拉列表
 */
DSelect.prototype.renderSelectList = function(keywords,items){
    let renderHtml = ''
    if(keywords && keywords.trim() && items && items.length > 0){
        for(let item of items){
            renderHtml += `<li data-item=${item}>` + `${item}</li>`.replace(keywords,`<span>${keywords}</span>`)
        }
    }
    this.appendHtml(renderHtml)
}

DSelect.prototype.appendHtml = function(htmlString){
    this.updownSelectNode.innerHTML = htmlString
}

/**
 * input框设置选中的条目值
 */
DSelect.prototype.selectItem = function(item){
    debugger
    this.inputNode.value = item
    this.updownSelectNode.style.display = 'none'
}

/**
 * 在输入框按上下按键操作时，做相应的逻辑处理
 * @arrowType：按键类型，'up'表示向上按键操作，'down'表示向下按键操作
 */
DSelect.prototype.arrowOper = function(arrowType){
    let dataListLen = this.dataList.length
    let oldItemIndex = this.curItemIndex === -1 ? 0 : this.curItemIndex
    arrowType === 'up' ? this.curItemIndex-- : this.curItemIndex++
    if(arrowType === 'up' && this.curItemIndex < 0){
        oldItemIndex = 0
        this.curItemIndex = dataListLen -1
    } else if(arrowType = 'down' && this.curItemIndex > dataListLen - 1){
        this.curItemIndex = 0
    }
    // 滚动条随内容高度自动滚动
    let ulHeight = parseInt(this.getElementStyle(this.updownSelectNode, 'height') || this.getElementStyle(this.updownSelectNode, 'line-height'))
    let liHeight = parseInt(this.getElementStyle(this.updownSelectNode.querySelector('li'), 'height') || this.getElementStyle(this.updownSelectNode.querySelector('li'), 'line-height'))
    let scrollTopIndex = ulHeight / liHeight - 2
    scrollTopIndex > 0 && this.curItemIndex >= scrollTopIndex ? this.updownSelectNode.scrollTop = liHeight * (this.curItemIndex - scrollTopIndex) : this.updownSelectNode.scrollTop = 0
    this.inputNode.value = this.dataList[this.curItemIndex]
    this.activeItem(this.curItemIndex, oldItemIndex)
}

/**
 * 获取某个元素的某个样式的值
 */
DSelect.prototype.getElementStyle = function(element, styleName){
    if(!element || !styleName){
        return
    }
    //除了IE以外的浏览器获取样式方式
    if(window.getComputedStyle){
       return window.getComputedStyle(element, null)[styleName]
    } else {
        // IE浏览器获取样式
        return element.currentStyle[styleName]
    }
}

/**
 * 设置选中的条目样式
 */
DSelect.prototype.activeItem = function(nIndex, oIndex){
    let liNodes = this.updownSelectNode.querySelectorAll('li')
    if(liNodes && liNodes.length > 0){
        liNodes[oIndex].classList.contains('iuds-li-active') ? liNodes[oIndex].classList.remove('iuds-li-active') : ''
        liNodes[nIndex].classList.contains('iuds-li-active') ? '' : liNodes[nIndex].classList.add('iuds-li-active')
    }
}

/**
 * 获取下拉框的一些选项
 */
DSelect.prototype.getOptions = function(){
    return {
        inputId: this.id,
        instanceSeq: this.instanceSeq,
        selectClass: `iuds-selectPanel-${this.instanceSeq}`,
        inputNode: this.inputNode,
        selectNode: this.updownSelectNode,
        dataList: this.dataList
    }
}

export default DSelect