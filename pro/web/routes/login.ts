import * as Router from 'koa-router';
let router = new Router();
router
  .prefix('/api/auth')
  .post('/login', async (ctx: Router.IRouterContext, next: any) => {
    const result = {code: 100, data: "登陆成功"};
    ctx.body = result;
    await next();
  })

  .get('/user', async (ctx: Router.IRouterContext, next: any) => {
    const result = {code: 100, data: "登陆成功"};
    ctx.body = result;
    await next();
  })

export default router;
