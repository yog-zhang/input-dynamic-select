let express = require('express')
let app = express()
app.get('/', function(req, res){
    res.redirect('/mock')
})
app.get('/mock', function(req, res){
    let keywords = req.query['keywords']
    let result = []
    let dataList = Array.of(
        "男子单打羽毛球",
        "女子单打羽毛球",
        "男子双打羽毛球",
        "女子双打羽毛球",
        "男女混双羽毛球",
        "男子单打乒乓球",
        "女子单打乒乓球",
        "男子双打乒乓球",
        "女子双打乒乓球",
        "男女混双乒乓球",
        "男子单打网球",
        "女子单打网球",
        "男子双打网球",
        "女子双打网球",
        "男女混双网球"
        )
    if(keywords && keywords.trim()){
        result = dataList.filter((val) => {
            return val.indexOf(keywords) > -1
        })
    }
    res.append('content-type','application/json;charset=utf-8')
    res.end(JSON.stringify(result))
})

let server = app.listen(8088,function(){
    let host = 'localhost'
    let port = server.address().port
    let mock = '/mock'
    
    console.log("服务已开启，接口访问地址为 http://%s:%s%s", host, port, mock)
})