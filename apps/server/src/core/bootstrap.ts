import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import * as express from 'express';
import helmet from 'helmet';
import { validateConfig } from 'src/config';

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
    this.logger.log(
      `🚀 Application is running on: http://localhost:${port}/${this.globalPrefix}`,
    );
    await this.app.listen(port);
    return port;
  }
}
