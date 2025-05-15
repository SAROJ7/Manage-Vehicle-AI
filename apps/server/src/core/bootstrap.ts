import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import * as express from 'express';
import helmet from 'helmet';
import { APP, validateConfig } from 'src/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Bootstrap {
  private app: NestExpressApplication;
  private configServuce: ConfigService;

  private readonly logger = new Logger();
  private readonly globalPrefix = 'v1';

  async initApp() {
    this.app = await NestFactory.create<NestExpressApplication>(AppModule);
    this.configServuce = this.app.get(ConfigService);
  }

  enableCors() {
    this.app.enableCors();
  }

  setupMiddleware() {
    this.app.useBodyParser('json', { limit: '10mb' });
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
  }

  setupGloblaPipe() {
    this.app.useGlobalPipes(validateConfig);
  }

  setupGlobalPrefix(globalPrefix?: string) {
    this.app.setGlobalPrefix(globalPrefix ?? this.globalPrefix);
  }

  async startApp() {
    const port = this.configServuce.get<number>('port') ?? 5500;
    await this.app.listen(port);
    this.logger.log(
      `🚀 Application is running on: http://localhost:${port}/${this.globalPrefix}`,
    );
    this.logger.log(`🚀 API Docs: http://localhost:${port}/api-docs`);
    return port;
  }

  swaggerSetup() {
    const config = new DocumentBuilder()
      .setTitle('Manage Vehicle AI')
      .setDescription('Manage Vehicle AI')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: APP.JWT_BEARER,
      })
      .setVersion('1.0')
      .addTag('Manage Vehicle')
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api-docs', this.app, document);
  }
}
