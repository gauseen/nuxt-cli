var Nuxt = require('nuxt')
var isProd = (process.env.NODE_ENV === 'production')
var port = process.env.PORT || 3000

var path = require('path')
var httpProxy = require('http-proxy')
var express = require('express')
var app = express()

var rootPath = path.join(__dirname, './');

var filterFields = ['/mdm2'];  // 过滤请求路径关键字

// 用指定的配置对象实例化 Nuxt.js
var config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

var proxy = httpProxy.createProxyServer({
    target: 'http://sit.behuntergatherer.com/',   //代理 接口地址
    // target: 'http://uat.behuntergatherer.com/',   //代理 接口地址
    // target: 'http://10.36.9.114:8080',
    // target: 'http://10.36.8.36:8083',
    changeOrigin: true,
    // 下面的设置用于https
    // ssl: {
    //     key: fs.readFileSync('server_decrypt.key', 'utf8'),
    //     cert: fs.readFileSync('server.crt', 'utf8')
    // },
    // secure: false
});

proxy.on('error', function(err, req, res){
    res.writeHead(500, {
        'content-type': 'text/plain'
    });
    console.log(err);
    res.end('Something went wrong. And we are reporting a custom error message.');
});

// 处理静态资源
app.use(express.static(rootPath));

// 只对 filterFields 数组元素有的字段请求，挂载此中间件
filterFields.forEach(function (field) {
    app.use(field, function (req, res, next) {
        var pathname = req.url;
        req.url = field + pathname;
        proxy.web(req, res);
    })
});

// 用 Nuxt.js 渲染每个路由
app.use(nuxt.render)

// 在开发模式下启用编译构建和热加载
if (config.dev) {
	nuxt.build()
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
}

app.listen(port, '0.0.0.0');

console.log("Server runing at : localhost:" + port);