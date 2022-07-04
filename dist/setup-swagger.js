"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const setupSwagger = (app) => {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('ACADEMI API')
        .setVersion('1.0')
        .addApiKey({ type: 'apiKey', name: 'api-key', in: 'header' }, 'AccessToken')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/', app, document, {
        uiConfig: {
            persistAuthorization: true,
        },
    });
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=setup-swagger.js.map