import { writeFileSync } from 'node:fs';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('ACADEMI API')
    .setVersion('1.0')
    .addApiKey(
      { type: 'apiKey', name: 'X-API-KEY', in: 'header' },
      'AccessToken',
    )
    .build();
  console.log('options', options.components.securitySchemes);
  const document = SwaggerModule.createDocument(app, options);
  writeFileSync('./swagger.json', JSON.stringify(document));
  SwaggerModule.setup('/docs', app, document, {
    uiConfig: {
      persistAuthorization: true,
    },
  });
};
