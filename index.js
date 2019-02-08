const { initializeMiddleware } = require("swagger-tools");
const body = require("koa-body");
const connect = require("koa-connect");
const compose = require("koa-compose");

const setBody = async (ctx, next) => {
    ctx.req.body = ctx.request.body;
    await next();
};

const koaSwaggerValidator = async (spec, {
    security,
    validator,
    router,
    ui,
} = {}) => new Promise(resolve =>
    initializeMiddleware(spec, ({
        swaggerMetadata: Metadata,
        swaggerSecurity: Security,
        swaggerValidator: Validator,
        swaggerRouter: Router,
        swaggerUi: UI,
    }) => {
        let middleware = [ Metadata() ];
        security && middleware.push(Security(security));
        middleware.push(Validator(validator));
        router && middleware.push(Router(router));
        ui && middleware.push(UI(ui));
        middleware = middleware.map(connect);
        middleware.unshift(setBody);
        resolve(compose(middleware));
    })
);

module.exports = async (spec, { bodyParser, ...opt } = {}) => {
    const validator = await koaSwaggerValidator(spec, opt);
    return compose([
        bodyParser || body(),
        validator
    ]);
};
