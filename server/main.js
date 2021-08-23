const Koa = require('koa');
const Router = require('koa-router');
const glob = require("glob");
const logger = require('koa-logger')
const { resolve } = require('path');
const fs = require('fs');
const cors = require('@koa/cors')


const app = new Koa();
app.use(cors());
let prefix = '/api';
const router = new Router();
const routerMap = {};  // 存放路由映射

app.use(logger());

// 注册路由
glob.sync(resolve('./api', "**/*.json")).forEach((item) => {
    let apiJsonPath = item && item.substring(item.indexOf(prefix), item.length);
    let apiPath = apiJsonPath.replace('.json', '');
    router.get(apiPath, (ctx) => {
        try {
            let jsonStr = fs.readFileSync(item).toString();
            ctx.body = {
                data: JSON.parse(jsonStr),
                code: 200,
                msg: 'success' // 自定义响应体
            }
        } catch (err) {
            ctx.throw('服务器错误', 500);
        }
    });
    // 记录路由
    routerMap[apiJsonPath] = apiPath;
    console.log(` ${apiJsonPath} -> http://127.0.0.1:3333${apiPath}`)
});

fs.writeFile('./routerMap.json', JSON.stringify(routerMap, null, 4), err => {
    if (!err) {
        console.log('路由地图生成成功！')
    }
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3333);