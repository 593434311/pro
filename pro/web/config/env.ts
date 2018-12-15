
class Env {
    dbUrl       : string = '';
    dbUser      : string = '';
    dbPass      : string = '';
    port        : number = 0;
}

let env: Env

if (process.env.NODE_ENV == "dev") {
    console.log("开发环境");
    env = require('./dev.json') as Env
} else {
    console.log("生产环境");
    env = require('./prod.json') as Env
}

export default env;