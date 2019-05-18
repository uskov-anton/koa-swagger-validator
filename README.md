# koa-swagger-validator

> Koa 2 + Swagger 2 + Swagger-tools

## Install

```bash
$ npm install koa-swagger-validator --save
```

or

```bash
$ yarn add koa-swagger-validator
```

## Usage

### `validator(spec) => koa2 middleware`

```javascript
import validator from "koa-swagger-validator";
import spec from "./swagger.json";

(async () => {
    const app = new Koa();
    app.use(await validator(spec));
})();
```

### `validator(spec, options) => koa2 middleware`

```javascript
import validator from "koa-swagger-validator";
import spec from "./swagger.json";

(async () => {
    const app = new Koa();
    app.use(await validator(spec, { /* ... */ }));
})();
```

## Documentation

|Variable|Type|Required|
|--------|----|--------|
|spec|object|yes|
|options|object|no|

### spec

[Swagger RESTful API Documentation Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#schema)

### options

|Properties|Type|Required|
|----------|----|--------|
|[bodyParser](https://github.com/dlau/koa-body)|function (middleware)|no|
|[security](https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md#swagger-security)|object|no|
|[validator](https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md#swagger-validator)|object|no|
|[router](https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md#swagger-router)|object|no|
|[ui](https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md#swagger-ui)|object|no|

> See also swagger-tools [full documentation](https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md).

## Limitations
- Koa 2
- Swagger 2

## Credits

- [koa-body](https://github.com/dlau/koa-body)
- [koa-connect](https://github.com/vkurchatkin/koa-connect)
- [koa-compose](https://github.com/koajs/compose)
- [swagger-tools](https://github.com/apigee-127/swagger-tools)

## License

[MIT](LICENSE)