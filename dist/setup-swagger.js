"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const node_fs_1 = require("node:fs");
const swagger_1 = require("@nestjs/swagger");
const setupSwagger = (app) => {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('ACADEMI API')
        .setVersion('1.0')
        .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'AccessToken')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    (0, node_fs_1.writeFileSync)('./swagger.json', JSON.stringify(document));
    swagger_1.SwaggerModule.setup('/docs', app, document, {
        uiConfig: {
            persistAuthorization: true,
        },
    });
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=setup-swagger.js.map