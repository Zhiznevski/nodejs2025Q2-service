import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .setTitle('REST Service')
    .setDescription('Home Library Service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document, {
    yamlDocumentUrl: 'doc/swagger/yaml',
  });
};
