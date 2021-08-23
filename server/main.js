const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const glob = require("glob");
const logger = require('koa-logger')
const { resolve } = require('path');
const fs = require('fs');
const cors = require('@koa/cors')

const port = 3333;
const app = new Koa();
app.use(cors());
let prefix = '/api';
const router = new Router();
const routerMap = {};  // 存放路由映射

app.use(logger());

const globRouter = (item) => {
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
            ctx.throw('服务器错误', 400);
        }
    });
    // 记录路由
    let path = `http://127.0.0.1:${port}${apiPath}`;
    routerMap[apiJsonPath] = path;
    console.log(` ${apiJsonPath} -> ${path}`)
};

// 注册路由
glob.sync(resolve('./api', "**/*.json")).forEach(globRouter);


fs.writeFile('./routerMap.json', JSON.stringify(routerMap, null, 4), err => {
    if (!err) {
        console.log('路由地图生成成功！')
    }
});

app.use(
    koaBody({
        multipart: true,
        formidable: {
            maxFileSize: 1000 * 1024 * 1024
        },
        patchKoa: true
    })
);


/**
 * 上传json文件
 */
router.post('/upload', (ctx) => {
    try {
        const file = ctx.request.files.file;
        const fileName = file.name;
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(
            `api/v1/${fileName}`
        );
        reader.pipe(writer);
    } catch (e) {
        ctx.throw(e);
    }
    setTimeout(() => {
        glob.sync(resolve('./api', "**/*.json")).forEach(globRouter);
    })
    ctx.body = true;
})


router.get('/', (ctx) => {
    ctx.body = routerMap;
})

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(port);
console.log(`server listening on ${port}`)