import * as fs from 'fs';
import * as Koa from 'koa';

const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const logger = require('koa-logger');

const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const convert = require('koa-convert');
const serve = require('koa-static');
import env from './config/env';
onerror(app);


// middlewares
app.use(json());
app.use(require('koa-static')(__dirname + '/public'));
app.use(logger());
app.use(bodyParser());
app.use(convert(session(app)));
app.use(serve(__dirname + '/public'));


//加载路由
let routers_path = __dirname + '/routes/';
let routers = fs.readdirSync(routers_path);
let list: any[] = [];
routers.forEach(element => {
  let stat = fs.lstatSync(routers_path + element);
  if (!stat.isDirectory()) {
    list.push(element);
  }
});
list.map(file => {
  let mpath = "./routes/";
  let route = require(mpath + file.substring(0, file.lastIndexOf('.')));
  app.use(route.default.routes())
})

export default app;
