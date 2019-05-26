import {
    SwaggerSecurityOptions,
    SwaggerValidatorOptions,
    SwaggerRouter12Options,
    SwaggerRouter20Options,
    SwaggerUiOptions
} from "swagger-tools";
import { Middleware } from "koa-compose";

declare function koaSwaggerValidator<Context>(spec: object, options?: koaSwaggerValidator.Options): Promise<Middleware<Context>>;

declare namespace koaSwaggerValidator {
    interface Options {
        security?: SwaggerSecurityOptions;
        validator?: SwaggerValidatorOptions;
        router?: SwaggerRouter12Options | SwaggerRouter20Options;
        ui?: SwaggerUiOptions;
    }
}

export = koaSwaggerValidator;
