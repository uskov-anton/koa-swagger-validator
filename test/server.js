const http = require("http");
const Koa = require("koa");

const validator = require("../");

const spec = require("./swagger.json");

module.exports = async () => {
    const app = new Koa();
    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (error) {
            ctx.status = error.hasOwnProperty("failedValidation") ? 400 : 500;
            ctx.body = {
                message: error.message,
                original: error
            };
        }
    });
    app.use(await validator(spec));
    app.use(async ctx => ctx.body = { status: "Success" });
    return new Promise(resolve =>
        http
            .createServer(app.callback())
            .listen(3456)
            .on("listening", resolve)
    );
};
