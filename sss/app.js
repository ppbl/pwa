const http = require("http"),
        Koa = require("koa"),
        Router = require("koa-router"),
        fs = require('fs');
const app = new Koa();
const router = new Router();

router.get('/', ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.html');
  });
app.use(router.routes()).use(router.allowedMethods());  
app.listen(3000);